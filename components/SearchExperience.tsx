"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Project } from "@/lib/schema";
import { enhanceSearch } from "@/lib/ai/enhance-search";
import type { QueryUnderstanding } from "@/lib/ai/schema";
import { getRelatedSearchTerms, getDominantCategory } from "@/lib/search-discovery";
import { SearchResults } from "@/components/SearchResults";
import { SearchStart } from "@/components/SearchStart";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const AI_DEBOUNCE_MS = 400;

/**
 * Progressive enhancement only: when disabled (the default until
 * ai.findoss.dev is configured), the client never calls the endpoint at
 * all -- search behaves exactly as it did before this feature existed. The
 * server independently re-checks AI_QUERY_ENABLED regardless of this flag.
 */
const AI_QUERY_ENABLED = process.env.NEXT_PUBLIC_AI_QUERY_ENABLED === "true";

/**
 * Debounced AI query understanding for the current search query. Returns
 * null whenever there's no (yet) enhancement for the current query --
 * callers get plain keyword search until/unless this resolves.
 */
function useAIQueryUnderstanding(query: string, locale: Locale): QueryUnderstanding | null {
  const [result, setResult] = useState<{ forQuery: string; data: QueryUnderstanding | null }>({
    forQuery: "",
    data: null,
  });

  useEffect(() => {
    const trimmed = query.trim();
    if (!AI_QUERY_ENABLED || !trimmed) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch("/api/search/understand", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: trimmed, locale }),
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((body: { ok: boolean; data?: QueryUnderstanding }) => {
          setResult({ forQuery: trimmed, data: body.ok && body.data ? body.data : null });
        })
        .catch(() => {
          // Aborted (superseded by a newer query) or network error -- either
          // way, keep showing plain keyword results for this query.
        });
    }, AI_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, locale]);

  return result.forQuery === query.trim() ? result.data : null;
}

export function SearchExperience({
  projects,
  categories,
  featuredProjects,
  topCategories,
  locale,
  dict,
}: {
  projects: Project[];
  categories: Category[];
  featuredProjects: Project[];
  topCategories: (Category & { count: number })[];
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  // Read client-side (not a server-passed prop): this page is statically
  // prerendered (see app/[locale]/search/page.tsx) precisely so it never
  // touches `searchParams` at Origin. useSearchParams() reads the real
  // browser URL after hydration without opting the page back into
  // per-request dynamic rendering -- the caller wraps this component in
  // <Suspense>, which is what this hook requires.
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const trimmedQuery = query.trim();

  const understanding = useAIQueryUnderstanding(query, locale);

  const results = useMemo(
    () =>
      enhanceSearch(query, understanding, projects, categories, locale).map((result) => result.project),
    [query, understanding, projects, categories, locale],
  );

  const relatedSearchTerms = useMemo(
    () => (trimmedQuery ? getRelatedSearchTerms(trimmedQuery, locale) : []),
    [trimmedQuery, locale],
  );

  const relatedCategory = useMemo(
    () => (results.length > 0 ? getDominantCategory(results, categories) : undefined),
    [results, categories],
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
      {trimmedQuery.length === 0 ? (
        <SearchStart
          locale={locale}
          dict={dict}
          featuredProjects={featuredProjects}
          topCategories={topCategories}
        />
      ) : (
        <SearchResults
          query={query}
          results={results}
          relatedCategory={relatedCategory}
          relatedSearchTerms={relatedSearchTerms}
          locale={locale}
          dict={dict}
        />
      )}
    </div>
  );
}
