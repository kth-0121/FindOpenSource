import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllProjects, getProjectBySlug } from "./projects";

test("every translated project also translates its catalog rationale", () => {
  for (const project of getAllProjects()) {
    if (!project.evaluation?.catalogValue) continue;
    for (const [locale, t] of Object.entries(project.translations ?? {})) {
      assert.ok(t?.rationale, `${project.slug} ${locale}`);
    }
  }
});

test("a localized project shows the translated rationale", () => {
  const en = getProjectBySlug("supabase", "en")!;
  const ko = getProjectBySlug("supabase", "ko")!;
  assert.equal(ko.evaluation?.catalogValue?.rationale, en.translations?.ko?.rationale);
  assert.notEqual(ko.evaluation?.catalogValue?.rationale, en.evaluation?.catalogValue?.rationale);
});
