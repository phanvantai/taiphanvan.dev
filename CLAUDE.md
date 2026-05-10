# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal site `taiphanvan.dev` — Vietnamese blog + portfolio + Side Project Tracker mini-tool. Source-available, **not open source** (see [README.md](README.md) license note before suggesting reuse).

## Commands

```bash
pnpm dev              # Next dev (Turbopack) on :3000
pnpm build            # Production build (also runs `prisma generate` postinstall)
pnpm typecheck        # tsc --noEmit
pnpm lint / lint:fix  # ESLint 9
pnpm format           # Prettier write all

# Database (Prisma 7 + pg adapter)
pnpm db:up            # local Postgres in Docker (port 5433 host → 5432)
pnpm db:down
pnpm db:reset         # DESTRUCTIVE: wipe volume + migrate + seed
pnpm db:migrate       # prisma migrate dev — pass `-- --name <slug>` for new migrations
pnpm db:seed          # tsx prisma/seed.ts (4 starter projects)
pnpm db:studio
pnpm db:generate

pnpm new-post "Title" # scripts/new-post.ts — scaffolds content/blog/<date>-<slug>.mdx
```

No test runner is wired up. Husky + lint-staged auto-fix on commit.

## Architecture

### Stack non-obvious points

- **Next 16 + React 19**, App Router, RSC, Server Actions. `pnpm dev` uses Turbopack by default. Page `params` and `searchParams` are `Promise<>` (Next 16 change).
- **Prisma 7 with `@prisma/adapter-pg` driver adapter**. This is a major break from Prisma 6 patterns:
  - `schema.prisma` does NOT contain `url` / `directUrl`. Connection strings live in env, wired through [prisma.config.ts](prisma.config.ts).
  - `PrismaClient` MUST be instantiated with the pg adapter — see [src/lib/db.ts](src/lib/db.ts). Don't `new PrismaClient()` without it; the transaction pooler will reject prepared statements.
  - Seed runner is configured in [prisma.config.ts](prisma.config.ts) under `migrations.seed`, NOT in `package.json` `prisma.seed`.
- **shadcn/ui base-nova preset** (Base UI, not Radix). Polymorphic API uses `render={<Link />}` not `asChild`. Extra sizes: `xs`, `icon-xs`, `icon-sm`, `icon-lg`.
- **Tailwind v4** (CSS-first config, OKLCH theme tokens). Theme/tokens live in [src/app/globals.css](src/app/globals.css).
- **TypeScript strict + `noUncheckedIndexedAccess`** — array indexing returns `T | undefined`, plan accordingly.
- **Node 22+** (Prisma 7 rejects odd-numbered Node <24, so Node 23 won't work).

See [docs/STACK.md](docs/STACK.md) for the version log + breaking-change notes vs the original spec.

### Two-URL Postgres pattern (production)

Supabase prod uses two pooler endpoints split between runtime and migrations:

- `DATABASE_URL` → Transaction pooler (port 6543, append `?pgbouncer=true`) → app runtime via [src/lib/db.ts](src/lib/db.ts). No prepared statements, no advisory locks, no LISTEN/NOTIFY.
- `MIGRATE_DATABASE_URL` → Session pooler (port 5432) → `prisma migrate` / `db seed` / `studio` via [prisma.config.ts](prisma.config.ts).
- If `MIGRATE_DATABASE_URL` is unset, prisma.config.ts falls back to `DATABASE_URL` (single-URL local Docker setup).

Full rationale in [docs/DATABASE.md](docs/DATABASE.md).

### Routing & content layers

- `src/app/` — App Router. Public pages: `/` (page.tsx), `/blog`, `/work`, `/tools`. Special files: `og/`, `rss.xml/`, `sitemap.ts`, `robots.ts`, `icon.tsx`, `apple-icon.tsx`.
- `/about` and `/now` are **temporarily disabled** — gated by `ENABLED = false` constants in their `page.tsx`, removed from nav and sitemap. Re-enabling is a 3-step toggle described in [TODOS.md](TODOS.md). Don't link to them until re-enabled.
- `src/proxy.ts` — Next 16 renamed middleware to "proxy". Gates `/tools/tracker/:path*` and `/api/tracker/:path*` via signed-cookie HMAC. Web Crypto only (no Node `crypto`) so it works on Edge.
- `src/lib/mdx.ts` — file-based content layer. Reads `content/blog/`, `content/work/`, `content/pages/`. Uses `gray-matter` + `react`'s `cache()`. Blog filename convention: `YYYY-MM-DD-slug.mdx` (date prefix is stripped from the slug). Posts with `published: false` are filtered out.
- Content directories ([content/](content/)) are the source of truth — DO NOT auto-generate or rewrite content files; ask first. Voice guidelines for any user-facing copy live in user-memory `feedback_voice.md` (friendly + casual Vietnamese, "bro" register, no corp/academic tone).

### Tracker auth (custom HMAC)

Single-user app — no NextAuth/Clerk. Cookie format: `<expiresAtMs>.<HMAC-SHA256(secret, expiresAtMs)>`. Code: [src/lib/auth.ts](src/lib/auth.ts). Server Actions in [src/app/tools/tracker/_actions.ts](src/app/tools/tracker/_actions.ts) all follow: `requireAuth()` → `zod.safeParse` → mutate → `revalidatePath("/tools/tracker")`. Return shape: `{ ok: true } | { ok: true, data } | { ok: false, error }`.

Mutations to `SideProject` should bump `lastUpdate` (drives the stale badge — see [docs/TRACKER.md § Stale badge logic](docs/TRACKER.md#stale-badge-logic)).

### UI style switch

`NEXT_PUBLIC_UI_STYLE` env var picks one of three site themes: `cypher-2049` (default), `terminal`, `neo-brutalist`. Resolved via [src/lib/ui-style.ts](src/lib/ui-style.ts) with a fallback. Components branch on this — when adding visual features, check existing style branches before adding a new style-aware component.

## Conventions

- Default to **latest stable** when bumping deps; don't pin to versions named in old plans/specs (memory: `feedback_versioning.md`).
- Quality bar: `chuẩn chỉnh`, not "làm cho xong" — even though it's a personal site, prefer best-practice infra/patterns over shortcuts (memory: `feedback_quality.md`).
- Phase plans in [plans/](plans/) (00 → 04) are the historical roadmap. Plans 00–01 done; 02 (MDX content) is in progress; 03–04 pending. [TODOS.md](TODOS.md) is the live pre-public checklist — check it before declaring identity / config work "done".
- Server-only files (e.g. [src/lib/mdx.ts](src/lib/mdx.ts)) import `"server-only"` at the top — keep that import when editing.
- Path alias: `@/*` → `src/*`.
