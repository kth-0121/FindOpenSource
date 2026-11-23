import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

/**
 * Offline pull of every individual skill in the catalog's skill packs
 * (projects with the "agent-skill" keyword) into data/skills.json, which the
 * /skills builder reads at build time. Name, description and license come
 * verbatim from each SKILL.md's frontmatter -- never hand-written -- and
 * skills whose frontmatter marks them proprietary are left out, since this
 * is an open-source catalog.
 *
 * Translations live separately in data/skill-translations.json, keyed by
 * skill id with a hash of the English text they came from; lib/skills.test.ts
 * fails for any new or changed description until it's re-translated.
 *
 * Usage: npx tsx scripts/collect-skills.ts
 */

const projectsDir = path.join(process.cwd(), "data", "projects");
const outPath = path.join(process.cwd(), "data", "skills.json");

// Only skills/<name>/SKILL.md, <plugin>/skills/<name>/SKILL.md or a root SKILL.md;
// this skips templates, mirrored copies for other agents and benchmark files.
const SKILL_PATH = /^(?:(?:[^/.][^/]*\/)?skills\/[^/]+\/)?SKILL\.md$/;

function gh(args: string[]): string {
  return execFileSync("gh", ["api", ...args], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
}

/** Just enough YAML for SKILL.md frontmatter: scalars, quoted strings, and >/| blocks. */
export function parseFrontmatter(markdown: string): Record<string, string> {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split(/\r?\n/);
  const out: Record<string, string> = {};
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    let value = rawValue.trim();
    if (/^[>|][+-]?$/.test(value)) {
      const block: string[] = [];
      while (i + 1 < lines.length && (/^\s+\S/.test(lines[i + 1]) || lines[i + 1].trim() === "")) {
        block.push(lines[++i].trim());
      }
      value = value.startsWith(">") ? block.filter(Boolean).join(" ") : block.join("\n").trim();
    } else if (/^["']/.test(value)) {
      const quote = value[0];
      value = value.slice(1, value.endsWith(quote) && value.length > 1 ? -1 : undefined);
      if (quote === '"') value = value.replace(/\\"/g, '"');
      else value = value.replace(/''/g, "'");
    } else {
      // Plain scalar that wraps onto indented continuation lines.
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1]) && !/^\s+[\w-]+:\s/.test(lines[i + 1])) {
        value += " " + lines[++i].trim();
      }
    }
    out[key] = value;
  }
  return out;
}

/**
 * Official skills a vendor ships inside its product repos rather than its skills
 * pack repo, listed under that pack: "owner/repo" -> skill folders in it.
 */
const EXTRA_SOURCES: Record<string, Record<string, string[]>> = {
  "vercel-agent-skills": {
    "vercel/ai": ["skills/ai-sdk", "skills/migrate-ai-sdk-v6-to-v7"],
    "vercel/ai-elements": ["skills/ai-elements"],
    "vercel/chat": ["skills/chat"],
    "vercel/flags": ["skills/flags-sdk", "skills/vercel-flags"],
    "vercel/eve": ["skills/eve"],
    "vercel-labs/agent-browser": ["skills/agent-browser"],
    "vercel-labs/agent-desktop": ["agent-desktop", "agent-desktop-linux", "agent-desktop-macos", "agent-desktop-windows", "agent-desktop-ffi", "jev-desktop"].map((d) => `skills/${d}`),
    "vercel-labs/skills": ["skills/find-skills"],
  },
};

const defaultBranch = (repo: string): string => JSON.parse(gh([`repos/${repo}`])).default_branch;

function main() {
  const packs = fs
    .readdirSync(projectsDir)
    .map((f) => JSON.parse(fs.readFileSync(path.join(projectsDir, f), "utf-8")))
    .filter((p) => p.keywords.includes("agent-skill"))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const skills = [];
  for (const pack of packs) {
    const packRepo = pack.repository.replace("https://github.com/", "");
    const packBranch = defaultBranch(packRepo);
    const tree = JSON.parse(gh([`repos/${packRepo}/git/trees/${packBranch}?recursive=1`])).tree as { path: string }[];
    const sources = tree
      .map((t) => t.path)
      .filter((p) => SKILL_PATH.test(p))
      .map((file) => ({ repo: packRepo, branch: packBranch, file }));
    for (const [repo, dirs] of Object.entries(EXTRA_SOURCES[pack.slug] ?? {})) {
      const branch = defaultBranch(repo);
      sources.push(...dirs.map((dir) => ({ repo, branch, file: `${dir}/SKILL.md` })));
    }
    let kept = 0;
    for (const { repo, branch, file } of sources) {
      let content: string;
      try {
        content = gh([`repos/${repo}/contents/${file}?ref=${branch}`, "-H", "Accept: application/vnd.github.raw"]);
      } catch {
        // A moved EXTRA_SOURCES folder shouldn't sink the whole refresh; the PR diff shows the skill dropping out.
        console.warn(`  skip ${repo}/${file}: not found`);
        continue;
      }
      const fm = parseFrontmatter(content);
      if (!fm.name || !fm.description) {
        console.warn(`  skip ${repo}/${file}: no name/description`);
        continue;
      }
      if (/proprietary/i.test(fm.license ?? "")) {
        console.warn(`  skip ${repo}/${file}: proprietary`);
        continue;
      }
      skills.push({
        name: fm.name,
        description: fm.description,
        pack: pack.slug,
        repo,
        path: path.posix.dirname(file),
        branch,
      });
      kept++;
    }
    console.log(`${pack.slug}: ${kept}/${sources.length}`);
  }

  fs.writeFileSync(outPath, JSON.stringify(skills, null, 2) + "\n");
  console.log(`Wrote ${skills.length} skills to data/skills.json`);
}

if (process.argv[1]?.endsWith("collect-skills.ts")) main();
