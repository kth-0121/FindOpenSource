# FindOpenSource

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Deutsch**

Open-Source-Projekte nach Funktion, Technologie und Kategorie entdecken — auf Englisch,
vereinfachtem Chinesisch, Japanisch, Koreanisch, Spanisch und Deutsch.

**[findoss.dev](https://findoss.dev)**

## Was ist FindOpenSource?

Die meisten Open-Source-Verzeichnisse gehen davon aus, dass man das gesuchte Projekt bereits
kennt. FindOpenSource geht von einer anderen Frage aus:

> **"Welches Open-Source-Projekt kann ich verwenden, um dieses Feature zu bauen?"**

Suche nach "Authentifizierung", "Chat", "CMS", "Vektordatenbank" oder "Web Scraping" und
erhalte eine kuratierte Liste von Open-Source-Projekten, die genau dieses Problem lösen — mit
genug Informationen (Lizenz, Sprache, Links), um sie schnell einschätzen zu können.

FindOpenSource ist ein vollständig statisches, von der Community gepflegtes Verzeichnis. Es
gibt kein Login, keine Datenbank und keinen Backend-Dienst. Jedes Projekt ist eine einfache
JSON-Datei, die über GitHub Pull Requests geprüft und gemerged wird.

## Funktionen

- **Feature-first-Suche** — suche nach dem, was du bauen willst, nicht nur nach einem
  Projektnamen.
- **Nach Relevanz sortierte Ergebnisse** — Treffer bei Name, Keyword, Kategorie, Sprache und
  Beschreibung werden gewichtet und sortiert, mit Unterstützung für mehrwortige Suchanfragen.
- **Mehrsprachige Suche** — suche in jeder der 6 unterstützten Sprachen; umgangssprachliche
  Anfragen wie "로그인" oder "ログイン" werden im Hintergrund zu den kanonischen englischen
  Keywords erweitert.
- **Teilbare Such-URLs** — jede Suche ist eine echte URL (`/de/search?q=authentication`).
- **Kategorie-Browsing** — 20 kuratierte Kategorien von KI bis DevOps.
- **Statisch und schnell** — gebaut mit dem Next.js App Router; jede lokalisierte Projekt- und
  Kategorieseite wird zur Build-Zeit statisch generiert.
- **SEO-freundlich** — locale-bezogene Metadaten, OpenGraph, hreflang-Alternativen, JSON-LD,
  Sitemap und canonical URLs für jede Seite.

## Sprachen

| Locale  | Language                  |
| ------- | ------------------------- |
| `en`    | English (Standard)        |
| `zh-CN` | Simplified Chinese        |
| `ja`    | Japanese                  |
| `ko`    | Korean                    |
| `es`    | Spanish                   |
| `de`    | German                    |

Jede Route erhält ein Locale-Präfix:

```text
/en
/en/projects/supabase
/en/categories/authentication
/en/search?q=authentication

/de
/de/projects/supabase
/de/categories/authentication
/de/search?q=authentifizierung
```

Der Aufruf einer URL ohne Präfix (z. B. `/projects/supabase` oder einfach `/`) leitet (308)
auf denselben Pfad unter `/en`, dem Standard-Locale, weiter — es gibt keine automatische
Weiterleitung anhand der Browsersprache, sodass Crawling und geteilte Links immer vorhersagbar
bleiben. Ein kompakter Sprachumschalter im Header erlaubt es Besuchern, das Locale zu wechseln,
ohne die aktuelle Seite oder Suchanfrage zu verlieren.

## Suche

Die Suche vergleicht die Felder `name`, `keywords`, `categories`, `languages` und
`description` eines Projekts, wobei jedes Feld unterschiedlich gewichtet wird (Name- und
Keyword-Treffer zählen am meisten). Mehrwortige Anfragen wie `image upload` werden in Tokens
zerlegt und unabhängig bewertet; Projekte, die *alle* Tokens treffen, erhalten einen
Coverage-Bonus — so landen bei `vector database` weiterhin Milvus und Qdrant vor generischen
Datenbanken. Die Implementierung des Scorings findet sich in [`lib/search.ts`](lib/search.ts).

Zusätzlich übersetzt eine Query-Expansion-Schicht (siehe [Mehrsprachige Keywords](#mehrsprachige-keywords)
weiter unten) umgangssprachliche oder nicht-englische Anfragen in dieselben kanonischen
Keywords, mit einem niedrigeren Gewicht als ein direkter Treffer — Synonyme *helfen* den
Ergebnissen also nur, ohne je einen exakten Treffer zu überholen.

## Kategorien

KI & Machine Learning · Authentifizierung & Sicherheit · Backend · Datenbank · API · CMS ·
Chat & Messaging · Entwicklertools · UI & Komponenten · Analytics · Storage · Automatisierung ·
DevOps · Suche · Monitoring · E-Commerce · Zahlungen · Medien · Testing · Mobile

Kategorie-**Slugs** sind stabil und werden nie übersetzt (`/de/categories/authentication`,
nicht `/de/categories/authentifizierung`) — nur der angezeigte Name/die Beschreibung werden
lokalisiert. Die kanonische (englische) Liste findest du in
[`data/categories.json`](data/categories.json), übersetzte Namen/Beschreibungen in
[`lib/i18n/dictionaries/`](lib/i18n/dictionaries/).

## Übersetzungen

- **UI-Text** (Navigation, Buttons, Überschriften, Leerzustände, die About-/Contribute-Seiten,
  ...) liegt in [`lib/i18n/dictionaries/`](lib/i18n/dictionaries/), eine Datei pro Locale, die
  alle dieselbe TypeScript-Schnittstelle [`Dictionary`](lib/i18n/types.ts) implementieren —
  ein fehlender Key in irgendeiner Sprache ist damit ein Compile-Fehler, kein leerer String
  zur Laufzeit.
- **Projektdaten** bleiben in einer kanonischen (englischen) JSON-Datei pro Projekt. Ein
  Projekt kann optional ein `translations`-Objekt mit übersetzter `description`/`keywords`
  pro Locale hinzufügen; Englisch ist immer der Fallback, wenn eine Übersetzung fehlt. Siehe
  [CONTRIBUTING.md](CONTRIBUTING.md#adding-translated-descriptions-optional).
- **Kategorienamen/-beschreibungen** sind in jeder Dictionary-Datei vollständig übersetzt
  (Kategorien sind, anders als die offene Projektliste, eine kleine, von den Maintainern
  kuratierte Taxonomie).

### Mehrsprachige Keywords

[`lib/i18n/keyword-taxonomy.ts`](lib/i18n/keyword-taxonomy.ts) bildet natürlichsprachliche
Synonyme pro Locale (z. B. `authentication` ← `login`, `로그인`, `ログイン`,
`inicio de sesión`, `anmeldung`, ...) auf die kanonischen Keywords ab, die tatsächlich in
`data/projects/*.json` verwendet werden, plus eine Liste verwandter Begriffe, die zusätzlich
gewichtet werden (`oauth`, `sso`, `jwt`, ...). `lib/search.ts` erweitert die Suchanfrage vor
dem Scoring anhand dieser Taxonomie. Eine neue Suchabsicht fügst du hinzu, indem du einen
Eintrag ergänzt (oder einem bestehenden ein neues Locale hinzufügst) — am Suchalgorithmus
selbst muss nichts geändert werden.

### Eine neue Sprache hinzufügen

1. Füge das Locale zu `locales` in [`lib/i18n/config.ts`](lib/i18n/config.ts) hinzu (Name,
   nativer Name, BCP-47-Tag, OpenGraph-Locale).
2. Füge eine neue Dictionary-Datei in `lib/i18n/dictionaries/` hinzu, die die
   `Dictionary`-Schnittstelle implementiert (TypeScript zeigt fehlende Keys an), und
   registriere sie in `get-dictionary.ts`.
3. Füge im Feld `categories` des neuen Dictionaries Kategorieübersetzungen für alle 20 Slugs
   hinzu.
4. Optional: Füge in `keyword-taxonomy.ts` Synonyme für das neue Locale hinzu.
5. Führe `npm run build` aus — die statischen Routen des neuen Locales werden automatisch aus
   `locales`, `data/projects/` und `data/categories.json` generiert; sonst muss nichts
   geändert werden.

## Mitmachen

Jeder kann über einen GitHub Pull Request ein Projekt hinzufügen — eine Schritt-für-Schritt-
Anleitung findest du in [CONTRIBUTING.md](CONTRIBUTING.md) (etwa 5 Minuten für den ersten PR).
Übersetzungen sind vollständig optional; Englisch ist die kanonische, verpflichtende
Grundlage. Nicht sicher im Umgang mit JSON?
[Erstelle stattdessen ein Issue](../../issues/new?template=add-project.yml).

## Entwicklung

```bash
npm install        # Abhängigkeiten installieren
npm run dev         # lokalen Dev-Server unter http://localhost:3000/en starten
npm run lint         # Codebase linten
npm run typecheck    # TypeScript-Compiler ausführen
npm run validate     # alle Projektdaten in data/projects/ validieren
npm run build         # Produktions-Build
```

## Projektstruktur

```text
app/
  [locale]/            Lokalisierte Routen (auch das Root-Layout liegt hier — <html lang> pro Locale)
    page.tsx             Startseite
    search/              Suchergebnisse (/[locale]/search?q=...)
    projects/[slug]/     Projekt-Detailseiten
    categories/[slug]/   Kategorieseiten
    about/, contribute/  Statische Inhaltsseiten
    not-found.tsx        Lokalisierte 404-Seite
  sitemap.ts, robots.ts  SEO-Endpunkte auf oberster Ebene (locale-unabhängige URLs)
middleware.ts          Versieht Pfade ohne Locale mit dem Standard-Locale (keine Weiterleitung anhand der Browsersprache)
components/           Wiederverwendbare UI-Komponenten (locale-/dictionary-bewusst) + LanguageSwitcher
data/
  projects/*.json        Eine kanonische Datei pro Projekt; optionale `translations` pro Locale
  categories.json         Kanonische (englische) Kategoriedefinitionen; stabile Slugs
lib/
  schema.ts               Zod-Schemas für Projekte & Kategorien
  projects.ts, categories.ts   Daten-Loader mit locale-bewusster Auflösung + Fallback
  search.ts                Nach Relevanz sortierte, locale-bewusste Suche
  i18n/
    config.ts               Locales, Standard-Locale, BCP 47 / OpenGraph-Metadaten
    types.ts                 Dictionary-Schnittstelle (Quelle der Wahrheit für erforderliche UI-Strings)
    dictionaries/            Eine Dictionary-Datei pro Locale
    get-dictionary.ts        Locale → Dictionary-Lookup
    metadata.ts              hreflang- / canonical- / OpenGraph-Locale-Helfer
    keyword-taxonomy.ts       Taxonomie der mehrsprachigen Such-Synonyme
    format.ts                 {placeholder}-Interpolation + Pluralisierungs-Helfer
scripts/
  validate-projects.ts     Datenvalidierung, läuft in der CI
.github/               Issue-/PR-Vorlagen und der Validierungs-Workflow
```

## Roadmap

- [ ] Das Projektverzeichnis über die anfängliche kuratierte Auswahl hinaus erweitern
- [ ] Mit wachsendem Verzeichnis feinere Unterkategorien hinzufügen
- [ ] Mehr Projektbeschreibungen über das anfängliche Flaggschiff-Set hinaus übersetzen
- [ ] Weitere Locales (`fr`, `pt-BR`, `hi`, `ru`, ...)
- [ ] Google-AdSense-Integration (das Layout reserviert bereits Platz für Anzeigen)
- [ ] Projekt-Logos / -Icons

## Lizenz

[MIT](LICENSE)
