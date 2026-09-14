import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportLink } from "@/components/SupportLink";
import { getSupportUrl } from "@/lib/support";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type SupportPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SupportPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.support.title,
    description: dict.support.metaDescription,
    alternates: buildAlternates(locale, "/support"),
  };
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const supportUrl = getSupportUrl();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.support.title}</h1>

      <div className="prose-content mt-6 space-y-6 text-foreground/90">
        <p>{dict.support.intro}</p>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">{dict.support.whyHeading}</h2>
          <p className="mt-2">{dict.support.whyIntro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
            {dict.support.whyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">{dict.support.howHeading}</h2>
          <p className="mt-2">{dict.support.howBody}</p>
        </div>
      </div>

      {supportUrl && (
        <div className="mt-10">
          <SupportLink
            href={supportUrl}
            ariaLabel={dict.support.ctaAriaLabel}
            className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            {dict.support.ctaLabel}
          </SupportLink>
        </div>
      )}
    </div>
  );
}
