import type { ReactNode } from "react";

/**
 * External link to GitHub Sponsors. Centralizes the target/rel security
 * attributes so every Support CTA (Header, Footer, Homepage, About,
 * /support) applies them the same way.
 */
export function SupportLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
