import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { getCategoriesWithCounts } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse open source projects by category, from AI to databases to DevOps.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Browse open source projects grouped by the feature or technology they provide.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryCard category={category} count={category.count} />
          </li>
        ))}
      </ul>
    </div>
  );
}
