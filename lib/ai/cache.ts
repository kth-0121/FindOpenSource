import type { QueryUnderstanding } from "./schema";

/**
 * Module-scope in-memory cache. On Vercel this persists across requests
 * within the same warm serverless instance and resets on cold start or
 * scale-out to a new instance -- not a shared/global cache. That's an
 * acceptable, zero-infrastructure tradeoff for this feature (see
 * docs/ai-search.md#cache): a cache miss just costs one gateway call, never
 * breaks search. Do not reach for Redis/KV here unless real usage shows the
 * hit rate matters enough to justify it.
 */
const store = new Map<string, { value: QueryUnderstanding; expiresAt: number }>();
const inFlight = new Map<string, Promise<QueryUnderstanding | null>>();

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

function getTtlMs(): number {
  const raw = process.env.AI_QUERY_CACHE_TTL;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed * 1000 : DEFAULT_TTL_MS;
}

export function cacheKey(query: string, locale: string): string {
  return `${locale}:${query.trim().toLowerCase().replace(/\s+/g, " ")}`;
}

export function getCached(key: string): QueryUnderstanding | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

export function setCached(key: string, value: QueryUnderstanding): void {
  store.set(key, { value, expiresAt: Date.now() + getTtlMs() });
}

/**
 * Deduplicates concurrent requests for the same cache key: the first caller
 * runs `fetcher`, every concurrent caller for the same key awaits the same
 * promise instead of issuing its own gateway call.
 */
export function dedupe(
  key: string,
  fetcher: () => Promise<QueryUnderstanding | null>,
): Promise<QueryUnderstanding | null> {
  const existing = inFlight.get(key);
  if (existing) return existing;

  const promise = fetcher().finally(() => inFlight.delete(key));
  inFlight.set(key, promise);
  return promise;
}
