# Cypher-2049

Blade Runner 2049 aesthetic. Warm amber dust storm, Joi-pink hologram, electric cyan. Near-black backgrounds. Sharp zero-radius corners. Filmic, layered, slightly dystopian.

**Key**: `cypher-2049` | **Default theme**: Dark | **Radius**: 0

---

## Design DNA

### Philosophy

Three accent colors tell the story: **amber** = warmth and memory, **pink** = synthetic/hologram, **cyan** = tech and data. They never compete — amber dominates, pink punctuates, cyan marks technical info. Background stays near-black and warm. All text that isn't content should be mono.

### Color Palette (raw values)

| Role | Light | Dark |
| ------ | ------- | ------ |
| Background | warm pale `#F5EDE0` | smoke-warm black `#1A1410` |
| Foreground | warm brown `#2A1F12` | warm pale `#F0E8D5` |
| Primary | amber-orange `#C07830` | bright amber `#D4891A` |
| Accent / secondary | warm red `#C04030` | pink-red `#CC4855` |
| Amber (named) | `#CC8020` | `#E8A030` |
| Pink (named) | `#C83850` | `#DC5068` |
| Cyan (named) | `#30B8D8` | `#60CCE8` |
| Muted bg | `#EDE0CC` | `#2E2218` |
| Muted fg | `#806040` | `#9A7848` |
| Border | amber 25% opacity | amber 22% opacity |
| Card bg | `#F0E4D0` | `#221A12` |

> Hex values are sRGB approximations of the OKLCH source tokens. For web use the OKLCH values directly; for Flutter/native use the hex values above.

### Typography principles

- Identifiers, labels, status text, nav items → **monospace** (JetBrains Mono)
- Display / hero → heavy weight (700–800), tight tracking, uppercase
- Body copy → regular weight, normal tracking
- Kanji watermarks → vertical serif, large, low opacity, decorative only

### Motion principles

- Card hover: 200ms ease — elements breathe, not snap
- Glitch effect: stepped (`steps(1)`), long loops (5–7s), random jumps
- Nothing animates faster than 100ms; nothing slower than 300ms for state changes
- All animations off under `prefers-reduced-motion`

### Do / Don't

**Do**: use zero-radius corners everywhere; let amber lead with pink as accent; mono font for all non-body text; subtle overlays (scanlines, noise, aurora glow) on hero areas; kanji as watermarks at low opacity.

**Don't**: use rounded corners; use bright white backgrounds; add more than 3 accent colors per component; use `.cy-glitch` on body text; mix pink and cyan as co-equals — one punctuates, the other tags.

---

## Web (Next.js / Tailwind / CSS)

### CSS tokens (`src/app/globals.css`)

```css
[data-ui-style="cypher-2049"] {
  --background: oklch(0.96 0.018 80);
  --foreground: oklch(0.18 0.04 50);
  --primary:    oklch(0.62 0.2 50);
  --accent:     oklch(0.62 0.24 12);
  --border:     oklch(0.78 0.2 65 / 0.25);
  --radius:     0;
  /* named */
  --cy-amber: oklch(0.78 0.2 65);
  --cy-pink:  oklch(0.7 0.25 5);
  --cy-cyan:  oklch(0.78 0.16 215);
}
[data-ui-style="cypher-2049"].dark {
  --background: oklch(0.115 0.03 50);
  --foreground: oklch(0.94 0.04 70);
  --primary:    oklch(0.78 0.18 65);
  --border:     oklch(0.82 0.2 65 / 0.22);
  --cy-amber: oklch(0.82 0.2 65);
  --cy-pink:  oklch(0.78 0.25 5);
  --cy-cyan:  oklch(0.85 0.16 215);
}
```

### Decorative utilities (`.cy-*`)

| Class | Effect |
| ------- | -------- |
| `.cy-glitch` | Chromatic aberration — pink layer right, cyan layer left, stepped random jumps |
| `.cy-aurora` | Blurred radial amber + pink gradient as ambient background glow |
| `.cy-scanlines` | 4px-pitch amber horizontal scanlines at 5% opacity |
| `.cy-noise` | SVG turbulence texture overlay |
| `.cy-scope` / `.cy-scope-pink` | CCTV viewfinder corner brackets (amber or pink) |
| `.cy-redact` | Black-out text bar, reveals on hover |
| `.cy-id` | Inline amber ID tag with pink `▮` prefix (e.g., `K-001`) |
| `.cy-tag` / `.cy-tag-pink` / `.cy-tag-cyan` | Mono uppercase tags per color |
| `.cy-kanji` / `.cy-kanji-pink` | Vertical serif Japanese watermarks |
| `.cy-card` | Amber border card with hover glow + lift |
| `.cy-rule` | Horizontal rule with centered text label |

**Glitch animation** (`.cy-glitch::before` / `::after`):

- `::before` — pink, +1.5px X, clip top third, 5.6s loop
- `::after` — cyan, −1.5px X, clip bottom two-thirds, 7.3s loop
- Both use `steps(1)` with random jump frames

**Aurora** (`.cy-aurora`):

```css
background:
  radial-gradient(ellipse at top left, oklch(from var(--cy-amber) l c h / 0.12) 0%, transparent 60%),
  radial-gradient(ellipse at bottom right, oklch(from var(--cy-pink) l c h / 0.08) 0%, transparent 55%);
filter: blur(70px);
```

### Component patterns

**Card** (`.site-card`):

```css
border: 1px solid oklch(from var(--cy-amber) l c h / 0.28);
transition: border-color 200ms, box-shadow 200ms, transform 200ms;
&:hover {
  border-color: oklch(from var(--cy-amber) l c h / 0.7);
  box-shadow: 0 0 24px oklch(from var(--cy-amber) l c h / 0.15),
              0 0 8px  oklch(from var(--cy-pink) l c h / 0.08);
  transform: translateY(-1px);
}
```

**Eyebrow** (`.site-eyebrow`):

```css
font-family: JetBrains Mono;
font-size: 0.625rem;
color: var(--cy-amber);
letter-spacing: 0.12em;
text-transform: uppercase;
&::before { content: "◤ "; color: var(--cy-pink); }
```

**Nav link** (`.site-nav-link`):

```css
font-family: JetBrains Mono;
font-size: 0.75rem;
&::before { content: attr(data-index) " "; color: var(--cy-amber); opacity: 0.5; }
&[data-active="true"] {
  color: var(--cy-amber);
  text-shadow: 0 0 8px oklch(from var(--cy-amber) l c h / 0.4);
}
```

**List counter** (`.site-list`): `"MEM-" counter` in amber mono, `0.5rem`.

---

## Flutter

### Color constants

```dart
// cypher_2049_colors.dart
import 'package:flutter/material.dart';

abstract final class CypherColors {
  // Dark palette (default)
  static const background  = Color(0xFF1A1410);
  static const surface     = Color(0xFF221A12);
  static const onSurface   = Color(0xFFF0E8D5);
  static const amber       = Color(0xFFE8A030);
  static const amberDim    = Color(0xFFCC8020);
  static const pink        = Color(0xFFDC5068);
  static const cyan        = Color(0xFF60CCE8);
  static const muted       = Color(0xFF2E2218);
  static const mutedFg     = Color(0xFF9A7848);
  static const border      = Color(0x38E8A030); // amber @ 22%

  // Light palette
  static const bgLight     = Color(0xFFF5EDE0);
  static const surfaceLight= Color(0xFFF0E4D0);
  static const fgLight     = Color(0xFF2A1F12);
  static const amberLight  = Color(0xFFCC8020);
  static const pinkLight   = Color(0xFFC83850);
  static const cyanLight   = Color(0xFF30B8D8);
}
```

### ThemeData

```dart
// cypher_2049_theme.dart
ThemeData cypherDarkTheme() {
  const colors = CypherColors;
  return ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: colors.background,
    colorScheme: const ColorScheme.dark(
      surface:          colors.surface,
      onSurface:        colors.onSurface,
      primary:          colors.amber,
      onPrimary:        colors.background,
      secondary:        colors.pink,
      onSecondary:      colors.onSurface,
      tertiary:         colors.cyan,
      onTertiary:       colors.background,
      outline:          colors.border,
      outlineVariant:   Color(0x1CE8A030), // amber @ 11%
    ),
    fontFamily: 'JetBrainsMono',  // monospace default
    textTheme: _cypherTextTheme(colors.onSurface),
    cardTheme: CardTheme(
      color: colors.surface,
      elevation: 0,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
        side: BorderSide(color: Color(0x38E8A030), width: 1),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.zero,
        borderSide: BorderSide(color: colors.border),
      ),
    ),
  );
}
```

### TextTheme

```dart
TextTheme _cypherTextTheme(Color fg) {
  // Display / headings: Geist Sans equivalent → Inter
  const display = TextStyle(
    fontFamily: 'Inter',
    fontWeight: FontWeight.w800,
    letterSpacing: -2.0,       // tight
    height: 0.88,
  );
  // Body / mono: JetBrains Mono
  const mono = TextStyle(
    fontFamily: 'JetBrainsMono',
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );
  return TextTheme(
    displayLarge:  display.copyWith(fontSize: 48, color: fg),
    displayMedium: display.copyWith(fontSize: 36, color: fg),
    displaySmall:  display.copyWith(fontSize: 28, color: fg),
    headlineLarge: display.copyWith(fontSize: 24, color: fg),
    bodyLarge:     mono.copyWith(fontSize: 16, color: fg),
    bodyMedium:    mono.copyWith(fontSize: 14, color: fg),
    bodySmall:     mono.copyWith(fontSize: 12, color: fg),
    labelLarge:    mono.copyWith(fontSize: 10, color: CypherColors.amber, letterSpacing: 1.5),
    labelSmall:    mono.copyWith(fontSize: 8,  color: CypherColors.mutedFg, letterSpacing: 1.5),
  );
}
```

### Common widget patterns

**Amber-border card with hover glow** (use `InkWell` + `AnimatedContainer`):

```dart
AnimatedContainer(
  duration: const Duration(milliseconds: 200),
  decoration: BoxDecoration(
    color: CypherColors.surface,
    border: Border.all(
      color: isHovered
          ? CypherColors.amber.withOpacity(0.7)
          : CypherColors.amber.withOpacity(0.28),
    ),
    boxShadow: isHovered ? [
      BoxShadow(color: CypherColors.amber.withOpacity(0.15), blurRadius: 24),
      BoxShadow(color: CypherColors.pink.withOpacity(0.08),  blurRadius: 8),
    ] : [],
  ),
  transform: isHovered
      ? (Matrix4.identity()..translate(0.0, -1.0))
      : Matrix4.identity(),
  child: child,
)
```

**ID tag** (amber mono label with pink prefix):

```dart
Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    Text('▮', style: TextStyle(color: CypherColors.pink, fontSize: 8)),
    const SizedBox(width: 4),
    Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        border: Border.all(color: CypherColors.amber.withOpacity(0.5)),
      ),
      child: Text(
        label.toUpperCase(),
        style: TextStyle(
          fontFamily: 'JetBrainsMono',
          fontSize: 8,
          color: CypherColors.amber,
          letterSpacing: 1.5,
        ),
      ),
    ),
  ],
)
```

**Eyebrow label**:

```dart
RichText(
  text: TextSpan(children: [
    TextSpan(text: '◤ ', style: TextStyle(color: CypherColors.pink, fontSize: 8)),
    TextSpan(
      text: label.toUpperCase(),
      style: TextStyle(
        fontFamily: 'JetBrainsMono',
        fontSize: 8,
        color: CypherColors.amber,
        letterSpacing: 2.0,
      ),
    ),
  ]),
)
```

**Scanlines overlay** (paint amber lines over content):

```dart
class ScanlinesOverlay extends StatelessWidget {
  final Widget child;
  const ScanlinesOverlay({required this.child, super.key});

  @override
  Widget build(BuildContext context) => CustomPaint(
    foregroundPainter: _ScanlinesPainter(),
    child: child,
  );
}

class _ScanlinesPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = CypherColors.amber.withOpacity(0.04)
      ..strokeWidth = 1;
    for (double y = 0; y < size.height; y += 4) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }
  @override
  bool shouldRepaint(_) => false;
}
```

**Glitch text** (simplified — shift colored copies):

```dart
Stack(
  children: [
    Positioned(left: 1.5, child: Text(text, style: style.copyWith(color: CypherColors.pink.withOpacity(0.55)))),
    Positioned(left: -1.5, child: Text(text, style: style.copyWith(color: CypherColors.cyan.withOpacity(0.55)))),
    Text(text, style: style),
  ],
)
// For animated glitch, wrap in AnimationController with step interpolation
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
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-ExtraBold.ttf
          weight: 800
    - family: NotoSerifJP        # for kanji decorations
      fonts:
        - asset: assets/fonts/NotoSerifJP-Regular.ttf
```

Or use `google_fonts` package: `GoogleFonts.jetBrainsMono()`, `GoogleFonts.inter()`, `GoogleFonts.notoSerifJp()`.
