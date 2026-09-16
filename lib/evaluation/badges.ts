import type { Project } from "../schema";
import { classifyLicense } from "./license-classification";

export type EvidenceBadge =
  | "activelyMaintained"
  | "wellDocumented"
  | "permissiveLicense"
  | "foundationBacked";

/**
 * Returns badge *keys*, never display strings -- lib/i18n dictionaries own
 * the translated text (dict.evidenceBadges.<key>). Every badge here is a
 * direct, mechanical readout of stored evidence: nothing is inferred or
 * guessed for the UI. See docs/project-evaluation.md.
 */
export function getEvidenceBadges(project: Project): EvidenceBadge[] {
  const badges: EvidenceBadge[] = [];
  const evidence = project.evaluation?.quality;

  if (evidence && !evidence.archived && evidence.lastCommitAt) {
    const days = (Date.now() - new Date(evidence.lastCommitAt).getTime()) / (1000 * 60 * 60 * 24);
    if (days <= 90) badges.push("activelyMaintained");
  }

  if (evidence?.governance === "foundation") {
    badges.push("foundationBacked");
  }

  if (project.documentation && project.longDescription && project.longDescription.length >= 400) {
    badges.push("wellDocumented");
  }

  if (classifyLicense(project.license) === "permissive") {
    badges.push("permissiveLicense");
  }

  return badges;
}

/** The single most notable badge, for compact contexts like ProjectCard. */
export function getTopEvidenceBadge(project: Project): EvidenceBadge | undefined {
  const badges = getEvidenceBadges(project);
  const priority: EvidenceBadge[] = [
    "activelyMaintained",
    "foundationBacked",
    "wellDocumented",
    "permissiveLicense",
  ];
  return priority.find((badge) => badges.includes(badge));
}
