import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";
import { getProjectsByCategory } from "@/lib/projects";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: { title: category.name, description: category.description },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const projects = getProjectsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link href="/categories" className="text-sm text-accent hover:underline">
        &larr; All categories
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{category.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>

      {projects.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No projects in this category yet.{" "}
          <Link href="/contribute" className="text-accent hover:underline">
            Add one
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
