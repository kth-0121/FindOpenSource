import type { Locale } from "@/lib/i18n/config";
import { callGateway, isAIQueryEnabled } from "./gateway";
import { cacheKey, dedupe, getCached, setCached } from "./cache";
import { parseQueryUnderstanding, type QueryUnderstanding } from "./schema";

/**
 * Server-only entry point: AI-assisted query understanding for search, with
 * caching and request dedup. Returns null whenever AI is disabled,
 * unconfigured, or fails in any way -- callers must always have a plain
 * `searchProjects(query, ...)` fallback and must never block on this
 * resolving (see docs/ai-search.md#fallback-behavior).
 */
export async function understandQuery(
  query: string,
  locale: Locale,
): Promise<QueryUnderstanding | null> {
  const normalized = query.trim();
  if (!normalized || !isAIQueryEnabled()) return null;

  const key = cacheKey(normalized, locale);
  const cached = getCached(key);
  if (cached) return cached;

  return dedupe(key, async () => {
    const raw = await callGateway({ query: normalized, locale });
    if (raw === null) return null;

    const understanding = parseQueryUnderstanding(raw);
    if (!understanding) return null;

    setCached(key, understanding);
    return understanding;
  });
}
