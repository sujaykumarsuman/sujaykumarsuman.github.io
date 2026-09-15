# Git strategy

## Branch model

`main` is the **only long-lived branch** and the **deploy branch for both
deliverables** (portfolio + projects hub). It's treated as protected: changes
land through pull requests, never direct pushes.

Work happens on **short-lived, single-topic feature branches** that are
deleted after merge. Remote branches are pruned once their PR merges — at any
time `origin` normally holds just `main`.

### Branch naming (observed convention)

| Prefix | Used for | Examples |
| --- | --- | --- |
| `sujay/<topic>` | portfolio content & design tweaks | `sujay/update-data`, `sujay/nav-safe-area-insets` |
| `phase/<n>-<topic>` | staged infra / migration work | `phase/13-k3s` |
| `ci/<topic>` | CI / deploy plumbing | `ci/hub-image` |
| `feat\|fix\|chore/<topic>` | anything else | `feat/projects-hub-redesign` |

Pick whatever prefix fits; keep it short and single-purpose.

## PR + merge flow

1. Branch from `main`.
2. Commit using [Conventional Commits](#commit-messages).
3. Push and open a PR targeting `main`.
4. **Squash-merge.** The squash commit carries the PR number, e.g.
   `feat: k3s manifests for the projects hub (Phase 13) (#25)`.
5. Delete the branch.

History on `main` stays linear — one squash commit per PR. You'll see each
feature branch's own commits as a short parallel line that ends at the merge;
that's normal with squash merges and those refs get pruned.

```
main ──●──────●──────●──────●──────●───▶     each ● = one squashed PR
        \      \      \
         (feature branches, squashed in and deleted)
```

## Commit messages

Conventional Commits, imperative and lowercase. Types seen in this repo:
`feat`, `fix`, `chore`, `refactor`, `ci`, `docs`. Recent history:

```
ci: build the projects-hub image and deploy via Flux (#26)
feat: k3s manifests for the projects hub (Phase 13) (#25)
chore: update resume to v6 (#24)
refactor: drive every section from data.json (#20)
```

## What merging to `main` does — the two deploy triggers

`main` is watched by two independent deploy paths:

| Change | Trigger | Result |
| --- | --- | --- |
| any push | GitHub Pages build | `sujaykumar.dev` updates |
| `projects/index.html`, `projects/Dockerfile`, or `.github/workflows/deploy.yml` | [`deploy.yml`](../.github/workflows/deploy.yml) (path-filtered) | builds + pushes the `projects-hub` image → Flux deploys it to k3s |

A PR that only touches `projects/**` redeploys the hub; a PR that only touches
portfolio files just refreshes Pages. The workflow's path filter keeps a
portfolio change from rebuilding the container image needlessly. The projects
workflow also has `workflow_dispatch`, so the image can be rebuilt manually
without a content change.

## Versioning / releases

- **Portfolio** — no versioning. `main` is live; there's nothing to tag.
- **Projects hub** — images are tagged `0.1.<run_number>` automatically by the
  build workflow, and Flux's `ImagePolicy` (`>=0.1.0`) always deploys the
  newest. No manual tags — **every merge that changes the page ships.**

> By contrast, the sibling **app** repos (`airlift`, `landscape`) cut `v*` git
> tags to trigger their releases. This repo's hub does not; it deploys on
> merge. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Local checks before opening a PR

- **Portfolio:** `python3 -m http.server 8080`, confirm the page renders, the
  theme toggle works, and the console is clean.
- **Projects hub:** preview `projects/index.html` (see
  [`projects/README.md`](../projects/README.md)); optionally `docker build` to
  test the image as it ships.

## Work that belongs in another repo

Deploying a new cluster app, changing a route or priority, TLS, RBAC, or
secrets is a **PR to `sujaykumarsuman/infra`**, not here. This repo only owns
the portfolio and the projects hub's page + image.
