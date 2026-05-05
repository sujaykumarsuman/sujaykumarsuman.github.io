# Handoff: Portfolio Redesign — sujaykumarsuman.github.io

## Overview
Complete redesign of Sujay Kumar Suman's personal portfolio (currently hosted at https://github.com/sujaykumarsuman/sujaykumarsuman.github.io). The new design is a single-page, scroll-driven portfolio with a soft-pastel aesthetic, an Anthropic-style warm palette, full light/dark theme support, and a line-art cat developer companion in the nav. It replaces the existing static portfolio while keeping content data-driven (so future updates only touch one file).

## About the Design Files

The files in `source/` are **design references created in HTML** — a working prototype showing intended look, motion, and behavior. **They are not production code to copy directly.**

The task is to **recreate this design** in your target deployment environment. Two recommended paths:

1. **Ship as-is to GitHub Pages** (fastest) — the prototype runs entirely client-side with React via UMD + Babel standalone. You can drop these files into the `sujaykumarsuman.github.io` repo root, rename `portfolio.html` → `index.html`, and push. No build step needed. Trade-off: Babel-in-browser is ~150KB and adds a runtime transpile delay.

2. **Convert to Next.js / Vite + React** (recommended for production) — port `sections.jsx` / `app.jsx` to real `.jsx` modules with proper imports/exports, replace `window.PORTFOLIO_DATA` with a typed import, and let your bundler tree-shake. Deploy via Vercel, Netlify, or GitHub Pages with a build step.

Either way, the **design** (markup structure, CSS, palette, motion, layout, copy) should be reproduced faithfully — only the build/runtime layer changes.

## Fidelity

**High-fidelity (hifi)** — Pixel-accurate mockups with final colors, typography, spacing, and motion. The visual design is finished. You're recreating the UI 1:1 in your target framework.

## Tech Stack in the Prototype

- **React 18** via UMD CDN
- **Babel standalone** for in-browser JSX
- **Vanilla CSS** (no preprocessor, no Tailwind) using CSS custom properties for theming
- **Google Fonts**: Fraunces (display, serif), Inter (body), JetBrains Mono (mono), Caveat (handwriting accents)
- **No external icon library** — all icons are inline SVG
- **No images** in the design — all visuals are CSS / inline SVG (cat companion, project mockups, recommendation avatars are initials)

## Content / Data Source

All portfolio content lives in `source/data.js` as `window.PORTFOLIO_DATA`. To change content (new project, new role, updated bio), edit only this file. Sections are rendered from these arrays.

Top-level shape:

```js
{
  meta: { name, role, location, email, bio, fullBio, github, linkedin, linkedinUrl, githubUrl, resumeUrl, ... },
  stats: [{ value, label }],   // hero stat cards (4)
  identity: { tagline, summary, principles, currentlyExploring, beyondCode },
  skills: [{ group, items: [] }],   // grouped pills
  experience: [{ company, role, period, location, summary, highlights, stack, upcoming?, status? }],
  projects: [{ id, name, tagline, description, status, year, features, stack, links, mockType, builtWithClaude, pending, pendingItems, accent }],
  recommendations: [{ id, name, company, relationship, linkedinUrl, quote, accent }],
  resume: { sections: [{ heading, body }], ctaLabel },
}
```

## Page Structure (top → bottom)

1. **Nav** (fixed top) — left: cat companion + name. center: section links (About, Stack, Work, Projects, Praise, Connect). right: theme toggle.
2. **Hero** — eyebrow status pill ("Currently building"), display-XL name, role/intro paragraph, primary CTAs (Get in touch / View resume), 4-up stat grid.
3. **About** — 2-col grid: long-form bio + identity sidebar (principles list, currently exploring chips, beyond-code chips).
4. **Stack** — grouped skill cards (4 groups: Languages, Backend & Data, Cloud & Infra, AI & Tooling, Core Knowledge).
5. **Experience** — vertical timeline of roles. Each item shows period, company, role, location, summary, highlights, stack chips. Supports an `upcoming` flag for future roles.
6. **Projects** — alternating-side feature cards. Each: status pill + year + (Built with Claude badge), name, tagline (italic, accent color), description, feature bullets, "Building next" callout (chip + summary + → list), tech chips, source/link actions, and a CSS-rendered product mockup (CareerDock dashboard, Verdox test runs).
7. **Recommendations** — horizontal carousel of LinkedIn endorsements. One slide visible at a time, large pull-quote, name + company below, LinkedIn link. Prev/next + dot pagination.
8. **Resume** — dark band with quick-stats and View resume CTA (opens `meta.resumeUrl` in new tab).
9. **Contact** — centered card. Headline, supporting copy, email pill row (email text + circular mailto icon + circular copy icon with checkmark feedback), social links row.
10. **Footer** — name + small motto, last-built timestamp.

## Design Tokens

All tokens live in `:root` and `[data-theme="dark"]` blocks at the top of `source/styles.css`.

### Colors — Light theme

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F5F0E8` | Page background (cream) |
| `--bg-2` | `#EFE8DC` | Subtle elevation |
| `--bg-3` | `#E8DFCF` | Mock backgrounds |
| `--paper` | `#FAF7F1` | Cards |
| `--ink` | `#1F1813` | Primary text |
| `--ink-2` | `#3D2F25` | Body text |
| `--ink-3` | `#6B5544` | Secondary |
| `--ink-soft` | `#8C7967` | Muted |
| `--line` | `#D9CFBE` | Borders |
| `--line-soft` | `#E5DDCD` | Soft borders |
| `--accent` | `#C96442` | Terracotta — primary accent |
| `--accent-soft` | `#E8B89A` | Accent pastel |
| `--sage` | `#8FA888` | Success / sage green |
| `--sand` | `#D4B896` | Warm sand |
| `--ochre` | `#C9A062` | Tertiary accent |

### Colors — Dark theme

| Token | Value |
|---|---|
| `--bg` | `#1A1612` |
| `--bg-2` | `#231C16` |
| `--bg-3` | `#2A221B` |
| `--paper` | `#1F1812` |
| `--ink` | `#F5EDE0` |
| `--ink-2` | `#D8CCB9` |
| `--ink-3` | `#A89888` |
| `--ink-soft` | `#7A6B5C` |
| `--line` | `#3D2F25` |
| `--line-soft` | `#2E251D` |
| `--accent` | `#E8865D` (slightly brighter terracotta) |
| `--accent-soft` | `#A86B4D` |

The toggle writes `data-theme="dark"` to `<html>` and persists to `localStorage`. Initial value reads from localStorage in a blocking script in `<head>` (see `app.jsx` / `portfolio.html`).

### Typography

- `--font-display: 'Fraunces', serif` — section titles, hero name, project names, contact headline
- `--font-body: 'Inter', sans-serif` — body, nav, buttons
- `--font-mono: 'JetBrains Mono', monospace` — eyebrows, chips, stat values, year labels, code-like accents
- `--font-script: 'Caveat', cursive` — handwritten accents (used sparingly)

Display sizes use fluid `clamp()`:
- Hero name: `clamp(56px, 9vw, 120px)`, `letter-spacing: -0.04em`, `line-height: 0.92`
- Section title: `clamp(28px, 4vw, 48px)`, `letter-spacing: -0.02em`
- Project name: `clamp(28px, 3vw, 40px)`
- Contact headline: `clamp(36px, 5vw, 64px)`

### Spacing & Radius

- Section padding: `72px 32px` desktop, stepping to `56px 20px` (≤720px), `48px 18px` (≤640px)
- Hero padding: `120px 0 64px` desktop, `96px 0 40px` mobile
- Card radii: `--radius: 16px`, `--radius-sm: 10px`
- Pills / chips: `999px`
- Shadows: `--shadow-sm: 0 2px 8px rgba(0,0,0,.04)`, `--shadow-md: 0 4px 14px rgba(0,0,0,.06)`, `--shadow-lg: 0 12px 32px rgba(0,0,0,.08)`

### Breakpoints

- `880px` — main desktop → tablet (hero/about/skills/projects collapse to 1 col)
- `720px` — hero stats become 2-up
- `640px` — mobile (nav brand text hides, padding tightens, contact email row stacks)
- `380px` — drop low-priority nav links (Stack, Praise) to fit small phones

## Components & Behavior

### Nav (fixed top)
- Background goes from transparent → blurred backdrop with bottom border when scrolled past 40px.
- Active section indicator: scrolls through sections, marks the link whose section top is above 40% of viewport.
- **Cat companion** (line-art SVG, `~56x48` desktop, `~44x38` mobile):
  - Cycles activities every ~3.6s on its own: `coding` (paws tap on a tiny laptop with flickering code lines, eyes turn into focused dots), `coffee` (holds a mug, steam rises), `music` (wears headphones with floating ♪ ♫ notes), `play` (bats at a rolling yarn ball), `thinking` (pulsing thought bubbles with a serif "?"), `sleepy` (Z's float).
  - **Hover**: small bounce-and-tilt with a sparkle, plus a speech bubble below the cat showing a different greeting each time. Greetings rotate from a list: `"hi!"`, `"meow~"`, `"hello!"`, `"yo 👋"`, `"hey there"`, `"namaste"`, `"purr…"`, `"*tail flick*"`, `"oh, hi!"`, `"welcome!"`, `"hii"`, `"hewwo"`, `"*ears perk*"`. Bubble auto-fades after ~1.8s.
  - The cat is purely decorative — never blocks interaction.

### Hero
- Eyebrow pill with pulsing green dot ("Currently…").
- Display-XL name with terracotta dot at the end.
- Stats grid: 4 columns desktop, 2 columns ≤720px.
- Two CTAs: primary (filled, `Get in touch`), ghost (outline, `View resume` — opens new tab).

### Skills
- 4 cards in a row (responsive: 4 → 2 → 1).
- Each card: small group label (mono, uppercase) + flex-wrapped pills.
- Pills have a soft hover (background lightens, border picks up accent).

### Experience
- Vertical timeline with a left rule + accent dots at each role.
- `upcoming: true` roles render with a dashed border + "Upcoming" status pill.
- Each item has expandable highlights (currently always visible — keep collapsed-by-default if desired).

### Projects
- Grid items alternate text-left / text-right via `:nth-child(even)`.
- Each card includes:
  - Status row: live indicator (`● ACTIVE` with sage pulse), year (mono), `Built with Claude Code` badge (small accent pill with sparkle).
  - Name (Fraunces, large), tagline (italic, accent), description.
  - Feature bullets (small accent dots, wrap with `overflow-wrap: anywhere`).
  - "Building next" callout — boxed in dashed-border container: chip on its own line, summary paragraph, divider, `→`-bulleted list of pendingItems.
  - Tech chips (mono, soft pill).
  - Actions row: "Source →" link, optional live link.
  - **CSS-rendered product mockup** in the second column (`mockType: 'careerdock'` renders a fake dashboard; `mockType: 'verdox'` renders a fake test run dashboard). On mobile they stack below the text.

### Recommendations
- Carousel: one card visible. Each card = pull-quote (large serif, italic, with a giant `"` decorative mark), name + company under (avatar = colored circle with initials), LinkedIn link.
- Controls: prev/next icon buttons + dot pagination at the bottom.
- Auto-advances every ~7s; pauses on hover.

### Contact
- Centered card with subtle border.
- Email row: email text (mono) + circular mail icon button (mailto:) + circular copy icon button (uses `navigator.clipboard.writeText`, swaps to a checkmark for ~1.8s on success).
- Social links row below: LinkedIn · GitHub · X / Twitter (omit any without URLs).

### Tweaks Panel (development-only)
The prototype includes a `<TweaksPanel>` for live design exploration. **Strip this from the production build** — it's not user-facing.

## Motion / Animation

All transitions use `cubic-bezier(0.4, 0.2, 0.2, 1)` or simple `ease` / `ease-out`. Keep them subtle — this design is "calm pastel," not snappy.

- Section header: fade-up on scroll (use `IntersectionObserver` if porting; the prototype uses CSS `@keyframes` triggered on entry).
- Project cards: hover raises the card 4px, brightens border to accent-soft, deepens shadow.
- Pulsing green dot: 2.5s `ease-in-out` infinite scale 1 → 1.2.
- Cat animations: see Cat companion section above. All `transform-box: fill-box` for SVG sub-element transforms.

## Accessibility

- All buttons have `aria-label` (mail, copy, prev/next, theme toggle).
- Theme toggle persists to localStorage and sets `data-theme` on `<html>`.
- Color contrast meets WCAG AA in both themes (verified against `--ink` / `--bg` and `--accent` / `--bg`).
- The cat is `aria-hidden="true"`; greetings are `aria-live="polite"` so screen readers announce them.
- Focus styles inherit browser defaults — **add a visible focus ring** in production (e.g., `outline: 2px solid var(--accent); outline-offset: 2px;`).

## Files in this Bundle (`source/`)

- `portfolio.html` — entry point. Loads fonts, React UMD, Babel standalone, then `data.js`, `sections.jsx`, `app.jsx`. Renames to `index.html` for GitHub Pages.
- `styles.css` — all styles. Single file, ~1700 lines. Organized by section with comment headers (`/* ===================== HERO ===================== */`).
- `data.js` — all portfolio content. Single source of truth.
- `sections.jsx` — every section component (Hero, About, Skills, Experience, Projects, Recommendations, Resume, Contact) **plus** the `NavBar` (with the cat companion). Exports to `window`.
- `app.jsx` — root `<App>` that composes the sections and mounts to `#root`. Also handles initial theme read from localStorage.
- `tweaks-panel.jsx` — dev-only tweak controls. **Remove for production.**

## Deployment Recommendations

### Path A — Direct to GitHub Pages (5 min)

1. Clone `sujaykumarsuman/sujaykumarsuman.github.io`.
2. Copy the 5 production files (`portfolio.html`, `styles.css`, `data.js`, `sections.jsx`, `app.jsx`) into the repo root. **Do not** copy `tweaks-panel.jsx`.
3. Rename `portfolio.html` → `index.html`. Remove the `<script src="tweaks-panel.jsx">` line from it.
4. In `app.jsx`, remove the `<TweaksPanel>` mount.
5. Commit, push to `main`. GitHub Pages serves `index.html` at the apex.
6. Keep the existing `CNAME` and `.nojekyll` files.

### Path B — Vite + React (production-grade)

1. `npm create vite@latest portfolio -- --template react`
2. Move `data.js` → `src/data.js` (export default instead of `window.PORTFOLIO_DATA`).
3. Split `sections.jsx` into `src/sections/Hero.jsx`, `Skills.jsx`, etc. Replace `window.X = X` with `export default X`.
4. Move `styles.css` → `src/styles.css`, import once in `main.jsx`.
5. Replace `window.PORTFOLIO_DATA` references with `import data from './data'`.
6. Use `<a href={...} target="_blank" rel="noreferrer">` patterns already in the prototype.
7. `npm run build` → `dist/`. Deploy via `gh-pages` package or Vercel/Netlify.

### Path C — Next.js (if you want SSG + SEO)

Same as B, but each section becomes a component imported into a single `app/page.tsx`. Add `metadata` export for OG tags (use `meta.name`, `meta.bio` from data).

## Outstanding / Next Steps

- The prototype hardcodes `meta.resumeUrl`. Confirm this URL points to the latest resume PDF before deploying.
- The cat companion uses inline SVG; no asset pipeline needed.
- Dark mode initial flash: the prototype reads `localStorage` in a blocking inline script in `<head>` to avoid a flash of light theme on dark-mode users. Preserve this in any port.
- Consider adding `prefers-reduced-motion: reduce` overrides for the cat animations (they currently always run).

## Questions for Sujay before deploying

- Confirm resume URL.
- Confirm LinkedIn recommendation people are comfortable being quoted publicly.
- Want analytics (Plausible, Umami, GA)? Not in the prototype.
- Want a custom domain or stay on `sujaykumarsuman.github.io`?
