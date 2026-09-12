import fs from "node:fs";
import path from "node:path";
import { projectSchema, type Project, type Category } from "./schema";
import { getAllCategories } from "./categories";

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

export function getAllProjects(): Project[] {
  return loadProjects();
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 8): Project[] {
  return loadProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getRecentProjects(limit = 8): Project[] {
  return [...loadProjects()]
    .sort((a, b) => (b.dateAdded ?? "").localeCompare(a.dateAdded ?? ""))
    .slice(0, limit);
}

export function getProjectsByCategory(categorySlug: string): Project[] {
  return loadProjects().filter((project) => project.categories.includes(categorySlug));
}

export function getCategoriesWithCounts(): (Category & { count: number })[] {
  const projects = loadProjects();
  return getAllCategories().map((category) => ({
    ...category,
    count: projects.filter((project) => project.categories.includes(category.slug)).length,
  }));
}

export function getRelatedProjects(project: Project, limit = 4): Project[] {
  const others = loadProjects().filter((other) => other.slug !== project.slug);

  const scored = others.map((other) => {
    const sharedCategories = other.categories.filter((category) =>
      project.categories.includes(category),
    ).length;
    const sharedKeywords = other.keywords.filter((keyword) =>
      project.keywords.includes(keyword),
    ).length;
    return { project: other, score: sharedCategories * 3 + sharedKeywords * 2 };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.project);
}
