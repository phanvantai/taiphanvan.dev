# Plan 02 — Content (MDX layer)

**Goal:** File-based content cho `/blog`, `/work`, `/about`, `/now`. Setup MDX pipeline + render đẹp.

## Deliverables

- MDX pipeline: `next-mdx-remote` + `gray-matter` + plugins.
- 4 work pages hoạt động với case study placeholder.
- 1 blog post mẫu render OK.
- Reading time, TOC sidebar cho blog post.
- Filter tag + sort date ở `/blog`.

## Steps

### 1. Deps

```bash
pnpm add next-mdx-remote gray-matter reading-time
pnpm add remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki
pnpm add -D @types/mdx
```

### 2. Content folder

```
content/
├── blog/2026-05-07-hello-world.mdx
└── work/
    ├── examino.mdx
    ├── pes-arena.mdx
    ├── quickspend.mdx
    └── littlemark.mdx
```

Frontmatter format đúng spec gốc (blog: title/description/date/tags/published/featured/cover; work: title/slug/tagline/period/status/stack/role/links/cover/order/featured).

### 3. `src/lib/mdx.ts`

- `getAllPosts()` — đọc folder, parse frontmatter, filter `published`, sort theo `date` desc.
- `getPostBySlug(slug)`.
- `getAllWork()` — sort theo `order`.
- `getWorkBySlug(slug)`.
- Cache với `React.cache()`.
- Type: `Post`, `Work` trong `src/types/`.

### 4. MDX components custom

`src/components/mdx/mdx-components.tsx`:

- `<Callout type="info|warning|success|error">` — Lucide icon + colored border.
- `<CodeBlock>` — wrap `pre` với copy button (client component).
- `h2`, `h3`: anchor link hover hiện `#`.
- `<Image>` Next.js wrapper với caption (figure/figcaption).
- Pass vào `<MDXRemote components={...} />`.

Plugins config:

- `remark-gfm` — GFM tables, strikethrough, task lists.
- `rehype-slug` — slug cho heading.
- `rehype-autolink-headings` — anchor link.
- `rehype-pretty-code` — `theme: { light: "github-light", dark: "github-dark" }`, `keepBackground: false`.

### 5. Routes

- `src/app/(marketing)/layout.tsx` — chia layout cho about/now (nếu cần khác main).
- `src/app/(marketing)/about/page.tsx` — read `content/pages/about.mdx` (hoặc inline) + render. Metadata.
- `src/app/(marketing)/now/page.tsx` — same pattern, đọc `content/pages/now.mdx`.
- `src/app/work/page.tsx` — grid all work, link sang `/work/[slug]`.
- `src/app/work/[slug]/page.tsx` — render MDX case study, hiển thị stack badges, links live/github, cover hero.
- `src/app/blog/page.tsx` — list posts, filter tag (URL `?tag=nextjs`), sort date.
- `src/app/blog/[slug]/page.tsx` — render post, sidebar TOC (`rehype-slug` extract headings), reading time, ngày đăng, related posts (cùng tag, 3 cái).

### 6. Components

- `src/components/blog/post-card.tsx`, `post-list.tsx`, `tag-filter.tsx`, `toc.tsx`.
- `src/components/work/project-card.tsx`, `project-grid.tsx`.

### 7. `revalidate`

- Blog/work pages: `export const revalidate = 3600;` (1h) — vì static + occasional update.

## Acceptance checklist

- [ ] `/blog` list bài, click vào render OK với syntax highlight.
- [ ] TOC sidebar scroll smooth, highlight active heading.
- [ ] Reading time "5 phút đọc" hiển thị.
- [ ] Tag filter qua URL hoạt động.
- [ ] `/work` grid 4 project, click vào `/work/examino` render MDX.
- [ ] `/about` + `/now` render MDX OK.
- [ ] Code block có copy button + language label.
- [ ] Vietnamese render đúng (no broken chars).

**STOP** sau plan này → demo blog + work + about/now.
