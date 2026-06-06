# Portfolio Website — Design

**Status:** Draft for review
**Date:** 2026-06-02
**Owner:** Shubham Mandora
**Deploys to:** `smmandora.github.io` (GitHub Pages user site)

---

## 1. Goal & Audience

A single-page personal portfolio that:

- **Primary audience:** Recruiters and hiring managers — fast skim, clear signal of role, stack, and recent work.
- **Secondary audience:** Engineering peers — deeper signal of craft via a flagship case study, experience timeline, and considered visual design.

Tone: **unique, interactive, catchy — but not flashy.** Restraint is a feature.

## 2. Visual Direction — "V2 Engineered"

A modern dark minimalist aesthetic that visually reinforces the "systems engineer" identity: dot-grid background, monospace UI chrome on top of a sans body, one electric accent.

### 2.1 Palette

| Token              | Hex       | Use                                     |
|--------------------|-----------|-----------------------------------------|
| `--bg-base`        | `#0a0a0a` | Page background                         |
| `--bg-surface`     | `#141414` | Cards, chips, elevated surfaces         |
| `--border`         | `#2a2a2a` | Hairlines, dividers                     |
| `--text-primary`   | `#ededed` | Headings, body                          |
| `--text-muted`     | `#a8a8a8` | Secondary text                          |
| `--text-dim`       | `#707070` | Meta, labels, dim mono UI               |
| `--accent`         | `#d8ff3c` | Single accent (lime) — used sparingly   |
| `--accent-soft`    | `#d8ff3c44` | Accent borders / glows (transparent)  |

The dot-grid texture is a `radial-gradient` of `rgba(255,255,255,0.06)` 1px dots on an 18px grid, masked downward with a linear gradient so it fades into the page.

### 2.2 Typography

- **Display / body:** Inter (variable, system-fallback `ui-sans-serif, system-ui, sans-serif`)
- **UI / meta / code:** JetBrains Mono (system-fallback `'SF Mono', Menlo, monospace`)
- **Both loaded from a local `/assets/fonts/` directory** to avoid external dependency on Google Fonts (privacy + offline-friendly + faster paint).

Type ramp:

| Style       | Family    | Size    | Weight | Letter-spacing | Use                       |
|-------------|-----------|---------|--------|----------------|---------------------------|
| Display     | Inter     | 34–48px | 600    | -0.025em       | Hero, section titles      |
| Body LG     | Inter     | 16px    | 400    | 0              | About paragraph           |
| Body SM     | Inter     | 13px    | 400    | 0              | Card copy, captions       |
| UI / Meta   | Mono      | 10–12px | 500    | 0.04–0.12em    | Top bar, labels, chips    |

### 2.3 Spacing

8px base scale: `8, 16, 24, 32, 48, 64, 96`. Sections separated by 96px desktop / 64px mobile. Section horizontal padding 32px desktop / 20px mobile.

### 2.4 Motion

| What                         | Timing            | Notes                          |
|------------------------------|-------------------|--------------------------------|
| Hover transitions            | 120ms ease-out    | Color, opacity, transform      |
| Scroll reveals (fade + slide)| 400ms cubic-bezier| 8px upward translate           |
| Stat count-up                | 800ms once        | On viewport entry              |
| Cursor blink (mono UI)       | 1000ms loop       | Hero prompt cursor             |
| Availability dot pulse       | 2000ms loop       | Hero status indicator          |

All loops and reveals are disabled when `prefers-reduced-motion: reduce` is set. Reveals fall back to "always visible" rather than skipping content.

## 3. Page Architecture

Single-page scroll. Seven anchored sections, top-to-bottom:

### 3.1 Hero (`#top`)

- **Top bar:** `SHUBHAM_MANDORA / PORTFOLIO.V1` left, `● LIVE · NYC HH:MM EST` right (live clock).
- **Headline:** "Building reliable **backend** & **AI** systems" — accent words in lime. Two-line max.
- **Sub:** Mono nav-like meta: `~/about · ~/work · ~/writing · ~/contact` (click-scrolls).
- **Stat strip (4 cells):** Years shipping, Production systems, Stack focus, SLO uptime. Numbers count up on first view.
- **Scroll cue** at the bottom.

### 3.2 About (`#about`)

- Two-sentence positioning paragraph, written for humans (NOT a copy-paste of resume summary).
- **"Currently" panel** beside it: three lines fed from a small `/data/currently.json` file edited manually (e.g., *currently shipping*, *currently learning*, *currently reading*). Lets the site feel alive without a backend.

### 3.3 Selected Work (`#work`)

Grid of project cards. **Hero card** (Vizzy Labs) spans full width; three **standard cards** below in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop).

**Hero card — Vizzy Labs (Founding Engineer, Backend & Data):**

- Title, role, dates, stack tags.
- "Context → Approach → Outcome" prose, written generically to stay NDA-safe (focus on architectural patterns, not specifics):
  - *Context:* Real-time mobile game requiring 24×7 uptime, financial transaction integrity, leaderboard consistency.
  - *Approach:* Multi-region distributed backend across AWS + Azure; microservice decomposition by gameplay/auth/leaderboard/transactions; SLO-backed observability with Grafana + alerting; CI/CD with Docker, Jenkins, GitHub Actions, K8s.
  - *Outcome:* SLO-backed availability, automated regression/load testing, proactive bottleneck detection.
- **Architecture sketch:** Inline SVG showing layered architecture (mobile clients → API gateway → service mesh → data layer + observability sidecar). Draws line-by-line as the section scrolls into view.

**Standard cards (3):**

1. **Sustainable City Management** — Dublin city infrastructure analytics. Django + PostgreSQL backend, K8s microservices, Jenkins CI/CD, React frontend.
2. **ML-Driven Urban Transport Forecasting** — GBDT in SUMO environment. PySpark + scikit-learn pipeline, hyperparameter tuning, model monitoring.
3. **Online Proctoring AI** — Real-time agentic AI inference. PyTorch/TensorFlow + RAG retrieval + LLM anomaly detection.

Each standard card: title, 2-sentence problem, stack tags, key result, repo/demo link. Click expands inline (height transition) to show a short "context → approach → outcome" detail. Only one card expanded at a time.

### 3.4 Experience Timeline (`#experience`)

Vertical timeline, left-aligned. All five roles in reverse-chronological order: Vizzy Labs → NYIT Research Assistant → IDZ Digital → Clear Exam → Divspace. Each entry:

- Dates in monospace (left).
- Company + role + location (right column).
- 2–3 bullets distilled from the resume.

A vertical line draws downward as you scroll past it; dots fill in at each entry as it enters viewport.

### 3.5 Skills & Certs (`#skills`)

Skills grouped per resume categories, each category as a row of monospace chips on `var(--bg-surface)`:

- Languages: Python, C, C#, C++, Go, TypeScript, Java, Kotlin, JavaScript, R, Swift, Shell, MATLAB
- Data Engineering: PostgreSQL, MongoDB, Redis, Kafka, Hadoop, Neo4j, ETL, Pandas
- Cloud & DevOps: AWS (EC2, S3, SageMaker, Lambda), Docker, Kubernetes, Jenkins, CI/CD, Azure, GCP
- Visualization & BI: Power BI, Tableau, Looker
- Frameworks & Web: Node.js, React, Django, FastAPI, Spring WebFlux, LangChain, GraphQL, REST, HTML/CSS
- Tools: Git, GitHub, Grafana, Linux, pytest, Microsoft 365

Each category header gets a small playful "build status" line: `● ci: passing` in lime. Adds character that fits the engineered aesthetic without being a gag.

Certificates as three small badges below: Google Advanced Data Analytics, Cisco Python Essentials, AWS Cloud Practitioner.

### 3.6 Education (`#education`)

Two compact lines:

- MS Computer Science · NYIT · Manhattan, NY · 09/2023 – 05/2025
- B.Tech Computer Science · Sandip University · Nasik, India · 07/2019 – 05/2022

### 3.7 Contact (`#contact`)

A terminal-style block at the bottom of the page:

```
$ contact --reach-out

email     shubhammandora220800@gmail.com    [copy]
phone     +1 (559) 387 7883
linkedin  linkedin.com/in/shubhamm2208
github    github.com/SMMandora

[ download resume.pdf ]
```

Email is copy-to-clipboard on click (with a tiny "copied!" tooltip). The "download resume" button serves `/assets/Shubham_Mandora_Resume.pdf` (added to the repo).

**Footer line:** `last deployed · YYYY-MM-DD HH:MM UTC` injected at build time by a GitHub Actions step that writes a `/data/build.json` file the page reads on load.

## 4. Interactivity Inventory

Two restrained flavors, deliberately scoped:

### 4.1 Live system widgets

| Widget                    | Source                                | Where        |
|---------------------------|---------------------------------------|--------------|
| NYC clock                 | `new Date()` + `Intl.DateTimeFormat`  | Hero top bar |
| Availability dot pulse    | CSS animation                         | Hero top bar |
| Stat strip values         | Static constants (manually maintained)| Hero         |
| "Currently" three-liner   | `fetch('/data/currently.json')`       | About panel  |
| Last-deployed timestamp   | `fetch('/data/build.json')`           | Footer       |

No external API calls in v1. Everything either runs client-side or reads a static JSON shipped with the build. (A future iteration could pull GitHub commit data, but it's out of scope here to keep the build truly static and dependency-free.)

**Data file shapes:**

```json
// data/currently.json
{
  "shipping": "Real-time backend infra at Vizzy Labs",
  "learning": "Distributed systems patterns (DDIA, 2nd ed.)",
  "reading":  "Designing Data-Intensive Applications"
}

// data/build.json  (overwritten by CI on every deploy)
{
  "deployedAt": "2026-06-02T14:32:00Z"
}
```

### 4.2 Scroll-driven reveals

Implemented with a single `IntersectionObserver` instance. Elements opt in via `data-reveal` attribute; observer adds an `.is-visible` class that triggers fade + 8px upward slide. Specific moments:

- Hero stat counters count up on first viewport entry (800ms).
- Section titles fade in.
- Project cards stagger in with 80ms delay between siblings.
- Hero case study architecture sketch: SVG `<path>` elements use `stroke-dasharray` + `stroke-dashoffset` animation to "draw" line-by-line as the section enters.
- Timeline vertical line draws downward; dots populate at each entry as they enter.
- Skill chips populate sequentially within each category row.

All reveals are no-ops when `prefers-reduced-motion: reduce` — elements simply start visible.

## 5. Tech & File Layout

**Stack:** Vanilla HTML5 + modern CSS + ES2022 JavaScript. No build step. No frameworks. No runtime dependencies.

**Repo layout** (additions to existing `SMMandora.github.io`):

```
/
├── index.html                  # the portfolio (new — at repo root)
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js             # entry point, sets everything up
│   │   ├── clock.js            # NYC live clock
│   │   ├── reveals.js          # IntersectionObserver
│   │   ├── counters.js         # stat count-up
│   │   ├── project-cards.js    # expand-on-click
│   │   └── copy-email.js
│   ├── fonts/
│   │   ├── Inter-*.woff2
│   │   └── JetBrainsMono-*.woff2
│   ├── img/
│   │   └── og-image.png        # social share image
│   └── Shubham_Mandora_Resume.pdf
├── data/
│   ├── currently.json          # { shipping, learning, reading }
│   └── build.json              # { deployedAt } — written by CI
├── Registrationform/           # existing — leave untouched
├── README.md                   # rewrite as portfolio README
├── .gitignore                  # already added
└── .github/workflows/
    └── deploy.yml              # writes build.json, deploys via Pages action
```

**Why this split:**

- One JS module per concern. Each file is small, focused, easy to reason about. Avoids one monolithic `script.js`.
- `data/` is JSON because it's easy to edit by hand and avoids any HTML re-rendering logic.
- Fonts local to avoid Google Fonts requests (privacy + speed).

**Deployment:** GitHub Pages with the official `actions/deploy-pages` workflow. Workflow steps:

1. Checkout.
2. Write current timestamp into `data/build.json`.
3. Upload repo as a Pages artifact.
4. Deploy.

A pure git push to `master` triggers the workflow; site is live at `smmandora.github.io` within ~30s.

## 6. SEO & Social

- `<title>`: "Shubham Mandora — Backend & AI Engineer"
- `<meta name="description">`: One-sentence summary.
- Open Graph: title, description, og:image (a 1200×630 PNG generated once and committed).
- `<link rel="canonical">` to `https://smmandora.github.io/`.
- Favicon: a small lime "SM" monogram on dark.

## 7. Accessibility

- Color contrast verified WCAG AA on all text/background pairs.
- All interactive elements keyboard-reachable; focus rings visible (lime, 2px).
- Semantic HTML: `<main>`, `<section>` with `aria-labelledby`, `<nav>` for the hero nav line.
- Expandable project cards use `<button>` with `aria-expanded`.
- Decorative dot-grid + animations marked `aria-hidden`.
- All animation respects `prefers-reduced-motion: reduce`.
- Skip-to-content link at the top.

## 8. Non-Goals (Explicitly Out of Scope)

- No CMS, no markdown processing, no build tooling.
- No blog / writing section in v1 (room reserved by URL `~/writing`, but content is "coming soon" or omitted).
- No command palette / cmd+K overlay.
- No interactive per-project demos.
- No external API calls (no GitHub stats, no Spotify, no weather).
- No analytics in v1. (Can add Plausible later; not now.)
- No light/dark mode toggle — site is dark-only. Light mode adds significant design surface area for marginal value.

## 9. Open Decisions (Defer to Implementation)

- Exact copy for hero headline and About paragraph — drafted during implementation, reviewed before publish.
- Architecture sketch SVG — designed once during implementation (rough boxes-and-arrows aesthetic to match the engineered look).
- Exact "currently" entries at launch.
- **Hero stat strip values** — placeholders shown in mockups (5+ years, 12 systems, PY·GO·TS, 99.9%). Confirm real numbers with Shubham before publish.
- Whether to include phone number publicly on the contact section, or just email + links.
- Whether to keep `Registrationform/` linked anywhere (footer "older work" link?) or just leave it as a quiet sub-route.

## 10. Success Criteria

The site succeeds if:

1. A recruiter can answer "who is this, what do they do, can I contact them" within 10 seconds of landing.
2. An engineer scrolling further sees a flagship case study deep enough to discuss in an interview.
3. The page loads in under 1 second on a cold cache (no external font/CDN/API blocking).
4. The site passes Lighthouse 100/100/100/100 (perf / a11y / best-practices / SEO).
5. The aesthetic reads as "considered" — not template-generated, not flashy.
