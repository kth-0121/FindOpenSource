import { test } from "node:test";
import assert from "node:assert/strict";
import { AGENTS, PRESETS, SKILL_PACK_ORDER, buildCommands, buildPrompt, skillId, skills } from "./skills";
import { parseFrontmatter } from "../scripts/collect-skills";

const byId = new Map(skills.map((s) => [skillId(s), s]));
const claude = AGENTS.find((a) => a.id === "claude-code")!;

test("every preset skill exists in data/skills.json", () => {
  for (const preset of PRESETS) for (const id of preset.skills) assert.ok(byId.has(id), id);
});

test("every collected pack has a display slot", () => {
  for (const skill of skills) assert.ok(SKILL_PACK_ORDER.includes(skill.pack), skill.pack);
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
