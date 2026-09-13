import { locales, defaultLocale, localeMeta, type Locale } from "./config";
import { siteConfig } from "@/lib/site";

/**
 * Builds canonical + hreflang alternate URLs for a locale-prefixed page.
 * `path` is the part of the URL after the locale segment, e.g. "" for the
 * homepage or "/projects/supabase" for a project page (no trailing slash).
 */
export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeMeta[l].bcp47] = `${siteConfig.url}/${l}${path}`;
  }
  languages["x-default"] = `${siteConfig.url}/${defaultLocale}${path}`;

  return {
    canonical: `${siteConfig.url}/${locale}${path}`,
    languages,
  };
}

export function ogLocale(locale: Locale): string {
  return localeMeta[locale].ogLocale;
}

export function ogAlternateLocales(locale: Locale): string[] {
  return locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale);
}
