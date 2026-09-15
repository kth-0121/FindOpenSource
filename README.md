# FindOpenSource

Discover open source projects by feature, technology and category — in English, Simplified
Chinese, Japanese, Korean, Spanish and German.

**[findoss.dev](https://findoss.dev)**

## What is FindOpenSource?

Most open source directories assume you already know the project you're looking for.
FindOpenSource starts from a different question:

> **"What open source can I use to build this feature?"**

Search "authentication", "chat", "CMS", "vector database" or "web scraping" and get a curated
list of open source projects that solve that problem — with enough information (license,
language, links) to quickly evaluate them.

FindOpenSource is a fully static, community-maintained directory. There is no login, no
database, and no backend service. Every project is a plain JSON file, reviewed and merged
through GitHub pull requests.

## Features

- **Feature-first search** — search by what you want to build, not just a project name.
- **Relevance-ranked results** — name, keyword, category, language and description matches are
  weighted and ranked, with multi-word query support.
- **Multilingual search** — search in any of the 6 supported languages; colloquial queries like
  "로그인" or "ログイン" expand to the canonical English keywords behind the scenes.
- **Shareable search URLs** — every search is a real URL (`/en/search?q=authentication`).
- **Category browsing** — 20 curated categories from AI to DevOps.
- **Static & fast** — built with the Next.js App Router; every localized project and category
  page is statically generated at build time.
- **SEO-friendly** — locale-aware metadata, OpenGraph, hreflang alternates, JSON-LD, sitemap and
  canonical URLs for every page.

## Languages

| Locale  | Language           |
| ------- | ------------------ |
| `en`    | English (default)  |
| `zh-CN` | Simplified Chinese |
| `ja`    | Japanese           |
| `ko`    | Korean             |
| `es`    | Spanish            |
| `de`    | German             |

Every route is locale-prefixed:

```text
/en
/en/projects/supabase
/en/categories/authentication
/en/search?q=authentication

/ko
/ko/projects/supabase
/ko/categories/authentication
/ko/search?q=로그인
```

Visiting an unprefixed URL (e.g. `/projects/supabase`, or bare `/`) redirects (308) to the
same path under `/en`, the default locale — there is no browser-language auto-redirect, so
crawling and sharing links stay predictable. A compact language switcher in the header lets
visitors change locale while preserving the current page and search query.

## Search

Search matches project `name`, `keywords`, `categories`, `languages` and `description`, with
each field weighted differently (name and keyword matches rank highest). Multi-word queries like
`image upload` are tokenized and scored independently, and projects matching *every* token get a
coverage bonus — so `vector database` still ranks Milvus and Qdrant above generic databases. See
[`lib/search.ts`](lib/search.ts) for the scoring implementation.

On top of that, a query-expansion layer (see [Multilingual keywords](#multilingual-keywords)
below) translates colloquial or non-English queries into the same canonical keywords, at a lower
weight than a direct match — so synonyms *help* results without ever outranking an exact match.

## Categories

AI & Machine Learning · Authentication & Security · Backend · Database · API · CMS ·
Chat & Messaging · Developer Tools · UI & Components · Analytics · Storage · Automation ·
DevOps · Search · Monitoring · E-commerce · Payments · Media · Testing · Mobile

Category **slugs** are stable and never translated (`/ko/categories/authentication`, not
`/ko/categories/인증`) — only the displayed name/description are localized. See
[`data/categories.json`](data/categories.json) for the canonical (English) list and
[`lib/i18n/dictionaries/`](lib/i18n/dictionaries/) for translated names/descriptions.

## Translations

- **UI text** (navigation, buttons, headings, empty states, the About/Contribute pages, ...)
  lives in [`lib/i18n/dictionaries/`](lib/i18n/dictionaries/), one file per locale, all
  implementing the same [`Dictionary`](lib/i18n/types.ts) TypeScript interface — so a missing key
  in any language is a compile-time error, not a blank string at runtime.
- **Project data** stays in one canonical (English) JSON file per project. A project can
  optionally add a `translations` object with a translated `description`/`keywords` per locale;
  English is always the fallback when a translation is missing. See
  [CONTRIBUTING.md](CONTRIBUTING.md#adding-translated-descriptions-optional).
- **Category names/descriptions** are fully translated in each dictionary file (categories are a
  small, maintainer-curated taxonomy, unlike the open-ended project list).

### Multilingual keywords

[`lib/i18n/keyword-taxonomy.ts`](lib/i18n/keyword-taxonomy.ts) maps natural-language synonyms
per locale (e.g. `authentication` ← `login`, `로그인`, `ログイン`, `inicio de sesión`,
`anmeldung`, ...) to the canonical keywords actually used in `data/projects/*.json`, plus a list
of related terms to boost (`oauth`, `sso`, `jwt`, ...). `lib/search.ts` expands the user's query
against this taxonomy before scoring. Add a new intent by adding an entry (or a new locale to an
existing one) — no changes to the search algorithm itself are needed.

### Adding a new language

1. Add the locale to `locales` in [`lib/i18n/config.ts`](lib/i18n/config.ts) (name, native name,
   BCP 47 tag, OpenGraph locale).
2. Add a new dictionary file in `lib/i18n/dictionaries/` implementing the `Dictionary` interface
   (TypeScript will flag any missing key) and register it in `get-dictionary.ts`.
3. Add category translations for all 20 slugs inside the new dictionary's `categories` field.
4. Optionally add synonyms for the new locale to `keyword-taxonomy.ts`.
5. Run `npm run build` — the new locale's static routes are generated automatically from
   `locales`, `data/projects/`, and `data/categories.json`; nothing else needs to change.

## Contributing

Anyone can add a project through a GitHub pull request — see
[CONTRIBUTING.md](CONTRIBUTING.md) for a step-by-step guide (about 5 minutes for your first PR).
Translations are entirely optional; English is the canonical, required baseline.
Not comfortable editing JSON? [Open an issue](../../issues/new?template=add-project.yml) instead.

## Development

```bash
npm install        # install dependencies
npm run dev         # start the local dev server at http://localhost:3000/en
npm run lint         # lint the codebase
npm run typecheck    # run the TypeScript compiler
npm run validate     # validate all project data in data/projects/
npm run build         # production build
```

## Project Structure

```text
app/
  [locale]/            Localized routes (root layout lives here — <html lang> per locale)
    page.tsx             Home page
    search/              Search results (/[locale]/search?q=...)
    projects/[slug]/     Project detail pages
    categories/[slug]/   Category pages
    about/, contribute/  Static content pages
    not-found.tsx        Localized 404
  sitemap.ts, robots.ts  Top-level SEO endpoints (locale-independent URLs)
middleware.ts          Prefixes unlocalized paths with the default locale (no browser-language redirect)
components/           Reusable UI components (locale/dict-aware) + LanguageSwitcher
data/
  projects/*.json        One canonical file per project; optional per-locale `translations`
  categories.json         Canonical (English) category definitions; stable slugs
lib/
  schema.ts               Zod schemas for projects & categories
  projects.ts, categories.ts   Data loaders with locale-aware resolution + fallback
  search.ts                Relevance-ranked, locale-aware search
  i18n/
    config.ts               Locales, default locale, BCP 47 / OpenGraph metadata
    types.ts                 Dictionary interface (source of truth for required UI strings)
    dictionaries/            One dictionary file per locale
    get-dictionary.ts        Locale → Dictionary lookup
    metadata.ts              hreflang / canonical / OpenGraph locale helpers
    keyword-taxonomy.ts       Multilingual search synonym taxonomy
    format.ts                 {placeholder} interpolation + pluralization helper
scripts/
  validate-projects.ts     Data validation, run in CI
.github/               Issue/PR templates and the validation workflow
```

## Roadmap

- [ ] Expand the project directory beyond the initial curated set
- [ ] Add more granular sub-categories as the directory grows
- [ ] Translate more project descriptions beyond the initial flagship set
- [ ] Additional locales (`fr`, `pt-BR`, `hi`, `ru`, ...)
- [ ] Google AdSense integration (layout already reserves ad space)
- [ ] Project logos / icons

## License

[MIT](LICENSE)
