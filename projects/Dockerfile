# The projects hub image: unprivileged nginx (uid 101, listens on 8080) serving
# the static page. Built + pushed to GHCR by .github/workflows/deploy.yml;
# deployed by Flux via the shared `project` chart (sujaykumarsuman/infra).
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY index.html /usr/share/nginx/html/index.html
