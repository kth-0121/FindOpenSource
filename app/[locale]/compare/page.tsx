import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProjects, stripTranslations } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { ComparePicker } from "@/components/ComparePicker";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type CompareIndexPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * This page never reads `searchParams` at Origin -- the full project list is
 * build-time-static (same for everyone, per locale), so it prerenders and
 * serves from the CDN. Which two projects are selected is entirely
 * client-computed (see ComparePicker, which reads ?a=/?b= via
 * `useSearchParams()`), same static+Suspense split as /search.
 */
export async function generateMetadata({ params }: CompareIndexPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.compare.indexTitle,
    description: dict.compare.indexDescription,
    alternates: buildAlternates(locale, "/compare"),
  };
}

export default async function CompareIndexPage({ params }: CompareIndexPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const projects = getAllProjects(locale).map(stripTranslations);
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.compare.indexTitle}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{dict.compare.indexDescription}</p>
      <div className="mt-10">
        <Suspense fallback={null}>
          <ComparePicker projects={projects} categories={categories} locale={locale} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}
