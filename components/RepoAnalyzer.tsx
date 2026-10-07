"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/schema";
import { localizeCategory } from "@/lib/categories";
import {
  MANIFESTS,
  parseRepoInput,
  findUsedProjects,
  recommend,
  detectFrameworks,
  type CatalogEntry,
  type Dependencies,
  type Ecosystem,
  type Recommendation,
  type UsedProject,
} from "@/lib/repo-analysis";
import { formatMessage } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const ECOSYSTEM_LABEL: Record<Ecosystem, string> = { npm: "npm", pypi: "PyPI", go: "Go", cargo: "Cargo" };

type ErrorKind = "invalid" | "notFound" | "rateLimited" | "generic";

interface Analysis {
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  frameworks: string[];
  dependencyCount: number;
  manifestFiles: string[];
  used: UsedProject[];
  recommendations: Recommendation[];
}

class AnalyzeError extends Error {
  constructor(readonly kind: ErrorKind) {
    super(kind);
  }
}

/**
 * Everything runs in the visitor's browser: GitHub's API and raw file host
 * both allow cross-origin requests, so no request goes through this site's
 * server (and none counts against its hosting bandwidth). The only
 * same-origin request is the prerendered /api/catalog JSON.
 */
async function analyzeRepo(owner: string, repo: string, signal: AbortSignal): Promise<Analysis> {
  const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (repoResponse.status === 404) throw new AnalyzeError("notFound");
  if (repoResponse.status === 403 || repoResponse.status === 429) throw new AnalyzeError("rateLimited");
  if (!repoResponse.ok) throw new AnalyzeError("generic");
  const meta: {
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    topics?: string[];
    default_branch: string;
  } = await repoResponse.json();

  // List the root once so we only download manifests that actually exist.
  const rootResponse = await fetch(
    `https://api.github.com/repos/${meta.full_name}/contents?ref=${encodeURIComponent(meta.default_branch)}`,
    { headers: { Accept: "application/vnd.github+json" }, signal },
  );
  if (rootResponse.status === 403 || rootResponse.status === 429) throw new AnalyzeError("rateLimited");
  // An empty repository has no contents (404) -- treat it as "no manifests", not an error.
  const rootFiles: { name: string; type: string }[] = rootResponse.ok ? await rootResponse.json() : [];
  const present = new Set(rootFiles.filter((entry) => entry.type === "file").map((entry) => entry.name));

  const [catalog, manifests] = await Promise.all([
    fetch("/api/catalog", { signal }).then((response) => {
      if (!response.ok) throw new AnalyzeError("generic");
      return response.json() as Promise<CatalogEntry[]>;
    }),
    Promise.all(
      MANIFESTS.filter((manifest) => present.has(manifest.file)).map(async (manifest) => {
        const response = await fetch(
          `https://raw.githubusercontent.com/${meta.full_name}/${encodeURIComponent(meta.default_branch)}/${manifest.file}`,
          { signal },
        );
        if (!response.ok) return null;
        return { ...manifest, names: manifest.parse(await response.text()) };
      }),
    ),
  ]);

  const deps: Dependencies = {};
  const manifestFiles: string[] = [];
  for (const manifest of manifests) {
    if (!manifest) continue;
    manifestFiles.push(manifest.file);
    deps[manifest.ecosystem] = [...new Set([...(deps[manifest.ecosystem] ?? []), ...manifest.names])];
  }
  const used = findUsedProjects(deps, catalog);

  return {
    fullName: meta.full_name,
    url: meta.html_url,
    description: meta.description,
    language: meta.language,
    topics: meta.topics ?? [],
    frameworks: detectFrameworks(deps),
    dependencyCount: Object.values(deps).reduce((sum, names) => sum + (names?.length ?? 0), 0),
    manifestFiles,
    used,
    recommendations: recommend(deps, used, catalog, meta.language),
  };
}

export function RepoAnalyzer({ categories, locale, dict }: { categories: Category[]; locale: Locale; dict: Dictionary }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Read once at mount: later ?repo= changes come from our own router.replace
  // after a submit, which has already started its own analysis.
  const [initialRepo] = useState(() => searchParams.get("repo") ?? "");
  const [initialRef] = useState(() => parseRepoInput(initialRepo));
  const [input, setInput] = useState(initialRepo);
  // A shared ?repo= link starts in "loading" so the mount effect only has to
  // kick off the fetch, not set state synchronously.
  const [status, setStatus] = useState<"idle" | "loading" | "done">(initialRef ? "loading" : "idle");
  const [error, setError] = useState<ErrorKind | null>(initialRepo && !initialRef ? "invalid" : null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const t = dict.analyze;

  const categoryName = useMemo(() => {
    const names = new Map(categories.map((category) => [category.slug, localizeCategory(category, dict).name]));
    return (slug: string) => names.get(slug) ?? slug;
  }, [categories, dict]);

  /** Starts an analysis; every state update happens asynchronously, after the fetch settles. */
  const execute = useCallback((owner: string, repo: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    analyzeRepo(owner, repo, controller.signal).then(
      (result) => {
        if (controller.signal.aborted) return;
        setAnalysis(result);
        setStatus("done");
      },
      (caught) => {
        if (controller.signal.aborted) return;
        setError(caught instanceof AnalyzeError ? caught.kind : "generic");
        setAnalysis(null);
        setStatus("idle");
      },
    );
  }, []);

  // Shared links (?repo=owner/name) analyze on arrival, once.
  useEffect(() => {
    if (initialRef) execute(initialRef.owner, initialRef.repo);
    return () => controllerRef.current?.abort();
  }, [initialRef, execute]);

  function run(value: string) {
    const ref = parseRepoInput(value);
    if (!ref) {
      setError("invalid");
      setStatus("idle");
      return;
    }
    setError(null);
    setStatus("loading");
    execute(ref.owner, ref.repo);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ref = parseRepoInput(input);
    if (ref) router.replace(`/${locale}/analyze?repo=${encodeURIComponent(`${ref.owner}/${ref.repo}`)}`, { scroll: false });
    run(input);
  }

  const errorMessage = error
    ? { invalid: t.errorInvalid, notFound: t.errorNotFound, rateLimited: t.errorRateLimited, generic: t.errorGeneric }[error]
    : null;

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="repo-input" className="sr-only">
          {t.inputLabel}
        </label>
        <input
          id="repo-input"
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t.inputPlaceholder}
          className="w-full rounded-full border border-border bg-background px-5 py-3 text-base outline-none placeholder:text-muted-foreground focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? t.loading : t.submitLabel}
        </button>
      </form>

      {errorMessage && (
        <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      {status === "done" && analysis && (
        <div className="mt-10 flex flex-col gap-10">
          <section aria-labelledby="analyze-stack" className="rounded-lg border border-border p-5">
            <h2 id="analyze-stack" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t.stackHeading}
            </h2>
            <a
              href={analysis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-lg font-semibold text-foreground hover:text-accent"
            >
              {analysis.fullName}
            </a>
            {analysis.description && <p className="mt-1 text-sm text-muted-foreground">{analysis.description}</p>}
            <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.languageLabel}</dt>
                <dd className="mt-1 text-foreground">{analysis.language ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.frameworksLabel}</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {analysis.frameworks.length > 0
                    ? analysis.frameworks.map((framework) => (
                        <span key={framework} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground/70">
                          {framework}
                        </span>
                      ))
                    : "—"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">
              {analysis.manifestFiles.length > 0
                ? formatMessage(t.dependenciesLabel, {
                    count: analysis.dependencyCount,
                    files: analysis.manifestFiles.join(", "),
                  })
                : t.noManifests}
            </p>
          </section>

          {/* Without a manifest there's nothing to match or recommend against -- an
              empty "already covered" message would be misleading. */}
          {analysis.manifestFiles.length > 0 && (
          <>
          <section aria-labelledby="analyze-used">
            <h2 id="analyze-used" className="mb-3 text-xl font-semibold tracking-tight">
              {t.usedHeading}
            </h2>
            {analysis.used.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {analysis.used.map(({ project, ecosystem, dependency }) => (
                  <li key={project.slug}>
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-accent"
                    >
                      <span className="font-semibold text-foreground">{project.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {project.categories.map(categoryName).join(", ")}
                      </span>
                      <code className="text-xs text-muted-foreground">
                        {formatMessage(t.matchedVia, { package: `${dependency} (${ECOSYSTEM_LABEL[ecosystem]})` })}
                      </code>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t.usedEmpty}</p>
            )}
          </section>

          <section aria-labelledby="analyze-recommend">
            <h2 id="analyze-recommend" className="mb-3 text-xl font-semibold tracking-tight">
              {t.recommendHeading}
            </h2>
            {analysis.recommendations.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {analysis.recommendations.map(({ project, ecosystem, category }) => (
                  <li key={project.slug}>
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-accent"
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">{project.name}</span>
                        <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground/70">
                          {categoryName(category)}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatMessage(t.recommendReason, {
                          ecosystem: ECOSYSTEM_LABEL[ecosystem],
                          category: categoryName(category),
                        })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t.recommendEmpty}</p>
            )}
          </section>

          </>
          )}

          <p className="text-xs text-muted-foreground">{t.limitationNote}</p>
        </div>
      )}
    </div>
  );
}
