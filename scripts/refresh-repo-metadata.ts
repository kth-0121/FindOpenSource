import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { projectSchema } from "../lib/schema";
import { computeQualityScore } from "../lib/evaluation/quality-score";

/**
 * Weekly re-pull of each project's GitHub evidence (last push, archived, issues,
 * stars) into evaluation.quality, recomputing the score. Hand-judged fields
 * (productionReadiness, governance, catalogValue) are left untouched.
 *
 * Usage: npx tsx scripts/refresh-repo-metadata.ts
 */

const projectsDir = path.join(process.cwd(), "data", "projects");
const today = new Date().toISOString().slice(0, 10);

for (const file of fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"))) {
  const filePath = path.join(projectsDir, file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const repo = json.repository.match(/^https:\/\/github\.com\/([^/]+\/[^/]+?)\/?$/)?.[1];
  const quality = json.evaluation?.quality;
  if (!quality) continue;
  if (repo) try {
    const [pushedAt, archived, issues, stars] = execFileSync(
      "gh",
      ["api", `repos/${repo}`, "--jq", ".pushed_at,.archived,.open_issues_count,.stargazers_count"],
      { encoding: "utf-8" },
    ).trim().split("\n");
    Object.assign(quality, {
      lastCommitAt: pushedAt.slice(0, 10),
      archived: archived === "true",
      openIssuesCount: Number(issues),
      stargazersCount: Number(stars),
    });
  } catch {
    // Still recompute below: recency keeps decaying while the repo is unreachable.
    console.warn(`  ${file}: ${repo} not reachable, kept old evidence`);
  }
  // Non-GitHub repos (e.g. PocketBase) keep their last evidence; the score still decays.
  const score = computeQualityScore(quality, projectSchema.parse(json));
  if (score !== quality.score) Object.assign(quality, { score, evaluatedAt: today });
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
}
