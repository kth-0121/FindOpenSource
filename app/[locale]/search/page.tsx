import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProjects, getFeaturedProjects, getCategoriesWithCounts, stripTranslations } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { SearchExperience } from "@/components/SearchExperience";
import { SearchStart } from "@/components/SearchStart";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type SearchPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * This page intentionally never reads `searchParams`, `cookies()`, or
 * `headers()` -- every project/category list here is build-time-static
 * data (same for everyone, per locale), so the page can be fully
 * prerendered and served from the CDN instead of re-executing at Origin
 * on every request. The actual search query and its results are entirely
 * client-computed (see SearchExperience, which reads `q` via
 * `useSearchParams()`), so nothing about search behavior, ranking, or the
 * AI-assist flow changes -- only where/how often this shell is rendered.
 */
export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return {
    title: dict.search.pageTitle,
    description: dict.search.pageDescription,
    alternates: buildAlternates(locale, "/search"),
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const projects = getAllProjects(locale).map(stripTranslations);
  const categories = getAllCategories();
  const featuredProjects = getFeaturedProjects(locale, 6).map(stripTranslations);
  const topCategories = getCategoriesWithCounts()
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="sr-only">{dict.search.inputLabel}</h1>
      <Suspense
        fallback={
          <SearchStart
            locale={locale}
            dict={dict}
            featuredProjects={featuredProjects}
            topCategories={topCategories}
          />
        }
      >
        <SearchExperience
          projects={projects}
          categories={categories}
          featuredProjects={featuredProjects}
          topCategories={topCategories}
          locale={locale}
          dict={dict}
        />
      </Suspense>
    </div>
  );
}
