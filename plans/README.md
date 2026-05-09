# Plans — taiphanvan.dev

Roadmap chia nhỏ để build từng phase. Sau mỗi plan **dừng demo** rồi mới qua plan tiếp theo.

| # | Plan | Mục tiêu | Trạng thái |
| --- | --- | --- | --- |
| 00 | [Foundation](./00-foundation.md) | Next 16 + Tailwind v4 + shadcn + theme + nav, đủ chạy tracker | ✅ done |
| 01 | [Tracker](./01-tracker.md) | **PRIORITY** — Side Project Tracker hoàn chỉnh (DB + auth + UI) | ✅ done |
| 02 | [Content (MDX)](./02-content-mdx.md) | `/blog`, `/work`, `/about`, `/now` với MDX | ✅ done |
| 03 | [Homepage + SEO](./03-homepage-seo.md) | `/` + dynamic OG + sitemap/robots/rss + JSON-LD | ✅ done |
| 04 | [Polish](./04-polish.md) | Cmd+K, view transitions, 404/error, README, deploy Vercel | ⏳ pending |

## Quy tắc

- Stack thực tế: Next 16 App Router + TS strict, Tailwind v4, shadcn (base-nova / Base UI), Prisma 7 + driver adapter (`@prisma/adapter-pg`), Postgres (Docker local + Supabase prod), MDX file-based, pnpm, Node 22+.
- Local DB qua `pnpm db:up` (Docker compose), prod sẽ point sang Supabase qua env vars.
- RSC mặc định, Server Actions ưu tiên hơn API routes.
- Latest stable cho mọi package; flag bro nếu có breaking change đáng kể.
- Không `any`, error handling `{ ok, error }`, a11y, loading.tsx hợp lý.
