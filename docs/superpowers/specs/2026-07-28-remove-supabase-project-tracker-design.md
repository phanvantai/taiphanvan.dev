# Remove Supabase Project Tracker Design

## Goal

Remove the website's Side Project Tracker and its entire database stack so the site no longer
depends on Supabase, Prisma, PostgreSQL, database credentials, or tracker authentication.

References to Supabase or the word "tracker" that describe independent portfolio projects such
as Examino and QuickSpend remain unchanged.

## Scope

The removal includes:

- The localized `/tools` and `/tools/tracker` pages.
- Tracker login/logout API routes, server actions, schemas, components, and shared tracker types.
- The Supabase keep-alive API route and scheduled GitHub Actions workflow.
- Tracker cookie authentication and tracker-specific proxy behavior.
- Prisma runtime code, schema, migrations, seed data, configuration, and generated-client setup.
- PostgreSQL Docker configuration and all database package scripts.
- Prisma, PostgreSQL, and tracker-only package dependencies.
- Database, tracker, and cron environment variables from `.env.example`.
- Navigation, command-palette, sitemap, robots, translation, homepage, and about-page references
  that describe the removed tools or the website's former database stack.
- Dedicated tracker/database documentation and stale references in setup, deployment, stack,
  repository guidance, task lists, and historical implementation plans.
- UI primitives that have no remaining consumer after the tracker and tools pages are removed.

The removal does not modify production infrastructure outside this repository. Supabase projects,
Vercel environment variables, and GitHub repository secrets must be deleted manually by the owner
after deployment if desired.

## Architecture After Removal

The site becomes a file-backed Next.js application. Blog posts, work entries, and pages continue to
come from localized MDX files. No request path opens a database connection, no server action mutates
project data, and no scheduled request is required to keep external storage awake.

`src/proxy.ts` remains only for the root locale redirect. Public navigation contains Home, Work,
Blog, and About-related destinations already supported by the site, with no Tools entry. Requests to
the deleted routes use the normal Next.js not-found behavior.

## Removal Boundaries

### Application routes and UI

Delete the tracker route tree, tracker API route tree, keep-alive route, and the now-empty tools
index. Remove every link to those routes from site configuration, desktop/mobile navigation,
command palette, sitemap, and robots configuration. Remove tracker translations and narrow any
TypeScript unions that currently include `tools`.

### Authentication and proxy

Delete the HMAC cookie helper because it has no consumer after tracker and cron removal. Simplify
the proxy matcher and implementation to preserve only the existing `/` to default-locale redirect.
There is no replacement authentication flow.

### Database and operations

Delete Prisma and PostgreSQL source/configuration assets, including migrations and Docker Compose.
Remove database lifecycle scripts and the `postinstall` Prisma generation step. Regenerate the pnpm
lockfile after dependency removal. Delete the keep-alive workflow rather than leaving a request to a
missing endpoint.

### Documentation and content

Delete dedicated database/tracker documents and their dedicated tracker implementation plan.
Rewrite mixed documents so commands, environment tables, architecture notes, troubleshooting, and
deployment checks describe the remaining static/MDX site accurately. Historical plans may remain,
but references that instruct readers to build, deploy, or verify the removed tracker/database stack
must be removed or rewritten.

Update current personal-site descriptions that list Prisma or Supabase as this site's stack. Preserve
portfolio facts about independent products, including Examino's Supabase stack and QuickSpend's
expense-tracker wording.

## Dependency Pruning

Remove `@prisma/adapter-pg`, `@prisma/client`, `prisma`, `pg`, and `@types/pg`. Also remove libraries
and UI primitives that become unreferenced solely because the tracker disappeared, but only after a
repository-wide import search confirms they have no remaining consumer. General-purpose components
still used by the public site remain.

## Data and Error Behavior

No data migration or export is part of this repository change. Deleting local schema and migration
files does not delete the remote Supabase database. The owner may export or delete remote tracker
data separately.

Deleted URLs return the framework's standard localized or global 404 response. No redirect from the
old tracker route is added because there is no successor destination.

## Verification

Verification must demonstrate all of the following:

1. Repository-wide searches find no website-owned Supabase, Prisma, PostgreSQL, tracker route,
   tracker secret, or keep-alive reference. Portfolio references explicitly excluded from scope may
   remain.
2. No source import points to a deleted route, helper, type, component, or UI primitive.
3. `pnpm format:check` passes.
4. `pnpm lint` passes.
5. `pnpm typecheck` passes.
6. `pnpm build` completes without database environment variables or Prisma client generation.

## Acceptance Criteria

- Installing and building the site requires no database service or database environment variable.
- The public UI contains no Tools or Side Project Tracker entry.
- The tracker, tracker authentication, and keep-alive endpoints are absent.
- The repository contains no active Supabase/Prisma/PostgreSQL setup for this website.
- Documentation and repository guidance match the resulting file-backed architecture.
- Independent portfolio-project references remain intact.
