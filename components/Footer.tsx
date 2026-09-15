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
        <nav aria-label="Footer" className="flex items-center gap-4">
          <Link href={`/${locale}/about`} className="hover:text-foreground">
            {dict.footer.about}
          </Link>
          <Link href={`/${locale}/contribute`} className="hover:text-foreground">
            {dict.footer.contribute}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-foreground">
            {dict.footer.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-foreground">
            {dict.footer.terms}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-foreground">
            {dict.footer.contact}
          </Link>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {dict.footer.github}
          </a>
          {supportUrl && (
            <SupportLink href={supportUrl} ariaLabel={dict.support.ctaAriaLabel} className="hover:text-foreground">
              {dict.footer.support}
            </SupportLink>
          )}
        </nav>
      </div>
    </footer>
  );
}
