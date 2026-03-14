# Content Plan

## Source of Truth
- Resume asset: `assets/resume/sujay_resume_v2.pdf`
- Existing public profiles:
  - LinkedIn: `https://www.linkedin.com/in/sujaykumarsuman/`
  - GitHub: `https://github.com/sujaykumarsuman`
  - LeetCode: `https://leetcode.com/sujaykumarsuman/`
  - GeeksForGeeks: `https://auth.geeksforgeeks.org/user/sujaykumarsuman/profile`
- Primary email: `sujaykumar.dev@gmail.com`

## Shared Content Model
```js
siteMeta
navItems
profileLinks
experienceTimeline
skillGroups
contactCtas
```

## Core Positioning
Primary headline direction:

`Distributed systems engineer building reliable cloud-native platforms.`

Supporting copy direction:

`I design and ship backend systems, Kubernetes-native tooling, and platform workflows that improve scalability, reliability, and operational control.`

## Home Page Outline
- Hero
  - Name
  - Role and positioning statement
  - 2 primary CTAs: journey and email
  - 2 secondary CTAs: resume and GitHub
- Highlight rail
  - 4 compact stats or proof points
- Selected journey
  - One panel each for HashiCorp, Infoblox, and Nokia
- Stack preview
  - Tag clusters for Go, Kubernetes, AWS, distributed systems, networking, and automation
- Footer CTA
  - Direct email plus profile links

## Journey Page Outline
- Intro copy explaining the progression from backend engineering to cloud-native platform ownership.
- Three timeline sections:
  - HashiCorp, Engineer 2, Bengaluru, Feb 2025 to present
  - Infoblox, Software Engineer 2, Bengaluru, Jul 2022 to Jan 2025
  - Nokia Solutions & Networks, Developer, Bengaluru, Jul 2021 to Jun 2022
- Each entry should use 3 to 5 cleaned-up highlights, not raw resume bullets.

## Stack Page Outline
- Programming: Go, Python, Shell, SQL, C++
- Core knowledge: microservices, distributed systems, system design, algorithms, data structures
- Cloud and infrastructure: Kubernetes, AWS, Docker, Helm, Linux
- Data and messaging: PostgreSQL, Redis, DynamoDB, Kafka
- Networking and storage: Consul, IPSec, VxLAN, OVS, S3, MinIO
- DevOps and automation: GitHub Actions, Jenkins, FluxCD, KubeVela, Crossplane, Terraform, Infrastructure as Code
- Profile links module at the end, styled as utility modules rather than a social footer

## Connect Page Outline
- Direct email CTA: `mailto:sujaykumar.dev@gmail.com`
- Copy-email button with transient confirmation state
- Resume card pointing to `/assets/resume/sujay_resume_v2.pdf`
- Professional profile links
- Short availability note focused on backend, platform, and distributed systems roles

## Headline Achievements
- Fixed 500+ high-severity vulnerabilities in HCP Consul during a critical product sunset window.
- Improved ACL login load distribution for Consul on Kubernetes deployments with 900+ nodes.
- Delivered configurable Virtual IP support for service mesh gateway routing using CIDR-aware allocation.
- Built enterprise census reporting on top of Raft-backed Consul workflows for reliable license tracking and export.
- Created Kubernetes-native database provisioning via CRDs and migrated internal services onto the unified workflow.
- Established a GitOps resource request flow with FluxCD, KubeVela, and Crossplane, cutting cluster creation time to under two hours.
- Built Go-based controllers and supporting services for SaaS DDI systems spanning IPSec, VxLAN, and OVS traffic paths.
- Replaced MinIO with pluggable storage backends in a reusable Go package adopted across Nokia services.

## Tone Rules
- Keep sentences tight and factual.
- Prefer "built", "delivered", "improved", "fixed", "designed", and "led".
- Avoid first-person overuse outside the hero and connect page.
- Avoid raw resume formatting on the public pages.

## Content Gaps Deferred
- Detailed project case studies
- Blog posts or writing samples
- Testimonials
- Company logo assets unless they are locally hosted and visually consistent
