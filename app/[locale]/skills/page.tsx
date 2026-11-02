import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SkillBuilder, type SkillPack } from "@/components/SkillBuilder";
import { getProjectBySlug } from "@/lib/projects";
import { SKILL_PACK_ORDER } from "@/lib/skills";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type SkillsPageProps = {
  params: Promise<{ locale: string }>;
};

function getSkillPacks(locale: Locale): SkillPack[] {
  return SKILL_PACK_ORDER.flatMap((slug) => {
    const project = getProjectBySlug(slug, locale);
    return project ? [{ slug, name: project.name, description: project.description }] : [];
  });
}

export async function generateMetadata({ params }: SkillsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const dict = getDictionary(localeParam);
  return {
    title: dict.skills.pageTitle,
    description: dict.skills.pageDescription,
    alternates: buildAlternates(localeParam, "/skills"),
  };
}

/** Static shell: selection and prompt building all happen client-side (see SkillBuilder). */
export default async function SkillsPage({ params }: SkillsPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.skills.pageTitle}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{dict.skills.pageDescription}</p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <SkillBuilder packs={getSkillPacks(locale)} locale={locale} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}
