# FindOpenSource — Project Evaluation System

Internal operating document for how projects in this catalog are scored. This is not
a marketing document and it is not shown to users verbatim — it exists so that as the
catalog grows from 200 toward 500–1000 projects, whoever (human or agent) adds the
next batch applies the same rules the first 200 were scored with.

## 1. Purpose & Scope

FindOpenSource is not meant to be "a lot of GitHub links." The goal is: given what a
user is trying to build, surface projects that are both **relevant** to that intent
and **genuinely worth using**. Three separate, deliberately un-mixed scores support
that:

- **Quality Score** (0–100) — how good is this project, on its own, regardless of
  what anyone is searching for?
- **Intent** — what does this project genuinely serve, at the granularity of the
  search taxonomy? (Not a fixed number — see §4.)
- **Catalog Value** (0–5) — how much does *this catalog* benefit from including this
  project, given what else is already in it?

None of these replace `lib/search.ts`'s relevance scoring. They extend it.

## 2. Design Principles

1. **GitHub stars are never a quality input.** They're stored (`stargazersCount`) as
   inert reference metadata only. A well-marketed toy project and a boring
   mission-critical library can have wildly different star counts with no relationship
   to which one you should actually use.
2. **Conservative when uncertain.** Missing evidence contributes 0 to a sub-score —
   never averaged, never guessed upward. An unscored or under-evidenced project should
   never outrank a well-evidenced one by default.
3. **Every score must be derived, not hand-typed.** `evaluation.quality.score` is a
   pure function (`lib/evaluation/quality-score.ts`) of the other stored fields. If you
   ever see a `score` that doesn't match what `computeQualityScore` produces from its
   own `evaluation.quality` object, that's a bug — `npm run audit:projects` catches
   this as a "stale score" error.
4. **UI badges are evidence, not marketing.** A badge like "Actively maintained" is a
   mechanical readout of a stored field (`lastCommitAt` within 90 days). Never add a
   badge whose truth can't be traced to a specific stored value.
5. **Offline, build-time data gathering only.** Automated evidence comes from a
   one-time `gh api` pull (`scripts/collect-repo-metadata.ts`) into a gitignored cache.
   The deployed site never calls an external API at request time — it's still a fully
   static site.
6. **No auto-deletion.** A low score means `evaluation.flag` should be `"review"` or
   `"hold"`, not that the project gets removed. A human decides removals.

## 3. Score A — Quality Score (0–100)

70 points automated, 30 points manual/rubric-anchored. Computed by
`computeQualityScore()` in `lib/evaluation/quality-score.ts`.

### 3.1 Automated sub-scores

| Sub-score | Points | Based on | Thresholds |
|---|---|---|---|
| Maintenance Recency | 25 | `evaluation.quality.lastCommitAt` (from `gh api`'s `pushed_at`) | ≤30d: 25 · ≤90d: 20 · ≤180d: 14 · ≤365d: 8 · ≤730d: 3 · older: 0. `archived: true` forces this to 0 regardless of date. |
| Project Maturity | 10 | `evaluation.quality.repoCreatedAt` (from `gh api`'s `created_at`) | ≥5y: 10 · ≥3y: 8 · ≥1y: 5 · ≥0.5y: 2 · younger: 0 |
| Documentation Completeness | 15 | `project.documentation`, `project.website`, `project.longDescription` | `documentation` present: +6 · `website` present: +4 · `longDescription` ≥400 chars: +5 (present but shorter: +2) |
| License Clarity | 15 | `project.license`, classified by `lib/evaluation/license-classification.ts` | permissive: 15 · weak-copyleft: 12 · strong-copyleft: 9 · source-available: 3 · unrecognized: 0 |
| Metadata Breadth | 5 | `project.languages`, `project.keywords`, `project.description` | `languages` non-empty: +2 · `keywords.length ≥ 4`: +2 · `description.length ≥ 150`: +1 |

These five never need a human to type a number — they fall out of fields already on
the project, plus the one-time `gh api` pull.

### 3.2 Manual sub-scores

| Sub-score | Points | Tiers |
|---|---|---|
| Production Readiness | 20 | `foundational` (20) — infra-grade, used at massive scale (e.g. PostgreSQL, Kubernetes, Redis, Prometheus) · `mature` (14) — stable, commonly self-hosted, narrower adoption (e.g. Linkerd, Caddy) · `emerging` (8) — usable and actively used but younger or pre-1.0-feeling (e.g. most AI-native tooling under ~2 years old) · `experimental` (0) — the project's own docs say alpha/PoC |
| Governance / Backing | 10 | `foundation` (10) — CNCF/ASF/Linux Foundation/similar multi-stakeholder governance · `vendor-backed` (6) — one company primarily drives it (this is not a negative signal, just a category) · `community` (3) — no formal foundation or single controlling vendor · `unknown` (0) |

These require a curator (human or agent) to look at the project and place it in a
tier. Do this by comparing against the **named example projects** in each tier above
— don't invent new criteria per project.

Deliberately **not** included: a numeric "Community Health" axis (issue counts alone
are as distorted a signal as stars — a huge infra project naturally has thousands of
open issues) and a "Distinct Value" axis inside Quality Score (that's what Catalog
Value, §5, already measures — scoring it twice under two names just invites the two
numbers to drift apart for no reason).

### 3.3 Worked examples

- **PostgreSQL**: `foundational` governance (`foundation`, PostgreSQL Global
  Development Group), `foundational` readiness → 20+10 manual. Automated: long-lived
  repo (10/10 maturity), actively maintained (25/25 recency), permissive license
  (15/15), strong docs (website+docs+long longDescription, 15/15), full metadata
  (5/5) → 100/100.
- **Guidance** (Microsoft's structured-output library): `emerging` readiness (8),
  `vendor-backed` governance (6) → 14 manual. Younger/narrower project, moderate
  maintenance recency and metadata → lands around 68/100 ("consider" tier). Not a
  problem — it's a real, useful, smaller project, and the score says exactly that.
- **MinIO**: strong metadata and documentation, but the upstream repository is
  archived (confirmed via `gh api`, not assumed) → Maintenance Recency forced to 0
  regardless of otherwise-good signals. Combined with AGPL-3.0 (`strong-copyleft`,
  9/15) → 58/100, and `evaluation.flag: "hold"` was set explicitly. This is the system
  working as intended: a real, previously-popular project whose current status
  genuinely changed, surfaced honestly rather than silently kept at its old score.

### Quality tiers (internal only, never shown to users as a number)

`qualityTier()` in the same file: 90–100 exceptional · 80–89 excellent · 70–79 good ·
60–69 consider · below 60 review.

## 4. Score B — Intent

### 4.1 Why this isn't a static per-project number

"How well does this project match what the user searched for" is, by definition,
different for every query. A single `intentFit: 4` field on a project is
self-contradictory — 4 relative to *what*? Instead, each project stores **what it
genuinely serves**, at the same concept granularity as the existing search taxonomy
(`lib/i18n/keyword-taxonomy.ts`), and the actual fit for a specific query is computed
at search time by intersecting the query's expanded taxonomy terms with the project's
stored intents.

### 4.2 Shape

```ts
project.intents?: { concept: string; strength: "primary" | "secondary" | "related" }[]
```

- `concept` must be a canonical or `related` id that already exists in
  `lib/i18n/keyword-taxonomy.ts` — `scripts/validate-projects.ts` rejects anything
  else, the same way it rejects an invalid category.
- `strength` maps loosely onto the original 0–5 anchor scale from the initial spec:
  `primary` ≈ "core purpose" (5) · `secondary` ≈ "major feature" (4) · `related` ≈
  "related feature" (3) · absence of a tag = "unrelated" (0). Six fine-grained integer
  levels across ~200 projects × several intents each is not something a curator can
  apply consistently — three tiers is a deliberate simplification, not a permanent
  ceiling.
- Most projects don't need this field at all — their `categories` and `keywords`
  already do the job. Only add `intents` when a project serves a specific,
  regression-meaningful search intent that isn't already obvious from its category
  (e.g. Casbin isn't categorized "authentication" but genuinely serves
  `authorization`/`rbac`; Uppy genuinely serves `image-upload` even though its
  category is `ui`).
- **Don't** tag a concept that's identical to a category the project is already
  directly in — it doesn't add real signal and `npm run audit:projects` flags it as a
  warning (not an error; it's harmless because of how the scoring combines, but it's
  a sign the tag wasn't adding anything new).

### 4.3 How it plugs into `lib/search.ts`

Two new constants (`INTENT_PRIMARY_MATCH = 25`, `INTENT_SECONDARY_MATCH = 12`,
`INTENT_RELATED_MATCH = 5`) and one new function, `scoreIntentMatch(term, project)`,
called from exactly two places:

- `scoreTokenAgainstProject` — so a literal short query like `"sso"` (too short to
  trigger taxonomy expansion) still benefits from a project's own curated intent tag.
- `scoreExpansionTerm` — so a taxonomy-expanded query (e.g. `"login"` expanding to
  include `"sso"`) also benefits.

Both call sites use `Math.max(best, scoreIntentMatch(...))` — purely additive. A
project with no `intents` always gets 0 from this function, so it's a byte-for-byte
no-op for any project that hasn't been curated. The weight (25/12/5) sits between
`CATEGORY_EXACT` (15) and `KEYWORD_EXACT` (40): a curated claim is stronger evidence
than a broad category tag, but can never outrank a literal keyword/name match on the
same token.

### 4.4 Worked example

Query `"oauth"` before this system: only `auth-js`, `authelia`, `keycloak` matched (via
literal `keywords`). After curating SuperTokens with `{concept: "oauth", strength:
"secondary"}`: SuperTokens now appears too, at a low score that places it below all
three literal keyword matches — a genuinely relevant project that was previously
invisible for that specific query, without disturbing the existing top results.

## 5. Score C — Catalog Value (0–5)

```ts
project.evaluation?.catalogValue?: { rating: number /* 0-5 */; rationale: string /* 10-300 chars, mandatory */ }
```

- 5 — a very important, representative project for its category; losing it would
  meaningfully hurt that category page (e.g. Kubernetes for devops, PostgreSQL for
  database).
- 4 — very useful to users, a strong pick even if not singularly definitive.
- 3 — a good additional option; adds real but not essential diversity.
- 2 — meaningful overlap with something already in the catalog; still defensible.
- 1 — limited value; kept mainly to avoid an empty category.
- 0 — redundant; little independent reason to include it (reserved for cases this
  catalog should not actually contain — none of the current 200 project were rated
  this low, since they'd already been through prior editorial review before reaching
  this system).

`rationale` is mandatory specifically so every rating is auditable later — "why did we
say 3, not 4" should always be answerable by reading the field.

### 5.1 The category-scarcity hint

`min(project.categories.map(slug => categoryCount[slug]))` — a suggested *starting
point*, not a rule. A project in a category with only 2 other entries (e.g. `chat`,
`payments`) starts leaning toward a higher rating, since losing it leaves the category
thin; a project in a saturated category (e.g. `devops`, 35 entries) needs genuine
differentiation to clear the midpoint. This hint cannot detect *content* redundancy —
two projects can share a category and still be near-duplicates (PyTorch/TensorFlow are
correctly flagged by `npm run audit:projects` as high keyword-overlap, but both are
kept deliberately — see §9) — so the final number always stays a judgment call backed
by `rationale`, not a pure formula.

## 6. Evidence collection methodology

- `scripts/collect-repo-metadata.ts` runs `gh api repos/{owner}/{repo}` once per
  project (batched, concurrency-limited) and writes `pushed_at`, `created_at`,
  `archived`, `open_issues_count`, `stargazers_count` to a **gitignored** cache at
  `data/.cache/repo-metadata.json`. This is offline, one-time, build-time tooling —
  not a runtime dependency of the deployed site.
- `scripts/data/evaluation-manual-input.json` holds the hand-authored rubric fields
  (`productionReadiness`, `governance`, `catalogValue`, `intents`) for every project,
  authored in reviewable batches against the tiers in §3.2/§5.
- `scripts/apply-evaluation-data.ts` merges both sources, computes the final
  `quality.score` via `computeQualityScore`, and writes the result into
  `data/projects/*.json` — merging only the new keys into the existing parsed object
  so the diff stays minimal and reviewable.
- Re-running the pipeline (e.g. months later, to refresh maintenance recency) is safe
  and idempotent — it always recomputes from current evidence rather than
  incrementally patching.

## 7. Evidence → badge mapping

`lib/evaluation/badges.ts` (`getEvidenceBadges`, `getTopEvidenceBadge`). Badge keys
live in `Dictionary.evidenceBadges` (`lib/i18n/types.ts`), translated in all six
locale dictionaries. Never add a badge here without a corresponding mechanical rule
below.

| Badge key | Shown when |
|---|---|
| `activelyMaintained` | not archived, and `lastCommitAt` within 90 days |
| `wellDocumented` | `documentation` present AND `longDescription` ≥400 chars |
| `permissiveLicense` | `classifyLicense(project.license) === "permissive"` |
| `foundationBacked` | `evaluation.quality.governance === "foundation"` |

`ProjectCard` shows at most one badge (priority: `activelyMaintained` >
`foundationBacked` > `wellDocumented` > `permissiveLicense`) to stay compact. The
project detail page shows all that apply.

## 8. Evaluating a new project (checklist)

When adding project #201 and beyond:

1. Fill in the normal required fields (`CONTRIBUTING.md`) as before — this system adds
   to that flow, it doesn't replace it.
2. Run (or have an agent run) `scripts/collect-repo-metadata.ts` for the new repo, or
   manually look up `pushed_at`/`created_at`/`archived` via `gh api
   repos/{owner}/{repo}`.
3. Classify `productionReadiness` and `governance` against the tiers in §3.2 — compare
   against the named example projects, don't invent new criteria.
4. Decide `catalogValue.rating` using the category-scarcity hint as a starting point,
   write a `rationale` (10–300 chars) that would let someone else understand the
   number without asking you.
5. Only add `intents` if the project serves a specific taxonomy concept not already
   obvious from its `categories` — check `lib/i18n/keyword-taxonomy.ts` for valid
   concept ids first.
6. Run `scripts/apply-evaluation-data.ts` (or hand-compute via
   `computeQualityScore`) to get the final `quality.score` — never hand-type it.
7. Run `npm run validate` and `npm run audit:projects` — both should show 0 errors.

## 9. Known limitations & explicitly out-of-scope

- No automated "community health" signal (contributor count, issue response time) —
  a single `gh api` call can't produce a reliable one without many more calls per
  project; deliberately dropped rather than faked (§3.2).
- No global anti-repetition system for Related Projects across the whole site — only
  a per-project `hold`-flag exclusion and a same-tie quality tiebreak were added. A
  full frequency-balancing pass is a reasonable future increment if repetition turns
  out to be a real complaint, not something to build speculatively now.
- Intent strength is 3 tiers, not the original spec's 0–5/6-level scale — see §4.1.
- The audit script's "duplicate/near-redundant candidate" check (≥90% keyword overlap,
  same category) is informational only. Some flagged pairs (e.g. PyTorch/TensorFlow,
  Mattermost/Rocket.Chat) are intentionally both kept — genuinely different, valuable
  choices that happen to share most of their keywords. The check exists to surface
  candidates for a human to look at, not to imply either should be removed.
- `evaluation.quality.openIssuesCount` and `stargazersCount` are captured and stored
  but are, by design, never read by `computeQualityScore` or any badge — they exist
  purely as reference context for a future human review, consistent with the
  no-stars-as-quality rule extended to issue counts.

## 10. Rubric changelog

- **2026-09-15** — Initial version. 200 existing projects evaluated in this pass.
