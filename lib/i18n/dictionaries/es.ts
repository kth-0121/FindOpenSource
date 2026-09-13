import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Saltar al contenido",
  adSlotLabel: "Publicidad",
  nav: {
    categories: "Categorías",
    contribute: "Contribuir",
    github: "GitHub",
  },
  languageSwitcher: {
    label: "Seleccionar idioma",
  },
  footer: {
    tagline: "Los datos de los proyectos los mantiene la comunidad en GitHub.",
    about: "Acerca de",
    contribute: "Contribuir",
    github: "GitHub",
  },
  home: {
    heroTitleLine1: "Encuentra el open source",
    heroTitleLine2: "adecuado para tu proyecto.",
    heroSubtitle: "Descubre proyectos open source por función, tecnología y categoría.",
    searchPlaceholder: "Busca por función, tecnología o categoría",
    popularSearchesLabel: "Búsquedas populares",
    popularSearches: ["autenticación", "chat", "base de datos", "subida de imágenes", "CMS", "IA"],
    browseCategories: "Explorar categorías",
    viewAll: "Ver todas",
    popularOpenSource: "Open source popular",
    recentlyAdded: "Añadidos recientemente",
  },
  search: {
    inputLabel: "Buscar proyectos open source",
    submitLabel: "Buscar",
    resultsCountOne: '{count} proyecto encontrado para "{query}"',
    resultsCountOther: '{count} proyectos encontrados para "{query}"',
    noResultsTitle: 'No se encontraron proyectos para "{query}".',
    noResultsSuggestion: "Prueba a buscar alguno de estos términos:",
    pageTitle: "Buscar",
    pageDescription: "Busca proyectos open source por función, tecnología o categoría.",
  },
  categories: {
    ai: {
      name: "IA y Machine Learning",
      description: "Frameworks de machine learning, modelos de lenguaje e infraestructura de IA de código abierto.",
    },
    authentication: {
      name: "Autenticación y seguridad",
      description: "Herramientas de código abierto para autenticación, identidad y seguridad.",
    },
    backend: {
      name: "Backend",
      description: "Plataformas backend y herramientas BaaS para construir aplicaciones.",
    },
    database: {
      name: "Base de datos",
      description: "Bases de datos relacionales, documentales, vectoriales y en memoria.",
    },
    api: {
      name: "API",
      description: "Herramientas para crear, exponer y gestionar APIs.",
    },
    cms: {
      name: "CMS",
      description: "Sistemas de gestión de contenido headless y tradicionales.",
    },
    chat: {
      name: "Chat y mensajería",
      description: "Plataformas de chat en equipo, mensajería y comunicación en tiempo real.",
    },
    "developer-tools": {
      name: "Herramientas para desarrolladores",
      description: "Herramientas que ayudan a construir, probar y publicar software.",
    },
    ui: {
      name: "UI y componentes",
      description: "Librerías de componentes y sistemas de diseño para construir interfaces.",
    },
    analytics: {
      name: "Analítica",
      description: "Plataformas de analítica web y de producto.",
    },
    storage: {
      name: "Almacenamiento",
      description: "Almacenamiento de objetos, sincronización de archivos y sistemas autoalojados.",
    },
    automation: {
      name: "Automatización",
      description: "Automatización de flujos de trabajo y herramientas no-code/low-code.",
    },
    devops: {
      name: "DevOps",
      description: "Infraestructura, orquestación y herramientas de despliegue.",
    },
    search: {
      name: "Búsqueda",
      description: "Infraestructura de búsqueda de texto completo y motores de búsqueda.",
    },
    monitoring: {
      name: "Monitorización",
      description: "Herramientas de observabilidad, métricas, logs y seguimiento de errores.",
    },
    ecommerce: {
      name: "Comercio electrónico",
      description: "Plataformas de comercio y tiendas online de código abierto.",
    },
    payments: {
      name: "Pagos",
      description: "Infraestructura de código abierto para procesamiento de pagos y facturación.",
    },
    media: {
      name: "Medios",
      description: "Servidores de medios, streaming y herramientas de procesamiento de documentos y medios.",
    },
    testing: {
      name: "Testing",
      description: "Frameworks de testing y herramientas de automatización de navegador.",
    },
    mobile: {
      name: "Móvil",
      description: "Frameworks para construir aplicaciones móviles multiplataforma.",
    },
  },
  categoriesPage: {
    title: "Categorías",
    description: "Explora proyectos open source agrupados por la función o tecnología que ofrecen.",
  },
  categoryDetail: {
    backLink: "Todas las categorías",
    emptyMessage: "Todavía no hay proyectos en esta categoría.",
    addOneLink: "Añadir uno",
  },
  projectsPage: {
    title: "Todos los proyectos",
    descriptionOne: "{count} proyecto open source, seleccionado y mantenido por la comunidad.",
    descriptionOther: "{count} proyectos open source, seleccionados y mantenidos por la comunidad.",
  },
  projectDetail: {
    githubButton: "GitHub",
    websiteButton: "Sitio web",
    documentationButton: "Documentación",
    categoriesLabel: "Categorías",
    keywordsLabel: "Palabras clave",
    languagesLabel: "Lenguajes",
    licenseLabel: "Licencia",
    relatedProjects: "Proyectos relacionados",
    spottedError: "¿Encontraste un error? ",
    suggestEditLink: "Sugiere una edición en GitHub",
    suggestEditSuffix: ".",
  },
  about: {
    title: "Acerca de FindOpenSource",
    intro:
      "La mayoría de los directorios de open source dan por hecho que ya conoces el nombre del proyecto que buscas. FindOpenSource parte de una pregunta distinta:",
    questionQuote: "¿Qué proyecto open source puedo usar para construir esta función?",
    paragraph2:
      "Busca por lo que quieres construir — autenticación, una función de chat, un CMS, una base de datos vectorial — y obtén una lista seleccionada de proyectos open source que resuelven ese problema, con información suficiente para evaluarlos y compararlos rápidamente.",
    howItWorksHeading: "Cómo funciona",
    howItWorksBody:
      "FindOpenSource es un directorio open source completamente estático. No hay inicio de sesión, ni base de datos, ni un servicio backend propio: cada proyecto es un simple archivo JSON revisado y fusionado mediante pull requests de GitHub. Esto mantiene el proyecto simple, transparente y fácil de contribuir.",
    contributingHeading: "Contribuir",
    contributingBody: "Cualquiera puede añadir un proyecto abriendo un pull request. ",
    contributingLinkText: "Consulta la guía de contribución",
    contributingLinkSuffix: " para empezar.",
  },
  contribute: {
    title: "Contribuye con un proyecto",
    intro:
      "FindOpenSource lo mantiene la comunidad. Cualquiera puede añadir un nuevo proyecto open source mediante un pull request de GitHub — no se necesita más experiencia de programación que editar un archivo JSON.",
    steps: [
      {
        title: "Haz un fork del repositorio",
        description: "Haz un fork de FindOpenSource en GitHub y clónalo en tu equipo.",
      },
      {
        title: "Añade un archivo de proyecto",
        description: "Crea un nuevo archivo JSON en data/projects/ con el nombre del slug de tu proyecto.",
      },
      {
        title: "Completa los datos",
        description:
          "Añade el nombre del proyecto, la descripción, el repositorio de GitHub, las categorías, las palabras clave y la licencia.",
      },
      {
        title: "Valida",
        description: "Ejecuta npm run validate en local para asegurarte de que el archivo pasa todas las comprobaciones.",
      },
      {
        title: "Abre un pull request",
        description: "Envía un pull request. GitHub Actions lo validará automáticamente.",
      },
    ],
    readContributing: "Leer CONTRIBUTING.md",
    suggestViaIssue: "Sugerir un proyecto mediante un Issue",
    preferNotToEdit: "¿Prefieres no editar código? Abre un ",
    issueLinkText: "issue",
    preferNotToEditSuffix: " y alguien te ayudará a añadirlo.",
  },
  notFound: {
    title: "Página no encontrada",
    description: "La página que buscas no existe o puede haberse movido.",
    backHome: "Volver al inicio",
  },
};

export default dictionary;
