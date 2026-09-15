# Editing site content

All visible text and data on the portfolio (**sujaykumar.dev**) comes from a
single file: **`data.json`** at the repo root. It is the source of truth for
content.

`app.jsx` fetches `data.json` on load (`cache: 'no-cache'`), stores it on
`window.PORTFOLIO_DATA`, and passes it to the React components in
`sections.jsx`. Those components hold **no user-facing strings of their own** —
every label, paragraph, URL, and stat is read from `data.json`.

> **The golden rule:** content edits go in `data.json`. Never hardcode copy in
> `sections.jsx`, `app.jsx`, or `index.html`. If you're editing text, you're
> editing `data.json`.

To change content, edit `data.json` and open a PR. On merge to `main`, GitHub
Pages redeploys and the change goes live. No code changes are needed for typical
updates.

---

## Top-level shape

```jsonc
{
  "meta":            { /* identity: name, role, location, email, all URLs */ },
  "nav":             { /* nav link labels + IDs, theme-toggle aria label */ },
  "hero":            { /* meta labels, CTAs, terminal mockup lines, stat cards */ },
  "about":           { /* section header, bio paragraphs, "At a glance" sidebar */ },
  "skills":          { /* section header + grouped skill chips */ },
  "experience":      { /* section header, upcoming badge, timeline of roles */ },
  "projects":        { /* section header, badge/label text, feature cards + mockups */ },
  "recommendations": { /* section header, labels, endorsement carousel items */ },
  "writing":         { /* section header + writing list (defined but NOT mounted) */ },
  "resume":          { /* resume card eyebrow / title / subtitle / CTA labels */ },
  "contact":         { /* "Connect" card copy, icon labels, social links */ },
  "footer":          { /* footer prefix + right-hand text */ }
}
```

Section components render in this order (see `app.jsx`): NavBar, then a
`<main class="app">` holding Hero → About → Skills → Experience → Projects →
Recommendations → Resume → Contact. The `<footer>` is rendered inside the
Contact section.

> **Note on `writing`:** the `writing` key and its `Writing` component exist and
> are wired to render, but `Writing` is **not currently mounted** in `app.jsx`.
> Editing `writing` changes nothing on the live page until it's added back to the
> `App` tree. This is intentional (kept for later).

---

## Key-by-key reference

### `meta` — identity, reused everywhere
`name`, `firstName`, `lastName`, `handle`, `brand` (the nav wordmark), `role`,
`location`, `tagline`, `email`, and the canonical URLs: `resumeUrl` (path under
`assets/resume/`), `githubUrl`, `linkedinUrl`, `leetcodeUrl`,
`recommendationsUrl`. Other sections point at these by key rather than repeating
URLs.

### `nav`
`themeToggleAriaLabel`, and `links[]` — each `{ id, label }`. `id` must match a
section's `id` attribute (e.g. `experience`, `skills`); the scroll-spy highlight
keys off it. Labels are free text and intentionally differ from section titles
(e.g. label `Stack` → `#skills`, `Work` → `#experience`, `Praise` →
`#recommendations`).

### `hero`
`metaLabels.{role,location}`, `ctas[]`, `terminal.{title,lines[]}`, `stats[]`.
- `ctas[]`: each `{ label, style ("primary"|"ghost"), arrow? }` plus either
  `href` (literal anchor) or `action: "email"` (resolves to `mailto:` +
  `meta.email`).
- `terminal.lines[]`: string array joined with `\n` into a `<pre>`; empty
  strings render blank lines.
- `stats[]`: each `{ value, label }`.

### `about`
`header` (`{ index, title, subtitle }` — the shared section-header shape),
`paragraphs[]` (bio, one `<p>` each), and `atGlance.{ title, items[] }` where each
item is `{ label, value }`.

### `skills`
`header`, plus `groups[]` — each `{ name, items[] }`. `items` is a flat string
array of skill chips. Groups render numbered in array order.

### `experience`
`header`, `upcomingBadge` (badge text), and `items[]` — the role timeline (an
accordion; the first non-`upcoming` role is expanded by default). Each item:

```json
{
  "company": "Some Co",
  "role": "Title",
  "period": "Jan 2027 — Present",
  "summary": "One-line summary shown when expanded.",
  "tech": ["Go", "Kubernetes"],
  "highlights": ["What you shipped.", "Another bullet."],
  "upcoming": true
}
```

`tech` and `highlights` are optional (rendered only when non-empty). `upcoming:
true` gives the item a dashed treatment and appends the `upcomingBadge`.

### `projects`
`header`, `claudeBadge` (text for the "built with Claude" pill), `linkLabels.{
source, live }`, and `items[]`. Each project:

- Required: `id`, `name`, `tagline`, `description`, `status`, `year`, `tech[]`,
  `features[]`.
- Optional: `repo`, `live`, `role`, `pending` + `pendingLabel` + `pendingItems[]`
  (the "building next" block), `builtWithClaude` (bool), `accent`, `mock`.
- `status` becomes a CSS class (`status-<lowercased-hyphenated>`, e.g.
  `Dev Complete` → `status-dev-complete`) — reuse existing status strings so the
  styling exists.
- `accent` selects the card accent via `accent-<value>` (in use: `terracotta`,
  `sage`; see DESIGN.md for the accent palette).

`mock` renders a **CSS-only product mockup**. Two `type`s are supported:
- `"careerdock"` — sidebar + filterable rows. Fields: `url`, `logo`, `navItems[]`,
  `activeNav`, `searchPlaceholder`, `rows[]` (each `{ name, status, tech, score }`).
- `"verdox"` — test-runs dashboard. Fields: `url`, `logo`, `navItems[]`,
  `activeNav`, `title`, `count`, `live`, `rows[]` (each `{ repo, branch, status ∈
  pass|run|fail, duration, groups }`), `statusLabels`.

Adding a **third** mock type is the one project edit that needs code: add a
component in `sections.jsx` and wire it into `ProjectMock`.

### `recommendations`
`header`, `seeAllLabel`, `linkedinIconLabel`, `navAriaLabels.{ previous, next }`,
and `items[]` (a carousel). Each item: `{ name, company, linkedin, relationship,
date, text }`. `text` may contain `\n\n` for paragraph breaks; the avatar
initials and dot labels are derived from `name`. The "see all" link points at
`meta.recommendationsUrl`.

### `writing` (not currently mounted)
`header` and `items[]` (each `{ title, summary, date, href }`). See the note
above — editing this has no visible effect until `Writing` is remounted in
`app.jsx`.

### `resume`
Labels only: `eyebrow`, `title`, `subtitle`, `primaryCta`, `ghostCta`. The CTA
targets are `meta.resumeUrl` (primary) and `meta.githubUrl` (ghost).

### `contact`
`header`, `headline`, `body`, `labels.{ sendEmail, copyEmail, copied, emailCopied
}` (for the mail + copy-to-clipboard buttons), and `socials[]` — each
`{ label, metaKey }`, where `metaKey` names a URL field in `meta`. Add/remove a
social link with a single entry here.

### `footer`
`leftPrefix` (e.g. `©`) and `rightText`. The year and `meta.name` are appended
automatically.

---

## Common edits

**Update the resume PDF** — drop the new file into `assets/resume/` (e.g.
`sujay_resume_v7.pdf`), then point `meta.resumeUrl` at it.

**Add a role** — append to `experience.items` (shape above). Newest usually goes
first; add `"upcoming": true` for a not-yet-started role.

**Add a project** — append to `projects.items` (fields above). Reuse an existing
`accent` and `status` string, or add matching CSS in `styles.css` if you need a
new one.

**Reorder / rename nav** — edit `nav.links`. Keep each `id` matching a section
`id`; `label` is free text.

**Edit the hero terminal** — edit `hero.terminal.lines` (string array).

**Change social links** — edit `contact.socials[]` (label + `metaKey`) and, if
adding a new destination, the corresponding URL in `meta`.

---

## Validation

`data.json` is plain JSON — no comments, no trailing commas. After editing,
validate before committing:

```bash
python3 -c "import json; json.load(open('data.json'))"
```

The site fetches `data.json` at runtime, so any parse error surfaces in the
browser console **and** on-screen as a "Couldn't load data.json" message. Preview
locally (`python3 -m http.server 8080`, then open <http://localhost:8080/>)
before opening a PR.

See also: [`DESIGN.md`](DESIGN.md) for the visual system, [`AGENT.md`](AGENT.md)
for the full working guide.
