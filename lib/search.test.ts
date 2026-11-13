import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllCategories } from "./categories";
import { getAllProjects } from "./projects";
import { searchProjects } from "./search";
import type { Locale } from "./i18n/config";

/** Top result slugs for a query against the real catalog. */
function top(query: string, locale: Locale = "en", limit = 5): string[] {
  return searchProjects(query, getAllProjects(locale), getAllCategories(), locale)
    .slice(0, limit)
    .map((result) => result.project.slug);
}

test("short Korean words match synonyms and descriptions", () => {
  assert.equal(top("로그인 기능", "ko")[0], "keycloak");
  assert.equal(top("블로그를 만들고 싶어", "ko")[0], "ghost");
  assert.ok(top("마케팅", "ko").includes("marketingskills"));
});

test("a project named after one word of the query does not outrank the real matches", () => {
  assert.deepEqual(top("vector db", "en", 2).sort(), ["milvus", "qdrant"]);
});

test("partial matches start at a word boundary", () => {
  assert.ok(!top("logging").includes("ghost"), '"logging" must not match "blogging"');
});

test("aliases and one-letter typos still find the project", () => {
  assert.equal(top("k8s")[0], "kubernetes");
  assert.equal(top("kuberntes")[0], "kubernetes");
});

test("a query with no match in the catalog returns nothing", () => {
  assert.deepEqual(top("zzznotfoundzzz"), []);
});
