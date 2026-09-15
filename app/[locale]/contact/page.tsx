import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.contact.title,
    description: dict.contact.metaDescription,
    alternates: buildAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.contact.title}</h1>

      <div className="prose-content mt-6 space-y-6 text-foreground/90">
        <p>{dict.contact.intro}</p>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">{dict.contact.reasonsHeading}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
            {dict.contact.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">{dict.contact.howHeading}</h2>
          <p className="mt-2">{dict.contact.howBody}</p>
        </div>
      </div>

      <div className="mt-10">
        <a
          href={`${siteConfig.githubUrl}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          {dict.contact.ctaLabel}
        </a>
      </div>
    </div>
  );
}
