/**
 * app.js — Orchestration layer.
 *
 * Responsibilities:
 *  1. Fetch /data/portfolio.json
 *  2. Detect current page via <body data-page="...">
 *  3. Call renderer functions for shared components (nav, footer)
 *  4. Call page-specific renderer function
 *  5. Inject results into data-mount anchors
 *  6. Attach interactive event listeners
 *
 * Rules:
 *  - No content lives here. All strings come from portfolio.json via renderer.js.
 *  - Only change this file to wire new pages or add new event behavior.
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

  // --- Set document title and meta description ---
  const page = document.body.dataset.page || 'home';
  setDocMeta(data, page);

  // --- Shared: nav ---
  const navMount = document.querySelector('[data-mount="nav"]');
  if (navMount) {
    navMount.innerHTML = renderNav(data.nav, window.location.pathname, data.meta);
  }

  // --- Shared: footer ---
  const footerMount = document.querySelector('[data-mount="footer"]');
  if (footerMount) {
    footerMount.innerHTML = renderFooter(data.meta, data.links, data.footer);
  }

  // --- Page-specific content ---
  const contentMount = document.querySelector('[data-mount="content"]');
  if (contentMount) {
    switch (page) {
      case 'home':
        contentMount.innerHTML = renderHomePage(data);
        break;
      case 'journey':
        contentMount.innerHTML = renderJourneyPage(data);
        break;
      case 'stack':
        contentMount.innerHTML = renderStackPage(data);
        break;
      case 'connect':
        contentMount.innerHTML = renderConnectPage(data);
        break;
      case 'not-found':
        contentMount.innerHTML = renderNotFoundPage();
        break;
      default:
        contentMount.innerHTML = renderNotFoundPage();
    }
  }

  // --- Event listeners ---
  attachCopyButtons();
})();

/* ============================================================
   HELPERS
   ============================================================ */

function setDocMeta(data, page) {
  const titles = {
    home:      `${data.meta.name} — ${data.meta.role}`,
    journey:   `Journey — ${data.meta.name}`,
    stack:     `Stack — ${data.meta.name}`,
    connect:   `Connect — ${data.meta.name}`,
    'not-found': `404 — ${data.meta.domain}`,
  };

  const descs = {
    home:    data.home.summary,
    journey: data.journey.summary,
    stack:   data.stack.summary,
    connect: data.connect.summary,
    'not-found': 'Page not found.',
  };

  document.title = titles[page] || titles.home;

  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', descs[page] || descs.home);

  // Open Graph
  setMetaProperty('og:title', titles[page] || titles.home);
  setMetaProperty('og:description', descs[page] || descs.home);
  setMetaProperty('og:url', window.location.href);
  setMetaProperty('og:type', 'website');

  // Twitter
  setMetaName('twitter:card', 'summary');
  setMetaName('twitter:title', titles[page] || titles.home);
  setMetaName('twitter:description', descs[page] || descs.home);
}

function setMetaProperty(prop, content) {
  let el = document.querySelector(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', prop);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function attachCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.setAttribute('data-copied', 'true');
        setTimeout(() => {
          btn.textContent = original;
          btn.removeAttribute('data-copied');
        }, 2000);
      } catch {
        // Clipboard not available — silently ignore
      }
    });
  });
}

function showError() {
  const body = document.body;
  body.innerHTML = `
    <div style="
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; font-family: monospace; color: #7d8590;
      background: #0d1117; text-align: center; padding: 2rem;
    ">
      <div>
        <div style="font-size: 3rem; color: #21262d; margin-bottom: 1rem;">⚠</div>
        <p style="margin-bottom: 0.5rem; color: #e6edf3;">Failed to load portfolio data.</p>
        <p style="font-size: 0.8rem;">Check that /data/portfolio.json is accessible.</p>
      </div>
    </div>
  `;
}
