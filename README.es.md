# FindOpenSource

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Español** · [Deutsch](README.de.md)

Descubre proyectos open source por funcionalidad, tecnología y categoría — en inglés, chino
simplificado, japonés, coreano, español y alemán.

**[findoss.dev](https://findoss.dev)**

## ¿Qué es FindOpenSource?

La mayoría de los directorios de open source asumen que ya sabes qué proyecto estás buscando.
FindOpenSource parte de una pregunta distinta:

> **"¿Qué proyecto open source puedo usar para construir esta funcionalidad?"**

Busca "autenticación", "chat", "CMS", "base de datos vectorial" o "web scraping" y obtén una
lista curada de proyectos open source que resuelven ese problema — con la información necesaria
(licencia, lenguaje, enlaces) para evaluarlos rápidamente.

FindOpenSource es un directorio totalmente estático, mantenido por la comunidad. No hay login,
ni base de datos, ni servicio backend. Cada proyecto es un simple archivo JSON, revisado y
fusionado a través de pull requests en GitHub.

## Funcionalidades

- **Búsqueda orientada a funcionalidades** — busca por lo que quieres construir, no solo por
  el nombre de un proyecto.
- **Resultados ordenados por relevancia** — las coincidencias de nombre, palabras clave,
  categoría, lenguaje y descripción se ponderan y ordenan, con soporte para consultas de
  varias palabras.
- **Búsqueda multilingüe** — busca en cualquiera de los 6 idiomas soportados; consultas
  coloquiales como "로그인" o "ログイン" se expanden internamente a las palabras clave
  canónicas en inglés.
- **URLs de búsqueda compartibles** — cada búsqueda es una URL real
  (`/es/search?q=authentication`).
- **Navegación por categorías** — 20 categorías curadas, desde IA hasta DevOps.
- **Estático y rápido** — construido con el App Router de Next.js; cada página localizada de
  proyecto y categoría se genera de forma estática en tiempo de build.
- **Optimizado para SEO** — metadatos por locale, OpenGraph, enlaces alternativos hreflang,
  JSON-LD, sitemap y URLs canónicas en cada página.

## Idiomas

| Locale  | Language           |
| ------- | ------------------ |
| `en`    | English (por defecto) |
| `zh-CN` | Simplified Chinese |
| `ja`    | Japanese           |
| `ko`    | Korean             |
| `es`    | Spanish            |
| `de`    | German             |

Cada ruta lleva el prefijo del locale:

```text
/en
/en/projects/supabase
/en/categories/authentication
/en/search?q=authentication

/es
/es/projects/supabase
/es/categories/authentication
/es/search?q=autenticación
```

Visitar una URL sin prefijo (por ejemplo, `/projects/supabase`, o simplemente `/`) redirige
(308) a la misma ruta bajo `/en`, el locale por defecto — no hay redirección automática según
el idioma del navegador, así que el rastreo y el compartir enlaces siempre son predecibles.
Un selector de idioma compacto en la cabecera permite a los visitantes cambiar de locale
conservando la página actual y la consulta de búsqueda.

## Búsqueda

La búsqueda compara los campos `name`, `keywords`, `categories`, `languages` y `description`
del proyecto, cada uno con un peso distinto (las coincidencias de nombre y palabra clave son
las que más puntúan). Las consultas de varias palabras como `image upload` se tokenizan y
puntúan de forma independiente, y los proyectos que coinciden con *todos* los tokens reciben
un bonus de cobertura — así, `vector database` sigue posicionando a Milvus y Qdrant por
encima de bases de datos genéricas. Consulta la implementación del scoring en
[`lib/search.ts`](lib/search.ts).

Además, una capa de expansión de consultas (ver [Palabras clave multilingües](#palabras-clave-multilingües)
más abajo) traduce consultas coloquiales o en otros idiomas a las mismas palabras clave
canónicas, con un peso menor que una coincidencia directa — así los sinónimos solo *ayudan*
a los resultados, sin superar nunca a una coincidencia exacta.

## Categorías

IA y Machine Learning · Autenticación y Seguridad · Backend · Base de datos · API · CMS ·
Chat y Mensajería · Herramientas de desarrollo · UI y Componentes · Analítica · Almacenamiento ·
Automatización · DevOps · Búsqueda · Monitorización · E-commerce · Pagos · Media · Testing ·
Móvil

Los **slugs** de categoría son estables y nunca se traducen (`/es/categories/authentication`,
no `/es/categories/autenticación`) — solo se localizan el nombre y la descripción mostrados.
Consulta [`data/categories.json`](data/categories.json) para la lista canónica (en inglés) y
[`lib/i18n/dictionaries/`](lib/i18n/dictionaries/) para los nombres/descripciones traducidos.

## Traducciones

- El **texto de la interfaz** (navegación, botones, títulos, estados vacíos, las páginas
  About/Contribute, ...) vive en [`lib/i18n/dictionaries/`](lib/i18n/dictionaries/), un
  archivo por locale, todos implementando la misma interfaz TypeScript
  [`Dictionary`](lib/i18n/types.ts) — así que una clave faltante en cualquier idioma es un
  error en tiempo de compilación, no una cadena vacía en runtime.
- Los **datos de proyecto** se mantienen en un único archivo JSON canónico (en inglés) por
  proyecto. Un proyecto puede añadir opcionalmente un objeto `translations` con
  `description`/`keywords` traducidos por locale; el inglés es siempre el fallback cuando
  falta una traducción. Consulta
  [CONTRIBUTING.md](CONTRIBUTING.md#adding-translated-descriptions-optional).
- Los **nombres/descripciones de categoría** están completamente traducidos en cada archivo
  de diccionario (las categorías son una taxonomía pequeña y curada por los mantenedores, a
  diferencia de la lista abierta de proyectos).

### Palabras clave multilingües

[`lib/i18n/keyword-taxonomy.ts`](lib/i18n/keyword-taxonomy.ts) mapea sinónimos en lenguaje
natural por locale (p. ej. `authentication` ← `login`, `로그인`, `ログイン`,
`inicio de sesión`, `anmeldung`, ...) a las palabras clave canónicas realmente usadas en
`data/projects/*.json`, junto con una lista de términos relacionados a potenciar (`oauth`,
`sso`, `jwt`, ...). `lib/search.ts` expande la consulta del usuario contra esta taxonomía
antes de puntuar. Para añadir una nueva intención, basta con añadir una entrada (o un nuevo
locale a una existente) — no hace falta tocar el algoritmo de búsqueda en sí.

### Añadir un nuevo idioma

1. Añade el locale a `locales` en [`lib/i18n/config.ts`](lib/i18n/config.ts) (nombre, nombre
   nativo, etiqueta BCP 47, locale de OpenGraph).
2. Añade un nuevo archivo de diccionario en `lib/i18n/dictionaries/` que implemente la
   interfaz `Dictionary` (TypeScript marcará cualquier clave faltante) y regístralo en
   `get-dictionary.ts`.
3. Añade las traducciones de categoría para los 20 slugs dentro del campo `categories` del
   nuevo diccionario.
4. Opcionalmente, añade sinónimos para el nuevo locale en `keyword-taxonomy.ts`.
5. Ejecuta `npm run build` — las rutas estáticas del nuevo locale se generan automáticamente
   a partir de `locales`, `data/projects/` y `data/categories.json`; no hace falta cambiar
   nada más.

## Contribuir

Cualquiera puede añadir un proyecto mediante un pull request en GitHub — consulta
[CONTRIBUTING.md](CONTRIBUTING.md) para una guía paso a paso (unos 5 minutos para tu primer
PR). Las traducciones son totalmente opcionales; el inglés es la base canónica y obligatoria.
¿No te sientes cómodo editando JSON?
[Abre un issue](../../issues/new?template=add-project.yml) en su lugar.

## Desarrollo

```bash
npm install        # instalar dependencias
npm run dev         # iniciar el servidor de desarrollo local en http://localhost:3000/en
npm run lint         # analizar el código con lint
npm run typecheck    # ejecutar el compilador de TypeScript
npm run validate     # validar todos los datos de proyecto en data/projects/
npm run build         # build de producción
```

## Estructura del proyecto

```text
app/
  [locale]/            Rutas localizadas (el layout raíz vive aquí — <html lang> por locale)
    page.tsx             Página de inicio
    search/              Resultados de búsqueda (/[locale]/search?q=...)
    projects/[slug]/     Páginas de detalle de proyecto
    categories/[slug]/   Páginas de categoría
    about/, contribute/  Páginas de contenido estático
    not-found.tsx        404 localizado
  sitemap.ts, robots.ts  Endpoints de SEO de nivel superior (URLs independientes del locale)
middleware.ts          Añade el locale por defecto a rutas sin prefijo (sin redirección por idioma del navegador)
components/           Componentes de UI reutilizables (conscientes de locale/diccionario) + LanguageSwitcher
data/
  projects/*.json        Un archivo canónico por proyecto; `translations` opcional por locale
  categories.json         Definiciones canónicas (en inglés) de categoría; slugs estables
lib/
  schema.ts               Esquemas Zod para proyectos y categorías
  projects.ts, categories.ts   Cargadores de datos con resolución consciente de locale + fallback
  search.ts                Búsqueda ordenada por relevancia, consciente de locale
  i18n/
    config.ts               Locales, locale por defecto, metadatos BCP 47 / OpenGraph
    types.ts                 Interfaz del diccionario (fuente de verdad para el texto de UI requerido)
    dictionaries/            Un archivo de diccionario por locale
    get-dictionary.ts        Búsqueda locale → Diccionario
    metadata.ts              Helpers de hreflang / canonical / locale de OpenGraph
    keyword-taxonomy.ts       Taxonomía de sinónimos de búsqueda multilingüe
    format.ts                 Helper de interpolación {placeholder} + pluralización
scripts/
  validate-projects.ts     Validación de datos, ejecutada en CI
.github/               Plantillas de issue/PR y el workflow de validación
```

## Roadmap

- [ ] Ampliar el directorio de proyectos más allá del conjunto curado inicial
- [ ] Añadir subcategorías más granulares a medida que crece el directorio
- [ ] Traducir más descripciones de proyecto más allá del conjunto inicial destacado
- [ ] Locales adicionales (`fr`, `pt-BR`, `hi`, `ru`, ...)
- [ ] Integración con Google AdSense (el layout ya reserva espacio para anuncios)
- [ ] Logos / iconos de proyecto

## Licencia

[MIT](LICENSE)
