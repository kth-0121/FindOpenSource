import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { SearchExperience } from "@/components/SearchExperience";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function getQuery(params: { q?: string | string[] }): string {
  return typeof params.q === "string" ? params.q : "";
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = getQuery(await searchParams);
  const canonical = query ? `/search?q=${encodeURIComponent(query)}` : "/search";
  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: query
      ? `Open source projects matching "${query}".`
      : "Search open source projects by feature, technology or category.",
    alternates: { canonical },
    robots: query ? { index: false, follow: true } : undefined,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = getQuery(await searchParams);
  const projects = getAllProjects();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="sr-only">Search open source projects</h1>
      <SearchExperience initialQuery={query} projects={projects} categories={categories} />
    </div>
  );
}
