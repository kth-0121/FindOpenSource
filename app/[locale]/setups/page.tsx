import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SETUPS } from "@/lib/setups";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type SetupsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SetupsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).skills.setups;
  return { title: t.heading, description: t.intro, alternates: buildAlternates(locale, "/setups") };
}

/** Whole kits with their own installers, so they live apart from the pick-and-mix builder on /skills. */
export default async function SetupsPage({ params }: SetupsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.skills.setups;

  return (
    <div className={`mx-auto max-w-6xl px-4 py-12 sm:px-6 ${locale === "ko" ? "break-keep" : ""}`}>
      <h1 className="text-3xl font-bold tracking-tight">{t.heading}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t.intro}</p>
      <ul className="mt-8 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {SETUPS.map((setup) => {
          const item = t.items[setup.id];
          return (
            <li key={setup.id}>
              <details className="group rounded-lg border border-border">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-4">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold">{setup.person}</span>
                      <span className="text-xs text-accent">{item.credential}</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.summary}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {setup.repo} · ★ {Math.round(setup.stars / 1000)}k
                    </span>
                  </span>
                  <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <div className="flex flex-col gap-3 border-t border-border p-4 text-sm">
                  <div>
                    <p className="text-xs font-medium">{dict.skills.benefitsLabel}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
                      {item.strengths.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.installLabel}</p>
                    <pre className="mt-1 whitespace-pre-wrap break-all rounded bg-muted p-3 font-mono text-xs select-all">
                      {setup.install.join("\n")}
                    </pre>
                    <p className="mt-1 text-xs text-muted-foreground">{t.installHint}</p>
                  </div>
                  <a
                    href={`https://github.com/${setup.repo}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start text-xs text-accent hover:underline"
                  >
                    README ↗
                  </a>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
