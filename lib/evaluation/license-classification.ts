export type LicenseClass =
  | "permissive"
  | "weak-copyleft"
  | "strong-copyleft"
  | "source-available"
  | "unknown";

/**
 * Classifies the literal `license` string already shown on every project
 * page. Covers every license string currently present in data/projects/*,
 * plus a handful of other common OSI licenses likely to appear as the
 * catalog grows. Anything not listed classifies as "unknown" rather than
 * guessing -- see docs/project-evaluation.md.
 */
const LICENSE_CLASS: Record<string, LicenseClass> = {
  "MIT": "permissive",
  "Apache-2.0": "permissive",
  "BSD-3-Clause": "permissive",
  "BSD-2-Clause": "permissive",
  "ISC": "permissive",
  "0BSD": "permissive",
  "Unlicense": "permissive",
  "Zlib": "permissive",
  "PostgreSQL License": "permissive",
  "MPL-2.0": "weak-copyleft",
  "LGPL-2.1": "weak-copyleft",
  "LGPL-3.0": "weak-copyleft",
  "EPL-2.0": "weak-copyleft",
  "GPL-2.0": "strong-copyleft",
  "GPL-3.0": "strong-copyleft",
  "AGPL-3.0": "strong-copyleft",
  "BUSL-1.1": "source-available",
  "SSPL-1.0": "source-available",
  "Sustainable Use License": "source-available",
  "FSL-1.1-Apache-2.0": "source-available",
  "Elastic-2.0": "source-available",
  "Commons Clause": "source-available",
};

export function classifyLicense(license: string): LicenseClass {
  return LICENSE_CLASS[license] ?? "unknown";
}
