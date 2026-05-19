# Design System — taiphanvan.dev

Four swappable visual themes controlled by `NEXT_PUBLIC_UI_STYLE` env var. The active style is stamped as `data-ui-style` on the root `<html>` element and picked up by CSS attribute selectors and `getUIStyle()` in components.

## Styles

| Key | Vibe | Default theme | File |
| ----- | ------ | -------------- | ------ |
| `cypher-2049` | Blade Runner 2049 — amber, pink, cyan on near-black | Dark | [docs/design/cypher-2049.md](design/cypher-2049.md) |
| `terminal` | Phosphor-green CRT hacker terminal | Dark | [docs/design/terminal.md](design/terminal.md) |
| `neo-brutalist` | Bold thick-border brutalism with pop-yellow accent | Light | [docs/design/neo-brutalist.md](design/neo-brutalist.md) |
| `minimalist` | Swiss / Rams / Linear — hairline borders, type-led, one indigo accent | Light | [docs/design/minimalist.md](design/minimalist.md) |

Each style doc is structured in three sections: **Design DNA** (platform-agnostic — colors as raw hex/OKLCH, principles, do/don't) → **Web** (CSS tokens, Tailwind utilities, component CSS) → **Flutter** (`ColorScheme`, `ThemeData`, `TextTheme`, widget code patterns).

## How the system works

### Style resolution

```ts
// src/lib/ui-style.ts
const VALID = ["cypher-2049", "terminal", "neo-brutalist", "minimalist"] as const;
export type UIStyle = (typeof VALID)[number];
export function getUIStyle(): UIStyle { ... }  // reads NEXT_PUBLIC_UI_STYLE, falls back to "cypher-2049"
```

### CSS layer

All tokens live in `src/app/globals.css`. Structure:

```bash
:root { ... }                           ← base shadcn tokens (light)
.dark { ... }                           ← base dark overrides
[data-ui-style="terminal"] { ... }      ← terminal light tokens
[data-ui-style="terminal"].dark { ... } ← terminal dark tokens
[data-ui-style="neo-brutalist"] { ... }
[data-ui-style="neo-brutalist"].dark { ... }
[data-ui-style="cypher-2049"] { ... }
[data-ui-style="cypher-2049"].dark { ... }
[data-ui-style="minimalist"] { ... }
[data-ui-style="minimalist"].dark { ... }
```

Decorative utility classes follow:

- `.tm-*` — Terminal-specific (scanlines, prompt prefix, cursor blink, frame)
- `.nb-*` — Neo-brutalist-specific (offset shadow card, stripe, bold tag)
- `.cy-*` — Cypher-2049-specific (glitch, aurora, noise, scope, kanji, redact)
- `.mn-*` — Minimalist-specific (card, eyebrow, display, link-underline, rule, dot)

Shared semantic hooks (used by all components, styled per `data-ui-style`):

- `.site-eyebrow` — small label above page titles
- `.site-page-title` — main heading
- `.site-card` — post/work card wrapper
- `.site-tag`, `.site-status` — inline tags
- `.site-nav-link` — navigation items
- `.site-list` / `.site-row` — tabular rows

### Component branching

Home-page sections render a different variant per style:

```ts
// e.g. src/components/home/hero.tsx
export async function Hero() {
  const style = getUIStyle();
  if (style === "terminal") return <HeroTerminal />;
  if (style === "neo-brutalist") return <HeroBrutalist />;
  if (style === "minimalist") return <HeroMinimalist />;
  return <HeroCypher />;   // default
}
```

Files: `hero-cypher.tsx`, `hero-terminal.tsx`, `hero-brutalist.tsx`, `hero-minimalist.tsx` (same pattern for `featured-work`, `recent-posts`, `social-links`).

Shared components (`post-card.tsx`, `work-card.tsx`, `nav.tsx`, `footer.tsx`) use `.site-*` CSS hooks — no JSX branching needed.

### Tailwind theme

Config is CSS-first (`@theme inline` in globals.css). Tokens map CSS vars → Tailwind classes:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  /* ... */
}
```

This means `bg-background`, `text-foreground`, `border-border` etc. automatically inherit style-specific values.

### Default theme per style

```ts
// src/app/layout.tsx
const defaultTheme =
  uiStyle === "neo-brutalist" || uiStyle === "minimalist" ? "light" : "dark";
```

### View transitions

200ms fade via the View Transitions API (`::view-transition-old/new(root)`), respects `prefers-reduced-motion`.

## Adding a new style

1. Add new `[data-ui-style="new-style"]` blocks in `globals.css` with all shadcn token overrides + custom utilities.
2. Add to `VALID` array in `src/lib/ui-style.ts`.
3. Create `*-newstyle.tsx` variant files for each branched home section.
4. Update `layout.tsx` default theme if needed.
5. Add a doc to `docs/design/new-style.md`.

## Fonts

- **Geist Sans** — default sans (`--font-geist-sans`)
- **Geist Mono** — default mono (`--font-geist-mono`)
- **JetBrains Mono** — override in Terminal and Cypher-2049 (`--font-jetbrains-mono`)
- **Noto Serif JP** — Cypher-2049 kanji decorations only

All loaded via `next/font/google` in `src/app/layout.tsx`, injected as CSS vars.
