import { NextResponse, type NextRequest } from "next/server";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { getAllProjects } from "@/lib/projects";
import { getAllCategories } from "@/lib/categories";
import { searchProjects } from "@/lib/search";
import { needsAIAssist } from "@/lib/ai/enhance-search";
import { understandQuery } from "@/lib/ai/query-understanding";
import { isRateLimited } from "@/lib/ai/rate-limit";

const MAX_QUERY_LENGTH = 200;

/**
 * AI query-understanding endpoint used by SearchExperience as a progressive
 * enhancement over client-side keyword search. Always responds 200 -- the
 * `ok` field tells the client whether to use `data` or just keep showing
 * plain keyword results. There is no error status a client needs to branch
 * on; a disabled/misconfigured/failed AI layer looks identical to the
 * client as "no enhancement this time".
 *
 * The AI gateway is only ever called when baseline keyword search
 * (searchProjects, unmodified) is itself weak (see needsAIAssist) -- a
 * query that already scores well never reaches understandQuery(), so a
 * "good" search never pays the AI's latency/cost and can never be
 * reordered by it.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const query = typeof body?.query === "string" ? body.query.slice(0, MAX_QUERY_LENGTH) : "";
  const localeParam = typeof body?.locale === "string" ? body.locale : defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  if (!query.trim()) {
    return NextResponse.json({ ok: false, reason: "empty_query" });
  }

  const projects = getAllProjects(locale);
  const categories = getAllCategories();
  const baseline = searchProjects(query, projects, categories, locale);
  if (!needsAIAssist(baseline)) {
    return NextResponse.json({ ok: false, reason: "baseline_sufficient" });
  }

  const rateLimitKey = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" });
  }

  const understanding = await understandQuery(query, locale);
  if (!understanding) {
    return NextResponse.json({ ok: false, reason: "unavailable" });
  }

  return NextResponse.json({ ok: true, data: understanding });
}
