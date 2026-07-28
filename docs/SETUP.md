# Setup guide

From-scratch setup từ clone tới chạy được dev server.

## Prerequisites

- **Node 22+**; repo hiện pin Node 24 trong `.nvmrc`.
- **pnpm 11** qua Corepack.

```bash
node --version
pnpm --version
```

## 1. Install dependencies

```bash
pnpm install
```

## 2. Configure the site

Copy file env mẫu nếu cần đổi URL hoặc UI style:

```bash
cp .env.example .env.local
```

Hai biến public hiện có:

- `NEXT_PUBLIC_SITE_URL`: URL canonical, mặc định `https://taiphanvan.dev`.
- `NEXT_PUBLIC_UI_STYLE`: `cypher-2049`, `terminal`, `neo-brutalist`, hoặc `minimalist`.

Site vẫn chạy local nếu không tạo `.env.local`; code có fallback cho UI style và site config.

## 3. Run the dev server

```bash
pnpm dev
```

Mở các route localized:

- `http://localhost:3000/vi`
- `http://localhost:3000/en`
- `/vi/blog`, `/en/blog`
- `/vi/work`, `/en/work`

Request `/` tự redirect sang locale mặc định.

## 4. Verify before publishing

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Bốn lệnh này phải pass trước mỗi lần publish.

## Content workflow

Tạo bài mới:

```bash
pnpm new-post "Tên bài viết"
```

Script tạo MDX trong `content/vi/blog/`. Thêm bản English tương ứng trong `content/en/blog/` khi cần.
Work entries và static pages cũng là MDX trong `content/{vi,en}/`.

## Troubleshooting

**`corepack` hoặc `pnpm` không có trong PATH**

Chạy `corepack enable pnpm`, mở terminal mới, rồi kiểm tra lại `pnpm --version`.

**Build không tải được Google Fonts**

`next/font/google` cần network ở lần build đầu. Kiểm tra DNS/proxy rồi chạy lại `pnpm build`.

**Nội dung không xuất hiện**

Kiểm tra frontmatter, locale directory và `published`. Blog filename phải theo convention
`YYYY-MM-DD-slug.mdx`.

## Git hooks

Husky + lint-staged chạy ESLint và Prettier trên file staged trước commit. Không skip
`--no-verify` trừ khi hook bị lỗi môi trường đã được kiểm tra riêng.
