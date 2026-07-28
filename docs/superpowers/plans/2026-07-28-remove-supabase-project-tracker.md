# Remove Supabase Project Tracker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Side Project Tracker and every website-owned Supabase, Prisma, PostgreSQL,
authentication, and keep-alive dependency from taiphanvan.dev.

**Architecture:** The resulting Next.js site is file-backed: localized MDX provides all blog, work,
and page content, and the proxy only redirects `/` to the default locale. Tracker routes are deleted
without replacement, and `/tools` is removed because it has no remaining content.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, next-intl, MDX, Tailwind CSS 4, pnpm.

## Global Constraints

- Preserve unrelated portfolio facts: Examino may still list Prisma and Supabase, and QuickSpend may
  still use the word "tracker."
- Do not delete or mutate the remote Supabase project, Vercel environment values, or GitHub secrets.
- Preserve the user's untracked `AGENTS.md` file while updating its stale repository guidance.
- Do not add redirects for removed tracker URLs; normal Next.js not-found behavior is intended.
- Run all repository edits through `apply_patch`; use package-manager commands only for lockfile
  regeneration and verification.
- Do not modify `.env` or `.env.local`, because they may contain user secrets and are not tracked.

---

## File Map

### Delete

- `.github/workflows/keep-alive.yml`
- `docker-compose.yml`
- `prisma.config.ts`
- `prisma/` (schema, migration, and seed)
- `src/app/[locale]/tools/` (tools index and complete tracker route tree)
- `src/app/api/tracker/`
- `src/app/api/cron/keep-alive/`
- `src/lib/auth.ts`
- `src/lib/db.ts`
- `src/types/tracker.ts`
- `src/components/ui/badge.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/sonner.tsx`
- `src/components/ui/textarea.tsx`
- `docs/DATABASE.md`
- `docs/TRACKER.md`
- `plans/01-tracker.md`

### Modify

- `src/lib/site-config.ts`: remove Tools navigation.
- `src/components/site/nav.tsx`: narrow translation key union.
- `src/components/site/mobile-nav.tsx`: narrow translation key union.
- `src/components/site/command-palette.tsx`: remove Tools icon and tracker command.
- `src/app/[locale]/layout.tsx`: remove the tracker-only toast provider.
- `src/app/sitemap.ts`: remove `/tools`.
- `src/app/robots.ts`: remove obsolete tracker/API exclusions.
- `src/proxy.ts`: retain only root locale redirection.
- `messages/en.json`, `messages/vi.json`: remove Tools and tracker translations.
- `src/components/home/hero-terminal.tsx`, `src/components/home/hero-cypher.tsx`: describe the
  current file-backed website stack.
- `src/lib/utils.ts`: remove tracker-only `daysSince`.
- `content/vi/pages/about.mdx`: remove this site's Supabase/Prisma/Tracker claims.
- `.env.example`: keep only site URL and UI-style configuration.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`: remove database and tracker-only packages,
  scripts, and build approvals.
- `README.md`, `docs/SETUP.md`, `docs/DEPLOY.md`, `docs/STACK.md`, `TODOS.md`, `CLAUDE.md`,
  `AGENTS.md`: describe the remaining database-free site.
- `plans/README.md`, `plans/00-foundation.md`, `plans/03-homepage-seo.md`, `plans/04-polish.md`:
  remove instructions and acceptance checks for the retired product.

---

### Task 1: Remove Tracker Routes and Public Entry Points

**Files:**

- Delete: `src/app/[locale]/tools/`
- Delete: `src/app/api/tracker/`
- Modify: `src/lib/site-config.ts`
- Modify: `src/components/site/nav.tsx`
- Modify: `src/components/site/mobile-nav.tsx`
- Modify: `src/components/site/command-palette.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Modify: `messages/en.json`
- Modify: `messages/vi.json`

**Interfaces:**

- Consumes: `siteConfig.nav`, `withLocale()`, and the existing `Site.nav` translation namespace.
- Produces: a public route/navigation graph containing Work and Blog but no Tools or Tracker entry.

- [ ] **Step 1: Run the removal acceptance check and verify RED**

```bash
test ! -e 'src/app/[locale]/tools' \
  && test ! -e src/app/api/tracker \
  && ! rg -n '/tools|trackerTitle|trackerDescription|trackerStatus' \
    src/lib/site-config.ts src/components/site src/app/sitemap.ts messages
```

Expected: exit status `1` because the route trees and public links still exist.

- [ ] **Step 2: Delete the product route trees**

Delete every tracked file below `src/app/[locale]/tools/` and `src/app/api/tracker/`. Do not add a
replacement page or redirect.

- [ ] **Step 3: Remove Tools from navigation and command search**

Change `siteConfig.nav` to:

```ts
nav: [
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
],
```

In both navigation components, change the key assertion to:

```ts
const key = item.href.slice(1) as "work" | "blog";
```

Remove the `"/tools"` entry from `NAV_ICONS`, remove the standalone tracker `CommandItem`, and use
the same `"work" | "blog"` key union in `command-palette.tsx`. Remove `WrenchIcon` only if the Work
navigation icon no longer needs it; the current Work entry still uses it.

- [ ] **Step 4: Remove tracker-only layout and metadata wiring**

Remove the `Toaster` import and `<Toaster />` from `src/app/[locale]/layout.tsx`. Remove `/tools` from
the static sitemap array. Simplify robots rules to:

```ts
rules: [
  {
    userAgent: "*",
    allow: "/",
  },
],
```

Delete `Site.nav.tools`, `Site.command.tracker`, and the entire top-level `Tools` object from both
translation JSON files.

- [ ] **Step 5: Verify GREEN**

```bash
test ! -e 'src/app/[locale]/tools' \
  && test ! -e src/app/api/tracker \
  && ! rg -n '/tools|trackerTitle|trackerDescription|trackerStatus' \
    src/lib/site-config.ts src/components/site src/app/sitemap.ts messages
```

Expected: exit status `0` with no matches.

- [ ] **Step 6: Run targeted static checks**

```bash
pnpm typecheck
pnpm lint src/components/site src/app/sitemap.ts src/app/robots.ts 'src/app/[locale]/layout.tsx'
```

Expected: both commands pass without missing translation keys or deleted-route imports.

---

### Task 2: Remove Authentication, Database, Keep-Alive, and Orphan Dependencies

**Files:**

- Delete: `.github/workflows/keep-alive.yml`
- Delete: `src/app/api/cron/keep-alive/route.ts`
- Delete: `src/lib/auth.ts`
- Delete: `src/lib/db.ts`
- Delete: `src/types/tracker.ts`
- Delete: `prisma.config.ts`
- Delete: `prisma/schema.prisma`
- Delete: `prisma/seed.ts`
- Delete: `prisma/migrations/20260509143452_init/migration.sql`
- Delete: `docker-compose.yml`
- Delete: tracker-only files under `src/components/ui/` listed in the File Map.
- Modify: `src/proxy.ts`
- Modify: `src/lib/utils.ts`
- Modify: `.env.example`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `pnpm-workspace.yaml`

**Interfaces:**

- Consumes: `defaultLocale` and `withLocale()` from `src/i18n/routing.ts`.
- Produces: a database-free install and a proxy that only redirects `/` to the default locale.

- [ ] **Step 1: Run the infrastructure-removal check and verify RED**

```bash
test ! -e prisma \
  && test ! -e prisma.config.ts \
  && test ! -e docker-compose.yml \
  && test ! -e src/lib/db.ts \
  && test ! -e src/lib/auth.ts \
  && test ! -e .github/workflows/keep-alive.yml \
  && ! rg -n 'DATABASE_URL|TRACKER_PASSWORD|CRON_SECRET|@prisma|"pg"|"prisma"' \
    .env.example package.json pnpm-workspace.yaml src
```

Expected: exit status `1` because the infrastructure still exists.

- [ ] **Step 2: Delete application-owned infrastructure**

Delete the keep-alive route/workflow, authentication and database helpers, tracker types, the full
`prisma/` tree, `prisma.config.ts`, and `docker-compose.yml`.

- [ ] **Step 3: Simplify the proxy and tracker-only utility**

Replace `src/proxy.ts` with:

```ts
import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, withLocale } from "@/i18n/routing";

export function proxy(req: NextRequest) {
  return NextResponse.redirect(new URL(withLocale(defaultLocale, "/"), req.url));
}

export const config = {
  matcher: ["/"],
};
```

Delete only the `daysSince()` export from `src/lib/utils.ts`; keep `cn`, `formatDate`, and `slugify`.

- [ ] **Step 4: Remove database and tracker environment examples**

Delete the Database, Tracker auth, and Cron/keep-alive sections from `.env.example`. Preserve
`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_UI_STYLE` with their current comments and values.

- [ ] **Step 5: Remove scripts and direct dependencies**

Remove these scripts from `package.json`:

```text
db:up, db:down, db:logs, db:reset, db:migrate, db:push, db:seed, db:studio, db:generate, postinstall
```

Remove these dependencies:

```text
@prisma/adapter-pg, @prisma/client, dotenv, pg, react-markdown, sonner, zod
```

Remove these dev dependencies:

```text
@types/pg, prisma
```

`tsx` remains because `scripts/new-post.ts` uses it.

- [ ] **Step 6: Delete tracker-only UI primitives and clean layout wiring**

Delete `badge.tsx`, `card.tsx`, `checkbox.tsx`, `input.tsx`, `label.tsx`, `select.tsx`,
`separator.tsx`, `sonner.tsx`, and `textarea.tsx` from `src/components/ui/`. Repository-wide import
searches show no non-tracker consumers; `CommandSeparator` is implemented inside `command.tsx` and
does not depend on `separator.tsx`.

- [ ] **Step 7: Regenerate the lockfile without running lifecycle scripts**

First remove Prisma-only build approvals from `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  sharp: true
  unrs-resolver: true
  "@tailwindcss/oxide": true
  msw: false
  esbuild: true
onlyBuiltDependencies:
  - sharp
  - unrs-resolver
  - "@tailwindcss/oxide"
  - esbuild
```

Then run:

```bash
pnpm install --lockfile-only --ignore-scripts
```

Expected: `pnpm-lock.yaml` no longer resolves Prisma, PostgreSQL, Zod, React Markdown, or Sonner as
direct project dependencies.

- [ ] **Step 8: Verify GREEN**

```bash
test ! -e prisma \
  && test ! -e prisma.config.ts \
  && test ! -e docker-compose.yml \
  && test ! -e src/lib/db.ts \
  && test ! -e src/lib/auth.ts \
  && test ! -e .github/workflows/keep-alive.yml \
  && ! rg -n 'DATABASE_URL|TRACKER_PASSWORD|CRON_SECRET|@prisma|"pg"|"prisma"' \
    .env.example package.json pnpm-workspace.yaml src
```

Expected: exit status `0` with no matches.

---

### Task 3: Align Current Content and Repository Documentation

**Files:**

- Delete: `docs/DATABASE.md`
- Delete: `docs/TRACKER.md`
- Delete: `plans/01-tracker.md`
- Modify: `src/components/home/hero-terminal.tsx`
- Modify: `src/components/home/hero-cypher.tsx`
- Modify: `content/vi/pages/about.mdx`
- Modify: `README.md`
- Modify: `docs/SETUP.md`
- Modify: `docs/DEPLOY.md`
- Modify: `docs/STACK.md`
- Modify: `TODOS.md`
- Modify: `CLAUDE.md`
- Modify: `AGENTS.md`
- Modify: `plans/README.md`
- Modify: `plans/00-foundation.md`
- Modify: `plans/03-homepage-seo.md`
- Modify: `plans/04-polish.md`

**Interfaces:**

- Consumes: the database-free architecture completed in Tasks 1 and 2.
- Produces: user-facing copy and contributor instructions that accurately describe the repository.

- [ ] **Step 1: Run the owned-reference check and verify RED**

```bash
rg -n -i 'supabase|prisma|postgres|project tracker|side project tracker|/tools|tracker_auth|keep-alive' \
  README.md docs TODOS.md CLAUDE.md AGENTS.md plans src/components/home content/vi/pages/about.mdx
```

Expected: matches in website-owned copy and documentation.

- [ ] **Step 2: Update current public copy**

Use `next.js / typescript / tailwind / mdx` for the Terminal hero stack and
`next.js · mdx` for the Cypher hero stack. In the Vietnamese About page:

- Rewrite the self-hosting line to mention Vercel only, without claiming this site uses Supabase.
- Change the Web stack to `Next.js (App Router), TypeScript, Tailwind, MDX`.
- Remove the Tracker roadmap item and describe the remaining Foundation, Content, Homepage/SEO,
  and Polish/deploy phases without renumbering them as an active Tracker plan.

- [ ] **Step 3: Rewrite current setup and operations documentation**

Make `README.md` quick start exactly:

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Its Stack section must list framework, UI, file-based MDX content, deployment, and tooling only. Its
Scripts table must contain `dev`, `build`, `start`, `typecheck`, `lint`, `lint:fix`, `format`,
`format:check`, and `new-post`. Remove database/tracker docs from its documentation table and change
the license example from `Next.js + Prisma + MDX` to `Next.js + MDX`.

Rewrite `docs/SETUP.md` to cover Node 22+, pnpm, install, optional `.env.local`, dev startup, the
localized public routes, quality commands, and Git hooks. Remove all database/auth troubleshooting.

Rewrite `docs/DEPLOY.md` to cover GitHub → Vercel, `NEXT_PUBLIC_SITE_URL` and
`NEXT_PUBLIC_UI_STYLE`, first deploy, custom domain, public-route smoke tests, analytics, rollback,
and remaining Next/MDX troubleshooting. Remove migration and tracker checks.

Rewrite `docs/STACK.md` to retain current Next/React/TypeScript/Tailwind/shadcn/Node/pnpm versions,
Next 15→16 and shadcn notes, the explicit decision not to use the Vercel AI SDK, linting/formatting,
and phase-plan links. Remove every Prisma, database, and tracker-auth section.

- [ ] **Step 4: Update contributor guidance and live checklists**

In `TODOS.md`, delete the complete database/tracker deploy-verification section and remove database
examples from the “do not touch” list.

In `CLAUDE.md`, remove database commands, Prisma/Postgres architecture, Tracker auth, and `/tools`
routing. Update the project summary to “Vietnamese blog + portfolio,” state that content is
file-backed MDX, and keep Node 22+ as the repository requirement.

In `AGENTS.md`, remove Prisma from the project summary/structure, database commands/tests/docs, and
security links. Keep the existing coding, verification, branch, commit, and secret-handling rules.

- [ ] **Step 5: Clean historical plans without rewriting unrelated history**

Delete `plans/01-tracker.md`. In `plans/README.md`, remove its row and all database/Tracker rules;
describe Plan 00 as the shared site foundation. In `plans/00-foundation.md`, remove Tracker-targeted
goals, preinstalled primitives, route placeholders, and environment handoff. In
`plans/03-homepage-seo.md`, remove `/tools` from sitemap and Tracker from robots. In
`plans/04-polish.md`, remove Tools from command palette, Tracker loading, Supabase setup, Tracker
auth/deploy variables, and Tracker production acceptance checks.

- [ ] **Step 6: Verify owned references are gone and portfolio references remain**

```bash
! rg -n -i 'supabase|prisma|postgres|project tracker|side project tracker|/tools|tracker_auth|keep-alive' \
  README.md docs TODOS.md CLAUDE.md AGENTS.md plans src/components/home content/vi/pages/about.mdx
rg -n 'Supabase|Prisma' content/en/work/examino.mdx content/vi/work/examino.mdx
rg -n -i 'tracker' content/en/work/quickspend.mdx content/vi/work/quickspend.mdx \
  content/vi/blog/2026-05-23-quickspend-now-really-quick-finally.mdx
```

Expected: the first command exits `0` with no matches; the portfolio checks print the preserved
Examino and QuickSpend references.

---

### Task 4: Format and Verify the Database-Free Site

**Files:**

- Verify: every file changed in Tasks 1–3.

**Interfaces:**

- Consumes: the complete removal.
- Produces: evidence that the repository installs, checks, and builds without database setup.

- [ ] **Step 1: Format all changed supported files**

```bash
./node_modules/.bin/prettier --write \
  .env.example AGENTS.md CLAUDE.md README.md TODOS.md package.json pnpm-workspace.yaml \
  content/vi/pages/about.mdx docs/SETUP.md docs/DEPLOY.md docs/STACK.md \
  plans/README.md plans/00-foundation.md plans/03-homepage-seo.md plans/04-polish.md \
  src/app/robots.ts src/app/sitemap.ts 'src/app/[locale]/layout.tsx' src/proxy.ts \
  src/components/home/hero-cypher.tsx src/components/home/hero-terminal.tsx \
  src/components/site/command-palette.tsx src/components/site/mobile-nav.tsx \
  src/components/site/nav.tsx src/lib/site-config.ts src/lib/utils.ts messages/en.json messages/vi.json
```

Expected: Prettier completes without errors.

- [ ] **Step 2: Confirm deleted imports and owned infrastructure references are absent**

```bash
! rg -n --hidden --glob '!node_modules' --glob '!.git' \
  '@/lib/(auth|db)|@/types/tracker|@prisma|DATABASE_URL|MIGRATE_DATABASE_URL|TRACKER_PASSWORD|TRACKER_COOKIE_SECRET|CRON_SECRET|/api/tracker|/api/cron/keep-alive|/tools/tracker' \
  .
```

Expected: exit status `0` with no matches outside the design and implementation-plan documents. If
the plan/spec matches appear, rerun with `--glob '!docs/superpowers/**'` and require zero matches.

- [ ] **Step 3: Confirm no empty tracked directories or orphan imports remain**

```bash
rg -n 'components/ui/(badge|card|checkbox|input|label|select|separator|sonner|textarea)' src
rg -n 'from "(dotenv|zod|react-markdown|sonner)"' src scripts
```

Expected: both commands exit `1` with no matches.

- [ ] **Step 4: Run the repository quality gate**

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Expected: every command exits `0`; build output contains no Prisma generation or database connection
attempt.

- [ ] **Step 5: Review the final diff and working tree**

```bash
git diff --check
git diff --stat
git status --short
```

Expected: no whitespace errors; only the intended removal, cleanup, and the pre-existing untracked
`AGENTS.md` status are present. Because `AGENTS.md` is updated as part of this task, include it in the
final change set without deleting it.

- [ ] **Step 6: Commit the implementation after verification**

```bash
git add .env.example .github README.md TODOS.md CLAUDE.md AGENTS.md content docs package.json \
  pnpm-lock.yaml pnpm-workspace.yaml plans src prisma.config.ts docker-compose.yml prisma
git commit -m "refactor: remove Supabase project tracker"
```

Expected: one focused implementation commit. If a listed deleted path no longer exists, stage tracked
deletions with `git add -A -- <parent-directory>` while keeping unrelated user changes unstaged.
