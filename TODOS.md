# TODOs — placeholders cần fill trước khi public

Checklist các chỗ còn để trống trong codebase. Tick từng cái sau khi điền xong.

## Phải điền trước khi public site

### Identity & social — [src/lib/site-config.ts](src/lib/site-config.ts)

- [x] `author.email` → `taipv.swe@gmail.com`
- [x] `author.handle` → `@phanvantai` (đã sửa từ stale `@taiphanvan`)
- [x] `social.github` → `https://github.com/phanvantai`
- [ ] `social.twitter` — đang `""` (intentionally empty, filter ẩn)
- [x] `social.linkedin` → `https://www.linkedin.com/in/tai-phan-van`
- [ ] `social.facebook` — đang `""` (intentionally empty, filter ẩn)
  > Handle nào không dùng thì xoá hẳn key khỏi config thay vì để rỗng (tránh render link chết). Hiện tại empty key được filter bởi `Object.entries(...).filter(url.length > 0)` nên không render link chết — clean enough.

### About page — [content/vi/pages/about.mdx](content/vi/pages/about.mdx)

- [x] Viết lại toàn bộ vi + en 2026-09-23, bật route (`/about`), thêm vào nav, command palette và sitemap.
- [x] Email, GitHub handle, LinkedIn khớp với `site-config.ts`.
- [x] Bỏ section roadmap/plans (link sai org) — thay bằng "Về site này" trỏ repo `phanvantai/taiphanvan.dev`.

### Now page — [content/vi/pages/now.mdx](content/vi/pages/now.mdx)

> **Tạm ẩn** — `/now` route trả 404, ẩn khỏi nav, bỏ khỏi sitemap. Re-enable: đổi `ENABLED = true` trong [src/app/[locale]/now/page.tsx](src/app/[locale]/now/page.tsx) và thêm lại vào nav + sitemap.

### Work case studies — frontmatter links rỗng

Content nằm ở `content/{vi,en}/work/` (đã localize). Trạng thái hiện tại:

- [x] [examino.mdx](content/vi/work/examino.mdx#L9-L11) — có live `examino.vn`; `github` để rỗng có chủ ý (source không public)
- [x] [pes-arena.mdx](content/vi/work/pes-arena.mdx#L9-L11) — có live `pesarena.taiphanvan.dev` + repo `phanvantai/game_note`
- [ ] [quickspend.mdx](content/vi/work/quickspend.mdx#L9-L11) — có live `quickspend.taiphanvan.dev`; `github` rỗng (App Store link + repo nếu public)

### Work case studies — body sections `(Coming soon.)`

- [x] [examino.mdx](content/vi/work/examino.mdx) — viết lại toàn bộ 2026-09-23 (vi + en), status `shipped`
- [x] [pes-arena.mdx](content/vi/work/pes-arena.mdx) — đã viết đủ
- [x] [quickspend.mdx](content/vi/work/quickspend.mdx) — đã viết đủ

## Không phải placeholder (đừng đụng)

- `scripts/new-post.ts` chữ `TODO` — là template cho bài blog mới (`pnpm new-post`)
- `.env.example` `xxxxx` / `PASSWORD` — file example, đúng style
- `docs/*.md` chữ `xxxxx` / `<password>` — ví dụ trong docs
