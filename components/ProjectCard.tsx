import Link from "next/link";
import type { Project } from "@/lib/schema";
import { getCategoryBySlug } from "@/lib/categories";

export function ProjectCard({ project }: { project: Project }) {
  const categories = project.categories
    .map((slug) => getCategoryBySlug(slug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
    .slice(0, 3);

  return (
    <Link
      href={`/projects/${project.slug}`}
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
