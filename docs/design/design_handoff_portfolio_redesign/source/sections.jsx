// Section components for portfolio.

const D = () => window.PORTFOLIO_DATA;

// ---------- HERO ----------
function Hero() {
  const data = D();
  return (
    <section id="hero" className="section hero" data-section="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="display-xl">
            <span className="display-line">{data.meta.name.split(' ')[0]}</span>
            <span className="display-line italic">{data.meta.name.split(' ').slice(1).join(' ')}.</span>
          </h1>
          <p className="lead">{data.meta.tagline}</p>
          <div className="hero-meta">
            <span className="meta-item"><span className="meta-label">Role</span> {data.meta.role}</span>
            <span className="meta-divider" />
            <span className="meta-item"><span className="meta-label">Loc</span> {data.meta.location}</span>
          </div>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">See projects <span className="btn-arrow">→</span></a>
            <a className="btn btn-ghost" href={`mailto:${data.meta.email}`}>Get in touch</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="card-dot" /><span className="card-dot dot-2" /><span className="card-dot dot-3" />
              <span className="card-title">~/sujay</span>
            </div>
            <div className="hero-card-body">
              <pre className="terminal-text">
{`> whoami
${data.meta.handle}

> stack
go · kubernetes · consul
service mesh · raft · CRDs

> recently
shipped enterprise reliability
to HCP & self-managed Consul

> currently
building careerdock & verdox_`}
              </pre>
            </div>
          </div>
          <div className="hero-stats">
            {data.stats.map((s, i) => (
              <div key={i} className="stat">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- ABOUT ----------
function About() {
  const data = D();
  return (
    <section id="about" className="section about" data-section="about">
      <SectionHeader index="01" title="About" subtitle="A short version" />
      <div className="about-grid">
        <div className="about-bio">
          {data.about.map((p, i) => <p key={i} className="bio-para">{p}</p>)}
        </div>
        <aside className="about-side">
          <div className="side-card">
            <h4 className="side-title">At a glance</h4>
            <ul className="side-list">
              <li><span>Years shipping</span><b>~5</b></li>
              <li><span>Primary stack</span><b>Go · K8s</b></li>
              <li><span>Cares about</span><b>operability</b></li>
              <li><span>Off-hours</span><b>side projects</b></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ---------- SKILLS ----------
function Skills() {
  const data = D();
  return (
    <section id="skills" className="section skills" data-section="skills">
      <SectionHeader index="02" title="Stack" subtitle="What I reach for" />
      <div className="skills-grid">
        {data.skills.map((cat, i) => (
          <div key={i} className="skill-card" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="skill-num">0{i + 1}</div>
            <h4 className="skill-name">{cat.name}</h4>
            <div className="skill-chips">
              {cat.items.map((item, j) => <span key={j} className="chip">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- EXPERIENCE ----------
function Experience() {
  const data = D();
  // Default-open the most recent non-upcoming role (HashiCorp).
  const firstNonUpcoming = data.experience.findIndex(j => !j.upcoming);
  const [open, setOpen] = React.useState(firstNonUpcoming >= 0 ? firstNonUpcoming : 0);
  return (
    <section id="experience" className="section experience" data-section="experience">
      <SectionHeader index="03" title="Experience" subtitle="The professional record" />
      <div className="exp-list">
        {data.experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <article key={i} className={`exp-item ${isOpen ? 'open' : ''} ${job.upcoming ? 'upcoming' : ''}`}>
              <button className="exp-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                <div className="exp-head-l">
                  <div className="exp-co">
                    {job.company}
                    {job.upcoming && <span className="exp-badge">Upcoming</span>}
                  </div>
                  <div className="exp-role">{job.role}</div>
                </div>
                <div className="exp-head-r">
                  <div className="exp-period">{job.period}</div>
                  <div className={`exp-toggle ${isOpen ? 'open' : ''}`}>+</div>
                </div>
              </button>
              <div className={`exp-body ${isOpen ? 'open' : ''}`}>
                <p className="exp-summary">{job.summary}</p>
                {job.highlights.length > 0 && (
                  <ul className="exp-highlights">
                    {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                <div className="exp-tech">
                  {job.tech.map((t, j) => <span key={j} className="chip chip-sm">{t}</span>)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ---------- PROJECTS ----------
function Projects() {
  const data = D();
  return (
    <section id="projects" className="section projects" data-section="projects">
      <SectionHeader index="04" title="Projects" subtitle="Things I'm building" />
      <div className="proj-grid">
        {data.projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`proj-card featured accent-${project.accent}`}>
      <div className="proj-text">
        <div className="proj-meta">
          <span className={`status status-${project.status.toLowerCase().replace(/\s/g, '-')}`}>
            <span className="status-dot" />{project.status}
          </span>
          <span className="proj-year">{project.year}</span>
          {project.builtWithClaude && (
            <span className="claude-badge" title="Built with Claude Code">
              <span className="claude-spark">✦</span>
              Built with Claude Code
            </span>
          )}
        </div>
        <h3 className="proj-name">{project.name}</h3>
        <p className="proj-tagline">{project.tagline}</p>
        <p className="proj-desc">{project.description}</p>
        {project.features.length > 0 && (
          <ul className="proj-features">
            {project.features.map((f, i) => (
              <li key={i}><span className="feat-bullet" />{f}</li>
            ))}
          </ul>
        )}
        {project.pending && (
          <div className="proj-pending">
            <span className="pending-label">{project.pendingLabel || 'Pending'}</span>
            <p className="proj-pending-summary">{project.pending}</p>
            {project.pendingItems && project.pendingItems.length > 0 && (
              <ul className="proj-pending-list">
                {project.pendingItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="proj-tech">
          {project.tech.map((t, i) => <span key={i} className="chip chip-sm">{t}</span>)}
        </div>
        <div className="proj-actions">
          {project.repo && <a href={project.repo} className="proj-link" target="_blank" rel="noreferrer">Source <span>→</span></a>}
          {project.live && <a href={project.live} className="proj-link" target="_blank" rel="noreferrer">Live <span>→</span></a>}
        </div>
      </div>
      <div className="proj-screenshot">
        {project.mockType === 'careerdock' && <CareerDockMock />}
        {project.mockType === 'verdox' && <VerdoxMock />}
      </div>
    </article>
  );
}

// CareerDock product mock
function CareerDockMock() {
  return (
    <div className="cd-mock">
      <div className="cd-chrome">
        <span className="cd-dot" /><span className="cd-dot" /><span className="cd-dot" />
        <div className="cd-url">careerdock.in / dashboard</div>
      </div>
      <div className="cd-body">
        <div className="cd-side">
          <div className="cd-logo">CD</div>
          <div className="cd-nav-item active">Companies</div>
          <div className="cd-nav-item">Tracker</div>
          <div className="cd-nav-item">Resume</div>
          <div className="cd-nav-item">ATS</div>
        </div>
        <div className="cd-main">
          <div className="cd-search">
            <span className="cd-search-icon">⌕</span>
            <span className="cd-search-text">Filter 200+ companies</span>
          </div>
          <div className="cd-rows">
            {[
              { n: 'Razorpay', s: 'Hiring', t: 'Go · React', m: '92' },
              { n: 'Zerodha', s: 'Hiring', t: 'Python', m: '87' },
              { n: 'CRED', s: 'Open', t: 'Kotlin · Go', m: '81' },
              { n: 'PhonePe', s: 'Hiring', t: 'Java · Go', m: '79' },
            ].map((r, i) => (
              <div key={i} className="cd-row" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="cd-co">{r.n}</div>
                <div className="cd-tag">{r.s}</div>
                <div className="cd-tech">{r.t}</div>
                <div className="cd-score">
                  <div className="cd-bar"><div className="cd-bar-fill" style={{ width: `${r.m}%` }} /></div>
                  <span>{r.m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Verdox product mock — test orchestration dashboard
function VerdoxMock() {
  return (
    <div className="cd-mock vd-mock">
      <div className="cd-chrome">
        <span className="cd-dot" /><span className="cd-dot" /><span className="cd-dot" />
        <div className="cd-url">verdox.local / runs</div>
      </div>
      <div className="cd-body">
        <div className="cd-side">
          <div className="cd-logo vd-logo">VX</div>
          <div className="cd-nav-item">Repos</div>
          <div className="cd-nav-item">Suites</div>
          <div className="cd-nav-item active">Runs</div>
          <div className="cd-nav-item">Teams</div>
        </div>
        <div className="cd-main">
          <div className="vd-header">
            <div className="vd-title">Test Runs <span className="vd-count">14 active</span></div>
            <div className="vd-live"><span className="vd-pulse" /> live · SSE</div>
          </div>
          <div className="cd-rows">
            {[
              { repo: 'auth-svc', branch: 'main', s: 'pass', d: '2m 14s', g: '12/12' },
              { repo: 'billing-api', branch: 'feat/retry', s: 'run', d: '0m 42s', g: '4/9' },
              { repo: 'gateway', branch: 'main', s: 'pass', d: '1m 51s', g: '8/8' },
              { repo: 'platform-cli', branch: 'fix/race', s: 'fail', d: '3m 02s', g: '7/9' },
            ].map((r, i) => (
              <div key={i} className="cd-row vd-row" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="cd-co vd-repo">{r.repo}</div>
                <div className="vd-branch">{r.branch}</div>
                <div className={`vd-status vd-${r.s}`}>
                  <span className="vd-status-dot" />
                  {r.s === 'pass' ? 'Passed' : r.s === 'run' ? 'Running' : 'Failed'}
                </div>
                <div className="vd-groups">{r.g}</div>
                <div className="vd-dur">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- RECOMMENDATIONS ----------
function Recommendations() {
  const data = D();
  const [active, setActive] = React.useState(0);
  const total = data.recommendations.length;
  return (
    <section id="recommendations" className="section recommendations" data-section="recommendations">
      <SectionHeader index="05" title="Recommendations" subtitle="What people I've worked with say" />
      <div className="recs-stage">
        <div className="recs-track">
          {data.recommendations.map((r, i) => (
            <article
              key={i}
              className={`rec-slide ${i === active ? 'active' : ''}`}
              aria-hidden={i !== active}
            >
              <div className="rec-quote">"</div>
              <p className="rec-text">{r.text}</p>
              <div className="rec-foot">
                <div className="rec-name-row">
                  <div className="rec-avatar">{r.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                  <div>
                    <div className="rec-name">{r.name}</div>
                    <div className="rec-title">{r.company}</div>
                  </div>
                </div>
                <div className="rec-rel">
                  <span className="rec-rel-pill">{r.relationship}</span>
                  <span className="rec-date">· {r.date}</span>
                  {r.linkedin && (
                    <a className="rec-linkedin" href={r.linkedin} target="_blank" rel="noreferrer" aria-label={`${r.name} on LinkedIn`}>
                      <span>in</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="recs-controls">
          <button
            className="recs-arrow"
            onClick={() => setActive((active - 1 + total) % total)}
            aria-label="Previous"
          >←</button>
          <div className="recs-dots">
            {data.recommendations.map((r, i) => (
              <button
                key={i}
                className={`recs-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Recommendation ${i + 1}`}
              >
                <span className="recs-dot-name">{r.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <button
            className="recs-arrow"
            onClick={() => setActive((active + 1) % total)}
            aria-label="Next"
          >→</button>
        </div>
      </div>
      <div className="recs-foot">
        <a href={data.meta.recommendationsUrl} target="_blank" rel="noreferrer" className="recs-link">
          See all on LinkedIn <span>→</span>
        </a>
      </div>
    </section>
  );
}

// ---------- WRITING ----------
function Writing() {
  const data = D();
  return (
    <section id="writing" className="section writing" data-section="writing">
      <SectionHeader index="06" title="Writing" subtitle="Notes from the trenches" />
      <div className="writing-list">
        {data.writing.map((w, i) => (
          <a key={i} href={w.href} className="writing-item" target="_blank" rel="noreferrer">
            <div className="writing-date">{w.date}</div>
            <div className="writing-body">
              <h4 className="writing-title">{w.title}</h4>
              <p className="writing-summary">{w.summary}</p>
            </div>
            <div className="writing-arrow">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- RESUME ----------
function Resume() {
  const data = D();
  return (
    <section id="resume" className="section resume" data-section="resume">
      <div className="resume-card">
        <div className="resume-l">
          <div className="resume-eyebrow">Resume</div>
          <h3 className="resume-title">The full record, on a page.</h3>
          <p className="resume-sub">PDF · last updated recently · prints cleanly.</p>
        </div>
        <div className="resume-r">
          <a className="btn btn-primary" href={data.meta.resumeUrl} target="_blank" rel="noreferrer">
            View resume <span className="btn-arrow">↗</span>
          </a>
          <a className="btn btn-ghost" href={data.meta.githubUrl} target="_blank" rel="noreferrer">
            GitHub profile
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  const data = D();
  const [copied, setCopied] = React.useState(false);
  function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard.writeText(data.meta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <section id="contact" className="section contact" data-section="contact">
      <SectionHeader index="07" title="Connect" subtitle="The end of the page, the start of a conversation" />
      <div className="contact-card">
        <h3 className="contact-h">Let's talk.</h3>
        <p className="contact-p">
          Open to roles, backend & platform discussions, or collaboration on something interesting.
          Email is fastest.
        </p>
        <div className="contact-email-row">
          <span className="contact-email">{data.meta.email}</span>
          <a
            href={`mailto:${data.meta.email}`}
            className="contact-icon-btn"
            aria-label="Send email"
            title="Send email"
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
              <path d="M3 5.5 L10 11 L17 5.5" />
            </svg>
          </a>
          <button
            className="contact-icon-btn"
            onClick={copyEmail}
            aria-label={copied ? 'Email copied' : 'Copy email'}
            title={copied ? 'Copied!' : 'Copy email'}
          >
            {copied ? (
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10.5 L8.5 15 L16 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="6.5" y="6.5" width="10" height="10" rx="1.5" />
                <path d="M4 13 L4 4.5 A1.5 1.5 0 0 1 5.5 3 L13 3" />
              </svg>
            )}
          </button>
        </div>
        <div className="contact-links">
          <a href={data.meta.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          <span>·</span>
          <a href={data.meta.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <span>·</span>
          <a href={data.meta.leetcodeUrl} target="_blank" rel="noreferrer">LeetCode</a>
        </div>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {data.meta.name}</span>
        <span>Designed and built with care.</span>
      </footer>
    </section>
  );
}

// ---------- SECTION HEADER ----------
function SectionHeader({ index, title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-index">{index}</div>
      <div className="section-title-wrap">
        <h2 className="section-title">{title}</h2>
        <div className="section-subtitle">{subtitle}</div>
      </div>
      <div className="section-rule" />
    </div>
  );
}

// ---------- NAVBAR ----------
function NavBar() {
  const data = D();
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('hero');

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'recommendations', 'contact'];
      const y = window.scrollY + 120;
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const cur = document.documentElement.dataset.theme || 'light';
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  };

  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Stack' },
    { id: 'experience', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'recommendations', label: 'Praise' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">
        <span className="brand-mark-old">
          <span className="brand-dot" />
          <span className="brand-dot" />
          <span className="brand-dot" />
          <span className="brand-dot" />
        </span>
        <span>{data.meta.name.split(' ')[0].toLowerCase()}</span>
      </a>
      <div className="nav-links">
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>{l.label}</a>
        ))}
      </div>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        <span className="theme-icon-light toggle-icon-light">☼</span>
        <span className="theme-icon-dark toggle-icon-dark">☾</span>
      </button>
    </nav>
  );
}

Object.assign(window, {
  NavBar, Hero, About, Skills, Experience, Projects, Recommendations, Writing, Resume, Contact,
});
