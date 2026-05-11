# Neo-Brutalist

Bold, loud, honest. Thick 2px borders everywhere. Hard offset shadows. Pop-yellow accent that makes elements look stackable. No blur, no softness, no deception about depth.

**Key**: `neo-brutalist` | **Default theme**: Light | **Radius**: ~2px

---

## Design DNA

### Philosophy

Structure is visible. Borders show where things are; shadows show what's above what. The yellow accent is the only concession to playfulness — everything else is black and cream. Typography is heavy and uppercase because it means it. Nothing apologizes for existing.

### Color Palette (raw values)

Two neutrals (cream + black) + one pop accent (yellow). The yellow is identical in both light and dark mode — it's the single constant.

| Role | Light | Dark |
| ------ | ------- | ------ |
| Background | warm cream `#F5EED8` | deep purple-black `#1C1A28` |
| Foreground | near-black `#1A1A1A` | cream `#F5EED8` |
| Primary | black `#1A1A1A` | cream `#F5EED8` |
| On-primary | cream `#F5EED8` | black `#1A1A1A` |
| Accent (yellow) | `#F5D800` | `#F5D800` ← same |
| On-accent | `#1A1A1A` | `#1A1A1A` |
| Secondary bg | light cream `#EDE6C8` | `#242232` |
| Muted fg | `#6A6050` | `#9A9080` |
| Border | `#1A1A1A` (black) | `#F5EED8` (cream) |
| Card bg | near-white `#FBF8EE` | `#222030` |
| Shadow (resting) | black `#1A1A1A` | cream `#F5EED8` |
| Shadow (hover) | yellow `#F5D800` | yellow `#F5D800` |

> Yellow is always `#F5D800` regardless of mode. This is intentional — it's the constant reference point.

### Typography principles

- Display / headings: **weight 900**, uppercase, tight tracking (`letter-spacing: -0.04em`)
- Body: weight 400, normal tracking
- Tags / labels: mono, **weight 700**, uppercase, moderate tracking
- `line-height: 0.9` on display text — pack it tight
- No decorative typography tricks — weight and size alone create hierarchy

### Motion principles

- Card hover: **120ms** `ease` — fast snap, decisive
- Shadow shifts from 4px/4px → 8px/8px offset on hover (same direction, grows bigger)
- Card translates -2px/-2px on hover (moves toward the shadow, closing the gap)
- No blur animations, no opacity fades for state changes — structural changes only
- All animations off under `prefers-reduced-motion`

### Do / Don't

**Do**: 2px borders on all interactive elements (minimum); hard offset box shadows; weight 900 for all headings and labels; uppercase labels and tags; yellow for active states, hover shadows, and accent fills; snap at 120ms.

**Don't**: use gradients, blur, or translucency; round corners beyond 2px; use more than 3 colors in a component (black + cream + yellow); use thin (1px) borders; animate slower than 200ms (brutalism is decisive); use multiple shadow colors — resting = foreground, hover = accent.

---

## Web (Next.js / Tailwind / CSS)

### CSS tokens (`src/app/globals.css`)

```css
[data-ui-style="neo-brutalist"] {
  --background: oklch(0.96 0.025 95);
  --foreground: oklch(0.16 0 0);
  --primary:    oklch(0.16 0 0);
  --primary-foreground: oklch(0.97 0.025 95);
  --accent:     oklch(0.86 0.2 95);
  --accent-foreground: oklch(0.16 0 0);
  --border:     oklch(0.16 0 0);
  --radius:     0.125rem;
}
[data-ui-style="neo-brutalist"].dark {
  --background: oklch(0.16 0.012 280);
  --foreground: oklch(0.97 0.025 95);
  --primary:    oklch(0.97 0.025 95);
  --primary-foreground: oklch(0.16 0.012 280);
  --accent:     oklch(0.86 0.2 95);   /* unchanged */
  --border:     oklch(0.97 0.025 95);
}
```

### Decorative utilities (`.nb-*`)

| Class | Effect |
| ------- | -------- |
| `.nb-card` | 2px border + 4px hard offset shadow → hover: -2px/-2px translate + yellow 8px shadow |
| `.nb-card-flat` | Same border, no shadow, no hover transform |
| `.nb-display` | Weight 900, letter-spacing −0.04em, line-height 0.9, uppercase |
| `.nb-tag` | 2px border, yellow fill, mono weight 700, uppercase, 0.625rem |
| `.nb-stripe` | 45° repeating yellow diagonal stripe |

**Card hover**:

```css
.nb-card {
  border: 2px solid var(--foreground);
  box-shadow: 4px 4px 0 0 var(--foreground);
  transition: transform 120ms ease, box-shadow 120ms ease;
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 0 var(--accent);
  }
}
```

**Stripe** (for dividers or accent fills):

```css
background-image: repeating-linear-gradient(
  45deg,
  var(--accent) 0, var(--accent) 2px,
  transparent 2px, transparent 10px
);
```

### Component patterns

**Card** (`.site-card`): same as `.nb-card` — thick border, offset shadow, snap to yellow on hover.

**Eyebrow** (`.site-eyebrow`):

```css
display: inline-block;
border: 2px solid var(--foreground);
background: var(--accent);
font-weight: 700;
font-size: 0.625rem;
text-transform: uppercase;
letter-spacing: 0.1em;
padding: 0.125rem 0.5rem;
```

**Page title** (`.site-page-title`):

```css
font-weight: 900;
text-transform: uppercase;
letter-spacing: -0.04em;
```

**Nav link** (`.site-nav-link`):

```css
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;
&[data-active="true"] {
  border: 2px solid var(--foreground);
  background: var(--accent);
  padding: 0.125rem 0.5rem;
}
```

**List counter** (`.site-list`): `01` in accent background block with 2px right border, weight 900.

---

## Flutter

### Color constants

```dart
// neo_brutalist_colors.dart
import 'package:flutter/material.dart';

abstract final class BrutalistColors {
  // Accent — same in both modes
  static const yellow = Color(0xFFF5D800);
  static const onYellow = Color(0xFF1A1A1A);

  // Light palette (default)
  static const bgLight      = Color(0xFFF5EED8);
  static const surfaceLight = Color(0xFFFBF8EE);
  static const fgLight      = Color(0xFF1A1A1A);
  static const borderLight  = Color(0xFF1A1A1A);
  static const shadowLight  = Color(0xFF1A1A1A);
  static const mutedLight   = Color(0xFFEDE6C8);
  static const mutedFgLight = Color(0xFF6A6050);

  // Dark palette
  static const bgDark      = Color(0xFF1C1A28);
  static const surfaceDark = Color(0xFF222030);
  static const fgDark      = Color(0xFFF5EED8);
  static const borderDark  = Color(0xFFF5EED8);
  static const shadowDark  = Color(0xFFF5EED8);
  static const mutedDark   = Color(0xFF242232);
  static const mutedFgDark = Color(0xFF9A9080);
}
```

### ThemeData

```dart
ThemeData brutalistLightTheme() {
  const c = BrutalistColors;
  return ThemeData(
    brightness: Brightness.light,
    scaffoldBackgroundColor: c.bgLight,
    colorScheme: const ColorScheme.light(
      surface:        c.surfaceLight,
      onSurface:      c.fgLight,
      primary:        c.fgLight,     // black
      onPrimary:      c.bgLight,     // cream
      secondary:      c.yellow,
      onSecondary:    c.onYellow,
      tertiary:       c.yellow,
      onTertiary:     c.onYellow,
      outline:        c.borderLight,
    ),
    fontFamily: 'Inter',
    textTheme: _brutalistTextTheme(c.fgLight),
    cardTheme: CardTheme(
      color: c.surfaceLight,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(2),
        side: const BorderSide(color: c.borderLight, width: 2),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: c.fgLight,
        foregroundColor: c.bgLight,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(2),
          side: const BorderSide(color: c.borderLight, width: 2),
        ),
        elevation: 0,
      ),
    ),
  );
}

ThemeData brutalistDarkTheme() {
  const c = BrutalistColors;
  return ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: c.bgDark,
    colorScheme: const ColorScheme.dark(
      surface:        c.surfaceDark,
      onSurface:      c.fgDark,
      primary:        c.fgDark,
      onPrimary:      c.bgDark,
      secondary:      c.yellow,
      onSecondary:    c.onYellow,
      outline:        c.borderDark,
    ),
    fontFamily: 'Inter',
    textTheme: _brutalistTextTheme(c.fgDark),
  );
}
```

### TextTheme

```dart
TextTheme _brutalistTextTheme(Color fg) {
  // Display: Inter Black (900), tight, uppercase
  const display = TextStyle(
    fontFamily: 'Inter',
    fontWeight: FontWeight.w900,
    letterSpacing: -2.0,
    height: 0.9,
  );
  // Body: Inter Regular
  const body = TextStyle(
    fontFamily: 'Inter',
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );
  // Labels: Inter Mono Bold, uppercase
  const label = TextStyle(
    fontFamily: 'RobotoMono',   // or JetBrains Mono
    fontWeight: FontWeight.w700,
    letterSpacing: 1.5,
  );
  return TextTheme(
    displayLarge:  display.copyWith(fontSize: 48, color: fg),
    displayMedium: display.copyWith(fontSize: 36, color: fg),
    displaySmall:  display.copyWith(fontSize: 28, color: fg),
    headlineLarge: display.copyWith(fontSize: 22, color: fg),
    headlineMedium:display.copyWith(fontSize: 18, color: fg),
    bodyLarge:     body.copyWith(fontSize: 16, color: fg),
    bodyMedium:    body.copyWith(fontSize: 14, color: fg),
    bodySmall:     body.copyWith(fontSize: 12, color: fg),
    labelLarge:    label.copyWith(fontSize: 10, color: fg),
    labelSmall:    label.copyWith(fontSize: 8,  color: fg),
  );
}
```

### Common widget patterns

**The signature card** (thick border + offset shadow + snap-to-yellow on hover):

```dart
class BrutalistCard extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;
  const BrutalistCard({required this.child, this.onTap, super.key});
  @override
  State<BrutalistCard> createState() => _BrutalistCardState();
}

class _BrutalistCardState extends State<BrutalistCard> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark ? BrutalistColors.borderDark : BrutalistColors.borderLight;
    final shadowColor = _hovered ? BrutalistColors.yellow : borderColor;

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit:  (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 120),
          curve: Curves.ease,
          transform: _hovered
              ? (Matrix4.identity()..translate(-2.0, -2.0))
              : Matrix4.identity(),
          decoration: BoxDecoration(
            color: isDark ? BrutalistColors.surfaceDark : BrutalistColors.surfaceLight,
            border: Border.all(color: borderColor, width: 2),
            borderRadius: BorderRadius.circular(2),
            boxShadow: [
              BoxShadow(
                color: shadowColor,
                offset: Offset(_hovered ? 8 : 4, _hovered ? 8 : 4),
                blurRadius: 0,   // hard shadow — no blur
              ),
            ],
          ),
          child: widget.child,
        ),
      ),
    );
  }
}
```

**Eyebrow / label tag** (yellow fill, black border):

```dart
Container(
  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
  decoration: BoxDecoration(
    color: BrutalistColors.yellow,
    border: Border.all(color: BrutalistColors.onYellow, width: 2),
    borderRadius: BorderRadius.circular(2),
  ),
  child: Text(
    label.toUpperCase(),
    style: const TextStyle(
      fontFamily: 'RobotoMono',
      fontWeight: FontWeight.w700,
      fontSize: 8,
      color: BrutalistColors.onYellow,
      letterSpacing: 1.5,
    ),
  ),
)
```

**Bold display heading**:

```dart
Text(
  title.toUpperCase(),
  style: Theme.of(context).textTheme.displayMedium?.copyWith(
    fontWeight: FontWeight.w900,
    letterSpacing: -2.0,
    height: 0.9,
  ),
)
```

**Active nav item** (yellow fill + black border):

```dart
AnimatedContainer(
  duration: const Duration(milliseconds: 120),
  padding: EdgeInsets.symmetric(
    horizontal: isActive ? 8 : 0,
    vertical: isActive ? 2 : 0,
  ),
  decoration: isActive
      ? BoxDecoration(
          color: BrutalistColors.yellow,
          border: Border.all(color: BrutalistColors.onYellow, width: 2),
          borderRadius: BorderRadius.circular(2),
        )
      : null,
  child: Text(
    item.toUpperCase(),
    style: TextStyle(
      fontFamily: 'Inter',
      fontWeight: FontWeight.w700,
      fontSize: 12,
      letterSpacing: 0.8,
      color: isActive ? BrutalistColors.onYellow : defaultFg,
    ),
  ),
)
```

**Stripe divider** (`CustomPainter` with 45° diagonal yellow lines):

```dart
class StripeDivider extends CustomPainter {
  final Color color;
  final double stripeWidth;
  final double gap;
  const StripeDivider({
    this.color = BrutalistColors.yellow,
    this.stripeWidth = 2,
    this.gap = 8,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = color..strokeWidth = stripeWidth;
    final step = stripeWidth + gap;
    for (double x = -size.height; x < size.width + size.height; x += step) {
      canvas.drawLine(Offset(x, 0), Offset(x + size.height, size.height), paint);
    }
  }
  @override
  bool shouldRepaint(_) => false;
}

// Usage: CustomPaint(painter: StripeDivider(), size: Size(double.infinity, 24))
```

### Fonts setup (`pubspec.yaml`)

```yaml
flutter:
  fonts:
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-Bold.ttf
          weight: 700
        - asset: assets/fonts/Inter-Black.ttf
          weight: 900
    - family: RobotoMono           # for tags and labels
      fonts:
        - asset: assets/fonts/RobotoMono-Regular.ttf
        - asset: assets/fonts/RobotoMono-Bold.ttf
          weight: 700
```

Or via `google_fonts`: `GoogleFonts.inter()`, `GoogleFonts.robotoMono()`.

> Note: Flutter's `FontWeight.w900` (Black) requires the Black font file explicitly — it won't synthesize from Bold.
