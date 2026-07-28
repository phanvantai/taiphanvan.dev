# Plan 04 — Polish & Deploy

**Goal:** Wrap up — UX polish + docs + production deploy.

## Deliverables

- Cmd+K command palette: nav nhanh + search bài blog + toggle theme.
- View transitions giữa các page.
- 404 + error boundary đẹp.
- README đầy đủ.
- `scripts/new-post.ts` CLI tạo bài mới.
- Deploy Vercel + custom domain `taiphanvan.dev`.

## Steps

### 1. Command palette

```bash
pnpm dlx shadcn@latest add command
```

`src/components/site/command-palette.tsx` (client):

- `Cmd+K` / `Ctrl+K` open.
- Sections: Pages (nav items), Blog posts (search title), Theme (toggle, set light/dark/system).
- Mount global trong root layout.

### 2. View transitions

Next 15 hỗ trợ `experimental.viewTransition: true` trong `next.config.ts`. Wrap navigation với `unstable_ViewTransition` cho smooth route change.

### 3. Error pages

- `src/app/not-found.tsx` — 404 đẹp, link về home + blog.
- `src/app/error.tsx` (`"use client"`) — error boundary với reset button + log error.
- `src/app/loading.tsx` cho route segment có data fetch như blog list.

### 4. New post script

`scripts/new-post.ts`:

```bash
pnpm tsx scripts/new-post.ts "Tên bài viết"
# → tạo content/blog/2026-05-08-ten-bai-viet.mdx với frontmatter prefilled
```

`package.json`: `"new-post": "tsx scripts/new-post.ts"`.

### 5. README

`README.md`:

- Banner + description.
- Setup local: clone → `pnpm install` → copy `.env.example` → `pnpm dev`.
- Cách viết bài: `pnpm new-post "Tên"` → edit MDX → push → Vercel deploy.
- Cách thêm work: tạo `content/work/[slug].mdx`, fill frontmatter, push.
- Deploy Vercel: connect repo, set env vars, custom domain.
- Stack overview.

### 6. Production check

```bash
pnpm build && pnpm start
```

- Test production build local.
- Lighthouse: Perf > 90, A11y > 95, SEO 100, BP > 95.
- Bundle analyzer optional: `pnpm dlx @next/bundle-analyzer`.

### 7. Deploy Vercel

Hướng dẫn bro:

1. Push repo lên GitHub.
2. Vercel → New Project → import repo.
3. Set `NEXT_PUBLIC_SITE_URL=https://taiphanvan.dev` và UI style nếu muốn override default.
4. Add domain `taiphanvan.dev` + `www.taiphanvan.dev`.
5. Set DNS theo Vercel hướng dẫn (A record / CNAME).
6. Vercel auto provision SSL.
7. Verify production URL, localized pages, sitemap, RSS và OG image.

## Acceptance checklist

- [ ] Cmd+K open + search + nav OK.
- [ ] View transitions smooth.
- [ ] 404 đẹp, error boundary catch + reset.
- [ ] `pnpm new-post "Test"` tạo file đúng.
- [ ] README đầy đủ, paste vào GitHub render OK.
- [ ] Production build pass, Lighthouse target hit.
- [ ] Site live trên `taiphanvan.dev` với SSL.

**Done** — site đã ship.
