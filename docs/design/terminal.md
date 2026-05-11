# Terminal

Phosphor-green CRT hacker terminal. Everything is monospace. Scanlines, blinking cursors, stepped animations. Minimal — no decoration that a real terminal wouldn't have.

**Key**: `terminal` | **Default theme**: Dark | **Radius**: ~2px

---

## Design DNA

### Philosophy

One color (green), one font (mono), one texture (scanlines). Purity of the terminal aesthetic — if a real 1980s CRT wouldn't show it, it doesn't belong here. The only "decoration" is functional: prompt prefixes, blinking cursors, frame corners. Dark mode is the canonical experience; light mode is an accessibility concession.

### Color Palette (raw values)

All hues sit at **145°** (pure phosphor green). Only lightness and chroma vary.

| Role | Light | Dark |
| ------ | ------- | ------ |
| Background | pale yellow-green `#EFF8EF` | near-black green tint `#0C180E` |
| Foreground | deep green `#162A16` | bright phosphor `#6EE86E` |
| Primary | medium green `#2E8A2E` | bright green `#58E058` |
| Accent (vivid) | vivid green `#35AA35` | luminous `#48D848` |
| Muted bg | `#E0F0E0` | `#152015` |
| Muted fg | `#3A6A3A` | `#4A9A4A` |
| Border | green 25% opacity | green 22% opacity |
| Card bg | `#E8F5E8` | `#101C10` |

> Single hue, only value and chroma change. Never introduce a second hue.

### Typography principles

- **Everything** is monospace — headings, body, labels, code, nav
- Font: JetBrains Mono with `ss01` ligature set (`calt` + `ss01`)
- No letter-spacing overrides — mono spacing is the aesthetic
- Labels and prompts get `"$ "` or `"./"` prefix, not decorative icons

### Motion principles

- Cursor blink: **stepped** (`steps(1)`), 1.05s — real terminal cadence
- State changes (hover bg, border): 150ms max — fast but not instant
- **No transforms / lift** — terminals are flat; elements change color, not position
- All animations off under `prefers-reduced-motion`

### Do / Don't

**Do**: mono font for everything; prompt prefix on interactive or code-like text; blink cursor on main headings; scanline overlay on hero/code areas; frame borders on terminal-window-like panels; stepped animation only.

**Don't**: use any non-green color; use sans-serif anywhere; add card shadows or lift; use smooth easing (always `steps(1)` or `ease` ≤150ms); round corners beyond 2px; use icons — ASCII glyphs only.

---

## Web (Next.js / Tailwind / CSS)

### CSS tokens (`src/app/globals.css`)

```css
[data-ui-style="terminal"] {
  --background: oklch(0.97 0.012 145);
  --foreground: oklch(0.18 0.04 145);
  --primary:    oklch(0.45 0.18 145);
  --accent:     oklch(0.55 0.22 145);
  --border:     oklch(0.55 0.22 145 / 0.25);
  --radius:     0.125rem;
  /* typography */
  font-family: var(--font-jetbrains-mono), monospace;
  font-feature-settings: "calt" 1, "ss01" 1;
}
[data-ui-style="terminal"].dark {
  --background: oklch(0.13 0.022 150);
  --foreground: oklch(0.92 0.16 145);
  --primary:    oklch(0.88 0.2 145);
  --accent:     oklch(0.85 0.22 145);
  --border:     oklch(0.85 0.22 145 / 0.22);
}
```

### Decorative utilities (`.tm-*`)

| Class | Effect |
| ------- | -------- |
| `.tm-mono` | Forces JetBrains Mono |
| `.tm-prompt` | Adds `"$ "` green prefix via `::before` |
| `.tm-cursor` | Adds blinking `▍` via `::after` (1.05s `steps(1)`) |
| `.tm-frame` | Terminal window chrome — border + inner/outer green glow |
| `.tm-frame-corner` | ASCII corner brackets `┌ ┘` via pseudo-elements |
| `.tm-scanlines` | Repeating horizontal green scanlines (4px pitch, 4% opacity) |

**Scanlines**:

```css
background-image: repeating-linear-gradient(
  to bottom,
  transparent 0, transparent 2px,
  oklch(from var(--foreground) l c h / 0.04) 3px, transparent 4px
);
```

**Cursor blink** keyframe:

```css
@keyframes tm-blink { 50% { opacity: 0; } }
```

### Component patterns

**Card** (`.site-card`):

```css
border: 1px solid oklch(from var(--accent) l c h / 0.3);
transition: background 150ms, border-color 150ms;
&:hover {
  background: oklch(from var(--accent) l c h / 0.05);
  border-color: oklch(from var(--accent) l c h / 0.6);
}
/* No transform — flat only */
```

**Eyebrow** (`.site-eyebrow`):

```css
font-family: JetBrains Mono;
color: var(--accent);
font-size: 0.625rem;
letter-spacing: 0.12em;
text-transform: uppercase;
&::before { content: "$ "; opacity: 0.6; }
```

**Nav link** (`.site-nav-link`):

```css
font-family: JetBrains Mono;
font-size: 0.75rem;
&::before { content: "./ "; color: var(--accent); opacity: 0.5; }
&[data-active="true"] {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: oklch(from var(--accent) l c h / 0.5);
}
```

**List counter** (`.site-list`): `[01]` format in accent mono at 0.5rem.

---

## Flutter

### Color constants

```dart
// terminal_colors.dart
import 'package:flutter/material.dart';

abstract final class TerminalColors {
  // Dark palette (canonical)
  static const background = Color(0xFF0C180E);
  static const surface    = Color(0xFF101C10);
  static const onSurface  = Color(0xFF6EE86E);   // bright phosphor
  static const primary    = Color(0xFF58E058);
  static const accent     = Color(0xFF48D848);    // luminous
  static const muted      = Color(0xFF152015);
  static const mutedFg    = Color(0xFF4A9A4A);
  static const border     = Color(0x3848D848);    // accent @ 22%

  // Light palette
  static const bgLight      = Color(0xFFEFF8EF);
  static const surfaceLight = Color(0xFFE8F5E8);
  static const fgLight      = Color(0xFF162A16);
  static const primaryLight = Color(0xFF2E8A2E);
  static const accentLight  = Color(0xFF35AA35);
}
```

### ThemeData

```dart
ThemeData terminalDarkTheme() {
  const c = TerminalColors;
  return ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: c.background,
    fontFamily: 'JetBrainsMono',
    colorScheme: const ColorScheme.dark(
      surface:        c.surface,
      onSurface:      c.onSurface,
      primary:        c.primary,
      onPrimary:      c.background,
      secondary:      c.accent,
      onSecondary:    c.background,
      outline:        c.border,
      outlineVariant: Color(0x1C48D848),
    ),
    textTheme: _terminalTextTheme(c.onSurface),
    cardTheme: CardTheme(
      color: c.surface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(2),
        side: BorderSide(color: c.accent.withOpacity(0.3)),
      ),
    ),
  );
}
```

### TextTheme

```dart
TextTheme _terminalTextTheme(Color fg) {
  // Everything is JetBrains Mono — no exceptions
  const base = TextStyle(
    fontFamily: 'JetBrainsMono',
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );
  return TextTheme(
    displayLarge:  base.copyWith(fontSize: 32, color: fg, fontWeight: FontWeight.w700),
    displayMedium: base.copyWith(fontSize: 24, color: fg, fontWeight: FontWeight.w700),
    displaySmall:  base.copyWith(fontSize: 20, color: fg),
    headlineLarge: base.copyWith(fontSize: 18, color: fg, fontWeight: FontWeight.w700),
    bodyLarge:     base.copyWith(fontSize: 16, color: fg),
    bodyMedium:    base.copyWith(fontSize: 14, color: fg),
    bodySmall:     base.copyWith(fontSize: 12, color: fg),
    labelLarge:    base.copyWith(fontSize: 10, color: TerminalColors.accent, letterSpacing: 1.5),
    labelSmall:    base.copyWith(fontSize: 8,  color: TerminalColors.mutedFg, letterSpacing: 1.5),
  );
}
```

### Common widget patterns

**Prompt-prefix text** (`"$ "` before content):

```dart
RichText(
  text: TextSpan(children: [
    TextSpan(
      text: '\$ ',
      style: TextStyle(
        color: TerminalColors.accent.withOpacity(0.7),
        fontFamily: 'JetBrainsMono',
        fontSize: 14,
      ),
    ),
    TextSpan(text: content, style: defaultStyle),
  ]),
)
```

**Blinking cursor** (animate on a 1.05s stepped timer):

```dart
class BlinkingCursor extends StatefulWidget {
  const BlinkingCursor({super.key});
  @override
  State<BlinkingCursor> createState() => _BlinkingCursorState();
}

class _BlinkingCursorState extends State<BlinkingCursor>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1050),
  )..repeat();

  @override
  void dispose() { _controller.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (_, __) => Opacity(
        opacity: _controller.value < 0.5 ? 1.0 : 0.0,  // stepped, no lerp
        child: Text('▍', style: TextStyle(color: TerminalColors.accent)),
      ),
    );
  }
}

// Usage: Row(children: [Text(title), const BlinkingCursor()])
```

**Terminal frame** (border + glow):

```dart
Container(
  decoration: BoxDecoration(
    border: Border.all(color: TerminalColors.accent.withOpacity(0.4)),
    borderRadius: BorderRadius.circular(2),
    boxShadow: [
      BoxShadow(
        color: TerminalColors.accent.withOpacity(0.08),
        blurRadius: 16,
        spreadRadius: 0,
      ),
    ],
  ),
  child: child,
)
```

**Scanlines overlay** (`CustomPainter`):

```dart
class TerminalScanlines extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = TerminalColors.onSurface.withOpacity(0.04)
      ..strokeWidth = 1;
    for (double y = 0; y < size.height; y += 4) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }
  @override
  bool shouldRepaint(_) => false;
}

// Usage:
CustomPaint(
  foregroundPainter: TerminalScanlines(),
  child: yourWidget,
)
```

**Card** (flat, color-only hover via `InkWell` + `AnimatedContainer`):

```dart
AnimatedContainer(
  duration: const Duration(milliseconds: 150),
  decoration: BoxDecoration(
    color: isHovered
        ? TerminalColors.accent.withOpacity(0.05)
        : TerminalColors.surface,
    border: Border.all(
      color: isHovered
          ? TerminalColors.accent.withOpacity(0.6)
          : TerminalColors.accent.withOpacity(0.3),
    ),
    borderRadius: BorderRadius.circular(2),
  ),
  child: child,
)
// No transform — no lift, no shadow
```

### Fonts setup (`pubspec.yaml`)

```yaml
flutter:
  fonts:
    - family: JetBrainsMono
      fonts:
        - asset: assets/fonts/JetBrainsMono-Regular.ttf
        - asset: assets/fonts/JetBrainsMono-Bold.ttf
          weight: 700
```

Or via `google_fonts`: `GoogleFonts.jetBrainsMono()` (no other font family needed).
