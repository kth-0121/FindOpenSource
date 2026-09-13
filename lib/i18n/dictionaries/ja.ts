import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "コンテンツへスキップ",
  adSlotLabel: "広告",
  nav: {
    categories: "カテゴリ",
    contribute: "コントリビュート",
    github: "GitHub",
  },
  languageSwitcher: {
    label: "言語を選択",
  },
  footer: {
    tagline: "プロジェクトデータは GitHub 上でコミュニティによって管理されています。",
    about: "概要",
    contribute: "コントリビュート",
    github: "GitHub",
  },
  home: {
    heroTitleLine1: "プロジェクトに最適な",
    heroTitleLine2: "オープンソースを見つけよう。",
    heroSubtitle: "機能・技術・カテゴリからオープンソースプロジェクトを探せます。",
    searchPlaceholder: "機能、技術、カテゴリで検索",
    popularSearchesLabel: "よく検索されるキーワード",
    popularSearches: ["認証", "チャット", "データベース", "画像アップロード", "CMS", "AI"],
    browseCategories: "カテゴリを見る",
    viewAll: "すべて見る",
    popularOpenSource: "人気のオープンソース",
    recentlyAdded: "最近追加されたプロジェクト",
  },
  search: {
    inputLabel: "オープンソースプロジェクトを検索",
    submitLabel: "検索",
    resultsCountOne: "「{query}」の検索結果 {count} 件",
    resultsCountOther: "「{query}」の検索結果 {count} 件",
    noResultsTitle: "「{query}」に一致するプロジェクトが見つかりませんでした。",
    noResultsSuggestion: "代わりに次のキーワードを試してみてください:",
    pageTitle: "検索",
    pageDescription: "機能、技術、カテゴリでオープンソースプロジェクトを検索します。",
    startHeading: "オープンソースプロジェクトを探す",
    relatedSearchesLabel: "こちらもおすすめ",
    relatedCategoryLabel: "関連カテゴリ",
  },
  categories: {
    ai: {
      name: "AI・機械学習",
      description: "オープンソースの機械学習フレームワーク、大規模言語モデル、AI インフラです。",
    },
    authentication: {
      name: "認証・セキュリティ",
      description: "オープンソースの認証、アイデンティティ、セキュリティツールです。",
    },
    backend: {
      name: "バックエンド",
      description: "アプリケーション構築のためのバックエンドプラットフォームと BaaS ツールです。",
    },
    database: {
      name: "データベース",
      description: "リレーショナル、ドキュメント指向、ベクトル、インメモリデータベースです。",
    },
    api: {
      name: "API",
      description: "API の構築・公開・管理のためのツールです。",
    },
    cms: {
      name: "CMS",
      description: "ヘッドレス CMS と従来型のコンテンツ管理システムです。",
    },
    chat: {
      name: "チャット・メッセージング",
      description: "チームチャット、メッセージング、リアルタイムコミュニケーションのプラットフォームです。",
    },
    "developer-tools": {
      name: "開発者向けツール",
      description: "ビルド、テスト、リリースを支援する開発者向けツールです。",
    },
    ui: {
      name: "UI・コンポーネント",
      description: "インターフェース構築のためのコンポーネントライブラリとデザインシステムです。",
    },
    analytics: {
      name: "アナリティクス",
      description: "Web・プロダクト分析プラットフォームです。",
    },
    storage: {
      name: "ストレージ",
      description: "オブジェクトストレージ、ファイル同期、セルフホスト型ストレージシステムです。",
    },
    automation: {
      name: "オートメーション",
      description: "ワークフロー自動化とノーコード・ローコード連携ツールです。",
    },
    devops: {
      name: "DevOps",
      description: "インフラ、オーケストレーション、デプロイのためのツールです。",
    },
    search: {
      name: "検索",
      description: "全文検索・検索エンジンのインフラです。",
    },
    monitoring: {
      name: "モニタリング",
      description: "オブザーバビリティ、メトリクス、ログ、エラートラッキングのツールです。",
    },
    ecommerce: {
      name: "EC",
      description: "オープンソースのコマース・ストアフロントプラットフォームです。",
    },
    payments: {
      name: "決済",
      description: "オープンソースの決済処理・請求インフラです。",
    },
    media: {
      name: "メディア",
      description: "メディアサーバー、配信、ドキュメント・メディア処理ツールです。",
    },
    testing: {
      name: "テスト",
      description: "テストフレームワークとブラウザ自動化ツールです。",
    },
    mobile: {
      name: "モバイル",
      description: "クロスプラットフォームなモバイルアプリを構築するためのフレームワークです。",
    },
  },
  categoriesPage: {
    title: "カテゴリ",
    description: "機能や技術ごとに分類されたオープンソースプロジェクトを見てみましょう。",
  },
  categoryDetail: {
    backLink: "すべてのカテゴリ",
    emptyMessage: "このカテゴリにはまだプロジェクトがありません。",
    addOneLink: "プロジェクトを追加する",
  },
  projectsPage: {
    title: "すべてのプロジェクト",
    descriptionOne: "コミュニティによってキュレーション・管理されているオープンソースプロジェクト {count} 件です。",
    descriptionOther: "コミュニティによってキュレーション・管理されているオープンソースプロジェクト {count} 件です。",
  },
  projectDetail: {
    overviewHeading: "概要",
    githubButton: "GitHub",
    websiteButton: "Webサイト",
    documentationButton: "ドキュメント",
    categoriesLabel: "カテゴリ",
    keywordsLabel: "キーワード",
    languagesLabel: "言語",
    licenseLabel: "ライセンス",
    relatedProjects: "関連プロジェクト",
    spottedError: "誤りを見つけましたか? ",
    suggestEditLink: "GitHub で修正を提案する",
    suggestEditSuffix: "",
  },
  about: {
    title: "FindOpenSource について",
    intro:
      "多くのオープンソースディレクトリは、探しているプロジェクトの名前をすでに知っていることを前提にしています。FindOpenSource は違う問いから始まります:",
    questionQuote: "この機能を作るのに、どのオープンソースが使えるだろう?",
    paragraph2:
      "名前ではなく、作りたいもの — 認証、チャット機能、CMS、ベクトルデータベース — から検索し、それを解決できるオープンソースプロジェクトの一覧を、すばやく比較・評価できる情報とともに確認できます。",
    howItWorksHeading: "仕組み",
    howItWorksBody:
      "FindOpenSource は完全に静的なオープンソースディレクトリです。ログインも、データベースも、独自のバックエンドサービスもありません — すべてのプロジェクトは GitHub の Pull Request でレビューされ、マージされるシンプルな JSON ファイルです。これにより、プロジェクトはシンプルで透明性が高く、コントリビュートしやすい状態を保っています。",
    contributingHeading: "コントリビュート",
    contributingBody: "誰でも Pull Request を送ることでプロジェクトを追加できます。",
    contributingLinkText: "コントリビューションガイドを見る",
    contributingLinkSuffix: "から始めましょう。",
  },
  contribute: {
    title: "プロジェクトをコントリビュートする",
    intro:
      "FindOpenSource はコミュニティによって運営されています。誰でも GitHub の Pull Request を通じて新しいオープンソースプロジェクトを追加できます。必要なのは JSON ファイルを編集する程度のスキルだけです。",
    steps: [
      {
        title: "リポジトリをフォークする",
        description: "GitHub で FindOpenSource をフォークし、ローカルにクローンします。",
      },
      {
        title: "プロジェクトファイルを追加する",
        description: "data/projects/ に、プロジェクトの slug 名で新しい JSON ファイルを作成します。",
      },
      {
        title: "情報を入力する",
        description: "プロジェクト名、説明、GitHub リポジトリ、カテゴリ、キーワード、ライセンスを入力します。",
      },
      {
        title: "検証する",
        description: "ローカルで npm run validate を実行し、ファイルがすべてのチェックを通過することを確認します。",
      },
      {
        title: "Pull Request を送る",
        description: "Pull Request を送信すると、GitHub Actions が自動で検証します。",
      },
    ],
    readContributing: "CONTRIBUTING.md を読む",
    suggestViaIssue: "Issue でプロジェクトを提案する",
    preferNotToEdit: "コードの編集はちょっと…という方は、",
    issueLinkText: "Issue",
    preferNotToEditSuffix: "を開いてください。誰かが代わりに追加します。",
  },
  notFound: {
    title: "ページが見つかりません",
    description: "お探しのページは存在しないか、移動した可能性があります。",
    backHome: "ホームに戻る",
  },
};

export default dictionary;
