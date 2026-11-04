import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { KeywordBadge } from "@/components/KeywordBadge";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { getAllProjects, getCategoriesWithCounts, getProjectBySlug } from "@/lib/projects";
import { getEvidenceBadges } from "@/lib/evaluation/badges";
import { siteConfig } from "@/lib/site";
import { AGENTS, PRESETS, buildPrompt, skillId, skills } from "@/lib/skills";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";
import { formatMessage } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/types";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

type QuickMenuKey = keyof Dictionary["home"]["quickMenu"]["items"];

// 24x24 stroke icons, one per feature tile.
const ICONS: Record<QuickMenuKey, ReactNode> = {
  skills: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  search: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" />,
  categories: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  analyze: <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9" />,
  compare: <path d="M4 5h7v14H4zM13 5h7v14h-7z" />,
  contribute: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
};

// Real catalog entries for the compare preview (same pair a visitor would see on /compare).
const COMPARE_EXAMPLE = ["meilisearch", "elasticsearch"] as const;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  return { alternates: buildAlternates(localeParam, "") };
}

function FeatureText({
  eyebrow,
  title,
  body,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  id: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="mt-4 text-muted-foreground">{body}</p>
      {children}
    </div>
  );
}

function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-8 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
    >
      {children}
    </Link>
  );
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  const stats: [number, string][] = [
    [skills.length, dict.home.stats.skills],
    [getAllProjects().length, dict.home.stats.projects],
    [getCategoriesWithCounts().length, dict.home.stats.categories],
    [locales.length, dict.home.stats.languages],
  ];

  const quickMenu: { key: QuickMenuKey; href: string }[] = [
    { key: "skills", href: `/${locale}/skills` },
    { key: "search", href: `/${locale}/search` },
    { key: "categories", href: `/${locale}/categories` },
    { key: "analyze", href: `/${locale}/analyze` },
    { key: "compare", href: `/${locale}/compare` },
    { key: "contribute", href: `/${locale}/contribute` },
  ];

  // A real builder output, so the preview never drifts from what /skills generates.
  const examplePreset = PRESETS[0];
  const exampleAgent = AGENTS[0];
  const examplePrompt = buildPrompt(
    skills.filter((skill) => (examplePreset.skills as readonly string[]).includes(skillId(skill))),
    exampleAgent,
    "project",
  );

  const compareProjects = COMPARE_EXAMPLE.map((slug) => getProjectBySlug(slug, locale)).filter(
    (project): project is NonNullable<typeof project> => Boolean(project),
  );

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
        <dl className="mt-2 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse bg-background px-4 py-5">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-2xl font-bold tracking-tight">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav className="mt-16" aria-labelledby="quick-menu">
        <h2 id="quick-menu" className="sr-only">
          {dict.home.quickMenu.heading}
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickMenu.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="flex h-full flex-col items-center gap-3 rounded-xl border border-border px-3 py-6 text-center transition-colors hover:border-accent hover:bg-muted"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[key]}
                  </svg>
                </span>
                <span className="text-sm font-semibold">{dict.home.quickMenu.items[key].title}</span>
                <span className="text-xs text-muted-foreground">{dict.home.quickMenu.items[key].body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-2" aria-labelledby="feature-skills">
        <FeatureText
          id="feature-skills"
          eyebrow={dict.home.featureSkills.eyebrow}
          title={dict.home.featureSkills.title}
          body={dict.home.featureSkills.body}
        >
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
          <CtaLink href={`/${locale}/skills`}>{dict.home.featureSkills.cta}</CtaLink>
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
        </FeatureText>
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

      <section
        id="search"
        className="mt-28 grid scroll-mt-8 grid-cols-1 items-center gap-10 lg:grid-cols-2"
        aria-labelledby="feature-search"
      >
        <div className="rounded-xl border border-border bg-muted p-6 order-last lg:order-first">
          <SearchBox
            locale={locale}
            placeholder={dict.home.searchPlaceholder}
            inputLabel={dict.search.inputLabel}
            submitLabel={dict.search.submitLabel}
          />
          <p className="mt-5 text-xs text-muted-foreground">{dict.home.popularSearchesLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {dict.home.popularSearches.map((keyword) => (
              <li key={keyword}>
                <KeywordBadge href={`/${locale}/search?q=${encodeURIComponent(keyword)}`}>{keyword}</KeywordBadge>
              </li>
            ))}
          </ul>
        </div>
        <FeatureText
          id="feature-search"
          eyebrow={dict.home.featureSearchEyebrow}
          title={`${dict.home.heroTitleLine1} ${dict.home.heroTitleLine2}`}
          body={dict.home.heroSubtitle}
        >
          <CtaLink href={`/${locale}/categories`}>{dict.home.quickMenu.items.categories.title}</CtaLink>
        </FeatureText>
      </section>

      <section className="mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-2" aria-labelledby="feature-analyze">
        <FeatureText
          id="feature-analyze"
          eyebrow={dict.home.featureAnalyze.eyebrow}
          title={dict.home.featureAnalyze.title}
          body={dict.home.featureAnalyze.body}
        >
          <CtaLink href={`/${locale}/analyze`}>{dict.home.featureAnalyze.cta}</CtaLink>
        </FeatureText>
        {/* Shape of the analyzer's output, without inventing results. */}
        <div className="rounded-xl border border-border p-6" aria-hidden="true">
          <div className="rounded-md border border-border px-3 py-2 font-mono text-sm text-muted-foreground">
            {dict.analyze.inputPlaceholder}
          </div>
          {[dict.analyze.stackHeading, dict.analyze.usedHeading, dict.analyze.recommendHeading].map((heading, i) => (
            <div key={heading} className="mt-5">
              <p className="text-sm font-semibold">{heading}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from({ length: 4 - i }, (_, j) => (
                  <span key={j} className="h-6 rounded-full bg-muted" style={{ width: `${56 + ((i + j) % 3) * 24}px` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-2" aria-labelledby="feature-compare">
        <div className="grid grid-cols-2 gap-3 order-last lg:order-first">
          {compareProjects.map((project) => (
            <div key={project.slug} className="flex min-w-0 flex-col gap-3 rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                <span className="font-semibold">{project.name}</span>
                <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {project.license}
                </span>
              </div>
              <p className="line-clamp-3 text-xs text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {getEvidenceBadges(project).map((badge) => (
                  <EvidenceBadge key={badge} className="px-2 py-0.5 text-[11px]">
                    {dict.evidenceBadges[badge]}
                  </EvidenceBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
        <FeatureText
          id="feature-compare"
          eyebrow={dict.home.featureCompare.eyebrow}
          title={dict.home.featureCompare.title}
          body={dict.home.featureCompare.body}
        >
          <CtaLink href={`/${locale}/compare?a=${COMPARE_EXAMPLE[0]}&b=${COMPARE_EXAMPLE[1]}`}>
            {dict.home.featureCompare.cta}
          </CtaLink>
        </FeatureText>
      </section>
    </div>
  );
}
