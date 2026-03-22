# System Prompt — Portfolio Agent

You are an AI agent working on **sujaykumar.dev**, a personal tech portfolio for Sujay Kumar Suman hosted on GitHub Pages at `sujaykumarsuman.github.io`.

## What this repo is

A static portfolio site built with vanilla HTML, CSS, and JavaScript. No build tools, no frameworks, no package manager. It deploys directly to GitHub Pages from the `main` branch.

---

## The single most important rule

**Content and code are strictly separated.**

| Type of change | Where to edit |
|----------------|--------------|
| Any text, stat, job, skill, link | `data/portfolio.json` only |
| Visual/layout changes | `css/components.css` or `css/base.css` |
| Design tokens (colors, fonts, spacing) | `css/tokens.css` only |
| New page behavior or wiring | `js/app.js` |
| New component structure | `js/renderer.js` |
| New page | Add HTML + wire in `js/app.js` + add nav item in `data/portfolio.json` |

**Never hardcode content strings in HTML or JS.** HTML files are empty shells. JS renderer functions build all content from `data/portfolio.json`.

---

## File map

```
data/portfolio.json     — Single source of truth for ALL content
css/tokens.css          — Design tokens (custom properties only, no selectors)
css/base.css            — Reset, typography, body, utility classes
css/components.css      — All components: nav, cards, buttons, footer, layouts
js/renderer.js          — Pure builder functions: data in → HTML string out
js/app.js               — Fetch data, detect page, call renderers, wire events
index.html              — Home page shell (data-page="home")
journey/index.html      — Journey page shell (data-page="journey")
stack/index.html        — Stack page shell (data-page="stack")
connect/index.html      — Connect page shell (data-page="connect")
404.html                — 404 page shell (data-page="not-found")
assets/brand/favicon.svg
assets/resume/sujay_resume_v2.pdf
CNAME                   — sujaykumar.dev
.nojekyll               — Disables Jekyll on GitHub Pages
docs/                   — Agent docs (this directory)
```

---

## Local preview

```bash
cd /Users/sujaykumar/go/src/github.com/sujaykumarsuman/sujaykumarsuman.github.io
python3 -m http.server 8080
# Open: http://localhost:8080
```

The `fetch('/data/portfolio.json')` call requires an HTTP server — opening `index.html` directly via `file://` will not work.

---

## Git workflow

- Default branch (production): `main`
- Always branch off `main`: `git checkout -b feat/<description>`
- Open PRs targeting `main`
- GitHub Pages auto-deploys from `main` on push

---

## Design system summary

- Background: `#0d1117` (deep dark, GitHub-dark palette)
- Surface: `#161b22` (card backgrounds)
- Accent: `#22d3ee` (cyan)
- Heading font: `JetBrains Mono` (monospace)
- Body font: `Inter` (sans-serif)
- All design values live in `css/tokens.css` as CSS custom properties

Full design reference: `docs/DESIGN.md`

---

## What NOT to do

- Do not add content to HTML files — they are empty shells
- Do not create `package.json`, `node_modules`, or any build tooling
- Do not add Jekyll front matter or `_config.yml`
- Do not commit changes to `main` directly — always use a branch and PR
- Do not modify `CNAME` or `.nojekyll`
- Do not introduce external JS dependencies (no CDN scripts, no npm packages)
