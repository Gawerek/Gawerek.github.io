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
Concept: infrastructure blueprints / technical drawings, since the subject
matter (IaC, provisioning, golden images) literally *is* the practice of
drafting infrastructure. Site is structured as a set of numbered "sheets"
(00 Cover → 05 Contact) with drafting-style furniture: corner registration
marks, title blocks, revision numbers, a bill-of-materials style stack list.

- Palette: ink navy (#0E1621), blueprint blue (#4A8FE0), amber accent
  (#E8A33D), warm paper (#ECE7DA), slate greys for secondary text
- Type: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono
  (labels/data) — all via Google Fonts
- Signature element: an animated SVG schematic in the hero showing
  AWS/Azure → provisioning pipeline → golden image → deployed VM, with
  connector lines drawing in on load
- Fully static (no framework), responsive, respects
  `prefers-reduced-motion`, keyboard-focus visible

Prototype files (index.html, styles.css, script.js) are included alongside
this brief as a v1 reference. Treat them as a starting point to critique
and refine, not a final answer — in particular the placeholder contact
details and generic project descriptions need replacing with real info
before this goes live.

## Technical / deployment
- Static site — no backend needed
- Recommended path: push to a GitHub repo → deploy via GitHub Pages,
  Vercel, or Netlify (any works fine for a static site; GitHub Pages is
  free and simplest if a custom domain isn't needed yet)
- Custom domain: optional, not yet decided
