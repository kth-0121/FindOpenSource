import Link from "next/link";
import type { Category } from "@/lib/schema";
import { localizeCategory } from "@/lib/categories";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function CategoryCard({
  category,
  count,
  locale,
  dict,
}: {
  category: Category;
  count?: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const localized = localizeCategory(category, dict);

  return (
    <Link
      href={`/${locale}/categories/${category.slug}`}
      className="group flex flex-col gap-1.5 rounded-lg border border-border p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-foreground group-hover:text-accent">
          {localized.name}
        </h3>
        {typeof count === "number" && (
          <span className="shrink-0 text-xs text-muted-foreground">{count}</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{localized.description}</p>
    </Link>
  );
}
