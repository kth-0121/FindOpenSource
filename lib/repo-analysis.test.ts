import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseRepoInput,
  parsePackageJson,
  parseRequirementsTxt,
  parsePyprojectToml,
  parseGoMod,
  parseCargoToml,
  matchPackage,
  findUsedProjects,
  recommend,
  detectFrameworks,
  type CatalogEntry,
} from "./repo-analysis";

test("parseRepoInput accepts owner/repo, bare and full URLs", () => {
  const expected = { owner: "vercel", repo: "next.js" };
  assert.deepEqual(parseRepoInput("vercel/next.js"), expected);
  assert.deepEqual(parseRepoInput("github.com/vercel/next.js"), expected);
  assert.deepEqual(parseRepoInput("https://github.com/vercel/next.js.git"), expected);
  assert.deepEqual(parseRepoInput("  https://www.github.com/vercel/next.js/tree/canary/packages  "), expected);
  assert.deepEqual(parseRepoInput("https://github.com/vercel/next.js?tab=readme"), expected);
});

test("parseRepoInput rejects non-GitHub hosts and malformed input", () => {
  assert.equal(parseRepoInput(""), null);
  assert.equal(parseRepoInput("vercel"), null);
  assert.equal(parseRepoInput("https://gitlab.com/a/b"), null);
  assert.equal(parseRepoInput("../ko/react"), null);
  assert.equal(parseRepoInput("owner/re po"), null);
  assert.equal(parseRepoInput("owner/.."), null);
});

test("parsePackageJson merges dependency kinds and survives bad JSON", () => {
  const text = JSON.stringify({ dependencies: { next: "1" }, devDependencies: { vitest: "1" }, peerDependencies: { react: "1" } });
  assert.deepEqual(parsePackageJson(text).sort(), ["next", "react", "vitest"]);
  assert.deepEqual(parsePackageJson("{ not json"), []);
});

test("parseRequirementsTxt strips versions, extras, comments, and options", () => {
  const text = "Django>=4.2\nrequests[socks]==2.31  # http\n-r base.txt\n\n# comment\nFlask_SQLAlchemy\n";
  assert.deepEqual(parseRequirementsTxt(text), ["django", "requests", "flask-sqlalchemy"]);
});

test("parsePyprojectToml reads PEP 621 arrays and Poetry tables", () => {
  const text = [
    "[project]",
    'name = "demo"',
    "dependencies = [",
    '  "fastapi>=0.100",',
    '  "Pydantic_AI",',
    "]",
    "[project.optional-dependencies]",
    'test = ["pytest"]',
    "[tool.poetry.dependencies]",
    'python = "^3.11"',
    'torch = "^2"',
  ].join("\n");
  assert.deepEqual(parsePyprojectToml(text).sort(), ["fastapi", "pydantic-ai", "pytest", "torch"]);
});

test("parseGoMod reads block and single-line requires", () => {
  const text = "module x\n\nrequire github.com/a/b v1.0.0\n\nrequire (\n\tgithub.com/redis/go-redis/v9 v9.0.0 // indirect\n\tgo.temporal.io/sdk v1.2.3\n)\n";
  assert.deepEqual(parseGoMod(text), ["github.com/a/b", "github.com/redis/go-redis/v9", "go.temporal.io/sdk"]);
});

test("parseCargoToml reads dependency tables and inline dependency sections", () => {
  const text = '[package]\nname = "x"\n[dependencies]\ntokio = { version = "1" }\nserde = "1"\n[dev-dependencies]\nsentry = "0.3"\n[dependencies.axum]\nversion = "0.7"\n';
  assert.deepEqual(parseCargoToml(text).sort(), ["axum", "sentry", "serde", "tokio"]);
});

test("matchPackage handles wildcards, PEP 503 names, and Go major versions", () => {
  assert.equal(matchPackage("npm", "@radix-ui/react-*", ["@radix-ui/react-dialog"]), "@radix-ui/react-dialog");
  assert.equal(matchPackage("npm", "next-auth", ["next-auth-extra"]), undefined);
  assert.equal(matchPackage("pypi", "sentry-sdk", ["Sentry_SDK"]), "Sentry_SDK");
  assert.equal(matchPackage("go", "github.com/redis/go-redis/v9", ["github.com/redis/go-redis/v8"]), "github.com/redis/go-redis/v8");
  assert.equal(matchPackage("go", "go.etcd.io/etcd/client/v3", ["go.etcd.io/etcd/client/v3"]), "go.etcd.io/etcd/client/v3");
  assert.equal(matchPackage("go", "github.com/minio/minio-go/v7", ["github.com/minio/minio-go-extra"]), undefined);
});

const catalog: CatalogEntry[] = [
  { slug: "auth-js", name: "Auth.js", categories: ["authentication"], packages: { npm: ["next-auth"] }, rating: 4, score: 90 },
  { slug: "supertokens", name: "SuperTokens", categories: ["authentication"], packages: { npm: ["supertokens-node"], pypi: ["supertokens-python"] }, rating: 3, score: 80 },
  { slug: "playwright", name: "Playwright", categories: ["developer-tools", "testing"], packages: { npm: ["playwright"], pypi: ["playwright"] }, rating: 5, score: 95 },
  { slug: "sentry", name: "Sentry", categories: ["monitoring"], packages: { npm: ["@sentry/*"], pypi: ["sentry-sdk"] }, rating: 5, score: 92 },
  { slug: "mui", name: "MUI", categories: ["ui"], packages: { npm: ["@mui/material"] }, rating: 4, score: 90 },
];

test("findUsedProjects reports the matching dependency once per project", () => {
  const used = findUsedProjects({ npm: ["next", "next-auth", "@sentry/nextjs", "@sentry/node"] }, catalog);
  assert.deepEqual(
    used.map((u) => [u.project.slug, u.dependency]),
    [["auth-js", "next-auth"], ["sentry", "@sentry/nextjs"]],
  );
});

test("recommend skips covered categories, non-recommendable categories, and other ecosystems", () => {
  const deps = { pypi: ["django"] };
  const recs = recommend(deps, findUsedProjects(deps, catalog), catalog);
  assert.deepEqual(
    recs.map((r) => [r.category, r.project.slug, r.ecosystem]),
    [["authentication", "supertokens", "pypi"], ["testing", "playwright", "pypi"], ["monitoring", "sentry", "pypi"]],
  );

  const npmDeps = { npm: ["next-auth"] };
  const npmRecs = recommend(npmDeps, findUsedProjects(npmDeps, catalog), catalog);
  assert.ok(!npmRecs.some((r) => r.category === "authentication"), "auth already covered by auth-js");
  assert.ok(!npmRecs.some((r) => r.project.slug === "mui"), "ui is not a recommendable category");
});

test("recommend only suggests curated add-ons, and respects projects that already cover a need", () => {
  const withEngines: CatalogEntry[] = [
    ...catalog,
    { slug: "clickhouse", name: "ClickHouse", categories: ["analytics"], packages: { npm: ["@clickhouse/client"] }, rating: 5, score: 99 },
    { slug: "influxdb", name: "InfluxDB", categories: ["monitoring"], packages: { npm: ["@influxdata/influxdb-client"] }, rating: 5, score: 99 },
    { slug: "supabase", name: "Supabase", categories: ["backend", "authentication"], packages: { npm: ["@supabase/supabase-js"] }, rating: 5, score: 99 },
  ];
  const deps = { npm: ["next", "@supabase/supabase-js"] };
  const recs = recommend(deps, findUsedProjects(deps, withEngines), withEngines);
  assert.deepEqual(recs.map((r) => r.project.slug), ["playwright", "sentry"]);
});

test("recommend prefers the primary language's ecosystem over incidental tooling", () => {
  const deps = { npm: ["vite"], pypi: ["django"] };
  const used = findUsedProjects(deps, catalog);
  assert.equal(recommend(deps, used, catalog, "Python").find((r) => r.category === "authentication")?.project.slug, "supertokens");
  assert.equal(recommend(deps, used, catalog, "TypeScript").find((r) => r.category === "authentication")?.project.slug, "auth-js");
  // falls back to any present ecosystem when the preferred one has no candidate
  assert.equal(recommend({ npm: ["vite"] }, [], catalog, "Python")[0]?.project.slug, "auth-js");
});

test("recommend returns nothing when the repo has no dependencies", () => {
  assert.deepEqual(recommend({}, [], catalog), []);
});

test("detectFrameworks names well-known frameworks across ecosystems", () => {
  assert.deepEqual(detectFrameworks({ npm: ["next", "react"], pypi: ["fastapi"] }), ["Next.js", "React", "FastAPI"]);
});
