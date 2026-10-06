import { NextResponse } from "next/server";
import { getAllProjects, getProjectBySlug, stripTranslations } from "@/lib/projects";
import { locales, isLocale } from "@/lib/i18n/config";

type RouteParams = { params: Promise<{ locale: string; slug: string }> };

/**
 * Static per-project JSON, fetched on demand by ComparePicker only for the
 * 1-2 projects a visitor actually selects -- keeps /compare's own payload a
 * lightweight picker list instead of embedding all ~220 projects' full data
 * on every page load (that bloat was the single biggest driver of Fast
 * Origin Transfer usage). `force-static` + generateStaticParams means this
 * is prerendered at build time, served as a plain static asset at request
 * time -- no serverless invocation, same as any other static route.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllProjects(locale).map((project) => ({ locale, slug: project.slug })));
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const project = getProjectBySlug(slug, localeParam);
  if (!project) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(stripTranslations(project));
}
