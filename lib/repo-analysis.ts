/**
 * Pure logic for the GitHub repo analyzer (components/RepoAnalyzer.tsx):
 * parsing a repo reference, reading dependency manifests, matching
 * dependencies against catalog projects' verified `packages`, and picking
 * recommendations. No network access here -- the component does the fetching.
 */

export type Ecosystem = "npm" | "pypi" | "go" | "cargo";

export interface CatalogEntry {
  slug: string;
  name: string;
  categories: string[];
  packages: Partial<Record<Ecosystem, string[]>>;
  rating?: number;
  score?: number;
}

export type Dependencies = Partial<Record<Ecosystem, string[]>>;

export interface RepoRef {
  owner: string;
  repo: string;
}

const NAME = /^[A-Za-z0-9_.-]+$/;

/** Accepts "owner/repo", "github.com/owner/repo", or a full URL (extra path, ".git", query ignored). */
export function parseRepoInput(input: string): RepoRef | null {
  let text = input.trim();
  if (!text) return null;
  text = text.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
  if (/^github\.com\//i.test(text)) text = text.slice("github.com/".length);
  else if (text.includes(".") && text.split("/")[0].includes(".")) return null; // some other host
  const [owner, rawRepo] = text.split(/[/?#]/);
  const repo = rawRepo?.replace(/\.git$/i, "");
  if (!owner || !repo || !NAME.test(owner) || !NAME.test(repo) || /^\.+$/.test(repo)) return null;
  return { owner, repo };
}

export function parsePackageJson(text: string): string[] {
  try {
    const json = JSON.parse(text);
    return Object.keys({ ...json.dependencies, ...json.devDependencies, ...json.peerDependencies });
  } catch {
    return [];
  }
}

/** PEP 503 name normalization, so "Flask_SQLAlchemy" and "flask-sqlalchemy" compare equal. */
export function normalizePypi(name: string): string {
  return name.toLowerCase().replace(/[-_.]+/g, "-");
}

function pypiName(spec: string): string | null {
  const match = spec.trim().match(/^([A-Za-z0-9][A-Za-z0-9._-]*)/);
  return match ? normalizePypi(match[1]) : null;
}

export function parseRequirementsTxt(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter((line) => line && !line.startsWith("-"))
    .map(pypiName)
    .filter((name): name is string => Boolean(name));
}

/**
 * Reads PEP 621 arrays (`[project] dependencies`, `[project.optional-dependencies]`,
 * `[dependency-groups]`) and Poetry `[tool.poetry.*dependencies]` tables.
 * A line-based scan, not a TOML parser -- good enough for real-world manifests.
 */
export function parsePyprojectToml(text: string): string[] {
  const names = new Set<string>();
  const add = (spec: string) => {
    const name = pypiName(spec);
    if (name && name !== "python") names.add(name);
  };
  let section = "";
  let inArray = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, "");
    if (inArray) {
      for (const quoted of line.matchAll(/["']([^"']+)["']/g)) add(quoted[1]);
      if (line.includes("]")) inArray = false;
      continue;
    }
    const header = line.match(/^\s*\[([^\]]+)\]\s*$/);
    if (header) {
      section = header[1].trim();
      continue;
    }
    const isArraySection =
      section === "project.optional-dependencies" || section === "dependency-groups";
    const arrayStart = line.match(/^\s*([\w-]+)\s*=\s*\[(.*)$/);
    if (arrayStart && ((section === "project" && arrayStart[1] === "dependencies") || isArraySection)) {
      for (const quoted of arrayStart[2].matchAll(/["']([^"']+)["']/g)) add(quoted[1]);
      inArray = !arrayStart[2].includes("]");
      continue;
    }
    if (/^tool\.poetry\.(?:group\.[\w-]+\.)?(?:dev-)?dependencies$/.test(section)) {
      const key = line.match(/^\s*([A-Za-z0-9][A-Za-z0-9._-]*)\s*=/);
      if (key) add(key[1]);
    }
  }
  return [...names];
}

export function parseGoMod(text: string): string[] {
  const modules = new Set<string>();
  let inBlock = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/\/\/.*/, "").trim();
    if (/^require\s*\($/.test(line)) {
      inBlock = true;
      continue;
    }
    if (inBlock && line === ")") {
      inBlock = false;
      continue;
    }
    const spec = inBlock ? line : line.match(/^require\s+(.+)$/)?.[1];
    const path = spec?.split(/\s+/)[0];
    if (path && path.includes("/")) modules.add(path);
  }
  return [...modules];
}

export function parseCargoToml(text: string): string[] {
  const names = new Set<string>();
  let inDeps = false;
  for (const line of text.split(/\r?\n/)) {
    const header = line.match(/^\s*\[([^\]]+)\]/);
    if (header) {
      const section = header[1].trim();
      inDeps = /^(?:target\..+\.)?(?:dev-|build-)?dependencies$/.test(section) || section === "workspace.dependencies";
      const inline = section.match(/^(?:dev-|build-)?dependencies\.([A-Za-z0-9_-]+)$/);
      if (inline) names.add(inline[1]);
      continue;
    }
    if (!inDeps) continue;
    const key = line.match(/^\s*([A-Za-z0-9_-]+)\s*=/);
    if (key) names.add(key[1]);
  }
  return [...names];
}

export const MANIFESTS: { file: string; ecosystem: Ecosystem; parse: (text: string) => string[] }[] = [
  { file: "package.json", ecosystem: "npm", parse: parsePackageJson },
  { file: "requirements.txt", ecosystem: "pypi", parse: parseRequirementsTxt },
  { file: "pyproject.toml", ecosystem: "pypi", parse: parsePyprojectToml },
  { file: "go.mod", ecosystem: "go", parse: parseGoMod },
  { file: "Cargo.toml", ecosystem: "cargo", parse: parseCargoToml },
];

const stripGoMajor = (path: string) => path.replace(/\/v\d+$/, "");

/** Returns the repo dependency that matches a catalog package spec, or undefined. */
export function matchPackage(ecosystem: Ecosystem, spec: string, deps: string[]): string | undefined {
  if (ecosystem === "go") {
    const base = stripGoMajor(spec);
    return deps.find((dep) => {
      const normalized = stripGoMajor(dep);
      return normalized === base || normalized.startsWith(`${base}/`);
    });
  }
  if (ecosystem === "pypi") {
    const target = normalizePypi(spec);
    return deps.find((dep) => normalizePypi(dep) === target);
  }
  if (spec.endsWith("*")) {
    const prefix = spec.slice(0, -1);
    return deps.find((dep) => dep.startsWith(prefix));
  }
  return deps.find((dep) => dep === spec);
}

export interface UsedProject {
  project: CatalogEntry;
  ecosystem: Ecosystem;
  dependency: string;
}

export function findUsedProjects(deps: Dependencies, catalog: CatalogEntry[]): UsedProject[] {
  const used: UsedProject[] = [];
  for (const project of catalog) {
    match: for (const [ecosystem, specs] of Object.entries(project.packages) as [Ecosystem, string[]][]) {
      const repoDeps = deps[ecosystem];
      if (!repoDeps?.length) continue;
      for (const spec of specs) {
        const dependency = matchPackage(ecosystem, spec, repoDeps);
        if (dependency) {
          used.push({ project, ecosystem, dependency });
          break match;
        }
      }
    }
  }
  return used;
}

/**
 * Cross-cutting concerns most applications add on top of their core stack,
 * each with an editorially ordered list of projects that fit as an *add-on
 * to an existing app*. This is deliberately curated rather than derived from
 * categories + catalog rating: categories mix very different jobs (product
 * analytics vs. data-processing engines, app error tracking vs. metrics
 * databases), and catalog rating measures importance to the catalog, not fit
 * as an add-on -- ranking by it recommended Apache Spark as "analytics" and
 * InfluxDB as "monitoring" to a Next.js app.
 *
 * Platform choices (database, ui, mobile, cms, ...) are excluded entirely:
 * suggesting a different UI kit or database to a repo that already has one
 * is noise, not help.
 *
 * `covers` lists projects that already satisfy the need (no recommendation
 * then) -- e.g. a repo using Supabase already has auth.
 */
export const RECOMMENDATION_SLOTS: { category: string; candidates: string[]; covers: string[] }[] = [
  {
    category: "authentication",
    candidates: ["auth-js", "supertokens", "zitadel", "ory-kratos"],
    covers: ["supabase", "appwrite", "keycloak", "authelia"],
  },
  { category: "testing", candidates: ["playwright", "cypress"], covers: [] },
  { category: "monitoring", candidates: ["sentry", "prometheus"], covers: [] },
  { category: "analytics", candidates: ["posthog"], covers: ["umami", "plausible", "matomo"] },
  { category: "search", candidates: ["meilisearch", "typesense", "opensearch", "elasticsearch"], covers: [] },
];

export interface Recommendation {
  project: CatalogEntry;
  ecosystem: Ecosystem;
  category: string;
}

const LANGUAGE_ECOSYSTEM: Record<string, Ecosystem> = {
  TypeScript: "npm",
  JavaScript: "npm",
  Python: "pypi",
  Go: "go",
  Rust: "cargo",
};

/**
 * At most one pick per slot the repo doesn't already cover: the first
 * candidate (in editorial order) that isn't already used and is installable
 * in an ecosystem this repo actually uses. The ecosystem matching the repo's
 * primary language is tried first across all candidates, so a Go service
 * with a package.json for frontend tooling gets Go suggestions before npm ones.
 */
export function recommend(
  deps: Dependencies,
  used: UsedProject[],
  catalog: CatalogEntry[],
  primaryLanguage?: string | null,
): Recommendation[] {
  const present = (Object.keys(deps) as Ecosystem[]).filter((eco) => deps[eco]?.length);
  const preferred = primaryLanguage ? LANGUAGE_ECOSYSTEM[primaryLanguage] : undefined;
  const passes = preferred && present.includes(preferred) ? [[preferred], present] : [present];
  const usedSlugs = new Set(used.map((u) => u.project.slug));
  const bySlug = new Map(catalog.map((project) => [project.slug, project]));

  const picks: Recommendation[] = [];
  for (const slot of RECOMMENDATION_SLOTS) {
    if ([...slot.candidates, ...slot.covers].some((slug) => usedSlugs.has(slug))) continue;
    pick: for (const ecosystems of passes) {
      for (const slug of slot.candidates) {
        const project = bySlug.get(slug);
        const ecosystem = project && ecosystems.find((eco) => project.packages[eco]?.length);
        if (project && ecosystem) {
          picks.push({ project, ecosystem, category: slot.category });
          break pick;
        }
      }
    }
  }
  return picks;
}

/** Well-known frameworks worth naming in the "detected stack" summary. */
const FRAMEWORKS: Record<Ecosystem, Record<string, string>> = {
  npm: {
    next: "Next.js",
    react: "React",
    vue: "Vue",
    nuxt: "Nuxt",
    svelte: "Svelte",
    "@sveltejs/kit": "SvelteKit",
    "@angular/core": "Angular",
    astro: "Astro",
    express: "Express",
    "@nestjs/core": "NestJS",
    fastify: "Fastify",
    hono: "Hono",
    electron: "Electron",
    "react-native": "React Native",
  },
  pypi: { django: "Django", flask: "Flask", fastapi: "FastAPI", torch: "PyTorch", streamlit: "Streamlit" },
  go: { "github.com/gin-gonic/gin": "Gin", "github.com/labstack/echo": "Echo", "github.com/gofiber/fiber": "Fiber" },
  cargo: { "actix-web": "Actix Web", axum: "Axum", tokio: "Tokio", tauri: "Tauri" },
};

export function detectFrameworks(deps: Dependencies): string[] {
  const found: string[] = [];
  for (const [ecosystem, names] of Object.entries(FRAMEWORKS) as [Ecosystem, Record<string, string>][]) {
    const repoDeps = deps[ecosystem];
    if (!repoDeps?.length) continue;
    for (const [spec, label] of Object.entries(names)) {
      if (matchPackage(ecosystem, spec, repoDeps)) found.push(label);
    }
  }
  return found;
}
