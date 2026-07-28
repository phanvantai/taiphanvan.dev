# Plan 03 — Homepage + SEO

**Goal:** Trang chủ thật + SEO foundation (sitemap/robots/rss/OG dynamic/JSON-LD).

## Deliverables

- `/` với hero + featured work (4) + 3 bài blog mới nhất + social links.
- `sitemap.ts`, `robots.ts`, `rss.xml/route.ts`.
- Dynamic OG image route.
- JSON-LD trên home, about, blog post, work item.
- `Vercel Analytics` + `Speed Insights` mount.

## Steps

### 1. Homepage components

`src/components/home/`:

- `hero.tsx` — bio (2-3 câu), avatar (placeholder `/images/avatar.jpg`), CTA "Read blog" / "View work", link social.
- `featured-work.tsx` — đọc work có `featured: true`, render 4 card.
- `recent-posts.tsx` — 3 blog post mới nhất.

`src/app/page.tsx` compose 3 section.

### 2. Dynamic OG (`src/app/og/route.tsx`)

- `import { ImageResponse } from "next/og"`.
- Query params: `?title=&subtitle=&type=blog|work|page`.
- Design: bg gradient `#6366F1 → #8B5CF6`, title Geist Bold 60px trắng, subtitle 28px, badge type góc trên phải, footer "taiphanvan.dev" góc dưới phải.
- Cache via `runtime = "edge"` + force-cache headers.
- Apply: `metadata.openGraph.images` blog/work/page → `/og?title=...&type=blog`.

### 3. Sitemap

`src/app/sitemap.ts` — list:

- Static: `/`, `/about`, `/now`, `/work`, `/blog`.
- Dynamic: tất cả `/blog/[slug]`, `/work/[slug]`.
- `lastModified` từ frontmatter `date`.

### 4. Robots

`src/app/robots.ts` — allow public pages và khai báo sitemap URL.

### 5. RSS

`src/app/rss.xml/route.ts`:

- Tạo XML thủ công (không cài `feed` trừ khi cần).
- Render full HTML body bằng MDX → string (`renderToStaticMarkup` hoặc compile MDX → HTML).
- Latest 50 bài.
- `Content-Type: application/xml; charset=utf-8`.

### 6. JSON-LD

- `src/components/seo/json-ld.tsx` — `<script type="application/ld+json">`.
- Home + About: `Person` schema (name, url, sameAs social, jobTitle).
- Blog post: `BlogPosting` (headline, datePublished, author, image).
- Work: `CreativeWork`.

### 7. Metadata defaults

`src/app/layout.tsx` `metadata`:

- `metadataBase: new URL(siteConfig.url)`.
- `title.template: "%s | Tai Phan"`, `default: siteConfig.name`.
- `openGraph` defaults, `twitter.card: "summary_large_image"`.
- `alternates.canonical: "/"`.

Mỗi page export `generateMetadata` đầy đủ.

### 8. Analytics

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

Mount `<Analytics />` + `<SpeedInsights />` trong root layout.

## Acceptance checklist

- [ ] `/` render hero + featured + recent posts đẹp.
- [ ] `/sitemap.xml`, `/robots.txt`, `/rss.xml` access OK.
- [ ] `/og?title=Hello&type=blog` trả image.
- [ ] OG image preview trên Twitter/Discord/Slack debugger pass.
- [ ] JSON-LD validate qua schema.org validator.
- [ ] Lighthouse SEO 100 trên homepage + 1 blog post.

**STOP** sau plan này → demo full SEO + homepage.
