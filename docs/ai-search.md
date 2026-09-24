# AI-Assisted Search

AI query understanding as a progressive enhancement over FindOSS's existing
keyword search (`lib/search.ts`). It is never a dependency: with the feature
fully unconfigured, search behaves exactly as it did before this existed.

`AI_QUERY_ENDPOINT` is any **OpenAI-compatible `/v1/chat/completions`
endpoint** — a local [OmniRoute](https://github.com/diegosouzapw/OmniRoute)
instance, OpenRouter, or any other gateway that speaks the same interface.
FindOSS builds the system prompt itself (`lib/ai/prompt.ts`) and sends it
with every request; the gateway only needs to route to a real model.

## Architecture

```
Browser (SearchExperience, debounced 400ms)
  |
  v
POST /api/search/understand  (this repo, app/api/search/understand/route.ts)
  |
  v
searchProjects(originalQuery, ...)  -- UNMODIFIED baseline, computed first
  |
  v
needsAIAssist(baseline)?  (lib/ai/enhance-search.ts -- see "When AI is called" below)
  |
  +-- no  -> {ok: false, reason: "baseline_sufficient"}  -- AI is NEVER called
  |
  +-- yes -> lib/ai/query-understanding.ts  -- cache + dedup + timeout
               |
               v
             lib/ai/gateway.ts -- builds an OpenAI chat-completions request
             with the system prompt (lib/ai/prompt.ts) + the user's query,
             POSTs to AI_QUERY_ENDPOINT
               |
               v
             AI_QUERY_ENDPOINT + AI_QUERY_MODEL  (one endpoint, one explicit
             model -- e.g. a local OmniRoute at
             http://localhost:20128/v1/chat/completions,
             model "gemini/gemini-3.1-flash-lite")
               |
               v
             [ gateway-side: provider auth + routing -- OmniRoute or
             similar, not in this repo ]
               |
               v
             chat completion response -- content parsed as JSON:
             {intent, categories, concepts, keywords, negative_concepts}
  |
  v
lib/ai/enhance-search.ts (client-side, SearchExperience.tsx) -- feeds
`keywords` into a SECOND UNMODIFIED searchProjects() call, unioned onto
the plain-keyword baseline computed in step 1
  |
  v
normal FindOSS search results
```

FindOSS only ever knows about **one** URL (`AI_QUERY_ENDPOINT`) and **one**
model id (`AI_QUERY_MODEL`). It never sees which upstream provider actually
answered, and never sees provider credentials — those live entirely on the
gateway (e.g. inside OmniRoute's own connection config).

## When AI is called

The AI gateway is called for a small minority of searches, not every
keystroke. `app/api/search/understand/route.ts` always computes the plain
`searchProjects(originalQuery, ...)` baseline **first**, server-side, and
only proceeds to `understandQuery()` (cache → dedup → gateway call) when
`needsAIAssist(baseline)` (`lib/ai/enhance-search.ts`) says the baseline is
weak:

```ts
const AI_ASSIST_SCORE_THRESHOLD = 100; // NAME_EXACT in lib/search.ts

function needsAIAssist(baseline: SearchResult[]): boolean {
  return baseline.length === 0 || baseline[0].score < AI_ASSIST_SCORE_THRESHOLD;
}
```

No new ranking heuristic was introduced — the threshold reuses
`lib/search.ts`'s own scoring scale. `100` is `NAME_EXACT`, the strongest
signal a single field can contribute (an exact project-name match). Below
that, the baseline's top result is built up only from partial/category/
description/expansion-level signals, i.e. weaker than the model's own
"this is unambiguously the right project" score. This was calibrated
against real catalog scores, not invented:

| Query | Baseline top score | AI called? |
|---|---|---|
| `authentication` | 160 (keycloak) | No — well above threshold |
| `vector database` | 150 (milvus/qdrant) | No |
| `기능 플래그 점진적 배포` | 100 (unleash) — exactly at the boundary | No — `100 < 100` is false |
| `AI 에이전트의 기억을 관리하고 싶다` | 95 (crewai — a broad, imprecise agent-framework match, not the memory-specific Letta/Mem0 a user wants) | Yes |
| `서버 이상 감지` | 0 results | Yes |

Only the top result's score is checked — a long tail of weak matches below
a genuinely strong #1 result doesn't trigger AI, and a single strong result
buried under many irrelevant ones still counts as "sufficient" (this is a
deliberate simplification, not a claim that score alone perfectly captures
relevance — see "Known limitation" below).

**Known limitation:** a scalar top-score threshold cannot distinguish "one
truly relevant strong match" from "one strong-scoring but wrong match" —
e.g. a broad multi-word natural-language query can occasionally score above
100 through accumulated partial/category signals across many tokens
without any single result being the right answer. This is a known,
accepted tradeoff (not a new problem introduced here — see
`docs/research/semantic-search-poc-v4-2026-09-17.md` and `-v5-...md` for
why a more precise "coverage-based" gate was explored and not adopted into
production). AI is deliberately biased toward being called too rarely
(favoring zero AI cost on already-good searches) rather than too often.

## Why results can only be added to, never reordered

`enhanceSearch()` (`lib/ai/enhance-search.ts`) runs `searchProjects(originalQuery, ...)`
unmodified first — that result list, its order, and its count are the
baseline and are always returned as-is, uncapped. AI-derived additions are
appended after it, never interleaved or reordered in.

**Each AI term (concept/keyword) is searched with its own
`searchProjects()` call — terms are never joined into one combined query
string.** Joining used to be how this worked, and it was a real bug:
`searchProjects()`'s own `isUnsupportedPartialOnly` noise guard
(`lib/search.ts`) zeroes a multi-token query's score when none of its
tokens landed a *trusted* (exact) match — a guard tuned for a user's own
multi-word phrase, where every word is expected to relate to the same
thing. A set of independent AI-generated terms doesn't satisfy that
assumption (e.g. `"token"`, `"cost"`, `"agent"` joined into one query
triggered the guard and silently returned zero results, even though
`"agent"` alone matches dozens of real agent projects in the catalog).
Searching each term separately avoids the guard for terms that are
individually meaningful.

**AI search terms come from `concepts` + `keywords` only — never
`categories`.** Categories are real FindOSS category slugs (`ai`,
`backend`, `devops`, ...) shared by dozens of projects each; searching one
as a literal term floods the result with everything in that category
rather than anything specific to the query. `categories` stays on the
`QueryUnderstanding` object (available for future display use) but is
never fed into `searchProjects()`.

**Two caps keep AI additions a precision boost instead of more noise**
(`lib/ai/enhance-search.ts`):

- `AI_TERM_RESULT_LIMIT = 3` — only each term's own top 3 matches
  (`searchProjects()`'s own ranking, unmodified) become candidates.
- `AI_RESULT_LIMIT = 8` — across all terms combined, at most 8 total
  additions are appended. A project found by multiple terms is deduplicated
  down to one entry, keeping the single highest score any term produced
  for it (never a recomputed/blended score). The cap applies **only** to
  AI additions; baseline is never capped or reordered.

A small, explicit, non-generated exclusion list
(`OVERLY_GENERIC_TERMS` in `lib/ai/enhance-search.ts`: `ai`, `tool`,
`tools`, `web`, `platform`, `application`, `app`, `backend`) drops AI terms
observed to match a large fraction of the whole catalog on their own —
this is not a stopword system, just the handful of concrete words that
misbehaved in practice.

This was validated against the 10 regression queries from prior
search-quality research (`docs/research/semantic-search-poc-v7-2026-09-17.md`,
`docs/research/semantic-search-poc-v8-2026-09-21.md`): queries that already
returned results keep the identical baseline order and count with AI
enhancement on; previously zero-result queries (e.g. "서버 이상 감지")
gain up to 8 relevant additions only when AI terms are supplied.

## Model selection — never "auto"

`AI_QUERY_MODEL` must be a specific model id (e.g.
`gemini/gemini-3.1-flash-lite`), never an auto-routing alias like `"auto"`.
On a multi-provider gateway, auto-routing picks from *every connected
provider*, including ones with no free-tier guarantee of legitimacy —
verified firsthand against a local OmniRoute instance, where `model: "auto"`
silently fell back to a reverse-engineered free provider (`felo-web`, a
scraped third-party endpoint) after the intended provider rejected the
request. Always pin an explicit model backed by a provider you deliberately
connected with an official API key.

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `AI_QUERY_ENABLED` | no | `false` | Server-side gate. Must be `"true"` for the AI layer to ever be called. |
| `AI_QUERY_ENDPOINT` | if enabled | unset | An OpenAI-compatible `/v1/chat/completions` URL. |
| `AI_QUERY_MODEL` | if enabled | unset | Explicit model id as the gateway expects it. Never `"auto"` (see above). |
| `AI_QUERY_ENDPOINT_TOKEN` | no | unset | Sent as `Authorization: Bearer <token>`. Never exposed to the browser. |
| `AI_QUERY_TIMEOUT_MS` | no | `1500` | Abort the gateway call after this many ms and fall back. |
| `AI_QUERY_CACHE_TTL` | no | `86400` (seconds) | Server-side cache TTL for successful results. |
| `NEXT_PUBLIC_AI_QUERY_ENABLED` | no | `false` | Client-side mirror: whether the browser bothers calling `/api/search/understand` at all. Keep in sync with `AI_QUERY_ENABLED` manually; a mismatch only wastes or skips one harmless request, it is not a security boundary. |

With `AI_QUERY_ENABLED=false` (the shipped default), no code path in this
feature ever runs a network request beyond same-origin `fetch` calls that
short-circuit instantly.

## Request/response contract

Request (`POST AI_QUERY_ENDPOINT`, OpenAI chat-completions shape, built by
`lib/ai/gateway.ts`):

```json
{
  "model": "gemini/gemini-3.1-flash-lite",
  "temperature": 0,
  "max_tokens": 400,
  "messages": [
    { "role": "system", "content": "<lib/ai/prompt.ts buildSystemPrompt()>" },
    { "role": "user", "content": "Locale: ko\nQuery: AI 에이전트의 기억을 관리하고 싶다" }
  ]
}
```

Expected response: a standard chat-completion object whose
`choices[0].message.content` is a string containing this exact JSON shape
(markdown code fences around it are tolerated and stripped):

```json
{
  "intent": ["agent-memory"],
  "categories": ["ai-agents"],
  "concepts": ["agent-memory"],
  "keywords": ["agent memory", "memory", "long-term memory"],
  "negative_concepts": []
}
```

Validated by `lib/ai/schema.ts` (`zod`, `.strict()`): all five fields
required, all arrays of strings, capped at `intent<=5`, `categories<=5`,
`concepts<=10`, `keywords<=15`, `negative_concepts<=10`, each string
trimmed and truncated to 64 chars. Any other shape (missing field, wrong
type, extra field, oversized array, content that isn't valid JSON at all)
is treated as a failed response — `lib/ai/query-understanding.ts` returns
`null` and the client falls back to plain keyword search.

`locale` is one of `en`, `zh-CN`, `ja`, `ko`, `es`, `de` (`lib/i18n/config.ts`).

### System prompt

Built by `buildSystemPrompt()` in `lib/ai/prompt.ts` and sent with every
request — never configured gateway-side, so FindOSS's category vocabulary
(`data/categories.json`) always stays in sync automatically. The prompt
tells the model:

- it never has catalog access and must never name/recommend/rank a project
- decompose the query into `intent` (1-3 short English phrases),
  `categories` (preferring FindOSS's real category slugs), `concepts`
  (kebab-case), `keywords` (literal/substring-friendly English terms), and
  `negative_concepts` (terms to avoid due to lexical collisions, e.g. avoid
  the bare word "token" for an LLM-cost query since it collides with the
  unrelated auth library "SuperTokens")
- respond with only the JSON object, no prose, no code fences

Only category slugs/names are included — never the 215-project catalog,
README files, or any per-project metadata.

## Fallback behavior

Any of the following is treated identically — `null` from
`lib/ai/query-understanding.ts`, which `enhanceSearch()` treats as "use
plain keyword search only":

- baseline `searchProjects()` is already sufficient (`needsAIAssist` is
  `false`, `reason: "baseline_sufficient"`) — the AI gateway is never even
  called in this case, this isn't a failure, just "not needed"
- `AI_QUERY_ENABLED` is not `"true"`, or `AI_QUERY_ENDPOINT`/`AI_QUERY_MODEL` is unset
- network error / DNS failure / connection refused
- timeout (`AI_QUERY_TIMEOUT_MS`, default 1500ms)
- non-2xx HTTP response (including gateway errors like insufficient
  balance, exhausted credits, or an upstream provider rejecting the request)
- response `content` is missing or not valid JSON (even after stripping code fences)
- response JSON doesn't match the strict schema (missing/extra/wrong-typed field, oversized array)
- per-IP rate limit exceeded (20 requests/min, `lib/ai/rate-limit.ts`)

The API route (`app/api/search/understand/route.ts`) always responds `200`
with `{ok: false, reason: "..."}` in every one of these cases — there is no
error status the client branches on, and the client never shows an error
state to the user.

## Cache

`lib/ai/cache.ts` is a plain in-memory `Map` at module scope, keyed by
`${locale}:${normalized query}`. On Vercel this persists across requests
within one warm serverless instance and resets on cold start or scale-out
to a different instance — not a shared/global cache. That's an intentional,
zero-infrastructure tradeoff: a cache miss just costs one extra gateway
call, it never breaks search. No Redis/KV was introduced for this feature;
if real usage ever shows the hit rate matters enough to justify one, add it
behind the same `getCached`/`setCached` interface.

Concurrent requests for the same cache key are deduplicated
(`dedupe()` in `lib/ai/cache.ts`) — only the first caller hits the gateway,
the rest await the same in-flight promise.

## Rate limiting

`lib/ai/rate-limit.ts` is a minimal in-memory fixed-window limiter (20
requests/minute per `x-forwarded-for` IP), scoped only to the AI endpoint.
Same serverless-instance caveat as the cache. Plain keyword search
(`searchProjects`) is never gated by this — hitting the limit only turns
off the AI enhancement for that IP for the rest of the window.

## Local development

- Default (`AI_QUERY_ENABLED` unset/`false`): identical to search before
  this feature — no code path here makes a network call.
- `AI_QUERY_ENABLED=true` with `AI_QUERY_ENDPOINT` or `AI_QUERY_MODEL`
  missing: `isAIQueryEnabled()` (`lib/ai/gateway.ts`) returns `false`, same
  as fully disabled. Does not crash.
- `AI_QUERY_ENABLED=true` with an endpoint that's down/unreachable/out of
  credits: every call times out or errors, falls back per-request. Does not crash.

### Running against a local OmniRoute instance

1. Run OmniRoute locally (`npm install omniroute` in an isolated directory
   — never as a FindOSS dependency), bind it to loopback only
   (`OMNIROUTE_SERVER_HOST=127.0.0.1`) — OmniRoute's own default is
   `0.0.0.0` with no API-key requirement, which is unnecessarily exposed
   for a local dev tool.
2. Connect one official, API-key-based provider (Gemini via Google AI
   Studio, Groq, Cerebras, DeepSeek, Mistral, ...) through the OmniRoute
   dashboard. Avoid OmniRoute's `noAuth` "free" provider pool and any
   `*-web` cookie-session provider — see the model-selection note above and
   the security review in this repo's chat history for why.
3. Generate an OmniRoute API key scoped without admin access.
4. Set in `.env.local` (never committed):
   ```
   AI_QUERY_ENABLED=true
   AI_QUERY_ENDPOINT=http://localhost:20128/v1/chat/completions
   AI_QUERY_MODEL=gemini/gemini-3.1-flash-lite
   AI_QUERY_ENDPOINT_TOKEN=<the OmniRoute key>
   NEXT_PUBLIC_AI_QUERY_ENABLED=true
   ```
5. `npm run dev`, search for a Korean/Japanese/Spanish query from
   `docs/research/semantic-search-poc-v7-2026-09-17.md` and confirm
   AI-enhanced results appear below the baseline keyword results.

## Deployment

- `findoss.dev` — Vercel, this repository, unchanged serverless deployment.
- The AI gateway (OmniRoute or equivalent) is **out of scope for this
  repository** to host — run it wherever makes sense (a VPS, or locally for
  development only). It must expose an OpenAI-compatible
  `/v1/chat/completions` endpoint. Set `AI_QUERY_ENABLED=true`,
  `AI_QUERY_ENDPOINT`, `AI_QUERY_MODEL`, and optionally
  `AI_QUERY_ENDPOINT_TOKEN` in Vercel's environment variables, plus
  `NEXT_PUBLIC_AI_QUERY_ENABLED=true` to let the client start calling it.
  A gateway bound to `127.0.0.1`-only (e.g. a local dev instance) is not
  reachable from Vercel — production needs a gateway with a real, reachable
  URL.

## Files

| File | Purpose |
|---|---|
| `lib/ai/schema.ts` | zod schema + validation/normalization for the AI response |
| `lib/ai/prompt.ts` | builds the system prompt sent with every gateway request |
| `lib/ai/gateway.ts` | OpenAI-chat-completions client for `AI_QUERY_ENDPOINT`, timeout, enabled-check |
| `lib/ai/cache.ts` | TTL cache + in-flight request dedup |
| `lib/ai/rate-limit.ts` | per-IP fixed-window limiter for the AI endpoint |
| `lib/ai/query-understanding.ts` | orchestrates the above; `understandQuery(query, locale)` |
| `lib/ai/enhance-search.ts` | `enhanceSearch()` — additive merge onto `searchProjects()`; `needsAIAssist()` — the baseline-quality gate |
| `app/api/search/understand/route.ts` | the one HTTP endpoint the client calls |
| `components/SearchExperience.tsx` | debounced client hook, calls the endpoint, passes result into `enhanceSearch()` |
| `lib/ai/*.test.ts` | `npm run test` (Node's built-in test runner via `tsx --test`, no new test framework added) |
