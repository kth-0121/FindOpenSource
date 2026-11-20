import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { SKILL_PACK_ORDER, skillId, skillUrl, skills } from "@/lib/skills";
import guides from "@/data/skill-pack-guides.json";
import skillTranslations from "@/data/skill-translations.json";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format";
import { buildAlternates } from "@/lib/i18n/metadata";

type PackPageProps = {
  params: Promise<{ locale: string; pack: string }>;
};

interface PackGuide {
  intro: string;
  bestFor: string[];
  startWith: { skill: string; why: string }[];
  beforeInstall: string[];
}

/** Hand-written per pack and locale (skills.test.ts checks every pack has all six). Server-only, kept out of the builder bundle. */
function load(locale: Locale, slug: string) {
  const guide = (guides as Record<string, Record<string, PackGuide>>)[slug]?.[locale];
  const project = getProjectBySlug(slug, locale);
  return guide && project ? { guide, project } : null;
}

export function generateStaticParams() {
  return SKILL_PACK_ORDER.map((pack) => ({ pack }));
}

export async function generateMetadata({ params }: PackPageProps): Promise<Metadata> {
  const { locale, pack } = await params;
  if (!isLocale(locale)) return {};
  const data = load(locale, pack);
  if (!data) return {};
  return {
    title: formatMessage(getDictionary(locale).skills.packGuide.title, { name: data.project.name }),
    description: data.project.description,
    alternates: buildAlternates(locale, `/skills/${pack}`),
  };
}

export default async function PackPage({ params }: PackPageProps) {
  const { locale: localeParam, pack } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const data = load(locale, pack);
  if (!data) notFound();
  const { guide, project } = data;
  const t = getDictionary(locale).skills;
  const packSkills = skills.filter((s) => s.pack === pack);
  const describe = (id: string, fallback: string) =>
    (skillTranslations as Record<string, Record<string, string>>)[id]?.[locale] ?? fallback;
  const builderHref = `/${locale}/skills?skills=${guide.startWith.map((s) => `${pack}/${s.skill}`).join(",")}`;

  return (
    <div className={`mx-auto max-w-3xl px-4 py-12 sm:px-6 ${locale === "ko" ? "break-keep" : ""}`}>
      <Link href={`/${locale}/skills`} className="text-sm text-muted-foreground hover:text-foreground">
        ← {t.pageTitle}
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        {formatMessage(t.packGuide.title, { name: project.name })}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>

      <div className="mt-8 space-y-4 text-foreground/90">
        {guide.intro.split("\n\n").map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">{t.packGuide.bestForHeading}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/90">
        {guide.bestFor.map((x) => <li key={x}>{x}</li>)}
      </ul>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">{t.packGuide.startWithHeading}</h2>
      <ul className="mt-3 space-y-3">
        {guide.startWith.map((s) => (
          <li key={s.skill}>
            <span className="font-mono text-sm">{s.skill}</span>
            <span className="block text-foreground/90">{s.why}</span>
          </li>
        ))}
      </ul>
      <Link
        href={builderHref}
        className="mt-5 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        {t.packGuide.openInBuilder}
      </Link>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">{t.packGuide.beforeInstallHeading}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/90">
        {guide.beforeInstall.map((x) => <li key={x}>{x}</li>)}
      </ul>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        {formatMessage(t.packGuide.allSkillsHeading, { count: packSkills.length })}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">{t.descriptionNote}</p>
      <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
        {packSkills.map((skill) => (
          <li key={skill.name} className="px-4 py-3">
            <a href={skillUrl(skill)} target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-accent">
              {skill.name} ↗
            </a>
            <p className="mt-0.5 text-sm text-muted-foreground">{describe(skillId(skill), skill.description)}</p>
          </li>
        ))}
      </ul>

      <Link href={`/${locale}/projects/${pack}`} className="mt-8 inline-block text-sm text-accent hover:underline">
        {t.packGuide.projectLink} →
      </Link>
    </div>
  );
}
