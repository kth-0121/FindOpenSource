import type { Category, Project } from "@/lib/schema";
import type { Locale } from "@/lib/i18n/config";
import { searchProjects, type SearchResult } from "@/lib/search";
import type { QueryUnderstanding } from "./schema";

/**
 * Below this, baseline's top result never reached the strength of a single
 * NAME_EXACT match (lib/search.ts's strongest single-field signal, 100) --
 * i.e. everything in the result set is built up only from partial/category/
 * description/expansion-level signals. Calibrated against real catalog
 * scores (not invented): "authentication" (160), "vector database" (150),
 * and "기능 플래그 점진적 배포" (100) all clear this bar and skip the AI
 * call; "AI 에이전트의 기억을 관리하고 싶다" (95, a broad-but-imprecise
 * match on generic agent-framework projects, not the memory-specific ones
 * a user actually wants) and zero-result queries fall under it and get AI
 * assistance.
 */
const AI_ASSIST_SCORE_THRESHOLD = 100;

/**
 * Whether baseline keyword search alone is weak enough to justify calling
 * the AI query-understanding gateway -- reuses searchProjects()'s own score
 * scale rather than a new ranking heuristic: no results, or a top score
 * below AI_ASSIST_SCORE_THRESHOLD.
 */
export function needsAIAssist(baseline: SearchResult[]): boolean {
  return baseline.length === 0 || baseline[0].score < AI_ASSIST_SCORE_THRESHOLD;
}

/** Cap on how many distinct AI terms get their own searchProjects() call. */
const MAX_AI_SEARCH_TERMS = 8;

/** Search terms longer than this are treated as noise, not a real search term. */
const MAX_TERM_LENGTH = 40;

/** Per-term cap: only each term's own top matches become AI candidates. */
const AI_TERM_RESULT_LIMIT = 3;

/** Hard cap on total AI-derived additions to the final result -- baseline is never capped. */
const AI_RESULT_LIMIT = 8;

/**
 * Deliberately short, explicit list -- not a general stopword system.
 * Searching any of these alone matches a large fraction of the whole
 * catalog (broad category-ish words), which defeats the point of AI
 * additions being a precision boost rather than more noise. Extend this
 * list only by adding another concrete word observed to behave the same
 * way, never with a generated/heuristic stopword source.
 */
const OVERLY_GENERIC_TERMS = new Set([
  "ai",
  "tool",
  "tools",
  "web",
  "platform",
  "backend",
  "application",
  "app",
]);

/**
 * AI search terms come from `concepts` + `keywords` only -- never
 * `categories`. Categories are real FindOSS category slugs (`ai`, `backend`,
 * `devops`, ...) shared by dozens of projects each; searching them as a
 * literal term floods the result with everything in that category rather
 * than anything specific to the query. `categories` is preserved on the
 * `QueryUnderstanding` object (e.g. for future display use) but never fed
 * into `searchProjects()`. negative_concepts are never added here either --
 * simply never searching them is the natural way they're "applied" (see
 * docs/ai-search.md); no separate result-filtering pass is built for them.
 */
function collectSearchTerms(understanding: QueryUnderstanding): string[] {
  const seen = new Set<string>();
  const terms: string[] = [];
  for (const raw of [...understanding.concepts, ...understanding.keywords]) {
    const term = raw.trim();
    const key = term.toLowerCase();
    if (!term || term.length > MAX_TERM_LENGTH) continue;
    if (OVERLY_GENERIC_TERMS.has(key)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    terms.push(term);
    if (terms.length >= MAX_AI_SEARCH_TERMS) break;
  }
  return terms;
}

/**
 * AI-enhanced search that can only ADD to plain keyword search, never
 * reorder or remove from it: `searchProjects(originalQuery, ...)` runs
 * unmodified and its results/order are always kept as-is and are never
 * capped. AI-derived additions ARE capped (AI_RESULT_LIMIT) -- the cap
 * applies only to what gets appended, never to baseline.
 *
 * Each AI term (concept/keyword) is searched with its OWN
 * `searchProjects()` call rather than joining every term into one combined
 * query string. Joining matters: `searchProjects()`'s own
 * `isUnsupportedPartialOnly` noise guard (lib/search.ts) zeroes a
 * multi-token query's score when none of its tokens landed a *trusted*
 * (exact) match -- a guard tuned for a user's own multi-word phrase, where
 * every word is expected to relate to the same thing. A set of independent
 * AI-generated terms doesn't satisfy that assumption (e.g. "token", "cost",
 * "agent" joined into one query can trigger the guard and silently return
 * zero results, even though "agent" alone matches dozens of real agent
 * projects) -- searching each term separately avoids the guard entirely for
 * terms that are individually meaningful, and still benefits from it for
 * any individual term that's genuinely just noise.
 *
 * Precision, not recall, is the goal for the AI portion: only each term's
 * own top AI_TERM_RESULT_LIMIT matches (searchProjects()'s own ranking,
 * unmodified) become candidates, a project found by multiple terms keeps
 * its single highest observed score (still a score searchProjects() itself
 * produced -- never recomputed), and only the top AI_RESULT_LIMIT
 * candidates overall are appended.
 */
export function enhanceSearch(
  query: string,
  understanding: QueryUnderstanding | null,
  projects: Project[],
  categories: Category[],
  locale: Locale,
): SearchResult[] {
  const baseline = searchProjects(query, projects, categories, locale);
  if (!understanding) return baseline;

  const terms = collectSearchTerms(understanding);
  if (terms.length === 0) return baseline;

  const baselineSlugs = new Set(baseline.map((result) => result.project.slug));
  const candidates = new Map<string, SearchResult>();

  for (const term of terms) {
    const termResults = searchProjects(term, projects, categories, locale).slice(0, AI_TERM_RESULT_LIMIT);
    for (const result of termResults) {
      if (baselineSlugs.has(result.project.slug)) continue;
      const existing = candidates.get(result.project.slug);
      if (!existing || result.score > existing.score) {
        candidates.set(result.project.slug, result);
      }
    }
  }

  const additions = Array.from(candidates.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, AI_RESULT_LIMIT);

  return [...baseline, ...additions];
}
