import fs from "node:fs";
import path from "node:path";
import { projectSchema } from "../lib/schema";
import { computeQualityScore } from "../lib/evaluation/quality-score";

/**
 * Merges the offline gh-api evidence cache (data/.cache/repo-metadata.json,
 * from scripts/collect-repo-metadata.ts) with the hand-authored rubric data
 * (scripts/data/evaluation-manual-input.json) into every data/projects/*.json
 * file: writes `evaluation.quality` (including the computed score),
 * `evaluation.catalogValue`, `evaluation.flag`, and `intents`.
 *
 * Only merges the new keys into the existing parsed object and re-serializes
 * with the same 2-space indentation already used, to keep the diff minimal
 * and reviewable across all 200 files.
 *
 * Usage: npx tsx scripts/apply-evaluation-data.ts
 */

const projectsDir = path.join(process.cwd(), "data", "projects");
const cachePath = path.join(process.cwd(), "data", ".cache", "repo-metadata.json");
const manualInputPath = path.join(process.cwd(), "scripts", "data", "evaluation-manual-input.json");

type RepoMetadata = {
  slug: string;
  pushedAt?: string;
  createdAt?: string;
  archived?: boolean;
  openIssuesCount?: number;
  stargazersCount?: number;
  error?: string;
};

type ManualEntry = {
  slug: string;
  productionReadiness: "foundational" | "mature" | "emerging" | "experimental";
  governance: "foundation" | "vendor-backed" | "community" | "unknown";
  catalogValue: { rating: number; rationale: string };
  intents: { concept: string; strength: "primary" | "secondary" | "related" }[];
  flag?: "ok" | "review" | "hold";
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const cache: Record<string, RepoMetadata> = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
  const manualEntries: ManualEntry[] = JSON.parse(fs.readFileSync(manualInputPath, "utf-8"));
  const manualBySlug = new Map(manualEntries.map((e) => [e.slug, e]));

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
  let updated = 0;
  let skippedNoManual = 0;

  for (const file of files) {
    const fullPath = path.join(projectsDir, file);
    const raw = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    const project = projectSchema.parse(raw);
    const slug = project.slug;

    const manual = manualBySlug.get(slug);
    if (!manual) {
      console.warn(`No manual evaluation input for ${slug}, skipping.`);
      skippedNoManual++;
      continue;
    }

    const meta = cache[slug];
    const quality = {
      lastCommitAt: meta?.pushedAt,
      repoCreatedAt: meta?.createdAt,
      archived: meta?.archived ?? false,
      openIssuesCount: meta?.openIssuesCount,
      stargazersCount: meta?.stargazersCount,
      productionReadiness: manual.productionReadiness,
      governance: manual.governance,
      evaluatedAt: today(),
    };

    const score = computeQualityScore(quality, project);

    const evaluation = {
      quality: { ...quality, score },
      catalogValue: manual.catalogValue,
      flag: manual.flag ?? "ok",
    };

    const merged = {
      ...raw,
      evaluation,
      ...(manual.intents.length > 0 ? { intents: manual.intents } : {}),
    };

    // Validate before writing -- fail loudly rather than write invalid data.
    projectSchema.parse(merged);

    fs.writeFileSync(fullPath, JSON.stringify(merged, null, 2) + "\n");
    updated++;
  }

  console.log(`Updated ${updated} project file(s). Skipped ${skippedNoManual} (no manual input).`);
}

main();
