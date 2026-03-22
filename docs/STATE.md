# State — Portfolio Build

> Update this file as work progresses. It is the source of truth for current build state.

## Current status

**Branch:** `feat/portfolio-rebuild`
**Target:** PR → `main`
**Last updated:** 2026-03-22

---

## Build checklist

### Phase 0 — Git cleanup
- [x] Discard all in-progress changes on old codex branch
- [x] Switch to `main`, pull latest from `origin/main`
- [x] Delete all stale local branches (codex/*, master)
- [x] Delete all stale remote branches (all except `origin/main`)
- [x] Create `feat/portfolio-rebuild` from `main`

### Phase 1 — Data
- [x] Create `data/portfolio.json` with full content schema
  - Meta, nav, home, stats, experience (3 jobs), education, skills (6 groups), links, connect, journey, stack, footer

### Phase 2 — CSS
- [x] `css/tokens.css` — design tokens (colors, fonts, spacing, radius, transitions)
- [x] `css/base.css` — reset, body, typography, container, utility classes
- [x] `css/components.css` — nav, buttons, hero, stat cards, exp cards, skill groups, info panels, connect cards, footer, 404

### Phase 3 — JavaScript
- [x] `js/renderer.js` — pure builder functions (nav, footer, stats, experience, skills, focus panel, info panel, education, profile links, CTAs, home/journey/stack/connect/404 page renderers)
- [x] `js/app.js` — fetch data, page detection, mount shared + page content, copy button events, doc meta

### Phase 4 — HTML
- [x] `index.html` (home, `data-page="home"`)
- [x] `journey/index.html` (`data-page="journey"`)
- [x] `stack/index.html` (`data-page="stack"`)
- [x] `connect/index.html` (`data-page="connect"`)
- [x] `404.html` (`data-page="not-found"`)

### Phase 5 — Docs
- [x] `docs/PROMPT.md` — system prompt for AI agents
- [x] `docs/AGENT.md` — agent behavioral spec
- [x] `docs/STATE.md` — this file
- [x] `docs/DESIGN.md` — design system reference

### Phase 6 — Verification
- [ ] Local preview passes (`python3 -m http.server 8080`)
- [ ] All 4 pages + 404 render correctly
- [ ] Nav active state correct on each page
- [ ] Email copy button works
- [ ] No console errors
- [ ] Edit `data/portfolio.json` → change reflects without touching code
- [ ] Mobile responsive (375px, 768px, 1280px)

### Phase 7 — Deploy
- [ ] Commit all files on `feat/portfolio-rebuild`
- [ ] Push branch to remote
- [ ] Open PR: `feat/portfolio-rebuild` → `main`
- [ ] Merge PR
- [ ] Verify live at `https://sujaykumar.dev`

---

## Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Stack | Vanilla HTML/CSS/JS | No build tools, direct GitHub Pages deploy |
| Data source | `data/portfolio.json` | Single JSON edit point, no code changes for content updates |
| Local preview | `python3 -m http.server 8080` | Built into macOS, zero setup |
| CSS structure | 3 files: tokens, base, components | Clear separation of values vs styles |
| JS structure | renderer.js (pure) + app.js (orchestration) | Data changes never require renderer edits |
| Font: headings | JetBrains Mono | Techy, monospace, strong personality |
| Font: body | Inter | Clean, readable, system-friendly |
| Accent color | `#22d3ee` (cyan) | Confirmed by user |
| Background | `#0d1117` | GitHub-dark palette, easy on eyes |

---

## Known issues / outstanding work

_None at time of initial build._

---

## Content inventory (data/portfolio.json)

- **Experience:** HashiCorp (2025–), Infoblox (2022–2025), Nokia (2021–2022)
- **Education:** B.E. CSE, Chandigarh University, 2017–2021
- **Skills:** 6 groups — Programming, Core Knowledge, Cloud & Infrastructure, Data & Messaging, Networking & Storage, DevOps & Automation
- **Links:** LinkedIn, GitHub, LeetCode, GeeksForGeeks, Resume
- **Stats:** 500+ high severity fixes, 900+ node-scale, <2h cluster provisioning, 4+ years
