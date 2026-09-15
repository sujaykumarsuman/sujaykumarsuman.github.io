#!/usr/bin/env bash
# Deploy / update the projects hub on k3s. index.html stays the single source of
# truth: it is shipped as a ConfigMap generated from it, so editing the page and
# re-running this is the whole update. Run on the VPS after the cluster infra is
# up (airlift/deploy/k8s/cluster). Idempotent.
set -euo pipefail
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl() { k3s kubectl "$@"; }
DIR="$(cd "$(dirname "$0")" && pwd)"
NS=projects-hub

kubectl get ns "$NS" >/dev/null 2>&1 || kubectl create ns "$NS"

# The page → ConfigMap (apply the rendered manifest so it updates in place).
kubectl -n "$NS" create configmap projects-hub-index \
  --from-file=index.html="$DIR/../../index.html" \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -n "$NS" \
  -f "$DIR/deployment.yaml" \
  -f "$DIR/service.yaml" \
  -f "$DIR/ingressroute.yaml"

# Pick up the new HTML deterministically.
kubectl -n "$NS" rollout restart deploy/projects-hub
kubectl -n "$NS" rollout status deploy/projects-hub
