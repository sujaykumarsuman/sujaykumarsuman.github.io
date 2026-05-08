// Section components for portfolio.
// Every visible string is sourced from data.json (window.PORTFOLIO_DATA),
// loaded by app.jsx before mount.

const D = () => window.PORTFOLIO_DATA;

// ---------- HERO ----------
function Hero() {
  const data = D();
  const meta = data.meta;
  const hero = data.hero;
  const ctaHref = (cta) => cta.action === 'email' ? `mailto:${meta.email}` : cta.href;
  return (
    <section id="hero" className="section hero" data-section="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="display-xl">
            <span className="display-line">{meta.firstName}</span>
            <span className="display-line italic">{meta.lastName}.</span>
          </h1>
          <p className="lead">{meta.tagline}</p>
          <div className="hero-meta">
            <span className="meta-item"><span className="meta-label">{hero.metaLabels.role}</span> {meta.role}</span>
            <span className="meta-divider" />
            <span className="meta-item"><span className="meta-label">{hero.metaLabels.location}</span> {meta.location}</span>
          </div>
          <div className="hero-cta">
            {hero.ctas.map((cta, i) => (
              <a
                key={i}
                className={`btn ${cta.style === 'primary' ? 'btn-primary' : 'btn-ghost'}`}
                href={ctaHref(cta)}
              >
                {cta.label}{cta.arrow && <> <span className="btn-arrow">→</span></>}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="card-dot" /><span className="card-dot dot-2" /><span className="card-dot dot-3" />
              <span className="card-title">{hero.terminal.title}</span>
            </div>
            <div className="hero-card-body">
              <pre className="terminal-text">{hero.terminal.lines.join('\n')}</pre>
            </div>
          </div>
          <div className="hero-stats">
            {hero.stats.map((s, i) => (
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
  const about = data.about;
  return (
    <section id="about" className="section about" data-section="about">
      <SectionHeader {...about.header} />
      <div className="about-grid">
        <div className="about-bio">
          {about.paragraphs.map((p, i) => <p key={i} className="bio-para">{p}</p>)}
        </div>
        <aside className="about-side">
          <div className="side-card">
            <h4 className="side-title">{about.atGlance.title}</h4>
            <ul className="side-list">
              {about.atGlance.items.map((item, i) => (
                <li key={i}><span>{item.label}</span><b>{item.value}</b></li>
              ))}
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
  const skills = data.skills;
  return (
    <section id="skills" className="section skills" data-section="skills">
      <SectionHeader {...skills.header} />
      <div className="skills-grid">
        {skills.groups.map((cat, i) => (
          <div key={i} className="skill-card" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="skill-num">{String(i + 1).padStart(2, '0')}</div>
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
  const experience = data.experience;
  const firstNonUpcoming = experience.items.findIndex(j => !j.upcoming);
  const [open, setOpen] = React.useState(firstNonUpcoming >= 0 ? firstNonUpcoming : 0);
  return (
    <section id="experience" className="section experience" data-section="experience">
      <SectionHeader {...experience.header} />
      <div className="exp-list">
        {experience.items.map((job, i) => {
          const isOpen = open === i;
          return (
            <article key={i} className={`exp-item ${isOpen ? 'open' : ''} ${job.upcoming ? 'upcoming' : ''}`}>
              <button className="exp-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                <div className="exp-head-l">
                  <div className="exp-co">
                    {job.company}
                    {job.upcoming && <span className="exp-badge">{experience.upcomingBadge}</span>}
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
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="exp-highlights">
                    {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                {job.tech && job.tech.length > 0 && (
                  <div className="exp-tech">
                    {job.tech.map((t, j) => <span key={j} className="chip chip-sm">{t}</span>)}
                  </div>
                )}
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
  const projects = data.projects;
  return (
    <section id="projects" className="section projects" data-section="projects">
      <SectionHeader {...projects.header} />
      <div className="proj-grid">
        {projects.items.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            claudeBadge={projects.claudeBadge}
            linkLabels={projects.linkLabels}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, claudeBadge, linkLabels }) {
  return (
    <article className={`proj-card featured accent-${project.accent}`}>
      <div className="proj-text">
        <div className="proj-meta">
          <span className={`status status-${project.status.toLowerCase().replace(/\s/g, '-')}`}>
            <span className="status-dot" />{project.status}
          </span>
          <span className="proj-year">{project.year}</span>
          {project.builtWithClaude && (
            <span className="claude-badge" title={claudeBadge}>
              <span className="claude-spark">✦</span>
              {claudeBadge}
            </span>
          )}
        </div>
        <h3 className="proj-name">{project.name}</h3>
        <p className="proj-tagline">{project.tagline}</p>
        <p className="proj-desc">{project.description}</p>
        {project.features && project.features.length > 0 && (
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
        {project.tech && project.tech.length > 0 && (
          <div className="proj-tech">
            {project.tech.map((t, i) => <span key={i} className="chip chip-sm">{t}</span>)}
          </div>
        )}
        <div className="proj-actions">
          {project.repo && <a href={project.repo} className="proj-link" target="_blank" rel="noreferrer">{linkLabels.source} <span>→</span></a>}
          {project.live && <a href={project.live} className="proj-link" target="_blank" rel="noreferrer">{linkLabels.live} <span>→</span></a>}
        </div>
      </div>
      <div className="proj-screenshot">
        <ProjectMock mock={project.mock} />
      </div>
    </article>
  );
}

function ProjectMock({ mock }) {
  if (!mock) return null;
  if (mock.type === 'careerdock') return <CareerDockMock mock={mock} />;
  if (mock.type === 'verdox') return <VerdoxMock mock={mock} />;
  return null;
}

function CareerDockMock({ mock }) {
  return (
    <div className="cd-mock">
      <div className="cd-chrome">
        <span className="cd-dot" /><span className="cd-dot" /><span className="cd-dot" />
        <div className="cd-url">{mock.url}</div>
      </div>
      <div className="cd-body">
        <div className="cd-side">
          <div className="cd-logo">{mock.logo}</div>
          {mock.navItems.map((label, i) => (
            <div key={i} className={`cd-nav-item ${label === mock.activeNav ? 'active' : ''}`}>{label}</div>
          ))}
        </div>
        <div className="cd-main">
          <div className="cd-search">
            <span className="cd-search-icon">⌕</span>
            <span className="cd-search-text">{mock.searchPlaceholder}</span>
          </div>
          <div className="cd-rows">
            {mock.rows.map((r, i) => (
              <div key={i} className="cd-row" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="cd-co">{r.name}</div>
                <div className="cd-tag">{r.status}</div>
                <div className="cd-tech">{r.tech}</div>
                <div className="cd-score">
                  <div className="cd-bar"><div className="cd-bar-fill" style={{ width: `${r.score}%` }} /></div>
                  <span>{r.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VerdoxMock({ mock }) {
  return (
    <div className="cd-mock vd-mock">
      <div className="cd-chrome">
        <span className="cd-dot" /><span className="cd-dot" /><span className="cd-dot" />
        <div className="cd-url">{mock.url}</div>
      </div>
      <div className="cd-body">
        <div className="cd-side">
          <div className="cd-logo vd-logo">{mock.logo}</div>
          {mock.navItems.map((label, i) => (
            <div key={i} className={`cd-nav-item ${label === mock.activeNav ? 'active' : ''}`}>{label}</div>
          ))}
        </div>
        <div className="cd-main">
          <div className="vd-header">
            <div className="vd-title">{mock.title} <span className="vd-count">{mock.count}</span></div>
            <div className="vd-live"><span className="vd-pulse" /> {mock.live}</div>
          </div>
          <div className="cd-rows">
            {mock.rows.map((r, i) => (
              <div key={i} className="cd-row vd-row" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="cd-co vd-repo">{r.repo}</div>
                <div className="vd-branch">{r.branch}</div>
                <div className={`vd-status vd-${r.status}`}>
                  <span className="vd-status-dot" />
                  {mock.statusLabels[r.status]}
                </div>
                <div className="vd-groups">{r.groups}</div>
                <div className="vd-dur">{r.duration}</div>
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
  const recs = data.recommendations;
  const [active, setActive] = React.useState(0);
  const total = recs.items.length;
  return (
    <section id="recommendations" className="section recommendations" data-section="recommendations">
      <SectionHeader {...recs.header} />
      <div className="recs-stage">
        <div className="recs-track">
          {recs.items.map((r, i) => (
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
                      <span>{recs.linkedinIconLabel}</span>
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
            aria-label={recs.navAriaLabels.previous}
          >←</button>
          <div className="recs-dots">
            {recs.items.map((r, i) => (
              <button
                key={i}
                className={`recs-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`${recs.header.title} ${i + 1}`}
              >
                <span className="recs-dot-name">{r.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <button
            className="recs-arrow"
            onClick={() => setActive((active + 1) % total)}
            aria-label={recs.navAriaLabels.next}
          >→</button>
        </div>
      </div>
      <div className="recs-foot">
        <a href={data.meta.recommendationsUrl} target="_blank" rel="noreferrer" className="recs-link">
          {recs.seeAllLabel} <span>→</span>
        </a>
      </div>
    </section>
  );
}

// ---------- WRITING ----------
function Writing() {
  const data = D();
  const writing = data.writing;
  return (
    <section id="writing" className="section writing" data-section="writing">
      <SectionHeader {...writing.header} />
      <div className="writing-list">
        {writing.items.map((w, i) => (
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
  const resume = data.resume;
  return (
    <section id="resume" className="section resume" data-section="resume">
      <div className="resume-card">
        <div className="resume-l">
          <div className="resume-eyebrow">{resume.eyebrow}</div>
          <h3 className="resume-title">{resume.title}</h3>
          <p className="resume-sub">{resume.subtitle}</p>
        </div>
        <div className="resume-r">
          <a className="btn btn-primary" href={data.meta.resumeUrl} target="_blank" rel="noreferrer">
            {resume.primaryCta} <span className="btn-arrow">↗</span>
          </a>
          <a className="btn btn-ghost" href={data.meta.githubUrl} target="_blank" rel="noreferrer">
            {resume.ghostCta}
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  const data = D();
  const contact = data.contact;
  const meta = data.meta;
  const footer = data.footer;
  const [copied, setCopied] = React.useState(false);
  function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard.writeText(meta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <section id="contact" className="section contact" data-section="contact">
      <SectionHeader {...contact.header} />
      <div className="contact-card">
        <h3 className="contact-h">{contact.headline}</h3>
        <p className="contact-p">{contact.body}</p>
        <div className="contact-email-row">
          <span className="contact-email">{meta.email}</span>
          <a
            href={`mailto:${meta.email}`}
            className="contact-icon-btn"
            aria-label={contact.labels.sendEmail}
            title={contact.labels.sendEmail}
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
              <path d="M3 5.5 L10 11 L17 5.5" />
            </svg>
          </a>
          <button
            className="contact-icon-btn"
            onClick={copyEmail}
            aria-label={copied ? contact.labels.emailCopied : contact.labels.copyEmail}
            title={copied ? contact.labels.copied : contact.labels.copyEmail}
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
          {contact.socials.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>·</span>}
              <a href={meta[s.metaKey]} target="_blank" rel="noreferrer">{s.label}</a>
            </React.Fragment>
          ))}
        </div>
      </div>
      <footer className="footer">
        <span>{footer.leftPrefix} {new Date().getFullYear()} {meta.name}</span>
        <span>{footer.rightText}</span>
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
  const nav = data.nav;
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('hero');

  React.useEffect(() => {
    const sectionIds = ['hero', ...nav.links.map(l => l.id)];
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const y = window.scrollY + 120;
      let current = 'hero';
      for (const id of sectionIds) {
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
    const cur = document.documentElement.dataset.theme || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">
        <span className="brand-mark-old">
          <span className="brand-dot" />
          <span className="brand-dot" />
          <span className="brand-dot" />
          <span className="brand-dot" />
        </span>
        <span>{data.meta.brand}</span>
      </a>
      <div className="nav-links">
        {nav.links.map(l => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>{l.label}</a>
        ))}
      </div>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={nav.themeToggleAriaLabel}>
        <span className="theme-icon-light toggle-icon-light">☼</span>
        <span className="theme-icon-dark toggle-icon-dark">☾</span>
      </button>
    </nav>
  );
}

Object.assign(window, {
  NavBar, Hero, About, Skills, Experience, Projects, Recommendations, Writing, Resume, Contact,
});
