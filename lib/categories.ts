import categoriesData from "@/data/categories.json";
import { categorySchema, type Category } from "./schema";

function loadCategories(): Category[] {
  return categoriesData.map((category) => categorySchema.parse(category));
}

export function getAllCategories(): Category[] {
  return loadCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return loadCategories().find((category) => category.slug === slug);
}
