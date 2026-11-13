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
const LONG_DESCRIPTION_PARTIAL = 3;
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
 * The length guards here are tuned for alphabetic words. A Korean, Japanese
 * or Chinese word carries the same meaning in 2-3 characters ("로그인",
 * "認証", "数据库"), so holding it to 4 would switch off description and
 * synonym matching for nearly every CJK query.
 */
const CJK = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/;
const minPartialLength = (text: string) => (CJK.test(text) ? 2 : MIN_PARTIAL_TOKEN_LENGTH);

/**
 * Substring match that, for alphabetic words, must begin at a word start:
 * "logging" must not hit "blogging", nor "base" hit "database". CJK text has
 * no word boundaries to anchor on, so it stays a plain substring match.
 */
function containsWord(text: string, word: string): boolean {
  if (CJK.test(word)) return text.includes(word);
  for (let i = text.indexOf(word); i !== -1; i = text.indexOf(word, i + 1)) {
    if (i === 0 || !/[a-z0-9]/.test(text[i - 1])) return true;
  }
  return false;
}

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
      if (value.length >= minPartialLength(value) && containsWord(normalized, value)) return true;
      // Only let a *short* query match inside a longer candidate phrase once
      // it's long enough that an accidental substring hit is unlikely (e.g.
      // "ai" must not match "container orchestration" just because it
      // contains the letters "ai").
      if (normalized.length >= MIN_PARTIAL_TOKEN_LENGTH && containsWord(value, normalized)) return true;
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

interface TokenMatch {
  score: number;
  // True when the token matched an exact field value or a curated intent
  // (see project.intents / docs/project-evaluation.md) rather than only a
  // raw substring hit -- used to tell a real signal apart from a compound
  // keyword like "configuration-management" merely containing the token.
  trusted: boolean;
}

function scoreTokenAgainstProject(
  token: string,
  project: Project,
  categories: Category[],
  // False when the token is one word of a longer query: a project merely
  // *named* that word ("Vector" for "vector db") must not outrank the
  // projects the whole phrase describes.
  soleToken: boolean,
): TokenMatch {
  let best = 0;
  let trusted = false;
  const allowPartial = token.length >= minPartialLength(token);

  const name = project.name.toLowerCase();
  if (name === token) {
    best = Math.max(best, soleToken ? NAME_EXACT : NAME_PARTIAL);
    trusted = true;
  } else if (allowPartial && containsWord(name, token)) best = Math.max(best, NAME_PARTIAL);

  for (const keyword of project.keywords) {
    const value = keyword.toLowerCase();
    if (value === token) {
      best = Math.max(best, KEYWORD_EXACT);
      trusted = true;
    } else if (allowPartial && containsWord(value, token)) best = Math.max(best, KEYWORD_PARTIAL);
  }

  for (const categorySlug of project.categories) {
    if (categorySlug === token) {
      best = Math.max(best, CATEGORY_EXACT);
      trusted = true;
    } else if (allowPartial && containsWord(categorySlug, token)) best = Math.max(best, CATEGORY_PARTIAL);

    const category = categories.find((c) => c.slug === categorySlug);
    if (category) {
      const categoryName = category.name.toLowerCase();
      if (categoryName === token) {
        best = Math.max(best, CATEGORY_EXACT);
        trusted = true;
      } else if (allowPartial && containsWord(categoryName, token)) best = Math.max(best, CATEGORY_PARTIAL);
    }
  }

  for (const language of project.languages ?? []) {
    const value = language.toLowerCase();
    if (value === token) {
      best = Math.max(best, LANGUAGE_EXACT);
      trusted = true;
    } else if (allowPartial && containsWord(value, token)) best = Math.max(best, LANGUAGE_PARTIAL);
  }

  if (allowPartial && containsWord(project.description.toLowerCase(), token)) {
    best = Math.max(best, DESCRIPTION_PARTIAL);
  } else if (allowPartial && containsWord(project.longDescription?.toLowerCase() ?? "", token)) {
    best = Math.max(best, LONG_DESCRIPTION_PARTIAL);
  }

  const intentScore = scoreIntentMatch(token, project);
  if (intentScore > 0) trusted = true;
  best = Math.max(best, intentScore);

  return { score: best, trusted };
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
  // "k8s" expands to "kubernetes": the project of that name belongs on top.
  if (project.name.toLowerCase() === term) best = NAME_EXACT;
  if (project.keywords.some((keyword) => keyword.toLowerCase() === term)) {
    best = Math.max(best, KEYWORD_EXACT);
  }
  if (project.categories.includes(term)) {
    best = Math.max(best, CATEGORY_EXACT);
  }
  best = Math.max(best, scoreIntentMatch(term, project));
  return best * EXPANSION_WEIGHT;
}

/** One insertion, deletion or substitution apart. */
function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  const [longer, shorter] = a.length >= b.length ? [a, b] : [b, a];
  return longer.slice(i + 1) === shorter.slice(longer.length === shorter.length ? i + 1 : i);
}

/**
 * Typo rescue for a query that found nothing: swaps each word for a project
 * name or keyword word one edit away ("postgers" has none, "kuberntes" ->
 * "kubernetes"). Returns the query unchanged when nothing is close.
 * ponytail: one edit, Latin words of 5+ letters only; no transpositions or
 * CJK. Swap in a real fuzzy matcher if typos turn out to matter more.
 */
function fixTypos(tokens: string[], projects: Project[]): string[] {
  const vocabulary = new Set(
    projects.flatMap((p) => [...p.name.toLowerCase().split(/\s+/), ...p.keywords.flatMap((k) => k.toLowerCase().split("-"))]),
  );
  return tokens.map((token) => {
    if (token.length < 5 || vocabulary.has(token)) return token;
    for (const word of vocabulary) if (word.length >= 4 && withinOneEdit(token, word)) return word;
    return token;
  });
}

export function searchProjects(
  query: string,
  projects: Project[],
  categories: Category[],
  locale: Locale,
  allowTypoFix = true,
): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const expansionTerms = expandQuery(query, locale).filter((term) => !tokens.includes(term));

  const results = projects.map((project) => {
    const tokenMatches = tokens.map((token) => scoreTokenAgainstProject(token, project, categories, tokens.length === 1));
    const tokenScores = tokenMatches.map((match) => match.score);
    const directScore = tokenScores.reduce((total, tokenScore) => total + tokenScore, 0);
    // A word that only turns up somewhere in the long description is too weak
    // to count as "this project covers that word".
    const matchesEveryToken =
      tokens.length > 1 && tokenScores.every((tokenScore) => tokenScore > LONG_DESCRIPTION_PARTIAL);
    const coverageBonus = matchesEveryToken ? tokens.length * ALL_TOKENS_MATCHED_BONUS : 0;

    const expansionScore = expansionTerms.reduce(
      (total, term) => total + scoreExpansionTerm(term, project),
      0,
    );

    // A multi-word query where one word only hit as a raw substring inside an
    // unrelated compound keyword (e.g. "management" inside a project's
    // "configuration-management" tag for the query "identity management"),
    // while the other word(s) matched nothing at all, and nothing else backs
    // the result up (no exact field/intent match, no taxonomy expansion) is
    // noise, not a real hit -- drop it instead of letting it fill a Top-5 slot.
    const hasTrustedMatch = tokenMatches.some((match) => match.trusted);
    const isUnsupportedPartialOnly =
      tokens.length > 1 && !matchesEveryToken && !hasTrustedMatch && expansionScore === 0;

    const score = isUnsupportedPartialOnly ? 0 : directScore + coverageBonus + expansionScore;

    return { project, score };
  });

  const found = results
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.project.name.localeCompare(b.project.name));
  if (found.length > 0 || !allowTypoFix) return found;

  const fixed = fixTypos(tokens, projects).join(" ");
  return fixed === tokens.join(" ") ? found : searchProjects(fixed, projects, categories, locale, false);
}
