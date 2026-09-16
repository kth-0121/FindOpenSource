import fs from "node:fs";
import path from "node:path";
import { getAllProjects } from "../lib/projects";
import { getAllCategories } from "../lib/categories";
import { searchProjects } from "../lib/search";
import { locales, type Locale } from "../lib/i18n/config";

/**
 * Captures top-5 search results (slug + score) for a fixed regression query
 * set across all locales. Used to prove that a lib/search.ts change is a
 * true no-op until new score data exists (Phase 2 checkpoint), and later to
 * diff against once evaluation data lands (Phase 4).
 *
 * Usage: npx tsx scripts/capture-search-baseline.ts <output-file.json>
 */

const REGRESSION_QUERIES = [
  "authentication",
  "login",
  "oauth",
  "sso",
  "vector database",
  "image upload",
  "chat",
  "cms",
  "pdf",
  "logging",
  "feature flags",
  "monitoring",
  "payment",
];

type BaselineEntry = { slug: string; score: number };
type Baseline = Record<Locale, Record<string, BaselineEntry[]>>;

function captureForLocale(locale: Locale): Record<string, BaselineEntry[]> {
  const projects = getAllProjects(locale);
  const categories = getAllCategories();
  const result: Record<string, BaselineEntry[]> = {};

  for (const query of REGRESSION_QUERIES) {
    const results = searchProjects(query, projects, categories, locale);
    result[query] = results.slice(0, 5).map((r) => ({ slug: r.project.slug, score: r.score }));
  }

  return result;
}

function main() {
  const outputArg = process.argv[2];
  if (!outputArg) {
    console.error("Usage: npx tsx scripts/capture-search-baseline.ts <output-file.json>");
    process.exit(1);
  }

  const baseline: Partial<Baseline> = {};
  for (const locale of locales) {
    baseline[locale] = captureForLocale(locale);
  }

  const outputPath = path.join(process.cwd(), outputArg);
  fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2) + "\n");
  console.log(`Wrote baseline for ${locales.length} locales x ${REGRESSION_QUERIES.length} queries to ${outputArg}`);
}

main();
