import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Saltar al contenido",
  adSlotLabel: "Publicidad",
  evidenceBadges: {
    activelyMaintained: "Mantenimiento activo",
    wellDocumented: "Bien documentado",
    permissiveLicense: "Licencia permisiva",
    foundationBacked: "Respaldado por una fundación",
  },
  nav: {
    skills: "Skill Builder",
    setups: "Setups",
    categories: "Categorías",
    contribute: "Contribuir",
    github: "GitHub",
    support: "Apoyar",
  },
  languageSwitcher: {
    label: "Seleccionar idioma",
  },
  footer: {
    tagline: "Los datos de los proyectos los mantiene la comunidad en GitHub.",
    about: "Acerca de",
    contribute: "Contribuir",
    compare: "Comparar",
    analyze: "Analizar repositorio",
    github: "GitHub",
    support: "Apoya FindOpenSource",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
  },
  home: {
    metaTitle: "Constructor de skills para agentes y búsqueda open source",
    introTitleLine1: "Potencia tu agente de IA.",
    introTitleLine2: "Encuentra el open source adecuado.",
    introSubtitle: "FindOpenSource convierte Agent Skills de código abierto en un prompt de instalación listo para pegar, y te ayuda a descubrir, comparar y analizar proyectos open source.",
    stats: {
      skills: "skills para agentes",
      projects: "proyectos open source",
      categories: "categorías",
      languages: "idiomas",
    },
    quickMenu: {
      heading: "Funciones",
      items: {
        skills: { title: "Constructor de skills", body: "Instala skills con un solo prompt" },
        search: { title: "Búsqueda", body: "Encuentra open source por función" },
        categories: { title: "Categorías", body: "Explora 21 categorías" },
        analyze: { title: "Analizar un repo", body: "Mira qué usa tu repo" },
        compare: { title: "Comparar", body: "Dos proyectos lado a lado" },
        contribute: { title: "Contribuir", body: "Sugiere un proyecto" },
      },
    },
    featureSkills: {
      eyebrow: "Constructor de skills para agentes",
      title: "Elige skills. Pega un prompt. Tu agente hace el resto.",
      body: "Explora skills individuales de los mejores paquetes open source, elige el agente que usas y obtén un prompt o un comando de terminal que instala exactamente lo que elegiste.",
      steps: [
        "Elige skills o empieza con un conjunto recomendado",
        "Elige tu agente: Claude Code, Codex, Cursor, Gemini CLI y más",
        "Pega el prompt en tu agente y él mismo las instala",
      ],
      cta: "Crear mi conjunto de skills",
      presetsLabel: "Conjuntos iniciales",
      exampleLabel: "Ejemplo: {preset} → {agent}",
    },
    featureSearchEyebrow: "Búsqueda open source",
    featureAnalyze: {
      eyebrow: "Analizador de repos",
      title: "Mira qué usa ya tu repositorio",
      body: "Introduce un repositorio público de GitHub para ver qué proyectos del catálogo usa y cuáles encajan con su stack.",
      cta: "Analizar un repo",
    },
    featureCompare: {
      eyebrow: "Comparar",
      title: "Pon dos proyectos lado a lado",
      body: "Compara licencia, mantenimiento, madurez y puntuación de calidad antes de decidirte.",
      cta: "Comparar proyectos",
    },
    heroTitleLine1: "Encuentra el open source",
    heroTitleLine2: "adecuado para tu proyecto.",
    heroSubtitle: "Descubre proyectos open source por función, tecnología y categoría.",
    searchPlaceholder: "Busca por función, tecnología o categoría",
    popularSearchesLabel: "Búsquedas populares",
    popularSearches: ["autenticación", "chat", "base de datos", "subida de imágenes", "CMS", "IA"],
    browseCategories: "Explorar categorías",
    popularOpenSource: "Open source popular",
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
    startHeading: "Busca proyectos open source",
    relatedSearchesLabel: "Prueba también con",
    relatedCategoryLabel: "Categoría relacionada",
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
    "ai-agents": {
      name: "Agentes de IA y herramientas para agentes",
      description:
        "Frameworks e infraestructura para crear agentes de IA, ayudarlos a usar herramientas y completar tareas reales.",
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
    filterAll: "Todos",
    filterAiAgents: "Agentes de IA",
    filterAgentTools: "Herramientas para agentes",
  },
  projectsPage: {
    title: "Todos los proyectos",
    descriptionOne: "{count} proyecto open source, seleccionado y mantenido por la comunidad.",
    descriptionOther: "{count} proyectos open source, seleccionados y mantenidos por la comunidad.",
  },
  compare: {
    indexTitle: "Comparar proyectos",
    indexDescription: "Elige dos proyectos open source para comparar su licencia, categorías, lenguajes y señales de catálogo lado a lado.",
    firstProjectLabel: "Primer proyecto",
    secondProjectLabel: "Segundo proyecto",
    projectPlaceholder: "Buscar por nombre…",
    selectPrompt: "Elige dos proyectos para comparar.",
    evidenceLabel: "Evidencia",
    startCompareLabel: "Comparar con otro proyecto",
    allCategoriesOption: "Todas las categorías",
    categoryFilterLabel: "Filtrar por categoría",
    changeSelectionLabel: "Cambiar",
    noMatchesLabel: "Ningún proyecto coincide.",
  },
  skills: {
    pageTitle: "Constructor de skills para agentes",
    pageDescription: "Elige Agent Skills de código abierto y tu agente de programación, y copia un prompt (o un comando de terminal) que instala exactamente esas skills.",
    presetsHeading: "Conjuntos iniciales",
    presets: {
      coding: {
        title: "Programación disciplinada",
        description: "Lluvia de ideas, planificar, tests primero, depurar con método y verificar antes de terminar.",
        benefits: [
          "Acuerda la especificación antes de programar, así hay menos retrabajo",
          "Tests primero y depuración de la causa raíz en vez de parches a ciegas",
          "Debe mostrar la verificación antes de decir que terminó: menos \"ya funciona\" falsos",
        ],
      },
      frontend: {
        title: "Frontend y React",
        description: "Diseño de UI con personalidad, buenas prácticas de React y pruebas en navegador.",
        benefits: [
          "UI con una dirección visual intencionada en lugar de un aspecto de plantilla",
          "Aplica las reglas de rendimiento de React/Next.js de Vercel y patrones de composición escalables",
          "Revisa accesibilidad y UX con las Web Interface Guidelines y prueba la app real con Playwright",
        ],
      },
      lean: {
        title: "Código sin excesos",
        description: "Evita que el agente sobrediseñe: el cambio más simple que funcione, en pasos pequeños.",
        benefits: [
          "El cambio más pequeño que resuelve la tarea, sin abstracciones especulativas",
          "Entrega en porciones finas y verificables en lugar de un diff gigante",
          "Revisa y simplifica el código sin cambiar su comportamiento",
        ],
      },
      ml: {
        title: "ML en Hugging Face",
        description: "Operaciones del Hub, datasets, entrenamiento y evaluación de modelos.",
        benefits: [
          "Gestiona modelos, datasets y Spaces del Hub con la CLI hf",
          "Explora, busca y filtra datasets con la Dataset Viewer API",
          "Ajusta modelos con TRL o Unsloth (SFT, DPO, GRPO) y evalúa en local con inspect-ai y lighteval",
        ],
      },
      shortform: {
        title: "Formato corto y redes",
        description: "Investigación de tendencias, guiones cortos, hooks de anuncios y captions sin rastro de IA.",
        benefits: [
          "Encuentra de qué se habla ahora en Reddit, X, YouTube y TikTok antes de crear nada",
          "Guiones de vídeo corto, carruseles, hilos y calendarios de publicación por plataforma",
          "Hooks y ángulos para anuncios de TikTok y Meta, y qué enfoque de vídeo encaja: avatar IA, generado o Remotion",
          "Quita las señales de IA de captions y guiones para que suenen a ti",
        ],
      },
      growth: {
        title: "Marketing y crecimiento SEO",
        description: "Copywriting, SEO y búsqueda con IA, conversión y lanzamientos.",
        benefits: [
          "Copy y titulares de página con afirmaciones que puedes respaldar",
          "Diagnostica problemas de SEO (indexación, Core Web Vitals) y cómo aparecer citado en ChatGPT y AI Overviews",
          "Encuentra por qué una página no convierte y qué cambiar primero",
          "Planes y checklists de lanzamiento para Product Hunt, betas y listas de espera",
        ],
      },
    },
    listLabel: "Skills disponibles",
    searchLabel: "Buscar skills",
    searchPlaceholder: "Buscar skills (p. ej. debugging, react, pdf)",
    descriptionNote: "Las descripciones están traducidas del SKILL.md de cada skill.",
    noResults: "Ninguna skill coincide con tu búsqueda.",
    skillCount: "{count} skills",
    selectPack: "Seleccionar todo",
    clearPack: "Quitar todo",
    viewPack: "Sobre este paquete",
    viewSource: "Ver {name} en GitHub",
    selectedCount: "{count} seleccionadas",
    clearAll: "Limpiar",
    agentLabel: "Agente",
    otherAgents: "Otros agentes",
    scopeLabel: "Instalar para",
    scopeProject: "Este proyecto",
    scopeGlobal: "Todos los proyectos",
    promptTab: "Prompt para el agente",
    commandTab: "Comando de terminal",
    promptHint: "Pégalo en tu agente; él mismo instala las skills.",
    commandHint: "Ejecútalo en la carpeta de tu proyecto (Node.js 22.20+).",
    emptySelection: "Elige skills a la izquierda o empieza con un conjunto.",
    copy: "Copiar",
    copied: "¡Copiado!",
    jumpToOutput: "Ver prompt para {count} skills",
    presetDetails: "Ver detalles",
    benefitsLabel: "Por qué ayuda",
    includedLabel: "Skills incluidas",
    setups: {
      heading: "Setups de desarrolladores conocidos",
      intro: "Los setups de Claude Code que estas personas usan a diario, publicados como open source. Cada uno se instala completo con su comando oficial.",
      installLabel: "Instalar en Claude Code",
      installHint: "Las líneas que empiezan con / se ejecutan dentro de Claude Code; el resto, en una terminal. Consulta el README para requisitos y otros agentes.",
      items: {
        ecc: {
          credential: "Ganador del hackathon Anthropic x Forum Ventures (sep. 2025)",
          summary: "ECC (Everything Claude Code): un arnés completo de agentes, skills, hooks, reglas y memoria.",
          strengths: [
            "Más de 70 agentes y 300 skills de planificación, revisión, seguridad y más en una sola instalación",
            "Integra el ciclo planificar → probar → implementar → revisar → verificar en cada tarea",
            "AgentShield analiza prompts, hooks, configuración MCP y secretos",
          ],
        },
        gstack: {
          credential: "Presidente y CEO de Y Combinator",
          summary: "gstack: comandos slash que funcionan como un equipo de ingeniería virtual.",
          strengths: [
            "Roles de CEO, diseñador, eng manager, QA, seguridad y release como comandos slash",
            "/review encuentra bugs que pasan la CI pero fallan en producción",
            "/qa abre un navegador real para reproducir y corregir bugs",
          ],
        },
        mattpocock: {
          credential: "Educador de TypeScript, creador de Total TypeScript (ex-Vercel)",
          summary: "Skills for Real Engineers: skills pequeñas y combinables sacadas de su propia carpeta .agents.",
          strengths: [
            "/grill-me hace que el agente te pregunte antes de construir, para entender lo que quieres",
            "/grill-with-docs crea un glosario del proyecto que reduce la verbosidad y los tokens",
            "/tdd y /diagnosing-bugs imponen red-green-refactor y depuración por fases",
          ],
        },
        superpowers: {
          credential: "Creador de Superpowers, Prime Radiant",
          summary: "Superpowers: una metodología de desarrollo completa hecha de skills combinables.",
          strengths: [
            "Pregunta qué quieres construir de verdad y muestra la especificación en partes cortas",
            "Planifica con TDD red/green real, YAGNI y DRY",
            "El desarrollo dirigido por subagentes puede seguir el plan solo durante horas",
          ],
        },
      },
    },
  },
  analyze: {
    pageTitle: "Analizar un repositorio de GitHub",
    pageDescription:
      "Pega un repositorio público de GitHub para ver qué proyectos open source de este catálogo ya usa y cuáles podrían encajar en su stack.",
    inputLabel: "Repositorio de GitHub",
    inputPlaceholder: "github.com/owner/repo",
    submitLabel: "Analizar",
    loading: "Analizando…",
    errorInvalid: "Introduce la URL de un repositorio de GitHub o owner/repo.",
    errorNotFound: "No se encontró el repositorio. Solo se pueden analizar repositorios públicos.",
    errorRateLimited:
      "Se alcanzó el límite de solicitudes de GitHub para tu red. Inténtalo de nuevo en unos minutos.",
    errorGeneric: "No se pudo analizar este repositorio. Inténtalo de nuevo.",
    stackHeading: "Stack detectado",
    languageLabel: "Lenguaje principal",
    frameworksLabel: "Frameworks",
    dependenciesLabel: "{count} dependencias en {files}",
    noManifests:
      "No se encontró ningún archivo de dependencias compatible (package.json, requirements.txt, pyproject.toml, go.mod, Cargo.toml) en la raíz del repositorio.",
    usedHeading: "Ya usa de este catálogo",
    usedEmpty: "No se encontraron proyectos de este catálogo entre las dependencias del repositorio.",
    matchedVia: "mediante {package}",
    recommendHeading: "Podría encajar en este proyecto",
    recommendReason:
      "Se instala como paquete de {ecosystem} · no se detectó ningún proyecto de {category} en este repositorio",
    recommendEmpty: "Sin recomendaciones: este repositorio ya cubre las categorías que revisamos.",
    limitationNote:
      "Solo se leen los archivos de dependencias de la raíz del repositorio, así que en monorepos los resultados pueden ser parciales. Las recomendaciones solo cubren autenticación, testing, monitorización, analítica y búsqueda.",
  },
  projectDetail: {
    overviewHeading: "Descripción general",
    whyHeading: "Por qué está en este catálogo",
    descriptionLabel: "Descripción",
    catalogRatingLabel: "Valoración del catálogo",
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
  productionReadiness: {
    foundational: "Fundacional",
    mature: "Maduro",
    emerging: "Emergente",
    experimental: "Experimental",
  },
  governance: {
    foundation: "Gobernanza de fundación",
    "vendor-backed": "Respaldado por un proveedor",
    community: "Impulsado por la comunidad",
    unknown: "Gobernanza no evaluada",
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
    supportHeading: "Apoyar FindOpenSource",
    supportBody:
      "FindOpenSource es y seguirá siendo gratuito. Si te ayudó a encontrar el proyecto adecuado, puedes apoyar su mantenimiento en ",
    supportCta: "GitHub Sponsors",
    supportBodySuffix: ".",
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
  support: {
    title: "Apoya FindOpenSource",
    metaDescription:
      "Apoya FindOpenSource en GitHub Sponsors y ayuda a financiar la curación continua de proyectos, las mejoras de búsqueda y el contenido multilingüe.",
    intro:
      "FindOpenSource ayuda a los desarrolladores a encontrar proyectos open source por el problema que resuelven, no solo por su nombre. Es un directorio gratuito y mantenido por la comunidad, sin inicio de sesión ni anuncios que estorben.",
    whyHeading: "Por qué ayuda tu apoyo",
    whyIntro: "Tu apoyo se destina al trabajo continuo de mantener FindOpenSource, incluyendo:",
    whyItems: [
      "Mantener los datos de los proyectos precisos y actualizados",
      "Añadir nuevos proyectos open source al catálogo",
      "Mejorar la taxonomía de búsqueda en distintos idiomas",
      "Ampliar y pulir el contenido multilingüe",
      "El mantenimiento general del sitio",
      "Mejoras de rendimiento y SEO",
    ],
    howHeading: "Cómo apoyar",
    howBody:
      "FindOpenSource no procesa pagos directamente. El apoyo al proyecto se realiza a través de GitHub Sponsors, la plataforma oficial de patrocinio de GitHub — el botón de abajo te lleva a la página de GitHub Sponsors.",
    ctaLabel: "Apoyar en GitHub Sponsors",
    ctaAriaLabel: "Apoyar FindOpenSource en GitHub Sponsors (se abre en una pestaña nueva)",
  },
  privacy: {
    title: "Política de privacidad",
    metaDescription: "Cómo gestiona FindOpenSource la información, las cookies, los servicios de terceros y los enlaces externos.",
    lastUpdated: "Última actualización: 13 de noviembre de 2026",
    sections: [
      {
        heading: "Introducción",
        paragraphs: [
          "FindOpenSource (FindOpenSource, nosotros) es un directorio gratuito y mantenido por la comunidad que te ayuda a descubrir proyectos open source según el problema que resuelven. Esta política de privacidad explica qué información interviene al usar este sitio web y cómo se gestiona.",
          "FindOpenSource es en sí mismo un proyecto open source. Todo su código, incluida esta política, está disponible públicamente en GitHub.",
        ],
      },
      {
        heading: "Información que recopilamos",
        paragraphs: [
          "FindOpenSource no requiere cuenta, inicio de sesión ni registro para usar el sitio. Tampoco operamos una base de datos ni un servicio backend: todo el sitio se genera a partir de archivos estáticos.",
          "No te pedimos que envíes información personal como tu nombre, dirección de correo electrónico o datos de pago en ninguna parte del sitio.",
        ],
      },
      {
        heading: "Cómo usamos la información",
        paragraphs: [
          "Dado que FindOpenSource no recopila información personal a través del sitio, no existen datos enviados por usuarios que podamos usar, vender o compartir.",
        ],
      },
      {
        heading: "Consultas de búsqueda e información de uso",
        paragraphs: [
          "Cuando buscas en FindOpenSource, tu consulta se incluye en la URL de la página (por ejemplo, /search?q=database) y se compara en tu navegador con el catálogo de proyectos del sitio. FindOpenSource no guarda tus búsquedas en ninguna base de datos propia. Sin embargo, como la consulta forma parte de la dirección de la página, Google Analytics puede registrarla junto con las demás páginas que visitas (ver más abajo).",
          "Como prácticamente cualquier sitio web, la infraestructura de alojamiento subyacente puede registrar automáticamente información técnica básica de la solicitud (como la dirección IP, el tipo de navegador y la marca de tiempo de la solicitud) con fines de seguridad y operativos. Este es un comportamiento estándar de los servidores web y no algo que el código de la aplicación de FindOpenSource recopile o procese de forma independiente.",
        ],
      },
      {
        heading: "Cookies, publicidad y analítica",
        paragraphs: [
          "FindOpenSource no instala cookies propias. Sí utiliza dos servicios de Google que instalan cookies e identificadores similares en tu navegador: Google Analytics, para saber cuántas personas visitan el sitio y qué páginas usan, y Google AdSense, para mostrar anuncios.",
          "Los proveedores externos, incluido Google, utilizan cookies para mostrar anuncios basados en tus visitas anteriores a este sitio o a otros sitios web. Las cookies de publicidad de Google le permiten a Google y a sus socios mostrarte anuncios basados en tus visitas a este sitio y/o a otros sitios de Internet. Cómo usa Google la información de los sitios que utilizan sus servicios se explica en https://policies.google.com/technologies/partner-sites.",
          "Puedes desactivar la publicidad personalizada en la Configuración de anuncios de Google (https://adssettings.google.com) o desactivar el uso de cookies para publicidad personalizada por parte de algunos proveedores externos en https://www.aboutads.info/choices. Puedes impedir que Google Analytics recopile tus datos con el complemento de navegador de https://tools.google.com/dlpage/gaoptout, o bloquear o eliminar las cookies desde la configuración de tu navegador.",
        ],
      },
      {
        heading: "Servicios de terceros",
        paragraphs: [
          "Este sitio enlaza a servicios de terceros, incluido GitHub (para el código fuente del proyecto, incidencias y pull requests) y GitHub Sponsors (para el enlace de apoyo opcional, cuando está configurado). Estos servicios tienen sus propias políticas de privacidad, y tu interacción con ellos se rige por esas políticas, no por esta.",
          "El sitio está alojado en infraestructura proporcionada por una plataforma de alojamiento externa, que puede procesar datos técnicos estándar de las solicitudes como parte de la entrega del sitio.",
        ],
      },
      {
        heading: "Enlaces externos",
        paragraphs: [
          "Las páginas de proyectos enlazan a recursos externos como repositorios de GitHub, sitios web oficiales de proyectos y documentación. Estos son gestionados por sus respectivos proyectos u organizaciones open source, no por FindOpenSource. No somos responsables del contenido ni de las prácticas de privacidad de los sitios externos, y te recomendamos revisar sus políticas directamente.",
        ],
      },
      {
        heading: "Información de proyectos open source",
        paragraphs: [
          "Los nombres de proyectos, descripciones, enlaces a repositorios y demás detalles que se muestran en FindOpenSource provienen de información disponible públicamente sobre cada proyecto open source, curada por la comunidad mediante pull requests de GitHub. Esta información se refiere a los propios proyectos, no a ti como visitante.",
        ],
      },
      {
        heading: "Retención de datos",
        paragraphs: [
          "Como FindOpenSource no recopila información personal a través del sitio, no tiene un plazo propio de conservación de datos de usuarios que describir. Los datos recopilados mediante las cookies de Google Analytics y AdSense se conservan según las políticas de Google, y los registros técnicos de la infraestructura de alojamiento según las prácticas de ese proveedor, ambos fuera del control de FindOpenSource.",
        ],
      },
      {
        heading: "Seguridad de los datos",
        paragraphs: [
          "FindOpenSource es un sitio estático sin base de datos, sin cuentas de usuario y sin formularios que recopilen datos personales, lo que limita por diseño la exposición de la información de los visitantes.",
        ],
      },
      {
        heading: "Tus derechos de privacidad",
        paragraphs: [
          "Dependiendo de dónde vivas, es posible que tengas derechos en virtud de las leyes de protección de datos aplicables, como el derecho a saber qué información se recopila sobre ti o a solicitar su eliminación. Dado que FindOpenSource no recopila conscientemente información personal a través del sitio, por lo general no existen datos personales registrados para atender ese tipo de solicitud. Si tienes alguna pregunta o inquietud sobre privacidad, puedes contactarnos a través de la página de contacto.",
        ],
      },
      {
        heading: "Usuarios internacionales",
        paragraphs: [
          "FindOpenSource está disponible en inglés, chino simplificado, japonés, coreano, español y alemán, y lo utilizan personas de muchos países. Esta política tiene como objetivo describir nuestras prácticas de forma general; no sustituye el asesoramiento legal sobre tu jurisdicción específica, y FindOpenSource no afirma estar certificado bajo ningún marco de protección de datos en particular.",
        ],
      },
      {
        heading: "Privacidad de menores",
        paragraphs: [
          "FindOpenSource no está dirigido a menores, y no recopilamos conscientemente información personal de menores. Si crees que un menor ha proporcionado información personal a través de este sitio, contáctanos para que podamos atender la situación.",
        ],
      },
      {
        heading: "Cambios en esta política de privacidad",
        paragraphs: [
          "Podemos actualizar esta política a medida que el sitio evoluciona. La fecha de última actualización en la parte superior de esta página refleja la revisión más reciente.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Las preguntas sobre esta política de privacidad pueden enviarse a través de nuestra página de contacto, donde se explica cómo comunicarte con nosotros mediante GitHub.",
        ],
      },
    ],
  },
  terms: {
    title: "Términos de uso",
    metaDescription: "Los términos que se aplican al uso del directorio open source de FindOpenSource.",
    lastUpdated: "Última actualización: 15 de septiembre de 2026",
    sections: [
      {
        heading: "Aceptación de los términos",
        paragraphs: ["Al usar FindOpenSource, aceptas estos Términos de uso. Si no estás de acuerdo, por favor no uses el sitio."],
      },
      {
        heading: "Acerca de FindOpenSource",
        paragraphs: [
          "FindOpenSource es un directorio y herramienta de búsqueda gratuitos, mantenidos por la comunidad, para descubrir proyectos open source según la función o el problema que resuelven. Es un sitio web estático sin cuentas de usuario, sin inicio de sesión y sin base de datos en el backend.",
        ],
      },
      {
        heading: "Directorio e información de proyectos",
        paragraphs: [
          "Las entradas de proyectos en FindOpenSource, incluyendo nombres, descripciones, categorías, palabras clave y enlaces, son curadas por la comunidad y revisadas mediante pull requests de GitHub. Aunque buscamos la precisión, esta información puede estar incompleta, desactualizada o contener errores. Verifica siempre los detalles en el repositorio del propio proyecto y su documentación oficial antes de confiar en ellos.",
        ],
      },
      {
        heading: "Sitios web externos y contenido de terceros",
        paragraphs: [
          "FindOpenSource enlaza a sitios web externos, incluidos repositorios de GitHub, sitios oficiales de proyectos y documentación, que son gestionados de forma independiente por sus respectivos responsables u organizaciones. No controlamos, respaldamos ni asumimos responsabilidad por el contenido, la disponibilidad o las prácticas de ningún sitio externo.",
        ],
      },
      {
        heading: "Licencias open source",
        paragraphs: [
          "FindOpenSource no posee, licencia ni otorga ningún derecho sobre los proyectos open source listados en el directorio. Cada proyecto es propiedad y está licenciado por sus respectivos autores u organizaciones bajo la licencia que se muestra en su entrada. Antes de usar cualquier proyecto listado, revisa su licencia real y su repositorio oficial para confirmar los términos que se aplican.",
        ],
      },
      {
        heading: "Exactitud y disponibilidad",
        paragraphs: [
          "FindOpenSource se ofrece tal cual y según disponibilidad. No garantizamos que el sitio, ni la información de proyectos que contiene, sea completa, exacta, ininterrumpida o esté libre de errores.",
        ],
      },
      {
        heading: "Contribuciones de los usuarios",
        paragraphs: [
          "Cualquier persona puede proponer adiciones o correcciones al catálogo de proyectos abriendo un pull request o una incidencia en GitHub, tal como se describe en la página de Contribuir. Las contribuciones son revisadas por los mantenedores antes de fusionarse, y no garantizamos que una contribución concreta sea aceptada, ni que lo sea en un plazo determinado.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "El código y el sitio web de FindOpenSource son open source bajo la licencia MIT, disponible en GitHub. Los nombres de proyectos, logotipos, marcas y software mencionados en el directorio pertenecen a sus respectivos propietarios y se usan únicamente con fines de identificación; que un proyecto esté listado no implica respaldo ni afiliación por parte de sus propietarios.",
        ],
      },
      {
        heading: "Uso prohibido",
        paragraphs: [
          "Aceptas no hacer un uso indebido de FindOpenSource, por ejemplo intentando interrumpir el sitio, extrayendo datos de forma que degrade el servicio para otros usuarios, o utilizándolo para distribuir contenido ilegal o dañino.",
        ],
      },
      {
        heading: "Renuncia de garantías",
        paragraphs: [
          "FindOpenSource no ofrece garantías, expresas ni implícitas, sobre el sitio ni sobre los proyectos open source a los que enlaza, incluyendo cualquier garantía de comerciabilidad, idoneidad para un propósito particular o no infracción.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        paragraphs: [
          "En la medida máxima permitida por la ley, FindOpenSource y sus colaboradores no serán responsables de ningún daño derivado del uso del sitio o de la confianza depositada en la información que contiene, incluidos los problemas relacionados con cualquier proyecto o sitio web de terceros al que enlace.",
        ],
      },
      {
        heading: "Cambios en estos términos",
        paragraphs: [
          "Podemos actualizar estos Términos de uso a medida que el sitio evoluciona. La fecha de última actualización en la parte superior de esta página refleja la revisión más reciente. El uso continuado del sitio después de que los cambios entren en vigor implica la aceptación de los términos actualizados.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: ["Las preguntas sobre estos Términos de uso pueden enviarse a través de nuestra página de contacto."],
      },
    ],
  },
  contact: {
    title: "Contacto",
    metaDescription: "Cómo ponerte en contacto con FindOpenSource para correcciones, cuestiones de licencia o comentarios generales.",
    intro:
      "FindOpenSource es un proyecto mantenido por la comunidad, sin un equipo de soporte dedicado, pero queremos saber de ti. La mejor forma de contactarnos es a través de GitHub.",
    reasonsHeading: "Buenas razones para escribirnos",
    reasons: [
      "La información de un proyecto está desactualizada, es incorrecta o falta",
      "Un enlace está roto",
      "Una inquietud sobre licencia o propiedad de un proyecto listado",
      "Una solicitud para actualizar o eliminar una entrada de proyecto",
      "Una pregunta sobre cómo contribuir al directorio",
      "Una pregunta sobre privacidad",
      "Comentarios generales sobre el sitio",
    ],
    howHeading: "Cómo contactarnos",
    howBody: "La forma más rápida de contactar con FindOpenSource es abrir una incidencia en GitHub. Llega directamente a las personas que mantienen el proyecto.",
    ctaLabel: "Abrir una incidencia en GitHub",
  },
};

export default dictionary;
