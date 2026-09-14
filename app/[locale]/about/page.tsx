import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SupportLink } from "@/components/SupportLink";
import { getSupportUrl } from "@/lib/support";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.paragraph2,
    alternates: buildAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const supportUrl = getSupportUrl();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.about.title}</h1>

      <div className="prose-content mt-6 space-y-6 text-foreground/90">
        <p>
          {dict.about.intro} <strong>&ldquo;{dict.about.questionQuote}&rdquo;</strong>
        </p>
        <p>{dict.about.paragraph2}</p>
        <h2 className="text-xl font-semibold tracking-tight">{dict.about.howItWorksHeading}</h2>
        <p>{dict.about.howItWorksBody}</p>
        <h2 className="text-xl font-semibold tracking-tight">{dict.about.contributingHeading}</h2>
        <p>
          {dict.about.contributingBody}
          <Link href={`/${locale}/contribute`} className="text-accent hover:underline">
            {dict.about.contributingLinkText}
          </Link>
          {dict.about.contributingLinkSuffix}
        </p>
        {supportUrl && (
          <>
            <h2 className="text-xl font-semibold tracking-tight">{dict.about.supportHeading}</h2>
            <p>
              {dict.about.supportBody}
              <SupportLink href={supportUrl} ariaLabel={dict.support.ctaAriaLabel} className="text-accent hover:underline">
                {dict.about.supportCta}
              </SupportLink>
              {dict.about.supportBodySuffix}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
