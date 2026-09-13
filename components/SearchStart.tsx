import type { Category, Project } from "@/lib/schema";
import { localizeCategory } from "@/lib/categories";
import { KeywordBadge } from "@/components/KeywordBadge";
import { ProjectCard } from "@/components/ProjectCard";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

/** Discovery screen shown on the search page before the user has typed a query. */
export function SearchStart({
  locale,
  dict,
  featuredProjects,
  topCategories,
}: {
  locale: Locale;
  dict: Dictionary;
  featuredProjects: Project[];
  topCategories: (Category & { count: number })[];
}) {
  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="search-start-heading">
        <h2 id="search-start-heading" className="mb-4 text-lg font-semibold tracking-tight">
          {dict.search.startHeading}
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{dict.home.popularSearchesLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {dict.home.popularSearches.map((keyword) => (
                <li key={keyword}>
                  <KeywordBadge href={`/${locale}/search?q=${encodeURIComponent(keyword)}`}>
                    {keyword}
                  </KeywordBadge>
                </li>
              ))}
            </ul>
          </div>
          {topCategories.length > 0 && (
            <div>
              <p className="mb-2 text-xs text-muted-foreground">{dict.home.browseCategories}</p>
              <ul className="flex flex-wrap gap-2">
                {topCategories.map((category) => {
                  const localized = localizeCategory(category, dict);
                  return (
                    <li key={category.slug}>
                      <KeywordBadge href={`/${locale}/categories/${category.slug}`}>
                        {localized.name}
                      </KeywordBadge>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section aria-labelledby="search-start-featured">
          <h2 id="search-start-featured" className="mb-4 text-lg font-semibold tracking-tight">
            {dict.home.popularOpenSource}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
