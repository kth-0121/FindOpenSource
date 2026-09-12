import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Browse the full directory of open source projects on FindOpenSource.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {projects.length} open source projects, curated and maintained by the community.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
