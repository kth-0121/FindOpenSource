import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Zum Inhalt springen",
  adSlotLabel: "Werbung",
  nav: {
    categories: "Kategorien",
    contribute: "Mitmachen",
    github: "GitHub",
    support: "Unterstützen",
  },
  languageSwitcher: {
    label: "Sprache auswählen",
  },
  footer: {
    tagline: "Die Projektdaten werden von der Community auf GitHub gepflegt.",
    about: "Über uns",
    contribute: "Mitmachen",
    github: "GitHub",
    support: "FindOpenSource unterstützen",
  },
  home: {
    heroTitleLine1: "Finde die passende Open-Source-",
    heroTitleLine2: "Lösung für dein Projekt.",
    heroSubtitle: "Entdecke Open-Source-Projekte nach Funktion, Technologie und Kategorie.",
    searchPlaceholder: "Suche nach Funktion, Technologie oder Kategorie",
    popularSearchesLabel: "Beliebte Suchanfragen",
    popularSearches: ["Authentifizierung", "Chat", "Datenbank", "Bild-Upload", "CMS", "KI"],
    browseCategories: "Kategorien durchsuchen",
    viewAll: "Alle anzeigen",
    popularOpenSource: "Beliebte Open-Source-Projekte",
    recentlyAdded: "Kürzlich hinzugefügt",
    supportHeading: "Hat dir FindOpenSource geholfen?",
    supportBody: "Unterstütze das Projekt auf GitHub Sponsors und hilf uns, die Open-Source-Suche weiter zu verbessern.",
    supportCta: "FindOpenSource unterstützen",
  },
  search: {
    inputLabel: "Open-Source-Projekte durchsuchen",
    submitLabel: "Suchen",
    resultsCountOne: '{count} Projekt gefunden für "{query}"',
    resultsCountOther: '{count} Projekte gefunden für "{query}"',
    noResultsTitle: 'Keine Projekte gefunden für "{query}".',
    noResultsSuggestion: "Versuche es stattdessen mit einem dieser Begriffe:",
    pageTitle: "Suche",
    pageDescription: "Durchsuche Open-Source-Projekte nach Funktion, Technologie oder Kategorie.",
    startHeading: "Durchsuche Open-Source-Projekte",
    relatedSearchesLabel: "Versuch es auch mit",
    relatedCategoryLabel: "Verwandte Kategorie",
  },
  categories: {
    ai: {
      name: "KI & Machine Learning",
      description: "Open-Source-Frameworks für Machine Learning, große Sprachmodelle und KI-Infrastruktur.",
    },
    authentication: {
      name: "Authentifizierung & Sicherheit",
      description: "Open-Source-Tools für Authentifizierung, Identität und Sicherheit.",
    },
    backend: {
      name: "Backend",
      description: "Backend-Plattformen und BaaS-Tools zum Erstellen von Anwendungen.",
    },
    database: {
      name: "Datenbank",
      description: "Relationale, dokumentenbasierte, Vektor- und In-Memory-Datenbanken.",
    },
    api: {
      name: "API",
      description: "Tools zum Erstellen, Bereitstellen und Verwalten von APIs.",
    },
    cms: {
      name: "CMS",
      description: "Headless- und klassische Content-Management-Systeme.",
    },
    chat: {
      name: "Chat & Messaging",
      description: "Team-Chat-, Messaging- und Echtzeit-Kommunikationsplattformen.",
    },
    "developer-tools": {
      name: "Entwicklertools",
      description: "Tools, die Entwicklern beim Erstellen, Testen und Ausliefern von Software helfen.",
    },
    ui: {
      name: "UI & Komponenten",
      description: "Komponentenbibliotheken und Designsysteme für die Erstellung von Benutzeroberflächen.",
    },
    analytics: {
      name: "Analytics",
      description: "Web- und Produktanalyse-Plattformen.",
    },
    storage: {
      name: "Storage",
      description: "Objektspeicher, Dateisynchronisierung und selbstgehostete Speichersysteme.",
    },
    automation: {
      name: "Automatisierung",
      description: "Workflow-Automatisierung sowie No-Code-/Low-Code-Integrationstools.",
    },
    devops: {
      name: "DevOps",
      description: "Infrastruktur-, Orchestrierungs- und Deployment-Tools.",
    },
    search: {
      name: "Suche",
      description: "Volltextsuche und Suchmaschinen-Infrastruktur.",
    },
    monitoring: {
      name: "Monitoring",
      description: "Tools für Observability, Metriken, Logging und Fehlerverfolgung.",
    },
    ecommerce: {
      name: "E-Commerce",
      description: "Open-Source-Plattformen für Commerce und Onlineshops.",
    },
    payments: {
      name: "Zahlungen",
      description: "Open-Source-Infrastruktur für Zahlungsabwicklung und Abrechnung.",
    },
    media: {
      name: "Medien",
      description: "Medienserver, Streaming sowie Dokument- und Medienverarbeitungstools.",
    },
    testing: {
      name: "Testing",
      description: "Test-Frameworks und Tools für Browser-Automatisierung.",
    },
    mobile: {
      name: "Mobile",
      description: "Frameworks zum Erstellen plattformübergreifender mobiler Apps.",
    },
  },
  categoriesPage: {
    title: "Kategorien",
    description: "Entdecke Open-Source-Projekte, gruppiert nach Funktion oder Technologie.",
  },
  categoryDetail: {
    backLink: "Alle Kategorien",
    emptyMessage: "In dieser Kategorie gibt es noch keine Projekte.",
    addOneLink: "Eines hinzufügen",
  },
  projectsPage: {
    title: "Alle Projekte",
    descriptionOne: "{count} Open-Source-Projekt, kuratiert und gepflegt von der Community.",
    descriptionOther: "{count} Open-Source-Projekte, kuratiert und gepflegt von der Community.",
  },
  projectDetail: {
    overviewHeading: "Überblick",
    githubButton: "GitHub",
    websiteButton: "Website",
    documentationButton: "Dokumentation",
    categoriesLabel: "Kategorien",
    keywordsLabel: "Schlagwörter",
    languagesLabel: "Sprachen",
    licenseLabel: "Lizenz",
    relatedProjects: "Ähnliche Projekte",
    spottedError: "Einen Fehler entdeckt? ",
    suggestEditLink: "Änderung auf GitHub vorschlagen",
    suggestEditSuffix: ".",
  },
  about: {
    title: "Über FindOpenSource",
    intro:
      "Die meisten Open-Source-Verzeichnisse gehen davon aus, dass du den Namen des gesuchten Projekts bereits kennst. FindOpenSource stellt eine andere Frage:",
    questionQuote: "Welches Open-Source-Projekt kann ich nutzen, um diese Funktion zu bauen?",
    paragraph2:
      "Suche nach dem, was du bauen möchtest – Authentifizierung, eine Chat-Funktion, ein CMS, eine Vektordatenbank – und erhalte eine kuratierte Liste passender Open-Source-Projekte mit genug Informationen, um sie schnell zu bewerten und zu vergleichen.",
    howItWorksHeading: "So funktioniert's",
    howItWorksBody:
      "FindOpenSource ist ein vollständig statisches Open-Source-Verzeichnis. Es gibt kein Login, keine Datenbank und keinen eigenen Backend-Dienst – jedes Projekt ist eine einfache JSON-Datei, die per GitHub Pull Request geprüft und gemergt wird. Das hält das Projekt einfach, transparent und leicht zugänglich für Beiträge.",
    contributingHeading: "Mitmachen",
    contributingBody: "Jeder kann ein Projekt per Pull Request hinzufügen. ",
    contributingLinkText: "Schau dir den Contribution Guide an",
    contributingLinkSuffix: ", um loszulegen.",
    supportHeading: "FindOpenSource unterstützen",
    supportBody:
      "FindOpenSource ist kostenlos nutzbar und wird es auch bleiben. Wenn es dir geholfen hat, das richtige Projekt zu finden, kannst du den Betrieb auf ",
    supportCta: "GitHub Sponsors",
    supportBodySuffix: " unterstützen.",
  },
  contribute: {
    title: "Ein Projekt beitragen",
    intro:
      "FindOpenSource wird von der Community gepflegt. Jeder kann über einen GitHub Pull Request ein neues Open-Source-Projekt hinzufügen – dafür ist nicht mehr als das Bearbeiten einer JSON-Datei nötig.",
    steps: [
      {
        title: "Repository forken",
        description: "Forke FindOpenSource auf GitHub und klone es lokal.",
      },
      {
        title: "Projektdatei hinzufügen",
        description: "Erstelle eine neue JSON-Datei in data/projects/, benannt nach dem Slug deines Projekts.",
      },
      {
        title: "Angaben ausfüllen",
        description: "Füge Projektname, Beschreibung, GitHub-Repository, Kategorien, Schlagwörter und Lizenz hinzu.",
      },
      {
        title: "Validieren",
        description: "Führe lokal npm run validate aus, um sicherzustellen, dass die Datei alle Prüfungen besteht.",
      },
      {
        title: "Pull Request öffnen",
        description: "Reiche einen Pull Request ein. GitHub Actions validiert ihn automatisch.",
      },
    ],
    readContributing: "CONTRIBUTING.md lesen",
    suggestViaIssue: "Projekt per Issue vorschlagen",
    preferNotToEdit: "Möchtest du keinen Code bearbeiten? Eröffne ein ",
    issueLinkText: "Issue",
    preferNotToEditSuffix: ", und jemand hilft dir beim Hinzufügen.",
  },
  notFound: {
    title: "Seite nicht gefunden",
    description: "Die gesuchte Seite existiert nicht oder wurde möglicherweise verschoben.",
    backHome: "Zurück zur Startseite",
  },
  support: {
    title: "FindOpenSource unterstützen",
    metaDescription:
      "Unterstütze FindOpenSource auf GitHub Sponsors und hilf, die laufende Projektkuratierung, Suchverbesserungen und mehrsprachige Inhalte zu finanzieren.",
    intro:
      "FindOpenSource hilft Entwicklern, Open-Source-Projekte anhand des Problems zu finden, das sie lösen – nicht nur anhand des Namens. Es ist ein kostenloses, von der Community kuratiertes Verzeichnis ohne Login und ohne störende Werbung.",
    whyHeading: "Warum Unterstützung hilft",
    whyIntro: "Deine Unterstützung fließt in die laufende Arbeit am Betrieb von FindOpenSource, darunter:",
    whyItems: [
      "Projektdaten korrekt und aktuell halten",
      "Neue Open-Source-Projekte zum Katalog hinzufügen",
      "Die Such-Taxonomie über mehrere Sprachen hinweg verbessern",
      "Mehrsprachige Inhalte erweitern und verfeinern",
      "Allgemeine Wartung der Website",
      "Performance- und SEO-Verbesserungen",
    ],
    howHeading: "So kannst du unterstützen",
    howBody:
      "FindOpenSource wickelt Zahlungen nicht selbst ab. Die Unterstützung des Projekts erfolgt über GitHub Sponsors, die offizielle Sponsoring-Plattform von GitHub – der Button unten führt dich zur GitHub-Sponsors-Seite.",
    ctaLabel: "Auf GitHub Sponsors unterstützen",
    ctaAriaLabel: "FindOpenSource auf GitHub Sponsors unterstützen (öffnet in einem neuen Tab)",
  },
};

export default dictionary;
