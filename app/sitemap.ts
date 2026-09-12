import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const categories = getAllCategories();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/categories",
    "/about",
    "/contribute",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: project.dateAdded ? new Date(project.dateAdded) : undefined,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
  }));

  return [...staticRoutes, ...projectRoutes, ...categoryRoutes];
}
