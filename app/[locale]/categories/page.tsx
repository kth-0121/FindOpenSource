import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { getCategoriesWithCounts } from "@/lib/projects";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type CategoriesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CategoriesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.categoriesPage.title,
    description: dict.categoriesPage.description,
    alternates: buildAlternates(locale, "/categories"),
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const categories = getCategoriesWithCounts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.categoriesPage.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{dict.categoriesPage.description}</p>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryCard category={category} count={category.count} locale={locale} dict={dict} />
          </li>
        ))}
      </ul>
    </div>
  );
}
