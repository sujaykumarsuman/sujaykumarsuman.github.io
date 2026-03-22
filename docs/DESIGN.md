# Design System — sujaykumar.dev

All design values live in `css/tokens.css` as CSS custom properties. Edit only that file to change global design values.

---

## Color palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0d1117` | Page background |
| `--color-surface` | `#161b22` | Card / panel backgrounds |
| `--color-surface-2` | `#1c2128` | Nested surfaces, hover states |
| `--color-border` | `#21262d` | Default borders |
| `--color-border-hover` | `#30363d` | Hovered / active borders |
| `--color-accent` | `#22d3ee` | Cyan primary accent |
| `--color-accent-dim` | `#0e7490` | Dimmed accent for left-borders, subtle highlights |
| `--color-accent-bg` | `rgba(34,211,238,0.06)` | Very faint accent tint for active nav |
| `--color-text` | `#e6edf3` | Primary body text |
| `--color-text-muted` | `#7d8590` | Secondary / helper text |
| `--color-text-faint` | `#484f58` | Labels, list markers, very subtle text |
| `--color-text-accent` | `#22d3ee` | Accent-colored text spans |

---

## Typography

### Fonts
| Role | Font | Fallback |
|------|------|---------|
| Headings, nav, labels, code | `JetBrains Mono` | `Fira Code`, `Cascadia Code`, monospace |
| Body, descriptions, prose | `Inter` | system-ui, -apple-system, sans-serif |

### Type scale
| Token | Value | px equiv |
|-------|-------|---------|
| `--text-xs` | `0.6875rem` | 11px |
| `--text-sm` | `0.8125rem` | 13px |
| `--text-base` | `0.9375rem` | 15px |
| `--text-md` | `1rem` | 16px |
| `--text-lg` | `1.125rem` | 18px |
| `--text-xl` | `1.375rem` | 22px |
| `--text-2xl` | `1.75rem` | 28px |
| `--text-3xl` | `2.25rem` | 36px |
| `--text-4xl` | `3rem` | 48px |

### Font weights
- `--weight-normal: 400`
- `--weight-medium: 500`
- `--weight-semibold: 600`
- `--weight-bold: 700`

### Line heights
- `--leading-tight: 1.2` — headings
- `--leading-snug: 1.4` — compact lists
- `--leading-normal: 1.6` — body default
- `--leading-loose: 1.8` — descriptions, summaries

---

## Spacing scale

All spacing uses `--space-N` tokens. Prefer these over raw values.

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

---

## Layout

- `--max-width: 1080px` — max content width
- `--page-padding-x: clamp(24px, 5vw, 48px)` — responsive horizontal padding
- `--page-padding-y: 64px` — vertical page padding
- Use `.container` class for max-width + centered content
- Use `.section` for consistent vertical section spacing

---

## Border radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Tags, small chips, inline elements |
| `--radius-md` | 8px | Buttons, small cards |
| `--radius-lg` | 12px | Main cards and panels |
| `--radius-xl` | 16px | Large featured panels |

---

## Shadows

- `--shadow-sm: 0 1px 3px rgba(0,0,0,0.4)` — subtle lift
- `--shadow-md: 0 4px 12px rgba(0,0,0,0.5)` — card hover

---

## Components

### Nav
- Sticky, frosted-glass (`backdrop-filter: blur(12px)`) with dark bg at 85% opacity
- Brand: `SK / sujaykumar.dev` in mono font, accent on the `SK`
- Links: mono xs, muted by default, accent + faint bg when active
- Height: 56px

### Buttons
Three variants — all use mono font, `--text-sm`, medium weight:
- `.btn--primary` — cyan bg, dark text
- `.btn--secondary` — surface bg, border
- `.btn--ghost` — transparent, muted border

### Cards
- Background: `--color-surface`
- Border: `--color-border`, transitions to `--color-border-hover` on hover
- Radius: `--radius-lg`
- Padding: `--space-6` to `--space-8`

### Eyebrow labels
- Mono font, `--text-xs`, uppercase, `letter-spacing: 0.08em`, accent color
- Use `.eyebrow` class

### Tech / skill tags
- `.tech-tag` — on experience cards (muted text)
- `.skill-tag` — on skill group items (normal text)
- Both: mono xs, surface-2 bg, subtle border, radius-sm

### Status dot
- 6px cyan circle (`--color-accent`)
- Used in footer next to availability status

---

## Design principles

1. **Mono for identity, sans for prose** — Use JetBrains Mono for anything that signals engineering: headings, nav, labels, tags, values. Use Inter for readable body text.
2. **Borders over shadows** — Cards use border transitions, not box-shadow lifts. Consistent with the terminal/editor aesthetic.
3. **Accent is sparse** — Cyan appears only on: active nav, eyebrows, stat values, left-border accents, tags. Not on body text or decoration.
4. **No gradients on content** — Backgrounds are flat. Gradient use is avoided to keep the look clean and fast.
5. **Whitespace over decoration** — Section spacing is generous. Padding inside cards is consistent. No filler icons or illustrations.
6. **Everything from tokens** — Never write raw hex values or pixel values in `components.css`. Always reference a token.
