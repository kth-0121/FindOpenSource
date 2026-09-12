# FindOpenSource

Discover open source projects by feature, technology and category.

**[findopensource.com](https://findopensource.com)**

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
- **Shareable search URLs** — every search is a real URL (`/search?q=authentication`).
- **Category browsing** — 20 curated categories from AI to DevOps.
- **Static & fast** — built with the Next.js App Router; every project and category page is
  statically generated at build time.
- **SEO-friendly** — metadata, OpenGraph, JSON-LD, sitemap and canonical URLs for every page.

## Search

Search matches project `name`, `keywords`, `categories`, `languages` and `description`, with
each field weighted differently (name and keyword matches rank highest). Multi-word queries like
`image upload` are tokenized and scored independently, so projects matching more of the query
rank higher. See [`lib/search.ts`](lib/search.ts) for the scoring implementation.

## Categories

AI & Machine Learning · Authentication & Security · Backend · Database · API · CMS ·
Chat & Messaging · Developer Tools · UI & Components · Analytics · Storage · Automation ·
DevOps · Search · Monitoring · E-commerce · Payments · Media · Testing · Mobile

See [`data/categories.json`](data/categories.json) for the full list with descriptions.

## Contributing

Anyone can add a project through a GitHub pull request — see
[CONTRIBUTING.md](CONTRIBUTING.md) for a step-by-step guide (about 5 minutes for your first PR).
Not comfortable editing JSON? [Open an issue](../../issues/new?template=add-project.yml) instead.

## Development

```bash
npm install        # install dependencies
npm run dev         # start the local dev server at http://localhost:3000
npm run lint         # lint the codebase
npm run typecheck    # run the TypeScript compiler
npm run validate     # validate all project data in data/projects/
npm run build         # production build
```

## Project Structure

```text
app/                  Next.js App Router pages
  page.tsx              Home page
  search/               Search results (/search?q=...)
  projects/[slug]/      Project detail pages
  categories/[slug]/    Category pages
  sitemap.ts, robots.ts SEO endpoints
components/           Reusable UI components
data/
  projects/*.json        One file per project
  categories.json         Category definitions
  keywords.json            Popular search terms shown on the homepage
lib/
  schema.ts               Zod schemas for projects & categories
  projects.ts, categories.ts   Data loaders
  search.ts                Relevance-ranked search
scripts/
  validate-projects.ts     Data validation, run in CI
.github/               Issue/PR templates and the validation workflow
```

## Roadmap

- [ ] Expand the project directory beyond the initial curated set
- [ ] Add more granular sub-categories as the directory grows
- [ ] Google AdSense integration (layout already reserves ad space)
- [ ] Project logos / icons

## License

[MIT](LICENSE)
