import type { Dictionary } from "../types";

const dictionary: Dictionary = {
  skipToContent: "본문으로 건너뛰기",
  adSlotLabel: "광고",
  nav: {
    categories: "카테고리",
    contribute: "기여하기",
    github: "GitHub",
    support: "후원",
  },
  languageSwitcher: {
    label: "언어 선택",
  },
  footer: {
    tagline: "프로젝트 데이터는 GitHub에서 커뮤니티가 관리합니다.",
    about: "소개",
    contribute: "기여하기",
    github: "GitHub",
    support: "FindOpenSource 후원하기",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    contact: "문의",
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
    supportHeading: "FindOpenSource가 도움이 되셨나요?",
    supportBody: "더 많은 오픈소스 프로젝트를 발견할 수 있도록 GitHub Sponsors로 FindOpenSource를 후원해주세요.",
    supportCta: "FindOpenSource 후원하기",
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
    supportHeading: "FindOpenSource 후원",
    supportBody: "FindOpenSource는 앞으로도 계속 무료로 제공됩니다. 원하는 프로젝트를 찾는 데 도움이 되셨다면 ",
    supportCta: "GitHub Sponsors",
    supportBodySuffix: "에서 운영을 지원하실 수 있습니다.",
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
  support: {
    title: "FindOpenSource 후원하기",
    metaDescription:
      "GitHub Sponsors를 통해 FindOpenSource를 후원하고, 프로젝트 큐레이션과 검색 개선, 다국어 콘텐츠 제작을 지속할 수 있도록 도와주세요.",
    intro:
      "FindOpenSource는 개발자가 프로젝트 이름이 아니라 해결하려는 문제를 기준으로 오픈소스 프로젝트를 찾을 수 있도록 돕습니다. 로그인도, 광고도 없는 무료 커뮤니티 큐레이션 디렉터리입니다.",
    whyHeading: "후원이 도움이 되는 이유",
    whyIntro: "후원금은 FindOpenSource를 운영하는 다음과 같은 활동에 사용됩니다:",
    whyItems: [
      "프로젝트 데이터를 정확하고 최신 상태로 유지",
      "새로운 오픈소스 프로젝트를 카탈로그에 추가",
      "여러 언어에 걸친 검색 taxonomy 개선",
      "다국어 콘텐츠 확장 및 다듬기",
      "사이트 일반 유지보수",
      "성능 및 SEO 개선",
    ],
    howHeading: "후원 방법",
    howBody:
      "FindOpenSource는 자체적으로 결제를 처리하지 않습니다. 후원은 GitHub의 공식 후원 플랫폼인 GitHub Sponsors를 통해 이루어지며, 아래 버튼을 누르면 GitHub Sponsors 페이지로 이동합니다.",
    ctaLabel: "GitHub Sponsors에서 후원하기",
    ctaAriaLabel: "GitHub Sponsors에서 FindOpenSource 후원하기 (새 탭에서 열림)",
  },
  privacy: {
    title: "개인정보처리방침",
    metaDescription: "FindOpenSource가 정보, 쿠키, 제3자 서비스, 외부 링크를 어떻게 다루는지 안내합니다.",
    lastUpdated: "최종 업데이트: 2026년 9월 15일",
    sections: [
      {
        heading: "소개",
        paragraphs: [
          "FindOpenSource(이하 'FindOpenSource', '저희')는 문제 해결 방식을 기준으로 오픈소스 프로젝트를 찾을 수 있도록 돕는 무료 커뮤니티 관리 디렉터리입니다. 이 개인정보처리방침은 이 웹사이트를 이용할 때 어떤 정보가 관련되는지, 그리고 그 정보가 어떻게 다뤄지는지 설명합니다.",
          "FindOpenSource는 그 자체로 오픈소스 프로젝트입니다. 이 방침을 포함한 전체 코드베이스는 GitHub에 공개되어 있습니다.",
        ],
      },
      {
        heading: "수집하는 정보",
        paragraphs: [
          "FindOpenSource는 사이트를 이용하는 데 계정, 로그인, 회원가입을 요구하지 않습니다. 별도의 데이터베이스나 백엔드 서비스도 운영하지 않으며, 사이트 전체가 정적 파일로 구성되어 있습니다.",
          "이름, 이메일 주소, 결제 정보와 같은 개인정보를 사이트 어디에서도 요청하지 않습니다.",
        ],
      },
      {
        heading: "정보 이용 방식",
        paragraphs: [
          "FindOpenSource는 사이트 자체를 통해 개인정보를 수집하지 않으므로, 저희가 이용하거나 판매하거나 공유할 사용자 제출 데이터가 존재하지 않습니다.",
        ],
      },
      {
        heading: "검색어 및 이용 정보",
        paragraphs: [
          "FindOpenSource에서 검색하면 입력한 검색어는 URL 파라미터(예: /search?q=database)로 전달되어, 페이지가 렌더링되는 시점에 사이트의 로컬 프로젝트 카탈로그와 매칭됩니다. FindOpenSource는 검색어를 별도의 데이터베이스에 기록하거나 저장하거나 분석하지 않습니다.",
          "거의 모든 웹사이트와 마찬가지로, 호스팅 인프라는 보안 및 운영 목적으로 IP 주소, 브라우저 종류, 요청 시각과 같은 기본적인 기술 정보를 자동으로 기록할 수 있습니다. 이는 일반적인 웹 서버의 동작 방식이며, FindOpenSource의 애플리케이션 코드가 별도로 수집하거나 처리하는 정보가 아닙니다.",
        ],
      },
      {
        heading: "쿠키 및 유사 기술",
        paragraphs: [
          "FindOpenSource는 현재 자체 쿠키를 설정하지 않으며, 방문자를 추적하거나 식별하기 위해 localStorage나 sessionStorage를 사용하지 않습니다.",
          "향후 광고 도입 등의 이유로 이 부분이 변경될 경우, 정확히 어떤 기술이 왜 사용되는지 이 섹션을 업데이트하여 안내하겠습니다.",
        ],
      },
      {
        heading: "제3자 서비스",
        paragraphs: [
          "이 사이트는 프로젝트 소스 코드, 이슈, Pull Request를 위한 GitHub, 그리고 (설정된 경우) 후원 링크를 위한 GitHub Sponsors 등 제3자 서비스로 연결됩니다. 이들 서비스는 자체 개인정보처리방침을 가지고 있으며, 해당 서비스와의 상호작용은 이 방침이 아닌 각 서비스의 정책을 따릅니다.",
          "이 사이트는 제3자 호스팅 플랫폼의 인프라에서 호스팅되며, 해당 플랫폼은 사이트를 전달하는 과정에서 일반적인 기술적 요청 데이터를 처리할 수 있습니다.",
        ],
      },
      {
        heading: "외부 링크",
        paragraphs: [
          "프로젝트 페이지는 GitHub 저장소, 공식 프로젝트 웹사이트, 문서와 같은 외부 리소스로 연결됩니다. 이들은 FindOpenSource가 아니라 각 오픈소스 프로젝트나 조직이 운영합니다. 저희는 외부 사이트의 콘텐츠나 개인정보 처리 방식에 대해 책임지지 않으며, 해당 사이트의 정책을 직접 확인하시길 권장합니다.",
        ],
      },
      {
        heading: "오픈소스 프로젝트 정보",
        paragraphs: [
          "FindOpenSource에 표시되는 프로젝트 이름, 설명, 저장소 링크 등의 정보는 각 오픈소스 프로젝트에 대해 공개적으로 확인 가능한 정보를 바탕으로 하며, GitHub Pull Request를 통해 커뮤니티가 큐레이션합니다. 이 정보는 방문자인 사용자가 아니라 프로젝트 자체에 관한 것입니다.",
        ],
      },
      {
        heading: "데이터 보관",
        paragraphs: [
          "FindOpenSource는 사이트를 통해 개인정보를 수집하지 않으므로, 별도의 사용자 데이터 보관 기간이 존재하지 않습니다. 호스팅 인프라에서 생성되는 기술 로그는 FindOpenSource의 통제 범위 밖에서 해당 제공업체의 자체 정책에 따라 보관됩니다.",
        ],
      },
      {
        heading: "데이터 보안",
        paragraphs: [
          "FindOpenSource는 데이터베이스, 사용자 계정, 개인정보를 수집하는 양식이 전혀 없는 정적 사이트로, 이러한 구조 자체가 방문자 정보 노출 가능성을 제한합니다.",
        ],
      },
      {
        heading: "개인정보 관련 권리",
        paragraphs: [
          "거주 지역에 따라 관련 데이터 보호 법률에 의해 자신에 대해 수집된 정보를 알 권리나 삭제를 요청할 권리 등이 있을 수 있습니다. FindOpenSource는 사이트 자체를 통해 개인정보를 의도적으로 수집하지 않으므로, 일반적으로 이러한 요청에 해당하는 개인정보가 보관되어 있지 않습니다. 개인정보와 관련한 질문이나 우려 사항이 있으면 문의 페이지를 통해 연락해 주세요.",
        ],
      },
      {
        heading: "해외 이용자",
        paragraphs: [
          "FindOpenSource는 영어, 중국어 간체, 일본어, 한국어, 스페인어, 독일어로 제공되며 여러 국가의 이용자가 접속합니다. 이 방침은 저희의 일반적인 관행을 설명하기 위한 것이며, 특정 관할권에 대한 법률 자문을 대신하지 않습니다. FindOpenSource는 특정 데이터 보호 프레임워크에 대한 인증을 받았다고 주장하지 않습니다.",
        ],
      },
      {
        heading: "아동의 개인정보 보호",
        paragraphs: [
          "FindOpenSource는 아동을 대상으로 하지 않으며, 아동으로부터 의도적으로 개인정보를 수집하지 않습니다. 아동이 이 사이트를 통해 개인정보를 제공했다고 판단되는 경우, 저희에게 알려주시면 조치하겠습니다.",
        ],
      },
      {
        heading: "이 개인정보처리방침의 변경",
        paragraphs: [
          "사이트가 발전함에 따라 이 방침을 업데이트할 수 있습니다. FindOpenSource는 향후 Google AdSense와 같은 광고 서비스를 도입할 수 있습니다. 광고가 도입될 경우, 시행 전에 관련 쿠키, 식별자, 데이터 처리 방식, 사용자 선택 옵션을 설명하도록 이 방침을 업데이트하겠습니다. 이 페이지 상단의 '최종 업데이트' 날짜는 가장 최근 개정 시점을 나타냅니다.",
        ],
      },
      {
        heading: "문의",
        paragraphs: [
          "이 개인정보처리방침에 대한 질문은 문의 페이지를 통해 보내주세요. GitHub를 통해 연락하는 방법을 안내하고 있습니다.",
        ],
      },
    ],
  },
  terms: {
    title: "이용약관",
    metaDescription: "FindOpenSource 오픈소스 디렉터리 이용 시 적용되는 약관입니다.",
    lastUpdated: "최종 업데이트: 2026년 9월 15일",
    sections: [
      {
        heading: "약관 동의",
        paragraphs: ["FindOpenSource를 이용함으로써 본 이용약관에 동의하는 것으로 간주됩니다. 동의하지 않으시면 사이트를 이용하지 말아 주세요."],
      },
      {
        heading: "FindOpenSource 소개",
        paragraphs: [
          "FindOpenSource는 기능이나 해결하려는 문제를 기준으로 오픈소스 프로젝트를 찾을 수 있게 해주는 무료 커뮤니티 관리 디렉터리이자 검색 도구입니다. 사용자 계정, 로그인, 백엔드 데이터베이스가 없는 정적 웹사이트입니다.",
        ],
      },
      {
        heading: "디렉터리 및 프로젝트 정보",
        paragraphs: [
          "이름, 설명, 카테고리, 키워드, 링크를 포함한 FindOpenSource의 프로젝트 항목은 커뮤니티가 큐레이션하고 GitHub Pull Request를 통해 검토됩니다. 정확성을 위해 노력하지만, 이 정보는 불완전하거나 오래되었거나 오류를 포함할 수 있습니다. 이용하시기 전에 항상 해당 프로젝트의 저장소와 공식 문서를 통해 정보를 확인해 주세요.",
        ],
      },
      {
        heading: "외부 웹사이트 및 제3자 콘텐츠",
        paragraphs: [
          "FindOpenSource는 GitHub 저장소, 공식 프로젝트 사이트, 문서 등 각 유지관리자나 조직이 독립적으로 운영하는 외부 웹사이트로 연결됩니다. 저희는 외부 사이트의 콘텐츠, 가용성, 정책을 통제하거나 보증하거나 책임지지 않습니다.",
        ],
      },
      {
        heading: "오픈소스 라이선스",
        paragraphs: [
          "FindOpenSource는 디렉터리에 등재된 오픈소스 프로젝트를 소유하거나, 라이선스를 부여하거나, 어떠한 권리도 부여하지 않습니다. 각 프로젝트는 해당 프로젝트 항목에 표시된 라이선스에 따라 각 저작자나 조직이 소유하고 라이선스를 부여합니다. 등재된 프로젝트를 이용하기 전에 실제 라이선스와 공식 저장소를 확인해 적용되는 조건을 확인해 주세요.",
        ],
      },
      {
        heading: "정확성 및 이용 가능성",
        paragraphs: [
          "FindOpenSource는 '있는 그대로' 및 '이용 가능한 상태로' 제공됩니다. 저희는 사이트나 사이트에 포함된 프로젝트 정보가 완전하거나, 정확하거나, 중단 없이, 오류 없이 제공될 것을 보증하지 않습니다.",
        ],
      },
      {
        heading: "사용자 기여",
        paragraphs: [
          "누구나 기여하기 페이지에 설명된 대로 GitHub에서 Pull Request나 이슈를 열어 프로젝트 카탈로그에 추가나 수정을 제안할 수 있습니다. 기여는 병합되기 전에 관리자가 검토하며, 특정 기여가 반드시 승인되거나 특정 기간 내에 승인된다는 보장은 하지 않습니다.",
        ],
      },
      {
        heading: "지식재산권",
        paragraphs: [
          "FindOpenSource의 코드베이스와 웹사이트는 MIT 라이선스에 따라 오픈소스로 공개되어 있으며 GitHub에서 확인할 수 있습니다. 디렉터리에서 언급되는 프로젝트 이름, 로고, 상표, 소프트웨어는 각 소유자에게 귀속되며 식별 목적으로만 사용됩니다. 프로젝트가 등재되어 있다고 해서 해당 소유자의 보증이나 제휴를 의미하지는 않습니다.",
        ],
      },
      {
        heading: "금지된 이용",
        paragraphs: [
          "사이트를 방해하려는 시도, 다른 이용자의 서비스 품질을 저하시키는 방식의 스크래핑, 불법적이거나 유해한 콘텐츠를 배포하는 용도로 사용하는 등 FindOpenSource를 오용하지 않을 것에 동의합니다.",
        ],
      },
      {
        heading: "면책 조항",
        paragraphs: [
          "FindOpenSource는 사이트나 사이트가 링크하는 오픈소스 프로젝트에 대해 상품성, 특정 목적에의 적합성, 비침해에 대한 보증을 포함하여 명시적이든 묵시적이든 어떠한 보증도 하지 않습니다.",
        ],
      },
      {
        heading: "책임의 제한",
        paragraphs: [
          "법률이 허용하는 최대 범위 내에서, FindOpenSource와 기여자는 사이트 이용이나 사이트에서 발견한 정보에 대한 신뢰, 그리고 사이트가 링크하는 제3자 프로젝트나 웹사이트와 관련된 문제로 인해 발생하는 어떠한 손해에 대해서도 책임지지 않습니다.",
        ],
      },
      {
        heading: "약관의 변경",
        paragraphs: [
          "사이트가 발전함에 따라 이 이용약관을 업데이트할 수 있습니다. 이 페이지 상단의 '최종 업데이트' 날짜는 가장 최근 개정 시점을 나타냅니다. 변경 사항이 적용된 이후 사이트를 계속 이용하시면 변경된 약관에 동의하는 것으로 간주됩니다.",
        ],
      },
      {
        heading: "문의",
        paragraphs: ["이 이용약관에 대한 질문은 문의 페이지를 통해 보내주세요."],
      },
    ],
  },
  contact: {
    title: "문의",
    metaDescription: "프로젝트 정보 수정, 라이선스 관련 우려, 일반적인 의견 등을 FindOpenSource에 전달하는 방법입니다.",
    intro:
      "FindOpenSource는 전담 지원팀이 없는 커뮤니티 관리 프로젝트지만, 여러분의 의견을 듣고 싶습니다. 가장 좋은 연락 방법은 GitHub를 통하는 것입니다.",
    reasonsHeading: "이런 이유로 연락해 주세요",
    reasons: [
      "프로젝트 정보가 오래되었거나, 잘못되었거나, 누락된 경우",
      "링크가 깨진 경우",
      "등재된 프로젝트의 라이선스나 소유권 관련 우려 사항",
      "프로젝트 항목의 업데이트나 삭제 요청",
      "디렉터리 기여에 관한 질문",
      "개인정보 관련 질문",
      "사이트에 대한 일반적인 의견",
    ],
    howHeading: "연락 방법",
    howBody: "FindOpenSource에 가장 빠르게 연락하는 방법은 GitHub에서 이슈를 여는 것입니다. 프로젝트를 관리하는 담당자에게 바로 전달됩니다.",
    ctaLabel: "GitHub에서 이슈 열기",
  },
};

export default dictionary;
