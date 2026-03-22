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
   ESCAPE HELPER
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
   SVG ICONS (inline — no external requests)
   ============================================================ */

const ICONS = {
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  leetcode: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>`,
  external: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>`,
};

/* ============================================================
   LEFT PANEL
   ============================================================ */

function renderLeftPanel(data) {
  const navItems = data.nav.map(item => `
    <a
      href="${esc(item.href)}"
      class="left-nav__item"
      data-nav-item="${esc(item.href.replace('#', ''))}"
    >
      <span class="left-nav__indicator" aria-hidden="true"></span>
      ${esc(item.label)}
    </a>
  `).join('');

  const linkedinHref = (data.links.find(l => l.label === 'LinkedIn') || {}).href || '#';
  const leetcodeHref = (data.links.find(l => l.label === 'LeetCode') || {}).href || '#';

  return `
    <aside class="left-panel" aria-label="Site information">
      <div class="left-intro">
        <h1 class="left-name">${esc(data.meta.name)}</h1>
        <h2 class="left-role">${esc(data.meta.role)}</h2>
        <p class="left-tagline">${esc(data.home.summary)}</p>
        <nav class="left-nav" aria-label="Page sections">
          ${navItems}
        </nav>
      </div>
      <div class="left-socials">
        <a href="${esc(data.meta.githubUrl)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          ${ICONS.github}
        </a>
        <a href="${esc(linkedinHref)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          ${ICONS.linkedin}
        </a>
        <a href="${esc(leetcodeHref)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
          ${ICONS.leetcode}
        </a>
      </div>
    </aside>
  `;
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */

function renderAboutSection(data) {
  const bio = data.about.bio.map(p => `<p>${esc(p)}</p>`).join('');

  const stats = data.stats.map(s => `
    <div class="about-stat">
      <div class="about-stat__value">${esc(s.value)}</div>
      <div class="about-stat__label">${esc(s.label)}</div>
    </div>
  `).join('');

  return `
    <section id="about" class="section" aria-label="About">
      <div class="section-label" aria-hidden="true">About</div>
      <div class="about-bio">${bio}</div>
      <div class="about-stats">${stats}</div>
    </section>
  `;
}

/* ============================================================
   EXPERIENCE SECTION
   ============================================================ */

function renderExperienceSection(data) {
  const companyLinks = {
    'HashiCorp': 'https://www.hashicorp.com',
    'Infoblox': 'https://www.infoblox.com',
    'Nokia Solutions & Networks': 'https://www.nokia.com',
  };

  const items = data.experience.map(job => {
    const highlights = job.highlights.map(h => `
      <li class="exp-item__highlight">${esc(h)}</li>
    `).join('');

    const tags = job.tech.map(t => `
      <span class="tag">${esc(t)}</span>
    `).join('');

    const companyUrl = companyLinks[job.company] || '#';

    return `
      <div class="exp-item">
        <div class="exp-item__period">${esc(job.period)}</div>
        <div class="exp-item__body">
          <div class="exp-item__header">
            <span class="exp-item__role">${esc(job.role)}</span>
            <span aria-hidden="true">·</span>
            <a
              href="${esc(companyUrl)}"
              class="exp-item__company-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="exp-item__company">${esc(job.company)}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;flex-shrink:0" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="exp-item__summary">${esc(job.summary)}</p>
          <ul class="exp-item__highlights">${highlights}</ul>
          <div class="exp-item__tags">${tags}</div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section id="experience" class="section" aria-label="Experience">
      <div class="section-label" aria-hidden="true">Experience</div>
      <div class="exp-list">${items}</div>
      <a
        href="${esc(data.meta.resumeUrl)}"
        class="resume-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View full resume (opens in new tab)"
      >View Full Resume</a>
    </section>
  `;
}

/* ============================================================
   STACK SECTION
   ============================================================ */

function renderStackSection(data) {
  const groups = data.skills.map(group => {
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

  return `
    <section id="stack" class="section" aria-label="Tech stack">
      <div class="section-label" aria-hidden="true">Stack</div>
      <div class="skills-grid">${groups}</div>
    </section>
  `;
}

/* ============================================================
   CONNECT SECTION
   ============================================================ */

function renderConnectSection(data) {
  const c = data.connect;
  const emailHref = `mailto:${esc(data.meta.email)}`;

  const links = data.links.map(link => `
    <a
      href="${esc(link.href)}"
      class="profile-chip"
      ${link.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}
    >
      ${esc(link.label)}
    </a>
  `).join('');

  return `
    <section id="connect" class="section" aria-label="Connect">
      <div class="section-label" aria-hidden="true">Connect</div>
      <div class="connect-body">
        <h2 class="connect-heading">${esc(c.headline)}</h2>
        <p class="connect-summary">${esc(c.summary)}</p>
        <a href="${emailHref}" class="connect-cta">Say hello</a>
        <div class="connect-links">${links}</div>
      </div>
    </section>
  `;
}

/* ============================================================
   FOOTER
   ============================================================ */

function renderFooter(data) {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer" aria-label="Site footer">
      <p class="site-footer__text">
        Designed &amp; built by
        <a href="${esc(data.meta.githubUrl)}" target="_blank" rel="noopener noreferrer">${esc(data.meta.name)}</a>
        &mdash; ${year}
      </p>
      <p class="site-footer__text" style="margin-top:0.25rem">
        <span style="color:var(--color-text-faint)">
          Built with vanilla HTML, CSS &amp; JS &mdash; no frameworks, no build step.
        </span>
      </p>
    </footer>
  `;
}

/* ============================================================
   RIGHT PANEL (all sections)
   ============================================================ */

function renderRightPanel(data) {
  return `
    <main id="main-content" class="right-panel" role="main">
      ${renderAboutSection(data)}
      ${renderExperienceSection(data)}
      ${renderStackSection(data)}
      ${renderConnectSection(data)}
      ${renderFooter(data)}
    </main>
  `;
}
