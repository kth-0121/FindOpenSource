import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getSupportUrl } from "@/lib/support";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SupportLink } from "@/components/SupportLink";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const supportUrl = getSupportUrl();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
        <Link href={`/${locale}`} className="text-base font-semibold tracking-tight sm:text-lg">
          {siteConfig.name}
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
          <nav aria-label="Primary" className="flex items-center gap-4 text-sm sm:gap-5">
            <Link href={`/${locale}/categories`} className="text-foreground/80 hover:text-foreground">
              {dict.nav.categories}
            </Link>
            <Link href={`/${locale}/contribute`} className="text-foreground/80 hover:text-foreground">
              {dict.nav.contribute}
            </Link>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground"
            >
              {dict.nav.github}
            </a>
            {supportUrl && (
              <SupportLink
                href={supportUrl}
                ariaLabel={dict.support.ctaAriaLabel}
                className="text-foreground/80 hover:text-foreground"
              >
                {dict.nav.support}
              </SupportLink>
            )}
          </nav>
          <LanguageSwitcher currentLocale={locale} label={dict.languageSwitcher.label} />
        </div>
      </div>
    </header>
  );
}
