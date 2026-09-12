import { z } from "zod";

export const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const projectSchema = z.object({
  name: z.string().min(1, "name is required"),
  slug: z
    .string()
    .regex(slugPattern, "slug must be lowercase kebab-case (e.g. my-project)"),
  description: z
    .string()
    .min(10, "description should be at least 10 characters")
    .max(280, "description should be at most 280 characters"),
  repository: z
    .string()
    .url("repository must be a valid URL")
    .refine(
      (url) => url.startsWith("https://github.com/"),
      "repository must be a GitHub URL (https://github.com/...)",
    ),
  website: z.string().url("website must be a valid URL").optional(),
  documentation: z.string().url("documentation must be a valid URL").optional(),
  categories: z
    .array(z.string())
    .min(1, "at least one category is required"),
  keywords: z.array(z.string().min(1)).min(1, "at least one keyword is required"),
  languages: z.array(z.string().min(1)).optional(),
  license: z.string().min(1, "license is required"),
  featured: z.boolean().optional().default(false),
  dateAdded: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "dateAdded must be in YYYY-MM-DD format")
    .optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const categorySchema = z.object({
  slug: z.string().regex(slugPattern, "slug must be lowercase kebab-case"),
  name: z.string().min(1),
  description: z.string().min(1),
});

export type Category = z.infer<typeof categorySchema>;
