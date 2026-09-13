export interface Dictionary {
  skipToContent: string;
  adSlotLabel: string;
  nav: {
    categories: string;
    contribute: string;
    github: string;
  };
  languageSwitcher: {
    label: string;
  };
  footer: {
    tagline: string;
    about: string;
    contribute: string;
    github: string;
  };
  home: {
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    popularSearchesLabel: string;
    popularSearches: string[];
    browseCategories: string;
    viewAll: string;
    popularOpenSource: string;
    recentlyAdded: string;
  };
  search: {
    inputLabel: string;
    submitLabel: string;
    resultsCountOne: string;
    resultsCountOther: string;
    noResultsTitle: string;
    noResultsSuggestion: string;
    pageTitle: string;
    pageDescription: string;
  };
  categories: Record<string, { name: string; description: string }>;
  categoriesPage: {
    title: string;
    description: string;
  };
  categoryDetail: {
    backLink: string;
    emptyMessage: string;
    addOneLink: string;
  };
  projectsPage: {
    title: string;
    descriptionOne: string;
    descriptionOther: string;
  };
  projectDetail: {
    overviewHeading: string;
    githubButton: string;
    websiteButton: string;
    documentationButton: string;
    categoriesLabel: string;
    keywordsLabel: string;
    languagesLabel: string;
    licenseLabel: string;
    relatedProjects: string;
    spottedError: string;
    suggestEditLink: string;
    suggestEditSuffix: string;
  };
  about: {
    title: string;
    intro: string;
    questionQuote: string;
    paragraph2: string;
    howItWorksHeading: string;
    howItWorksBody: string;
    contributingHeading: string;
    contributingBody: string;
    contributingLinkText: string;
    contributingLinkSuffix: string;
  };
  contribute: {
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
    readContributing: string;
    suggestViaIssue: string;
    preferNotToEdit: string;
    issueLinkText: string;
    preferNotToEditSuffix: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
}
