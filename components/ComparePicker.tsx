"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Project } from "@/lib/schema";
import { localizeCategory } from "@/lib/categories";
import { ProjectCard } from "@/components/ProjectCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const MAX_RESULTS = 40;

function bySlug(projects: Project[], slug: string | null): Project | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}

/** One slot's picker: category filter + search, click a row to select. Shown until a project is picked, then collapses to its ProjectCard. */
function ProjectSlot({
  label,
  projects,
  categories,
  exclude,
  selected,
  defaultCategory,
  dict,
  locale,
  onSelect,
  onClear,
}: {
  label: string;
  projects: Project[];
  categories: Category[];
  exclude?: string;
  selected: Project | undefined;
  defaultCategory: string;
  dict: Dictionary;
  locale: Locale;
  onSelect: (project: Project) => void;
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

  if (selected) {
    return (
      <div className="flex flex-col gap-2">
        <ProjectCard project={selected} locale={locale} dict={dict} />
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
                <span className="line-clamp-1 text-xs text-muted-foreground">{project.description}</span>
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
 */
export function ComparePicker({
  projects,
  categories,
  locale,
  dict,
}: {
  projects: Project[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slugA, setSlugA] = useState(() => searchParams.get("a"));
  const [slugB, setSlugB] = useState(() => searchParams.get("b"));

  const projectA = useMemo(() => bySlug(projects, slugA), [projects, slugA]);
  const projectB = useMemo(() => bySlug(projects, slugB), [projects, slugB]);
  const bothSelected = Boolean(projectA && projectB);

  function updateUrl(nextA: string | null, nextB: string | null) {
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
          exclude={projectB?.slug}
          selected={projectA}
          defaultCategory={projectB?.categories[0] ?? ""}
          dict={dict}
          locale={locale}
          onSelect={(project) => {
            setSlugA(project.slug);
            updateUrl(project.slug, slugB);
          }}
          onClear={() => {
            setSlugA(null);
            updateUrl(null, slugB);
          }}
        />
        <ProjectSlot
          label={dict.compare.secondProjectLabel}
          projects={projects}
          categories={categories}
          exclude={projectA?.slug}
          selected={projectB}
          defaultCategory={projectA?.categories[0] ?? ""}
          dict={dict}
          locale={locale}
          onSelect={(project) => {
            setSlugB(project.slug);
            updateUrl(slugA, project.slug);
          }}
          onClear={() => {
            setSlugB(null);
            updateUrl(slugA, null);
          }}
        />
      </div>

      <div className="mt-10">
        {bothSelected && projectA && projectB ? (
          <ComparisonTable projects={[projectA, projectB]} locale={locale} dict={dict} />
        ) : (
          <p className="text-center text-sm text-muted-foreground">{dict.compare.selectPrompt}</p>
        )}
      </div>
    </div>
  );
}
