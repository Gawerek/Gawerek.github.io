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
  client references generic — check contract/NDA terms either way. Note:
  the v3 design handoff (`design-handoff/Portfolio.dc.html`, built directly
  in Claude Design) names the employer in the About copy, but the live site
  currently keeps it generic pending explicit confirmation this is OK —
  don't change that without checking first.
- A real resume PDF — the nav's "Resume ↓" button links to `./resume.pdf`,
  which doesn't exist yet
- A real headshot photo — the hero's circular photo slot is currently a
  placeholder; see the TODO comment in `index.html` for how to drop one in
- Any real, quantifiable outcomes for the case studies (don't invent numbers)
- Preferred domain name, or default to a free subdomain (GitHub Pages /
  Vercel / Netlify) to start

## Design direction (already prototyped — see files below)
v3: a single-page CV/business-card, rebuilt to match a high-fidelity design
("Portfolio") the user built directly in Claude Design, handed off via
`design-handoff/` (`Portfolio.dc.html`, its `README.md` brief, and
`image-slot.js` — kept as reference only, not shipped: the README itself
says to reimplement the image-drop UI natively rather than port Claude
Design's internal widget). Superseded v2's wider landing-page layout
(stat band, feature rows, project-card grid, table) with a narrower
760px-max single column, denser and more CV-like.

Still built on **Nocturne** (a design system authored in Claude Design and
pulled into this repo the same way v2 was — see `nocturne-reference/` for
the full component/foundation reference pages), but with a bespoke
deep-forest-green accent and warm neutral ramp layered over Nocturne's
default blurple/blue-grey, per the handoff's `:root` override:

- Palette: `--color-bg` #12190f, `--color-surface` #1b2418, `--color-text`
  #ece9e0, `--color-accent`/`--color-accent-2` #1f7a43 (mono accent scheme),
  warm-shifted neutral ramp — all layered over Nocturne's component classes
  (`.btn`, `.card`, `.tag`, `.nav`, `.dialog`, `.lighten`)
- Type: Inter throughout, weight 500 for headings, never bolder
- Layout: asymmetric left-heavy padding (`padding: 64px 8% 0 12%`), max
  content width 760px, numbered section marks (01–05) in the left margin,
  1px dividers between sections that fade to transparent at both ends
- Interactions (all specified in the handoff, "final — recreate
  pixel-perfectly"): sticky nav with a 2px scroll-progress bar; active nav
  link tracks scroll position via `IntersectionObserver`; hero has a
  cursor-following radial accent glow and a floating circular photo slot;
  project cards open a shared dialog with full case-study detail; stack is
  three tag clusters (not a table); "Now" section ends in a pull-quote;
  contact has a working copy-to-clipboard button on the email card
- `styles.css` = Nocturne's token + component sheet with the green
  override baked into the token values (not a separate override layer —
  this site only ever renders this one theme). `page.css` = portfolio
  layout/interaction hooks only; everything visual still comes from
  `styles.css` variables.
- Fully static (no framework), responsive, respects
  `prefers-reduced-motion`, keyboard-focus visible

If Nocturne's source project in Claude Design changes later, or the
"Portfolio" design itself is revised there, re-fetch via the `DesignSync`
tool's `get_file` and re-check class names / copy still match — this
repo's copy is a point-in-time pull, not a live sync.

## Technical / deployment
- Static site — no backend needed
- Recommended path: push to a GitHub repo → deploy via GitHub Pages,
  Vercel, or Netlify (any works fine for a static site; GitHub Pages is
  free and simplest if a custom domain isn't needed yet)
- Custom domain: optional, not yet decided
