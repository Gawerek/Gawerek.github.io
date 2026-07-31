# Handoff: Portfolio Page (CV Business Card)

## Overview
A single-page personal portfolio/business-card site for Michał, a Cloud/DevOps Tech Lead extending into AI/ML infrastructure. Intended to be attached to or linked from a CV. Sections: hero, about, selected work (project case studies), stack, now, contact.

## About the Design Files
The bundled file (`Portfolio.dc.html`) is a **design reference built in HTML** — a working prototype showing intended look, layout, and interaction, not production code to copy verbatim. Recreate this design in the target codebase's environment (plain static site, React, Next.js, etc. — whatever the project uses, or the simplest static-site setup if none exists yet). If shipping as a plain static site, the existing HTML/CSS/JS can largely be adapted directly since there's no framework dependency; strip the `<x-dc>`/`support.js`/template-engine scaffolding and convert `{{ }}` template holes and `sc-for`/`sc-if` into plain JS/React logic.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate pixel-perfectly.

## Screens / Views
Single scrolling page, six sections, max content width 760px, centered, left-heavy padding (`padding: 64px 8% 0 12%`) — asymmetric left-aligned layout per the bound design system (Nocturne).

### 1. Nav (sticky header)
- `position: sticky; top: 0`, blurred translucent background (`backdrop-filter: blur(6px)`, bg at 90% opacity)
- Left: brand mark "Michał". Right: links About / Work / Stack / Now / Contact, plus a "Resume ↓" outlined button (downloads `resume.pdf`)
- Active section link turns accent green; others inherit text color
- Below nav: a 2px scroll-progress bar (track: `--color-neutral-800`, fill: `--color-accent`, width = scroll percentage)

### 2. Hero
- Two-column grid: text (flex-grow) + 160×160 circular photo slot (right), align-items center
- Kicker line (uppercase, accent, 13px), H1 name (52px), subhead paragraph (max 46ch, neutral-400), two buttons (`View work` primary, `Get in touch` secondary)
- Circular photo blended via `mix-blend-mode: lighten` (design system's `.lighten` class), gentle infinite float animation (`translateY` ±8px, 5s ease-in-out)
- Background: soft radial accent-green glow that follows the cursor (`radial-gradient(500px circle at var(--mx) var(--my), ...)`, updated via `pointermove` on the hero)

### 3. About
- Two-column grid (auto-fit, min 280px): narrative copy (two paragraphs) + a vertical timeline list (Now / In progress / Exploring, each with a left border + tag + description)
- Below: "Proficiency" skill bars — 5 skills, each a label+level row over a 4px rounded track with an accent-filled bar sized to a percentage (Terraform/Bicep 90%, AWS/Azure 88%, Ansible/PowerShell DSC 82%, CI/CD 85%, Python 72%)

### 4. Selected work (Projects)
- Grid of cards (auto-fit, min 230px), each clickable, hover lifts (`translateY(-3px)` + `--shadow-md`)
- Card: kicker number, title, summary, tag list, meta line, "View details →" ghost button
- Click opens a modal dialog (Nocturne `.dialog` + `.dialog-backdrop`) with full detail text, tags, meta, and two action links ("Repo (soon)", "Live demo (soon)" — placeholders until real URLs exist) + Close button
- Dialog entrance: `scale(0.96)→1` + fade, 0.25s ease

### 5. Stack
- Tools grouped into 3 clusters (Cloud & IaC / Config & CI/CD / Automation & data) as tag chips, not a table — `tag-accent` for the two cloud platforms, `tag-neutral` for the rest, `tag-accent-2` for Claude API

### 6. Now
- One item (certification track, "In progress" tag) + a fading divider + a pull-quote (larger accent-tinted text, left accent border) for the Forward Deployed Engineer positioning, tagged "Exploring"

### 7. Contact
- Three cards (Email / LinkedIn / GitHub), each with an inline icon + link, hover-lift like project cards
- Email card has a small "Copy email" ghost button that copies the address to clipboard and shows "Copied!" for 1.8s
- Footer line: "Rev A · {ISO date}" (auto-generated build date)

Between every section: a 1px divider that fades to transparent at both ends (`linear-gradient(to right, transparent, var(--color-divider) 20%, var(--color-divider) 80%, transparent)`). Each section also has a small numeric index mark (01–05) in the left margin.

## Interactions & Behavior
- **Active nav link**: `IntersectionObserver` with `rootMargin: -40% 0px -40% 0px` on each section; sets active id, colors that nav link accent
- **Scroll progress bar**: `scroll` listener updates a ref'd div's `width` style directly (not via React state — avoids re-render churn)
- **Cursor glow**: `pointermove` on hero sets `--mx`/`--my` CSS custom properties consumed by a radial-gradient background layer
- **Project dialog**: click a card → opens dialog with that project's full data; click backdrop or Close → dismiss; click inside dialog stops propagation
- **Copy email**: `navigator.clipboard.writeText`, button label flips to "Copied!" for 1.8s then reverts
- **Hover states**: cards lift + shadow; buttons/tags/links use the design system's built-in hover/focus states (no custom overrides)
- No loading or error states — fully static content, no data fetching

## State Management
Minimal local component state:
- `activeId` — current section in view (drives nav highlight)
- `activeProjectId` — which project dialog (if any) is open
- `copyLabel` — "Copy email" / "Copied!" toggle
Everything else (project data, skills data) is static config, not runtime state.

## Design Tokens
Custom green theme layered over the bound Nocturne design system (Nocturne ships blurple by default; this page overrides to a deep-forest green + warm earthy neutrals):

- `--color-bg`: `#12190f` (warm near-black green)
- `--color-surface`: `#1b2418`
- `--color-text`: `#ece9e0`
- `--color-accent` / `--color-accent-2`: `#1f7a43` (mono accent scheme — same value for both roles)
- Accent ramp 100→900: `#e3f4ea, #c3e6d0, #96d1ac, #5cb37e, #2f9d5c, #1f7a43, #176b39, #0f4526, #0a301b`
- Neutral ramp 100→900 (warm-shifted): `#f2f1e9, #e0e0d4, #c7c8ba, #a9ac9c, #8b8f7d, #6d7160, #52564a, #393c33, #24261f`
- Typography: Inter for heading and body (`--font-heading`, `--font-body`), weight 500 for headings, never bolder
- Spacing/radius: Nocturne's compact scale (`--space-1..8`, `--radius-sm/md/lg` = 4/8/14px)
- Shadows: `--shadow-sm/md/lg` (hairline edge + ambient darkness, no flat box-shadows)
- Components used from Nocturne: `.nav`, `.btn` (+ `-primary`/`-secondary`/`-ghost`), `.tag` (+ `-accent`/`-accent-2`/`-neutral`/`-outline`), `.card` (+ `-kicker`/`-title`/`-body`/`-meta`), `.dialog`/`.dialog-backdrop` (+ `-title`/`-body`/`-actions`), `.lighten`

## Assets
- Hero photo: droppable placeholder (`<image-slot id="hero-photo">`, circular, 160×160) — no real photo yet
- Icons: hand-drawn inline SVGs (envelope, external-link arrow) on `currentColor` — simple Phosphor-style outlines, not the actual Phosphor library
- Favicon: inline SVG data-URI, dark rounded square with accent-green "M" monogram
- No other imagery

## Files
- `Portfolio.dc.html` — the full page (reference implementation, includes the custom green token override and all markup/logic)
- `image-slot.js` — the drag-and-drop image placeholder component the hero photo uses (reference only; reimplement file upload/crop UI natively in the target stack)

## Outstanding placeholders (must be replaced before/at launch)
- Email: `hello@example.com` → real address
- LinkedIn: `https://linkedin.com/in/REPLACE_ME` → real profile URL
- GitHub: `https://github.com/REPLACE_ME` → real profile URL
- Project repo/demo links: currently `#` for all three projects (MCITI, GIPS, Legal document automation pipeline)
- Resume button links to `./resume.pdf` — no file exists yet
- Hero photo slot is empty
