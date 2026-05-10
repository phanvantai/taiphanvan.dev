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

### About page — [content/pages/about.mdx](content/pages/about.mdx)

> **Tạm ẩn** — `/about` route trả 404, ẩn khỏi nav, bỏ khỏi sitemap. Re-enable: đổi `ENABLED = true` trong [src/app/about/page.tsx](src/app/about/page.tsx) và thêm lại vào nav + sitemap.

- [ ] [L22](content/pages/about.mdx#L22) "Email coming soon" — điền `taipv.swe@gmail.com` hoặc xoá đoạn này (xử khi re-enable)
- [ ] [L24-25](content/pages/about.mdx#L24-L25) verify Twitter/Github handle khớp với site-config — hiện tại sai (`@taiphanvan` thay vì `phanvantai`); fix khi re-enable
- [ ] L11 "đang chuyển dần sang web" mâu thuẫn framing mới của hello-world — rewrite khi re-enable
- [ ] L46 link `github.com/taiphanvan/taiphanvan-dev/tree/main/plans` — sai org, sửa thành `phanvantai` khi re-enable

### Now page — [content/pages/now.mdx](content/pages/now.mdx)

> **Tạm ẩn** — `/now` route trả 404, ẩn khỏi nav, bỏ khỏi sitemap. Re-enable: đổi `ENABLED = true` trong [src/app/now/page.tsx](src/app/now/page.tsx) và thêm lại vào nav + sitemap.

### Work case studies — frontmatter links rỗng

Cả 4 file đều có `links.live: ""` và `links.github: ""`:

- [ ] [content/work/examino.mdx:9-11](content/work/examino.mdx#L9-L11) — URL live + repo (nếu public)
- [ ] [content/work/pes-arena.mdx:9-11](content/work/pes-arena.mdx#L9-L11) — URL live + repo
- [ ] [content/work/quickspend.mdx:9-11](content/work/quickspend.mdx#L9-L11) — App Store link + repo
- [ ] [content/work/littlemark.mdx:9-11](content/work/littlemark.mdx#L9-L11) — App Store link + repo

### Work case studies — body sections `(Coming soon.)`

- [ ] [content/work/examino.mdx](content/work/examino.mdx) — Tech stack, Challenges, Lessons (Background đã có)
- [ ] [content/work/littlemark.mdx](content/work/littlemark.mdx) — Background, Tech stack, Challenges, Lessons
- [ ] [content/work/pes-arena.mdx](content/work/pes-arena.mdx) — Background, Tech stack, Challenges, Lessons
- [ ] [content/work/quickspend.mdx](content/work/quickspend.mdx) — Background, Tech stack, Challenges, Lessons

## Verify trước khi deploy

- [ ] `.env.local` — `TRACKER_PASSWORD` đã set chưa (không để `dev`)
- [ ] `.env.local` — `TRACKER_COOKIE_SECRET` đã generate 32+ ký tự (`openssl rand -hex 32`) chưa
- [ ] `.env.local` — `DATABASE_URL` + `MIGRATE_DATABASE_URL` trỏ Supabase prod chưa

## Không phải placeholder (đừng đụng)

- `scripts/new-post.ts` chữ `TODO` — là template cho bài blog mới (`pnpm new-post`)
- `.env.example` `xxxxx` / `PASSWORD` — file example, đúng style
- `docs/*.md` chữ `xxxxx` / `<password>` — ví dụ trong docs
- `docker-compose.yml` `POSTGRES_PASSWORD: dev` — local dev DB
