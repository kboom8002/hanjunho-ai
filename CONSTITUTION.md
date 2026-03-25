# hanjunho.ai Project Constitution

본 프로젝트는 정치인 '한준호'의 공식 입장을 대변하는 AI 최적화 정책·이슈 플랫폼인 **hanjunho.ai**를 구축하는 것을 목표로 한다. 본래 Webflow로 기획되었던 본 프로젝트는 **Next.js 14(App Router), Tailwind CSS, Supabase(PostgreSQL)** 기반의 상용 웹앱으로 전환하여 개발된다.

이 문서는 프로젝트 내의 어떠한 기획 문서나 코드보다 우선하는 **최상위 개발 헌법**이다.

---

## 1. 핵심 철학 (Core Philosophy)

### 1-1. B-SSoT (Brand Single Source of Truth)
본 플랫폼은 단순한 선거 캠프 홍보용 홈페이지가 아니다. 경기도민과 유권자의 질문에 답하는 **공식 정책·이슈 플랫폼(B-SSoT)**이어야 한다. 모든 콘텐츠는 "질문 → 해설 → 정답 → 신뢰 → 행동"의 흐름을 가지며, 정보의 정확성과 공식성을 최우선 가치로 삼는다. 

### 1-2. AEO (AI Engine Optimization) 최우선
ChatGPT, Perplexity 등 대형 언어 모델과 AI 검색 엔진이 정보를 정확히 크롤링하고 인용할 수 있도록 최적화한다.
- 명확한 시맨틱 마크업(Semantic Markup)과 구조화 데이터(JSON-LD, Schema.org)를 적용한다.
- Meta, OG 태그뿐만 아니라, 컴포넌트 본문 자체의 구조(질문-답변-요약-쟁점-역할)가 검색 엔진에 친화적이도록 DOM 구조를 설계한다.

---

## 2. 아키텍처 대원칙 (Architecture Principles)

### 2-1. SSR 중심의 데이터 패칭 (Supabase SSR)
- 모든 동적 데이터(정책 카드, 이슈 브리핑, 팩트체크 컬렉션 등)는 **Supabase SSR**을 통해 서버 단에서 데이터를 Fetching하여 응답 속도와 SEO/AEO 품질을 극대화한다.
- 클라이언트 사이드 렌더링(CSR)은 검색 노출과 무관한 인터랙션 혹은 상태 관리가 반드시 필요한 예외적인 경우에만 제한적으로 사용한다.

### 2-2. 100% 서버 컴포넌트 정보 달성 지향
- 정보를 전달하는 모든 페이지(홈, 5대 비전 클리어맵, 이슈브리핑, 팩트체크, 프로필 등)는 **100% 서버 컴포넌트(Server Components)**로 구성하는 것을 원칙으로 한다.
- 클라이언트 컴포넌트(`"use client"`)는 검색 엔진 인덱싱과 무관한 UI 조작부(예: LNB 라우팅 탭, 필터 버튼, Modal, 폼 제출)에만 격리하여 사용한다. 

---

## 3. 디자인 및 스타일링 가이드라인 (Design & Styling Guidelines)

### 3-1. 절대적 디자인 기준
모든 UI 개발은 `_references/hanjunho.ai 디자인 토큰 세트 v1.0.docx` 기준을 절대적으로 따른다. 임의의 템플릿 사용, 기획 의도와 무관한 컴포넌트 혼용, 또는 일관성을 해치는 색상 및 간격 지정을 엄금한다.

### 3-2. Tailwind CSS 기반 토큰 매핑
디자인 토큰은 오직 **Tailwind CSS**를 통해 코드 레벨에서 구현된다. 프로젝트 설정 시 `tailwind.config.ts`에 다음 디자인 토큰이 반드시 매핑되어야 한다.

- **Colors:** 
  - Brand (Blue 계열 - `brand-900` ~ `brand-050` / 핵심 버튼 및 링크)
  - Neutral (Navy/Gray 계열 - `neutral-900` ~ `neutral-050` / 신뢰 영역 및 텍스트)
  - Semantic (Success, Warning, Danger 등)
- **Typography:** Pretendard 기본 폰트 적용. 모바일 우선(Mobile-First) 텍스트 스케일링을 준수.
- **Spacing / Radius / Shadow:** 4px 베이스 간격, 둥근 모서리(Radius), 정치 플랫폼의 정체성을 해치지 않는 제한된 Shadow 값 사용.

### 3-3. 컴포넌트 분리
재사용성이 높은 요소(배지/칩, 4종 규격 버튼, 카드 템플릿)는 전역 컴포넌트로 모듈화하여 일관성을 강제한다.

---

## 4. IA/라우팅 원칙 (Information Architecture Routing)

최상위 GNB 7개 및 5대 비전 클리어맵 LNB 구조는 다음과 같이 Next.js App Router 구조(`app/`)에 1:1로 반영되어야 한다. 

1. **`/`** (Ask AI, 홈)
2. **`/clearmap`** (5대 비전 클리어맵) 
3. **`/issues`** (이슈브리핑)
4. **`/fact-check`** (팩트체크)
5. **`/trust-center`** (팩트 인증센터)
6. **`/vote-guide`** (투표 안내)
7. **`/hanjunho`** (한준호 프로필)

기획 명세서에 정의된 URL 구조를 준수하며, 파생 상세 페이지(예: `/cards/[slug]`) 역시 App Router의 동적 라우팅을 사용하여 구축한다.
