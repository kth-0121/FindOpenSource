"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, Project } from "@/lib/schema";
import { searchProjects } from "@/lib/search";
import { SearchResults } from "@/components/SearchResults";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function SearchExperience({
  initialQuery,
  projects,
  categories,
  locale,
  dict,
}: {
  initialQuery: string;
  projects: Project[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(
    () => searchProjects(query, projects, categories, locale).map((result) => result.project),
    [query, projects, categories, locale],
  );

  function handleChange(next: string) {
    setQuery(next);
    const url = next.trim()
      ? `/${locale}/search?q=${encodeURIComponent(next.trim())}`
      : `/${locale}/search`;
    router.replace(url, { scroll: false });
  }

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="mb-8">
        <label htmlFor="search-page-input" className="sr-only">
          {dict.search.inputLabel}
        </label>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3.5 shadow-sm transition-colors focus-within:border-accent">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-5 w-5 shrink-0 text-muted-foreground"
          >
            <path
              d="M17.5 17.5L13.875 13.875M15.833 9.167a6.667 6.667 0 11-13.333 0 6.667 6.667 0 0113.333 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            id="search-page-input"
            type="search"
            name="q"
            autoFocus
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            placeholder={dict.home.searchPlaceholder}
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>
      </form>
      <SearchResults query={query} results={results} locale={locale} dict={dict} />
    </div>
  );
}
