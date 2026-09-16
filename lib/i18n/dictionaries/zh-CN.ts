import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "跳至内容",
  adSlotLabel: "广告",
  evidenceBadges: {
    activelyMaintained: "积极维护",
    wellDocumented: "文档完善",
    permissiveLicense: "宽松许可证",
    foundationBacked: "基金会支持",
  },
  nav: {
    categories: "分类",
    contribute: "贡献",
    github: "GitHub",
    support: "赞助",
  },
  languageSwitcher: {
    label: "选择语言",
  },
  footer: {
    tagline: "项目数据由社区在 GitHub 上维护。",
    about: "关于",
    contribute: "贡献",
    github: "GitHub",
    support: "赞助 FindOpenSource",
    privacy: "隐私政策",
    terms: "服务条款",
    contact: "联系我们",
  },
  home: {
    heroTitleLine1: "找到适合你项目的",
    heroTitleLine2: "开源方案。",
    heroSubtitle: "按功能、技术和分类发现开源项目。",
    searchPlaceholder: "按功能、技术或分类搜索",
    popularSearchesLabel: "热门搜索",
    popularSearches: ["身份验证", "聊天", "数据库", "图片上传", "CMS", "AI"],
    browseCategories: "浏览分类",
    viewAll: "查看全部",
    popularOpenSource: "热门开源项目",
    recentlyAdded: "最近添加",
    supportHeading: "FindOpenSource 对你有帮助吗？",
    supportBody: "通过 GitHub Sponsors 赞助 FindOpenSource，帮助我们持续改进开源项目的发现体验。",
    supportCta: "赞助 FindOpenSource",
  },
  search: {
    inputLabel: "搜索开源项目",
    submitLabel: "搜索",
    resultsCountOne: '找到 {count} 个与"{query}"相关的项目',
    resultsCountOther: '找到 {count} 个与"{query}"相关的项目',
    noResultsTitle: '未找到与"{query}"相关的项目。',
    noResultsSuggestion: "可以试试这些搜索词：",
    pageTitle: "搜索",
    pageDescription: "按功能、技术或分类搜索开源项目。",
    startHeading: "搜索开源项目",
    relatedSearchesLabel: "试试这些",
    relatedCategoryLabel: "相关分类",
  },
  categories: {
    ai: {
      name: "AI 与机器学习",
      description: "开源机器学习框架、大语言模型与 AI 基础设施。",
    },
    authentication: {
      name: "身份验证与安全",
      description: "开源身份验证、身份管理与安全工具。",
    },
    backend: {
      name: "后端",
      description: "用于构建应用的后端平台与 BaaS 工具。",
    },
    database: {
      name: "数据库",
      description: "关系型、文档型、向量和内存数据库。",
    },
    api: {
      name: "API",
      description: "用于构建、暴露和管理 API 的工具。",
    },
    cms: {
      name: "CMS",
      description: "无头 CMS 与传统内容管理系统。",
    },
    chat: {
      name: "聊天与消息",
      description: "团队聊天、消息与实时通信平台。",
    },
    "developer-tools": {
      name: "开发者工具",
      description: "帮助开发者构建、测试和发布软件的工具。",
    },
    ui: {
      name: "UI 与组件",
      description: "用于构建界面的组件库与设计系统。",
    },
    analytics: {
      name: "分析",
      description: "网站与产品分析平台。",
    },
    storage: {
      name: "存储",
      description: "对象存储、文件同步与自托管存储系统。",
    },
    automation: {
      name: "自动化",
      description: "工作流自动化与无代码/低代码集成工具。",
    },
    devops: {
      name: "DevOps",
      description: "基础设施、编排与部署工具。",
    },
    search: {
      name: "搜索",
      description: "全文检索与搜索引擎基础设施。",
    },
    monitoring: {
      name: "监控",
      description: "可观测性、指标、日志与错误追踪工具。",
    },
    ecommerce: {
      name: "电子商务",
      description: "开源电商与店面平台。",
    },
    payments: {
      name: "支付",
      description: "开源支付处理与账单基础设施。",
    },
    media: {
      name: "媒体",
      description: "媒体服务器、流媒体与文档/媒体处理工具。",
    },
    testing: {
      name: "测试",
      description: "测试框架与浏览器自动化工具。",
    },
    mobile: {
      name: "移动端",
      description: "用于构建跨平台移动应用的框架。",
    },
    "ai-agents": {
      name: "AI 智能体与智能体工具",
      description: "用于构建 AI 智能体、让智能体使用工具并完成实际工作的框架与基础设施。",
    },
  },
  categoriesPage: {
    title: "分类",
    description: "按功能或技术浏览开源项目。",
  },
  categoryDetail: {
    backLink: "全部分类",
    emptyMessage: "该分类下暂无项目。",
    addOneLink: "添加一个",
    filterAll: "全部",
    filterAiAgents: "AI 智能体",
    filterAgentTools: "智能体工具",
  },
  projectsPage: {
    title: "全部项目",
    descriptionOne: "由社区精选和维护的 {count} 个开源项目。",
    descriptionOther: "由社区精选和维护的 {count} 个开源项目。",
  },
  projectDetail: {
    overviewHeading: "概述",
    githubButton: "GitHub",
    websiteButton: "官网",
    documentationButton: "文档",
    categoriesLabel: "分类",
    keywordsLabel: "关键词",
    languagesLabel: "编程语言",
    licenseLabel: "许可证",
    relatedProjects: "相关项目",
    spottedError: "发现信息有误？",
    suggestEditLink: "在 GitHub 上提出修改建议",
    suggestEditSuffix: "。",
  },
  about: {
    title: "关于 FindOpenSource",
    intro: "大多数开源目录都假设你已经知道要找的项目名称。FindOpenSource 从一个不同的问题出发：",
    questionQuote: "我可以用什么开源项目来实现这个功能？",
    paragraph2:
      "按照你想构建的功能搜索——身份验证、聊天功能、CMS、向量数据库——即可获得一份精选的开源项目列表，并附有足够的信息帮助你快速评估和比较。",
    howItWorksHeading: "工作原理",
    howItWorksBody:
      "FindOpenSource 是一个完全静态的开源目录。没有登录、没有数据库，也没有独立的后端服务——每个项目都是一个通过 GitHub Pull Request 审核并合并的简单 JSON 文件。这让项目保持简单、透明，也易于贡献。",
    contributingHeading: "参与贡献",
    contributingBody: "任何人都可以通过提交 Pull Request 来添加项目。",
    contributingLinkText: "查看贡献指南",
    contributingLinkSuffix: "开始吧。",
    supportHeading: "赞助 FindOpenSource",
    supportBody: "FindOpenSource 免费使用，并将持续保持免费。如果它帮你找到了合适的项目，你可以通过 ",
    supportCta: "GitHub Sponsors",
    supportBodySuffix: " 支持它的运营。",
  },
  contribute: {
    title: "贡献一个项目",
    intro:
      "FindOpenSource 由社区维护。任何人都可以通过 GitHub Pull Request 添加新的开源项目——除了编辑一个 JSON 文件之外，不需要其他编程经验。",
    steps: [
      {
        title: "Fork 仓库",
        description: "在 GitHub 上 Fork FindOpenSource 并克隆到本地。",
      },
      {
        title: "添加项目文件",
        description: "在 data/projects/ 目录下创建一个以项目 slug 命名的新 JSON 文件。",
      },
      {
        title: "填写信息",
        description: "填写项目名称、描述、GitHub 仓库地址、分类、关键词和许可证。",
      },
      {
        title: "验证",
        description: "在本地运行 npm run validate，确保文件通过所有检查。",
      },
      {
        title: "提交 Pull Request",
        description: "提交 Pull Request 后，GitHub Actions 会自动进行验证。",
      },
    ],
    readContributing: "阅读 CONTRIBUTING.md",
    suggestViaIssue: "通过 Issue 推荐项目",
    preferNotToEdit: "不想编辑代码？",
    issueLinkText: "创建一个 Issue",
    preferNotToEditSuffix: "，会有人帮你添加。",
  },
  notFound: {
    title: "页面未找到",
    description: "你要查找的页面不存在，或可能已被移动。",
    backHome: "返回首页",
  },
  support: {
    title: "赞助 FindOpenSource",
    metaDescription: "通过 GitHub Sponsors 赞助 FindOpenSource，帮助支持项目数据维护、搜索改进和多语言内容制作。",
    intro:
      "FindOpenSource 帮助开发者按照要解决的问题、而不仅仅是按名称来查找开源项目。它是一个免费的、由社区维护的目录，没有登录，也没有广告打扰。",
    whyHeading: "赞助能带来什么帮助",
    whyIntro: "你的赞助将用于支持 FindOpenSource 的日常运营，包括：",
    whyItems: [
      "保持项目数据的准确与更新",
      "向目录中添加新的开源项目",
      "改进跨语言的搜索 taxonomy",
      "扩充和完善多语言内容",
      "网站的日常维护",
      "性能与 SEO 优化",
    ],
    howHeading: "如何赞助",
    howBody:
      "FindOpenSource 本身不处理支付。赞助通过 GitHub 官方的赞助平台 GitHub Sponsors 完成——点击下方按钮即可前往 GitHub Sponsors 页面。",
    ctaLabel: "在 GitHub Sponsors 上赞助",
    ctaAriaLabel: "在 GitHub Sponsors 上赞助 FindOpenSource（在新标签页中打开）",
  },
  privacy: {
    title: "隐私政策",
    metaDescription: "了解 FindOpenSource 如何处理信息、Cookie、第三方服务和外部链接。",
    lastUpdated: "最后更新：2026 年 9 月 15 日",
    sections: [
      {
        heading: "简介",
        paragraphs: [
          "FindOpenSource（以下简称「FindOpenSource」或「我们」）是一个免费的、由社区维护的目录，帮助你按照要解决的问题来发现开源项目。本隐私政策说明了你在使用本网站时会涉及哪些信息，以及这些信息将如何被处理。",
          "FindOpenSource 本身就是一个开源项目，包括本政策在内的完整代码库都公开发布在 GitHub 上。",
        ],
      },
      {
        heading: "我们收集的信息",
        paragraphs: [
          "使用 FindOpenSource 不需要账户、登录或注册。我们也没有运行数据库或后端服务——整个网站由静态文件构建而成。",
          "我们不会在网站的任何地方要求你提交姓名、电子邮件地址或支付信息等个人信息。",
        ],
      },
      {
        heading: "我们如何使用信息",
        paragraphs: [
          "由于 FindOpenSource 不通过网站本身收集个人信息，因此不存在我们会使用、出售或共享的用户提交数据。",
        ],
      },
      {
        heading: "搜索查询与使用信息",
        paragraphs: [
          "当你在 FindOpenSource 上搜索时，你输入的关键词会作为 URL 参数传递（例如 /search?q=database），并在页面渲染时与网站本地的项目目录进行匹配。FindOpenSource 不会将你的搜索查询记录、存储或分析到任何数据库中。",
          "与几乎所有网站一样，底层托管基础设施可能会出于安全和运维目的自动记录基本的技术请求信息（例如 IP 地址、浏览器类型和请求时间戳）。这是标准的 Web 服务器行为，并非 FindOpenSource 的应用代码单独收集或处理的内容。",
        ],
      },
      {
        heading: "Cookie 及类似技术",
        paragraphs: [
          "FindOpenSource 目前不会设置自己的 Cookie，也不使用 localStorage 或 sessionStorage 来追踪或识别访问者。",
          "如果这种情况在未来发生变化——例如引入广告——我们会更新本节内容，具体说明所使用的技术及其原因。",
        ],
      },
      {
        heading: "第三方服务",
        paragraphs: [
          "本网站链接到第三方服务，包括用于项目源代码、Issue 和 Pull Request 的 GitHub，以及（在配置的情况下）用于赞助链接的 GitHub Sponsors。这些服务有各自的隐私政策，你与它们的交互受这些政策约束，而非本政策。",
          "本网站托管在第三方托管平台提供的基础设施上，该平台在向你传送网站内容的过程中可能会处理标准的技术请求数据。",
        ],
      },
      {
        heading: "外部链接",
        paragraphs: [
          "项目页面链接到 GitHub 仓库、官方项目网站和文档等外部资源。这些资源由各自的开源项目或组织运营，而非由 FindOpenSource 运营。我们不对外部网站的内容或隐私实践负责，并建议你直接查阅这些网站自己的政策。",
        ],
      },
      {
        heading: "开源项目信息",
        paragraphs: [
          "FindOpenSource 上展示的项目名称、描述、仓库链接等信息，来源于各开源项目公开可获取的信息，并由社区通过 GitHub Pull Request 进行整理维护。这些信息是关于项目本身的，而不是关于作为访问者的你的。",
        ],
      },
      {
        heading: "数据保留",
        paragraphs: [
          "由于 FindOpenSource 不通过网站收集个人信息，因此没有需要说明的用户数据保留期限。托管基础设施生成的任何技术日志，将按照该服务提供商自身的做法保留，不在 FindOpenSource 的控制范围内。",
        ],
      },
      {
        heading: "数据安全",
        paragraphs: [
          "FindOpenSource 是一个没有数据库、没有用户账户、也没有任何收集个人数据表单的静态网站，这样的设计本身就限制了访问者信息暴露的可能性。",
        ],
      },
      {
        heading: "你的隐私权利",
        paragraphs: [
          "根据你所在的地区，你可能根据适用的数据保护法律享有一定权利，例如了解你的哪些信息被收集，或要求删除这些信息。由于 FindOpenSource 不会主动通过网站本身收集个人信息，通常并不存在可供此类请求处理的个人数据。如果你有隐私方面的问题或疑虑，可以通过联系我们页面与我们取得联系。",
        ],
      },
      {
        heading: "国际用户",
        paragraphs: [
          "FindOpenSource 提供英语、简体中文、日语、韩语、西班牙语和德语版本，来自许多国家的用户都会访问本站。本政策旨在概述我们的一般做法，并不能替代针对你所在司法辖区的法律意见，FindOpenSource 也不声称已通过任何特定数据保护框架的认证。",
        ],
      },
      {
        heading: "儿童隐私",
        paragraphs: [
          "FindOpenSource 并非面向儿童，我们不会有意收集儿童的个人信息。如果你认为有儿童通过本网站提交了个人信息，请与我们联系，我们会妥善处理。",
        ],
      },
      {
        heading: "本隐私政策的变更",
        paragraphs: [
          "随着网站的发展，我们可能会更新本政策。FindOpenSource 未来可能会使用 Google AdSense 等广告服务。如果引入广告，我们会在广告上线前更新本政策，说明相关的 Cookie、标识符、数据处理方式和用户可选项。本页顶部的「最后更新」日期反映了最近一次修订的时间。",
        ],
      },
      {
        heading: "联系我们",
        paragraphs: [
          "有关本隐私政策的问题，可以通过我们的联系我们页面发送给我们，该页面说明了如何通过 GitHub 与我们取得联系。",
        ],
      },
    ],
  },
  terms: {
    title: "服务条款",
    metaDescription: "使用 FindOpenSource 开源目录时适用的条款。",
    lastUpdated: "最后更新：2026 年 9 月 15 日",
    sections: [
      {
        heading: "条款的接受",
        paragraphs: ["使用 FindOpenSource 即表示你同意本服务条款。如果你不同意，请不要使用本网站。"],
      },
      {
        heading: "关于 FindOpenSource",
        paragraphs: [
          "FindOpenSource 是一个免费的、由社区维护的目录及搜索工具，帮助你按照功能或要解决的问题来发现开源项目。这是一个没有用户账户、没有登录、也没有后端数据库的静态网站。",
        ],
      },
      {
        heading: "目录与项目信息",
        paragraphs: [
          "FindOpenSource 上的项目条目——包括名称、描述、分类、关键词和链接——由社区整理维护，并通过 GitHub Pull Request 进行审核。尽管我们力求准确，但这些信息仍可能不完整、过时或存在错误。在依赖这些信息之前，请务必通过项目自身的仓库和官方文档进行核实。",
        ],
      },
      {
        heading: "外部网站与第三方内容",
        paragraphs: [
          "FindOpenSource 链接到外部网站，包括由各自维护者或组织独立运营的 GitHub 仓库、官方项目网站和文档。我们不控制、不认可，也不对任何外部网站的内容、可用性或做法负责。",
        ],
      },
      {
        heading: "开源许可证",
        paragraphs: [
          "FindOpenSource 不拥有目录中列出的开源项目，也不对其进行许可或授予任何权利。每个项目均由其各自的作者或组织按照该条目中所示的许可证进行拥有和许可。在使用任何列出的项目之前，请查阅其实际许可证和官方仓库，以确认适用的条款。",
        ],
      },
      {
        heading: "准确性与可用性",
        paragraphs: [
          "FindOpenSource 按「现状」和「现有」基础提供。我们不保证本网站或其中包含的任何项目信息将是完整、准确、不中断或无错误的。",
        ],
      },
      {
        heading: "用户贡献",
        paragraphs: [
          "任何人都可以按照贡献页面所述，在 GitHub 上提交 Pull Request 或 Issue，为项目目录提出新增或修正建议。贡献在合并之前会由维护者进行审核，我们不保证任何特定贡献一定会被采纳，也不保证会在特定时间内被采纳。",
        ],
      },
      {
        heading: "知识产权",
        paragraphs: [
          "FindOpenSource 的代码库和网站基于 MIT 许可证开源，可在 GitHub 上查阅。目录中提及的项目名称、标志、商标和软件归各自所有者所有，仅用于标识目的；某个项目被列入目录，并不意味着其所有者对本站的认可或与本站存在关联。",
        ],
      },
      {
        heading: "禁止行为",
        paragraphs: [
          "你同意不滥用 FindOpenSource，例如不得试图干扰网站运行、以降低其他用户服务质量的方式抓取网站内容，或将网站用于传播非法或有害内容。",
        ],
      },
      {
        heading: "免责声明",
        paragraphs: [
          "对于本网站及其链接的开源项目，FindOpenSource 不作任何明示或暗示的保证，包括适销性、特定用途适用性或不侵权的保证。",
        ],
      },
      {
        heading: "责任限制",
        paragraphs: [
          "在法律允许的最大范围内，FindOpenSource 及其贡献者对因你使用本网站、依赖本网站信息，以及本网站所链接的任何第三方项目或网站相关问题而产生的任何损害概不负责。",
        ],
      },
      {
        heading: "条款的变更",
        paragraphs: [
          "随着网站的发展，我们可能会更新本服务条款。本页顶部的「最后更新」日期反映了最近一次修订的时间。变更生效后你继续使用本网站，即表示你接受更新后的条款。",
        ],
      },
      {
        heading: "联系我们",
        paragraphs: ["有关本服务条款的问题，可以通过我们的联系我们页面发送给我们。"],
      },
    ],
  },
  contact: {
    title: "联系我们",
    metaDescription: "如何就项目信息更正、许可问题或一般反馈联系 FindOpenSource。",
    intro:
      "FindOpenSource 是一个由社区维护的项目，没有专门的支持团队，但我们非常希望听到你的声音。联系我们最好的方式是通过 GitHub。",
    reasonsHeading: "以下情况欢迎与我们联系",
    reasons: [
      "某个项目的信息已过时、不正确或缺失",
      "发现链接失效",
      "对某个已列出项目的许可证或所有权存在疑虑",
      "希望更新或删除某个项目条目",
      "对如何为目录做出贡献有疑问",
      "隐私相关问题",
      "对网站的一般反馈意见",
    ],
    howHeading: "如何联系我们",
    howBody: "联系 FindOpenSource 最快捷的方式是在 GitHub 上提交一个 Issue，这会直接送达维护本项目的人员。",
    ctaLabel: "在 GitHub 上提交 Issue",
  },
};

export default dictionary;
