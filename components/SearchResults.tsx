import type { Project } from "@/lib/schema";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/EmptyState";
import { formatCount } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function SearchResults({
  query,
  results,
  locale,
  dict,
}: {
  query: string;
  results: Project[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (query.trim().length === 0) {
    return null;
  }

  if (results.length === 0) {
    return <EmptyState query={query} locale={locale} dict={dict} />;
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        {formatCount(
          results.length,
          { one: dict.search.resultsCountOne, other: dict.search.resultsCountOther },
          { query },
        )}
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} locale={locale} dict={dict} />
          </li>
        ))}
      </ul>
    </div>
  );
}
