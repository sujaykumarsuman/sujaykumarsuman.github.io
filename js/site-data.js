window.PORTFOLIO_DATA = {
  siteMeta: {
    name: "Sujay Kumar Suman",
    shortName: "SK",
    role: "Distributed Systems Engineer",
    domain: "sujaykumar.dev",
    email: "sujaykumar.dev@gmail.com",
    location: "Bengaluru, India",
    resumeUrl: "/assets/resume/sujay_resume_v2.pdf",
    githubUrl: "https://github.com/sujaykumarsuman",
  },
  navItems: [
    { href: "/", label: "Home" },
    { href: "/journey/", label: "Journey" },
    { href: "/stack/", label: "Stack" },
    { href: "/connect/", label: "Connect" },
  ],
  profileLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sujaykumarsuman/",
      note: "Professional profile",
    },
    {
      label: "GitHub",
      href: "https://github.com/sujaykumarsuman",
      note: "Code and experiments",
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/sujaykumarsuman/",
      note: "Problem solving",
    },
    {
      label: "GeeksForGeeks",
      href: "https://auth.geeksforgeeks.org/user/sujaykumarsuman/profile",
      note: "Technical profile",
    },
    {
      label: "Resume",
      href: "/assets/resume/sujay_resume_v2.pdf",
      note: "Hosted PDF copy",
      local: true,
    },
  ],
  highlightStats: [
    {
      value: "500+",
      label: "High severity fixes",
      detail: "Security remediation delivered in HCP Consul during a critical sunset window.",
    },
    {
      value: "900+",
      label: "Node-scale reliability",
      detail: "Consul login load distribution improvements for large Kubernetes clusters.",
    },
    {
      value: "<2h",
      label: "Cluster provisioning",
      detail: "GitOps resource workflows reduced cluster creation to under two hours.",
    },
    {
      value: "4+",
      label: "Years in production systems",
      detail: "Backends, controllers, networking, storage, and operational tooling.",
    },
  ],
  experiencePreview: [
    {
      company: "HashiCorp",
      role: "Engineer 2",
      period: "Feb 2025 - Present",
      focus: "Service mesh, enterprise reliability, and production support for Consul.",
      highlights: [
        "Fixed over 500 high-severity vulnerabilities in HCP Consul before product sunset.",
        "Delivered configurable Virtual IP workflows for CIDR-aware mesh gateway routing.",
        "Improved ACL login staggering for better load distribution in 900+ node clusters.",
      ],
    },
    {
      company: "Infoblox",
      role: "Software Engineer 2",
      period: "Jul 2022 - Jan 2025",
      focus: "Kubernetes-native platform services, GitOps workflows, and networking automation.",
      highlights: [
        "Built database provisioning through Kubernetes CRDs and migrated internal services.",
        "Established a FluxCD, KubeVela, and Crossplane workflow that cut cluster creation to under two hours.",
        "Designed Go-based controllers and services handling IPSec, VxLAN, and OVS traffic paths.",
      ],
    },
    {
      company: "Nokia Solutions & Networks",
      role: "Developer",
      period: "Jul 2021 - Jun 2022",
      focus: "Backend and storage platform work for service integration and reliability.",
      highlights: [
        "Replaced MinIO with pluggable storage backends in a reusable Go package adopted across services.",
        "Implemented REST APIs and protocol extensions for redundancy sync and end-of-service notifications.",
        "Built with OpenAPI, MariaDB, ElasticSearch, and production-focused testing.",
      ],
    },
  ],
  skillGroups: [
    {
      name: "Programming",
      items: ["Go", "Python", "Shell", "SQL", "C++"],
    },
    {
      name: "Core Knowledge",
      items: ["Microservices", "Distributed Systems", "System Design", "Algorithms", "Data Structures"],
    },
    {
      name: "Cloud and Infrastructure",
      items: ["Kubernetes", "AWS", "Docker", "Helm", "Linux"],
    },
    {
      name: "Data and Messaging",
      items: ["PostgreSQL", "Redis", "DynamoDB", "Kafka"],
    },
    {
      name: "Networking and Storage",
      items: ["Consul", "IPSec", "VxLAN", "OVS", "S3", "MinIO"],
    },
    {
      name: "DevOps and Automation",
      items: ["GitHub Actions", "Jenkins", "FluxCD", "KubeVela", "Crossplane", "Terraform"],
    },
  ],
  phaseOnePages: {
    journey: {
      eyebrow: "Phase 1 foundation / journey",
      title: "The route shell is live, ready for a full experience timeline in Phase 2.",
      summary:
        "This page now carries the visual system, route structure, and preview card treatment that Phase 2 will expand into a fuller career narrative.",
      lockedIn: [
        "Shared route chrome and active navigation behavior.",
        "Timeline card styling for dense but readable impact summaries.",
        "Spacing, typography, and motion rules for long-form experience content.",
      ],
      next: [
        "Full timeline with cleaned-up experience bullets.",
        "More deliberate ordering of achievements and scope.",
        "Stronger narrative framing around career progression.",
      ],
    },
    stack: {
      eyebrow: "Phase 1 foundation / stack",
      title: "The capability grid is in place, ready for a richer technical breakdown.",
      summary:
        "The page shell, grouped skill presentation, and profile utility modules are ready. Phase 2 will deepen the content without changing the design direction.",
      lockedIn: [
        "Grouped stack presentation instead of an undifferentiated tag wall.",
        "SIM-like module styling for skills and profile utilities.",
        "A shared content model that can drive future pages consistently.",
      ],
      next: [
        "Full stack groups with more deliberate prioritization.",
        "Profile links integrated into the information hierarchy.",
        "Polished copy around engineering strengths and focus areas.",
      ],
    },
    connect: {
      eyebrow: "Phase 1 foundation / connect",
      title: "The contact route is established with direct-email UX at the center.",
      summary:
        "The final direction is already visible here: email first, hosted resume access, and professional links as secondary paths.",
      lockedIn: [
        "Direct email as the primary call to action.",
        "Hosted resume route and profile module styling.",
        "Responsive contact panels aligned with the shared shell.",
      ],
      next: [
        "Copy-to-clipboard interaction for the email address.",
        "Final contact copy and availability messaging.",
        "Additional metadata and accessibility refinement.",
      ],
    },
  },
};
