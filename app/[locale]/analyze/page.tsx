import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllCategories } from "@/lib/categories";
import { RepoAnalyzer } from "@/components/RepoAnalyzer";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type AnalyzePageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Static shell, same split as /search and /compare: the repo to analyze is
 * read client-side (?repo=), and the analysis itself runs in the browser
 * (see RepoAnalyzer) -- nothing here depends on the request.
 */
export async function generateMetadata({ params }: AnalyzePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.analyze.pageTitle,
    description: dict.analyze.pageDescription,
    alternates: buildAlternates(locale, "/analyze"),
  };
}

export default async function AnalyzePage({ params }: AnalyzePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.analyze.pageTitle}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{dict.analyze.pageDescription}</p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <RepoAnalyzer categories={getAllCategories()} locale={locale} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}
