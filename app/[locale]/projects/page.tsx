import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildAlternates } from "@/lib/i18n/metadata";
import { formatCount } from "@/lib/i18n/format";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  return {
    title: dict.projectsPage.title,
    alternates: buildAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDictionary(locale);
  const projects = getAllProjects(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{dict.projectsPage.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {formatCount(projects.length, {
          one: dict.projectsPage.descriptionOne,
          other: dict.projectsPage.descriptionOther,
        })}
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} locale={locale} dict={dict} />
          </li>
        ))}
      </ul>
    </div>
  );
}
