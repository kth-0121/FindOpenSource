import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "跳至内容",
  adSlotLabel: "广告",
  nav: {
    categories: "分类",
    contribute: "贡献",
    github: "GitHub",
  },
  languageSwitcher: {
    label: "选择语言",
  },
  footer: {
    tagline: "项目数据由社区在 GitHub 上维护。",
    about: "关于",
    contribute: "贡献",
    github: "GitHub",
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
  },
  categoriesPage: {
    title: "分类",
    description: "按功能或技术浏览开源项目。",
  },
  categoryDetail: {
    backLink: "全部分类",
    emptyMessage: "该分类下暂无项目。",
    addOneLink: "添加一个",
  },
  projectsPage: {
    title: "全部项目",
    descriptionOne: "由社区精选和维护的 {count} 个开源项目。",
    descriptionOther: "由社区精选和维护的 {count} 个开源项目。",
  },
  projectDetail: {
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
};

export default dictionary;
