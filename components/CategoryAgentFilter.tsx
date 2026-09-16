"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/schema";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type FilterValue = "all" | "agents" | "tools";

/**
 * A project belongs to the "Agent Tools" sub-filter if it's tagged with the
 * agent-tools intent (see lib/i18n/keyword-taxonomy.ts) -- everything else
 * defaults to "AI Agents". This is intentionally the only rule: no
 * per-project allowlist to maintain, and any future ai-agents project is
 * correctly bucketed just by its existing intents.
 */
function isAgentToolsProject(project: Project): boolean {
  return (project.intents ?? []).some((intent) => intent.concept === "agent-tools");
}

/**
 * Client-side sub-filter for the ai-agents category page only. Filtering
 * happens entirely in the browser against the already-fetched project list,
 * so the page itself stays fully statically generated -- this is the only
 * category that needs a sub-filter, so it isn't a page-level searchParams
 * read (which would make every category page dynamic).
 */
export function CategoryAgentFilter({
  projects,
  locale,
  dict,
}: {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "tools"
      ? projects.filter(isAgentToolsProject)
      : filter === "agents"
        ? projects.filter((p) => !isAgentToolsProject(p))
        : projects;

  const tabs: { value: FilterValue; label: string }[] = [
    { value: "all", label: dict.categoryDetail.filterAll },
    { value: "agents", label: dict.categoryDetail.filterAiAgents },
    { value: "tools", label: dict.categoryDetail.filterAgentTools },
  ];

  return (
    <>
      <div role="tablist" aria-label={dict.categoryDetail.filterAll} className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={filter === tab.value}
            onClick={() => setFilter(tab.value)}
            className={
              filter === tab.value
                ? "rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
                : "rounded-full border border-border px-4 py-1.5 text-sm text-foreground/80 hover:border-accent hover:text-accent"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} locale={locale} dict={dict} />
          </li>
        ))}
      </ul>
    </>
  );
}
