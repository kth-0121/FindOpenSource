import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "./globals.css";

/**
 * Global fallback for any URL that doesn't match a route at all (Next.js
 * always needs one root-level not-found boundary). Localized 404s for known
 * routes with a bad slug/locale are handled by `app/[locale]/not-found.tsx`;
 * this one can't know the visitor's locale, so it uses the default.
 */
export default function GlobalNotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <html lang={defaultLocale}>
      <body>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight">{dict.notFound.title}</h1>
          <p className="text-muted-foreground">{dict.notFound.description}</p>
          <Link href={`/${defaultLocale}`} className="text-accent hover:underline">
            {dict.notFound.backHome}
          </Link>
        </div>
      </body>
    </html>
  );
}
