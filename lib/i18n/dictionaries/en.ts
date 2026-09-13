import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Skip to content",
  adSlotLabel: "Advertisement",
  nav: {
    categories: "Categories",
    contribute: "Contribute",
    github: "GitHub",
  },
  languageSwitcher: {
    label: "Select language",
  },
  footer: {
    tagline: "Project data is community maintained on GitHub.",
    about: "About",
    contribute: "Contribute",
    github: "GitHub",
  },
  home: {
    heroTitleLine1: "Find the right open source",
    heroTitleLine2: "for your project.",
    heroSubtitle: "Discover open source projects by feature, technology, and category.",
    searchPlaceholder: "Search by feature, technology or category",
    popularSearchesLabel: "Popular searches",
    popularSearches: ["authentication", "chat", "database", "image upload", "cms", "ai"],
    browseCategories: "Browse Categories",
    viewAll: "View all",
    popularOpenSource: "Popular Open Source",
    recentlyAdded: "Recently Added",
  },
  search: {
    inputLabel: "Search open source projects",
    submitLabel: "Search",
    resultsCountOne: '{count} project found for "{query}"',
    resultsCountOther: '{count} projects found for "{query}"',
    noResultsTitle: 'No projects found for "{query}".',
    noResultsSuggestion: "Try searching for one of these instead:",
    pageTitle: "Search",
    pageDescription: "Search open source projects by feature, technology or category.",
    startHeading: "Search open-source projects",
    relatedSearchesLabel: "Try also",
    relatedCategoryLabel: "Related category",
  },
  categories: {
    ai: {
      name: "AI & Machine Learning",
      description: "Open source machine learning frameworks, large language models and AI infrastructure.",
    },
    authentication: {
      name: "Authentication & Security",
      description: "Open source authentication, identity and security tools.",
    },
    backend: {
      name: "Backend",
      description: "Backend platforms and backend-as-a-service tools for building applications.",
    },
    database: {
      name: "Database",
      description: "Relational, document, vector and in-memory databases.",
    },
    api: {
      name: "API",
      description: "Tools for building, exposing and managing APIs.",
    },
    cms: {
      name: "CMS",
      description: "Headless and traditional content management systems.",
    },
    chat: {
      name: "Chat & Messaging",
      description: "Team chat, messaging and real-time communication platforms.",
    },
    "developer-tools": {
      name: "Developer Tools",
      description: "Tools that help developers build, test and ship software.",
    },
    ui: {
      name: "UI & Components",
      description: "Component libraries and design systems for building interfaces.",
    },
    analytics: {
      name: "Analytics",
      description: "Web and product analytics platforms.",
    },
    storage: {
      name: "Storage",
      description: "Object storage, file sync and self-hosted storage systems.",
    },
    automation: {
      name: "Automation",
      description: "Workflow automation and no-code/low-code integration tools.",
    },
    devops: {
      name: "DevOps",
      description: "Infrastructure, orchestration and deployment tooling.",
    },
    search: {
      name: "Search",
      description: "Full-text and search engine infrastructure.",
    },
    monitoring: {
      name: "Monitoring",
      description: "Observability, metrics, logging and error tracking tools.",
    },
    ecommerce: {
      name: "E-commerce",
      description: "Open source commerce and storefront platforms.",
    },
    payments: {
      name: "Payments",
      description: "Open source payment processing and billing infrastructure.",
    },
    media: {
      name: "Media",
      description: "Media servers, streaming and document/media processing tools.",
    },
    testing: {
      name: "Testing",
      description: "Testing frameworks and browser automation tools.",
    },
    mobile: {
      name: "Mobile",
      description: "Frameworks for building cross-platform mobile applications.",
    },
  },
  categoriesPage: {
    title: "Categories",
    description: "Browse open source projects grouped by the feature or technology they provide.",
  },
  categoryDetail: {
    backLink: "All categories",
    emptyMessage: "No projects in this category yet.",
    addOneLink: "Add one",
  },
  projectsPage: {
    title: "All Projects",
    descriptionOne: "{count} open source project, curated and maintained by the community.",
    descriptionOther: "{count} open source projects, curated and maintained by the community.",
  },
  projectDetail: {
    overviewHeading: "Overview",
    githubButton: "GitHub",
    websiteButton: "Website",
    documentationButton: "Documentation",
    categoriesLabel: "Categories",
    keywordsLabel: "Keywords",
    languagesLabel: "Languages",
    licenseLabel: "License",
    relatedProjects: "Related Projects",
    spottedError: "Spotted an error? ",
    suggestEditLink: "Suggest an edit on GitHub",
    suggestEditSuffix: ".",
  },
  about: {
    title: "About FindOpenSource",
    intro:
      "Most open source directories assume you already know the name of the project you're looking for. FindOpenSource starts from a different question:",
    questionQuote: "What open source can I use to build this feature?",
    paragraph2:
      "Search by what you're trying to build — authentication, a chat feature, a CMS, a vector database — and get a curated list of open source projects that solve that problem, with enough information to quickly evaluate and compare them.",
    howItWorksHeading: "How it works",
    howItWorksBody:
      "FindOpenSource is a fully static, open source directory. There is no login, no database and no backend service — every project is a plain JSON file reviewed and merged through GitHub pull requests. This keeps the project simple, transparent and easy to contribute to.",
    contributingHeading: "Contributing",
    contributingBody: "Anyone can add a project by opening a pull request. ",
    contributingLinkText: "See the contribution guide",
    contributingLinkSuffix: " to get started.",
  },
  contribute: {
    title: "Contribute a project",
    intro:
      "FindOpenSource is community maintained. Anyone can add a new open source project through a GitHub pull request — no coding experience beyond editing a JSON file is required.",
    steps: [
      {
        title: "Fork the repository",
        description: "Fork FindOpenSource on GitHub and clone it locally.",
      },
      {
        title: "Add a project file",
        description: "Create a new JSON file in data/projects/ named after your project's slug.",
      },
      {
        title: "Fill in the details",
        description: "Add the project name, description, GitHub repository, categories, keywords and license.",
      },
      {
        title: "Validate",
        description: "Run npm run validate locally to make sure the file passes all checks.",
      },
      {
        title: "Open a pull request",
        description: "Submit a pull request. GitHub Actions will validate it automatically.",
      },
    ],
    readContributing: "Read CONTRIBUTING.md",
    suggestViaIssue: "Suggest a project via Issue",
    preferNotToEdit: "Prefer not to edit code? Open an ",
    issueLinkText: "issue",
    preferNotToEditSuffix: " instead and someone will help add it.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or may have been moved.",
    backHome: "Back to home",
  },
};

export default dictionary;
