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
] as const;

export type SetupId = (typeof SETUPS)[number]["id"];
