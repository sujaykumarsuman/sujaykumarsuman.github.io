# Editing site content

All visible text and data on the portfolio is sourced from a single file:
**`data.json`** at the repo root. The React components in `sections.jsx`
do not contain any user-facing strings of their own — they read from
`window.PORTFOLIO_DATA`, which `app.jsx` populates by `fetch`ing
`data.json` on load.

To change any content, edit `data.json` and push. GitHub Pages will pick
it up on the next deploy. No code changes needed for typical updates.

## Top-level shape

```jsonc
{
  "meta":            { /* name, role, email, all the URLs */ },
  "nav":             { /* nav link labels and IDs */ },
  "hero":            { /* CTAs, terminal mockup lines, stat cards */ },
  "about":           { /* bio paragraphs and "At a glance" sidebar */ },
  "skills":          { /* grouped skill chips */ },
  "experience":      { /* timeline of roles */ },
  "projects":        { /* feature cards + their dashboard mockups */ },
  "recommendations": { /* LinkedIn endorsements carousel */ },
  "writing":         { /* writing list (currently not mounted) */ },
  "resume":          { /* resume card eyebrow / title / CTAs */ },
  "contact":         { /* connect card copy + social links */ },
  "footer":          { /* footer copy */ }
}
```

## Common edits

### Update the resume PDF
1. Drop the new PDF into `assets/resume/` (e.g. `sujay_resume_v5.pdf`).
2. Update `meta.resumeUrl` in `data.json` to point at the new path.

### Add a new role to Experience
Append an object to `experience.items`:

```json
{
  "company": "Some Co",
  "role": "Title",
  "period": "Jan 2027 — Present",
  "summary": "One-liner.",
  "tech": ["Go", "Kubernetes"],
  "highlights": [
    "What you shipped.",
    "Another bullet."
  ]
}
```

Optional flags:
- `"upcoming": true` — renders with a dashed border + the badge text from `experience.upcomingBadge`.

### Add a new project
Append to `projects.items`. Required fields: `id`, `name`, `tagline`,
`description`, `status`, `year`, `tech`, `features`. Optional: `repo`,
`live`, `pending` + `pendingItems`, `builtWithClaude`, `accent`,
`mock`.

The `mock` field renders a CSS-only product mockup. Two types are
supported by the renderer:

- `mock.type: "careerdock"` — dashboard with a sidebar + filterable
  rows. Configurable: `url`, `logo`, `navItems`, `activeNav`,
  `searchPlaceholder`, `rows[]` (each: `name`, `status`, `tech`,
  `score`).
- `mock.type: "verdox"` — test runs dashboard. Configurable: `url`,
  `logo`, `navItems`, `activeNav`, `title`, `count`, `live`, `rows[]`
  (each: `repo`, `branch`, `status` ∈ `pass|run|fail`, `duration`,
  `groups`), `statusLabels`.

Adding a third mock type is the only edit that needs a code change —
add a new component in `sections.jsx` and wire it up in
`ProjectMock`.

### Reorder or rename nav links
Edit `nav.links`. Each entry has `id` (matches a section's `id`
attribute) and `label`. The active-section highlight uses these IDs.

### Change CTAs
- Hero CTAs: `hero.ctas[]`. Each entry has `label`, `style`
  (`"primary"` or `"ghost"`), and either `href` (literal) or
  `action: "email"` (resolves to `mailto:${meta.email}`). Set
  `arrow: true` to append the `→` glyph.
- Resume CTAs: `resume.primaryCta` / `resume.ghostCta` (labels only —
  the targets are `meta.resumeUrl` and `meta.githubUrl`).

### Update the terminal mockup in the hero
`hero.terminal.lines` is a string array; lines are joined with `\n`
and rendered into a `<pre>`. Empty strings produce blank lines.

### Update social links
- The big URLs live in `meta.{linkedinUrl, githubUrl, leetcodeUrl,
  recommendationsUrl}`.
- The contact section's social row pulls labels from
  `contact.socials[].label` and URLs from
  `meta[contact.socials[i].metaKey]`. So adding/removing a social link
  is a single-line edit there.

## Validation

`data.json` is plain JSON — no comments, no trailing commas. After
editing, validate with:

```bash
python3 -c "import json; json.load(open('data.json'))"
```

The site uses `fetch('data.json')` at runtime; any parse error will
surface in the browser console and on-screen as a load failure
message.
