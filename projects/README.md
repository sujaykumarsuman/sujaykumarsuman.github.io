# projects.sujaykumar.dev — the projects hub

Everything for the **`projects.sujaykumar.dev`** subdomain lives in this
directory. It is a **separate deliverable** from the main portfolio
(`sujaykumar.dev`), which is served by GitHub Pages from the repo root. See
[`../README.md`](../README.md) for the repo overview and
[`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) for the full system.

## What this is

A static landing page (`index.html`) that fronts the apps I self-host on a
single-node **k3s** cluster and points visitors at each one. It is the
**catch-all root (`/`)** of the subdomain: every app owns a higher-priority
path prefix (airlift → `/airlift`, landscape → `/landscape`), and anything
that doesn't match a project falls through to this hub.

## Files here

| File | Purpose |
| --- | --- |
| `index.html` | The hub page — one self-contained static file (inline CSS, no build step, no required CDN JS). The source of truth for the page. |
| `Dockerfile` | Packages `index.html` into an unprivileged nginx image (`nginxinc/nginx-unprivileged`, uid 101, listens on 8080). |
| `README.md` | This file. |

> **One projects-related file lives outside this directory, by necessity:**
> [`../.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).
> GitHub only runs Actions from `.github/workflows/`, so the build trigger
> can't live under `projects/`. It's intentionally tiny — it only fires the
> image build when `projects/**` changes. Everything else (page, image
> recipe, docs) stays here.

## How it's deployed

Unlike the portfolio, the hub is **not** GitHub Pages. It's a container on
k3s, shipped by GitOps — you never run `kubectl`; **merging to `main` is the
deploy.**

```
edit projects/index.html
  │  (feature branch → PR → squash-merge to main)
  ▼
.github/workflows/deploy.yml           ← fires only when projects/** changes
  │  uses sujaykumarsuman/.github → build-push.yml
  ▼
ghcr.io/sujaykumarsuman/projects-hub:0.1.<run_number>   ← image pushed to GHCR
  │
  ▼
Flux image-automation  (sujaykumarsuman/infra)          ← ImagePolicy >=0.1.0
  │  bumps apps/projects-hub.yaml, commits as fluxcdbot
  ▼
Flux helm-controller → charts/project (shared chart)    ← HelmRelease upgrade
  │
  ▼
rollout in the `projects-hub` namespace on k3s
  │
  ▼
https://projects.sujaykumar.dev/   (Traefik, catch-all @ priority 1, shared Let's Encrypt cert)
```

Concretely, [`deploy.yml`](../.github/workflows/deploy.yml) calls the shared
reusable workflow and builds:

- **image:** `ghcr.io/sujaykumarsuman/projects-hub`
- **context:** `projects`, **dockerfile:** `projects/Dockerfile`
- **tags:** `0.1.<run_number>` (the `major-minor` is `0.1`)

## Routing model

Traefik routes by host + path prefix, and priority breaks ties:

| Route | Owner | Priority | Where it's defined |
| --- | --- | --- | --- |
| `projects.sujaykumar.dev/` | **projects-hub** (this page) | 1 (lowest → fallback) | `infra` |
| `projects.sujaykumar.dev/airlift` | airlift | 100 | `infra` |
| `projects.sujaykumar.dev/landscape` | landscape | 90 | `infra` |

The routes, priorities, TLS, and namespaces are all rendered by the shared
`charts/project` Helm chart in **`sujaykumarsuman/infra`** (`apps/<app>.yaml`).
This repo owns only the hub's **page** and **image** — not any Kubernetes
manifests. (Earlier iterations kept raw manifests here under
`projects/deploy/k8s/`; those were removed when the hub moved to the
image + Flux model.)

## Adding a new project

There are two independent parts — most projects need both:

1. **Deploy the app to the cluster** — done in the **`infra`** repo, not here:
   add `apps/<name>.yaml` (a `HelmRelease` for the shared chart) and an
   image-automation entry. The app's own repo builds and pushes its image.
2. **Add a card to the hub** — edit [`index.html`](index.html): copy an
   existing `<article class="card">` block and update the index number,
   status (`live` / `gated`), name, `/route`, description, tech chips, and
   source link. Commit → PR → merge; the pipeline rebuilds the image.

Keep the page **one self-contained file**: inline CSS only, no build step, no
required CDN JavaScript (nginx just serves the single file). The visual
language is the dark "infra console" shared with the landscape dashboard —
near-black background, teal accent, monospace for technical strings (routes,
hostnames, tech tags).

## Local preview

From the repo root:

```bash
python3 -m http.server 8080
# → http://localhost:8080/projects/
```

Internal links like `/airlift` won't resolve locally — they're production
routes. To test the container exactly as it ships:

```bash
docker build -t projects-hub projects/
docker run --rm -p 8080:8080 projects-hub
# → http://localhost:8080/
```

## Cross-repo map

| Repo | Role |
| --- | --- |
| **sujaykumarsuman.github.io** (this) | Portfolio (root, GitHub Pages) **+** projects hub (`projects/`, container). |
| **sujaykumarsuman/infra** | GitOps source of truth. Flux deploys every cluster app from here via the shared `charts/project` chart; owns cluster infra (cert-manager, Let's Encrypt, Traefik config, namespaces, image-automation). |
| **sujaykumarsuman/airlift** | The `airlift` app (Go) — served at `/airlift`. |
| **sujaykumarsuman/landscape** | The `landscape` cluster dashboard (Go) — served at `/landscape`. |
| **sujaykumarsuman/.github** | Shared reusable CI (`build-push.yml`) used by every app repo, including this repo's `deploy.yml`. |
