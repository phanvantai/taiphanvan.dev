# Plan 00 — Foundation

**Goal:** Bootstrap Next.js 15 đủ để chạy `/tools/tracker` ở Plan 01. Chưa làm MDX/blog/work/SEO/homepage thật.

## Deliverables

- App chạy được `pnpm dev`, render `/` placeholder + `/tools` placeholder.
- Dark mode default, toggle hoạt động, không nhấp nháy khi reload.
- Header (logo + nav) + Footer.
- shadcn cài sẵn các component sẽ dùng cho tracker.
- Lint + format chạy OK trước commit.

## Steps

### 1. Init project

```bash
pnpm dlx create-next-app@latest . \
  --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*" --use-pnpm --no-turbopack
```

- Chỉnh `tsconfig.json`: `"strict": true`, `"noUncheckedIndexedAccess": true`.
- Tạo `.nvmrc` chứa `20`.
- Tạo `.prettierrc` + `.prettierignore`, cài `prettier` + `prettier-plugin-tailwindcss` (devDeps).

### 2. Tailwind v4 setup

- Verify `tailwind.config.ts` (Tailwind v4 dùng CSS-first; nếu template gen Tailwind v3, upgrade theo docs).
- `src/app/globals.css`: theme tokens OKLCH (background/foreground dark + light, border, accent indigo→violet, code-block bg).

### 3. shadcn/ui

```bash
pnpm dlx shadcn@latest init -d
pnpm dlx shadcn@latest add button input dialog sheet badge card dropdown-menu sonner label textarea select separator
```

- `components.json`: style `new-york`, baseColor `neutral`, RSC true, CSS vars true.
- Sonner provider mount trong root layout.

### 4. Theming

- `pnpm add next-themes`.
- `src/components/site/theme-provider.tsx` wrap `next-themes` `ThemeProvider`, `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`.
- `src/components/site/theme-toggle.tsx`: button → toggle `light`/`dark`, icon Lucide sun/moon.

### 5. Fonts

- Geist + Geist Mono qua `next/font/local` hoặc `geist` package (v1, có Sans + Mono export riêng) — chọn `geist` package cho gọn.
- Apply font variables vào `<html>`.

### 6. Layout & nav

- `src/lib/site-config.ts` chứa `siteConfig` (name, url, description, author, social placeholder, nav items).
- `src/components/site/header.tsx`: logo "Tai Phan" + nav từ `siteConfig.nav` + theme toggle.
- `src/components/site/footer.tsx`: copyright + social links.
- `src/components/site/nav.tsx`: render link list, highlight active route bằng `usePathname`.
- `src/app/layout.tsx`: html lang `vi`, font vars, theme provider, header, `<main>`, footer, sonner toaster, root metadata defaults (title template, description, og defaults).

### 7. Placeholder pages

- `src/app/page.tsx` — hero placeholder "Coming soon" (sẽ thay ở Plan 03).
- `src/app/tools/page.tsx` — list 1 card link "/tools/tracker" (Plan 01 sẽ build).
- `src/app/tools/tracker/page.tsx` — placeholder "Tracker coming in Plan 01" để route exist.

### 8. Lint + git hooks

- `pnpm add -D husky lint-staged`.
- `pnpm exec husky init` → `.husky/pre-commit`: `pnpm lint-staged`.
- `package.json` `lint-staged`: `*.{ts,tsx,md,mdx,json}` → `prettier --write`; `*.{ts,tsx}` → `eslint --fix`.
- `eslint.config.mjs`: extend `next/core-web-vitals` + `next/typescript`, không có rule custom phức tạp.

### 9. Utility helpers

- `src/lib/utils.ts`: `cn()` (clsx + tailwind-merge), `formatDate()`, `daysSince()`, `slugify()`.

### 10. Tooling files

- `.env.example` ban đầu chỉ có `NEXT_PUBLIC_SITE_URL`. Plan 01 sẽ thêm DB + tracker secrets.
- `.gitignore` chuẩn Next.js + `.env*.local` + `node_modules`.

## Acceptance checklist

- [ ] `pnpm dev` → `http://localhost:3000` render OK, không error.
- [ ] Toggle theme dark ↔ light không flash.
- [ ] `/tools` clickable, `/tools/tracker` placeholder render.
- [ ] `pnpm build` pass.
- [ ] Commit thử → husky chạy lint-staged.

**STOP** sau plan này → demo cho bro xem rồi qua Plan 01.
