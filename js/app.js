/**
 * app.js — Orchestration layer.
 *
 * Responsibilities:
 *  1. Fetch /data/portfolio.json
 *  2. Render left panel (name, nav, socials) and right panel (all sections)
 *  3. Wire scrollspy via IntersectionObserver
 *  4. Attach copy-email and any other event listeners
 */

'use strict';

(async function init() {
  // --- Fetch data ---
  let data;
  try {
    const res = await fetch('/data/portfolio.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('[app] Failed to load portfolio data:', err);
    showError();
    return;
  }

  // --- Set document meta ---
  document.title = `${data.meta.name} — ${data.meta.role}`;
  setMeta('description', data.home.summary);
  setOG(data);

  // --- Render layout ---
  const layoutEl = document.querySelector('[data-mount="layout"]');
  if (!layoutEl) return;

  layoutEl.innerHTML = renderLeftPanel(data) + renderRightPanel(data);

  // --- Scrollspy ---
  initScrollspy();

  // --- Cursor glow ---
  initCursorGlow();

  // --- Copy email buttons ---
  attachCopyButtons(data.meta.email);
})();

/* ============================================================
   SCROLLSPY
   ============================================================ */

function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.left-nav__item[data-nav-item]');

  if (!sections.length || !navItems.length) return;

  function setActive(id) {
    navItems.forEach(item => {
      const matches = item.dataset.navItem === id;
      item.classList.toggle('active', matches);
    });
  }

  // Set first section active on load
  setActive(sections[0].id);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      // Trigger when section crosses the middle of the viewport
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => observer.observe(section));

  // Smooth scroll on nav click
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.dataset.navItem;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   HELPERS
   ============================================================ */

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOG(data) {
  const og = {
    'og:title':       `${data.meta.name} — ${data.meta.role}`,
    'og:description': data.home.summary,
    'og:url':         window.location.href,
    'og:type':        'website',
  };
  Object.entries(og).forEach(([prop, val]) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  });
}

function attachCopyButtons(email) {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      } catch { /* silent */ }
    });
  });
}

/* ============================================================
   CURSOR GLOW
   ============================================================ */

function initCursorGlow() {
  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  });
}

function showError() {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;
      font-family:monospace;color:#8892b0;background:#0a192f;text-align:center;padding:2rem;">
      <div>
        <p style="color:#ccd6f6;margin-bottom:0.5rem;">Failed to load portfolio data.</p>
        <p style="font-size:0.8rem;">Check that /data/portfolio.json is accessible (requires HTTP server, not file://).</p>
      </div>
    </div>
  `;
}
