// All portfolio content — pluggable. Add a new project to PROJECTS array, that's it.

window.PORTFOLIO_DATA = {
  meta: {
    name: "Sujay Kumar Suman",
    handle: "sujaykumarsuman",
    role: "Software Engineer",
    location: "India",
    tagline: "Building Go services, Kubernetes-native controllers, and platforms that stay clear under load.",
    email: "sujaykumar.dev@gmail.com",
    resumeUrl: "/assets/resume/sujay_resume_v4.pdf",
    githubUrl: "https://github.com/sujaykumarsuman",
    linkedinUrl: "https://www.linkedin.com/in/sujaykumarsuman/",
    leetcodeUrl: "https://leetcode.com/sujaykumarsuman/",
    recommendationsUrl: "https://www.linkedin.com/in/sujaykumarsuman/details/recommendations",
  },

  about: [
    "I'm a software engineer who builds Go services, Kubernetes-native controllers, and internal platforms that help teams ship faster without trading away reliability or operational clarity.",
    "Most recently at HashiCorp working on Consul — enterprise reliability, traffic routing, license reporting, and on-call across HCP and self-managed environments. Before that, two years at Infoblox building a SaaS DDI platform from scratch: GitOps workflows, CRD-driven provisioning, service mesh controllers, and the tooling that made the platform debuggable.",
    "My work sits at the intersection of product capability and operational durability. I care about systems that are clear to reason about, safe to ship, and built to stay that way under real load.",
  ],

  stats: [
    { value: "500+", label: "high-sev fixes" },
    { value: "900+", label: "node-scale clusters" },
    { value: "<2h", label: "cluster provisioning" },
    { value: "~5y", label: "in production systems" },
  ],

  experience: [
    {
      company: "HashiCorp",
      role: "Engineer 2",
      period: "Feb 2025 — Mar 2026",
      summary: "Consul: enterprise reliability, traffic routing, license reporting, customer ops.",
      tech: ["Consul", "Raft", "Kubernetes", "Service Mesh", "ACLs", "Go"],
      highlights: [
        "Fixed 500+ high-severity vulnerabilities in HCP Consul before product sunset.",
        "Delivered configurable Virtual IP support for CIDR-aware mesh gateway routing.",
        "Added subset-aware API gateway routing for finer traffic control.",
        "Built enterprise census reporting on top of Raft-backed Consul for license tracking.",
        "Supported HCP and self-managed enterprise customers through on-call and high-sev incidents.",
      ],
    },
    {
      company: "Infoblox",
      role: "Software Engineer 2",
      period: "Jul 2022 — Jan 2025",
      summary: "Kubernetes-native platform services, GitOps workflows, networking automation for SaaS DDI.",
      tech: ["Go", "Kubernetes", "AWS", "FluxCD", "Crossplane", "KubeVela", "IPSec", "VxLAN", "OVS"],
      highlights: [
        "Built database provisioning through Kubernetes CRDs and migrated internal services onto a unified flow.",
        "Established a FluxCD + KubeVela + Crossplane workflow that cut cluster creation time to under two hours.",
        "Designed Go-based controllers and supporting services for SaaS DDI traffic paths spanning IPSec, VxLAN, and OVS.",
        "Built CLI tooling and docs that shortened debugging, onboarding, and incident response.",
      ],
    },
    {
      company: "Nokia Solutions & Networks",
      role: "Developer",
      period: "Jul 2021 — Jun 2022",
      summary: "Backend service integrations, storage abstractions, reliability-oriented API work.",
      tech: ["Go", "OpenAPI", "MariaDB", "ElasticSearch", "MinIO"],
      highlights: [
        "Built a pluggable storage backend package adopted across services.",
        "Implemented REST APIs for redundancy synchronization and end-of-service notifications.",
        "Added unit, integration, and performance coverage around storage integration workflows.",
      ],
    },
  ],

  skills: [
    { name: "Programming", items: ["Go", "Python", "Shell", "SQL", "C++"] },
    { name: "Core Knowledge", items: ["Microservices", "Distributed Systems", "System Design", "Algorithms", "Data Structures"] },
    { name: "Cloud & Infra", items: ["Kubernetes", "AWS", "Docker", "Helm", "Linux", "Terraform", "GitHub Actions", "Jenkins", "FluxCD", "KubeVela", "Crossplane"] },
    { name: "Data & Messaging", items: ["PostgreSQL", "Redis", "DynamoDB", "Kafka"] },
    { name: "Networking & Storage", items: ["Consul", "IPSec", "VxLAN", "OVS", "S3", "MinIO"] },
    { name: "AI & Tooling", items: ["Claude Code", "Claude API", "OpenAI API", "RAG", "Prompt Engineering", "AI-assisted dev workflows"] },
  ],

  // Pluggable. Add new projects by appending entries here.
  projects: [
    {
      id: "careerdock",
      name: "CareerDock",
      tagline: "Career intelligence platform for tech job seekers in India.",
      description: "Browse 200+ Indian tech companies, track applications, get AI-powered ATS scores, and land your dream tech job. Built as a real product with company directory, application tracker, AI resume analysis, and offline support.",
      status: "Active",
      year: "2025",
      role: "Creator & Maintainer",
      repo: "https://github.com/skriptvalley/careerdock",
      live: null,
      tech: ["Go", "Chi", "Next.js 15", "React 19", "PostgreSQL", "Redis", "Asynq", "TailwindCSS", "Claude API", "S3"],
      features: [
        "Company directory with rich filters (size, stack, comp, hiring status)",
        "Application tracker with statuses, dates, notes",
        "AI resume analysis — skill extraction, suggestions",
        "ATS scoring — general, company-specific, job-specific",
        "AI company matching from resume profile",
        "Offline-capable directory",
      ],
      pending: "DSA practice tracks, system design library, and curated AI learning resources for engineers.",
      pendingLabel: "Building next",
      pendingItems: [
        "DSA practice tracks with topic-wise progression and AI hints",
        "System design library — case studies and design exercises",
        "Curated AI learning resources — prompting, RAG, agents",
      ],
      mockType: "careerdock",
      builtWithClaude: true,
      accent: "terracotta",
    },
    {
      id: "verdox",
      name: "Verdox",
      tagline: "Self-hosted test orchestration. No vendor lock-in.",
      description: "Trigger, manage, and analyze test runs against GitHub repositories without surrendering your data. Forks target repos via a service account, dispatches GitHub Actions, and ingests results through webhooks and SSE — all running on infra you control.",
      status: "Dev Complete",
      year: "2025",
      role: "Creator & Maintainer",
      repo: "https://github.com/sujaykumarsuman/verdox",
      live: null,
      tech: ["Go 1.26", "Echo v4", "Next.js 15", "React 19", "PostgreSQL 17", "Redis 7", "Nginx", "GitHub Actions", "JWT"],
      features: [
        "Repository management — add repos, browse branches/commits, fork management",
        "Test suites with custom workflow YAML and AI-powered generation from existing GHA",
        "Hierarchical test results — runs → groups → cases",
        "Real-time status via Redis pub/sub + SSE",
        "Teams with role-based access (admin/maintainer/viewer) + join requests",
        "Admin panel — user management, ban-with-appeal flow, bulk notifications",
      ],
      pending: "Helm charts and Kubernetes-native deployment resources for self-hosted setups.",
      pendingLabel: "Building next",
      pendingItems: [
        "Production-grade Helm charts with sane defaults",
        "Kubernetes manifests for HA Postgres + Redis + workers",
        "One-command bootstrap for self-hosted Verdox",
      ],
      mockType: "verdox",
      builtWithClaude: true,
      accent: "sage",
    },
  ],

  recommendations: [
    {
      name: "Sharad Bapat",
      company: "HashiCorp",
      linkedin: "https://www.linkedin.com/in/sharadbapat/",
      relationship: "Sharad managed Sujay directly",
      date: "April 18, 2026",
      text: "Sujay was part of my team for over a year in the Consul team, where he consistently proved himself to be a high-impact engineer. Sujay has been on-call and handled some of the toughest customer issues, often responding to mid-night pages with calmness and precision.\n\nSujay is highly dependable, deeply committed, and brings a level of ownership that makes him an asset to any team. His ability to troubleshoot complex problems under pressure and drive them to resolution speaks volumes about his technical strength and professional maturity.\n\nAny team that has Sujay onboard will benefit from his reliability, expertise, and dedication.",
    },
    {
      name: "Abhishek Bodhekar",
      company: "Infoblox",
      linkedin: "https://www.linkedin.com/in/abhishekbodhekar/",
      relationship: "Worked with Sujay on the same team",
      date: "January 16, 2024",
      text: "I have worked with Sujay for more than 18 months. I would undoubtedly recommend Sujay as an excellent backend software engineer. His skillset in the areas of modern software architecture is unparalleled. His command over programming languages like Golang and technologies like Kubernetes make him stand apart. He has been a wonderful teammate and a great problem solver. He is adept at collaborating with cross-functional teams, bringing a valuable blend of technical proficiency and creativity to the table. Sujay is an invaluable asset to any software development team, and I am confident in his ability to excel in any professional setting.",
    },
    {
      name: "Premkumar Bhaskal",
      company: "Nokia",
      linkedin: "https://www.linkedin.com/in/premkumar-bhaskal-aa990a21/",
      relationship: "Was senior to Sujay (didn't manage directly)",
      date: "July 30, 2022",
      text: "Sujay was excellent in grasping new concepts and made a mark in the team. He stood out amongst all new joinees. He is very good in logical thinking, Go, Kubernetes, Linux and S3 storage. He is a team player and helped all his colleagues. He will be a valuable member of any organisation he joins.",
    },
  ],

  writing: [
    {
      title: "Coming soon",
      summary: "I'm starting to write up notes from production work — Consul internals, Kubernetes controller patterns, and lessons from on-call. Subscribe via GitHub for updates.",
      date: "TBA",
      href: "https://github.com/sujaykumarsuman",
    },
  ],
};
