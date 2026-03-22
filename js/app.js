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
   ANIMATED BACKGROUND — canvas aurora + cursor glow
   ============================================================ */

function initCursorGlow() {
  // Create canvas and insert before everything else in body
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  const isTouchOnly = window.matchMedia('(hover: none)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // --- Cursor tracking ---
  let targetX = W / 2, targetY = H / 2;
  let glowX   = W / 2, glowY   = H / 2;

  if (!isTouchOnly) {
    document.addEventListener('mousemove', e => {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });
  }

  // --- Drifting aurora blobs ---
  // Each blob drifts on its own Lissajous path around a center point.
  // Values are in 0–1 normalized coordinates; rendered at W×H.
  const blobs = [
    // Cyan blob — top-left quadrant, slow drift
    { cx: 0.22, cy: 0.28, amp: 0.10, freqX: 0.00022, freqY: 0.00017, phase: 0.0,  r: 0.40, color: '34,211,238',  alpha: 0.055 },
    // Cyan blob — bottom-right quadrant, medium drift
    { cx: 0.78, cy: 0.72, amp: 0.09, freqX: 0.00018, freqY: 0.00025, phase: 2.09, r: 0.35, color: '34,211,238',  alpha: 0.045 },
    // Purple-teal blob — centre, adds depth
    { cx: 0.55, cy: 0.45, amp: 0.07, freqX: 0.00013, freqY: 0.00019, phase: 4.19, r: 0.28, color: '99,102,241', alpha: 0.035 },
  ];

  // --- rAF loop ---
  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // Lerp cursor glow position (slower on touch/reduced-motion)
    const lerpFactor = reducedMotion ? 0 : (isTouchOnly ? 0 : 0.055);
    glowX += (targetX - glowX) * lerpFactor;
    glowY += (targetY - glowY) * lerpFactor;

    // Draw cursor glow
    if (!isTouchOnly && !reducedMotion) {
      const r = Math.min(W, H) * 0.42;
      const g = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, r);
      g.addColorStop(0,   'rgba(34,211,238,0.09)');
      g.addColorStop(0.4, 'rgba(34,211,238,0.04)');
      g.addColorStop(1,   'rgba(34,211,238,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // Draw drifting aurora blobs
    for (const b of blobs) {
      const speed = reducedMotion ? 0 : 1;
      const x = (b.cx + Math.sin(t * b.freqX * speed + b.phase)          * b.amp) * W;
      const y = (b.cy + Math.cos(t * b.freqY * speed + b.phase + Math.PI) * b.amp) * H;
      const r = b.r * Math.min(W, H);

      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0,   `rgba(${b.color},${b.alpha})`);
      g.addColorStop(0.5, `rgba(${b.color},${b.alpha * 0.4})`);
      g.addColorStop(1,   `rgba(${b.color},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
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
