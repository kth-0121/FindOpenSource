import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { projectSchema } from "../lib/schema";

/**
 * One-time, offline evidence pull for Quality Score's automated sub-scores.
 * Runs `gh api repos/{owner}/{repo}` per project (the same CLI already used
 * for license verification during earlier catalog research) and writes a
 * gitignored cache at data/.cache/repo-metadata.json, keyed by slug. This
 * cache is NOT committed and NOT read at runtime by the deployed site --
 * scripts/apply-quality-evidence.ts reads it once, offline, to populate the
 * derived/classified fields that DO get committed into data/projects/*.json.
 *
 * Usage: npx tsx scripts/collect-repo-metadata.ts
 */

const execFileAsync = promisify(execFile);

const projectsDir = path.join(process.cwd(), "data", "projects");
const cacheDir = path.join(process.cwd(), "data", ".cache");
const cachePath = path.join(cacheDir, "repo-metadata.json");

type RepoMetadata = {
  slug: string;
  pushedAt?: string;
  createdAt?: string;
  archived?: boolean;
  openIssuesCount?: number;
  stargazersCount?: number;
  error?: string;
};

function parseOwnerRepo(repositoryUrl: string): string | undefined {
  const match = repositoryUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)\/?$/);
  if (!match) return undefined;
  return `${match[1]}/${match[2]}`;
}

async function fetchOne(slug: string, ownerRepo: string): Promise<RepoMetadata> {
  try {
    const { stdout } = await execFileAsync("gh", [
      "api",
      `repos/${ownerRepo}`,
      "--jq",
      ".pushed_at,.created_at,.archived,.open_issues_count,.stargazers_count",
    ]);
    const [pushedAt, createdAt, archived, openIssuesCount, stargazersCount] = stdout
      .trim()
      .split("\n");
    return {
      slug,
      pushedAt: pushedAt?.slice(0, 10),
      createdAt: createdAt?.slice(0, 10),
      archived: archived === "true",
      openIssuesCount: Number(openIssuesCount),
      stargazersCount: Number(stargazersCount),
    };
  } catch (error) {
    return { slug, error: (error as Error).message };
  }
}

async function runBatched<T, R>(items: T[], batchSize: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
    console.log(`  ...${Math.min(i + batchSize, items.length)}/${items.length}`);
  }
  return results;
}

async function main() {
  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".json"));
  const targets: { slug: string; ownerRepo: string }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const project = projectSchema.parse(JSON.parse(raw));
    const ownerRepo = parseOwnerRepo(project.repository);
    if (!ownerRepo) {
      console.warn(`Skipping ${file}: could not parse owner/repo from ${project.repository}`);
      continue;
    }
    targets.push({ slug: project.slug, ownerRepo });
  }

  console.log(`Fetching gh api metadata for ${targets.length} repos (batches of 10)...`);
  const results = await runBatched(targets, 10, ({ slug, ownerRepo }) => fetchOne(slug, ownerRepo));

  const failures = results.filter((r) => r.error);
  if (failures.length > 0) {
    console.warn(`\n${failures.length} lookups failed:`);
    for (const f of failures) console.warn(`  - ${f.slug}: ${f.error}`);
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  const cache: Record<string, RepoMetadata> = {};
  for (const result of results) cache[result.slug] = result;
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2) + "\n");

  console.log(`\nWrote ${results.length} entries (${results.length - failures.length} ok, ${failures.length} failed) to ${cachePath}`);
}

main();
