import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./dictionaries/en";
import zhCN from "./dictionaries/zh-CN";
import ja from "./dictionaries/ja";
import ko from "./dictionaries/ko";
import es from "./dictionaries/es";
import de from "./dictionaries/de";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "zh-CN": zhCN,
  ja,
  ko,
  es,
  de,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
