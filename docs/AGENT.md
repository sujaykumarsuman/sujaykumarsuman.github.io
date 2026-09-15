# Agent Guide — working in this repo

How an AI agent (Claude Code) should work in
`sujaykumarsuman.github.io`. Read this, then the linked docs, before editing.

## Two deliverables, one repo

Everything ships from the `main` branch, but this repo produces **two separate
things**:

1. **The portfolio — `sujaykumar.dev`** (this guide's main subject). A
   single-page React app served by **GitHub Pages from the repo root**. Custom
   domain via `CNAME`; `.nojekyll` disables Jekyll. Push to `main` auto-deploys.
2. **The projects hub — `projects.sujaykumar.dev`** (separate scope, its own
   docs). The `projects/` directory is packaged as a Docker image by
   `.github/workflows/deploy.yml` and deployed to a **k3s** cluster via **Flux
   GitOps** (cluster state lives in the separate `sujaykumarsuman/infra` repo).
   Don't over-touch it here — see [`../projects/README.md`](../projects/README.md)
   and [`ARCHITECTURE.md`](ARCHITECTURE.md).

Know which one you're changing. This guide is about the portfolio unless stated.

---

## How the portfolio works (no build step)

`index.html` loads **React 18 + ReactDOM 18 + `@babel/standalone`** from the
unpkg CDN (pinned versions, with SRI hashes), then loads `sections.jsx` and
`app.jsx` as `<script type="text/babel">`. **JSX is compiled in the browser at
runtime** — there is no bundler, transpile step, or `node_modules`.

- `app.jsx` — fetches `data.json` (`cache: 'no-cache'`), stores it on
  `window.PORTFOLIO_DATA`, applies the theme, and renders the section tree.
- `sections.jsx` — each section is a `window.<Name>` React component (NavBar,
  Hero, About, Skills, Experience, Projects, Recommendations, Writing, Resume,
  Contact). Components read all copy from `window.PORTFOLIO_DATA`.
- `data.json` — the single source of truth for **all content**.
- `styles.css` — one ~45KB stylesheet; design tokens are CSS custom properties.

---

## Golden rules

| If you're changing… | Edit… |
|---------------------|-------|
| Any text, stat, link, project, role, skill | **`data.json` only** |
| Structure, layout of markup, component behavior | `sections.jsx` (and `app.jsx` for the section tree) |
| Styling, colors, type, spacing, theming | `styles.css` |

And the guardrails:

- **Never hardcode content** in `.jsx` or `.html` — it belongs in `data.json`.
- **No build tools.** Don't add a bundler, `package.json`, `node_modules`,
  transpile step, or Jekyll config (`_config.yml`, front matter).
- **No new external dependencies** beyond the CDN scripts already in
  `index.html`. Don't add npm packages or new CDN `<script>`/`<link>` tags
  without explicit instruction.
- **Don't modify `CNAME` or `.nojekyll`** without explicit instruction — they
  keep the custom domain and Pages serving working.
- **Never push to `main`.** Work on a feature branch → PR → squash-merge.
- **Change only what was asked.** No speculative edits across unrelated sections.

---

## File map (portfolio)

```
index.html      — Page shell: loads CDN React/Babel + sections.jsx + app.jsx; sets theme pre-paint
app.jsx         — Fetches data.json → window.PORTFOLIO_DATA; renders NavBar + <main> section tree
sections.jsx    — All section components (read content from window.PORTFOLIO_DATA)
data.json       — SINGLE SOURCE OF TRUTH for all content
styles.css      — All styles; design tokens as CSS custom properties (:root + [data-theme="dark"])
assets/brand/   — favicon.svg
assets/resume/  — resume PDFs (meta.resumeUrl points at the current one)
CNAME           — sujaykumar.dev  (do not edit without instruction)
.nojekyll       — disables Jekyll  (do not edit without instruction)
docs/           — these docs
projects/       — SEPARATE deliverable (projects hub); see projects/README.md
```

---

## Workflow

1. **Read first.** Open the relevant file(s) before editing. For content, skim
   `data.json`; for design, `styles.css`.
2. **Edit the minimal set of files** per the golden-rules table.
3. **Validate content** if you touched JSON:
   `python3 -c "import json; json.load(open('data.json'))"`.
4. **Preview locally** — serve the repo root and open the single page:
   ```bash
   python3 -m http.server 8080     # also the "portfolio" config in .claude/launch.json
   # → http://localhost:8080/
   ```
   An HTTP server is required — `fetch('data.json')` fails under `file://`.
5. **Branch → commit → PR.** Never commit to `main` directly.
   ```bash
   git checkout -b sujay/<topic>          # portfolio content/design
   git add <specific files>               # not `git add -A`
   git commit -m "feat: <description>"    # Conventional Commits
   git push -u origin sujay/<topic>
   gh pr create --base main --title "<title>" --body "<body>"
   ```
   PRs are **squash-merged** into `main`, then the branch is deleted. Merging to
   `main` is the deploy. Full conventions: [`GIT_STRATEGY.md`](GIT_STRATEGY.md).

Branch naming: `sujay/<topic>` for portfolio content/design; `phase/*` and
`ci/*` for infra/deploy work.

---

## Discovering the content schema

`data.json` is self-documenting. To explore it:

```bash
python3 -m json.tool data.json | less     # pretty-print
python3 -c "import json;print(list(json.load(open('data.json')))) "  # top-level keys
```

Full field-by-field reference: [`CONTENT.md`](CONTENT.md).

---

## Related docs

- [`CONTENT.md`](CONTENT.md) — the `data.json` content schema and common edits
- [`DESIGN.md`](DESIGN.md) — the warm-paper / terracotta design system
- [`GIT_STRATEGY.md`](GIT_STRATEGY.md) — branching, commits, PR/merge conventions
- [`STATE.md`](STATE.md) — current state of the repo and open follow-ups
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — full system, incl. the projects-hub pipeline
- [`../projects/README.md`](../projects/README.md) — the projects hub (second scope)
