# State — repo status

> Current state of the repo, for humans and agents picking up work. Update this
> file as things change.

**Last updated:** 2026-09-16
**Branch model:** `main` is the only long-lived branch (production for both
deliverables). Work happens on short-lived feature branches → PR →
squash-merge. See [`GIT_STRATEGY.md`](GIT_STRATEGY.md).

---

## Current status

This repo ships **two things from `main`:**

1. **Portfolio — `sujaykumar.dev`** — **live.** Single-page React app (React 18 +
   `@babel/standalone`, JSX compiled in the browser, no build step), served by
   **GitHub Pages from the repo root**. Content is driven entirely by `data.json`;
   all styles are in `styles.css` (warm-paper / terracotta, light + dark, dark by
   default). A push to `main` auto-deploys.

2. **Projects hub — `projects.sujaykumar.dev`** — **live**, source in `projects/`.
   Not GitHub Pages: `.github/workflows/deploy.yml` builds a Docker image on
   changes under `projects/` and pushes it to GHCR; **Flux GitOps** deploys it to
   a single-node **k3s** cluster (cluster state in `sujaykumarsuman/infra`). Image
   tags follow `0.1.<run_number>` and an ImagePolicy rolls forward to the newest —
   treat the exact live tag as a moving value, not a constant. Its own docs:
   [`../projects/README.md`](../projects/README.md),
   [`ARCHITECTURE.md`](ARCHITECTURE.md).

The single-page React + `data.json` architecture is in place and stable; typical
updates are one-file edits to `data.json` (content) or `styles.css` (design).

---

## Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Portfolio stack | React 18 via `@babel/standalone` (CDN), JSX compiled in-browser | No build step, no toolchain; edit-and-refresh; deploys straight to Pages |
| Content source | `data.json` (single file) | One edit point; content changes need no code change |
| Content ↔ code split | Components read `window.PORTFOLIO_DATA`; no strings in JSX | Keeps content in `data.json`, structure in `sections.jsx` |
| Styling | One `styles.css` with CSS custom-property tokens | Simple, no CSS build; light/dark from token overrides |
| Design language | Warm "paper" palette + terracotta accent; Fraunces/Inter/JetBrains Mono/Caveat | Calm, editorial, distinct from generic dev-dark portfolios |
| Theming | `data-theme` on `<html>`, dark by default, nav toggle → `localStorage` | Pre-paint inline script avoids flash; honors user choice |
| Portfolio hosting | GitHub Pages from repo root on `main` | Zero infra; custom domain via `CNAME`, Jekyll off via `.nojekyll` |
| Local preview | `python3 -m http.server 8080` | Built into macOS; satisfies `fetch('data.json')` (no `file://`) |
| Projects hub delivery | Docker image → GHCR → Flux → k3s (GitOps) | The hub needs a real web server / routing; GitOps keeps deploys declarative |

---

## Known issues / open follow-ups

- **`writing` section not mounted.** The `writing` data key and its `Writing`
  component exist but `Writing` is not rendered in `app.jsx` (kept for later).
  Editing `writing` has no visible effect until it's remounted.
- **Docs refresh (this pass).** The `docs/` files previously described an older,
  never-shipped multi-page vanilla-JS rebuild. `AGENT.md`, `PROMPT.md`,
  `DESIGN.md`, `CONTENT.md`, and this file are now rewritten to match the shipped
  single-page React / `data.json` site; the projects hub is documented separately
  (`projects/README.md`, `docs/ARCHITECTURE.md`, `docs/GIT_STRATEGY.md`). Both
  deliverables are now documented.
- No automated tests or CI checks on the portfolio itself — verification is manual
  local preview. (The `deploy.yml` workflow only builds/pushes the projects-hub
  image.)
