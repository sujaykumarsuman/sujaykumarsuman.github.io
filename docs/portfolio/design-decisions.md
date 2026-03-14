# Design Decisions

## Visual Intent
The portfolio should feel like a premium control panel for a modern systems engineer: dark, precise, luminous, and slightly experimental without becoming noisy or game-like.

## Core Visual Rules
- Use a blue-black base with steel-toned surfaces, not flat black.
- Use electric cyan as the primary glow and acid-lime as the accent.
- Prefer thin, clipped, SIM-like card silhouettes with subtle inner borders and low-profile depth.
- Use background effects that resemble chip traces, etched circuits, scanlines, and low-contrast grid noise.
- Keep spacing generous so the neon accents feel deliberate rather than crowded.

## Design Tokens
- `--bg-0: #07111f`
- `--bg-1: #0b1728`
- `--surface-0: rgba(15, 31, 48, 0.78)`
- `--surface-1: rgba(18, 41, 62, 0.9)`
- `--line-soft: rgba(111, 243, 255, 0.18)`
- `--line-strong: rgba(111, 243, 255, 0.4)`
- `--text-main: #e6f7ff`
- `--text-muted: #88a9ba`
- `--cyan: #6ff3ff`
- `--cyan-strong: #27d7ff`
- `--lime: #d6ff4d`
- `--danger: #ff6b8f`

## Typography
- Headings: `Space Grotesk`
- Body: `IBM Plex Sans`
- Labels, chips, and meta text: `JetBrains Mono`
- Avoid oversized paragraph blocks. Let headings and metric callouts carry the visual weight.

## Layout Decisions
- Use a fixed shell with a consistent max width and full-bleed background treatment.
- Home page should feel editorial and cinematic.
- Inner pages should feel denser and more operational, with modular panels and a visible information hierarchy.
- Navigation should remain compact and desktop-first, then collapse cleanly on smaller screens.

## Component Decisions
- Primary panels use clipped corners via `clip-path` or pseudo-elements.
- Cards get one etched outer line, one soft inner highlight, and one gentle blur glow.
- Achievement cards use oversized numeric emphasis for metrics where the metric is clear.
- Timeline entries on `/journey/` should feel like system log capsules rather than resume bullets.
- Link chips should look like tactile modules, not plain text links.

## Motion Decisions
- Motion exists to reinforce hierarchy, not to entertain.
- Allowed motion:
  - low-speed scan sweep on select panels
  - short opacity and translate entrance on load
  - hover glow shift on cards and CTA chips
- Reduced-motion fallback disables transform-based reveals and scan effects.

## Accessibility Rules
- Minimum AA contrast for body text and actionable controls.
- Focus states must be obvious without relying on color alone.
- Decorative layers must never interfere with reading order or hit targets.
- Long timeline and stack sections must remain readable on mobile before any visual flourish.

## Content Presentation Decisions
- Lead with role and impact, not self-description.
- Avoid generic adjectives like "passionate" or "hardworking".
- Prefer proof points with scope and scale.
- Keep copy compact enough that the design remains fast to scan.

## Technical Decisions
- No framework adoption in v1.
- Use one shared stylesheet and one shared JavaScript content source initially.
- Keep assets local where possible, including the hosted resume.
- Add `.nojekyll` and `CNAME` in the deployment phase rather than during design implementation.
