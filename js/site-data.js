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
    footerHeading: "Ready to talk backend systems, platform engineering, or distributed infrastructure.",
    footerSummary:
      "Based in Bengaluru, India. Email is the fastest route, and the resume plus technical profiles stay one click away.",
  },
  navItems: [
    { href: "/", label: "Home" },
    { href: "/journey/", label: "Journey" },
    { href: "/stack/", label: "Stack" },
    { href: "/connect/", label: "Connect" },
  ],
  pages: {
    home: {
      eyebrow: "sujaykumar.dev / distributed systems / platform engineering",
      title: "Distributed systems and platform workflows engineered for reliability at scale.",
      summary:
        "I build Go services, Kubernetes-native controllers, and internal platforms that help teams move faster without trading away operational control.",
      actions: [
        { label: "Explore journey", href: "/journey/", style: "button-primary" },
        { label: "View stack", href: "/stack/", style: "button-secondary" },
        {
          label: "Open resume",
          href: "/assets/resume/sujay_resume_v2.pdf",
          style: "button-ghost",
          newTab: true,
        },
      ],
      signalTitle:
        "Production systems, Kubernetes control planes, and delivery paths that stay maintainable under pressure.",
      signalSummary:
        "The strongest pattern across the work is not novelty. It is building clear, operable systems that reduce friction for engineers and lower risk in production.",
      focusList: [
        "Go services and controllers for cloud-native platforms.",
        "Distributed systems work with real reliability and operability constraints.",
        "Infrastructure workflows that reduce manual toil and clarify ownership.",
      ],
      status: "Open to backend, platform, and distributed systems conversations.",
      contactSummary:
        "If you want to discuss backend, platform engineering, or distributed infrastructure roles, email is the fastest path.",
      contactActions: [
        {
          label: "Email Sujay",
          href: "mailto:sujaykumar.dev@gmail.com",
          style: "button-primary",
        },
        { label: "Open contact route", href: "/connect/", style: "button-ghost" },
      ],
    },
    journey: {
      eyebrow: "Journey / systems shipped in production",
      title: "From backend delivery to platform ownership across storage, networking, and service mesh systems.",
      summary:
        "Across Nokia, Infoblox, and HashiCorp, the throughline is consistent: simplify complex systems, remove operational friction, and keep reliability visible.",
      panels: [
        {
          label: "Operating profile",
          title: "What shows up across the roles",
          summary:
            "The work consistently sits between product capability and operational durability, where systems need to be both useful and easy to run.",
          list: [
            "Turn platform complexity into clearer product and operations flows.",
            "Design for operability: debuggability, safer rollout paths, and less manual toil.",
            "Work comfortably across APIs, controllers, networking, storage, and incidents.",
          ],
        },
        {
          label: "Foundations",
          title: "Education and technical base",
          summary:
            "B.E. in Computer Science and Engineering, University of Engineering, Chandigarh University, 2017 to 2021.",
          list: [
            "Comfortable moving between code, infrastructure, and failure analysis.",
            "Bias toward measurable improvements in scalability, reliability, and onboarding clarity.",
            "Toolkit shaped around Go, Kubernetes ecosystems, cloud services, and automation.",
          ],
        },
      ],
    },
    stack: {
      eyebrow: "Stack / tools and systems",
      title: "A stack shaped by distributed systems, platform automation, and infrastructure-heavy product work.",
      summary:
        "The strongest pattern in the toolkit is not any single vendor. It is building reliable workflows around Go, Kubernetes, cloud primitives, networking, and automation.",
      panels: [
        {
          label: "What I optimize",
          title: "Recurring outcomes",
          summary:
            "The technical choices usually support a small set of engineering outcomes that show up across products and internal platforms.",
          list: [
            "Reduce manual platform friction with clearer abstractions and automation.",
            "Improve reliability under scale, especially around orchestration and traffic flows.",
            "Keep systems operable with strong debugging and rollout ergonomics.",
          ],
        },
        {
          label: "Working style",
          title: "How the stack gets applied",
          summary:
            "Most of the work lives at the boundary of application logic, control planes, and infrastructure workflows.",
          list: [
            "Use Go as the backbone for services, controllers, and internal tooling.",
            "Treat Kubernetes and GitOps as operational interfaces, not just deployment targets.",
            "Prefer composable, boring-by-default systems with clear failure modes.",
          ],
        },
      ],
    },
    connect: {
      eyebrow: "Connect / direct and low friction",
      title: "Email first, resume available, and professional profiles one click away.",
      summary:
        "This portfolio is built to make outreach straightforward. Start with email for roles, backend and platform discussions, or collaboration.",
      actions: [
        {
          label: "Compose email",
          href: "mailto:sujaykumar.dev@gmail.com",
          style: "button-primary",
        },
        {
          label: "Open resume",
          href: "/assets/resume/sujay_resume_v2.pdf",
          style: "button-ghost",
          newTab: true,
        },
      ],
      note:
        "The fastest path is direct email. Use the copy button if you want the address in your own mail client.",
      availabilityTitle: "Best fit conversations",
      availabilitySummary:
        "The strongest alignment is with roles or discussions that involve backend engineering, platforms, or distributed infrastructure.",
      availabilityList: [
        "Backend and platform engineering roles.",
        "Cloud-native systems and Kubernetes-heavy environments.",
        "Systems design, reliability, and operational tooling work.",
      ],
    },
  },
  profileLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sujaykumarsuman/",
      note: "Professional profile",
      newTab: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/sujaykumarsuman",
      note: "Code and experiments",
      newTab: true,
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/sujaykumarsuman/",
      note: "Problem solving",
      newTab: true,
    },
    {
      label: "GeeksForGeeks",
      href: "https://auth.geeksforgeeks.org/user/sujaykumarsuman/profile",
      note: "Technical profile",
      newTab: true,
    },
    {
      label: "Resume",
      href: "/assets/resume/sujay_resume_v2.pdf",
      note: "Hosted PDF copy",
      newTab: true,
    },
  ],
  highlightStats: [
    {
      value: "500+",
      label: "High severity fixes",
      detail: "Security remediation shipped in HCP Consul during a critical sunset window.",
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
      detail: "Hands-on work across storage, networking, controllers, and backend services.",
    },
  ],
  experienceTimeline: [
    {
      company: "HashiCorp",
      role: "Engineer 2",
      period: "Feb 2025 - Present",
      location: "Bengaluru, India",
      summary:
        "Working on Consul capabilities spanning enterprise reliability, traffic routing, license reporting, and customer-facing operations.",
      impact: ["500+ high-severity fixes", "900+ node clusters"],
      tech: ["Consul", "Raft", "Kubernetes", "Service Mesh", "ACLs"],
      highlights: [
        "Fixed more than 500 high-severity vulnerabilities in HCP Consul before product sunset.",
        "Delivered configurable Virtual IP support for CIDR-aware mesh gateway routing.",
        "Added subset-aware API gateway routing for finer traffic control in service router flows.",
        "Built enterprise census reporting on top of Raft-backed Consul workflows for license tracking and export.",
        "Supported HCP and self-managed enterprise customers through on-call and high-severity incidents.",
      ],
    },
    {
      company: "Infoblox",
      role: "Software Engineer 2",
      period: "Jul 2022 - Jan 2025",
      location: "Bengaluru, India",
      summary:
        "Built Kubernetes-native platform services, GitOps workflows, and networking automation for a new SaaS DDI platform.",
      impact: ["<2h cluster creation", "CRD-driven provisioning"],
      tech: ["Go", "Kubernetes", "AWS", "FluxCD", "Crossplane", "Networking"],
      highlights: [
        "Built database provisioning through Kubernetes CRDs and migrated internal services onto the unified flow.",
        "Established a FluxCD, KubeVela, and Crossplane workflow that cut cluster creation time to under two hours.",
        "Designed Go-based controllers and supporting services for SaaS DDI traffic paths spanning IPSec, VxLAN, and OVS.",
        "Built CLI tooling and documentation that shortened debugging, onboarding, and production incident response.",
      ],
    },
    {
      company: "Nokia Solutions & Networks",
      role: "Developer",
      period: "Jul 2021 - Jun 2022",
      location: "Bengaluru, India",
      summary:
        "Focused on backend service integrations, storage abstractions, and reliability-oriented API work for production services.",
      impact: ["Adopted across services", "Storage abstraction rollout"],
      tech: ["Go", "OpenAPI", "MariaDB", "ElasticSearch", "MinIO"],
      highlights: [
        "Built a pluggable storage backend package that replaced MinIO and was adopted across services.",
        "Implemented REST APIs for redundancy synchronization and protocol extensions for end-of-service notifications.",
        "Added unit, integration, and performance coverage around storage integration workflows.",
      ],
    },
  ],
  skillGroups: [
    {
      name: "Programming",
      summary: "Languages used for services, controllers, automation, and general systems work.",
      items: ["Go", "Python", "Shell", "SQL", "C++"],
    },
    {
      name: "Core Knowledge",
      summary: "The concepts that show up most often in design, debugging, and platform decisions.",
      items: ["Microservices", "Distributed Systems", "System Design", "Algorithms", "Data Structures"],
    },
    {
      name: "Cloud and Infrastructure",
      summary: "Core runtime and orchestration layers for platform-heavy product environments.",
      items: ["Kubernetes", "AWS", "Docker", "Helm", "Linux"],
    },
    {
      name: "Data and Messaging",
      summary: "Persistence, caching, and event systems used in backend and platform workflows.",
      items: ["PostgreSQL", "Redis", "DynamoDB", "Kafka"],
    },
    {
      name: "Networking and Storage",
      summary: "Systems that show up in service connectivity, traffic control, and storage integration work.",
      items: ["Consul", "IPSec", "VxLAN", "OVS", "S3", "MinIO"],
    },
    {
      name: "DevOps and Automation",
      summary: "Delivery and infrastructure automation used to reduce manual operations overhead.",
      items: ["GitHub Actions", "Jenkins", "FluxCD", "KubeVela", "Crossplane", "Terraform"],
    },
  ],
  contactCtas: [
    {
      note: "Fastest route",
      title: "Email",
      body: "Best for role discussions, collaboration, or a quick introduction.",
      label: "Compose message",
      href: "mailto:sujaykumar.dev@gmail.com",
      style: "button-primary",
    },
    {
      note: "Hosted PDF",
      title: "Resume",
      body: "Full role history, stack coverage, and impact bullets in one place.",
      label: "Review resume",
      href: "/assets/resume/sujay_resume_v2.pdf",
      style: "button-ghost",
      newTab: true,
    },
    {
      note: "Professional profile",
      title: "LinkedIn",
      body: "Useful for quick context, role validation, and recruiter workflows.",
      label: "Open LinkedIn",
      href: "https://www.linkedin.com/in/sujaykumarsuman/",
      style: "button-secondary",
      newTab: true,
    },
    {
      note: "Code signal",
      title: "GitHub",
      body: "Code, experiments, and repository history beyond the portfolio site itself.",
      label: "Open GitHub",
      href: "https://github.com/sujaykumarsuman",
      style: "button-ghost",
      newTab: true,
    },
  ],
};
