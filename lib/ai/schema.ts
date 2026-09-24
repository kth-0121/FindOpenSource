import { z } from "zod";

/**
 * Structured search-intent contract returned by the AI query-understanding
 * gateway (see docs/ai-search.md). The AI never sees the project catalog and
 * never names/ranks a project -- only these five arrays of short strings.
 */
export const queryUnderstandingSchema = z
  .object({
    intent: z.array(z.string()).max(5),
    categories: z.array(z.string()).max(5),
    concepts: z.array(z.string()).max(10),
    keywords: z.array(z.string()).max(15),
    negative_concepts: z.array(z.string()).max(10),
  })
  .strict();

export type QueryUnderstanding = z.infer<typeof queryUnderstandingSchema>;

const MAX_STRING_LENGTH = 64;

function normalizeStringArray(values: string[]): string[] {
  return values
    .map((value) => value.trim().slice(0, MAX_STRING_LENGTH))
    .filter((value) => value.length > 0);
}

/**
 * Validates and normalizes a raw gateway response. Returns null for anything
 * that doesn't fit the contract -- the caller always falls back to plain
 * keyword search on null, so this is intentionally strict (reject rather
 * than coerce unexpected shapes).
 */
export function parseQueryUnderstanding(raw: unknown): QueryUnderstanding | null {
  const result = queryUnderstandingSchema.safeParse(raw);
  if (!result.success) return null;

  return {
    intent: normalizeStringArray(result.data.intent),
    categories: normalizeStringArray(result.data.categories),
    concepts: normalizeStringArray(result.data.concepts),
    keywords: normalizeStringArray(result.data.keywords),
    negative_concepts: normalizeStringArray(result.data.negative_concepts),
  };
}
