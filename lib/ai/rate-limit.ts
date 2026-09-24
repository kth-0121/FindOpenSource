/**
 * Minimal per-IP fixed-window limiter for the AI query-understanding
 * endpoint only -- plain keyword search (searchProjects) is never gated by
 * this. Same module-scope-Map caveat as lib/ai/cache.ts: best-effort within
 * one warm serverless instance, not a global limit. Good enough here
 * because the failure mode of "limit didn't apply on some instance" is just
 * a few extra gateway calls, never a broken search experience.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}
