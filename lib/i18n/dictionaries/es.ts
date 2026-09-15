import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "Saltar al contenido",
  adSlotLabel: "Publicidad",
  nav: {
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
    github: "GitHub",
    support: "Apoya FindOpenSource",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
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
    supportHeading: "¿Te ha resultado útil FindOpenSource?",
    supportBody: "Apoya el proyecto en GitHub Sponsors y ayúdanos a seguir mejorando el descubrimiento de open source.",
    supportCta: "Apoyar FindOpenSource",
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
    overviewHeading: "Descripción general",
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
    lastUpdated: "Última actualización: 15 de septiembre de 2026",
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
          "Cuando buscas en FindOpenSource, tu consulta se pasa como parámetro de URL (por ejemplo, /search?q=database) y se compara con el catálogo local de proyectos del sitio en el momento en que se genera la página. FindOpenSource no registra, almacena ni analiza tus consultas de búsqueda en ninguna base de datos.",
          "Como prácticamente cualquier sitio web, la infraestructura de alojamiento subyacente puede registrar automáticamente información técnica básica de la solicitud (como la dirección IP, el tipo de navegador y la marca de tiempo de la solicitud) con fines de seguridad y operativos. Este es un comportamiento estándar de los servidores web y no algo que el código de la aplicación de FindOpenSource recopile o procese de forma independiente.",
        ],
      },
      {
        heading: "Cookies y tecnologías similares",
        paragraphs: [
          "Actualmente, FindOpenSource no establece sus propias cookies ni utiliza localStorage o sessionStorage para rastrear o identificar a los visitantes.",
          "Si esto cambia en el futuro, por ejemplo si se introduce publicidad, esta sección se actualizará para describir exactamente qué se utiliza y por qué.",
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
          "Como FindOpenSource no recopila información personal a través del sitio, no existe un calendario de retención de datos de usuario que describir. Los registros técnicos generados por la infraestructura de alojamiento se conservan según las prácticas propias de ese proveedor, fuera del control de FindOpenSource.",
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
          "Podemos actualizar esta política a medida que el sitio evoluciona. FindOpenSource podría utilizar servicios publicitarios como Google AdSense en el futuro. Si se introduce publicidad, esta política se actualizará antes de su activación para describir las cookies, identificadores, tratamiento de datos y opciones del usuario correspondientes. La fecha de última actualización en la parte superior de esta página refleja la revisión más reciente.",
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
