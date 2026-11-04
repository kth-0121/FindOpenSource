export interface Dictionary {
  skipToContent: string;
  adSlotLabel: string;
  evidenceBadges: {
    activelyMaintained: string;
    wellDocumented: string;
    permissiveLicense: string;
    foundationBacked: string;
  };
  nav: {
    skills: string;
    categories: string;
    contribute: string;
    github: string;
    support: string;
  };
  languageSwitcher: {
    label: string;
  };
  footer: {
    tagline: string;
    about: string;
    contribute: string;
    compare: string;
    analyze: string;
    github: string;
    support: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  home: {
    /** Site-wide default <title> suffix and the home page title. */
    metaTitle: string;
    introTitleLine1: string;
    introTitleLine2: string;
    introSubtitle: string;
    stats: { skills: string; projects: string; categories: string; languages: string };
    quickMenu: {
      heading: string;
      items: Record<"skills" | "search" | "categories" | "analyze" | "compare" | "contribute", { title: string; body: string }>;
    };
    featureSkills: {
      eyebrow: string;
      title: string;
      body: string;
      steps: [string, string, string];
      cta: string;
      presetsLabel: string;
      /** {preset}, {agent} */
      exampleLabel: string;
    };
    featureSearchEyebrow: string;
    featureAnalyze: { eyebrow: string; title: string; body: string; cta: string };
    featureCompare: { eyebrow: string; title: string; body: string; cta: string };
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    popularSearchesLabel: string;
    popularSearches: string[];
    browseCategories: string;
    popularOpenSource: string;
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
    startHeading: string;
    relatedSearchesLabel: string;
    relatedCategoryLabel: string;
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
    filterAll: string;
    filterAiAgents: string;
    filterAgentTools: string;
  };
  projectsPage: {
    title: string;
    descriptionOne: string;
    descriptionOther: string;
  };
  compare: {
    indexTitle: string;
    indexDescription: string;
    firstProjectLabel: string;
    secondProjectLabel: string;
    projectPlaceholder: string;
    selectPrompt: string;
    evidenceLabel: string;
    startCompareLabel: string;
    allCategoriesOption: string;
    categoryFilterLabel: string;
    changeSelectionLabel: string;
    noMatchesLabel: string;
  };
  skills: {
    pageTitle: string;
    pageDescription: string;
    presetsHeading: string;
    presets: Record<"coding" | "frontend" | "lean" | "ml", { title: string; description: string }>;
    listLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    descriptionNote: string;
    noResults: string;
    /** {count} */
    skillCount: string;
    selectPack: string;
    clearPack: string;
    viewPack: string;
    /** {name} */
    viewSource: string;
    /** {count} */
    selectedCount: string;
    clearAll: string;
    agentLabel: string;
    otherAgents: string;
    scopeLabel: string;
    scopeProject: string;
    scopeGlobal: string;
    promptTab: string;
    commandTab: string;
    promptHint: string;
    commandHint: string;
    emptySelection: string;
    copy: string;
    copied: string;
    /** {count} */
    jumpToOutput: string;
  };
  analyze: {
    pageTitle: string;
    pageDescription: string;
    inputLabel: string;
    inputPlaceholder: string;
    submitLabel: string;
    loading: string;
    errorInvalid: string;
    errorNotFound: string;
    errorRateLimited: string;
    errorGeneric: string;
    stackHeading: string;
    languageLabel: string;
    frameworksLabel: string;
    /** {count} dependencies, {files} manifest file names */
    dependenciesLabel: string;
    noManifests: string;
    usedHeading: string;
    usedEmpty: string;
    /** {package} */
    matchedVia: string;
    recommendHeading: string;
    /** {ecosystem}, {category} */
    recommendReason: string;
    recommendEmpty: string;
    limitationNote: string;
  };
  projectDetail: {
    overviewHeading: string;
    whyHeading: string;
    descriptionLabel: string;
    catalogRatingLabel: string;
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
  productionReadiness: {
    foundational: string;
    mature: string;
    emerging: string;
    experimental: string;
  };
  governance: {
    foundation: string;
    "vendor-backed": string;
    community: string;
    unknown: string;
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
    supportHeading: string;
    supportBody: string;
    supportCta: string;
    supportBodySuffix: string;
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
  support: {
    title: string;
    metaDescription: string;
    intro: string;
    whyHeading: string;
    whyIntro: string;
    whyItems: string[];
    howHeading: string;
    howBody: string;
    ctaLabel: string;
    ctaAriaLabel: string;
  };
  privacy: {
    title: string;
    metaDescription: string;
    lastUpdated: string;
    sections: { heading: string; paragraphs: string[] }[];
  };
  terms: {
    title: string;
    metaDescription: string;
    lastUpdated: string;
    sections: { heading: string; paragraphs: string[] }[];
  };
  contact: {
    title: string;
    metaDescription: string;
    intro: string;
    reasonsHeading: string;
    reasons: string[];
    howHeading: string;
    howBody: string;
    ctaLabel: string;
  };
}
