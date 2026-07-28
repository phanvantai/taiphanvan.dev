# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

Personal site `taiphanvan.dev` — Vietnamese blog + portfolio. Source-available, **not open source**;
read the license note in [README.md](README.md) before suggesting reuse.

## Commands

```bash
pnpm dev              # Next dev server
pnpm build            # Production build
pnpm typecheck        # tsc --noEmit
pnpm lint / lint:fix  # ESLint 9
pnpm format           # Prettier write
pnpm format:check     # Prettier check
pnpm new-post "Title" # Scaffold content/vi/blog/<date>-<slug>.mdx
```

No dedicated test runner is wired up. Husky + lint-staged run on commit.

## Architecture

- **Next 16 + React 19**, App Router, RSC, async page params, and Turbopack.
- **TypeScript strict + `noUncheckedIndexedAccess`**; array indexing returns `T | undefined`.
- **Tailwind v4** with CSS-first config and OKLCH tokens in `src/app/globals.css`.
- **shadcn/ui base-nova preset** uses Base UI. Polymorphic components use `render={<Link />}` rather
  than `asChild`.
- **Node 22+**; `.nvmrc` pins Node 24.

See [docs/STACK.md](docs/STACK.md) for version and migration notes.

### Routing and content

- `src/app/` contains localized App Router pages plus metadata, OG, RSS, sitemap and robots routes.
- Public destinations are home, blog and work. `/about` and `/now` remain temporarily gated by
  `ENABLED = false` constants in their page files.
- `src/proxy.ts` redirects `/` to the default locale.
- `src/lib/mdx.ts` reads localized file-backed content from `content/{vi,en}/`.
- Blog filenames use `YYYY-MM-DD-slug.mdx`; unpublished posts are filtered out.

Content directories are the source of truth. Do not auto-generate or rewrite prose unless the user
asks for content changes.

### UI style switch

`NEXT_PUBLIC_UI_STYLE` selects `cypher-2049` (default), `terminal`, `neo-brutalist`, or `minimalist`
through `src/lib/ui-style.ts`. Check all existing style branches before adding a visual feature.

Design references:

- `docs/design-system.md`
- `docs/design/cypher-2049.md`
- `docs/design/terminal.md`
- `docs/design/neo-brutalist.md`
- `docs/design/minimalist.md`

## Conventions

- Prefer latest stable versions; review breaking changes before major upgrades.
- Quality bar is production-ready even though this is a personal site.
- `plans/` is historical; `TODOS.md` is the live pre-public checklist.
- Server-only modules keep `import "server-only"` at the top.
- Path alias: `@/*` → `src/*`.
