# Portfolio site — project context

## Who this is for
Michał — Tech Lead running a 2-person cloud team, engaged as an independent
contractor (via GalacticQA / emagine) with an enterprise client. Based in
Warsaw. Works across AWS, Azure, Terraform, Bicep, Ansible, PowerShell DSC,
Python, GitHub Actions, Azure DevOps Pipelines.

## Purpose (all three apply — don't pick one over the others)
- Job hunting, specifically toward a Forward Deployed Engineer /
  "Cloud-DevOps + AI/ML infrastructure" direction
- Attracting freelance / independent consulting engagements
- General personal brand and visibility

Positioning note: frame as an extension of his current Cloud/DevOps identity
into AI/ML infrastructure — not a hard rebrand away from infra work.

## Content to feature

**Projects** (use these descriptions as a starting point, not verbatim):
1. **MCITI** — multi-cloud VM provisioning pipeline (AWS + Azure). Built with
   Terraform, Bicep, Ansible, PowerShell DSC, GitHub Actions, Azure DevOps
   Pipelines. One of two projects Michał leads on the cloud team.
   ⚠️ Client work — keep description generic/high-level, no client name,
   no proprietary architecture detail. Confirm with Michał before publishing
   specifics.
2. **GIPS** — multi-cloud golden image platform (AWS + Azure).
   Same confidentiality note as above.
3. **Legal document automation pipeline** — independent build for a law-firm
   client. Stack: n8n, PostgreSQL, Docker, Claude API. This one is his own
   engagement, so it can be described in more detail — but still don't name
   the client without checking.

**Career trajectory / narrative thread** (soft-sell, not a job title change):
- Currently: Cloud/DevOps Tech Lead
- In progress: pursuing AI/ML-focused certifications
- Exploring: the Forward Deployed Engineer model, applying infra discipline
  directly inside client environments with AI/ML systems in scope

## What's still missing (need Michał to supply before publishing)
- Full name / surname (or confirm first-name-only is intentional)
- Real contact details: email, LinkedIn URL, GitHub handle
- Whether to name the current employer (Novo Nordisk) explicitly, or keep
  client references generic — check contract/NDA terms either way
- Any real, quantifiable outcomes for the case studies (don't invent numbers)
- Preferred domain name, or default to a free subdomain (GitHub Pages /
  Vercel / Netlify) to start

## Design direction (already prototyped — see files below)
v2: built on **Nocturne**, a design system authored in Claude Design
(claude.ai/design) and synced into this repo via `/design-sync`'s reverse
flow (pulled the system's `styles.css` down rather than pushed a component
library up). Retired the earlier "infrastructure blueprint / technical
drawing" concept (numbered sheets, registration marks, title blocks) in
favor of Nocturne's own voice: a quiet, compact dark interface.

- Palette: near-neutral dark ground (`--color-bg` #161826, `--color-surface`
  #232532), text #e9e9ed, single blurple accent #9184d9 used as a line/glow
  rather than a flood — OKLCH tonal ramps for neutrals and accent
- Type: Inter throughout (heading + body), medium (500) weight for headings
- Layout: left-aligned, asymmetric; outlined buttons (never solid-filled);
  rules fade to transparent at their ends instead of stopping cleanly; one
  saturated deep-indigo band (the stat strip) as the page's single
  "presence" move, everywhere else desaturated
- `styles.css` = Nocturne's own token + component sheet, unmodified except
  for trimming components the portfolio doesn't use (forms, dialog).
  `page.css` = portfolio-specific layout only — page sizing/rhythm, no
  hardcoded colors/fonts; everything visual comes from `styles.css`
  variables. Retune the look by editing tokens in `styles.css`, not by
  hardcoding values in `page.css`.
- Fully static (no framework), responsive, respects
  `prefers-reduced-motion`, keyboard-focus visible (`:focus-visible` accent
  ring, per Nocturne's interaction-state spec)

If Nocturne's source project in Claude Design changes later, re-run
`/design-sync` (or manually re-fetch `styles.css` via the `DesignSync`
tool's `get_file` against project "Nocturne") and re-check the class names
in `index.html` still match — this repo's copy is a point-in-time pull, not
a live sync.

Current files (index.html, styles.css, page.css, script.js) are a v2
reference. In particular the placeholder contact details and generic
project descriptions still need replacing with real info before this goes
live.

## Technical / deployment
- Static site — no backend needed
- Recommended path: push to a GitHub repo → deploy via GitHub Pages,
  Vercel, or Netlify (any works fine for a static site; GitHub Pages is
  free and simplest if a custom domain isn't needed yet)
- Custom domain: optional, not yet decided
