# Implementation Plan

## Phase 0: Documentation and Content Shaping
- Create `docs/portfolio/PRD.md`, `design-decisions.md`, `content-plan.md`, and `implementation-plan.md`.
- Add the hosted resume asset to `assets/resume/sujay_resume_v2.pdf`.
- Lock the shared content model and page structure before UI work begins.
- Review checkpoint:
  - Confirm page structure
  - Confirm copy direction
  - Confirm visual direction

## Phase 1: Visual Foundation
- Replace the current terminal-style layout with a reusable shell:
  - shared header and nav
  - max-width page container
  - layered background system
  - reusable SIM-card panel components
- Refactor CSS into clear sections:
  - tokens
  - reset and base
  - shell and layout
  - card and CTA components
  - page-specific sections
- Add a small shared JavaScript file for navigation state, content hydration, and lightweight interaction support.
- Review checkpoint:
  - visual density
  - palette and typography
  - hover and load motion

## Phase 2: Core Page Implementation
- Build the four static routes:
  - `/`
  - `/journey/`
  - `/stack/`
  - `/connect/`
- Populate pages using the shared content model.
- Add resume entry points on the home and connect pages.
- Add email CTA and copy-to-clipboard behavior on the connect page.
- Review checkpoint:
  - page hierarchy
  - timeline readability
  - stack grouping
  - CTA clarity

## Phase 3: Polish and Hardening
- Add metadata, Open Graph basics, title cleanup, and favicon support.
- Improve keyboard focus states and reduced-motion behavior.
- Tune spacing, panel treatment, and mobile breakpoints.
- Validate all outbound links and local route consistency.
- Review checkpoint:
  - mobile polish
  - accessibility pass
  - production readiness

## Phase 4: GitHub Pages and Domain Cutover
- Add `.nojekyll`.
- Add `CNAME` with `sujaykumar.dev`.
- Configure GitHub Pages to publish from the repo root on `master`.
- Update DNS records for apex and `www`.
- Enable HTTPS and confirm redirect behavior.
- Verify the custom domain with GitHub.

## Planned File Structure
```text
/
  index.html
  .nojekyll
  CNAME
  css/
    main.css
  js/
    site-data.js
    main.js
  journey/
    index.html
  stack/
    index.html
  connect/
    index.html
  assets/
    resume/
      sujay_resume_v2.pdf
  docs/
    portfolio/
      PRD.md
      design-decisions.md
      content-plan.md
      implementation-plan.md
```

## Verification Plan
- Validate HTML structure manually in the browser after each phase.
- Check key breakpoints around 360px, 768px, 1024px, and 1440px.
- Verify keyboard navigation and visible focus states.
- Verify `mailto`, resume link, and all external profile links.
- In the deployment phase, verify GitHub Pages publish, HTTPS, and domain resolution.

## Deployment References
- GitHub Pages publishing source:
  - `https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site`
- GitHub Pages custom domain:
  - `https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site`
- GitHub Pages domain verification:
  - `https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages`
