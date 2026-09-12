import keywords from "@/data/keywords.json";
import { KeywordBadge } from "@/components/KeywordBadge";

export function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-border py-16 text-center">
      <div className="space-y-2">
        <p className="text-lg font-medium">No projects found for &ldquo;{query}&rdquo;.</p>
        <p className="text-sm text-muted-foreground">Try searching for one of these instead:</p>
      </div>
      <ul className="flex flex-wrap justify-center gap-2 px-4">
        {keywords.map((keyword) => (
          <li key={keyword}>
            <KeywordBadge href={`/search?q=${encodeURIComponent(keyword)}`}>
              {keyword}
            </KeywordBadge>
          </li>
        ))}
      </ul>
    </div>
  );
}
