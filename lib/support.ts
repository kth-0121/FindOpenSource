/**
 * Central place to read the GitHub Sponsors URL used by the Support CTA.
 * Never read `process.env.NEXT_PUBLIC_SUPPORT_URL` directly elsewhere —
 * go through `getSupportUrl()` so the placeholder/validity check stays
 * in one place.
 */

const PLACEHOLDER_MARKERS = ["YOUR_GITHUB_USERNAME", "your-github-username"];

function isUsableSupportUrl(url: string): boolean {
  if (!url) return false;
  if (PLACEHOLDER_MARKERS.some((marker) => url.includes(marker))) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Returns the configured GitHub Sponsors URL, or `null` if it's unset or
 * still the `.env.example` placeholder. Components should treat `null` as
 * "Support CTA not ready yet" and skip rendering the link rather than
 * pointing at a dead or placeholder URL.
 */
export function getSupportUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUPPORT_URL?.trim();
  if (!raw) return null;
  return isUsableSupportUrl(raw) ? raw : null;
}
