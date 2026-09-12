import type { Project } from "@/lib/schema";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/EmptyState";

export function SearchResults({
  query,
  results,
}: {
  query: string;
  results: Project[];
}) {
  if (query.trim().length === 0) {
    return null;
  }

  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "project" : "projects"} found for &ldquo;
        {query}&rdquo;
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
