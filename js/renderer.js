/**
 * renderer.js — Pure DOM-string builder functions.
 *
 * Rules:
 *  - Every function takes data, returns an HTML string.
 *  - No side effects, no DOM access, no globals.
 *  - All user-supplied strings MUST pass through esc().
 *  - Only change this file for structural/layout changes, not content.
 */

'use strict';

/* ============================================================
   ESCAPE HELPER — always use for any data-derived string
   ============================================================ */

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   NAV
   ============================================================ */

/**
 * @param {Array<{href: string, label: string}>} navItems
 * @param {string} currentPath  — window.location.pathname
 * @returns {string} HTML
 */
function renderNav(navItems, currentPath, meta) {
  function isActive(href) {
    const norm = currentPath.replace(/\/index\.html$/, '/');
    if (href === '/') return norm === '/';
    return norm.startsWith(href);
  }

  const links = navItems.map(item => `
    <a
      href="${esc(item.href)}"
      class="nav__link${isActive(item.href) ? ' nav__link--active' : ''}"
      ${isActive(item.href) ? 'aria-current="page"' : ''}
    >${esc(item.label)}</a>
  `).join('');

  const shortName = meta && meta.shortName ? meta.shortName : 'SK';
  const domain = meta && meta.domain ? meta.domain : '';

  return `
    <nav class="nav" aria-label="Site navigation">
      <div class="nav__inner">
        <a href="/" class="nav__brand" aria-label="${esc(domain)} home">
          <span>${esc(shortName)}</span><span class="nav__brand-domain"> / ${esc(domain)}</span>
        </a>
        <div class="nav__links" role="list">
          ${links}
        </div>
      </div>
    </nav>
  `;
}

/* ============================================================
   FOOTER
   ============================================================ */

/**
 * @param {object} meta
 * @param {Array}  links
 * @param {object} footer
 * @returns {string} HTML
 */
function renderFooter(meta, links, footer) {
  const chips = links.map(link => `
    <a
      href="${esc(link.href)}"
      class="profile-chip"
      ${link.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}
    >
      ${esc(link.label)}
      <span class="profile-chip__note">${esc(link.note)}</span>
    </a>
  `).join('');

  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__heading">${esc(footer.heading)}</p>
        <p class="footer__summary">${esc(footer.summary)}</p>
        <div class="footer__links">${chips}</div>
        <div class="footer__bottom">
          <span class="footer__copy">
            &copy; ${year} ${esc(meta.name)} &middot; ${esc(meta.domain)}
          </span>
          <span class="footer__status">
            <span class="status-dot" aria-hidden="true"></span>
            ${esc(meta.status)}
          </span>
        </div>
      </div>
    </footer>
  `;
}

/* ============================================================
   STAT CARDS
   ============================================================ */

/**
 * @param {Array<{value, label, detail}>} stats
 * @returns {string} HTML
 */
function renderStats(stats) {
  const cards = stats.map(s => `
    <div class="stat-card">
      <div class="stat-card__value">${esc(s.value)}</div>
      <div class="stat-card__label">${esc(s.label)}</div>
      <div class="stat-card__detail">${esc(s.detail)}</div>
    </div>
  `).join('');

  return `<div class="stats-grid">${cards}</div>`;
}

/* ============================================================
   EXPERIENCE CARDS
   ============================================================ */

/**
 * @param {Array} experience
 * @param {object} opts  — { limit: number|null }
 * @returns {string} HTML
 */
function renderExperience(experience, opts) {
  const limit = (opts && opts.limit) ? opts.limit : experience.length;
  const jobs = experience.slice(0, limit);

  const cards = jobs.map(job => {
    const highlights = job.highlights.map(h => `
      <li class="exp-card__highlight">${esc(h)}</li>
    `).join('');

    const tech = job.tech.map(t => `
      <span class="tech-tag">${esc(t)}</span>
    `).join('');

    return `
      <article class="exp-card">
        <div class="exp-card__header">
          <div>
            <div class="exp-card__company">${esc(job.company)}</div>
            <div class="exp-card__role">${esc(job.role)}</div>
          </div>
          <div class="exp-card__meta">
            <span class="exp-card__period">${esc(job.period)}</span>
            <span class="exp-card__location">${esc(job.location)}</span>
          </div>
        </div>
        <p class="exp-card__summary">${esc(job.summary)}</p>
        <ul class="exp-card__highlights">${highlights}</ul>
        <div class="exp-card__tech">${tech}</div>
      </article>
    `;
  }).join('');

  return `<div class="experience-list">${cards}</div>`;
}

/* ============================================================
   SKILL GROUPS
   ============================================================ */

/**
 * @param {Array<{name, summary, items}>} skills
 * @returns {string} HTML
 */
function renderSkills(skills) {
  const groups = skills.map(group => {
    const items = group.items.map(item => `
      <span class="skill-tag">${esc(item)}</span>
    `).join('');

    return `
      <div class="skill-group">
        <div class="skill-group__name">${esc(group.name)}</div>
        <div class="skill-group__summary">${esc(group.summary)}</div>
        <div class="skill-group__items">${items}</div>
      </div>
    `;
  }).join('');

  return `<div class="skills-grid">${groups}</div>`;
}

/* ============================================================
   FOCUS PANEL
   ============================================================ */

/**
 * @param {string} title
 * @param {string} summary
 * @param {string[]} list
 * @returns {string} HTML
 */
function renderFocusPanel(title, summary, list) {
  const items = list.map(item => `
    <li class="focus-list__item">${esc(item)}</li>
  `).join('');

  return `
    <div class="focus-panel">
      <div class="focus-panel__title">${esc(title)}</div>
      <p class="focus-panel__summary">${esc(summary)}</p>
      <ul class="focus-list">${items}</ul>
    </div>
  `;
}

/* ============================================================
   INFO PANEL (reusable labeled panel with optional list)
   ============================================================ */

/**
 * @param {object} opts — { label, title, summary, list? }
 * @returns {string} HTML
 */
function renderInfoPanel(opts) {
  const listHtml = opts.list ? `
    <ul class="info-list">
      ${opts.list.map(item => `<li class="info-list__item">${esc(item)}</li>`).join('')}
    </ul>
  ` : '';

  return `
    <div class="info-panel">
      ${opts.label ? `<span class="info-panel__label">${esc(opts.label)}</span>` : ''}
      <div class="info-panel__title">${esc(opts.title)}</div>
      <p class="info-panel__summary">${esc(opts.summary)}</p>
      ${listHtml}
    </div>
  `;
}

/* ============================================================
   EDUCATION CARD
   ============================================================ */

/**
 * @param {object} edu — { degree, institution, period }
 * @returns {string} HTML
 */
function renderEducation(edu) {
  return `
    <div class="edu-card">
      <div class="edu-card__degree">${esc(edu.degree)}</div>
      <div class="edu-card__institution">${esc(edu.institution)}</div>
      <div class="edu-card__period">${esc(edu.period)}</div>
    </div>
  `;
}

/* ============================================================
   PROFILE LINK CHIPS
   ============================================================ */

/**
 * @param {Array<{label, href, note, newTab}>} links
 * @returns {string} HTML
 */
function renderProfileLinks(links) {
  const chips = links.map(link => `
    <a
      href="${esc(link.href)}"
      class="profile-chip"
      ${link.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}
    >
      ${esc(link.label)}
      <span class="profile-chip__note">${esc(link.note)}</span>
    </a>
  `).join('');

  return `<div class="profile-links">${chips}</div>`;
}

/* ============================================================
   BUTTON HELPERS
   ============================================================ */

/**
 * @param {Array<{label, href, style, newTab?, id?}>} ctas
 * @returns {string} HTML
 */
function renderCtas(ctas) {
  const buttons = ctas.map(cta => {
    const styleClass = `btn--${esc(cta.style)}`;
    const extra = cta.newTab ? 'target="_blank" rel="noopener noreferrer"' : '';
    const id = cta.id ? `id="${esc(cta.id)}"` : '';
    return `
      <a href="${esc(cta.href)}" class="btn ${styleClass}" ${extra} ${id}>${esc(cta.label)}</a>
    `;
  }).join('');

  return `<div class="btn-group">${buttons}</div>`;
}

/* ============================================================
   HOME PAGE
   ============================================================ */

function renderHomePage(data) {
  const h = data.home;

  return `
    <section class="hero" aria-label="Introduction">
      <div class="hero__inner">
        <span class="eyebrow">${esc(h.eyebrow)}</span>
        <h1 class="hero__headline">${esc(h.headline)}</h1>
        <p class="hero__summary">${esc(h.summary)}</p>
        ${renderCtas(h.ctas)}
      </div>
    </section>

    <section class="section" aria-label="Key metrics">
      <div class="container">
        ${renderStats(data.stats)}
      </div>
    </section>

    <section class="section section--sm" aria-label="Focus areas">
      <div class="container">
        ${renderFocusPanel(h.focusTitle, h.focusSummary, h.focusList)}
      </div>
    </section>

    <section class="section section--sm" aria-label="Recent experience">
      <div class="container">
        <span class="eyebrow">Recent work</span>
        <h2 class="section-heading">Experience highlights</h2>
        ${renderExperience(data.experience, { limit: 2 })}
        <div style="margin-top: var(--space-6);">
          <a href="/journey/" class="btn btn--ghost">View full journey</a>
        </div>
      </div>
    </section>

    <section class="section section--sm" aria-label="Tech stack">
      <div class="container">
        <span class="eyebrow">Tech stack</span>
        <h2 class="section-heading">Skills & tools</h2>
        ${renderSkills(data.skills.slice(0, 3))}
        <div style="margin-top: var(--space-6);">
          <a href="/stack/" class="btn btn--ghost">View full stack</a>
        </div>
      </div>
    </section>
  `;
}

/* ============================================================
   JOURNEY PAGE
   ============================================================ */

function renderJourneyPage(data) {
  const j = data.journey;

  return `
    <header class="page-header" aria-label="Page header">
      <div class="page-header__inner">
        <span class="eyebrow">${esc(j.eyebrow)}</span>
        <h1 class="section-heading">${esc(j.headline)}</h1>
        <p class="section-summary">${esc(j.summary)}</p>
      </div>
    </header>

    <section class="section" aria-label="Work experience">
      <div class="container">
        <span class="eyebrow">Work</span>
        <h2 class="section-heading">Experience</h2>
        ${renderExperience(data.experience)}
      </div>
    </section>

    <section class="section section--sm" aria-label="Education and profile">
      <div class="container">
        <div class="panel-grid">
          ${renderInfoPanel({
            label: 'Operating profile',
            title: j.profileTitle,
            summary: j.profileSummary,
            list: j.profileList
          })}
          <div>
            <span class="eyebrow" style="margin-bottom: var(--space-4);">Education</span>
            ${renderEducation(data.education)}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ============================================================
   STACK PAGE
   ============================================================ */

function renderStackPage(data) {
  const s = data.stack;

  return `
    <header class="page-header" aria-label="Page header">
      <div class="page-header__inner">
        <span class="eyebrow">${esc(s.eyebrow)}</span>
        <h1 class="section-heading">${esc(s.headline)}</h1>
        <p class="section-summary">${esc(s.summary)}</p>
      </div>
    </header>

    <section class="section" aria-label="Skills and tools">
      <div class="container">
        ${renderSkills(data.skills)}
      </div>
    </section>

    <section class="section section--sm" aria-label="What I optimize for">
      <div class="container">
        ${renderInfoPanel({
          label: 'Approach',
          title: s.optimizeTitle,
          summary: s.summary,
          list: s.optimizeList
        })}
      </div>
    </section>
  `;
}

/* ============================================================
   CONNECT PAGE
   ============================================================ */

function renderConnectPage(data) {
  const c = data.connect;
  const meta = data.meta;

  const emailHref = `mailto:${esc(meta.email)}`;

  return `
    <header class="page-header" aria-label="Page header">
      <div class="page-header__inner">
        <span class="eyebrow">${esc(c.eyebrow)}</span>
        <h1 class="section-heading">${esc(c.headline)}</h1>
        <p class="section-summary">${esc(c.summary)}</p>
      </div>
    </header>

    <section class="section" aria-label="Contact options">
      <div class="container">
        <div class="connect-grid">
          <div class="contact-card">
            <span class="contact-card__note">Fastest route</span>
            <div class="contact-card__title">Email</div>
            <p class="contact-card__body">Best for role discussions, collaboration, or a quick introduction.</p>
            <div class="btn-group" style="margin-top: auto;">
              <a href="${emailHref}" class="btn btn--primary">Compose email</a>
              <button
                class="btn btn--ghost btn--copy"
                data-copy="${esc(meta.email)}"
                aria-label="Copy email address"
              >Copy address</button>
            </div>
          </div>

          <div class="contact-card">
            <span class="contact-card__note">Hosted PDF</span>
            <div class="contact-card__title">Resume</div>
            <p class="contact-card__body">Full role history, stack coverage, and impact bullets in one place.</p>
            <div class="btn-group" style="margin-top: auto;">
              <a href="${esc(meta.resumeUrl)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Open resume</a>
            </div>
          </div>
        </div>

        <div style="margin-top: var(--space-8);">
          <p class="text-muted text-sm" style="margin-bottom: var(--space-4);">${esc(c.note)}</p>
        </div>
      </div>
    </section>

    <section class="section section--sm" aria-label="Professional links">
      <div class="container">
        <span class="eyebrow">Profiles</span>
        <h2 class="section-heading" style="margin-bottom: var(--space-6);">Professional links</h2>
        ${renderProfileLinks(data.links)}
      </div>
    </section>

    <section class="section section--sm" aria-label="Best fit">
      <div class="container">
        ${renderInfoPanel({
          label: c.bestFitTitle,
          title: c.bestFitTitle,
          summary: 'The strongest alignment is with roles or discussions involving:',
          list: c.bestFitList
        })}
      </div>
    </section>
  `;
}

/* ============================================================
   404 PAGE
   ============================================================ */

function renderNotFoundPage() {
  return `
    <div class="error-page">
      <div class="error-page__code" aria-hidden="true">404</div>
      <h1 class="error-page__title">Page not found</h1>
      <p class="error-page__summary">This path doesn't exist. Head back to the main portfolio.</p>
      <a href="/" class="btn btn--primary">Go home</a>
    </div>
  `;
}
