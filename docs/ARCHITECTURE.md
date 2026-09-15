# Architecture

This repository produces **two independently-deployed things** from the same
`main` branch:

| # | Site | Hosting | Built from |
| --- | --- | --- | --- |
| 1 | **sujaykumar.dev** | GitHub Pages | repo root (`index.html`, `*.jsx`, `styles.css`, `data.json`) |
| 2 | **projects.sujaykumar.dev** | container on a k3s cluster (Flux GitOps) | [`projects/`](../projects/) |

They share a repo but nothing at runtime: the portfolio is static files on
Pages; the projects hub is a container image deployed to a cluster.

---

## Repo layout

```
sujaykumarsuman.github.io/
├── index.html            # portfolio shell — loads React + Babel, mounts #root
├── app.jsx               # fetches data.json, composes the sections
├── sections.jsx          # the section components (window.NavBar, window.Hero, …)
├── styles.css            # the whole design system (light + dark)
├── data.json             # ← single source of truth for ALL portfolio content
├── assets/               # brand mark, résumé PDF(s), images
├── CNAME                 # sujaykumar.dev  (GitHub Pages custom domain)
├── .nojekyll             # tell Pages not to run Jekyll
│
├── projects/             # ← projects.sujaykumar.dev hub (its own README)
│   ├── index.html        #   the hub landing page (self-contained static file)
│   ├── Dockerfile        #   packages the page into an nginx image
│   └── README.md         #   how the projects subdomain is managed
│
├── .github/workflows/
│   └── deploy.yml        # builds the projects-hub image when projects/** changes
│
├── docs/                 # this documentation
└── .claude/launch.json   # local preview config (python http.server :8080)
```

---

## Deliverable 1 — sujaykumar.dev (portfolio)

A **single-page React app with no build step.**

- `index.html` loads React 18 + ReactDOM (UMD) and `@babel/standalone` from
  the unpkg CDN, then loads `sections.jsx` and `app.jsx` as
  `<script type="text/babel">` — JSX is compiled **in the browser** at load
  time, so there is nothing to bundle or transpile ahead of time.
- `app.jsx` fetches `data.json`, stashes it on `window.PORTFOLIO_DATA`, and
  renders one `<main class="app">` with the sections in order: NavBar, Hero,
  About, Skills, Experience, Projects, Recommendations, Résumé, Contact.
- Theme (light/dark) is stored in `localStorage['theme']` and applied to
  `document.documentElement`; an inline script in `index.html` sets it before
  first paint to avoid a flash.
- **Content** is 100% in [`data.json`](../data.json) — see
  [CONTENT.md](CONTENT.md). **Design** is in `styles.css` — see
  [DESIGN.md](DESIGN.md).

```
edit data.json / styles.css / *.jsx
  → feature branch → PR → squash-merge to main
  → GitHub Pages rebuilds
  → https://sujaykumar.dev
```

No containers, no CI build, no server. Pushing to `main` is the deploy.

---

## Deliverable 2 — projects.sujaykumar.dev (projects hub)

A static page baked into an nginx image and deployed to k3s by Flux. The
detailed pipeline, routing model, and "add a project" steps live in
[`projects/README.md`](../projects/README.md). In brief:

```
edit projects/index.html → PR → main
  → .github/workflows/deploy.yml builds ghcr.io/sujaykumarsuman/projects-hub:0.1.<run#>
  → Flux image-automation (sujaykumarsuman/infra) bumps the tag
  → Flux helm-controller upgrades the HelmRelease → rollout on k3s
  → https://projects.sujaykumar.dev/
```

---

## The cluster platform (shared)

`projects.sujaykumar.dev` is a **single-node k3s cluster on a VPS**. Several
apps are co-tenants; each is deployed by **Flux** from the
`sujaykumarsuman/infra` repo via one shared Helm chart, and routed by Traefik
under one hostname behind one TLS certificate.

| Component | What it does | Owned by |
| --- | --- | --- |
| **k3s** (single node) | The cluster; ships Traefik as the ingress controller. | bootstrapped out-of-band on the VPS |
| **Flux CD** (v2) | Runs in-cluster, reconciles the cluster to match the `infra` repo. Pull-based — CI never touches the cluster. | `infra` |
| **cert-manager + Let's Encrypt** | One shared cert (`projects-tls`, HTTP-01) served via Traefik's default `TLSStore`; per-app routes reference no secret. | `infra` |
| **`charts/project`** (Helm) | Renders a Deployment + Service + Traefik `IngressRoute` for each app from values. | `infra` |
| **Image automation** | Flux watches GHCR; an `ImagePolicy` bumps the image tag in `infra`, and helm-controller rolls it out. | `infra` |

### Apps on the cluster

| App | Route | Priority | Source repo | Notes |
| --- | --- | --- | --- | --- |
| **projects-hub** | `/` | 1 (catch-all) | **this repo** (`projects/`) | the landing page |
| **airlift** | `/airlift` | 100 | `sujaykumarsuman/airlift` | Go app (optical air-gap file transfer) |
| **landscape** | `/landscape` | 90 | `sujaykumarsuman/landscape` | Go app (read-only cluster dashboard, admin-gated) |

Traefik matches the most specific prefix first (higher priority wins), so an
app path always beats the hub's catch-all.

### Cross-repo map

| Repo | Role |
| --- | --- |
| **sujaykumarsuman.github.io** (this) | Portfolio (root → Pages) + projects hub (`projects/` → container). |
| **sujaykumarsuman/infra** | GitOps source of truth. Deploys every cluster app via `charts/project`; owns all in-cluster infra (cert-manager, issuers, Traefik config, TLS, namespaces, image-automation). |
| **sujaykumarsuman/airlift** | The `airlift` application (Go). Builds its own image; deployed by `infra`. |
| **sujaykumarsuman/landscape** | The `landscape` dashboard (Go), which visualises this whole GitOps graph. Built + deployed the same way. |
| **sujaykumarsuman/.github** | Shared reusable CI workflow (`build-push.yml`) called by every app repo's `deploy.yml`, including this one. |

There are no git submodules or code imports between the repos — they're
coupled only by container images and by the `infra` repo referencing each
image. `landscape` is the live picture of it all.

---

## How a change reaches production

| | **Portfolio** (`sujaykumar.dev`) | **Projects hub** (`projects.sujaykumar.dev`) |
| --- | --- | --- |
| Edit | `data.json`, `styles.css`, `*.jsx` | `projects/index.html`, `projects/Dockerfile` |
| Trigger | push to `main` | push to `main` touching `projects/**` |
| Build | none (JSX compiled in browser) | GitHub Actions → Docker image |
| Registry | — | `ghcr.io/sujaykumarsuman/projects-hub` |
| Deploy | GitHub Pages | Flux GitOps (via `infra`) → k3s |
| Live in | ~a minute | image build + Flux reconcile (a few minutes) |

---

## What is deliberately *not* in this repo

- **No Kubernetes manifests.** The hub's Deployment/Service/route live in
  `infra` (the shared chart + `apps/projects-hub.yaml`). This repo owns only
  the page and the image recipe.
- **No DNS or cluster provisioning.** The subdomain's DNS is pointed at the
  VPS out-of-band, and the k3s cluster is bootstrapped out-of-band; `infra`
  owns only in-cluster configuration.
- **No server or container for the portfolio.** It is static files served by
  GitHub Pages.

See [GIT_STRATEGY.md](GIT_STRATEGY.md) for the branching and release model,
and [STATE.md](STATE.md) for current status.
