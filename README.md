# taiphanvan.dev

Personal site của Tai Phan — engineer, indie maker. Blog tiếng Việt + portfolio.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript strict
- **UI**: Tailwind v4 + shadcn/ui (base-nova preset, Base UI primitives) + next-themes
- **Content**: MDX file-based, song ngữ Việt/Anh qua next-intl
- **Deploy**: Vercel + custom domain `taiphanvan.dev`
- **Tooling**: pnpm, Node 22+, Husky + lint-staged

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Mở `http://localhost:3000`. Setup chi tiết: **[docs/SETUP.md](docs/SETUP.md)**.

## Documentation

| Doc | Nội dung |
| --- | --- |
| [docs/SETUP.md](docs/SETUP.md) | First-time setup: clone → install → env → run |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Vercel deploy, custom domain và troubleshooting |
| [docs/STACK.md](docs/STACK.md) | Quyết định stack + version log + breaking changes |
| [docs/design-system.md](docs/design-system.md) | Kiến trúc design system và cách thêm UI style |
| [plans/](plans/) | Roadmap lịch sử của site |

## Scripts

| Script | Mục đích |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Chạy production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `pnpm lint:fix` | ESLint check/fix |
| `pnpm format` / `pnpm format:check` | Prettier write/check |
| `pnpm new-post "Title"` | Tạo blog MDX mới với frontmatter prefilled |

## Content workflow

- Blog: `pnpm new-post "Tên bài"`, rồi edit file mới trong `content/{vi,en}/blog/`.
- Work: tạo `content/{vi,en}/work/[slug].mdx` với frontmatter theo các entry hiện có.
- Pages: edit MDX trong `content/{vi,en}/pages/`.
- Push lên `main` để Vercel tự deploy.

## License

Source-available, **không phải open source**. Code public để bro dev khác tham khảo cách wire
Next.js + MDX và học theo `plans/`, nhưng:

- Content (blog posts, work case studies, `/about`, `/now`) thuộc bản quyền Tai Phan, không reuse.
- Clone copy-paste để chạy thành “personal site của bro” là không OK.
- Lifting component patterns hoặc scripts vào project bro thì tự nhiên.

Có gì confused thì DM Tai một câu.
