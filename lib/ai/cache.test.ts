import assert from "node:assert/strict";
import { test } from "node:test";
import { cacheKey, getCached, setCached, dedupe } from "./cache";
import type { QueryUnderstanding } from "./schema";

const sample: QueryUnderstanding = {
  intent: ["agent-memory"],
  categories: [],
  concepts: [],
  keywords: ["agent memory"],
  negative_concepts: [],
};

test("cacheKey normalizes locale + whitespace + case", () => {
  assert.equal(cacheKey("  Agent   Memory ", "ko"), "ko:agent memory");
});

test("set then get returns the cached value", () => {
  const key = cacheKey("cache-roundtrip", "en");
  setCached(key, sample);
  assert.deepEqual(getCached(key), sample);
});

test("get on an unknown key returns null", () => {
  assert.equal(getCached(cacheKey("never-cached-query", "en")), null);
});

test("dedupe reuses the in-flight promise for concurrent calls", async () => {
  const key = cacheKey("dedupe-test", "en");
  let calls = 0;
  const fetcher = () => {
    calls += 1;
    return new Promise<QueryUnderstanding | null>((resolve) =>
      setTimeout(() => resolve(sample), 10),
    );
  };

  const [a, b] = await Promise.all([dedupe(key, fetcher), dedupe(key, fetcher)]);
  assert.equal(calls, 1);
  assert.deepEqual(a, sample);
  assert.deepEqual(b, sample);
});

test("dedupe allows a fresh call once the previous one settled", async () => {
  const key = cacheKey("dedupe-sequential", "en");
  let calls = 0;
  const fetcher = () => {
    calls += 1;
    return Promise.resolve(sample);
  };

  await dedupe(key, fetcher);
  await dedupe(key, fetcher);
  assert.equal(calls, 2);
});
