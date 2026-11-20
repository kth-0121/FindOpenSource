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
      {/* Mobile: logo + language on one row, the nav as one swipeable row below. */}
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-4 sm:px-6">
        <Link href={`/${locale}`} className="mr-auto flex items-center gap-2 text-base font-semibold tracking-tight sm:text-lg">
          {/* Same mark as app/icon.svg; the stroke keeps it visible on the dark theme. */}
          <svg viewBox="0 0 64 64" aria-hidden="true" className="h-7 w-7 shrink-0">
            <rect x="1" y="1" width="62" height="62" rx="14" fill="#111114" stroke="#3f3f46" strokeWidth="2" />
            <path d="M24 50V24a10 10 0 0 1 10-10h6M17 31h18" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
            <circle cx="44" cy="44" r="5" fill="#818cf8" />
          </svg>
          {siteConfig.name}
        </Link>
        <nav
          aria-label="Primary"
          className="order-last -mx-4 flex w-full items-center gap-x-4 overflow-x-auto whitespace-nowrap px-4 text-sm [scrollbar-width:none] lg:order-none lg:mx-0 lg:w-auto lg:gap-x-5 lg:px-0"
        >
          <Link href={`/${locale}/skills`} className="font-medium text-accent hover:opacity-80">
            {dict.nav.skills}
          </Link>
          <Link href={`/${locale}/setups`} className="text-foreground/80 hover:text-foreground">
            {dict.nav.setups}
          </Link>
          <Link href={`/${locale}/categories`} className="text-foreground/80 hover:text-foreground">
            {dict.nav.categories}
          </Link>
          <Link href={`/${locale}/analyze`} className="text-foreground/80 hover:text-foreground">
            {dict.footer.analyze}
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
    </header>
  );
}
