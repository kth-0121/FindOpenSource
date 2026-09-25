import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getSupportUrl } from "@/lib/support";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { SupportLink } from "@/components/SupportLink";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const supportUrl = getSupportUrl();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. {dict.footer.tagline}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href={`/${locale}/about`} className="whitespace-nowrap hover:text-foreground">
            {dict.footer.about}
          </Link>
          <Link href={`/${locale}/contribute`} className="whitespace-nowrap hover:text-foreground">
            {dict.footer.contribute}
          </Link>
          <Link href={`/${locale}/compare`} className="whitespace-nowrap hover:text-foreground">
            {dict.footer.compare}
          </Link>
          <Link href={`/${locale}/privacy`} className="whitespace-nowrap hover:text-foreground">
            {dict.footer.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="whitespace-nowrap hover:text-foreground">
            {dict.footer.terms}
          </Link>
          <Link href={`/${locale}/contact`} className="whitespace-nowrap hover:text-foreground">
            {dict.footer.contact}
          </Link>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap hover:text-foreground"
          >
            {dict.footer.github}
          </a>
          {supportUrl && (
            <SupportLink
              href={supportUrl}
              ariaLabel={dict.support.ctaAriaLabel}
              className="whitespace-nowrap hover:text-foreground"
            >
              {dict.footer.support}
            </SupportLink>
          )}
        </nav>
      </div>
    </footer>
  );
}
