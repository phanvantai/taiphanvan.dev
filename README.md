# taiphanvan.dev

Personal site của Tai Phan — engineer, indie maker. Blog tiếng Việt + portfolio + mini tools (side project tracker).

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript strict
- **UI**: Tailwind v4 + shadcn/ui (base-nova preset, Base UI primitives) + next-themes
- **Database**: Postgres (Supabase prod, Docker local) + Prisma 7 với driver adapter `@prisma/adapter-pg`
- **Content**: MDX file-based (Plan 02)
- **Deploy**: Vercel + custom domain `taiphanvan.dev`
- **Tooling**: pnpm, Node 22+, Husky + lint-staged

## Quick start

```bash
pnpm install
cp .env.example .env.local        # fill values — xem docs/SETUP.md
pnpm db:up                        # local Postgres trong Docker (optional, có thể dùng Supabase)
pnpm prisma migrate deploy        # apply schema
pnpm db:seed                      # 4 starter projects
pnpm dev                          # http://localhost:3000
```

Setup chi tiết: **[docs/SETUP.md](docs/SETUP.md)**.

## Documentation

| Doc | Nội dung |
| --- | --- |
| [docs/SETUP.md](docs/SETUP.md) | First-time setup: clone → install → env → DB → run |
| [docs/DATABASE.md](docs/DATABASE.md) | 2-URL Supabase pattern, switch local Docker ↔ Supabase, command cheatsheet |
| [docs/TRACKER.md](docs/TRACKER.md) | Side Project Tracker: auth model, env vars, cách dùng |
| [docs/STACK.md](docs/STACK.md) | Quyết định stack + version log + breaking changes vs spec gốc |
| [plans/](plans/) | Phase roadmap — Plan 00 → 04 |

## Scripts

| Script | Mục đích |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `lint:fix` | ESLint |
| `pnpm format` | Prettier write all |
| `pnpm db:up` | Start local Postgres (Docker) |
| `pnpm db:down` | Stop local Postgres |
| `pnpm db:logs` | Tail local Postgres logs |
| `pnpm db:reset` | Wipe local DB + migrate + seed |
| `pnpm db:migrate` | `prisma migrate dev` (tạo migration mới) |
| `pnpm db:seed` | Seed 4 starter projects |
| `pnpm db:studio` | Prisma Studio (GUI) |
| `pnpm db:generate` | Generate Prisma client |

## License

Private. Code này là personal project của Tai Phan, không open source.
