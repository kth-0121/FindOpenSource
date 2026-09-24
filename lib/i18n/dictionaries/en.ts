import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Skip to content",
  adSlotLabel: "Advertisement",
  evidenceBadges: {
    activelyMaintained: "Actively maintained",
    wellDocumented: "Well documented",
    permissiveLicense: "Permissive license",
    foundationBacked: "Foundation-backed",
  },
  nav: {
    categories: "Categories",
    contribute: "Contribute",
    github: "GitHub",
    support: "Support",
  },
  languageSwitcher: {
    label: "Select language",
  },
  footer: {
    tagline: "Project data is community maintained on GitHub.",
    about: "About",
    contribute: "Contribute",
    github: "GitHub",
    support: "Support FindOpenSource",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
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
    supportHeading: "Found FindOpenSource useful?",
    supportBody: "Support the project on GitHub Sponsors and help us keep improving open-source discovery.",
    supportCta: "Support FindOpenSource",
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
    "ai-agents": {
      name: "AI Agents & Agent Tools",
      description:
        "Frameworks, tools and infrastructure for building AI agents and helping them use tools and get work done.",
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
    filterAll: "All",
    filterAiAgents: "AI Agents",
    filterAgentTools: "Agent Tools",
  },
  projectsPage: {
    title: "All Projects",
    descriptionOne: "{count} open source project, curated and maintained by the community.",
    descriptionOther: "{count} open source projects, curated and maintained by the community.",
  },
  projectDetail: {
    overviewHeading: "Overview",
    whyHeading: "Why it's in this catalog",
    catalogRatingLabel: "Catalog rating",
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
  productionReadiness: {
    foundational: "Foundational",
    mature: "Mature",
    emerging: "Emerging",
    experimental: "Experimental",
  },
  governance: {
    foundation: "Foundation-governed",
    "vendor-backed": "Vendor-backed",
    community: "Community-driven",
    unknown: "Governance not evaluated",
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
    supportHeading: "Supporting FindOpenSource",
    supportBody:
      "FindOpenSource is free to use and always will be. If it helped you find the right project, you can support its upkeep on ",
    supportCta: "GitHub Sponsors",
    supportBodySuffix: ".",
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
  support: {
    title: "Support FindOpenSource",
    metaDescription:
      "Support FindOpenSource on GitHub Sponsors and help fund ongoing project curation, search improvements and multilingual content.",
    intro:
      "FindOpenSource helps developers find open source projects by the problem they solve, not just by name. It's a free, community-curated directory with no login and no ads getting in the way.",
    whyHeading: "Why support helps",
    whyIntro: "Your support goes toward the ongoing work of running FindOpenSource, including:",
    whyItems: [
      "Keeping project data accurate and up to date",
      "Adding new open source projects to the catalog",
      "Improving the search taxonomy across languages",
      "Expanding and refining multilingual content",
      "General site maintenance",
      "Performance and SEO improvements",
    ],
    howHeading: "How to support",
    howBody:
      "FindOpenSource doesn't process payments itself. Supporting the project happens through GitHub Sponsors, GitHub's official sponsorship platform — the button below takes you to the GitHub Sponsors page.",
    ctaLabel: "Support on GitHub Sponsors",
    ctaAriaLabel: "Support FindOpenSource on GitHub Sponsors (opens in a new tab)",
  },
  privacy: {
    title: "Privacy Policy",
    metaDescription: "How FindOpenSource handles information, cookies, third-party services and external links.",
    lastUpdated: "Last updated: September 15, 2026",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "FindOpenSource (“FindOpenSource”, “we”, “us”) is a free, community-maintained directory that helps you discover open source projects by the problem they solve. This Privacy Policy explains what information is involved when you use this website and how it is handled.",
          "FindOpenSource is itself an open source project. Its codebase, including this policy, is publicly available on GitHub.",
        ],
      },
      {
        heading: "Information We Collect",
        paragraphs: [
          "FindOpenSource does not require an account, login, or registration to use the site. We do not operate a database or backend service — the entire site is built from static files.",
          "We do not ask you to submit personal information such as your name, email address, or payment details anywhere on this site.",
        ],
      },
      {
        heading: "How We Use Information",
        paragraphs: [
          "Because FindOpenSource does not collect personal information through the site itself, there is no user-submitted data for us to use, sell, or share.",
        ],
      },
      {
        heading: "Search Queries and Usage Information",
        paragraphs: [
          "When you search FindOpenSource, your query is passed as a URL parameter (for example, /search?q=database) and matched against the site's local project catalog at the time the page is rendered. FindOpenSource does not log, store, or analyze your search queries in any database.",
          "Like virtually any website, the underlying hosting infrastructure may automatically record basic technical request information (such as IP address, browser type, and request timestamps) for security and operational purposes. This is standard web server behavior and is not something FindOpenSource's application code separately collects or processes.",
        ],
      },
      {
        heading: "Cookies and Similar Technologies",
        paragraphs: [
          "FindOpenSource does not currently set its own cookies, and does not use localStorage or sessionStorage to track or identify visitors.",
          "If this changes in the future — for example, if advertising is introduced — this section will be updated to describe exactly what is used and why.",
        ],
      },
      {
        heading: "Third-Party Services",
        paragraphs: [
          "This site links out to third-party services, including GitHub (for the project's source code, issues, and pull requests) and GitHub Sponsors (for the optional Support link, when configured). These services have their own privacy policies, and your interactions with them are governed by those policies, not this one.",
          "The site is hosted on infrastructure provided by a third-party hosting platform, which may process standard technical request data as part of delivering the site to you.",
        ],
      },
      {
        heading: "External Links",
        paragraphs: [
          "Project pages link to external resources such as GitHub repositories, official project websites, and documentation. These are operated by their respective open source projects or organizations, not by FindOpenSource. We are not responsible for the content or privacy practices of external sites, and we encourage you to review their policies directly.",
        ],
      },
      {
        heading: "Open-Source Project Information",
        paragraphs: [
          "The project names, descriptions, repository links, and related details shown on FindOpenSource are sourced from publicly available information about each open source project, curated by the community through GitHub pull requests. This information is about the projects themselves, not about you as a visitor.",
        ],
      },
      {
        heading: "Data Retention",
        paragraphs: [
          "Since FindOpenSource does not collect personal information through the site, there is no user data retention schedule to describe. Any technical logs generated by hosting infrastructure are retained according to that provider's own practices, outside FindOpenSource's control.",
        ],
      },
      {
        heading: "Data Security",
        paragraphs: [
          "FindOpenSource is a static site with no database, no user accounts, and no forms that collect personal data, which limits the exposure of visitor information by design.",
        ],
      },
      {
        heading: "Your Privacy Rights",
        paragraphs: [
          "Depending on where you live, you may have rights under applicable data protection laws, such as the right to know what information is collected about you or to request its deletion. Because FindOpenSource does not knowingly collect personal information through the site itself, there is generally no personal data on file for such a request. If you have a privacy question or concern, you can reach us through the Contact page.",
        ],
      },
      {
        heading: "International Users",
        paragraphs: [
          "FindOpenSource is available in English, Simplified Chinese, Japanese, Korean, Spanish, and German, and is accessed by users from many countries. This policy is intended to describe our practices generally; it is not a substitute for legal advice about your specific jurisdiction, and FindOpenSource does not claim certification under any specific data protection framework.",
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          "FindOpenSource is not directed at children, and we do not knowingly collect personal information from children. If you believe a child has provided personal information through this site, please contact us so we can address it.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        paragraphs: [
          "We may update this policy as the site evolves. FindOpenSource may use advertising services such as Google AdSense in the future. If advertising is introduced, this policy will be updated to describe the relevant cookies, identifiers, data processing, and user choices before it goes live. The “Last updated” date at the top of this page reflects the most recent revision.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this Privacy Policy can be sent through our Contact page, which explains how to reach us via GitHub.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    metaDescription: "The terms that apply to using the FindOpenSource open source directory.",
    lastUpdated: "Last updated: September 15, 2026",
    sections: [
      {
        heading: "Acceptance of Terms",
        paragraphs: [
          "By using FindOpenSource, you agree to these Terms of Use. If you do not agree, please do not use the site.",
        ],
      },
      {
        heading: "About FindOpenSource",
        paragraphs: [
          "FindOpenSource is a free, community-maintained directory and search tool for discovering open source projects by the feature or problem they solve. It is a static website with no user accounts, no login, and no backend database.",
        ],
      },
      {
        heading: "Directory and Project Information",
        paragraphs: [
          "Project entries on FindOpenSource — including names, descriptions, categories, keywords, and links — are curated by the community and reviewed through GitHub pull requests. While we aim for accuracy, this information may be incomplete, outdated, or contain errors. Always verify details against the project's own repository and official documentation before relying on them.",
        ],
      },
      {
        heading: "External Websites and Third-Party Content",
        paragraphs: [
          "FindOpenSource links to external websites, including GitHub repositories, official project sites, and documentation, which are operated independently by their respective maintainers or organizations. We do not control, endorse, or take responsibility for the content, availability, or practices of any external site.",
        ],
      },
      {
        heading: "Open-Source Licenses",
        paragraphs: [
          "FindOpenSource does not own, license, or grant any rights to the open source projects listed in the directory. Each project is owned and licensed by its respective authors or organizations under the license shown on its entry. Before using any listed project, review its actual license and official repository to confirm the terms that apply to it.",
        ],
      },
      {
        heading: "Accuracy and Availability",
        paragraphs: [
          "FindOpenSource is provided on an “as is” and “as available” basis. We do not guarantee that the site, or any project information it contains, will be complete, accurate, uninterrupted, or error-free.",
        ],
      },
      {
        heading: "User Contributions",
        paragraphs: [
          "Anyone may propose additions or corrections to the project catalog by opening a pull request or issue on GitHub, as described on the Contribute page. Contributions are reviewed by maintainers before being merged, and we do not guarantee that any particular contribution will be accepted, or accepted within a specific timeframe.",
        ],
      },
      {
        heading: "Intellectual Property",
        paragraphs: [
          "The FindOpenSource codebase and website are open source under the MIT License, available on GitHub. Project names, logos, trademarks, and software referenced in the directory belong to their respective owners and are used for identification purposes only; listing a project does not imply endorsement by, or affiliation with, its owners.",
        ],
      },
      {
        heading: "Prohibited Use",
        paragraphs: [
          "You agree not to misuse FindOpenSource — for example, by attempting to disrupt the site, scraping it in a way that degrades service for others, or using it to distribute unlawful or harmful content.",
        ],
      },
      {
        heading: "Disclaimer",
        paragraphs: [
          "FindOpenSource makes no warranties, express or implied, about the site or the open source projects it links to, including any warranty of merchantability, fitness for a particular purpose, or non-infringement.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by law, FindOpenSource and its contributors are not liable for any damages arising from your use of the site or your reliance on information found on it, including issues with any third-party project or website it links to.",
        ],
      },
      {
        heading: "Changes to These Terms",
        paragraphs: [
          "We may update these Terms of Use as the site evolves. The “Last updated” date at the top of this page reflects the most recent revision. Continued use of the site after changes take effect means you accept the updated terms.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these Terms of Use can be sent through our Contact page.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    metaDescription: "How to reach FindOpenSource about corrections, licensing concerns, or general feedback.",
    intro:
      "FindOpenSource is a community-maintained project with no dedicated support team, but we do want to hear from you. The best way to reach us is through GitHub.",
    reasonsHeading: "Good reasons to reach out",
    reasons: [
      "A project's information is outdated, incorrect, or missing",
      "A link is broken",
      "A licensing or ownership concern about a listed project",
      "A request to update or remove a project entry",
      "A question about contributing to the directory",
      "A privacy question",
      "General feedback about the site",
    ],
    howHeading: "How to reach us",
    howBody:
      "The fastest way to reach FindOpenSource is by opening an issue on GitHub. This goes directly to the people maintaining the project.",
    ctaLabel: "Open an issue on GitHub",
  },
};

export default dictionary;
