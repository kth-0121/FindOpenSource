import skillsData from "@/data/skills.json";

/** One skill folder, pulled verbatim from its SKILL.md by scripts/collect-skills.ts. */
export interface Skill {
  name: string;
  description: string;
  /** Catalog project slug of the skill pack it ships in. */
  pack: string;
  repo: string;
  path: string;
  branch: string;
}

export const skills = skillsData as Skill[];

/** Builder display order: general-purpose packs first, the large domain-specific one last. */
export const SKILL_PACK_ORDER = [
  "superpowers",
  "anthropic-skills",
  "addy-agent-skills",
  "vercel-agent-skills",
  "ponytail",
  "huggingface-skills",
  "scientific-agent-skills",
];

export const skillId =(skill: Skill) => `${skill.pack}/${skill.name}`;

export const skillUrl = (skill: Skill) => `https://github.com/${skill.repo}/tree/${skill.branch}/${skill.path}`;

/**
 * Agent ids and skill folders exactly as the `skills` CLI documents them
 * (github.com/vercel-labs/skills, docs/agents.md). "universal" is the shared
 * .agents/skills location that most other agents also read.
 */
export const AGENTS = [
  { id: "claude-code", label: "Claude Code", project: ".claude/skills/", global: "~/.claude/skills/" },
  { id: "codex", label: "Codex", project: ".agents/skills/", global: "~/.agents/skills/" },
  { id: "cursor", label: "Cursor", project: ".agents/skills/", global: "~/.cursor/skills/" },
  { id: "gemini-cli", label: "Gemini CLI", project: ".agents/skills/", global: "~/.gemini/skills/" },
  { id: "github-copilot", label: "GitHub Copilot", project: ".agents/skills/", global: "~/.copilot/skills/" },
  { id: "opencode", label: "OpenCode", project: ".agents/skills/", global: "~/.config/opencode/skills/" },
  { id: "universal", label: "Other agents", project: ".agents/skills/", global: "~/.config/agents/skills/" },
] as const;

export type Agent = (typeof AGENTS)[number];
export type Scope = "project" | "global";

/** Starter sets, as skill ids. Every id must exist in data/skills.json (checked in skills.test.ts). */
export const PRESETS = [
  {
    id: "coding",
    skills: [
      "superpowers/brainstorming",
      "superpowers/writing-plans",
      "superpowers/test-driven-development",
      "superpowers/systematic-debugging",
      "superpowers/verification-before-completion",
      "superpowers/requesting-code-review",
    ],
  },
  {
    id: "frontend",
    skills: [
      "anthropic-skills/frontend-design",
      "vercel-agent-skills/vercel-react-best-practices",
      "vercel-agent-skills/vercel-composition-patterns",
      "vercel-agent-skills/web-design-guidelines",
      "anthropic-skills/webapp-testing",
    ],
  },
  {
    id: "lean",
    skills: [
      "ponytail/ponytail",
      "ponytail/ponytail-review",
      "addy-agent-skills/code-simplification",
      "addy-agent-skills/incremental-implementation",
    ],
  },
  {
    id: "ml",
    skills: [
      "huggingface-skills/hf-cli",
      "huggingface-skills/huggingface-datasets",
      "huggingface-skills/huggingface-llm-trainer",
      "huggingface-skills/huggingface-community-evals",
    ],
  },
] as const;

export type PresetId = (typeof PRESETS)[number]["id"];

/** One `npx skills add` per repo, since the CLI takes a single source per call. */
export function buildCommands(selected: Skill[], agent: Agent, scope: Scope): string[] {
  const byRepo = new Map<string, string[]>();
  for (const skill of selected) byRepo.set(skill.repo, [...(byRepo.get(skill.repo) ?? []), skill.name]);
  return [...byRepo].map(
    ([repo, names]) =>
      `npx skills add ${repo} -s ${names.join(" ")} -a ${agent.id}${scope === "global" ? " -g" : ""} -y`,
  );
}

/**
 * A prompt to paste into the agent itself, so it installs the skills on its
 * own: CLI first, with a manual copy as fallback for machines without
 * Node 22, then a check that every SKILL.md landed. Kept in English on
 * purpose -- it's read by the agent, not the visitor.
 */
export function buildPrompt(selected: Skill[], agent: Agent, scope: Scope): string {
  const dir = scope === "global" ? agent.global : agent.project;
  const target = agent.id === "universal" ? "my coding agent" : agent.label;
  const list = selected
    .map((skill, i) => `${i + 1}. ${skill.name} (${skillUrl(skill)})\n   ${firstSentence(skill.description)}`)
    .join("\n");

  return [
    `Install the following ${selected.length} Agent Skill${selected.length === 1 ? "" : "s"} for ${target}${
      scope === "global" ? ", for all my projects" : " in this project"
    }.`,
    "",
    "Skills:",
    list,
    "",
    "Steps:",
    "1. Install them with the skills CLI (needs Node.js 22.20+):",
    ...buildCommands(selected, agent, scope).map((command) => `   ${command}`),
    `2. If the CLI isn't available, install manually: copy each skill's whole folder from the link above (SKILL.md plus any scripts or reference files) to ${dir}<skill-name>/, keeping its structure.`,
    "3. Don't change any skill's contents. Before installing, skim each SKILL.md and tell me if it runs scripts or needs extra tools, API keys or MCP servers.",
    `4. Confirm every skill has a SKILL.md under ${dir}, then give me one line per skill on when you'll use it.`,
  ].join("\n");
}

function firstSentence(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const end = flat.search(/[.!?](\s|$)/);
  const sentence = end === -1 ? flat : flat.slice(0, end + 1);
  return sentence.length > 160 ? `${sentence.slice(0, 157)}...` : sentence;
}
