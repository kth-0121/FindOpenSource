export const locales = ["en", "zh-CN", "ja", "ko", "es", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = "en" satisfies Locale;

/** Locales that may carry a translated project description/keywords. English is canonical. */
export const secondaryLocales = ["zh-CN", "ja", "ko", "es", "de"] as const;

export type SecondaryLocale = (typeof secondaryLocales)[number];

export interface LocaleMeta {
  /** English name of the language, used in English UI and for a11y fallbacks. */
  name: string;
  /** Name of the language written in that language itself. */
  nativeName: string;
  /** Compact label for space-constrained UI (header on small screens). */
  shortLabel: string;
  dir: "ltr" | "rtl";
  /** BCP 47 tag used for the <html lang> attribute and hreflang links. */
  bcp47: string;
  /** Underscore-formatted tag used by the OpenGraph "og:locale" property. */
  ogLocale: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    name: "English",
    nativeName: "English",
    shortLabel: "EN",
    dir: "ltr",
    bcp47: "en",
    ogLocale: "en_US",
  },
  "zh-CN": {
    name: "Simplified Chinese",
    nativeName: "简体中文",
    shortLabel: "简中",
    dir: "ltr",
    bcp47: "zh-CN",
    ogLocale: "zh_CN",
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語",
    shortLabel: "日本語",
    dir: "ltr",
    bcp47: "ja",
    ogLocale: "ja_JP",
  },
  ko: {
    name: "Korean",
    nativeName: "한국어",
    shortLabel: "한국어",
    dir: "ltr",
    bcp47: "ko",
    ogLocale: "ko_KR",
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    shortLabel: "ES",
    dir: "ltr",
    bcp47: "es",
    ogLocale: "es_ES",
  },
  de: {
    name: "German",
    nativeName: "Deutsch",
    shortLabel: "DE",
    dir: "ltr",
    bcp47: "de",
    ogLocale: "de_DE",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
