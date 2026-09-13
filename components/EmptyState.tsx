import { KeywordBadge } from "@/components/KeywordBadge";
import { formatMessage } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function EmptyState({
  query,
  locale,
  dict,
}: {
  query: string;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-border py-16 text-center">
      <div className="space-y-2">
        <p className="text-lg font-medium">
          {formatMessage(dict.search.noResultsTitle, { query })}
        </p>
        <p className="text-sm text-muted-foreground">{dict.search.noResultsSuggestion}</p>
      </div>
      <ul className="flex flex-wrap justify-center gap-2 px-4">
        {dict.home.popularSearches.map((keyword) => (
          <li key={keyword}>
            <KeywordBadge href={`/${locale}/search?q=${encodeURIComponent(keyword)}`}>
              {keyword}
            </KeywordBadge>
          </li>
        ))}
      </ul>
    </div>
  );
}
