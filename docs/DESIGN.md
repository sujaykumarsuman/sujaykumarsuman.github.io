# Design System — sujaykumar.dev

The look is a **warm "paper" palette with a terracotta accent** — a calm, editorial,
Anthropic-adjacent aesthetic rather than a neon developer-dark theme.

All styles live in **one file: `styles.css`** at the repo root (~45KB). There is
no CSS build step and no separate token/base/component files. Global design
values are **CSS custom properties** defined on `:root`; edit those to change the
system, and reference tokens (never raw hex/px) in component rules.

---

## Theming (light + dark)

- Tokens on bare **`:root`** define the **light** palette — this is the CSS base.
- **`[data-theme="dark"]`** overrides the palette tokens for dark.
- The **site boots in dark by default.** `index.html` ships
  `<html … data-theme="dark">` and an inline script (runs before paint, to avoid
  a flash) sets `document.documentElement.dataset.theme` from
  `localStorage['theme']`, falling back to `'dark'`.
- The **NavBar theme toggle** flips `data-theme` between `dark` and `light` and
  persists the choice to `localStorage['theme']`.

So: the CSS *base* is light, but a first-time visitor sees *dark* until they
toggle.

---

## Color palette

Values are the actual token definitions in `styles.css`. `sage`, `lavender`, and
`sand` are shared across themes (not overridden in dark).

| Token | Light (`:root`) | Dark (`[data-theme="dark"]`) | Usage |
|-------|-----------------|------------------------------|-------|
| `--bg` | `#F5F0E8` | `#1A1612` | Page background |
| `--bg-2` | `#EFE8DD` | `#221C17` | Secondary surface |
| `--bg-3` | `#E8DFCF` | `#2C251E` | Tertiary surface / hover |
| `--paper` | `#FAF6EE` | `#221C17` | Cards, panels ("paper") |
| `--ink` | `#1F1A15` | `#F0E6D6` | Primary text |
| `--ink-2` | `#3D3530` | `#D9CDBA` | Secondary text |
| `--ink-3` | `#6B5F55` | `#A89B89` | Muted text |
| `--ink-soft` | `#9A8C7E` | `#756B5E` | Faint text, labels |
| `--line` | `#D9CFBE` | `#3A2F25` | Borders |
| `--line-soft` | `#E5DCCB` | `#2C251E` | Subtle borders / dividers |
| `--accent` | `#C96442` | `#E08363` | **Terracotta** — primary accent |
| `--accent-soft` | `#E8B5A0` | `#B4654B` | Soft accent tint |
| `--accent-deep` | `#9C4A2E` | `#F2A688` | Deep accent / emphasis |
| `--sage` | `#8AA38A` | (same) | Secondary accent |
| `--lavender` | `#A89AB8` | (same) | Secondary accent |
| `--sand` | `#D4C198` | (same) | Secondary accent |

There's also a small **sprite palette** (`--sprite-*`) for a decorative
peach-fox character, and a fixed **grain overlay** (`body::before`, a faint
radial-dot texture, `multiply` in light / `screen` in dark).

Project cards pick an accent via `accent-<value>` (e.g. `accent-terracotta`,
`accent-sage`) driven by the `accent` field in `data.json`.

---

## Typography

Fonts are loaded from **Google Fonts in `index.html`** and exposed as tokens:

| Token | Family | Role |
|-------|--------|------|
| `--font-display` | **Fraunces** (fallback Tiempos, Georgia, serif) | Display headings, hero name, section titles |
| `--font-body` | **Inter** (fallback system-ui, -apple-system) | Body copy, prose |
| `--font-mono` | **JetBrains Mono** (fallback ui-monospace) | Labels, code, terminal, eyebrows, chips |
| `--font-hero` | **Caveat** (cursive) | Handwritten accent flourishes |

Base body is Inter at 16px / line-height 1.55, with `font-feature-settings:
"ss01","cv11"` and antialiasing. Fraunces is a variable optical-size serif — the
italic display line in the hero uses it.

---

## Radii, layout, shadows

**Border radius**

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Chips, small elements |
| `--radius` | `14px` | Default cards, buttons |
| `--radius-lg` | `22px` | Large featured panels |

**Layout**

- `--max-w: 1180px` — max content width (sections center within this).
- Nav and page gutters use `max(32px, env(safe-area-inset-*))` for notch safety.
- `html { scroll-behavior: smooth }`; the fixed nav offsets scroll-spy by ~120px.

**Shadows** — warm-tinted in light, black in dark:

- `--shadow-sm` — subtle lift
- `--shadow-md` — card hover / raised panels
- `--shadow-lg` — large featured elements

---

## Principles

1. **Warm paper, not developer-dark.** Backgrounds are warm off-whites (light)
   and deep warm browns (dark) — never pure `#000`/`#fff` or cool grays.
2. **Terracotta is the one loud color.** `--accent` carries primary emphasis
   (buttons, active states, key marks). Use `--sage` / `--lavender` / `--sand`
   for gentle secondary accents (e.g. per-project card tints).
3. **Everything from tokens.** Don't write raw hex or px in component rules —
   reference a custom property so light/dark and global tweaks stay coherent.
4. **Both themes must hold up.** Any new color or component has to read correctly
   in light *and* dark. Add dark overrides under `[data-theme="dark"]` when a new
   token needs different values.
5. **Serif for identity, sans for reading, mono for signal.** Fraunces headlines,
   Inter body, JetBrains Mono for anything that should feel like tooling.
6. **Texture is subtle.** The grain overlay and soft shadows add warmth; avoid
   heavy gradients or decoration on content.

See [`CONTENT.md`](CONTENT.md) for how content maps to these components, and
[`AGENT.md`](AGENT.md) for the working guide.
