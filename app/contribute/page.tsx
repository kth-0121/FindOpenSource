import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Add a new open source project to FindOpenSource through a GitHub pull request.",
  alternates: { canonical: "/contribute" },
};

const steps = [
  {
    title: "Fork the repository",
    description: `Fork ${siteConfig.name} on GitHub and clone it locally.`,
  },
  {
    title: "Add a project file",
    description: "Create a new JSON file in data/projects/ named after your project's slug.",
  },
  {
    title: "Fill in the details",
    description:
      "Add the project name, description, GitHub repository, categories, keywords and license.",
  },
  {
    title: "Validate",
    description: "Run npm run validate locally to make sure the file passes all checks.",
  },
  {
    title: "Open a pull request",
    description: "Submit a pull request. GitHub Actions will validate it automatically.",
  },
];

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Contribute a project</h1>
      <p className="mt-4 text-muted-foreground">
        {siteConfig.name} is community maintained. Anyone can add a new open source project
        through a GitHub pull request &mdash; no coding experience beyond editing a JSON file is
        required.
      </p>

      <ol className="mt-10 space-y-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {index + 1}
            </span>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          Read CONTRIBUTING.md
        </a>
        <a
          href={`${siteConfig.githubUrl}/issues/new?template=add-project.yml`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
        >
          Suggest a project via Issue
        </a>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Prefer not to edit code? Open an{" "}
        <a
          href={`${siteConfig.githubUrl}/issues/new?template=add-project.yml`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          issue
        </a>{" "}
        instead and someone will help add it.
      </p>
    </div>
  );
}
