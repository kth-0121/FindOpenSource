import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A non-interactive pill for evidence-backed project signals (e.g. "Actively
 * maintained", "Permissive license"). Mirrors KeywordBadge's pill styling
 * but isn't a Link -- these badges describe the project, they don't filter
 * the catalog. Every label shown here must be backed by real stored
 * evidence -- see lib/evaluation/badges.ts and docs/project-evaluation.md.
 */
export function EvidenceBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-sm text-foreground/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
