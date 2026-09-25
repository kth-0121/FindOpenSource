import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { projectSchema } from "../lib/schema";
import categoriesData from "../data/categories.json";
import { keywordTaxonomy } from "../lib/i18n/keyword-taxonomy";

const projectsDir = path.join(process.cwd(), "data", "projects");
const validCategorySlugs = new Set(categoriesData.map((category) => category.slug));

// Every concept id a `project.intents[].concept` is allowed to reference --
// mirrors exactly what lib/search.ts's scoreIntentMatch will ever look up
// (the taxonomy's canonical ids plus every entry's related-term ids).
const validIntentConcepts = new Set(
  keywordTaxonomy.flatMap((entry) => [entry.canonical, ...entry.related]),
);

type FileErrors = { file: string; errors: string[] };

function formatZodError(error: z.ZodError): string[] {
  return error.issues.map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`);
}

function main() {
  if (!fs.existsSync(projectsDir)) {
    console.error(`Projects directory not found: ${projectsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".json"));
  const fileErrors: FileErrors[] = [];
  const seenSlugs = new Map<string, string>();
  const seenRepositories = new Map<string, string>();

  for (const file of files) {
    const errors: string[] = [];
    const fullPath = path.join(projectsDir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (error) {
      fileErrors.push({ file, errors: [`Invalid JSON: ${(error as Error).message}`] });
      continue;
    }

    const result = projectSchema.safeParse(json);
    if (!result.success) {
      errors.push(...formatZodError(result.error));
      fileErrors.push({ file, errors });
      continue;
    }

    const project = result.data;

    if (`${project.slug}.json` !== file) {
      errors.push(
        `slug "${project.slug}" does not match filename "${file}". Rename the file to "${project.slug}.json".`,
      );
    }

    const invalidCategories = project.categories.filter(
      (category) => !validCategorySlugs.has(category),
    );
    if (invalidCategories.length > 0) {
      errors.push(
        `invalid categories: ${invalidCategories.join(", ")}. Valid categories: ${Array.from(
          validCategorySlugs,
        )
          .sort()
          .join(", ")}`,
      );
    }

    const invalidIntentConcepts = (project.intents ?? [])
      .map((intent) => intent.concept)
      .filter((concept) => !validIntentConcepts.has(concept));
    if (invalidIntentConcepts.length > 0) {
      errors.push(
        `invalid intent concept(s): ${invalidIntentConcepts.join(", ")}. Must be a canonical or related id from lib/i18n/keyword-taxonomy.ts`,
      );
    }

    const previousFileForSlug = seenSlugs.get(project.slug);
    if (previousFileForSlug) {
      errors.push(`duplicate slug "${project.slug}" also used in ${previousFileForSlug}`);
    } else {
      seenSlugs.set(project.slug, file);
    }

    const normalizedRepository = project.repository.toLowerCase().replace(/\/+$/, "");
    const previousFileForRepository = seenRepositories.get(normalizedRepository);
    if (previousFileForRepository) {
      errors.push(
        `duplicate repository "${project.repository}" also used in ${previousFileForRepository}`,
      );
    } else {
      seenRepositories.set(normalizedRepository, file);
    }

    if (errors.length > 0) {
      fileErrors.push({ file, errors });
    }
  }

  if (fileErrors.length > 0) {
    console.error(`\nFound problems in ${fileErrors.length} file(s):\n`);
    for (const { file, errors } of fileErrors) {
      console.error(`  ${file}`);
      for (const error of errors) {
        console.error(`    - ${error}`);
      }
    }
    console.error(`\nSee CONTRIBUTING.md for the project data schema.\n`);
    process.exit(1);
  }

  console.log(`Validated ${files.length} project file(s). All good.`);
}

main();
