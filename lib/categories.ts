import categoriesData from "@/data/categories.json";
import { categorySchema, type Category } from "./schema";
import type { Dictionary } from "./i18n/types";

function loadCategories(): Category[] {
  return categoriesData.map((category) => categorySchema.parse(category));
}

export function getAllCategories(): Category[] {
  return loadCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return loadCategories().find((category) => category.slug === slug);
}

/**
 * Category slugs are stable and never translated. The display `name` and
 * `description` come from the active locale's dictionary, falling back to
 * the canonical English copy if a translation is ever missing.
 */
export function localizeCategory(category: Category, dict: Dictionary): Category {
  const translation = dict.categories[category.slug];
  if (!translation) return category;
  return { ...category, name: translation.name, description: translation.description };
}
