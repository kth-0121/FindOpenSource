"use client";

import type { ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function localizedPath(nextLocale: Locale): string {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${nextLocale}`;
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    const search = typeof window !== "undefined" ? window.location.search : "";
    router.push(`${localizedPath(nextLocale)}${search}`);
  }

  return (
    <select
      aria-label={label}
      value={currentLocale}
      onChange={handleChange}
      className="rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground/80 transition-colors hover:border-accent focus-visible:border-accent sm:text-sm"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeMeta[locale].nativeName}
        </option>
      ))}
    </select>
  );
}
