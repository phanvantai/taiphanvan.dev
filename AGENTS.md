# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router site with TypeScript and MDX.

- `src/app/` contains routes, layouts, APIs, metadata routes, and global CSS.
- `src/components/` is split by area: `ui/`, `site/`, `home/`, `blog/`, `work/`, `mdx/`, and `seo/`.
- `src/lib/` holds shared MDX, site config, TOC, UI-style, and utility code.
- `content/{en,vi}/` stores localized MDX pages, blog posts, and work entries.
- `messages/` contains `next-intl` translation JSON.
- `public/` stores assets and fonts.
- `docs/` has setup, deploy, stack, and design notes.

## Build, Test, and Development Commands

Use `pnpm` with Node 22+.

- `pnpm dev` starts the local Next.js dev server at `http://localhost:3000`.
- `pnpm build` creates a production build.
- `pnpm start` runs the production build.
- `pnpm lint` / `pnpm lint:fix` runs ESLint.
- `pnpm typecheck` runs `tsc --noEmit`.
- `pnpm format` / `pnpm format:check` applies or checks Prettier formatting.
- `pnpm new-post "Post Title"` creates a prefilled blog MDX file.

## Coding Style & Naming Conventions

Follow `.prettierrc`: 2-space indentation, semicolons, double quotes, trailing commas, and 100-character lines. Let `prettier-plugin-tailwindcss` sort Tailwind classes. Use kebab-case filenames, PascalCase exported React components, and camelCase functions and variables. Prefer `cn`, `src/lib/site-config.ts`, and `src/components/ui/` primitives before adding patterns.

## Testing Guidelines

There is no dedicated test suite yet. Before publishing, run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`. If adding tests later, colocate them near the feature with names like `component-name.test.tsx`.

## Branch, Commit & Pull Request Guidelines

This is a personal site with high experimentation. Work directly on the single `main` branch unless larger work needs isolation. Avoid pushing every tiny adjustment: batch related edits into focused commits once the idea is coherent and locally checked.

Recent history uses short imperative messages, with Conventional Commit prefixes, for example `feat: add minimalist design style` and `fix: update location from Saigon to Hanoi`. For larger or risky PRs, include a summary, screenshots, content/localization notes, and verification commands.

## Security & Configuration Tips

Do not commit secrets. Start from `.env.example`, keep local values in `.env` or `.env.local`, and review `docs/SETUP.md` before changing runtime configuration.
