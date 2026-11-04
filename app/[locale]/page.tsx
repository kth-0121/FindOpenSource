import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CategoryCard } from "@/components/CategoryCard";
import { ProjectCard } from "@/components/ProjectCard";
import { KeywordBadge } from "@/components/KeywordBadge";
import { AdSlot } from "@/components/AdSlot";
import { SupportLink } from "@/components/SupportLink";
import { getAllProjects, getCategoriesWithCounts, getFeaturedProjects, getRecentProjects } from "@/lib/projects";
import { getSupportUrl } from "@/lib/support";
import { siteConfig } from "@/lib/site";
import { AGENTS, PRESETS, buildPrompt, skillId, skills } from "@/lib/skills";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";
import { formatMessage } from "@/lib/i18n/format";

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
  const featuredProjects = getFeaturedProjects(locale, 4);
  const recentProjects = getRecentProjects(locale, 4);
  const stats: [number, string][] = [
    [skills.length, dict.home.stats.skills],
    [getAllProjects().length, dict.home.stats.projects],
    [categories.length, dict.home.stats.categories],
    [locales.length, dict.home.stats.languages],
  ];

  // A real builder output, so the preview never drifts from what /skills generates.
  const examplePreset = PRESETS[0];
  const exampleAgent = AGENTS[0];
  const examplePrompt = buildPrompt(
    skills.filter((skill) => (examplePreset.skills as readonly string[]).includes(skillId(skill))),
    exampleAgent,
    "project",
  );
  const supportUrl = getSupportUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Google reads site name from WebSite data on the home page; `url` must be
    // the domain root (not /en) and alternateName ties the "findoss" brand
    // searches people actually type to this name.
    name: siteConfig.name,
    alternateName: ["findoss", "FindOSS", "findoss.dev"],
    url: `${siteConfig.url}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    // Korean wraps by word (keep-all); Chinese/Japanese have no spaces, so they keep the default.
    <div className={`mx-auto max-w-5xl px-4 py-16 sm:px-6 ${locale === "ko" ? "break-keep" : ""}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col items-center gap-6 text-center" aria-labelledby="intro">
        <h1 id="intro" className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          {dict.home.introTitleLine1}
          <br />
          <span className="text-accent">{dict.home.introTitleLine2}</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{dict.home.introSubtitle}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/skills`}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            {dict.home.introPrimaryCta}
          </Link>
          <a
            href="#search"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-accent"
          >
            {dict.home.introSecondaryCta}
          </a>
        </div>
        <dl className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse bg-background px-4 py-5">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-2xl font-bold tracking-tight">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-2" aria-labelledby="feature-skills">
        <div>
          <p className="text-sm font-medium text-accent">{dict.home.featureSkills.eyebrow}</p>
          <h2 id="feature-skills" className="mt-2 text-3xl font-bold tracking-tight">
            {dict.home.featureSkills.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{dict.home.featureSkills.body}</p>
          <ol className="mt-6 flex flex-col gap-3">
            {dict.home.featureSkills.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <Link
            href={`/${locale}/skills`}
            className="mt-8 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            {dict.home.featureSkills.cta}
          </Link>
          <div className="mt-6">
            <p className="mb-2 text-xs text-muted-foreground">{dict.home.featureSkills.presetsLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <li key={preset.id}>
                  <KeywordBadge href={`/${locale}/skills?preset=${preset.id}`}>
                    {dict.skills.presets[preset.id].title}
                  </KeywordBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure className="overflow-hidden rounded-xl border border-zinc-700 bg-[#111114] text-zinc-200 shadow-xl">
          <figcaption className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3 text-xs text-zinc-400">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </span>
            {formatMessage(dict.home.featureSkills.exampleLabel, {
              preset: dict.skills.presets[examplePreset.id].title,
              agent: exampleAgent.label,
            })}
          </figcaption>
          <div className="relative">
            <pre className="max-h-80 overflow-hidden whitespace-pre-wrap break-words p-4 font-mono text-xs leading-relaxed">
              {examplePrompt}
            </pre>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#111114]" />
          </div>
        </figure>
      </section>

      <section id="search" className="mt-28 flex scroll-mt-8 flex-col items-center gap-6 text-center" aria-labelledby="find-open-source">
        <p className="text-sm font-medium text-accent">{dict.home.featureSearchEyebrow}</p>
        <h2 id="find-open-source" className="-mt-4 max-w-2xl text-3xl font-bold tracking-tight">
          {dict.home.heroTitleLine1} {dict.home.heroTitleLine2}
        </h2>
        <p className="max-w-xl text-muted-foreground">{dict.home.heroSubtitle}</p>
        <SearchBox
          locale={locale}
          placeholder={dict.home.searchPlaceholder}
          inputLabel={dict.search.inputLabel}
          submitLabel={dict.search.submitLabel}
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

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { feature: dict.home.featureAnalyze, href: `/${locale}/analyze` },
          { feature: dict.home.featureCompare, href: `/${locale}/compare` },
        ].map(({ feature, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent"
          >
            <span className="text-sm font-medium text-accent">{feature.eyebrow}</span>
            <span className="mt-2 text-xl font-semibold tracking-tight">{feature.title}</span>
            <span className="mt-2 flex-1 text-sm text-muted-foreground">{feature.body}</span>
            <span className="mt-4 text-sm font-medium group-hover:underline">{feature.cta} →</span>
          </Link>
        ))}
      </div>

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
