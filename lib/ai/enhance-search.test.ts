import assert from "node:assert/strict";
import { test } from "node:test";
import { enhanceSearch, needsAIAssist } from "./enhance-search";
import type { QueryUnderstanding } from "./schema";
import type { Category, Project } from "@/lib/schema";
import { searchProjects } from "@/lib/search";

function project(overrides: Partial<Project> & { name: string; slug: string }): Project {
  return {
    description: "A test project long enough to satisfy the schema minimum length.",
    repository: `https://github.com/example/${overrides.slug}`,
    categories: ["ai-agents"],
    keywords: ["agent"],
    license: "MIT",
    ...overrides,
  } as Project;
}

const categories: Category[] = [
  { slug: "ai-agents", name: "AI Agents", description: "Agent tooling." },
  { slug: "monitoring", name: "Monitoring", description: "Observability tools." },
];

const projects: Project[] = [
  project({ name: "Letta", slug: "letta", keywords: ["agent", "memory"] }),
  project({ name: "Mem0", slug: "mem0", keywords: ["agent", "memory"] }),
  project({
    name: "Uptime Kuma",
    slug: "uptime-kuma",
    categories: ["monitoring"],
    keywords: ["monitoring", "uptime"],
  }),
];

const understanding: QueryUnderstanding = {
  intent: ["agent-memory"],
  categories: ["ai-agents"],
  concepts: ["agent-memory"],
  keywords: ["memory"],
  negative_concepts: [],
};

test("with no AI understanding, behaves exactly like plain keyword search", () => {
  const withAI = enhanceSearch("memory", null, projects, categories, "en");
  const plain = enhanceSearch("memory", null, projects, categories, "en");
  assert.deepEqual(
    withAI.map((r) => r.project.slug),
    plain.map((r) => r.project.slug),
  );
});

test("AI keywords add results not found by the original query, without reordering baseline", () => {
  // "웹훅" matches nothing lexically -- baseline is empty, AI keyword "memory"
  // should surface letta/mem0 as pure additions.
  const results = enhanceSearch("웹훅", understanding, projects, categories, "en");
  const slugs = results.map((r) => r.project.slug);
  assert.ok(slugs.includes("letta"));
  assert.ok(slugs.includes("mem0"));
  assert.ok(!slugs.includes("uptime-kuma"));
});

test("baseline order/results are never displaced by AI additions", () => {
  const baselineOnly = enhanceSearch("uptime", null, projects, categories, "en");
  const withAI = enhanceSearch("uptime", understanding, projects, categories, "en");

  assert.deepEqual(
    withAI.slice(0, baselineOnly.length).map((r) => r.project.slug),
    baselineOnly.map((r) => r.project.slug),
  );
});

test("AI results already found by the baseline are not duplicated", () => {
  const results = enhanceSearch("memory", understanding, projects, categories, "en");
  const slugs = results.map((r) => r.project.slug);
  assert.equal(slugs.length, new Set(slugs).size);
});

test("all-empty AI arrays (concepts/categories/keywords) is a no-op", () => {
  const empty: QueryUnderstanding = { ...understanding, concepts: [], categories: [], keywords: [] };
  const withEmpty = enhanceSearch("uptime", empty, projects, categories, "en");
  const withNull = enhanceSearch("uptime", null, projects, categories, "en");
  assert.deepEqual(
    withEmpty.map((r) => r.project.slug),
    withNull.map((r) => r.project.slug),
  );
});

test("AI concepts alone (empty keywords) still add results -- concepts are searched independently, not just keywords", () => {
  const conceptsOnly: QueryUnderstanding = { ...understanding, keywords: [] };
  const results = enhanceSearch("웹훅", conceptsOnly, projects, categories, "en");
  const slugs = results.map((r) => r.project.slug).sort();
  assert.deepEqual(slugs, ["letta", "mem0"]);
});

test("joining every AI term into one combined query loses matches that per-term search finds -- regression guard for the production bug", () => {
  // Reproduces the real bug: a project's keyword is a compound
  // ("ai-agent", not the bare word "agent"), so the token "agent" only
  // ever lands an untrusted PARTIAL match on it. Once other unrelated AI
  // terms are joined into the same multi-token query, searchProjects()'s
  // own isUnsupportedPartialOnly noise guard (lib/search.ts) zeroes the
  // whole result because no token trusted-matched and not every token
  // matched -- even though "agent" alone finds this project fine.
  const compoundKeywordProjects: Project[] = [
    project({ name: "Letta", slug: "letta", keywords: ["ai-agent"] }),
  ];
  const multiTerm: QueryUnderstanding = {
    ...understanding,
    concepts: [],
    categories: [],
    keywords: ["agent", "unrelated-noise-1", "unrelated-noise-2"],
  };

  const joinedQueryResults = searchProjects(
    "agent unrelated-noise-1 unrelated-noise-2",
    compoundKeywordProjects,
    categories,
    "en",
  );
  const perTermResults = enhanceSearch("웹훅", multiTerm, compoundKeywordProjects, categories, "en");

  assert.equal(joinedQueryResults.some((r) => r.project.slug === "letta"), false);
  assert.equal(
    perTermResults.some((r) => r.project.slug === "letta"),
    true,
  );
});

test("categories are never used as a search term, even when concepts/keywords are empty", () => {
  // uptime-kuma has categories: ["monitoring"] -- if categories were still
  // searched, this would surface it. It must not.
  const categoriesOnly: QueryUnderstanding = {
    intent: [],
    categories: ["monitoring"],
    concepts: [],
    keywords: [],
    negative_concepts: [],
  };
  const results = enhanceSearch("zzznotfoundzzz", categoriesOnly, projects, categories, "en");
  assert.deepEqual(results, []);
});

test("categories are dropped even when concepts/keywords are also present", () => {
  // "monitoring" is a category, not a concept/keyword, on any fixture
  // project here -- searching for it as a literal term would still find
  // uptime-kuma via its category. It must only ever be searched via
  // concepts/keywords, never via `understanding.categories`.
  const withCategories: QueryUnderstanding = {
    intent: [],
    categories: ["monitoring"],
    concepts: ["agent-memory"],
    keywords: [],
    negative_concepts: [],
  };
  const results = enhanceSearch("웹훅", withCategories, projects, categories, "en");
  const slugs = results.map((r) => r.project.slug);
  assert.ok(!slugs.includes("uptime-kuma"));
});

test("per-term cap: only each term's top AI_TERM_RESULT_LIMIT (3) matches become candidates", () => {
  // 5 projects matched by the single term "alpha-term", with strictly
  // decreasing scores via different match strength: name exact (100) >
  // keyword exact (40) > keyword partial (20) > language exact (8) >
  // description partial (5). (No category involved -- CATEGORY_EXACT only
  // scores when the token itself equals a category slug/name, not merely
  // because the project has some category.)
  const alphaProjects: Project[] = [
    project({ name: "alpha-term", slug: "alpha-1", keywords: ["other"] }), // NAME_EXACT = 100
    project({ name: "P2", slug: "alpha-2", keywords: ["alpha-term"] }), // KEYWORD_EXACT = 40
    project({ name: "P3", slug: "alpha-3", keywords: ["contains-alpha-term-inside"] }), // KEYWORD_PARTIAL = 20
    project({ name: "P4", slug: "alpha-4", keywords: ["other"], languages: ["alpha-term"] }), // LANGUAGE_EXACT = 8
    project({
      name: "P5",
      slug: "alpha-5",
      keywords: ["unrelated"],
      description: "Mentions alpha-term only in its long-form description text here.",
    }), // DESCRIPTION_PARTIAL = 5
  ];
  const understanding5: QueryUnderstanding = {
    intent: [],
    categories: [],
    concepts: ["alpha-term"],
    keywords: [],
    negative_concepts: [],
  };
  const results = enhanceSearch("zzznotfoundzzz", understanding5, alphaProjects, categories, "en");
  const slugs = results.map((r) => r.project.slug);
  assert.deepEqual(slugs, ["alpha-1", "alpha-2", "alpha-3"]);
});

test("total cap: at most AI_RESULT_LIMIT (8) additions overall, even with several terms contributing enough for more", () => {
  // 3 non-overlapping terms, each with its own 3 distinct-scoring matches
  // (name exact 100 / keyword exact 40 / keyword partial 20) that stay
  // within that term's own top-3 -- 9 unique candidates total, one more
  // than the AI_RESULT_LIMIT of 8.
  function group(term: string, prefix: string): Project[] {
    return [
      project({ name: term, slug: `${prefix}-0`, keywords: ["other"] }), // 100
      project({ name: `${prefix}n1`, slug: `${prefix}-1`, keywords: [term] }), // 40
      project({ name: `${prefix}n2`, slug: `${prefix}-2`, keywords: [`contains-${term}-inside`] }), // 20
    ];
  }
  const allProjects = [...group("term-alpha", "a"), ...group("term-beta", "b"), ...group("term-gamma", "c")];

  const understanding9: QueryUnderstanding = {
    intent: [],
    categories: [],
    concepts: ["term-alpha", "term-beta", "term-gamma"],
    keywords: [],
    negative_concepts: [],
  };
  const results = enhanceSearch("zzznotfoundzzz", understanding9, allProjects, categories, "en");
  assert.equal(results.length, 8);

  // All three 100s and all three 40s survive regardless of tie order.
  // Among the three tied 20-scored candidates, a stable sort keeps them in
  // the order their terms were processed (a, b, c) -- so exactly the last
  // one processed (c-2) is the one dropped to stay at 8.
  const slugs = results.map((r) => r.project.slug);
  assert.deepEqual(
    slugs,
    ["a-0", "b-0", "c-0", "a-1", "b-1", "c-1", "a-2", "b-2"],
  );
  assert.ok(!slugs.includes("c-2"));
});

test("a project found via multiple AI terms appears once, keeping its highest observed score", () => {
  // "shared" matches "term-one" as a plain keyword exact (40), and matches
  // "term-two" as an exact NAME match (100, its project name) -- two
  // different scores for the same project depending on which term found it.
  const fixtureProjects = [project({ name: "term-two", slug: "shared", keywords: ["term-one"] })];

  const understanding2: QueryUnderstanding = {
    intent: [],
    categories: [],
    concepts: ["term-one", "term-two"],
    keywords: [],
    negative_concepts: [],
  };
  const results = enhanceSearch("zzznotfoundzzz", understanding2, fixtureProjects, categories, "en");
  assert.equal(results.length, 1);
  assert.equal(results[0].project.slug, "shared");
  // term-one: keyword exact (40). term-two: name exact (100).
  // The kept score must be the higher one searchProjects() itself produced.
  assert.equal(results[0].score, 100);
});

test("needsAIAssist: zero baseline results needs AI", () => {
  assert.equal(needsAIAssist([]), true);
});

test("needsAIAssist: a NAME_EXACT-strength top score (100) does not need AI", () => {
  assert.equal(needsAIAssist([{ project: projects[0], score: 100 }]), false);
});

test("needsAIAssist: a score just below the threshold needs AI", () => {
  assert.equal(needsAIAssist([{ project: projects[0], score: 99.5 }]), true);
});

test("needsAIAssist: only the top result's score matters, not the rest of the list", () => {
  const baseline = [
    { project: projects[0], score: 150 },
    { project: projects[1], score: 1 },
  ];
  assert.equal(needsAIAssist(baseline), false);
});

test("needsAIAssist matches real catalog behavior: an exact name match skips AI", () => {
  const baseline = searchProjects("letta", projects, categories, "en");
  assert.equal(needsAIAssist(baseline), false);
});

test("needsAIAssist matches real catalog behavior: a query with no matches needs AI", () => {
  const baseline = searchProjects("zzznotfoundzzz", projects, categories, "en");
  assert.equal(needsAIAssist(baseline), true);
});
