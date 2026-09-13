import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { locales } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/i18n/metadata";

/** One sitemap `<url>` entry per locale for a given locale-independent path, each annotated with hreflang alternates to every other locale. */
function entriesForPath(path: string, lastModified?: Date): MetadataRoute.Sitemap {
  return locales.map((locale) => {
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

  const staticEntries = ["", "/projects", "/categories", "/about", "/contribute"].flatMap((path) =>
    entriesForPath(path, now),
  );

  const projectEntries = projects.flatMap((project) =>
    entriesForPath(
      `/projects/${project.slug}`,
      project.dateAdded ? new Date(project.dateAdded) : undefined,
    ),
  );

  const categoryEntries = categories.flatMap((category) =>
    entriesForPath(`/categories/${category.slug}`),
  );

  return [...staticEntries, ...projectEntries, ...categoryEntries];
}
