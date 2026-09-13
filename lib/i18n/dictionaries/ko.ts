import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "본문으로 건너뛰기",
  adSlotLabel: "광고",
  nav: {
    categories: "카테고리",
    contribute: "기여하기",
    github: "GitHub",
  },
  languageSwitcher: {
    label: "언어 선택",
  },
  footer: {
    tagline: "프로젝트 데이터는 GitHub에서 커뮤니티가 관리합니다.",
    about: "소개",
    contribute: "기여하기",
    github: "GitHub",
  },
  home: {
    heroTitleLine1: "프로젝트에 꼭 맞는",
    heroTitleLine2: "오픈소스를 찾아보세요.",
    heroSubtitle: "기능, 기술, 카테고리로 오픈소스 프로젝트를 검색하세요.",
    searchPlaceholder: "기능, 기술 또는 카테고리로 검색",
    popularSearchesLabel: "인기 검색어",
    popularSearches: ["인증", "채팅", "데이터베이스", "이미지 업로드", "CMS", "AI"],
    browseCategories: "카테고리 둘러보기",
    viewAll: "전체 보기",
    popularOpenSource: "인기 오픈소스",
    recentlyAdded: "최근 추가된 프로젝트",
  },
  search: {
    inputLabel: "오픈소스 프로젝트 검색",
    submitLabel: "검색",
    resultsCountOne: '"{query}" 검색 결과 {count}건',
    resultsCountOther: '"{query}" 검색 결과 {count}건',
    noResultsTitle: '"{query}"에 대한 검색 결과가 없습니다.',
    noResultsSuggestion: "대신 이런 검색어는 어떠세요?",
    pageTitle: "검색",
    pageDescription: "기능, 기술 또는 카테고리로 오픈소스 프로젝트를 검색하세요.",
    startHeading: "오픈소스 프로젝트 검색하기",
    relatedSearchesLabel: "이런 검색어도 찾아보세요",
    relatedCategoryLabel: "관련 카테고리",
  },
  categories: {
    ai: {
      name: "AI 및 머신러닝",
      description: "오픈소스 머신러닝 프레임워크, 대규모 언어 모델, AI 인프라입니다.",
    },
    authentication: {
      name: "인증 및 보안",
      description: "오픈소스 인증, 아이덴티티, 보안 도구입니다.",
    },
    backend: {
      name: "백엔드",
      description: "애플리케이션 구축을 위한 백엔드 플랫폼과 BaaS 도구입니다.",
    },
    database: {
      name: "데이터베이스",
      description: "관계형, 문서형, 벡터, 인메모리 데이터베이스입니다.",
    },
    api: {
      name: "API",
      description: "API를 구축, 노출, 관리하는 도구입니다.",
    },
    cms: {
      name: "CMS",
      description: "헤드리스 및 전통적인 콘텐츠 관리 시스템입니다.",
    },
    chat: {
      name: "채팅 및 메시징",
      description: "팀 채팅, 메시징, 실시간 커뮤니케이션 플랫폼입니다.",
    },
    "developer-tools": {
      name: "개발자 도구",
      description: "개발자가 소프트웨어를 빌드, 테스트, 배포하도록 돕는 도구입니다.",
    },
    ui: {
      name: "UI 및 컴포넌트",
      description: "인터페이스 구축을 위한 컴포넌트 라이브러리와 디자인 시스템입니다.",
    },
    analytics: {
      name: "분석",
      description: "웹 및 제품 분석 플랫폼입니다.",
    },
    storage: {
      name: "스토리지",
      description: "오브젝트 스토리지, 파일 동기화, 셀프 호스팅 스토리지 시스템입니다.",
    },
    automation: {
      name: "자동화",
      description: "워크플로 자동화 및 노코드·로우코드 통합 도구입니다.",
    },
    devops: {
      name: "DevOps",
      description: "인프라, 오케스트레이션, 배포 도구입니다.",
    },
    search: {
      name: "검색",
      description: "전문 검색 및 검색 엔진 인프라입니다.",
    },
    monitoring: {
      name: "모니터링",
      description: "옵저버빌리티, 메트릭, 로깅, 에러 트래킹 도구입니다.",
    },
    ecommerce: {
      name: "이커머스",
      description: "오픈소스 커머스 및 스토어프론트 플랫폼입니다.",
    },
    payments: {
      name: "결제",
      description: "오픈소스 결제 처리 및 빌링 인프라입니다.",
    },
    media: {
      name: "미디어",
      description: "미디어 서버, 스트리밍, 문서·미디어 처리 도구입니다.",
    },
    testing: {
      name: "테스팅",
      description: "테스팅 프레임워크와 브라우저 자동화 도구입니다.",
    },
    mobile: {
      name: "모바일",
      description: "크로스플랫폼 모바일 앱을 만들기 위한 프레임워크입니다.",
    },
  },
  categoriesPage: {
    title: "카테고리",
    description: "기능이나 기술별로 분류된 오픈소스 프로젝트를 둘러보세요.",
  },
  categoryDetail: {
    backLink: "전체 카테고리",
    emptyMessage: "아직 이 카테고리에 프로젝트가 없습니다.",
    addOneLink: "프로젝트 추가하기",
  },
  projectsPage: {
    title: "전체 프로젝트",
    descriptionOne: "커뮤니티가 큐레이션하고 관리하는 오픈소스 프로젝트 {count}개입니다.",
    descriptionOther: "커뮤니티가 큐레이션하고 관리하는 오픈소스 프로젝트 {count}개입니다.",
  },
  projectDetail: {
    overviewHeading: "개요",
    githubButton: "GitHub",
    websiteButton: "웹사이트",
    documentationButton: "문서",
    categoriesLabel: "카테고리",
    keywordsLabel: "키워드",
    languagesLabel: "언어",
    licenseLabel: "라이선스",
    relatedProjects: "관련 프로젝트",
    spottedError: "잘못된 정보를 발견하셨나요? ",
    suggestEditLink: "GitHub에서 수정 제안하기",
    suggestEditSuffix: "",
  },
  about: {
    title: "FindOpenSource 소개",
    intro:
      "대부분의 오픈소스 디렉터리는 찾고자 하는 프로젝트의 이름을 이미 알고 있다고 가정합니다. FindOpenSource는 다른 질문에서 출발합니다:",
    questionQuote: "이 기능을 만드는 데 어떤 오픈소스를 쓸 수 있을까?",
    paragraph2:
      "이름이 아니라 만들고 싶은 것 — 인증, 채팅 기능, CMS, 벡터 데이터베이스 — 을 기준으로 검색하고, 이를 빠르게 비교하고 평가할 수 있는 정보와 함께 관련 오픈소스 프로젝트 목록을 확인하세요.",
    howItWorksHeading: "작동 방식",
    howItWorksBody:
      "FindOpenSource는 완전한 정적 오픈소스 디렉터리입니다. 로그인도, 데이터베이스도, 별도의 백엔드 서비스도 없습니다 — 모든 프로젝트는 GitHub Pull Request로 검토되고 병합되는 단순한 JSON 파일입니다. 덕분에 프로젝트는 단순하고 투명하며 기여하기 쉽습니다.",
    contributingHeading: "기여하기",
    contributingBody: "누구나 Pull Request를 통해 프로젝트를 추가할 수 있습니다. ",
    contributingLinkText: "기여 가이드 보기",
    contributingLinkSuffix: "에서 시작해보세요.",
  },
  contribute: {
    title: "프로젝트 기여하기",
    intro:
      "FindOpenSource는 커뮤니티가 관리합니다. 누구나 GitHub Pull Request를 통해 새로운 오픈소스 프로젝트를 추가할 수 있으며, JSON 파일 편집 이상의 코딩 경험은 필요하지 않습니다.",
    steps: [
      {
        title: "저장소 포크하기",
        description: "GitHub에서 FindOpenSource를 포크하고 로컬에 클론하세요.",
      },
      {
        title: "프로젝트 파일 추가하기",
        description: "data/projects/ 아래에 프로젝트 slug 이름으로 된 JSON 파일을 새로 만드세요.",
      },
      {
        title: "정보 입력하기",
        description: "프로젝트 이름, 설명, GitHub 저장소, 카테고리, 키워드, 라이선스를 입력하세요.",
      },
      {
        title: "검증하기",
        description: "로컬에서 npm run validate를 실행해 파일이 모든 검사를 통과하는지 확인하세요.",
      },
      {
        title: "Pull Request 열기",
        description: "Pull Request를 제출하세요. GitHub Actions가 자동으로 검증합니다.",
      },
    ],
    readContributing: "CONTRIBUTING.md 읽기",
    suggestViaIssue: "Issue로 프로젝트 제안하기",
    preferNotToEdit: "코드 편집이 부담스러우신가요? 대신 ",
    issueLinkText: "Issue",
    preferNotToEditSuffix: "를 열어주시면 누군가 대신 추가해드릴게요.",
  },
  notFound: {
    title: "페이지를 찾을 수 없습니다",
    description: "찾으시는 페이지가 존재하지 않거나 이동되었을 수 있습니다.",
    backHome: "홈으로 돌아가기",
  },
};

export default dictionary;
