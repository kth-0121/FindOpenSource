import Link from "next/link";
import type { Category } from "@/lib/schema";

export function CategoryCard({
  category,
  count,
}: {
  category: Category;
  count?: number;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col gap-1.5 rounded-lg border border-border p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-foreground group-hover:text-accent">
          {category.name}
        </h3>
        {typeof count === "number" && (
          <span className="shrink-0 text-xs text-muted-foreground">{count}</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{category.description}</p>
    </Link>
  );
}
