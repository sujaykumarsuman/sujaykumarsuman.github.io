# projects hub on k3s (the `projects-hub` namespace)

Serves `projects/index.html` at `https://projects.sujaykumar.dev/` (the catch-all
route; each project owns a higher-priority path prefix, e.g. airlift at
`/airlift`). Part of the k3s migration —
see `airlift/docs/build-plan/k3s-migration.md`.

`index.html` (one directory up) stays the single source of truth: it is shipped
as a ConfigMap generated from the file, so editing the page and re-running
`deploy.sh` is the entire update — no image to build.

## Deploy / update

On the VPS, after the shared cluster infra is up
(`airlift/deploy/k8s/cluster/`):

```
bash deploy.sh
```

## Verify

```
curl -s https://projects.sujaykumar.dev/ | head
```

## Files

| File | Purpose |
| --- | --- |
| `deploy.sh` | generate the ConfigMap from `../../index.html`, apply, roll out |
| `deployment.yaml` | unprivileged nginx serving the mounted page |
| `service.yaml` | ClusterIP :80 → :8080 |
| `ingressroute.yaml` | catch-all `/` at `priority: 1` (below every project) |
