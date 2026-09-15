import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CategoryCard } from "@/components/CategoryCard";
import { ProjectCard } from "@/components/ProjectCard";
import { KeywordBadge } from "@/components/KeywordBadge";
import { AdSlot } from "@/components/AdSlot";
import { SupportLink } from "@/components/SupportLink";
import { getCategoriesWithCounts, getFeaturedProjects, getRecentProjects } from "@/lib/projects";
import { getSupportUrl } from "@/lib/support";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  return { alternates: buildAlternates(localeParam, "") };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  const categories = getCategoriesWithCounts();
  const featuredProjects = getFeaturedProjects(locale, 8);
  const recentProjects = getRecentProjects(locale, 6);
  const supportUrl = getSupportUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          {dict.home.heroTitleLine1}
          <br />
          {dict.home.heroTitleLine2}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">{dict.home.heroSubtitle}</p>
        <SearchBox
          locale={locale}
          placeholder={dict.home.searchPlaceholder}
          inputLabel={dict.search.inputLabel}
          submitLabel={dict.search.submitLabel}
          autoFocus
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground">{dict.home.popularSearchesLabel}</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {dict.home.popularSearches.map((keyword) => (
              <li key={keyword}>
                <KeywordBadge href={`/${locale}/search?q=${encodeURIComponent(keyword)}`}>
                  {keyword}
                </KeywordBadge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="browse-categories">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="browse-categories" className="text-2xl font-semibold tracking-tight">
            {dict.home.browseCategories}
          </h2>
          <Link href={`/${locale}/categories`} className="text-sm text-accent hover:underline">
            {dict.home.viewAll}
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 9).map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} count={category.count} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24" aria-labelledby="popular-projects">
        <h2 id="popular-projects" className="mb-6 text-2xl font-semibold tracking-tight">
          {dict.home.popularOpenSource}
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      <AdSlot label={dict.adSlotLabel} />

      <section aria-labelledby="recent-projects">
        <h2 id="recent-projects" className="mb-6 text-2xl font-semibold tracking-tight">
          {dict.home.recentlyAdded}
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recentProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      {supportUrl && (
        <section className="mt-24 rounded-lg border border-border px-6 py-10 text-center">
          <h2 className="text-lg font-semibold tracking-tight">{dict.home.supportHeading}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{dict.home.supportBody}</p>
          <SupportLink
            href={supportUrl}
            ariaLabel={dict.support.ctaAriaLabel}
            className="mt-6 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            {dict.home.supportCta}
          </SupportLink>
        </section>
      )}
    </div>
  );
}
