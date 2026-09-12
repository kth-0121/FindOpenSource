import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CategoryCard } from "@/components/CategoryCard";
import { ProjectCard } from "@/components/ProjectCard";
import { KeywordBadge } from "@/components/KeywordBadge";
import { AdSlot } from "@/components/AdSlot";
import { getCategoriesWithCounts, getFeaturedProjects, getRecentProjects } from "@/lib/projects";
import keywords from "@/data/keywords.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const categories = getCategoriesWithCounts();
  const featuredProjects = getFeaturedProjects(8);
  const recentProjects = getRecentProjects(6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Find the right open source
          <br />
          for your project.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Discover open source projects by feature, technology, and category.
        </p>
        <SearchBox autoFocus />
        <ul className="flex flex-wrap justify-center gap-2">
          {keywords.slice(0, 6).map((keyword) => (
            <li key={keyword}>
              <KeywordBadge href={`/search?q=${encodeURIComponent(keyword)}`}>
                {keyword}
              </KeywordBadge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24" aria-labelledby="browse-categories">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="browse-categories" className="text-2xl font-semibold tracking-tight">
            Browse Categories
          </h2>
          <Link href="/categories" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 9).map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} count={category.count} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24" aria-labelledby="popular-projects">
        <h2 id="popular-projects" className="mb-6 text-2xl font-semibold tracking-tight">
          Popular Open Source
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <AdSlot />

      <section aria-labelledby="recent-projects">
        <h2 id="recent-projects" className="mb-6 text-2xl font-semibold tracking-tight">
          Recently Added
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recentProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
