import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Zum Inhalt springen",
  adSlotLabel: "Werbung",
  evidenceBadges: {
    activelyMaintained: "Aktiv gepflegt",
    wellDocumented: "Gut dokumentiert",
    permissiveLicense: "Permissive Lizenz",
    foundationBacked: "Von einer Foundation unterstützt",
  },
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
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt",
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
  privacy: {
    title: "Datenschutzerklärung",
    metaDescription: "Wie FindOpenSource mit Informationen, Cookies, Diensten Dritter und externen Links umgeht.",
    lastUpdated: "Zuletzt aktualisiert: 15. September 2026",
    sections: [
      {
        heading: "Einleitung",
        paragraphs: [
          "FindOpenSource (FindOpenSource, wir) ist ein kostenloses, von der Community gepflegtes Verzeichnis, das dir hilft, Open-Source-Projekte anhand des Problems zu finden, das sie lösen. Diese Datenschutzerklärung erläutert, welche Informationen bei der Nutzung dieser Website eine Rolle spielen und wie damit umgegangen wird.",
          "FindOpenSource ist selbst ein Open-Source-Projekt. Der gesamte Code, einschließlich dieser Erklärung, ist öffentlich auf GitHub verfügbar.",
        ],
      },
      {
        heading: "Informationen, die wir erheben",
        paragraphs: [
          "Für die Nutzung von FindOpenSource ist kein Konto, kein Login und keine Registrierung erforderlich. Wir betreiben auch keine Datenbank oder einen Backend-Dienst — die gesamte Website besteht aus statischen Dateien.",
          "Wir bitten dich an keiner Stelle der Website darum, personenbezogene Daten wie Namen, E-Mail-Adressen oder Zahlungsinformationen anzugeben.",
        ],
      },
      {
        heading: "Wie wir Informationen verwenden",
        paragraphs: [
          "Da FindOpenSource über die Website selbst keine personenbezogenen Daten erhebt, gibt es keine von Nutzern übermittelten Daten, die wir verwenden, verkaufen oder weitergeben könnten.",
        ],
      },
      {
        heading: "Suchanfragen und Nutzungsinformationen",
        paragraphs: [
          "Wenn du auf FindOpenSource suchst, wird deine Suchanfrage als URL-Parameter übergeben (zum Beispiel /search?q=database) und beim Rendern der Seite mit dem lokalen Projektkatalog der Website abgeglichen. FindOpenSource protokolliert, speichert oder analysiert deine Suchanfragen nicht in einer Datenbank.",
          "Wie praktisch jede Website kann die zugrunde liegende Hosting-Infrastruktur automatisch grundlegende technische Anfrageinformationen (wie IP-Adresse, Browsertyp und Zeitstempel der Anfrage) aus Sicherheits- und Betriebsgründen erfassen. Dies ist ein Standardverhalten von Webservern und wird nicht separat vom Anwendungscode von FindOpenSource erhoben oder verarbeitet.",
        ],
      },
      {
        heading: "Cookies und ähnliche Technologien",
        paragraphs: [
          "FindOpenSource setzt derzeit keine eigenen Cookies und verwendet weder localStorage noch sessionStorage, um Besucher zu verfolgen oder zu identifizieren.",
          "Sollte sich dies in Zukunft ändern — etwa durch die Einführung von Werbung —, wird dieser Abschnitt aktualisiert, um genau zu beschreiben, was verwendet wird und warum.",
        ],
      },
      {
        heading: "Dienste Dritter",
        paragraphs: [
          "Diese Website verlinkt auf Dienste Dritter, darunter GitHub (für den Quellcode des Projekts, Issues und Pull Requests) und GitHub Sponsors (für den optionalen Support-Link, sofern konfiguriert). Diese Dienste haben eigene Datenschutzerklärungen, und deine Interaktionen mit ihnen unterliegen deren Richtlinien, nicht dieser hier.",
          "Die Website wird auf der Infrastruktur eines Drittanbieters für Hosting betrieben, der im Rahmen der Bereitstellung der Website standardmäßige technische Anfragedaten verarbeiten kann.",
        ],
      },
      {
        heading: "Externe Links",
        paragraphs: [
          "Projektseiten verlinken auf externe Ressourcen wie GitHub-Repositories, offizielle Projektwebsites und Dokumentationen. Diese werden von den jeweiligen Open-Source-Projekten oder Organisationen betrieben, nicht von FindOpenSource. Wir sind nicht verantwortlich für die Inhalte oder Datenschutzpraktiken externer Websites und empfehlen dir, deren Richtlinien direkt zu prüfen.",
        ],
      },
      {
        heading: "Informationen zu Open-Source-Projekten",
        paragraphs: [
          "Die auf FindOpenSource angezeigten Projektnamen, Beschreibungen, Repository-Links und weiteren Details stammen aus öffentlich verfügbaren Informationen über das jeweilige Open-Source-Projekt und werden von der Community über GitHub Pull Requests gepflegt. Diese Informationen betreffen die Projekte selbst, nicht dich als Besucher.",
        ],
      },
      {
        heading: "Datenspeicherung",
        paragraphs: [
          "Da FindOpenSource über die Website keine personenbezogenen Daten erhebt, gibt es keinen Aufbewahrungszeitraum für Nutzerdaten zu beschreiben. Technische Protokolle, die von der Hosting-Infrastruktur erzeugt werden, werden gemäß den eigenen Praktiken des jeweiligen Anbieters aufbewahrt, außerhalb der Kontrolle von FindOpenSource.",
        ],
      },
      {
        heading: "Datensicherheit",
        paragraphs: [
          "FindOpenSource ist eine statische Website ohne Datenbank, ohne Nutzerkonten und ohne Formulare, die personenbezogene Daten erfassen — dieses Design begrenzt von vornherein, welche Besucherinformationen überhaupt offengelegt werden könnten.",
        ],
      },
      {
        heading: "Deine Datenschutzrechte",
        paragraphs: [
          "Je nachdem, wo du lebst, kannst du nach geltendem Datenschutzrecht Rechte haben, etwa das Recht zu erfahren, welche Informationen über dich erhoben werden, oder deren Löschung zu verlangen. Da FindOpenSource über die Website selbst wissentlich keine personenbezogenen Daten erhebt, liegen für eine solche Anfrage in der Regel keine personenbezogenen Daten vor. Bei Fragen oder Bedenken zum Datenschutz kannst du uns über die Kontaktseite erreichen.",
        ],
      },
      {
        heading: "Internationale Nutzer",
        paragraphs: [
          "FindOpenSource ist auf Englisch, vereinfachtem Chinesisch, Japanisch, Koreanisch, Spanisch und Deutsch verfügbar und wird von Nutzern aus vielen Ländern besucht. Diese Erklärung beschreibt unsere Praktiken allgemein; sie ersetzt keine Rechtsberatung zu deiner spezifischen Rechtsordnung, und FindOpenSource behauptet keine Zertifizierung nach einem bestimmten Datenschutzrahmen.",
        ],
      },
      {
        heading: "Datenschutz von Kindern",
        paragraphs: [
          "FindOpenSource richtet sich nicht an Kinder, und wir erheben wissentlich keine personenbezogenen Daten von Kindern. Solltest du glauben, dass ein Kind über diese Website personenbezogene Daten übermittelt hat, kontaktiere uns bitte, damit wir dies klären können.",
        ],
      },
      {
        heading: "Änderungen dieser Datenschutzerklärung",
        paragraphs: [
          "Wir können diese Erklärung im Zuge der Weiterentwicklung der Website aktualisieren. FindOpenSource könnte künftig Werbedienste wie Google AdSense nutzen. Sollte Werbung eingeführt werden, wird diese Erklärung vor dem Start aktualisiert, um die relevanten Cookies, Kennungen, Datenverarbeitungen und Wahlmöglichkeiten der Nutzer zu beschreiben. Das Datum „Zuletzt aktualisiert“ oben auf dieser Seite gibt die letzte Überarbeitung an.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [
          "Fragen zu dieser Datenschutzerklärung kannst du über unsere Kontaktseite senden, die erklärt, wie du uns über GitHub erreichen kannst.",
        ],
      },
    ],
  },
  terms: {
    title: "Nutzungsbedingungen",
    metaDescription: "Die Bedingungen, die für die Nutzung des Open-Source-Verzeichnisses von FindOpenSource gelten.",
    lastUpdated: "Zuletzt aktualisiert: 15. September 2026",
    sections: [
      {
        heading: "Annahme der Bedingungen",
        paragraphs: ["Durch die Nutzung von FindOpenSource stimmst du diesen Nutzungsbedingungen zu. Wenn du nicht einverstanden bist, nutze die Website bitte nicht."],
      },
      {
        heading: "Über FindOpenSource",
        paragraphs: [
          "FindOpenSource ist ein kostenloses, von der Community gepflegtes Verzeichnis und Suchwerkzeug, um Open-Source-Projekte anhand der Funktion oder des Problems zu finden, das sie lösen. Es handelt sich um eine statische Website ohne Nutzerkonten, ohne Login und ohne Backend-Datenbank.",
        ],
      },
      {
        heading: "Verzeichnis- und Projektinformationen",
        paragraphs: [
          "Projekteinträge auf FindOpenSource — einschließlich Namen, Beschreibungen, Kategorien, Schlagwörtern und Links — werden von der Community gepflegt und über GitHub Pull Requests geprüft. Wir bemühen uns um Genauigkeit, dennoch können diese Informationen unvollständig, veraltet sein oder Fehler enthalten. Überprüfe Details stets im Repository des jeweiligen Projekts und in dessen offizieller Dokumentation, bevor du dich darauf verlässt.",
        ],
      },
      {
        heading: "Externe Websites und Inhalte Dritter",
        paragraphs: [
          "FindOpenSource verlinkt auf externe Websites, darunter GitHub-Repositories, offizielle Projektseiten und Dokumentationen, die unabhängig von den jeweiligen Maintainern oder Organisationen betrieben werden. Wir kontrollieren, befürworten oder verantworten weder Inhalt, Verfügbarkeit noch Praktiken externer Websites.",
        ],
      },
      {
        heading: "Open-Source-Lizenzen",
        paragraphs: [
          "FindOpenSource besitzt, lizenziert oder gewährt keinerlei Rechte an den im Verzeichnis aufgeführten Open-Source-Projekten. Jedes Projekt gehört den jeweiligen Autoren oder Organisationen und ist unter der auf seinem Eintrag angezeigten Lizenz lizenziert. Prüfe vor der Nutzung eines gelisteten Projekts dessen tatsächliche Lizenz und offizielles Repository, um die geltenden Bedingungen zu bestätigen.",
        ],
      },
      {
        heading: "Genauigkeit und Verfügbarkeit",
        paragraphs: [
          "FindOpenSource wird ohne jegliche Gewähr (wie besehen und nach Verfügbarkeit) bereitgestellt. Wir garantieren nicht, dass die Website oder darin enthaltene Projektinformationen vollständig, korrekt, unterbrechungsfrei oder fehlerfrei sind.",
        ],
      },
      {
        heading: "Beiträge von Nutzern",
        paragraphs: [
          "Jeder kann Ergänzungen oder Korrekturen zum Projektkatalog vorschlagen, indem er auf GitHub einen Pull Request oder ein Issue eröffnet, wie auf der Mitmachen-Seite beschrieben. Beiträge werden vor dem Merge von Maintainern geprüft, und wir garantieren nicht, dass ein bestimmter Beitrag angenommen wird oder innerhalb eines bestimmten Zeitraums angenommen wird.",
        ],
      },
      {
        heading: "Geistiges Eigentum",
        paragraphs: [
          "Der Code und die Website von FindOpenSource sind unter der MIT-Lizenz quelloffen und auf GitHub verfügbar. Im Verzeichnis genannte Projektnamen, Logos, Marken und Software gehören ihren jeweiligen Eigentümern und werden ausschließlich zu Identifikationszwecken verwendet; die Aufnahme eines Projekts impliziert keine Empfehlung durch oder Verbindung zu dessen Eigentümern.",
        ],
      },
      {
        heading: "Verbotene Nutzung",
        paragraphs: [
          "Du verpflichtest dich, FindOpenSource nicht zu missbrauchen — zum Beispiel durch den Versuch, die Website zu stören, sie auf eine Weise auszulesen, die den Dienst für andere beeinträchtigt, oder sie zur Verbreitung rechtswidriger oder schädlicher Inhalte zu nutzen.",
        ],
      },
      {
        heading: "Haftungsausschluss",
        paragraphs: [
          "FindOpenSource gibt keine ausdrücklichen oder stillschweigenden Zusicherungen über die Website oder die verlinkten Open-Source-Projekte ab, einschließlich jeglicher Zusicherung der Marktgängigkeit, Eignung für einen bestimmten Zweck oder Nichtverletzung von Rechten.",
        ],
      },
      {
        heading: "Haftungsbeschränkung",
        paragraphs: [
          "Im gesetzlich zulässigen Umfang haften FindOpenSource und seine Mitwirkenden nicht für Schäden, die aus der Nutzung der Website oder dem Vertrauen auf darauf gefundene Informationen entstehen, einschließlich Problemen mit verlinkten Projekten oder Websites Dritter.",
        ],
      },
      {
        heading: "Änderungen dieser Bedingungen",
        paragraphs: [
          "Wir können diese Nutzungsbedingungen im Zuge der Weiterentwicklung der Website aktualisieren. Das Datum „Zuletzt aktualisiert“ oben auf dieser Seite gibt die letzte Überarbeitung an. Die fortgesetzte Nutzung der Website nach Inkrafttreten von Änderungen gilt als Zustimmung zu den aktualisierten Bedingungen.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: ["Fragen zu diesen Nutzungsbedingungen kannst du über unsere Kontaktseite senden."],
      },
    ],
  },
  contact: {
    title: "Kontakt",
    metaDescription: "So erreichst du FindOpenSource bei Korrekturen, Lizenzfragen oder allgemeinem Feedback.",
    intro:
      "FindOpenSource ist ein von der Community gepflegtes Projekt ohne eigenes Support-Team, aber wir freuen uns, von dir zu hören. Der beste Weg, uns zu erreichen, ist über GitHub.",
    reasonsHeading: "Gute Gründe, uns zu kontaktieren",
    reasons: [
      "Die Informationen zu einem Projekt sind veraltet, falsch oder fehlen",
      "Ein Link ist defekt",
      "Bedenken zu Lizenz oder Eigentümerschaft eines gelisteten Projekts",
      "Eine Bitte, einen Projekteintrag zu aktualisieren oder zu entfernen",
      "Eine Frage zum Mitmachen im Verzeichnis",
      "Eine Frage zum Datenschutz",
      "Allgemeines Feedback zur Website",
    ],
    howHeading: "So erreichst du uns",
    howBody: "Der schnellste Weg, FindOpenSource zu erreichen, ist ein Issue auf GitHub zu eröffnen. Es geht direkt an die Personen, die das Projekt pflegen.",
    ctaLabel: "Issue auf GitHub eröffnen",
  },
};

export default dictionary;
