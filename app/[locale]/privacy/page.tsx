import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.privacy.title,
    description: dict.privacy.metaDescription,
    alternates: buildAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.privacy.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{dict.privacy.lastUpdated}</p>

      <div className="prose-content mt-8 space-y-8 text-foreground/90">
        {dict.privacy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            <div className="mt-2 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
