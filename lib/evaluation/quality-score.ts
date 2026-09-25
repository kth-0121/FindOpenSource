import type { Project } from "../schema";
import { classifyLicense } from "./license-classification";

type QualityEvidence = NonNullable<NonNullable<Project["evaluation"]>["quality"]>;

/**
 * Pure, deterministic function of stored evidence -- never hand-typed.
 * scripts/audit-projects.ts recomputes this and flags any stored `score`
 * that no longer matches (a "stale score") as an error.
 *
 * 70 points automated (maintenance, maturity, documentation, license,
 * metadata breadth) + 30 points manual/rubric-anchored (production
 * readiness, governance). Missing evidence always contributes 0 to that
 * sub-score -- never averaged, never skipped -- per the project's rule to
 * score conservatively when data is insufficient. See
 * docs/project-evaluation.md for the full rationale and worked examples.
 */
export function computeQualityScore(evidence: QualityEvidence | undefined, project: Project): number {
  if (!evidence) return 0;

  return (
    scoreMaintenanceRecency(evidence) +
    scoreProjectMaturity(evidence) +
    scoreDocumentation(project) +
    scoreLicense(project) +
    scoreMetadataBreadth(project) +
    scoreProductionReadiness(evidence) +
    scoreGovernance(evidence)
  );
}

function daysSince(dateString: string | undefined): number | undefined {
  if (!dateString) return undefined;
  const then = new Date(dateString).getTime();
  if (Number.isNaN(then)) return undefined;
  return (Date.now() - then) / (1000 * 60 * 60 * 24);
}

function scoreMaintenanceRecency(evidence: QualityEvidence): number {
  if (evidence.archived) return 0;
  const days = daysSince(evidence.lastCommitAt);
  if (days === undefined) return 0;
  if (days <= 30) return 25;
  if (days <= 90) return 20;
  if (days <= 180) return 14;
  if (days <= 365) return 8;
  if (days <= 730) return 3;
  return 0;
}

function scoreProjectMaturity(evidence: QualityEvidence): number {
  const days = daysSince(evidence.repoCreatedAt);
  if (days === undefined) return 0;
  const years = days / 365;
  if (years >= 5) return 10;
  if (years >= 3) return 8;
  if (years >= 1) return 5;
  if (years >= 0.5) return 2;
  return 0;
}

function scoreDocumentation(project: Project): number {
  let score = 0;
  if (project.documentation) score += 6;
  if (project.website) score += 4;
  if (project.longDescription) {
    score += project.longDescription.length >= 400 ? 5 : 2;
  }
  return score;
}

function scoreLicense(project: Project): number {
  switch (classifyLicense(project.license)) {
    case "permissive":
      return 15;
    case "weak-copyleft":
      return 12;
    case "strong-copyleft":
      return 9;
    case "source-available":
      return 3;
    default:
      return 0;
  }
}

function scoreMetadataBreadth(project: Project): number {
  let score = 0;
  if (project.languages && project.languages.length > 0) score += 2;
  if (project.keywords.length >= 4) score += 2;
  if (project.description.length >= 150) score += 1;
  return score;
}

function scoreProductionReadiness(evidence: QualityEvidence): number {
  switch (evidence.productionReadiness) {
    case "foundational":
      return 20;
    case "mature":
      return 14;
    case "emerging":
      return 8;
    case "experimental":
      return 0;
    default:
      return 0;
  }
}

function scoreGovernance(evidence: QualityEvidence): number {
  switch (evidence.governance) {
    case "foundation":
      return 10;
    case "vendor-backed":
      return 6;
    case "community":
      return 3;
    default:
      return 0;
  }
}
