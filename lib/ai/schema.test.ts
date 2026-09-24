import assert from "node:assert/strict";
import { test } from "node:test";
import { parseQueryUnderstanding } from "./schema";

test("valid response parses and passes through", () => {
  const result = parseQueryUnderstanding({
    intent: ["agent-memory"],
    categories: ["ai-agents"],
    concepts: ["agent-memory"],
    keywords: ["agent memory", "memory"],
    negative_concepts: [],
  });
  assert.deepEqual(result, {
    intent: ["agent-memory"],
    categories: ["ai-agents"],
    concepts: ["agent-memory"],
    keywords: ["agent memory", "memory"],
    negative_concepts: [],
  });
});

test("missing field is rejected", () => {
  assert.equal(parseQueryUnderstanding({ intent: [], categories: [], concepts: [], keywords: [] }), null);
});

test("non-array field is rejected", () => {
  assert.equal(
    parseQueryUnderstanding({
      intent: "agent-memory",
      categories: [],
      concepts: [],
      keywords: [],
      negative_concepts: [],
    }),
    null,
  );
});

test("unexpected extra field is rejected (strict schema)", () => {
  assert.equal(
    parseQueryUnderstanding({
      intent: [],
      categories: [],
      concepts: [],
      keywords: [],
      negative_concepts: [],
      recommended_project: "letta",
    }),
    null,
  );
});

test("oversized arrays are rejected", () => {
  assert.equal(
    parseQueryUnderstanding({
      intent: [],
      categories: [],
      concepts: [],
      keywords: Array.from({ length: 16 }, (_, i) => `k${i}`),
      negative_concepts: [],
    }),
    null,
  );
});

test("strings are trimmed and truncated", () => {
  const result = parseQueryUnderstanding({
    intent: ["  agent-memory  "],
    categories: [],
    concepts: [],
    keywords: ["a".repeat(100)],
    negative_concepts: [],
  });
  assert.equal(result?.intent[0], "agent-memory");
  assert.equal(result?.keywords[0].length, 64);
});

test("empty strings are dropped after trimming", () => {
  const result = parseQueryUnderstanding({
    intent: ["   ", "real-intent"],
    categories: [],
    concepts: [],
    keywords: [],
    negative_concepts: [],
  });
  assert.deepEqual(result?.intent, ["real-intent"]);
});
