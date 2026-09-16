import fs from "node:fs";
import path from "node:path";
import { projectSchema, type Project } from "../lib/schema";
import categoriesData from "../data/categories.json";
import { computeQualityScore } from "../lib/evaluation/quality-score";

/**
 * Read-only reporting script -- never mutates data/projects/*.json. Reports
 * coverage, staleness, maintenance/catalog-value flags, category balance,
 * and possible redundancy so a human can review, without auto-deleting or
 * auto-editing anything. See docs/project-evaluation.md.
 *
 * Usage: npm run audit:projects
 */

const projectsDir = path.join(process.cwd(), "data", "projects");
const CATEGORY_BALANCE_THRESHOLD = 5;
const MAINTENANCE_STALE_DAYS = 730;
const DUPLICATE_KEYWORD_OVERLAP = 0.9;

function loadProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
  return files.map((f) => projectSchema.parse(JSON.parse(fs.readFileSync(path.join(projectsDir, f), "utf-8"))));
}

function daysSince(dateString: string | undefined): number | undefined {
  if (!dateString) return undefined;
  return (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24);
}

function keywordOverlap(a: Project, b: Project): number {
  const setA = new Set(a.keywords);
  const setB = new Set(b.keywords);
  const intersection = [...setA].filter((k) => setB.has(k)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

function main() {
  const projects = loadProjects();
  const total = projects.length;

  const withScore = projects.filter((p) => p.evaluation?.quality?.score !== undefined);
  const withCatalogValue = projects.filter((p) => p.evaluation?.catalogValue !== undefined);
  const withIntents = projects.filter((p) => (p.intents?.length ?? 0) > 0);

  const staleScores = withScore.filter((p) => {
    const recomputed = computeQualityScore(p.evaluation?.quality, p);
    return recomputed !== p.evaluation?.quality?.score;
  });

  const maintenanceFlags = projects.filter((p) => {
    const quality = p.evaluation?.quality;
    if (!quality) return false;
    const stale = quality.archived || (daysSince(quality.lastCommitAt) ?? 0) > MAINTENANCE_STALE_DAYS;
    return stale && p.evaluation?.flag !== "review" && p.evaluation?.flag !== "hold";
  });

  const categoryCounts = new Map<string, number>();
  for (const category of categoriesData) categoryCounts.set(category.slug, 0);
  for (const p of projects) {
    for (const c of p.categories) categoryCounts.set(c, (categoryCounts.get(c) ?? 0) + 1);
  }
  const thinCategories = [...categoryCounts.entries()].filter(([, count]) => count < CATEGORY_BALANCE_THRESHOLD);

  const lowCatalogValue = projects.filter((p) => (p.evaluation?.catalogValue?.rating ?? 5) <= 1);

  const redundantIntents = projects.filter((p) =>
    (p.intents ?? []).some((intent) => p.categories.includes(intent.concept)),
  );

  const duplicateCandidates: { a: string; b: string; overlap: number; category: string }[] = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const sharedCategory = a.categories.find((c) => b.categories.includes(c));
      if (!sharedCategory) continue;
      const overlap = keywordOverlap(a, b);
      if (overlap >= DUPLICATE_KEYWORD_OVERLAP) {
        duplicateCandidates.push({ a: a.slug, b: b.slug, overlap, category: sharedCategory });
      }
    }
  }

  const warnings = maintenanceFlags.length + redundantIntents.length + duplicateCandidates.length;
  const errors = staleScores.length;
  const passed = total - warnings - errors;

  console.log("FindOpenSource — Project Evaluation Audit");
  console.log("==========================================");
  console.log(`Projects: ${total} / Passed: ${passed} / Warnings: ${warnings} / Errors: ${errors}`);
  console.log();
  console.log(
    `Score coverage: ${withScore.length}/${total} quality.score, ${withCatalogValue.length}/${total} catalogValue, ${withIntents.length}/${total} with >=1 intent`,
  );
  console.log();

  console.log(`Category balance (< ${CATEGORY_BALANCE_THRESHOLD} projects):`);
  if (thinCategories.length === 0) console.log("  (none)");
  for (const [slug, count] of thinCategories.sort((a, b) => a[1] - b[1])) console.log(`  ${slug} (${count})`);
  console.log();

  console.log("Maintenance flags (Review/Hold candidates without evaluation.flag set):");
  if (maintenanceFlags.length === 0) console.log("  (none)");
  for (const p of maintenanceFlags) {
    const quality = p.evaluation!.quality!;
    const reason = quality.archived
      ? "archived"
      : `last commit ${Math.round(daysSince(quality.lastCommitAt) ?? 0)}+ days ago`;
    console.log(`  - ${p.slug} (${reason})`);
  }
  console.log();

  console.log("Low catalog value (rating <= 1):");
  if (lowCatalogValue.length === 0) console.log("  (none)");
  for (const p of lowCatalogValue) {
    console.log(`  - ${p.slug} (rating ${p.evaluation!.catalogValue!.rating}: "${p.evaluation!.catalogValue!.rationale}")`);
  }
  console.log();

  console.log("Stale score (recompute mismatch):");
  if (staleScores.length === 0) console.log("  (none)");
  for (const p of staleScores) {
    console.log(`  - ${p.slug} (stored ${p.evaluation!.quality!.score}, recomputed ${computeQualityScore(p.evaluation?.quality, p)})`);
  }
  console.log();

  console.log("Redundant intent (concept duplicates an existing category):");
  if (redundantIntents.length === 0) console.log("  (none)");
  for (const p of redundantIntents) {
    const dupes = (p.intents ?? []).filter((i) => p.categories.includes(i.concept)).map((i) => i.concept);
    console.log(`  - ${p.slug} (${dupes.join(", ")})`);
  }
  console.log();

  console.log(`Duplicate/near-redundant candidates (same category, >=${Math.round(DUPLICATE_KEYWORD_OVERLAP * 100)}% keyword overlap):`);
  if (duplicateCandidates.length === 0) console.log("  (none)");
  for (const d of duplicateCandidates) {
    console.log(`  - ${d.a} / ${d.b} (${Math.round(d.overlap * 100)}% overlap, both in "${d.category}")`);
  }

  if (errors > 0) process.exit(1);
}

main();
