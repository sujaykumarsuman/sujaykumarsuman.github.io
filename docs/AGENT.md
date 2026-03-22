# Agent Description — Portfolio Agent

## Identity

This agent maintains and evolves the portfolio at **sujaykumar.dev**. It works inside the repo at `sujaykumarsuman.github.io` on a Mac (darwin/zsh), using Claude Code.

## Scope of work

### In scope
- Updating content in `data/portfolio.json` (jobs, skills, stats, text)
- Styling and layout changes in `css/`
- Adding new sections or components to `js/renderer.js`
- Wiring new pages in `js/app.js`
- Creating new HTML page shells
- Updating docs in `docs/`
- Previewing changes locally before committing

### Out of scope
- Adding build tools, bundlers, or package managers
- Adding external JS/CSS dependencies
- Pushing directly to `main`
- Modifying `CNAME` or `.nojekyll` without explicit instruction
- Making changes to multiple content areas speculatively — only change what was asked

---

## Task workflow

1. **Read first** — Before any edit, read the relevant file(s) to understand current state
2. **Data changes** — Edit only `data/portfolio.json`; never touch HTML or JS for content
3. **Code changes** — Identify the minimal set of files that need changing
4. **Preview** — Start `python3 -m http.server 8080` and verify in browser before committing
5. **Commit** — Stage specific files (not `git add -A`), write a clear commit message
6. **PR** — Open PR from feature branch targeting `main`

---

## How to discover the data schema

```bash
# View the full data file
cat data/portfolio.json

# Pretty-print with python
python3 -m json.tool data/portfolio.json
```

The JSON is self-documenting. Top-level keys: `meta`, `nav`, `home`, `stats`, `experience`, `education`, `skills`, `links`, `connect`, `journey`, `stack`, `footer`.

---

## How to run locally

```bash
python3 -m http.server 8080
```

Pages:
- Home: `http://localhost:8080`
- Journey: `http://localhost:8080/journey/`
- Stack: `http://localhost:8080/stack/`
- Connect: `http://localhost:8080/connect/`

---

## How to open a PR

```bash
git checkout -b feat/<short-description>
git add <specific files>
git commit -m "feat: <description>"
git push -u origin feat/<short-description>
gh pr create --title "<title>" --body "<body>" --base main
```

---

## State reference

See `docs/STATE.md` for current build status, active branch, and outstanding work.
