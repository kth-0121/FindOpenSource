import Link from "next/link";
import type { Category, Project } from "@/lib/schema";
import { localizeCategory } from "@/lib/categories";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/EmptyState";
import { KeywordBadge } from "@/components/KeywordBadge";
import { formatCount } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function SearchResults({
  query,
  results,
  relatedCategory,
  relatedSearchTerms,
  locale,
  dict,
}: {
  query: string;
  results: Project[];
  relatedCategory?: Category & { count: number };
  relatedSearchTerms?: string[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (query.trim().length === 0) {
    return null;
  }

  if (results.length === 0) {
    return <EmptyState query={query} locale={locale} dict={dict} />;
  }

  const localizedRelatedCategory = relatedCategory ? localizeCategory(relatedCategory, dict) : undefined;

  return (
    <div>
      <p className="mb-2 text-sm text-muted-foreground">
        {formatCount(
          results.length,
          { one: dict.search.resultsCountOne, other: dict.search.resultsCountOther },
          { query },
        )}
      </p>
      {localizedRelatedCategory && (
        <p className="mb-2 text-sm text-muted-foreground">
          {dict.search.relatedCategoryLabel}:{" "}
          <Link
            href={`/${locale}/categories/${localizedRelatedCategory.slug}`}
            className="text-accent hover:underline"
          >
            {localizedRelatedCategory.name} ({relatedCategory?.count})
          </Link>
        </p>
      )}
      {relatedSearchTerms && relatedSearchTerms.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">{dict.search.relatedSearchesLabel}:</span>
          {relatedSearchTerms.map((term) => (
            <KeywordBadge key={term} href={`/${locale}/search?q=${encodeURIComponent(term)}`}>
              {term}
            </KeywordBadge>
          ))}
        </div>
      )}
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} locale={locale} dict={dict} />
          </li>
        ))}
      </ul>
    </div>
  );
}
