# Product Requirements Document

## Product Summary
Rebuild `sujaykumarsuman.github.io` into a static portfolio for `sujaykumar.dev` that presents Sujay Kumar Suman as a distributed systems and platform engineer through a futuristic, neon-forward visual language. The site should feel intentional and polished while staying simple to host on GitHub Pages.

## Problem Statement
The current site is a minimal terminal-style page with profile links. It does not communicate seniority, technical breadth, measurable impact, or a clear next step for recruiters and collaborators.

## Goals
- Present a strong first impression in under 10 seconds.
- Showcase career progression from Nokia to Infoblox to HashiCorp.
- Highlight distributed systems, Go, Kubernetes, platform engineering, and operational excellence.
- Give visitors clear actions: view journey, inspect technical stack, open resume, and send email.
- Keep the site static, fast, and easy to deploy on GitHub Pages with a custom domain.

## Non-Goals
- No backend or database.
- No third-party contact form in v1.
- No blog, CMS, or admin workflow in v1.
- No project case-study page until the experience-first version is approved.

## Target Audience
- Recruiters and hiring managers scanning quickly.
- Engineering managers evaluating scope, impact, and seniority.
- Engineers or collaborators validating technical depth through stack and journey pages.

## Success Criteria
- The landing page communicates role, specialty, and direction without requiring scrolling deep into the site.
- Every page has at least one visible primary CTA.
- Resume, profile links, and email CTA work on desktop and mobile.
- The site is readable, keyboard-accessible, and visually consistent across breakpoints.
- Deployment is ready for `https://sujaykumar.dev` on GitHub Pages.

## Information Architecture
- `/`
  - Hero, positioning, selected achievements, experience preview, CTA rail.
- `/journey/`
  - Full experience timeline, impact highlights, and growth narrative.
- `/stack/`
  - Skills grouped by discipline plus profile links.
- `/connect/`
  - Email CTA, resume download, professional links, and availability messaging.

## Functional Requirements
- Shared nav across all pages with current-page state.
- Shared content model in JavaScript for metadata, profiles, experience, skills, and contact CTAs.
- Resume served from the site repository.
- Copy-email interaction on the connect page with a non-blocking success state.
- External links open safely in a new tab where appropriate.
- Motion respects `prefers-reduced-motion`.

## Content Requirements
- Primary positioning should reflect platform engineering, distributed systems, cloud-native systems, and Go expertise.
- The journey page should emphasize measurable outcomes:
  - 500+ vulnerability remediations at HashiCorp.
  - Kubernetes scale and load distribution improvements in 900+ node environments.
  - GitOps and platform automation work at Infoblox.
  - Storage backend and API/platform engineering work at Nokia.
- Technical stack should be grouped into programming, core knowledge, cloud and infrastructure, data and messaging, networking and storage, and DevOps and automation.

## Constraints
- Static HTML, CSS, and JavaScript only.
- Preserve GitHub Pages compatibility from the repo root.
- Keep implementation small enough to review in phases.
- Default canonical domain is `https://sujaykumar.dev`.

## Open Decisions Resolved
- Site structure: multi-page static site.
- Contact model: direct email CTA only for v1.
- Content emphasis: experience-first.
- Social set: LinkedIn, GitHub, LeetCode, GeeksForGeeks, resume, and email. Instagram stays out of v1.
