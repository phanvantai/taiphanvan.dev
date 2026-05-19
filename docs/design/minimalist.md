# Minimalist

Swiss design × Dieter Rams × Linear / Vercel quietness. Off-white background, hairline borders, type-led hierarchy, one restrained indigo accent. Removes everything that doesn't carry information — what's left should breathe.

**Key**: `minimalist` | **Default theme**: Light | **Radius**: ~8px

---

## Design DNA

### Philosophy

"Less, but better." Hierarchy comes from type weight, size, and whitespace — not from boxes, shadows, or color. Borders are hairline (1px) so they describe boundaries without shouting. The single indigo accent is reserved for *signal*: active nav dot, primary action, the period after the wordmark. Everything else is neutral.

### Color Palette (raw values)

Neutrals + one accent. Accent shifts a bit between modes for legibility but stays in the same hue family.

| Role | Light | Dark |
| ------ | ------- | ------ |
| Background | `#FAFAFA` | `#0F0F0F` |
| Foreground | `#0A0A0A` | `#F5F5F5` |
| Card | `#FFFFFF` | `#161616` |
| Border (hairline) | `#E5E5E5` | `rgba(255,255,255,0.10)` |
| Muted fg | `#737373` | `#A3A3A3` |
| Accent (indigo) | `#5B6CFF` | `#8B9AFF` |
| Ring | accent | accent |

### Typography principles

- Display / headings: **weight 500** (medium), tight tracking (`letter-spacing: -0.025em`), `line-height: 1.05`. No uppercase.
- Body: weight 400, normal tracking, generous `line-height: 1.6–1.75`.
- Eyebrows / meta: mono, `0.7rem`, `tracking: 0.14em`, uppercase, muted color.
- Line length: cap at ~65ch.
- Hierarchy is **weight + size + whitespace** — not color contrast tricks.

### Motion principles

- All transitions **200ms ease** — slow enough to feel intentional, fast enough not to drag.
- Hover = subtle: background shifts to `foreground/2%` (light) or `foreground/4%` (dark), border shifts to `foreground/25%`. **No transforms.**
- Animated link underlines wipe from right on hover (`background-size: 0 1px`).
- Respect `prefers-reduced-motion`.

### Do / Don't

**Do**: 1px hairline borders; pill rounding (`rounded-full`) for nav links, buttons, tags; generous padding (24–28px on cards, 80px+ section padding); type-led hierarchy; one accent color, used sparingly; lots of negative space.

**Don't**: use drop shadows or layered depth; use more than one accent color; use uppercase for headings or display text (only for eyebrows/meta); add decorative ornaments (corner brackets, scanlines, stripes); use border widths > 1px; use bold (700+) weights for headings — medium (500) is the ceiling.

---

## Web (Next.js / Tailwind / CSS)

### CSS tokens (`src/app/globals.css`)

```css
[data-ui-style="minimalist"] {
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.18 0 0);
  --card:       oklch(1 0 0);
  --muted-foreground: oklch(0.5 0 0);
  --accent:     oklch(0.55 0.16 255);
  --border:     oklch(0.92 0 0);
  --radius:     0.5rem;
  --mn-accent:  oklch(0.55 0.16 255);
  --mn-rule:    oklch(0.18 0 0 / 0.08);
}
[data-ui-style="minimalist"].dark {
  --background: oklch(0.155 0 0);
  --foreground: oklch(0.96 0 0);
  --card:       oklch(0.19 0 0);
  --muted-foreground: oklch(0.7 0 0);
  --accent:     oklch(0.7 0.16 255);
  --border:     oklch(1 0 0 / 0.1);
  --mn-accent:  oklch(0.7 0.16 255);
  --mn-rule:    oklch(1 0 0 / 0.08);
}
```

### Utility classes

- `.mn-display` — heading: Geist Sans, weight 500, tight tracking, line-height 1.05
- `.mn-eyebrow` — mono uppercase muted label (also `.site-eyebrow` does this in this style)
- `.mn-card` — 1px border card with whisper-quiet hover
- `.mn-rule` — 1px hairline divider via `--mn-rule`
- `.mn-link-underline` — animated underline that wipes out on hover
- `.mn-accent` — color the single indigo accent
- `.mn-dot::before` — small accent dot prefix (`●`-style signal)

### Component patterns

- **Cards**: `mn-card` or the shared `.site-card`. White (or `--card`) on `--background`, 1px border, no shadow, 8px radius. Hover shifts border + background by single-digit percent.
- **Buttons**: pill-shaped (`rounded-full`). Primary = `bg-foreground text-background`. Secondary = `border` outlined transparent. No shadows, no transforms on hover — only color.
- **Nav links**: pill padding, single 4px accent dot under the active item.
- **Lists**: dividers via `divide-y divide-border`, never row borders + card chrome together.

### Layout rhythm

- Section padding: `py-20 sm:py-24` (or `py-28` for hero/contact).
- Max width: `max-w-5xl` (narrower than the other styles — minimalism wants whitespace at the gutters).
- Grid gap: `gap-12 sm:gap-16` for hero/contact splits.

---

## Flutter

### `ColorScheme` (light)

```dart
ColorScheme.light(
  surface:    Color(0xFFFAFAFA),
  onSurface:  Color(0xFF0A0A0A),
  primary:    Color(0xFF0A0A0A),
  onPrimary:  Color(0xFFFAFAFA),
  secondary:  Color(0xFF5B6CFF),  // the indigo accent
  onSecondary: Color(0xFFFAFAFA),
  outline:    Color(0xFFE5E5E5),
)
```

### `ColorScheme` (dark)

```dart
ColorScheme.dark(
  surface:    Color(0xFF0F0F0F),
  onSurface:  Color(0xFFF5F5F5),
  primary:    Color(0xFFF5F5F5),
  onPrimary:  Color(0xFF0F0F0F),
  secondary:  Color(0xFF8B9AFF),
  onSecondary: Color(0xFF0F0F0F),
  outline:    Color(0x1AFFFFFF),
)
```

### `ThemeData`

```dart
ThemeData(
  useMaterial3: true,
  colorScheme: scheme,
  textTheme: TextTheme(
    displayMedium: TextStyle(
      fontWeight: FontWeight.w500,
      letterSpacing: -0.6,
      height: 1.05,
    ),
    bodyMedium: TextStyle(height: 1.65),
    labelSmall: TextStyle(
      fontFamily: 'GeistMono',
      letterSpacing: 1.6,
      fontSize: 11,
      color: scheme.onSurface.withOpacity(0.55),
    ),
  ),
  cardTheme: CardTheme(
    elevation: 0,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
      side: BorderSide(color: scheme.outline),
    ),
    color: scheme.surface,
  ),
  filledButtonTheme: FilledButtonThemeData(
    style: FilledButton.styleFrom(
      shape: const StadiumBorder(),  // pill
      padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 14),
      textStyle: const TextStyle(fontWeight: FontWeight.w500),
    ),
  ),
)
```

### Widget patterns

- Cards: `Card` with `elevation: 0`, hairline `BorderSide` (1px outline), `BorderRadius.circular(8)`.
- Buttons: `StadiumBorder` (pill), no elevation, no shadow.
- Dividers: `Divider(height: 1, thickness: 1, color: scheme.outline)`.
- Hover/pressed state on web/desktop: shift surface tint by ~3–4% — never scale or translate.
