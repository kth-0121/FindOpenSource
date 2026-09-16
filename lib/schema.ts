import { z } from "zod";

export const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const projectTranslationSchema = z
  .object({
    description: z
      .string()
      .min(10, "translated description should be at least 10 characters")
      .max(280, "translated description should be at most 280 characters")
      .optional(),
    longDescription: z
      .string()
      .min(40, "translated longDescription should be at least 40 characters")
      .max(2500, "translated longDescription should be at most 2500 characters")
      .optional(),
    keywords: z.array(z.string().min(1)).min(1, "keywords, if provided, cannot be empty").optional(),
  })
  .strict();

// Explicit optional key per locale (rather than z.record) so an unknown
// locale key (e.g. "fr") is rejected by `.strict()` with a clear error,
// and no locale is ever required.
const projectTranslationsSchema = z
  .object({
    "zh-CN": projectTranslationSchema.optional(),
    ja: projectTranslationSchema.optional(),
    ko: projectTranslationSchema.optional(),
    es: projectTranslationSchema.optional(),
    de: projectTranslationSchema.optional(),
  })
  .strict();

const qualityEvidenceSchema = z
  .object({
    // Automated evidence, pulled once via `gh api` (see scripts/collect-repo-metadata.ts).
    // Never scored from a live API call at request time -- this is offline/build-time only.
    lastCommitAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    repoCreatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    archived: z.boolean().optional().default(false),
    // Inert reference metadata only -- never an input to computeQualityScore,
    // same rule the project already applies to GitHub stars.
    openIssuesCount: z.number().int().nonnegative().optional(),
    stargazersCount: z.number().int().nonnegative().optional(),
    // Manual, rubric-anchored evidence (see docs/project-evaluation.md).
    productionReadiness: z
      .enum(["foundational", "mature", "emerging", "experimental"])
      .optional(),
    governance: z.enum(["foundation", "vendor-backed", "community", "unknown"]).optional(),
    // Computed: a pure function of the fields above (lib/evaluation/quality-score.ts).
    // Never hand-typed -- scripts/audit-projects.ts flags any mismatch as stale.
    score: z.number().int().min(0).max(100).optional(),
    evaluatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  })
  .strict();

const catalogValueSchema = z
  .object({
    rating: z.number().int().min(0).max(5),
    rationale: z.string().min(10).max(300),
  })
  .strict();

/**
 * Distinct from `translations`/`keywords`: this is not user-facing content,
 * it's internal curation metadata consumed by lib/evaluation/*, the audit
 * script, and (as badges/tiebreakers only) the UI and getRelatedProjects.
 * Entirely optional so existing/new projects without it still validate.
 */
const projectEvaluationSchema = z
  .object({
    quality: qualityEvidenceSchema.optional(),
    catalogValue: catalogValueSchema.optional(),
    flag: z.enum(["ok", "review", "hold"]).optional().default("ok"),
  })
  .strict();

/**
 * What this project genuinely serves, at the granularity of the canonical
 * search taxonomy (lib/i18n/keyword-taxonomy.ts) -- NOT a fixed "intent fit"
 * number, since fit is inherently query-relative. `strength` is a curated,
 * consistently-applicable 3-tier judgment (not the original 0-5 scale --
 * see docs/project-evaluation.md for why). `concept` must be a canonical or
 * related id from the taxonomy (enforced by scripts/validate-projects.ts).
 */
const projectIntentSchema = z
  .object({
    concept: z.string().min(1),
    strength: z.enum(["primary", "secondary", "related"]),
  })
  .strict();

export const projectSchema = z.object({
  name: z.string().min(1, "name is required"),
  slug: z
    .string()
    .regex(slugPattern, "slug must be lowercase kebab-case (e.g. my-project)"),
  description: z
    .string()
    .min(10, "description should be at least 10 characters")
    .max(280, "description should be at most 280 characters"),
  /**
   * Optional longer, original (not copy-pasted from the README) explanation
   * for the project detail page: what it is, what problem it solves, main
   * capabilities, typical use cases. Plain text; paragraphs are separated by
   * a blank line ("\n\n").
   */
  longDescription: z
    .string()
    .min(40, "longDescription should be at least 40 characters")
    .max(2500, "longDescription should be at most 2500 characters")
    .optional(),
  repository: z
    .string()
    .url("repository must be a valid URL")
    .refine(
      (url) => url.startsWith("https://github.com/"),
      "repository must be a GitHub URL (https://github.com/...)",
    ),
  website: z.string().url("website must be a valid URL").optional(),
  documentation: z.string().url("documentation must be a valid URL").optional(),
  categories: z
    .array(z.string())
    .min(1, "at least one category is required"),
  keywords: z.array(z.string().min(1)).min(1, "at least one keyword is required"),
  languages: z.array(z.string().min(1)).optional(),
  license: z.string().min(1, "license is required"),
  featured: z.boolean().optional().default(false),
  dateAdded: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "dateAdded must be in YYYY-MM-DD format")
    .optional(),
  /**
   * Optional per-locale overrides for `description` and `keywords`. English
   * (the fields above) is always the canonical fallback — a project does not
   * need a translation for every locale, or any at all.
   */
  translations: projectTranslationsSchema.optional(),
  /** Internal curation metadata. See docs/project-evaluation.md. */
  evaluation: projectEvaluationSchema.optional(),
  /** What search intents this project genuinely serves. See docs/project-evaluation.md. */
  intents: z.array(projectIntentSchema).optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const categorySchema = z.object({
  slug: z.string().regex(slugPattern, "slug must be lowercase kebab-case"),
  name: z.string().min(1),
  description: z.string().min(1),
});

export type Category = z.infer<typeof categorySchema>;
