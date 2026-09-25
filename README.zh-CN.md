# FindOpenSource

[English](README.md) · **简体中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Deutsch](README.de.md)

按功能、技术和分类发现开源项目 — 支持英语、简体中文、日语、韩语、西班牙语和德语。

**[findoss.dev](https://findoss.dev)**

## 什么是 FindOpenSource？

大多数开源目录都假设你已经知道自己要找的项目。FindOpenSource 从一个不同的问题出发：

> **"我可以用什么开源项目来实现这个功能？"**

搜索"身份验证"、"聊天"、"CMS"、"向量数据库"或"网页抓取"，就能得到一份经过筛选的开源项目列表 —
并附带许可证、开发语言、链接等信息，方便你快速评估。

FindOpenSource 是一个完全静态、由社区共同维护的目录。没有登录、没有数据库、也没有后端服务。
每个项目都是一个纯 JSON 文件，通过 GitHub 拉取请求（Pull Request）审核并合并。

## 功能特性

- **以功能为先的搜索** — 按你想构建的功能搜索，而不仅仅是项目名称。
- **相关度排序结果** — 名称、关键词、分类、语言和描述的匹配都会被加权并排序，支持多词查询。
- **多语言搜索** — 可以用支持的 6 种语言中任意一种搜索；"登录"、"ログイン" 这类口语化查询会在
  后台自动扩展为对应的标准英文关键词。
- **可分享的搜索 URL** — 每次搜索都是一个真实的 URL（`/zh-CN/search?q=authentication`）。
- **分类浏览** — 从 AI 到 DevOps，共 20 个精心整理的分类。
- **静态且快速** — 基于 Next.js App Router 构建；每个本地化的项目和分类页面都在构建时静态生成。
- **对 SEO 友好** — 每个页面都具备本地化元数据、OpenGraph、hreflang 备用链接、JSON-LD、站点地图
  和 canonical URL。

## 支持的语言

| Locale  | Language           |
| ------- | ------------------ |
| `en`    | English (默认)     |
| `zh-CN` | Simplified Chinese |
| `ja`    | Japanese           |
| `ko`    | Korean             |
| `es`    | Spanish            |
| `de`    | German             |

每个路由都会带上语言前缀：

```text
/en
/en/projects/supabase
/en/categories/authentication
/en/search?q=authentication

/zh-CN
/zh-CN/projects/supabase
/zh-CN/categories/authentication
/zh-CN/search?q=身份验证
```

访问不带语言前缀的 URL（例如 `/projects/supabase`，或单纯的 `/`）会 308 重定向到默认语言
`/en` 下的同一路径 —— 不会根据浏览器语言自动跳转，这样爬取和分享链接的结果始终可预测。页头处
的简洁语言切换器可以在保留当前页面和搜索词的情况下切换语言。

## 搜索

搜索会匹配项目的 `name`、`keywords`、`categories`、`languages` 和 `description` 字段，每个
字段的权重不同（名称和关键词匹配的权重最高）。像 `image upload` 这样的多词查询会被拆分为独立
词元分别计分，同时匹配*所有*词元的项目会获得覆盖率加分 —— 因此搜索 `vector database` 时，
Milvus 和 Qdrant 的排名仍会高于普通数据库。具体评分实现见 [`lib/search.ts`](lib/search.ts)。

在此之上，还有一层查询扩展逻辑（见下方[多语言关键词](#多语言关键词)），会把口语化或非英语查询
转换为相同的标准关键词，其权重低于直接匹配 —— 因此同义词只会*帮助*结果排序，绝不会超过精确匹配。

## 分类

AI 与机器学习 · 身份验证与安全 · 后端 · 数据库 · API · CMS · 聊天与消息 · 开发者工具 · UI 与
组件 · 分析 · 存储 · 自动化 · DevOps · 搜索 · 监控 · 电子商务 · 支付 · 媒体 · 测试 · 移动端

分类 **slug** 是固定不变的，不会被翻译（是 `/zh-CN/categories/authentication`，而不是
`/zh-CN/categories/身份验证`）—— 只有显示的名称/描述会被本地化。标准（英文）列表见
[`data/categories.json`](data/categories.json)，翻译后的名称/描述见
[`lib/i18n/dictionaries/`](lib/i18n/dictionaries/)。

## 翻译

- **界面文案**（导航、按钮、标题、空状态提示、About/Contribute 页面等）位于
  [`lib/i18n/dictionaries/`](lib/i18n/dictionaries/) 下，每种语言一个文件，全部实现同一个
  [`Dictionary`](lib/i18n/types.ts) TypeScript 接口 —— 因此任何语言缺失某个 key 都会在
  编译期报错，而不是在运行时显示空字符串。
- **项目数据**始终保存在每个项目一个的标准（英文）JSON 文件中。项目可以选择性地添加一个
  `translations` 对象，为各语言提供翻译后的 `description`/`keywords`；缺失翻译时始终回退到
  英文。详见 [CONTRIBUTING.md](CONTRIBUTING.md#adding-translated-descriptions-optional)。
- **分类名称/描述**已在每个字典文件中完整翻译（与开放式的项目列表不同，分类是一套由维护者
  精心管理的小型分类体系）。

### 多语言关键词

[`lib/i18n/keyword-taxonomy.ts`](lib/i18n/keyword-taxonomy.ts) 将各语言的自然语言同义词
（例如 `authentication` ← `login`、`로그인`、`ログイン`、`inicio de sesión`、`anmeldung` 等）
映射到 `data/projects/*.json` 中实际使用的标准关键词，并提供一份需要提升权重的相关词列表
（`oauth`、`sso`、`jwt` 等）。`lib/search.ts` 会在评分前，先用这份 taxonomy 扩展用户的查询。
要添加新的搜索意图，只需新增一个条目（或为已有条目新增一种语言）即可，无需修改搜索算法本身。

### 添加新语言

1. 在 [`lib/i18n/config.ts`](lib/i18n/config.ts) 的 `locales` 中添加该语言（名称、本地语言
   名称、BCP 47 标签、OpenGraph locale）。
2. 在 `lib/i18n/dictionaries/` 下添加一个实现 `Dictionary` 接口的新字典文件（TypeScript 会
   标出任何缺失的 key），并在 `get-dictionary.ts` 中注册它。
3. 在新字典的 `categories` 字段中，为全部 20 个 slug 添加分类翻译。
4. 可选：在 `keyword-taxonomy.ts` 中为新语言添加同义词。
5. 运行 `npm run build` —— 新语言的静态路由会根据 `locales`、`data/projects/` 和
   `data/categories.json` 自动生成，无需修改其他任何内容。

## 参与贡献

任何人都可以通过 GitHub 拉取请求添加项目 —— 详见 [CONTRIBUTING.md](CONTRIBUTING.md) 中的
分步指南（第一次提交 PR 大约需要 5 分钟）。翻译完全是可选的；英文是标准且必需的基线。
不熟悉编辑 JSON？可以改为[提交一个 issue](../../issues/new?template=add-project.yml)。

## 开发

```bash
npm install        # 安装依赖
npm run dev         # 在 http://localhost:3000/en 启动本地开发服务器
npm run lint         # 对代码库进行 lint 检查
npm run typecheck    # 运行 TypeScript 编译器
npm run validate     # 校验 data/projects/ 下的所有项目数据
npm run build         # 生产环境构建
```

## 项目结构

```text
app/
  [locale]/            按语言划分的路由（根布局也在这里 —— 每种语言各自的 <html lang>）
    page.tsx             首页
    search/              搜索结果 (/[locale]/search?q=...)
    projects/[slug]/     项目详情页
    categories/[slug]/   分类页
    about/, contribute/  静态内容页
    not-found.tsx        本地化的 404 页面
  sitemap.ts, robots.ts  顶层 SEO 端点（与语言无关的 URL）
middleware.ts          为不带语言前缀的路径加上默认语言前缀（不做浏览器语言自动跳转）
components/           可复用的 UI 组件（感知语言/字典）+ LanguageSwitcher
data/
  projects/*.json        每个项目一个标准文件；可选的按语言 `translations`
  categories.json         标准（英文）分类定义；固定 slug
lib/
  schema.ts               项目与分类的 Zod schema
  projects.ts, categories.ts   支持语言感知解析 + 回退的数据加载器
  search.ts                按相关度排序、语言感知的搜索
  i18n/
    config.ts               语言列表、默认语言、BCP 47 / OpenGraph 元数据
    types.ts                 字典接口（必需 UI 文案的唯一标准）
    dictionaries/            每种语言一个字典文件
    get-dictionary.ts        语言 → 字典查询
    metadata.ts              hreflang / canonical / OpenGraph locale 辅助函数
    keyword-taxonomy.ts       多语言搜索同义词 taxonomy
    format.ts                 {placeholder} 插值 + 复数处理辅助函数
scripts/
  validate-projects.ts     数据校验，在 CI 中运行
.github/               Issue/PR 模板与校验工作流
```

## 路线图

- [ ] 在初始精选集之外继续扩充项目目录
- [ ] 随着目录的增长，添加更细粒度的子分类
- [ ] 在最初的旗舰项目集之外翻译更多项目描述
- [ ] 支持更多语言（`fr`、`pt-BR`、`hi`、`ru` 等）
- [ ] 接入 Google AdSense（布局中已预留广告位）
- [ ] 项目 Logo / 图标

## 许可证

[MIT](LICENSE)
