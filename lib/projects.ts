import fs from "node:fs";
import path from "node:path";
import { projectSchema, type Project, type Category } from "./schema";
import { getAllCategories } from "./categories";
import { defaultLocale, type Locale } from "./i18n/config";

const projectsDir = path.join(process.cwd(), "data", "projects");

function loadProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".json"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const parsed = projectSchema.parse(JSON.parse(raw));
    if (`${parsed.slug}.json` !== file) {
      throw new Error(
        `Project slug "${parsed.slug}" does not match filename "${file}". Rename the file to match the slug.`,
      );
    }
    return parsed;
  });
  return projects.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Resolves the locale-specific view of a project: translated `description`
 * and `keywords` when available, falling back to the canonical English
 * fields otherwise. Every other field (name, repository, categories, license,
 * ...) is never translated and stays as-is.
 */
export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === defaultLocale) return project;
  const translation = project.translations?.[locale];
  if (!translation) return project;

  return {
    ...project,
    description: translation.description ?? project.description,
    longDescription: translation.longDescription ?? project.longDescription,
    keywords: translation.keywords ?? project.keywords,
  };
}

function localizeAll(projects: Project[], locale: Locale): Project[] {
  return projects.map((project) => localizeProject(project, locale));
}

export function getAllProjects(locale: Locale = defaultLocale): Project[] {
  return localizeAll(loadProjects(), locale);
}

export function getProjectBySlug(slug: string, locale: Locale = defaultLocale): Project | undefined {
  const project = loadProjects().find((p) => p.slug === slug);
  return project ? localizeProject(project, locale) : undefined;
}

export function getFeaturedProjects(locale: Locale = defaultLocale, limit = 8): Project[] {
  const featured = loadProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
  return localizeAll(featured, locale);
}

export function getRecentProjects(locale: Locale = defaultLocale, limit = 8): Project[] {
  const recent = [...loadProjects()]
    .sort((a, b) => (b.dateAdded ?? "").localeCompare(a.dateAdded ?? ""))
    .slice(0, limit);
  return localizeAll(recent, locale);
}

export function getProjectsByCategory(categorySlug: string, locale: Locale = defaultLocale): Project[] {
  const matches = loadProjects().filter((project) => project.categories.includes(categorySlug));
  return localizeAll(matches, locale);
}

export function getCategoriesWithCounts(): (Category & { count: number })[] {
  const projects = loadProjects();
  return getAllCategories().map((category) => ({
    ...category,
    count: projects.filter((project) => project.categories.includes(category.slug)).length,
  }));
}

/**
 * Related projects are matched on canonical (English) categories/keywords —
 * never on translated text — so relevance stays consistent across locales.
 * The returned projects are localized for display.
 */
export function getRelatedProjects(slug: string, locale: Locale = defaultLocale, limit = 4): Project[] {
  const all = loadProjects();
  const project = all.find((p) => p.slug === slug);
  if (!project) return [];

  const others = all
    .filter((other) => other.slug !== project.slug)
    // Never recommend a project flagged for hold (e.g. archived/abandoned).
    .filter((other) => other.evaluation?.flag !== "hold");

  const scored = others.map((other) => {
    const sharedCategories = other.categories.filter((category) =>
      project.categories.includes(category),
    ).length;
    const sharedKeywords = other.keywords.filter((keyword) =>
      project.keywords.includes(keyword),
    ).length;
    return { project: other, score: sharedCategories * 3 + sharedKeywords * 2 };
  });

  const related = scored
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        // Primary sort (category/keyword overlap) is untouched. Quality
        // score only ever breaks an exact tie -- it can never outrank a
        // project with genuinely higher category/keyword overlap. Missing
        // scores default to 0, same conservative-by-default rule as
        // computeQualityScore itself.
        b.score - a.score ||
        (b.project.evaluation?.quality?.score ?? 0) - (a.project.evaluation?.quality?.score ?? 0),
    )
    .slice(0, limit)
    .map((entry) => entry.project);

  return localizeAll(related, locale);
}
