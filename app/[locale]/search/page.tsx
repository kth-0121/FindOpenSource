import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getFeaturedProjects, getCategoriesWithCounts } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { SearchExperience } from "@/components/SearchExperience";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type SearchPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
};

function getQuery(params: { q?: string | string[] }): string {
  return typeof params.q === "string" ? params.q : "";
}

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const query = getQuery(await searchParams);

  return {
    title: query ? `${dict.search.pageTitle}: "${query}"` : dict.search.pageTitle,
    description: query
      ? `${dict.search.pageDescription} "${query}"`
      : dict.search.pageDescription,
    alternates: buildAlternates(locale, "/search"),
    robots: query ? { index: false, follow: true } : undefined,
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const query = getQuery(await searchParams);
  const projects = getAllProjects(locale);
  const categories = getAllCategories();
  const featuredProjects = getFeaturedProjects(locale, 6);
  const topCategories = getCategoriesWithCounts()
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="sr-only">{dict.search.inputLabel}</h1>
      <SearchExperience
        initialQuery={query}
        projects={projects}
        categories={categories}
        featuredProjects={featuredProjects}
        topCategories={topCategories}
        locale={locale}
        dict={dict}
      />
    </div>
  );
}
