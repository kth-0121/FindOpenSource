import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/i18n/metadata";
import { SKILL_PACK_ORDER } from "@/lib/skills";

/** One sitemap `<url>` entry per locale for a given locale-independent path, each annotated with hreflang alternates to every other locale. */
function entriesForPath(path: string, lastModified?: Date, only: readonly Locale[] = locales): MetadataRoute.Sitemap {
  return only.map((locale) => {
    const alternates = buildAlternates(locale, path);
    return {
      url: alternates.canonical,
      lastModified,
      alternates: { languages: alternates.languages },
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const categories = getAllCategories();
  const now = new Date();

  const staticEntries = [
    "",
    "/skills",
    "/setups",
    "/projects",
    "/categories",
    "/compare",
    "/analyze",
    "/about",
    "/contribute",
    "/support",
    "/privacy",
    "/terms",
    "/contact",
  ].flatMap((path) => entriesForPath(path, now));

  const projectEntries = projects.flatMap((project) =>
    entriesForPath(
      `/projects/${project.slug}`,
      project.dateAdded ? new Date(project.dateAdded) : undefined,
      // Untranslated locale pages are noindex (see the project page metadata).
      locales.filter((l) => l === defaultLocale || project.translations?.[l]),
    ),
  );

  const categoryEntries = categories.flatMap((category) =>
    entriesForPath(`/categories/${category.slug}`),
  );

  const packEntries = SKILL_PACK_ORDER.flatMap((pack) => entriesForPath(`/skills/${pack}`, now));

  return [...staticEntries, ...projectEntries, ...categoryEntries, ...packEntries];
}
