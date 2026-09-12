# Contributing to FindOpenSource

Thank you for helping grow FindOpenSource! This guide walks you through adding a new open
source project, even if you've never made a pull request before.

There are two ways to contribute:

- **Add a project yourself** by editing a JSON file and opening a pull request (5 minutes).
- **Suggest a project** by opening a [GitHub Issue](../../issues/new?template=add-project.yml)
  if you're not comfortable editing code.

## Add a new project

### 1. Fork the repository

Click the "Fork" button at the top of this repository, then clone your fork:

```bash
git clone https://github.com/<your-username>/FindOpenSource.git
cd FindOpenSource
npm install
```

### 2. Create a project file

Every project is a single JSON file in `data/projects/`, named after the project's slug.

```text
data/projects/your-project.json
```

The slug must be lowercase, use hyphens instead of spaces, and match the `slug` field inside
the file exactly (e.g. `my-cool-project.json` → `"slug": "my-cool-project"`).

### 3. Fill in the information

Copy this template and fill in real information about the project:

```json
{
  "name": "Your Project",
  "slug": "your-project",
  "description": "A short, one-sentence description of what the project does.",
  "repository": "https://github.com/owner/your-project",
  "website": "https://your-project.dev",
  "documentation": "https://your-project.dev/docs",
  "categories": ["backend", "database"],
  "keywords": ["backend", "database", "self-hosted"],
  "languages": ["TypeScript"],
  "license": "MIT",
  "featured": false,
  "dateAdded": "2026-09-12"
}
```

**Field reference**

| Field           | Required | Description                                                                 |
| --------------- | -------- | ----------------------------------------------------------------------------|
| `name`          | Yes      | The project's display name.                                                 |
| `slug`          | Yes      | Lowercase, hyphen-separated identifier. Must match the file name.           |
| `description`   | Yes      | 10–280 characters. See tips below.                                          |
| `repository`    | Yes      | The GitHub repository URL (must start with `https://github.com/`).          |
| `website`       | No       | The project's official website, if it has one separate from GitHub.         |
| `documentation` | No       | A link to the docs, if available.                                          |
| `categories`    | Yes      | One or more slugs from `data/categories.json`. See below.                   |
| `keywords`      | Yes      | Terms people might search for. See tips below.                              |
| `languages`     | No       | Primary programming language(s) used by the project.                        |
| `license`       | Yes      | The project's license (e.g. `MIT`, `Apache-2.0`, `AGPL-3.0`).               |
| `featured`      | No       | Set to `true` only for well-established, widely used projects.              |
| `dateAdded`     | No       | `YYYY-MM-DD`. Used to sort "Recently Added". Set it to today's date; projects without it sort to the bottom of that list. |

#### Writing a good description

- One sentence, written for someone who has never heard of the project.
- Describe **what it does**, not how popular it is ("Open source CMS for..." not "The best CMS").
- Avoid marketing language and superlatives.

#### Choosing categories

Categories must be existing slugs from [`data/categories.json`](data/categories.json), for
example `authentication`, `database`, `cms`, `ai`. Pick every category that genuinely applies —
most projects fit 1 to 3. If you think a new category is needed, open an issue to discuss it
before adding it.

#### Choosing keywords

Keywords are what power search, so think about what someone would type when looking for this
project's *feature*, not just its name:

- Good: `authentication`, `login`, `oauth`, `sso`
- Avoid duplicating the project name itself as a keyword — that's already searchable.

#### Only verified information

Do not guess or invent information. If you're not sure about the exact license or an official
URL, check the project's own repository/README before submitting. Leave optional fields out
rather than filling them with a guess.

### 4. Validate your project

Run the validation script before opening a pull request:

```bash
npm run validate
```

This checks JSON syntax, required fields, valid categories, valid URLs, and duplicate
slugs/repositories. Fix any errors it reports.

### 5. Create a Pull Request

Commit your change and push it to your fork:

```bash
git add data/projects/your-project.json
git commit -m "Add Your Project"
git push origin main
```

Then open a pull request against `kth-0121/FindOpenSource`. Fill in the PR template checklist —
a maintainer will review and merge it once it passes validation.

## Development

```bash
npm install      # install dependencies
npm run dev       # start the local dev server
npm run lint       # lint the codebase
npm run typecheck  # run the TypeScript compiler
npm run validate   # validate all project data
npm run build      # production build
```

## Code of conduct

Be respectful and constructive in issues and pull requests. Disagreements about categorization
or wording are fine — keep the discussion focused on making the directory more useful.
