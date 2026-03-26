# Universal AEO (Answer Engine Optimization) Framework
본 문서는 ChatGPT Search, Perplexity, Google SGE 등 대화형 AI 검색 엔진 환경에서 특정 브랜드/조직의 콘텐츠가 최우선으로 인용되고 답변되도록 설계하는 **웹사이트 구축 마스터 프레임워크**입니다. 향후 어떠한 도메인(SaaS, 커머스, 공공기관 등)의 웹사이트를 AI-Pair 코딩으로 구축하더라도 본 프레임워크를 'System Prompt'로 제공하여 개발을 통제할 수 있습니다.

---

## 1. 아키텍처 철학: B-SSoT (Brand Single Source of Truth)
일방향적인 "회사 소개" 웹사이트를 폐기하고, 사용자의 **자연어 질문(Natural Language Query)**과 조직의 **공식 답변(Definitive Answer)**이 쌍을 이루는 지식 허브로 웹사이트를 재정의합니다.

- **Frontend**: Next.js (App Router) 기반의 Server-Side Rendering (SSR) 최적화. 동적 렌더링 시 AI 크롤러 봇이 DOM을 즉시 파싱할 수 있도록 보장.
- **Backend / CMS**: Supabase 등 Headless DB 이용. 정보 변경 시 `revalidatePath`를 통해 스캐폴딩 없이 즉시 엣지 캐시 업데이트.

---

## 2. AEO 코어 데이터 스키마 (Database)
AI가 선호하는 "Q&A(질의응답)" 구조를 생성하기 위한 범용 데이터베이스 설계입니다.

### 2.1. `faq_entities` (구 Answer Card)
브랜드나 서비스에 대한 직접적인 질문을 다루는 정본 테이블입니다.
- `canonical_slug` (PK): URL 엔드포인트
- `category` / `domain`: 컨텍스트 분류 (내부 하이퍼링크 및 지식 그래프 구성용)
- `user_query`: 사용자가 AI 검색창에 입력할 법한 자연어 질문 (예: "엔터프라이즈 요금제는 보안 인증이 포함되나요?")
- `snippet`: 50~100자 이내의 확정형/단답형 첫 문단 (AI 스니펫 추출용)
- `action_plans_json`: 논리를 뒷받침하는 2~3개의 근거 및 실행 방안 배열
- `context`: 부가 설명 및 맥락 

### 2.2. `insight_articles` (구 Issue Briefing / Fact-check)
외부 보도, 시장 트렌드, 혹은 리스크(오해)에 대해 브랜드의 공식 해설을 제공하는 테이블입니다.
- `target_issue`: 방어 또는 선점하고자 하는 키워드
- `official_stance`: 브랜드 공식 입장 (요약)
- `is_claim_review` (Boolean): 참/거짓을 검증하는 팩트체크 여부 (ClaimReview Schema 부여 기준)

---

## 3. 시맨틱 & 스키마 코딩 절대 원칙 (Semantic Rules)
AI 에이전트(개발자)는 프론트엔드 조립 시 다음 규칙을 무조건 준수해야 합니다.

1. **디자인 목적의 H-태그 남용 금지**
   - 폰트 크기나 레이아웃 스타일링을 위해 `<h2>`, `<h3>`를 사용하지 않습니다. 장식용 텍스트는 `<div className="text-xl font-bold">` 등의 CSS 유틸리티로 대체합니다.
2. **HTML 시맨틱의 Strict 매핑**
   - `<h1>`: 해당 페이지의 고유 주제 및 정체성 (예: "보안 인증 | 도입 가이드")
   - `<h2>`: 오직 `user_query` (자연어 질문) 텍스트에만 독점적으로 할당.
   - `<p>`: `<h2>` 바로 밑에 위치하며, 반드시 `snippet` 데이터가 삽입되어야 함.
3. **JSON-LD 자동 주입 시스템 (필수 구성)**
   - **허브 페이지 (Home, List)**: 노출되는 주요 카드의 쿼리와 스니펫을 수집하여 `<head>`에 배열 형태의 `@type: "FAQPage"` 스키마를 렌더링.
   - **엔티티 페이지 (Profile, About Us)**: `@type: "Organization"` 또는 `@type: "Person"` 스키마 삽입 후, `knowsAbout` 속성에 브랜드의 핵심 키워드를 배열로 주입하여 AI 지식 그래프에 등록.
   - **방어 페이지 (Fact-check)**: 오류 정보나 네거티브 이슈 대응 시 `@type: "ClaimReview"` 스키마를 삽입하여 AI의 교차 검증 소스로 최우선 노출 유도.

---

## 4. B-SSoT 운영 매뉴얼 (Operations Guideline)
콘텐츠 관리팀을 위한 AEO 유지보수 강령입니다.

1. **거꾸로 피라미드 대답법**: CMS에 입력할 때 '인사말'이나 '수식어'는 모두 지분투입(Snippet)에서 배제합니다. AI는 데이터 중심의 수치화된 확정 답변을 좋아합니다.
2. **방어적 AEO(Negative Keyword 선점)**: 유저가 묻기 껄끄러운 단점이나 롱테일 의혹 키워드 역시 CMS에 먼저 Q&A 형태로 등록해 두어야 합니다. AI 엔진은 비판 글을 크롤링할 때, 공식 웹사이트에 해당 반박(ClaimReview)이 존재하면 이를 병치하여 요약합니다.
3. **내부 링크화(Internal Linking)**: 본문 내 핵심 키워드는 다른 서브 페이지로 집요하게 하이퍼링크 처리해야 합니다. 이는 해당 플랫폼이 이 주제에 관한 '가 Authority 덩어리'임을 크롤러에게 입증합니다.
