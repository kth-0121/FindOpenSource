import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ProjectCard } from "@/components/ProjectCard";
import { KeywordBadge } from "@/components/KeywordBadge";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { getCategoryBySlug, localizeCategory } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { isLocale, localeMeta, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates, ogLocale, ogAlternateLocales } from "@/lib/i18n/metadata";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const project = getProjectBySlug(slug, locale);
  if (!project) return {};

  const alternates = buildAlternates(locale, `/projects/${project.slug}`);

  return {
    title: project.name,
    description: project.description,
    alternates,
    openGraph: {
      title: project.name,
      description: project.description,
      type: "article",
      url: alternates.canonical,
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();

  const categories = project.categories
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
    .map((category) => localizeCategory(category, dict));
  const relatedProjects = getRelatedProjects(project.slug, locale);

  const pageUrl = `${siteConfig.url}/${locale}/projects/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    codeRepository: project.repository,
    url: pageUrl,
    license: project.license,
    programmingLanguage: project.languages,
    inLanguage: localeMeta[locale].bcp47,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          {dict.projectDetail.githubButton}
        </a>
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
          >
            {dict.projectDetail.websiteButton}
          </a>
        )}
        {project.documentation && (
          <a
            href={project.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
          >
            {dict.projectDetail.documentationButton}
          </a>
        )}
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-semibold text-foreground">{dict.projectDetail.categoriesLabel}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <KeywordBadge key={category.slug} href={`/${locale}/categories/${category.slug}`}>
                {category.name}
              </KeywordBadge>
            ))}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-semibold text-foreground">{dict.projectDetail.keywordsLabel}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.keywords.map((keyword) => (
              <KeywordBadge key={keyword} href={`/${locale}/search?q=${encodeURIComponent(keyword)}`}>
                {keyword}
              </KeywordBadge>
            ))}
          </dd>
        </div>

        {project.languages && project.languages.length > 0 && (
          <div>
            <dt className="text-sm font-semibold text-foreground">{dict.projectDetail.languagesLabel}</dt>
            <dd className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
              {project.languages.join(", ")}
            </dd>
          </div>
        )}

        <div>
          <dt className="text-sm font-semibold text-foreground">{dict.projectDetail.licenseLabel}</dt>
          <dd className="mt-2 text-sm text-muted-foreground">{project.license}</dd>
        </div>
      </dl>

      <AdSlot label={dict.adSlotLabel} />

      {relatedProjects.length > 0 && (
        <section aria-labelledby="related-projects" className="mt-4">
          <h2 id="related-projects" className="mb-6 text-2xl font-semibold tracking-tight">
            {dict.projectDetail.relatedProjects}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedProjects.map((related) => (
              <li key={related.slug}>
                <ProjectCard project={related} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-12 text-sm text-muted-foreground">
        {dict.projectDetail.spottedError}
        <Link href={`/${locale}/contribute`} className="text-accent hover:underline">
          {dict.projectDetail.suggestEditLink}
        </Link>
        {dict.projectDetail.suggestEditSuffix}
      </p>
    </div>
  );
}
