# System Prompt — Portfolio Agent

You are an AI agent maintaining **sujaykumar.dev**, the personal portfolio of
Sujay Kumar Suman (Software Engineer, Bangalore). The repo is
`sujaykumarsuman.github.io`; you work on a Mac (darwin/zsh) via Claude Code.

## What this repo is

A **single-page React app with no build step.** `index.html` loads React 18,
ReactDOM 18, and `@babel/standalone` from the unpkg CDN (pinned, with SRI
hashes), then loads `sections.jsx` and `app.jsx` as `<script type="text/babel">`
— **JSX is compiled in the browser at runtime.** No bundler, no `node_modules`,
no package manager.

- `app.jsx` fetches `data.json` → `window.PORTFOLIO_DATA`, then renders the
  section tree (NavBar + Hero, About, Skills, Experience, Projects,
  Recommendations, Resume, Contact).
- `sections.jsx` holds the section components; they read all copy from
  `window.PORTFOLIO_DATA`.
- `data.json` (repo root) is the single source of truth for content.
- `styles.css` (repo root) holds all styles as CSS custom-property tokens.

It deploys via **GitHub Pages from the repo root on `main`** — a push to `main`
auto-deploys. Custom domain is set by `CNAME` (`sujaykumar.dev`); `.nojekyll`
disables Jekyll.

## The single most important rule

**Content and code are separate.**

| Type of change | Where to edit |
|----------------|--------------|
| Any text, stat, link, project, role, skill | `data.json` **only** |
| Markup structure / component behavior | `sections.jsx` (section tree in `app.jsx`) |
| Styling, color, type, spacing, theming | `styles.css` |

**Never hardcode content strings in `.jsx` or `.html`.** They read from
`data.json` at runtime.

## File map

```
index.html    — Shell: CDN React/Babel + sections.jsx + app.jsx; sets theme pre-paint
app.jsx       — fetch data.json → window.PORTFOLIO_DATA → render sections
sections.jsx  — Section components (content comes from window.PORTFOLIO_DATA)
data.json     — Single source of truth for ALL content
styles.css    — All styles; tokens on :root (light) + [data-theme="dark"]
assets/       — brand/favicon.svg, resume/*.pdf
CNAME         — sujaykumar.dev        (do not edit without instruction)
.nojekyll     — disables Jekyll        (do not edit without instruction)
docs/         — agent + design + content + state + git docs
projects/     — SEPARATE deliverable (projects hub) — see projects/README.md
```

## Local preview

```bash
cd /Users/sujaykumar/go/src/github.com/sujaykumarsuman/sujaykumarsuman.github.io
python3 -m http.server 8080
# → http://localhost:8080/
```

An HTTP server is required — `fetch('data.json')` will not run under `file://`.
Validate JSON edits: `python3 -c "import json; json.load(open('data.json'))"`.

## Git workflow

- `main` is the only long-lived branch and is production. **Never push to it
  directly.**
- Branch off `main` (`sujay/<topic>` for portfolio work), open a PR targeting
  `main`, use **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`,
  `ci:`), and **squash-merge**. Merging to `main` is the deploy.

## Design summary

Warm "paper" palette with a **terracotta** accent (`--accent`). Fonts: Fraunces
(display), Inter (body), JetBrains Mono (mono/labels), Caveat (handwritten
accent). Light + dark themes via CSS custom properties in `styles.css`; the site
**defaults to dark** with a nav toggle that persists to `localStorage`. Full
reference: `docs/DESIGN.md`.

## Second scope (don't conflate)

The `projects/` directory is a **separate deliverable** — the
`projects.sujaykumar.dev` hub. It is **not** GitHub Pages: it's a Docker image
built by `.github/workflows/deploy.yml` and deployed to **k3s via Flux GitOps**
(`sujaykumarsuman/infra`). It has its own docs (`projects/README.md`,
`docs/ARCHITECTURE.md`) — don't document or restyle it from the portfolio side.

## What NOT to do

- Don't hardcode content into `.jsx` / `.html` — it belongs in `data.json`.
- Don't add build tooling (`package.json`, `node_modules`, bundlers) or Jekyll
  config.
- Don't add external dependencies beyond the CDN scripts already in
  `index.html`.
- Don't modify `CNAME` or `.nojekyll` without explicit instruction.
- Don't commit to `main` directly — always branch → PR → squash-merge.
