import Link from "next/link";
import type { Project } from "@/lib/schema";
import { getCategoryBySlug, localizeCategory } from "@/lib/categories";
import { getEvidenceBadges } from "@/lib/evaluation/badges";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

function ProjectComparisonCard({
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
    .map((category) => localizeCategory(category, dict));
  const rating = project.evaluation?.catalogValue?.rating;
  const badges = getEvidenceBadges(project);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-5">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/${locale}/projects/${project.slug}`}
          className="text-lg font-semibold text-foreground hover:text-accent"
        >
          {project.name}
        </Link>
        <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {project.license}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">{project.description}</p>

      {categories.length > 0 && (
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {dict.projectDetail.categoriesLabel}
          </dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <span key={category.slug} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground/70">
                {category.name}
              </span>
            ))}
          </dd>
        </div>
      )}

      {project.languages && project.languages.length > 0 && (
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {dict.projectDetail.languagesLabel}
          </dt>
          <dd className="mt-1.5 text-sm text-muted-foreground">{project.languages.join(", ")}</dd>
        </div>
      )}

      {rating !== undefined && (
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {dict.projectDetail.catalogRatingLabel}
          </dt>
          <dd className="mt-1 text-sm font-medium text-accent">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)} ({rating}/5)
          </dd>
        </div>
      )}

      {badges.length > 0 && (
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {dict.compare.evidenceLabel}
          </dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <EvidenceBadge key={badge} className="text-xs">
                {dict.evidenceBadges[badge]}
              </EvidenceBadge>
            ))}
          </dd>
        </div>
      )}
    </div>
  );
}

/** Two project cards side by side, selected via ComparePicker -- mirrors the project detail page's own dt/dd + pill/badge layout instead of a literal HTML table. */
export function ComparisonTable({
  projects,
  locale,
  dict,
}: {
  projects: [Project, Project];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectComparisonCard key={project.slug} project={project} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
