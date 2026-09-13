import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";

type ContributePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContributePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.contribute.title,
    description: dict.contribute.intro,
    alternates: buildAlternates(locale, "/contribute"),
  };
}

export default async function ContributePage({ params }: ContributePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.contribute.title}</h1>
      <p className="mt-4 text-muted-foreground">{dict.contribute.intro}</p>

      <ol className="mt-10 space-y-6">
        {dict.contribute.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {index + 1}
            </span>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          {dict.contribute.readContributing}
        </a>
        <a
          href={`${siteConfig.githubUrl}/issues/new?template=add-project.yml`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
        >
          {dict.contribute.suggestViaIssue}
        </a>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        {dict.contribute.preferNotToEdit}
        <a
          href={`${siteConfig.githubUrl}/issues/new?template=add-project.yml`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          {dict.contribute.issueLinkText}
        </a>
        {dict.contribute.preferNotToEditSuffix}
      </p>
    </div>
  );
}
