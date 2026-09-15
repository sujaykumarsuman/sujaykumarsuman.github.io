# sujaykumar.dev

Personal site **and** self-hosted projects hub — one repo, two deployments.

| Site | What | Hosting | Source |
| --- | --- | --- | --- |
| **[sujaykumar.dev](https://sujaykumar.dev)** | The portfolio | GitHub Pages | repo root |
| **[projects.sujaykumar.dev](https://projects.sujaykumar.dev)** | Landing page for the apps I self-host | Container on a k3s cluster (Flux GitOps) | [`projects/`](projects/) |

Both ship from `main`. They share a repo but nothing at runtime: the portfolio
is static files on Pages; the projects hub is a container image reconciled onto
a k3s cluster.

```
sujaykumarsuman.github.io/
├── index.html · app.jsx · sections.jsx · styles.css · data.json · assets/
│                                    → the portfolio (GitHub Pages)
├── CNAME · .nojekyll               → Pages config
├── projects/                       → projects.sujaykumar.dev hub (see projects/README.md)
├── .github/workflows/deploy.yml    → builds the projects-hub image
└── docs/                           → documentation (index below)
```

## sujaykumar.dev — the portfolio

A **single-page React app with no build step**: `index.html` pulls React +
`@babel/standalone` from a CDN and compiles `sections.jsx` / `app.jsx` in the
browser. All content is data-driven.

- **Content** → [`data.json`](data.json) (the single source of truth — edit
  content here, never in the JSX). Schema: [docs/CONTENT.md](docs/CONTENT.md).
- **Design** → [`styles.css`](styles.css) (warm "paper" palette, terracotta
  accent, light + dark). System: [docs/DESIGN.md](docs/DESIGN.md).
- **Deploy** → push to `main`; GitHub Pages rebuilds. No CI, no containers.

```bash
python3 -m http.server 8080     # → http://localhost:8080/
```

## projects.sujaykumar.dev — the projects hub

A static landing page that fronts the apps running on my single-node **k3s**
cluster. **Everything for the subdomain lives in [`projects/`](projects/)** —
the page (`index.html`) and its image recipe (`Dockerfile`).

Unlike the portfolio it is **not** GitHub Pages: merging a change to
`projects/index.html` builds an nginx image
(`ghcr.io/sujaykumarsuman/projects-hub`), which **Flux** then deploys to the
cluster from the `sujaykumarsuman/infra` repo. Merging to `main` is the deploy.

> The one projects-related file outside `projects/` is
> `.github/workflows/deploy.yml` — GitHub requires Actions to live under
> `.github/workflows/`. It only fires when `projects/**` changes.

Full details — pipeline, routing, adding a project, local/Docker preview — are
in **[projects/README.md](projects/README.md)**.

## Deploying & git

Feature branch → PR → **squash-merge to `main`**. `main` drives both deploys
(Pages for the portfolio; the image build + Flux for the hub). Details:
[docs/GIT_STRATEGY.md](docs/GIT_STRATEGY.md).

## Documentation

| Doc | What it covers |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | The whole system: both sites, the k3s/GitOps platform, and the cross-repo map. |
| [docs/GIT_STRATEGY.md](docs/GIT_STRATEGY.md) | Branch model, PR/squash-merge flow, commit conventions, deploy triggers. |
| [projects/README.md](projects/README.md) | The `projects.sujaykumar.dev` subdomain — how it's built, deployed, and extended. |
| [docs/CONTENT.md](docs/CONTENT.md) | The `data.json` content schema for the portfolio. |
| [docs/DESIGN.md](docs/DESIGN.md) | The portfolio's design system (palette, type, theming). |
| [docs/STATE.md](docs/STATE.md) | Current status of the repo. |
| [docs/AGENT.md](docs/AGENT.md) · [docs/PROMPT.md](docs/PROMPT.md) | Working in this repo with an AI coding agent. |

## Related repos

`sujaykumarsuman/infra` (GitOps source of truth for the cluster) ·
`sujaykumarsuman/airlift` (`/airlift`) · `sujaykumarsuman/landscape`
(`/landscape`) · `sujaykumarsuman/.github` (shared reusable CI). See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
