import { test } from "node:test";
import assert from "node:assert/strict";
import { AGENTS, PRESETS, SKILL_PACK_ORDER, buildCommands, buildPrompt, skillId, skills } from "./skills";
import { createHash } from "node:crypto";
import { parseFrontmatter } from "../scripts/collect-skills";
import translations from "../data/skill-translations.json";

const byId = new Map(skills.map((s) => [skillId(s), s]));
const claude = AGENTS.find((a) => a.id === "claude-code")!;

test("every preset skill exists in data/skills.json", () => {
  for (const preset of PRESETS) for (const id of preset.skills) assert.ok(byId.has(id), id);
});

test("every collected pack has a display slot", () => {
  for (const skill of skills) assert.ok(SKILL_PACK_ORDER.includes(skill.pack), skill.pack);
});

test("every skill description is translated from its current English text", () => {
  const all = translations as Record<string, Record<string, string>>;
  for (const skill of skills) {
    const t = all[skillId(skill)];
    assert.ok(t, `missing translation: ${skillId(skill)}`);
    // A changed upstream SKILL.md changes this hash: re-translate that skill.
    assert.equal(t.source, createHash("sha1").update(skill.description).digest("hex").slice(0, 10), `stale translation: ${skillId(skill)}`);
    for (const locale of ["ko", "ja", "zh-CN", "es", "de"]) assert.ok(t[locale], `${skillId(skill)} ${locale}`);
  }
});

test("skill ids are unique", () => {
  assert.equal(byId.size, skills.length);
});

test("buildCommands groups skills by repo", () => {
  const picked = ["superpowers/brainstorming", "superpowers/writing-plans", "ponytail/ponytail"].map((id) => byId.get(id)!);
  assert.deepEqual(buildCommands(picked, claude, "global"), [
    "npx skills add obra/superpowers -s brainstorming writing-plans -a claude-code -g -y",
    "npx skills add DietrichGebert/ponytail -s ponytail -a claude-code -g -y",
  ]);
  assert.ok(!buildCommands(picked, claude, "project")[0].includes(" -g"));
});

test("buildPrompt names the target folder and every skill", () => {
  const picked = [byId.get("superpowers/brainstorming")!];
  const prompt = buildPrompt(picked, claude, "project");
  assert.match(prompt, /Install the following 1 Agent Skill for Claude Code in this project\./);
  assert.match(prompt, /\.claude\/skills\/<skill-name>\//);
  assert.match(prompt, /https:\/\/github\.com\/obra\/superpowers\/tree\/main\/skills\/brainstorming/);
});

test("parseFrontmatter handles plain, quoted, wrapped and block values", () => {
  const fm = parseFrontmatter(
    [
      "---",
      "name: pdf",
      'description: "Say \\"hi\\" to PDFs"',
      "license: Proprietary",
      "other: >",
      "  folded",
      "  text",
      "wrapped: first",
      "  second",
      "---",
      "body",
    ].join("\n"),
  );
  assert.deepEqual(fm, {
    name: "pdf",
    description: 'Say "hi" to PDFs',
    license: "Proprietary",
    other: "folded text",
    wrapped: "first second",
  });
});
