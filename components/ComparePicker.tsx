"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Project } from "@/lib/schema";
import { localizeCategory } from "@/lib/categories";
import { ProjectCard } from "@/components/ProjectCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const MAX_RESULTS = 40;

/** Just enough per project to power the picker's search/filter list -- see ComparePicker's own doc comment for why. */
type ProjectSummary = Pick<Project, "slug" | "name" | "description" | "categories">;

function bySlug<T extends { slug: string }>(items: T[], slug: string | undefined): T | undefined {
  if (!slug) return undefined;
  return items.find((item) => item.slug === slug);
}

/** Fetches the full Project record for a slug only once it's actually selected (see app/api/projects/[locale]/[slug]/route.ts). */
function useFullProject(locale: Locale, slug: string | undefined): Project | undefined {
  const [result, setResult] = useState<{ slug: string; project: Project } | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`/api/projects/${locale}/${slug}`)
      .then((response) => (response.ok ? (response.json() as Promise<Project>) : undefined))
      .then((project) => {
        if (!cancelled && project) setResult({ slug, project });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [locale, slug]);

  // Guards against a stale result from a just-cleared or just-switched slug
  // still rendering while the new fetch is in flight.
  return result && result.slug === slug ? result.project : undefined;
}

/** One slot's picker: category filter + search, click a row to select. Shown until a project is picked, then collapses to its card. */
function ProjectSlot({
  label,
  projects,
  categories,
  exclude,
  selectedSummary,
  selectedFull,
  defaultCategory,
  dict,
  locale,
  onSelect,
  onClear,
}: {
  label: string;
  projects: ProjectSummary[];
  categories: Category[];
  exclude?: string;
  selectedSummary: ProjectSummary | undefined;
  selectedFull: Project | undefined;
  defaultCategory: string;
  dict: Dictionary;
  locale: Locale;
  onSelect: (project: ProjectSummary) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(defaultCategory);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return projects
      .filter((project) => project.slug !== exclude)
      .filter((project) => !categoryFilter || project.categories.includes(categoryFilter))
      .filter((project) => !trimmed || project.name.toLowerCase().includes(trimmed))
      .slice(0, MAX_RESULTS);
  }, [projects, exclude, categoryFilter, query]);

  if (selectedSummary) {
    return (
      <div className="flex flex-col gap-2">
        {selectedFull ? (
          <ProjectCard project={selectedFull} locale={locale} dict={dict} />
        ) : (
          <div className="flex flex-col gap-3 rounded-lg border border-border p-5">
            <h3 className="font-semibold text-foreground">{selectedSummary.name}</h3>
            <p data-nosnippet className="line-clamp-2 text-sm text-muted-foreground">
              {selectedSummary.description}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onClear}
          className="self-start text-xs text-muted-foreground hover:text-accent"
        >
          {dict.compare.changeSelectionLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-5">
      <label className="sr-only" htmlFor={`compare-search-${label}`}>
        {dict.compare.projectPlaceholder}
      </label>
      <input
        id={`compare-search-${label}`}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={dict.compare.projectPlaceholder}
        className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
      />
      <label className="sr-only" htmlFor={`compare-category-${label}`}>
        {dict.compare.categoryFilterLabel}
      </label>
      <select
        id={`compare-category-${label}`}
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
        className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
      >
        <option value="">{dict.compare.allCategoriesOption}</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {localizeCategory(category, dict).name}
          </option>
        ))}
      </select>
      <ul className="max-h-64 overflow-y-auto rounded-lg border border-border">
        {results.length === 0 ? (
          <li className="p-3 text-sm text-muted-foreground">{dict.compare.noMatchesLabel}</li>
        ) : (
          results.map((project) => (
            <li key={project.slug} className="border-b border-border last:border-b-0">
              <button
                type="button"
                onClick={() => onSelect(project)}
                className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-accent/5"
              >
                <span className="font-medium text-foreground">{project.name}</span>
                <span data-nosnippet className="line-clamp-1 text-xs text-muted-foreground">
                  {project.description}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

/**
 * Lets the user narrow by category and click to pick two projects, instead
 * of typing an exact name -- see components/ComparisonTable.tsx for the
 * resulting side-by-side cards. Selection mirrors to ?a=/?b= so a
 * comparison is shareable via URL; arriving with ?a= pre-filled (from a
 * project detail page's "Compare with another project" link) also seeds
 * the second slot's category filter to the first project's category.
 *
 * `projects` is a lightweight summary for all ~220 projects (enough for the
 * picker's own search/filter UI); the full Project record for whichever 1-2
 * are actually selected is fetched on demand (useFullProject) instead of
 * being embedded here -- this page used to ship every project's full data
 * on every load, which was the single biggest driver of this site's Fast
 * Origin Transfer usage.
 */
export function ComparePicker({
  projects,
  categories,
  locale,
  dict,
}: {
  projects: ProjectSummary[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slugA, setSlugA] = useState<string | undefined>(() => searchParams.get("a") ?? undefined);
  const [slugB, setSlugB] = useState<string | undefined>(() => searchParams.get("b") ?? undefined);

  const summaryA = bySlug(projects, slugA);
  const summaryB = bySlug(projects, slugB);
  const fullA = useFullProject(locale, slugA);
  const fullB = useFullProject(locale, slugB);

  function updateUrl(nextA: string | undefined, nextB: string | undefined) {
    const params = new URLSearchParams();
    if (nextA) params.set("a", nextA);
    if (nextB) params.set("b", nextB);
    const query = params.toString();
    router.replace(`/${locale}/compare${query ? `?${query}` : ""}`, { scroll: false });
  }

  return (
    <div>
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-6">
        <ProjectSlot
          label={dict.compare.firstProjectLabel}
          projects={projects}
          categories={categories}
          exclude={slugB}
          selectedSummary={summaryA}
          selectedFull={fullA}
          defaultCategory={summaryB?.categories[0] ?? ""}
          dict={dict}
          locale={locale}
          onSelect={(project) => {
            setSlugA(project.slug);
            updateUrl(project.slug, slugB);
          }}
          onClear={() => {
            setSlugA(undefined);
            updateUrl(undefined, slugB);
          }}
        />
        <ProjectSlot
          label={dict.compare.secondProjectLabel}
          projects={projects}
          categories={categories}
          exclude={slugA}
          selectedSummary={summaryB}
          selectedFull={fullB}
          defaultCategory={summaryA?.categories[0] ?? ""}
          dict={dict}
          locale={locale}
          onSelect={(project) => {
            setSlugB(project.slug);
            updateUrl(slugA, project.slug);
          }}
          onClear={() => {
            setSlugB(undefined);
            updateUrl(slugA, undefined);
          }}
        />
      </div>

      <div className="mt-10">
        {fullA && fullB ? (
          <ComparisonTable projects={[fullA, fullB]} locale={locale} dict={dict} />
        ) : (
          <p className="text-center text-sm text-muted-foreground">{dict.compare.selectPrompt}</p>
        )}
      </div>
    </div>
  );
}
