# FindOpenSource

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Deutsch](README.de.md)

機能・技術・カテゴリからオープンソースプロジェクトを見つけられます — 英語、簡体字中国語、
日本語、韓国語、スペイン語、ドイツ語に対応しています。

**[findoss.dev](https://findoss.dev)**

## FindOpenSource とは？

多くのオープンソースディレクトリは、探しているプロジェクトをすでに知っていることを前提にしています。
FindOpenSource は別の問いから出発します：

> **「この機能を作るには、どのオープンソースを使えばいいのか？」**

「認証」「チャット」「CMS」「ベクトルデータベース」「Web スクレイピング」などで検索すると、その
課題を解決するオープンソースプロジェクトの厳選リストが表示されます — ライセンス、開発言語、
リンクなど、素早く評価するための情報も一緒に確認できます。

FindOpenSource は完全に静的で、コミュニティによって運営されているディレクトリです。ログインも、
データベースも、バックエンドサービスもありません。すべてのプロジェクトは 1 つの JSON ファイルで
あり、GitHub のプルリクエストを通じてレビュー・マージされます。

## 主な機能

- **機能起点の検索** — プロジェクト名ではなく、作りたいものを起点に検索できます。
- **関連度ランキング** — 名前・キーワード・カテゴリ・言語・説明文の一致に重み付けしてランキング、
  複数語クエリにも対応。
- **多言語検索** — 対応する 6 言語のどれでも検索可能。「로그인」「登录」のような口語的なクエリは、
  裏側で標準的な英語キーワードに展開されます。
- **共有可能な検索 URL** — すべての検索結果は実際の URL です（`/ja/search?q=authentication`）。
- **カテゴリ閲覧** — AI から DevOps まで、20 個の厳選されたカテゴリ。
- **静的で高速** — Next.js App Router で構築されており、ローカライズされたすべてのプロジェクト・
  カテゴリページはビルド時に静的生成されます。
- **SEO フレンドリー** — 各ページにロケールごとのメタデータ、OpenGraph、hreflang 代替リンク、
  JSON-LD、サイトマップ、canonical URL を用意しています。

## 対応言語

| Locale  | Language           |
| ------- | ------------------ |
| `en`    | English（デフォルト） |
| `zh-CN` | Simplified Chinese |
| `ja`    | Japanese           |
| `ko`    | Korean             |
| `es`    | Spanish            |
| `de`    | German             |

すべてのルートにはロケールのプレフィックスが付きます：

```text
/en
/en/projects/supabase
/en/categories/authentication
/en/search?q=authentication

/ja
/ja/projects/supabase
/ja/categories/authentication
/ja/search?q=認証
```

ロケールなしの URL（例：`/projects/supabase` や単独の `/`）にアクセスすると、デフォルトロケール
の `/en` 配下の同じパスへ 308 リダイレクトされます — ブラウザの言語設定による自動リダイレクトは
行わないため、クロールや共有リンクの挙動が常に予測可能です。ヘッダーのコンパクトな言語切り替え
から、現在のページと検索クエリを保持したままロケールを切り替えられます。

## 検索

検索はプロジェクトの `name`・`keywords`・`categories`・`languages`・`description` フィールドを
対象とし、フィールドごとに重みが異なります（名前・キーワードの一致が最も高く評価されます）。
`image upload` のような複数語のクエリはトークンごとに分割され個別にスコアリングされ、*すべての*
トークンに一致するプロジェクトにはカバレッジボーナスが加算されます — そのため `vector database`
と検索しても、Milvus や Qdrant が一般的なデータベースより上位に表示されます。スコアリングの実装は
[`lib/search.ts`](lib/search.ts) を参照してください。

さらに、クエリ拡張レイヤー（下記の[多言語キーワード](#多言語キーワード)を参照）が、口語的な
クエリや非英語のクエリを同じ標準キーワードに変換します。この際の重みは直接一致より低く設定されて
いるため、同義語はあくまで結果を*助ける*だけで、完全一致より上位に来ることはありません。

## カテゴリ

AI・機械学習 · 認証・セキュリティ · バックエンド · データベース · API · CMS · チャット・
メッセージング · 開発者ツール · UI・コンポーネント · 分析 · ストレージ · 自動化 · DevOps ·
検索 · モニタリング · EC · 決済 · メディア · テスト · モバイル

カテゴリの **slug** は固定されており翻訳されません（`/ja/categories/authentication` であり、
`/ja/categories/認証` ではありません）— 表示される名前・説明のみがローカライズされます。標準
（英語）の一覧は [`data/categories.json`](data/categories.json) を、翻訳された名前・説明は
[`lib/i18n/dictionaries/`](lib/i18n/dictionaries/) を参照してください。

## 翻訳

- **UI テキスト**（ナビゲーション、ボタン、見出し、空状態、About/Contribute ページなど）は
  [`lib/i18n/dictionaries/`](lib/i18n/dictionaries/) にロケールごとに 1 ファイルずつ配置され、
  すべて同じ [`Dictionary`](lib/i18n/types.ts) TypeScript インターフェースを実装しています —
  そのため、どの言語であってもキーが欠けていれば実行時に空文字になるのではなく、コンパイル時に
  エラーになります。
- **プロジェクトデータ**はプロジェクトごとに 1 つの標準（英語）JSON ファイルとして管理されます。
  プロジェクトは任意でロケールごとに翻訳された `description`/`keywords` を持つ `translations`
  オブジェクトを追加でき、翻訳がない場合は常に英語がフォールバックになります。詳細は
  [CONTRIBUTING.md](CONTRIBUTING.md#adding-translated-descriptions-optional) を参照してください。
- **カテゴリの名前・説明**は各辞書ファイルに完全に翻訳されています（プロジェクト一覧とは異なり、
  カテゴリはメンテナーが管理する小規模で固定的な分類体系です）。

### 多言語キーワード

[`lib/i18n/keyword-taxonomy.ts`](lib/i18n/keyword-taxonomy.ts) は、各ロケールの自然言語の
類義語（例：`authentication` ← `login`、`로그인`、`ログイン`、`inicio de sesión`、`anmeldung`
など）を `data/projects/*.json` で実際に使われている標準キーワードにマッピングし、加えてブースト
すべき関連語のリスト（`oauth`、`sso`、`jwt` など）も提供します。`lib/search.ts` はスコアリング
前に、このタクソノミーを使ってユーザーのクエリを展開します。新しい意図を追加するには、エントリを
追加する（または既存エントリに新しいロケールを追加する）だけでよく、検索アルゴリズム自体を変更
する必要はありません。

### 新しい言語の追加

1. [`lib/i18n/config.ts`](lib/i18n/config.ts) の `locales` にロケールを追加します（名前、
   その言語自身での表記、BCP 47 タグ、OpenGraph ロケール）。
2. `lib/i18n/dictionaries/` に `Dictionary` インターフェースを実装した新しい辞書ファイルを
   追加し（欠けているキーは TypeScript が指摘します）、`get-dictionary.ts` に登録します。
3. 新しい辞書の `categories` フィールド内に、20 個すべての slug に対するカテゴリ翻訳を追加します。
4. 任意で `keyword-taxonomy.ts` に新しいロケール向けの類義語を追加します。
5. `npm run build` を実行します — 新しいロケールの静的ルートは `locales`、
   `data/projects/`、`data/categories.json` から自動生成され、それ以外に変更する必要はありません。

## コントリビュート

誰でも GitHub のプルリクエストでプロジェクトを追加できます — 手順は
[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください（初めての PR でも約 5 分程度）。
翻訳は完全に任意であり、英語が標準かつ必須のベースラインです。JSON の編集に慣れていない場合は、
代わりに[Issue を作成](../../issues/new?template=add-project.yml)してください。

## 開発

```bash
npm install        # 依存パッケージのインストール
npm run dev         # http://localhost:3000/en でローカル開発サーバーを起動
npm run lint         # コードベースの lint
npm run typecheck    # TypeScript コンパイラの実行
npm run validate     # data/projects/ 内のすべてのプロジェクトデータを検証
npm run build         # 本番用ビルド
```

## プロジェクト構成

```text
app/
  [locale]/            ロケールごとのルート（ルートレイアウトもここに配置 — ロケールごとの <html lang>）
    page.tsx             ホームページ
    search/              検索結果 (/[locale]/search?q=...)
    projects/[slug]/     プロジェクト詳細ページ
    categories/[slug]/   カテゴリページ
    about/, contribute/  静的コンテンツページ
    not-found.tsx        ロケールごとの 404
  sitemap.ts, robots.ts  トップレベルの SEO エンドポイント（ロケールに依存しない URL）
middleware.ts          ロケールなしのパスにデフォルトロケールを付与（ブラウザ言語による自動リダイレクトなし）
components/           再利用可能な UI コンポーネント（ロケール/辞書対応）+ LanguageSwitcher
data/
  projects/*.json        プロジェクトごとに 1 つの標準ファイル；任意でロケールごとの `translations`
  categories.json         標準（英語）カテゴリ定義；固定の slug
lib/
  schema.ts               プロジェクト・カテゴリ用の Zod スキーマ
  projects.ts, categories.ts   ロケール対応の解決とフォールバックを行うデータローダー
  search.ts                関連度ランキング付き、ロケール対応の検索
  i18n/
    config.ts               ロケール、デフォルトロケール、BCP 47 / OpenGraph メタデータ
    types.ts                 辞書インターフェース（必須 UI 文字列の唯一の基準）
    dictionaries/            ロケールごとの辞書ファイル
    get-dictionary.ts        ロケール → 辞書の参照
    metadata.ts              hreflang / canonical / OpenGraph ロケールのヘルパー
    keyword-taxonomy.ts       多言語検索の類義語タクソノミー
    format.ts                 {placeholder} 補間 + 複数形処理のヘルパー
scripts/
  validate-projects.ts     データ検証、CI で実行
.github/               Issue/PR テンプレートと検証ワークフロー
```

## ロードマップ

- [ ] 初期の厳選セットを超えてプロジェクトディレクトリを拡充
- [ ] ディレクトリの成長に合わせて、より細かいサブカテゴリを追加
- [ ] 初期のフラッグシップセットを超えて、より多くのプロジェクト説明を翻訳
- [ ] 追加ロケールへの対応（`fr`、`pt-BR`、`hi`、`ru` など）
- [ ] Google AdSense の導入（レイアウトにはすでに広告スペースを確保済み）
- [ ] プロジェクトのロゴ・アイコン

## ライセンス

[MIT](LICENSE)
