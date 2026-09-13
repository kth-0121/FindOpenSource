import type { Category, Project } from "./schema";
import type { Locale } from "./i18n/config";
import { keywordTaxonomy } from "./i18n/keyword-taxonomy";

/**
 * UI-only helpers that add discovery context around search results
 * (related search suggestions, a shared category callout). These never
 * affect ranking or scoring — see lib/search.ts for the actual search
 * algorithm, which this module does not touch.
 */

const MIN_MATCH_LENGTH = 4;

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

/**
 * Suggests related search terms for a query using the same curated
 * multilingual keyword taxonomy that powers search query expansion
 * (lib/i18n/keyword-taxonomy.ts). Only ever surfaces terms that are
 * genuinely connected to the query through that taxonomy.
 */
export function getRelatedSearchTerms(query: string, locale: Locale, limit = 4): string[] {
  const normalized = normalize(query);
  if (!normalized) return [];

  const suggestions: string[] = [];
  const seen = new Set<string>([normalized]);

  for (const entry of keywordTaxonomy) {
    if (suggestions.length >= limit) break;

    const localeSynonyms = entry.synonyms[locale] ?? [];
    const enSynonyms = entry.synonyms.en ?? [];
    const candidates = [
      entry.canonical,
      entry.canonical.replace(/-/g, " "),
      ...localeSynonyms,
      ...enSynonyms,
    ];

    const matched = candidates.some((candidate) => {
      const value = normalize(candidate);
      if (normalized === value) return true;
      if (value.length >= MIN_MATCH_LENGTH && normalized.includes(value)) return true;
      if (normalized.length >= MIN_MATCH_LENGTH && value.includes(normalized)) return true;
      return false;
    });

    if (!matched) continue;

    // Prefer a couple of natural-language synonyms first, then the
    // underlying technical keywords, skipping anything that's just a
    // substring match of the query itself (too close to be a useful "try
    // also" suggestion).
    const pool = [...localeSynonyms.slice(0, 2), ...entry.related];
    for (const term of pool) {
      const key = normalize(term);
      if (seen.has(key)) continue;
      if (normalized.includes(key) || key.includes(normalized)) continue;
      seen.add(key);
      suggestions.push(term);
      if (suggestions.length >= limit) break;
    }
  }

  return suggestions;
}

/**
 * If the current result set is dominated by a single category, surfaces it
 * so the UI can offer a shortcut into that category page. Returns undefined
 * for small or mixed result sets, where a single "dominant" category would
 * be a misleading signal.
 */
export function getDominantCategory(
  results: Project[],
  categories: Category[],
): (Category & { count: number }) | undefined {
  if (results.length < 3) return undefined;

  const counts = new Map<string, number>();
  for (const project of results) {
    for (const slug of project.categories) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }

  let topSlug: string | undefined;
  let topCount = 0;
  for (const [slug, count] of counts) {
    if (count > topCount) {
      topSlug = slug;
      topCount = count;
    }
  }

  if (!topSlug || topCount < 2 || topCount / results.length < 0.5) return undefined;

  const category = categories.find((c) => c.slug === topSlug);
  if (!category) return undefined;

  return { ...category, count: topCount };
}
