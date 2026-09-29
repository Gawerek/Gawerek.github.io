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
3. **Cloud Cost & Security Copilot** — personal, in-progress project (repo:
   `cloud-cost-security-copilot`). Stack: Terraform, n8n, PostgreSQL, Docker,
   Claude API, Hetzner. Its README states what is real vs mocked (input data is
   synthetic for now) — keep the site's wording in line with that. It replaced
   the earlier "legal document automation" entry: that engagement never
   happened, so it must not appear anywhere.

**Career trajectory / narrative thread** (soft-sell, not a job title change):
- Currently: Cloud/DevOps Tech Lead
- Exploring: the Forward Deployed Engineer model, applying infra discipline
  directly inside client environments with AI/ML systems in scope

## What's still missing (need Michał to supply before publishing)
- ~~Full name~~ — done: Michał Gawron
- ~~Contact details~~ — done: email, GitHub `Gawerek` and LinkedIn are all set
- ~~Employer naming~~ — done: naming Novo Nordisk is owner-approved, in About and
  in the MCITI/GIPS descriptions only — still no architecture detail, no internal
  system names beyond MCITI/GIPS, no numbers.
- ~~Availability~~ — done: 30-day notice period; open to FDE roles and
  contract/freelance (hero + contact lines say so).
- ~~Now section / proficiency bars~~ — done: "Now" merged into About's timeline
  (Now / Exploring), section marks are 01–04; the self-rated
  "Proficiency" bars were removed (Stack covers the skills).
- ~~A real resume PDF~~ — done: `assets/Michal_Gawron_CV.pdf`, linked from the nav
- ~~A real headshot photo~~ — done: `assets/photo.jpg` in the hero circle
- Real, quantifiable outcomes for MCITI/GIPS — only figures Michał can stand behind in an interview\n  (rough-but-true is fine, e.g. ~X environments, provisioning time from days to hours). Never invent.\n- Link the copilot repo from its project dialog once its public history is cleaned of secrets
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

- Palette: `--color-bg` #1a2416, `--color-surface` #232f1f, `--color-text`
  #ece9e0, `--color-accent`/`--color-accent-2` #1f7a43 (mono accent scheme),
  warm-shifted neutral ramp — all layered over Nocturne's component classes
  (`.btn`, `.card`, `.tag`, `.nav`, `.dialog`, `.lighten`)
- Type: Inter throughout, weight 500 for headings, never bolder
- Layout: asymmetric left-heavy padding, numbered section marks (01–04) in
  the left margin, 1px dividers between sections that fade to transparent
  at both ends
- **Fluid, not breakpoint-based**: after live feedback that the fixed
  760px/960px column looked cramped and empty at once on a real wide
  monitor, `--content-width` and nearly every font-size became
  `clamp()`/`vw`-driven so the page scales continuously with the viewport
  instead of jumping between two or three fixed sizes. Checked directly
  against v4.brittanychiang.com (measured its actual rendered sizes — 80px
  hero name, 17px body, 18px nav — not just screenshots) as a fidelity
  bar; our hero now fills ~86vh on load with a three-tier headline (small
  role kicker → huge name → large tagline line) in the same spirit. Only
  the hero/nav grid's column-count switch and a couple of small
  safety tweaks remain in an actual media query — everything else is
  fluid by construction. When adding new text, size it with `clamp()`
  against the pattern already in `page.css`/`styles.css`, not a bare `px`
  or `%`.
- Interactions (all specified in the handoff, "final — recreate
  pixel-perfectly"): sticky nav with a 2px scroll-progress bar; active nav
  link tracks scroll position via `IntersectionObserver`; hero has a
  cursor-following radial accent glow and a floating circular photo slot;
  project cards open a shared dialog with full case-study detail; stack is
  three tag clusters (not a table); About holds the Now / Exploring timeline (the former "Now" section was merged in);
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

### CI (`.github/workflows/ci.yml`)
Runs on every pull request, on push to `main`, and manually
(`workflow_dispatch`). Read-only (`permissions: contents: read`), superseded
runs on the same PR/branch are cancelled, and it does **not** deploy — Pages
still publishes from the `main` branch as before. Only shipped files are
checked; `nocturne-reference/` and `design-handoff/` are excluded.

| Job | What it does | Config | Run locally |
|---|---|---|---|
| `html-validate` | Validates `index.html` against `html-validate:recommended` | `.htmlvalidate.json` | `npx --yes html-validate@9 index.html` |
| `link-check` | lychee checks every link in `index.html` (local files + external URLs) | `lychee.toml` | `lychee --config lychee.toml index.html` (install: `winget install lycheeverse.lychee` / `brew install lychee` / `cargo install lychee`) |
| `lighthouse` | Lighthouse CI serves the repo root statically and audits `index.html` 3×; warns if performance / accessibility / best-practices / SEO < 0.9; report uploaded to temporary public storage + as a workflow artifact | `lighthouserc.json` | `npx --yes @lhci/cli@0.14 autorun` (needs Chrome) |

Relaxed html-validate rules (JSON can't hold comments, so the reasons live here):
- `no-inline-style` off — a handful of deliberate one-off inline styles
  (small button/meta tweaks).
- `empty-heading` off — `#dialog-title` is intentionally empty and filled
  by `script.js` when a project card is opened.

`element-permitted-content` and `heading-level` are back at **error**: the card
markup (`<article>` + real `<button>`) and the `<p class="eyebrow">` labels fixed
the two issues that originally justified relaxing them.

lychee exclusions (`lychee.toml`): linkedin.com (answers bots with HTTP
999), `mailto:`, and the absolute `og:image` URL (`gawerek.github.io/assets/og.png`),
which 404s on a PR until the file reaches main. The resume PDF is committed, so
it is checked for real.

Lighthouse assertions are warn-level on purpose: it reports without
blocking. Once scores are stable, flip them to `error` to make it a gate.

Possible next steps (need the repo owner, not just a PR):
- Switch **Settings → Pages → Source** from "Deploy from a branch" to
  "GitHub Actions" and add a deploy job (`actions/upload-pages-artifact` +
  `actions/deploy-pages`) that `needs:` the CI jobs, so a failing check
  blocks publishing. That job would also be the place to ship only the site
  files and leave the reference folders out of the published site.
- Make the CI jobs required status checks via branch protection on `main`.
- Pin actions to commit SHAs and add Dependabot for `github-actions` updates.
