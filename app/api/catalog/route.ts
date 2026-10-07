import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/projects";
import type { CatalogEntry } from "@/lib/repo-analysis";

/**
 * Compact index of every project with verified `packages`, fetched by
 * RepoAnalyzer only when a visitor actually submits a repo -- the /analyze
 * page itself ships none of this. Prerendered at build time (force-static),
 * so it's a cached static asset, not a serverless invocation.
 */
export const dynamic = "force-static";

export function GET() {
  const catalog: CatalogEntry[] = getAllProjects()
    .filter((project) => project.packages)
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      categories: project.categories,
      packages: project.packages!,
      rating: project.evaluation?.catalogValue?.rating,
      score: project.evaluation?.quality?.score,
    }));
  return NextResponse.json(catalog);
}
