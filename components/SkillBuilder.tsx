"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AGENTS,
  PRESETS,
  buildCommands,
  buildPrompt,
  skillId,
  skillUrl,
  skills,
  type Agent,
  type Scope,
} from "@/lib/skills";
import { formatMessage } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export interface SkillPack {
  slug: string;
  name: string;
  description: string;
}

// Packs this large start collapsed so the list stays scannable.
const COLLAPSE_ABOVE = 40;

function presetSkills(id: string | null): Set<string> {
  return new Set(PRESETS.find((p) => p.id === id)?.skills ?? []);
}

export function SkillBuilder({ packs, locale, dict }: { packs: SkillPack[]; locale: Locale; dict: Dictionary }) {
  const t = dict.skills;
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(() => presetSkills(searchParams.get("preset")));
  const [query, setQuery] = useState("");
  const [agentId, setAgentId] = useState<Agent["id"]>("claude-code");
  const [scope, setScope] = useState<Scope>("project");
  const [tab, setTab] = useState<"prompt" | "command">("prompt");
  const [copied, setCopied] = useState(false);

  const agent = AGENTS.find((a) => a.id === agentId)!;
  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () => (q ? skills.filter((s) => s.name.includes(q) || s.description.toLowerCase().includes(q)) : skills),
    [q],
  );
  const picked = skills.filter((s) => selected.has(skillId(s)));
  const output = picked.length === 0 ? "" : tab === "prompt" ? buildPrompt(picked, agent, scope) : buildCommands(picked, agent, scope).join("\n");

  function toggle(ids: string[], on: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) {
        if (on) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the text stays selectable.
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="skill-presets">
        <h2 id="skill-presets" className="mb-3 text-sm font-medium text-muted-foreground">
          {t.presetsHeading}
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRESETS.map((preset) => (
            <li key={preset.id}>
              <button
                type="button"
                onClick={() => setSelected(new Set(preset.skills))}
                className="h-full w-full rounded-lg border border-border p-4 text-left transition-colors hover:border-accent"
              >
                <span className="block font-medium">{t.presets[preset.id].title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{t.presets[preset.id].description}</span>
                <span className="mt-2 block text-xs text-accent">
                  {formatMessage(t.skillCount, { count: preset.skills.length })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section aria-label={t.listLabel} className="min-w-0">
          <label htmlFor="skill-search" className="sr-only">
            {t.searchLabel}
          </label>
          <input
            id="skill-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <p className="mt-2 text-xs text-muted-foreground">{t.descriptionNote}</p>

          {visible.length === 0 && <p className="mt-8 text-sm text-muted-foreground">{t.noResults}</p>}

          <div className="mt-4 flex flex-col gap-3">
            {packs.map((pack) => {
              const packSkills = visible.filter((s) => s.pack === pack.slug);
              if (packSkills.length === 0) return null;
              const ids = packSkills.map(skillId);
              const pickedCount = ids.filter((id) => selected.has(id)).length;
              const allPicked = pickedCount === ids.length;
              return (
                <details
                  key={pack.slug}
                  open={q !== "" || skills.filter((s) => s.pack === pack.slug).length <= COLLAPSE_ABOVE}
                  className="group rounded-lg border border-border"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-4">
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className="font-semibold">{pack.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatMessage(t.skillCount, { count: packSkills.length })}
                          {pickedCount > 0 && (
                            <span className="text-accent"> · {formatMessage(t.selectedCount, { count: pickedCount })}</span>
                          )}
                        </span>
                      </span>
                      <span className="mt-1 line-clamp-2 text-sm text-muted-foreground">{pack.description}</span>
                    </span>
                    <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true">
                      ▾
                    </span>
                  </summary>
                  <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 text-xs">
                    <button type="button" onClick={() => toggle(ids, !allPicked)} className="text-accent hover:underline">
                      {allPicked ? t.clearPack : t.selectPack}
                    </button>
                    <Link href={`/${locale}/projects/${pack.slug}`} className="text-muted-foreground hover:text-foreground">
                      {t.viewPack}
                    </Link>
                  </div>
                  <ul className="divide-y divide-border border-t border-border">
                    {packSkills.map((skill) => {
                      const id = skillId(skill);
                      return (
                        <li key={id} className="flex items-start gap-3 px-4 py-3">
                          <input
                            id={`skill-${id}`}
                            type="checkbox"
                            checked={selected.has(id)}
                            onChange={(e) => toggle([id], e.target.checked)}
                            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
                          />
                          <label htmlFor={`skill-${id}`} className="min-w-0 flex-1 cursor-pointer">
                            <span className="block font-mono text-sm">{skill.name}</span>
                            <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground" title={skill.description}>
                              {skill.description}
                            </span>
                          </label>
                          <a
                            href={skillUrl(skill)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
                            aria-label={formatMessage(t.viewSource, { name: skill.name })}
                          >
                            ↗
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              );
            })}
          </div>
        </section>

        <section id="skill-output" aria-labelledby="skill-output-heading" className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="skill-output-heading" className="font-semibold">
                {formatMessage(t.selectedCount, { count: picked.length })}
              </h2>
              {picked.length > 0 && (
                <button type="button" onClick={() => setSelected(new Set())} className="text-xs text-muted-foreground hover:text-foreground">
                  {t.clearAll}
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                {t.agentLabel}
                <select
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value as Agent["id"])}
                  className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                >
                  {AGENTS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.id === "universal" ? t.otherAgents : a.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                {t.scopeLabel}
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as Scope)}
                  className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                >
                  <option value="project">{t.scopeProject}</option>
                  <option value="global">{t.scopeGlobal}</option>
                </select>
              </label>
            </div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{scope === "global" ? agent.global : agent.project}</p>

            <div role="tablist" className="mt-4 flex gap-1 rounded-md bg-muted p-1 text-sm">
              {(["prompt", "command"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`flex-1 rounded px-2 py-1 ${tab === key ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}
                >
                  {key === "prompt" ? t.promptTab : t.commandTab}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{tab === "prompt" ? t.promptHint : t.commandHint}</p>

            {picked.length === 0 ? (
              <p className="mt-4 rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                {t.emptySelection}
              </p>
            ) : (
              <>
                <pre className="mt-3 max-h-[50vh] overflow-auto whitespace-pre-wrap break-words rounded-md bg-muted p-3 text-xs leading-relaxed">
                  {output}
                </pre>
                <button
                  type="button"
                  onClick={copy}
                  className="mt-3 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
                >
                  {copied ? t.copied : t.copy}
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      {picked.length > 0 && (
        <a
          href="#skill-output"
          className="fixed inset-x-4 bottom-4 z-10 rounded-full bg-accent px-4 py-3 text-center text-sm font-medium text-accent-foreground shadow-lg lg:hidden"
        >
          {formatMessage(t.jumpToOutput, { count: picked.length })}
        </a>
      )}
    </div>
  );
}
