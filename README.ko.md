# FindOpenSource

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · **한국어** · [Español](README.es.md) · [Deutsch](README.de.md)

기능, 기술, 카테고리별로 오픈소스 프로젝트를 찾아보세요 — 영어, 중국어(간체), 일본어, 한국어,
스페인어, 독일어를 지원합니다.

**[findoss.dev](https://findoss.dev)**

## FindOpenSource란?

대부분의 오픈소스 디렉터리는 사용자가 이미 찾는 프로젝트를 알고 있다고 가정합니다.
FindOpenSource는 다른 질문에서 출발합니다:

> **"이 기능을 만들려면 어떤 오픈소스를 쓸 수 있을까?"**

"인증", "채팅", "CMS", "벡터 데이터베이스", "웹 스크래핑" 같은 키워드로 검색하면, 그 문제를
해결하는 오픈소스 프로젝트 목록을 큐레이션해서 보여줍니다 — 빠르게 판단할 수 있도록 라이선스,
언어, 링크 같은 정보도 함께 제공합니다.

FindOpenSource는 완전히 정적이고 커뮤니티가 함께 관리하는 디렉터리입니다. 로그인도, 데이터베이스도,
백엔드 서버도 없습니다. 모든 프로젝트는 하나의 JSON 파일이며, GitHub 풀 리퀘스트를 통해 검토되고
병합됩니다.

## 주요 기능

- **기능 중심 검색** — 프로젝트 이름이 아니라 만들고 싶은 것을 기준으로 검색합니다.
- **관련도 기반 정렬** — 이름, 키워드, 카테고리, 언어, 설명 일치를 가중치로 계산해 정렬하며,
  여러 단어로 된 검색어도 지원합니다.
- **다국어 검색** — 지원하는 6개 언어 어디로든 검색할 수 있습니다. "로그인", "ログイン" 같은
  구어체 검색어도 내부적으로 표준 영어 키워드로 확장됩니다.
- **공유 가능한 검색 URL** — 모든 검색 결과는 실제 URL입니다 (`/ko/search?q=인증`).
- **카테고리 탐색** — AI부터 DevOps까지 20개의 큐레이션된 카테고리.
- **정적이고 빠름** — Next.js App Router로 빌드되어, 모든 지역화된 프로젝트/카테고리 페이지가
  빌드 시점에 정적으로 생성됩니다.
- **SEO 친화적** — 로케일별 메타데이터, OpenGraph, hreflang 대체 링크, JSON-LD, 사이트맵,
  모든 페이지의 canonical URL을 제공합니다.

## 지원 언어

| 로케일    | 언어                  |
| --------- | --------------------- |
| `en`      | English (기본값)      |
| `zh-CN`   | Simplified Chinese    |
| `ja`      | Japanese              |
| `ko`      | Korean                |
| `es`      | Spanish               |
| `de`      | German                |

모든 라우트는 로케일이 접두사로 붙습니다:

```text
/en
/en/projects/supabase
/en/categories/authentication
/en/search?q=authentication

/ko
/ko/projects/supabase
/ko/categories/authentication
/ko/search?q=로그인
```

로케일이 없는 URL(예: `/projects/supabase`, 또는 단순히 `/`)로 접속하면 기본 로케일인 `/en`
경로로 308 리다이렉트됩니다 — 브라우저 언어 기반 자동 리다이렉트는 없어서, 크롤링이나 링크
공유 결과가 항상 예측 가능합니다. 헤더의 간단한 언어 전환기를 통해 현재 페이지와 검색어를
유지한 채 로케일을 바꿀 수 있습니다.

## 검색

검색은 프로젝트의 `name`, `keywords`, `categories`, `languages`, `description` 필드를
대상으로 하며, 각 필드마다 가중치가 다릅니다(이름과 키워드 일치가 가장 높은 순위). `image
upload` 같은 여러 단어 검색어는 토큰 단위로 나뉘어 개별적으로 채점되고, *모든* 토큰과 일치하는
프로젝트에는 커버리지 보너스가 붙습니다 — 그래서 `vector database`를 검색해도 일반 데이터베이스
보다 Milvus, Qdrant가 더 위에 노출됩니다. 채점 로직은 [`lib/search.ts`](lib/search.ts)를
참고하세요.

여기에 더해, 쿼리 확장 레이어(아래 [다국어 키워드](#다국어-키워드) 참고)가 구어체나 비영어권
검색어를 동일한 표준 키워드로 변환합니다. 이때 가중치는 직접 일치보다 낮게 설정되어 있어서,
동의어는 결과를 *도와줄* 뿐 정확한 일치 결과보다 위로 올라가는 일은 없습니다.

## 카테고리

AI & 머신러닝 · 인증 & 보안 · 백엔드 · 데이터베이스 · API · CMS · 채팅 & 메시징 · 개발자 도구 ·
UI & 컴포넌트 · 분석 · 스토리지 · 자동화 · DevOps · 검색 · 모니터링 · 이커머스 · 결제 · 미디어 ·
테스트 · 모바일

카테고리 **슬러그**는 고정되어 있으며 번역되지 않습니다 (`/ko/categories/authentication`이지
`/ko/categories/인증`이 아닙니다) — 화면에 보이는 이름/설명만 지역화됩니다. 표준(영어) 목록은
[`data/categories.json`](data/categories.json)을, 번역된 이름/설명은
[`lib/i18n/dictionaries/`](lib/i18n/dictionaries/)를 참고하세요.

## 번역

- **UI 텍스트**(내비게이션, 버튼, 제목, 빈 상태 화면, About/Contribute 페이지 등)는 로케일별로
  하나씩 파일이 있는 [`lib/i18n/dictionaries/`](lib/i18n/dictionaries/)에 있으며, 모두 동일한
  [`Dictionary`](lib/i18n/types.ts) TypeScript 인터페이스를 구현합니다 — 그래서 어떤 언어든
  키가 빠지면 런타임에 빈 문자열이 아니라 컴파일 타임 에러가 발생합니다.
- **프로젝트 데이터**는 프로젝트당 하나의 표준(영어) JSON 파일로 유지됩니다. 프로젝트는 선택적으로
  로케일별 `description`/`keywords`가 담긴 `translations` 객체를 추가할 수 있으며, 번역이
  없으면 항상 영어가 대체됩니다. 자세한 내용은
  [CONTRIBUTING.md](CONTRIBUTING.md#adding-translated-descriptions-optional)를 참고하세요.
- **카테고리 이름/설명**은 각 딕셔너리 파일에 모두 번역되어 있습니다 (카테고리는 프로젝트 목록과
  달리 관리자가 직접 관리하는 소규모 고정 분류 체계입니다).

### 다국어 키워드

[`lib/i18n/keyword-taxonomy.ts`](lib/i18n/keyword-taxonomy.ts)는 로케일별 자연어 동의어
(예: `authentication` ← `login`, `로그인`, `ログイン`, `inicio de sesión`, `anmeldung` 등)를
`data/projects/*.json`에서 실제로 쓰이는 표준 키워드로 매핑하고, 가중치를 높일 관련 용어 목록
(`oauth`, `sso`, `jwt` 등)도 함께 제공합니다. `lib/search.ts`는 채점 전에 사용자의 검색어를 이
taxonomy와 대조해 확장합니다. 새로운 의도를 추가하려면 항목을 추가하거나(또는 기존 항목에 새
로케일을 추가) 하면 되며, 검색 알고리즘 자체는 수정할 필요가 없습니다.

### 새 언어 추가하기

1. [`lib/i18n/config.ts`](lib/i18n/config.ts)의 `locales`에 로케일을 추가합니다 (이름,
   자국어 이름, BCP 47 태그, OpenGraph 로케일).
2. `lib/i18n/dictionaries/`에 `Dictionary` 인터페이스를 구현하는 새 딕셔너리 파일을 추가하고
   (TypeScript가 누락된 키를 알려줍니다) `get-dictionary.ts`에 등록합니다.
3. 새 딕셔너리의 `categories` 필드 안에 20개 슬러그 전체에 대한 카테고리 번역을 추가합니다.
4. 선택적으로 `keyword-taxonomy.ts`에 새 로케일용 동의어를 추가합니다.
5. `npm run build`를 실행하세요 — 새 로케일의 정적 라우트는 `locales`, `data/projects/`,
   `data/categories.json`을 기반으로 자동 생성되며, 그 외에는 아무것도 바꿀 필요가 없습니다.

## 기여하기

누구나 GitHub 풀 리퀘스트로 프로젝트를 추가할 수 있습니다 — 단계별 가이드는
[CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요 (첫 PR까지 약 5분). 번역은 전적으로
선택 사항이며, 영어가 표준이자 필수 기준입니다. JSON 편집이 익숙하지 않다면
[이슈를 열어](../../issues/new?template=add-project.yml) 대신 제안해주세요.

## 개발

```bash
npm install        # 의존성 설치
npm run dev         # http://localhost:3000/en 에서 로컬 개발 서버 실행
npm run lint         # 코드베이스 린트
npm run typecheck    # TypeScript 컴파일러 실행
npm run validate     # data/projects/ 의 모든 프로젝트 데이터 검증
npm run build         # 프로덕션 빌드
```

## 프로젝트 구조

```text
app/
  [locale]/            로케일별 라우트 (루트 레이아웃도 여기 — 로케일별 <html lang>)
    page.tsx             홈페이지
    search/              검색 결과 (/[locale]/search?q=...)
    projects/[slug]/     프로젝트 상세 페이지
    categories/[slug]/   카테고리 페이지
    about/, contribute/  정적 콘텐츠 페이지
    not-found.tsx        로케일별 404
  sitemap.ts, robots.ts  최상위 SEO 엔드포인트 (로케일 독립적인 URL)
middleware.ts          로케일이 없는 경로에 기본 로케일을 붙임 (브라우저 언어 리다이렉트 없음)
components/           재사용 가능한 UI 컴포넌트(로케일/딕셔너리 인지) + LanguageSwitcher
data/
  projects/*.json        프로젝트당 하나의 표준 파일; 선택적으로 로케일별 `translations`
  categories.json         표준(영어) 카테고리 정의; 고정 슬러그
lib/
  schema.ts               프로젝트 & 카테고리용 Zod 스키마
  projects.ts, categories.ts   로케일 인지 처리 + 폴백을 지원하는 데이터 로더
  search.ts                관련도 기반, 로케일 인지 검색
  i18n/
    config.ts               로케일, 기본 로케일, BCP 47 / OpenGraph 메타데이터
    types.ts                 딕셔너리 인터페이스 (필수 UI 문자열의 기준)
    dictionaries/            로케일별 딕셔너리 파일
    get-dictionary.ts        로케일 → 딕셔너리 조회
    metadata.ts              hreflang / canonical / OpenGraph 로케일 헬퍼
    keyword-taxonomy.ts       다국어 검색 동의어 taxonomy
    format.ts                 {placeholder} 치환 + 복수형 처리 헬퍼
scripts/
  validate-projects.ts     데이터 검증, CI에서 실행
.github/               이슈/PR 템플릿과 검증 워크플로
```

## 로드맵

- [ ] 초기 큐레이션 세트를 넘어서 프로젝트 디렉터리 확장
- [ ] 디렉터리가 성장함에 따라 더 세분화된 하위 카테고리 추가
- [ ] 초기 플래그십 세트를 넘어서 더 많은 프로젝트 설명 번역
- [ ] 추가 로케일 지원 (`fr`, `pt-BR`, `hi`, `ru` 등)
- [ ] Google AdSense 연동 (레이아웃에는 이미 광고 영역이 확보되어 있음)
- [ ] 프로젝트 로고 / 아이콘

## 라이선스

[MIT](LICENSE)
