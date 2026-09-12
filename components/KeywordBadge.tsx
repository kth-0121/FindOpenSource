import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function KeywordBadge({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </Link>
  );
}
