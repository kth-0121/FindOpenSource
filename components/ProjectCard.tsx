import Link from "next/link";
import type { Project } from "@/lib/schema";
import { getCategoryBySlug, localizeCategory } from "@/lib/categories";
import { getTopEvidenceBadge } from "@/lib/evaluation/badges";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const categories = project.categories
    .map((slug) => getCategoryBySlug(slug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
    .map((category) => localizeCategory(category, dict))
    .slice(0, 3);
  const topBadge = getTopEvidenceBadge(project);

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground group-hover:text-accent">
          {project.name}
        </h3>
        <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {project.license}
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
      {topBadge && <p className="text-xs font-medium text-accent">{dict.evidenceBadges[topBadge]}</p>}
      {categories.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li
              key={category.slug}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground/70"
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
