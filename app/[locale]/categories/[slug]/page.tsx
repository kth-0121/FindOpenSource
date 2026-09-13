import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllCategories, getCategoryBySlug, localizeCategory } from "@/lib/categories";
import { getProjectsByCategory } from "@/lib/projects";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates, ogLocale, ogAlternateLocales } from "@/lib/i18n/metadata";

type CategoryPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const dict = getDictionary(locale);
  const localized = localizeCategory(category, dict);
  const alternates = buildAlternates(locale, `/categories/${category.slug}`);

  return {
    title: localized.name,
    description: localized.description,
    alternates,
    openGraph: {
      title: localized.name,
      description: localized.description,
      url: alternates.canonical,
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const dict = getDictionary(locale);
  const localized = localizeCategory(category, dict);

  const projects = getProjectsByCategory(category.slug, locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link href={`/${locale}/categories`} className="text-sm text-accent hover:underline">
        &larr; {dict.categoryDetail.backLink}
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{localized.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{localized.description}</p>

      {projects.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          {dict.categoryDetail.emptyMessage}{" "}
          <Link href={`/${locale}/contribute`} className="text-accent hover:underline">
            {dict.categoryDetail.addOneLink}
          </Link>
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
