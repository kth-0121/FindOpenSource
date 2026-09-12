import type { Category, Project } from "./schema";

export interface SearchResult {
  project: Project;
  score: number;
}

const NAME_EXACT = 100;
const NAME_PARTIAL = 50;
const KEYWORD_EXACT = 40;
const KEYWORD_PARTIAL = 20;
const CATEGORY_EXACT = 15;
const CATEGORY_PARTIAL = 8;
const LANGUAGE_EXACT = 8;
const LANGUAGE_PARTIAL = 4;
const DESCRIPTION_PARTIAL = 5;
const ALL_TOKENS_MATCHED_BONUS = 25;

function tokenize(query: string): string[] {
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return Array.from(new Set(tokens));
}

function scoreTokenAgainstProject(
  token: string,
  project: Project,
  categories: Category[],
): number {
  let best = 0;

  const name = project.name.toLowerCase();
  if (name === token) best = Math.max(best, NAME_EXACT);
  else if (name.includes(token)) best = Math.max(best, NAME_PARTIAL);

  for (const keyword of project.keywords) {
    const value = keyword.toLowerCase();
    if (value === token) best = Math.max(best, KEYWORD_EXACT);
    else if (value.includes(token)) best = Math.max(best, KEYWORD_PARTIAL);
  }

  for (const categorySlug of project.categories) {
    if (categorySlug === token) best = Math.max(best, CATEGORY_EXACT);
    else if (categorySlug.includes(token)) best = Math.max(best, CATEGORY_PARTIAL);

    const category = categories.find((c) => c.slug === categorySlug);
    if (category) {
      const categoryName = category.name.toLowerCase();
      if (categoryName === token) best = Math.max(best, CATEGORY_EXACT);
      else if (categoryName.includes(token)) best = Math.max(best, CATEGORY_PARTIAL);
    }
  }

  for (const language of project.languages ?? []) {
    const value = language.toLowerCase();
    if (value === token) best = Math.max(best, LANGUAGE_EXACT);
    else if (value.includes(token)) best = Math.max(best, LANGUAGE_PARTIAL);
  }

  if (project.description.toLowerCase().includes(token)) {
    best = Math.max(best, DESCRIPTION_PARTIAL);
  }

  return best;
}

export function searchProjects(
  query: string,
  projects: Project[],
  categories: Category[],
): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results = projects.map((project) => {
    const tokenScores = tokens.map((token) => scoreTokenAgainstProject(token, project, categories));
    const sum = tokenScores.reduce((total, tokenScore) => total + tokenScore, 0);
    const matchesEveryToken = tokens.length > 1 && tokenScores.every((tokenScore) => tokenScore > 0);
    const score = sum + (matchesEveryToken ? tokens.length * ALL_TOKENS_MATCHED_BONUS : 0);
    return { project, score };
  });

  return results
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.project.name.localeCompare(b.project.name));
}
