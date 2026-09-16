import type { Category, Project } from "./schema";
import type { Locale } from "./i18n/config";
import { keywordTaxonomy } from "./i18n/keyword-taxonomy";

export interface SearchResult {
  project: Project;
  score: number;
}

const NAME_EXACT = 100;
const NAME_PARTIAL = 50;
const KEYWORD_EXACT = 40;
const KEYWORD_PARTIAL = 20;
const CATEGORY_EXACT = 15;
const CATEGORY_PARTIAL = 8;
const LANGUAGE_EXACT = 8;
const LANGUAGE_PARTIAL = 4;
const DESCRIPTION_PARTIAL = 5;
const ALL_TOKENS_MATCHED_BONUS = 25;
// Curated "this project genuinely serves this intent" claims (project.intents,
// see lib/schema.ts / docs/project-evaluation.md). Pitched between
// CATEGORY_EXACT and KEYWORD_EXACT: stronger evidence than a broad category
// tag, but a curated claim never outranks a literal keyword/name match on
// the same token.
const INTENT_PRIMARY_MATCH = 25;
const INTENT_SECONDARY_MATCH = 12;
const INTENT_RELATED_MATCH = 5;

/**
 * Below this length, substring ("partial") matching is skipped — only an
 * exact match counts. Without this guard, short/common words match as noisy
 * substrings almost everywhere: function words in non-English multi-word
 * queries (Spanish "de", German "der", ...) match inside unrelated words
 * (e.g. "de" inside "developer-tools"), and even common short English words
 * like "web" match dozens of unrelated descriptions ("...for the web...",
 * "web-analytics", ...). A short but meaningful token like "ai", "ui" or
 * "cms" still matches fine via the exact check regardless of this threshold.
 */
const MIN_PARTIAL_TOKEN_LENGTH = 4;

/**
 * Minimum query length before it's allowed to match *inside* a longer
 * taxonomy candidate phrase (see `expandQuery`). Below this, only an exact
 * match against a candidate counts, to avoid e.g. "ai" matching "container
 * orchestration" purely because the letters happen to appear in sequence.
 */
const MIN_EXPANSION_QUERY_LENGTH = 4;

/**
 * Query-expansion terms are scored at a fraction of a direct match. This
 * lets a synonym (e.g. "로그인" expanding to "authentication") surface
 * relevant projects without ever outranking a literal, exact match — so
 * "vector database" still puts Milvus/Qdrant ahead of generic databases
 * purely on direct keyword matches, with expansion only adding on top.
 */
const EXPANSION_WEIGHT = 0.5;

function tokenize(query: string): string[] {
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return Array.from(new Set(tokens));
}

/**
 * Expands a raw query into canonical taxonomy terms (see
 * `lib/i18n/keyword-taxonomy.ts`) based on the active locale's synonyms.
 * English synonyms are always considered too, since users on any locale may
 * type an English technical term. Matching is done against the whole
 * (normalized) query so multi-word, space-free CJK phrases work without a
 * separate word segmenter.
 */
function expandQuery(query: string, locale: Locale): string[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  const expansions = new Set<string>();

  for (const entry of keywordTaxonomy) {
    const localeSynonyms = entry.synonyms[locale] ?? [];
    const enSynonyms = entry.synonyms.en ?? [];
    const candidates = [
      entry.canonical,
      entry.canonical.replace(/-/g, " "),
      ...localeSynonyms,
      ...enSynonyms,
    ];

    const matched = candidates.some((candidate) => {
      const value = candidate.toLowerCase();
      if (normalized === value) return true;
      if (value.length >= MIN_PARTIAL_TOKEN_LENGTH && normalized.includes(value)) return true;
      // Only let a *short* query match inside a longer candidate phrase once
      // it's long enough that an accidental substring hit is unlikely (e.g.
      // "ai" must not match "container orchestration" just because it
      // contains the letters "ai").
      if (normalized.length >= MIN_EXPANSION_QUERY_LENGTH && value.includes(normalized)) return true;
      return false;
    });

    if (matched) {
      expansions.add(entry.canonical);
      for (const related of entry.related) expansions.add(related);
    }
  }

  return Array.from(expansions);
}

/**
 * project.intents (see lib/schema.ts / docs/project-evaluation.md) records
 * what a project genuinely serves, curated at the same taxonomy-concept
 * granularity as keyword-taxonomy.ts. Exact match only, same rationale as
 * scoreExpansionTerm below: these are short curated ids, not free text.
 * Projects without `intents` always return 0 here, so this is a no-op for
 * any project that hasn't been curated yet.
 */
function scoreIntentMatch(term: string, project: Project): number {
  const intent = project.intents?.find((i) => i.concept === term);
  if (!intent) return 0;
  if (intent.strength === "primary") return INTENT_PRIMARY_MATCH;
  if (intent.strength === "secondary") return INTENT_SECONDARY_MATCH;
  return INTENT_RELATED_MATCH;
}

function scoreTokenAgainstProject(
  token: string,
  project: Project,
  categories: Category[],
  weight: number,
): number {
  let best = 0;
  const allowPartial = token.length >= MIN_PARTIAL_TOKEN_LENGTH;

  const name = project.name.toLowerCase();
  if (name === token) best = Math.max(best, NAME_EXACT);
  else if (allowPartial && name.includes(token)) best = Math.max(best, NAME_PARTIAL);

  for (const keyword of project.keywords) {
    const value = keyword.toLowerCase();
    if (value === token) best = Math.max(best, KEYWORD_EXACT);
    else if (allowPartial && value.includes(token)) best = Math.max(best, KEYWORD_PARTIAL);
  }

  for (const categorySlug of project.categories) {
    if (categorySlug === token) best = Math.max(best, CATEGORY_EXACT);
    else if (allowPartial && categorySlug.includes(token)) best = Math.max(best, CATEGORY_PARTIAL);

    const category = categories.find((c) => c.slug === categorySlug);
    if (category) {
      const categoryName = category.name.toLowerCase();
      if (categoryName === token) best = Math.max(best, CATEGORY_EXACT);
      else if (allowPartial && categoryName.includes(token)) best = Math.max(best, CATEGORY_PARTIAL);
    }
  }

  for (const language of project.languages ?? []) {
    const value = language.toLowerCase();
    if (value === token) best = Math.max(best, LANGUAGE_EXACT);
    else if (allowPartial && value.includes(token)) best = Math.max(best, LANGUAGE_PARTIAL);
  }

  if (allowPartial && project.description.toLowerCase().includes(token)) {
    best = Math.max(best, DESCRIPTION_PARTIAL);
  }

  best = Math.max(best, scoreIntentMatch(token, project));

  return best * weight;
}

/**
 * Expansion terms (from the keyword taxonomy) only score on an *exact*
 * keyword or category match — never a substring. Unlike a user-typed token,
 * these are short curated acronyms (e.g. "sso", "rag", "iam"), and substring
 * matching against free-form descriptions is too prone to accidental
 * collisions (e.g. "sso" inside the word "processor").
 */
function scoreExpansionTerm(term: string, project: Project): number {
  let best = 0;
  if (project.keywords.some((keyword) => keyword.toLowerCase() === term)) {
    best = Math.max(best, KEYWORD_EXACT);
  }
  if (project.categories.includes(term)) {
    best = Math.max(best, CATEGORY_EXACT);
  }
  best = Math.max(best, scoreIntentMatch(term, project));
  return best * EXPANSION_WEIGHT;
}

export function searchProjects(
  query: string,
  projects: Project[],
  categories: Category[],
  locale: Locale,
): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const expansionTerms = expandQuery(query, locale).filter((term) => !tokens.includes(term));

  const results = projects.map((project) => {
    const tokenScores = tokens.map((token) => scoreTokenAgainstProject(token, project, categories, 1));
    const directScore = tokenScores.reduce((total, tokenScore) => total + tokenScore, 0);
    const matchesEveryToken = tokens.length > 1 && tokenScores.every((tokenScore) => tokenScore > 0);
    const coverageBonus = matchesEveryToken ? tokens.length * ALL_TOKENS_MATCHED_BONUS : 0;

    const expansionScore = expansionTerms.reduce(
      (total, term) => total + scoreExpansionTerm(term, project),
      0,
    );

    return { project, score: directScore + coverageBonus + expansionScore };
  });

  return results
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.project.name.localeCompare(b.project.name));
}
