# [PRD] Mantis-Style Notion CMS Blog

**프로젝트명:** Mantis Notion Blog  
**분류:** 개인 브랜딩 블로그 및 포트폴리오  
**핵심 가치:** 고품격 디자인(Mantis) + 노션 기반의 생산성 + 최적의 SEO

---

## 1. 프로젝트 개요 (Overview)
본 프로젝트는 **노션(Notion)**을 백엔드 CMS로 사용하며, 프론트엔드는 **Next.js**와 **Mantis 디자인 철학**을 결합하여 구축합니다. 사용자는 노션에서 글을 작성하고 'Published' 체크박스를 클릭하는 것만으로, 전 세계 수준의 인터랙티브 웹사이트에 콘텐츠를 즉시 발행할 수 있습니다.

## 2. 데이터 아키텍처 및 노션 연동 (Data Schema)

### 2.1 Notion DB 구조
| 속성 이름 | 타입 | 역할 |
| :--- | :--- | :--- |
| `title` | Title | 게시글 제목 및 SEO `<title>` |
| `slug` | Text | URL 고유 경로 (예: `/blog/my-post`) |
| `metaDescription` | Text | 목록 요약 및 SEO `<meta description>` |
| `blogPost` | Text | 메인 콘텐츠 (Rich Text/Blocks) |
| `Published` | Checkbox | 게시 여부 제어 (`true`인 항목만 렌더링) |

### 2.2 데이터 처리 파이프라인
1.  **Fetching:** `@notionhq/client`를 사용하여 데이터베이스를 조회.
2.  **Filtering:** `Published`가 `true`인 데이터만 필터링.
3.  **Parsing:** `notion-to-md`를 사용하여 노션 블록을 마크다운으로 변환.
4.  **Rendering:** `react-markdown`을 통해 HTML로 최종 출력.

---

## 3. 핵심 기능 (Core Features)

### 3.1 게시글 목록 페이지 (`/`)
- **기능:** `Published`가 체크된 모든 포스트를 최신순으로 나열.
- **UI:** 벤토 그리드(Bento Grid) 레이아웃 적용. 각 카드는 `title`, `metaDescription`을 포함.
- **디자인:** 마우스 호버 시 카드가 미세하게 확장되거나 노이즈 질감이 강조되는 효과.

### 3.2 게시글 상세 페이지 (`/blog/[slug]`)
- **기능:** `Slug` 값을 이용한 Dynamic Routes 구현.
- **콘텐츠:** 코드 블록(Syntax Highlighting), 인용구, 이미지 등 노션의 풍부한 블록 타입을 완벽히 렌더링.
- **SEO:** 각 페이지의 `title`과 `metaDescription`을 활용해 동적 메타 데이터 설정.

### 3.3 SEO 및 성능 최적화
- **Dynamic Sitemap:** `sitemap.xml`을 생성하여 검색 엔진에 모든 슬러그 노출.
- **Robots.txt:** 검색 엔진 크롤링 정책 설정.
- **Semantic HTML:** `<article>`, `<header>`, `<footer>` 등 표준 태그 사용으로 웹 접근성 및 SEO 강화.

### 3.4 반응형 및 접근성
- **Mobile/Tablet:** 모바일에서도 Mantis의 미니멀한 감성이 유지되도록 텍스트 크기와 그리드 간격 자동 조절.
- **Performance:** ISR(Incremental Static Regeneration)을 적용하여 노션 데이터 업데이트 시 빠른 반영 및 빠른 로딩 속도 유지.

---

## 4. 디자인 사양 (Mantis Visual Identity)

- **Palette:** `#0d0d0d` (Deep Charcoal Black) 메인, `#f0f0f0` (Off-white) 텍스트.
- **Typography:** 
    - Header: *Editorial New* (Serif) - 대담하고 우아함.
    - Body: *Inter* (Sans-serif) - 가독성 중심, 넉넉한 행간.
- **Effects:**
    - **Background:** 아주 미세한 Grainy Noise Texture 오버레이.
    - **Smooth Scroll:** Lenis를 이용한 관성 스크롤.
    - **Animations:** Framer Motion을 활용한 Y-axis Slide + Fade Reveal (Stagger 효과).
    - **Custom Cursor:** 인터랙티브 요소 위에서 반전(Invert) 및 확장되는 커서.

---

## 5. 기술 스택 (Tech Stack)

| 구분 | 기술 |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion, Lenis (Smooth Scroll) |
| **CMS SDK** | `@notionhq/client`, `notion-to-md` |
| **Markdown** | `react-markdown`, `remark-gfm` (GitHub Flavored Markdown) |
| **Icons** | Lucide React |

---

## 6. 환경 변수 설정 (`.env.local`)

```env
# Notion API 설정
NOTION_API_KEY="your_notion_integration_secret_here"
NOTION_DATABASE_ID="your_notion_database_id_here"

# 사이트 기본 정보 (Sitemap, Metadata용)
NEXT_PUBLIC_BASE_URL="https://your-blog-domain.com"
```

---

## 7. 개발 로드맵 (Roadmap)

1.  **Step 1 (Base):** Next.js 프로젝트 초기화 및 `.env` 설정, `@notionhq/client` 연결 테스트.
2.  **Step 2 (Data):** 노션 데이터를 가져오는 서버 컴포넌트 유틸리티 작성 (`getPosts`, `getPostBySlug`).
3.  **Step 3 (UI):** Mantis 스타일 가이드(Color, Noise, Font) 및 벤토 그리드 리스트 페이지 구현.
4.  **Step 4 (Detail):** 마크다운 렌더링 및 상세 페이지 레이아웃 완성.
5.  **Step 5 (Interaction):** Lenis 스크롤, Framer Motion 애니메이션, 커스텀 커서 적용.
6.  **Step 6 (SEO):** Sitemap, Robots.txt, Dynamic Metadata 최종 설정.

---