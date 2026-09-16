import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "コンテンツへスキップ",
  adSlotLabel: "広告",
  evidenceBadges: {
    activelyMaintained: "活発にメンテナンスされている",
    wellDocumented: "ドキュメントが充実",
    permissiveLicense: "寛容なライセンス",
    foundationBacked: "財団の支援あり",
  },
  nav: {
    categories: "カテゴリ",
    contribute: "コントリビュート",
    github: "GitHub",
    support: "サポート",
  },
  languageSwitcher: {
    label: "言語を選択",
  },
  footer: {
    tagline: "プロジェクトデータは GitHub 上でコミュニティによって管理されています。",
    about: "概要",
    contribute: "コントリビュート",
    github: "GitHub",
    support: "FindOpenSource をサポート",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    contact: "お問い合わせ",
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
    supportHeading: "FindOpenSource は役に立ちましたか?",
    supportBody: "GitHub Sponsors で FindOpenSource をサポートして、オープンソース発見の改善を後押ししてください。",
    supportCta: "FindOpenSource をサポート",
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
    "ai-agents": {
      name: "AIエージェント & エージェントツール",
      description: "AIエージェントを構築し、ツールを使わせ、実際の作業をこなせるようにするフレームワークとインフラです。",
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
    filterAll: "すべて",
    filterAiAgents: "AIエージェント",
    filterAgentTools: "エージェントツール",
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
    supportHeading: "FindOpenSource をサポートする",
    supportBody: "FindOpenSource は今後も無料で利用できます。ちょうどいいプロジェクトを見つける助けになったなら、",
    supportCta: "GitHub Sponsors",
    supportBodySuffix: " で運営をサポートできます。",
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
  support: {
    title: "FindOpenSource をサポート",
    metaDescription:
      "GitHub Sponsors で FindOpenSource をサポートし、プロジェクトのキュレーションや検索の改善、多言語コンテンツの制作を継続できるよう支援してください。",
    intro:
      "FindOpenSource は、開発者が名前ではなく解決したい課題からオープンソースプロジェクトを見つけられるようにするツールです。ログインも広告もない、無料のコミュニティキュレーション・ディレクトリです。",
    whyHeading: "サポートが役立つ理由",
    whyIntro: "いただいたサポートは、FindOpenSource を運営する以下のような活動に使われます:",
    whyItems: [
      "プロジェクトデータを正確かつ最新の状態に保つこと",
      "カタログに新しいオープンソースプロジェクトを追加すること",
      "複数言語にまたがる検索タクソノミーの改善",
      "多言語コンテンツの拡充と磨き上げ",
      "サイト全般のメンテナンス",
      "パフォーマンスと SEO の改善",
    ],
    howHeading: "サポートの方法",
    howBody:
      "FindOpenSource 自体は決済を処理しません。サポートは GitHub の公式スポンサーシッププラットフォームである GitHub Sponsors を通じて行われます。下のボタンから GitHub Sponsors のページに移動できます。",
    ctaLabel: "GitHub Sponsors でサポートする",
    ctaAriaLabel: "GitHub Sponsors で FindOpenSource をサポートする(新しいタブで開きます)",
  },
  privacy: {
    title: "プライバシーポリシー",
    metaDescription: "FindOpenSource が情報、Cookie、第三者サービス、外部リンクをどのように扱っているかについて説明します。",
    lastUpdated: "最終更新日: 2026年9月15日",
    sections: [
      {
        heading: "はじめに",
        paragraphs: [
          "FindOpenSource(以下「FindOpenSource」「当サイト」)は、解決したい課題からオープンソースプロジェクトを見つけられる、無料のコミュニティ運営ディレクトリです。このプライバシーポリシーでは、本サイトを利用する際にどのような情報が関係し、それがどのように扱われるかを説明します。",
          "FindOpenSource 自体がオープンソースプロジェクトです。このポリシーを含むコードベース全体が GitHub 上で公開されています。",
        ],
      },
      {
        heading: "収集する情報",
        paragraphs: [
          "FindOpenSource の利用にアカウント登録やログインは必要ありません。独自のデータベースやバックエンドサービスも運用しておらず、サイト全体が静的ファイルで構成されています。",
          "氏名、メールアドレス、決済情報などの個人情報の入力をサイト内で求めることはありません。",
        ],
      },
      {
        heading: "情報の利用方法",
        paragraphs: [
          "FindOpenSource はサイトを通じて個人情報を収集していないため、当社が利用・販売・共有するユーザー提供データは存在しません。",
        ],
      },
      {
        heading: "検索クエリと利用情報",
        paragraphs: [
          "FindOpenSource で検索を行うと、入力した検索語は URL パラメータ(例: /search?q=database)として渡され、ページがレンダリングされる際にサイト内のプロジェクトカタログと照合されます。FindOpenSource は検索クエリをデータベースに記録・保存・分析することはありません。",
          "ほとんどのウェブサイトと同様に、ホスティングインフラはセキュリティおよび運用目的で IP アドレス、ブラウザの種類、リクエスト日時などの基本的な技術情報を自動的に記録することがあります。これは一般的な Web サーバーの標準的な挙動であり、FindOpenSource のアプリケーションコードが別途収集・処理しているものではありません。",
        ],
      },
      {
        heading: "Cookie および類似技術",
        paragraphs: [
          "FindOpenSource は現在、独自の Cookie を設定しておらず、訪問者の追跡や識別のために localStorage や sessionStorage を使用していません。",
          "将来、広告の導入などにより状況が変わった場合は、何が使われ、なぜ使われるのかをこのセクションで具体的に更新してお知らせします。",
        ],
      },
      {
        heading: "第三者サービス",
        paragraphs: [
          "本サイトは、プロジェクトのソースコード・Issue・Pull Request のための GitHub、および(設定されている場合の)サポートリンクのための GitHub Sponsors など、第三者サービスにリンクしています。これらのサービスには独自のプライバシーポリシーがあり、それらのサービスとのやり取りは本ポリシーではなく各サービスのポリシーに従います。",
          "本サイトは第三者のホスティングプラットフォーム上でホストされており、サイトを配信する過程で標準的な技術的リクエストデータが処理される場合があります。",
        ],
      },
      {
        heading: "外部リンク",
        paragraphs: [
          "プロジェクトページには、GitHub リポジトリ、公式プロジェクトサイト、ドキュメントなどの外部リソースへのリンクが含まれます。これらは FindOpenSource ではなく、各オープンソースプロジェクトや組織が運営しています。外部サイトのコンテンツやプライバシーへの取り組みについて当社は責任を負いません。各サイトのポリシーを直接ご確認ください。",
        ],
      },
      {
        heading: "オープンソースプロジェクトの情報",
        paragraphs: [
          "FindOpenSource に表示されるプロジェクト名、説明、リポジトリリンクなどの情報は、各オープンソースプロジェクトについて公開されている情報をもとに、GitHub の Pull Request を通じてコミュニティがキュレーションしたものです。これは訪問者であるあなたに関する情報ではなく、プロジェクト自体に関する情報です。",
        ],
      },
      {
        heading: "データの保持",
        paragraphs: [
          "FindOpenSource はサイトを通じて個人情報を収集していないため、ユーザーデータの保持期間について説明する内容がありません。ホスティングインフラによって生成される技術ログは、FindOpenSource の管理外で、当該プロバイダー自身のポリシーに従って保持されます。",
        ],
      },
      {
        heading: "データセキュリティ",
        paragraphs: [
          "FindOpenSource はデータベース、ユーザーアカウント、個人データを収集するフォームを一切持たない静的サイトであり、この設計自体が訪問者情報の露出を限定しています。",
        ],
      },
      {
        heading: "プライバシーに関する権利",
        paragraphs: [
          "お住まいの地域によっては、適用されるデータ保護法のもとで、自分について収集された情報を知る権利や削除を求める権利などが認められる場合があります。FindOpenSource はサイトを通じて個人情報を意図的に収集していないため、通常そのような請求に該当する個人データは保有していません。プライバシーに関するご質問やご懸念がある場合は、お問い合わせページからご連絡ください。",
        ],
      },
      {
        heading: "海外からの利用者について",
        paragraphs: [
          "FindOpenSource は英語、簡体字中国語、日本語、韓国語、スペイン語、ドイツ語で提供されており、さまざまな国のユーザーが利用しています。このポリシーは当社の一般的な取り組みを説明するものであり、特定の法域における法的助言の代わりとなるものではありません。FindOpenSource は特定のデータ保護フレームワークに基づく認証を取得していると主張するものではありません。",
        ],
      },
      {
        heading: "子どものプライバシー",
        paragraphs: [
          "FindOpenSource は子どもを対象としたサービスではなく、子どもから意図的に個人情報を収集することはありません。子どもが本サイトを通じて個人情報を提供したと思われる場合は、ご連絡いただければ対応いたします。",
        ],
      },
      {
        heading: "本プライバシーポリシーの変更",
        paragraphs: [
          "サイトの発展に伴い、本ポリシーを更新することがあります。FindOpenSource は将来、Google AdSense などの広告サービスを利用する可能性があります。広告を導入する場合は、導入前に関連する Cookie、識別子、データ処理、ユーザーの選択肢について説明するよう本ポリシーを更新します。ページ上部の「最終更新日」は最新の改定日を示しています。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [
          "本プライバシーポリシーに関するご質問は、お問い合わせページからお送りください。GitHub 経由での連絡方法を案内しています。",
        ],
      },
    ],
  },
  terms: {
    title: "利用規約",
    metaDescription: "FindOpenSource のオープンソースディレクトリを利用する際に適用される規約です。",
    lastUpdated: "最終更新日: 2026年9月15日",
    sections: [
      {
        heading: "規約への同意",
        paragraphs: ["FindOpenSource を利用することで、本利用規約に同意したものとみなされます。同意いただけない場合は、本サイトをご利用にならないでください。"],
      },
      {
        heading: "FindOpenSource について",
        paragraphs: [
          "FindOpenSource は、機能や解決したい課題からオープンソースプロジェクトを見つけられる、無料のコミュニティ運営ディレクトリ兼検索ツールです。ユーザーアカウント、ログイン、バックエンドデータベースを持たない静的ウェブサイトです。",
        ],
      },
      {
        heading: "ディレクトリおよびプロジェクト情報",
        paragraphs: [
          "名前、説明、カテゴリ、キーワード、リンクを含む FindOpenSource のプロジェクト情報は、コミュニティによってキュレーションされ、GitHub の Pull Request を通じてレビューされます。正確性の向上に努めていますが、この情報が不完全であったり、古くなっていたり、誤りを含んでいる場合があります。ご利用の前に、必ず各プロジェクト自身のリポジトリと公式ドキュメントで詳細をご確認ください。",
        ],
      },
      {
        heading: "外部サイトおよび第三者のコンテンツ",
        paragraphs: [
          "FindOpenSource は、GitHub リポジトリ、公式プロジェクトサイト、ドキュメントなど、それぞれのメンテナーや組織が独自に運営する外部サイトにリンクしています。当社はこれら外部サイトのコンテンツ、可用性、取り組みについて管理・保証・責任を負いません。",
        ],
      },
      {
        heading: "オープンソースライセンス",
        paragraphs: [
          "FindOpenSource は、ディレクトリに掲載されているオープンソースプロジェクトを所有・ライセンス供与しておらず、それらに関するいかなる権利も付与しません。各プロジェクトは、そのエントリに表示されているライセンスのもとで、それぞれの著作者または組織が所有・ライセンス供与しています。掲載されているプロジェクトを利用する前に、実際のライセンスと公式リポジトリを確認し、適用される条件をご確認ください。",
        ],
      },
      {
        heading: "正確性と可用性",
        paragraphs: [
          "FindOpenSource は「現状有姿」および「提供可能な範囲」で提供されます。本サイトおよび掲載されているプロジェクト情報が完全であること、正確であること、中断なく利用できること、誤りがないことを保証するものではありません。",
        ],
      },
      {
        heading: "ユーザーによる貢献",
        paragraphs: [
          "コントリビュートページで説明されているとおり、誰でも GitHub で Pull Request や Issue を作成して、プロジェクトカタログへの追加や修正を提案できます。貢献はマージされる前にメンテナーによってレビューされ、特定の貢献が採用されること、または特定の期間内に採用されることを保証するものではありません。",
        ],
      },
      {
        heading: "知的財産権",
        paragraphs: [
          "FindOpenSource のコードベースおよびウェブサイトは MIT ライセンスのもとでオープンソースとして公開されており、GitHub で確認できます。ディレクトリ内で言及されているプロジェクト名、ロゴ、商標、ソフトウェアはそれぞれの所有者に帰属し、識別のためにのみ使用されています。プロジェクトが掲載されていることは、その所有者による推奨や提携関係を意味するものではありません。",
        ],
      },
      {
        heading: "禁止事項",
        paragraphs: [
          "サイトの妨害を試みる行為、他の利用者のサービス品質を低下させるようなスクレイピング、違法または有害なコンテンツの配布を目的とした利用など、FindOpenSource を不正に利用しないことに同意するものとします。",
        ],
      },
      {
        heading: "免責事項",
        paragraphs: [
          "FindOpenSource は、本サイトおよびリンク先のオープンソースプロジェクトについて、商品性、特定目的への適合性、権利非侵害を含め、明示または黙示を問わずいかなる保証も行いません。",
        ],
      },
      {
        heading: "責任の制限",
        paragraphs: [
          "適用法で許容される最大限の範囲において、FindOpenSource およびそのコントリビューターは、本サイトの利用、本サイトに掲載された情報への依拠、および本サイトがリンクする第三者のプロジェクトやウェブサイトに関連する問題から生じるいかなる損害についても責任を負いません。",
        ],
      },
      {
        heading: "本規約の変更",
        paragraphs: [
          "サイトの発展に伴い、本利用規約を更新することがあります。ページ上部の「最終更新日」は最新の改定日を示しています。変更が適用された後も本サイトの利用を継続された場合、変更後の規約に同意したものとみなされます。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: ["本利用規約に関するご質問は、お問い合わせページからお送りください。"],
      },
    ],
  },
  contact: {
    title: "お問い合わせ",
    metaDescription: "プロジェクト情報の修正、ライセンスに関する懸念、サイトへのご意見など、FindOpenSource への連絡方法です。",
    intro:
      "FindOpenSource には専任のサポートチームはありませんが、コミュニティ運営プロジェクトとして皆さまのご意見をお待ちしています。最も確実な連絡方法は GitHub を通じてです。",
    reasonsHeading: "こんなときはぜひご連絡ください",
    reasons: [
      "プロジェクト情報が古い、誤っている、または欠けている場合",
      "リンク切れを見つけた場合",
      "掲載プロジェクトのライセンスや権利に関する懸念がある場合",
      "プロジェクト情報の更新や削除を希望する場合",
      "ディレクトリへの貢献について質問がある場合",
      "プライバシーに関する質問がある場合",
      "サイトに関する一般的なフィードバック",
    ],
    howHeading: "連絡方法",
    howBody: "FindOpenSource に最も早く連絡する方法は、GitHub で Issue を作成することです。プロジェクトを運営しているメンバーに直接届きます。",
    ctaLabel: "GitHub で Issue を作成する",
  },
};

export default dictionary;
