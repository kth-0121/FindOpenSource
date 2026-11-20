import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllProjects, getProjectBySlug } from "./projects";
import { defaultLocale, locales } from "./i18n/config";

test("every translated project also translates its catalog rationale", () => {
  for (const project of getAllProjects()) {
    if (!project.evaluation?.catalogValue) continue;
    for (const locale of locales) {
      const t = project.translations?.[locale];
      if (locale !== defaultLocale && t) assert.ok(t.rationale, `${project.slug} ${locale}`);
    }
  }
});

test("a localized project shows the translated rationale", () => {
  const en = getProjectBySlug("supabase", "en")!;
  const ko = getProjectBySlug("supabase", "ko")!;
  assert.equal(ko.evaluation?.catalogValue?.rationale, en.translations?.ko?.rationale);
  assert.notEqual(ko.evaluation?.catalogValue?.rationale, en.evaluation?.catalogValue?.rationale);
});
