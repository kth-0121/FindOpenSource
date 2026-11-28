/**
 * Well-known people's own Claude Code setups. Each one ships its own
 * installer (plugin, hooks, setup script), so we link the official
 * Claude Code install steps verbatim from the repo README instead of
 * cherry-picking skills. Credentials and stars were checked against the
 * README and `gh api` on 2026-11-13; localized blurbs live in dict.skills.setups.
 */
export const SETUPS = [
  {
    id: "ecc",
    person: "Affaan Mustafa",
    github: "affaan-m",
    repo: "affaan-m/ECC",
    stars: 302_000,
    install: ["/plugin marketplace add https://github.com/affaan-m/ECC", "/plugin install ecc@ecc"],
  },
  {
    id: "gstack",
    person: "Garry Tan",
    github: "garrytan",
    repo: "garrytan/gstack",
    stars: 141_000,
    install: [
      "git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup",
    ],
  },
  {
    id: "mattpocock",
    person: "Matt Pocock",
    github: "mattpocock",
    repo: "mattpocock/skills",
    stars: 323_000,
    install: ["claude plugin install mattpocock-skills@claude-plugins-official", "/setup-matt-pocock-skills"],
  },
  {
    id: "superpowers",
    person: "Jesse Vincent",
    github: "obra",
    repo: "obra/superpowers",
    stars: 316_000,
    install: ["/plugin install superpowers@claude-plugins-official"],
  },
  {
    id: "addy",
    person: "Addy Osmani",
    github: "addyosmani",
    repo: "addyosmani/agent-skills",
    stars: 120_000,
    install: ["/plugin marketplace add addyosmani/agent-skills", "/plugin install agent-skills@addy-agent-skills"],
  },
  {
    id: "compound-engineering",
    person: "Kieran Klaassen",
    github: "kieranklaassen",
    repo: "EveryInc/compound-engineering-plugin",
    stars: 26_000,
    install: ["/plugin marketplace add EveryInc/compound-engineering-plugin", "/plugin install compound-engineering"],
  },
  {
    id: "lifeos",
    person: "Daniel Miessler",
    github: "danielmiessler",
    repo: "danielmiessler/LifeOS",
    stars: 20_000,
    install: ["curl -fsSL https://ourlifeos.ai/install.sh | bash"],
  },
  {
    id: "tstack",
    person: "Theo Browne",
    github: "t3dotgg",
    repo: "t3dotgg/tstack",
    stars: 4_000,
    install: ["git clone https://github.com/t3dotgg/tstack", "cp -R tstack/skills/* ~/.claude/skills/"],
  },
] as const;

export type SetupId = (typeof SETUPS)[number]["id"];
