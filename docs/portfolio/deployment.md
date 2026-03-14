# Deployment Guide

## Current State
- Observation date: March 15, 2026
- GitHub Pages URL: `https://sujaykumarsuman.github.io/`
- Current Pages source on GitHub: `master` branch, `/` path
- Current custom domain on GitHub: none
- Current HTTPS setting on GitHub Pages: enforced

## What Phase 4 Adds In The Repo
- `.nojekyll`
- `CNAME` set to `sujaykumar.dev`
- `404.html` for a custom Pages not-found route
- This deployment guide

## Why The Live Pages Source Was Not Flipped Yet
The live Pages site is still configured to build from `master`. The latest portfolio work now spans later phase branches and open PRs, so switching the live Pages source immediately would either:
- keep serving the old `master` site, or
- move Pages to `main` before the newer phase branches have been merged there

To avoid a partial or regressed deployment, the safe sequence is:
1. Merge the portfolio phase PRs into `main`
2. Verify `main` contains the final site
3. Switch GitHub Pages to publish from `main`
4. Then set the custom domain and validate DNS

## Safe Cutover Sequence
1. Merge the open portfolio PRs into `main`
2. Confirm the merged `main` branch includes:
   - `CNAME`
   - `.nojekyll`
   - `404.html`
   - the latest HTML, CSS, JS, and asset changes
3. Update GitHub Pages source from `master` to `main`, path `/`
4. Wait for the GitHub Pages build to complete successfully
5. Set the custom domain in GitHub Pages to `sujaykumar.dev`
6. Update DNS with the registrar or DNS provider
7. Wait for propagation, then verify:
   - `https://sujaykumar.dev/`
   - `https://www.sujaykumar.dev/` redirect behavior if configured
   - HTTPS certificate issuance and enforcement
   - the custom 404 page

## Remaining External Actions
- DNS records for `sujaykumar.dev`
- Optional `www` compatibility or redirect records
- Domain verification in GitHub, if prompted
- Final smoke test after propagation

## Recommended GitHub Steps After Merge
- Pages source:
  - branch: `main`
  - folder: `/`
- Custom domain:
  - `sujaykumar.dev`
- Keep HTTPS enforced after the certificate is issued

## References
- Publishing source:
  - `https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site`
- Custom domain:
  - `https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site`
- Domain verification:
  - `https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages`
