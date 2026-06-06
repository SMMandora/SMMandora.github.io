# SMMandora.github.io

Personal portfolio — live at https://smmandora.github.io

Vanilla HTML, CSS, and JavaScript. No framework, no build step. Deployed to GitHub Pages via GitHub Actions.

## Layout

```
/
├── index.html              # the portfolio page
├── assets/
│   ├── css/styles.css
│   ├── js/                 # ES modules, one per concern
│   ├── img/                # og-image, favicons
│   └── Shubham_Mandora_Resume.pdf
├── data/
│   ├── currently.json      # editable "currently shipping / learning / reading"
│   └── build.json          # written by CI on deploy
├── .github/workflows/
│   └── deploy.yml          # builds and ships to Pages
└── Registrationform/       # older practice project, kept at /Registrationform/
```

## Running locally

Any static server works. From the repo root:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploying

1. In GitHub repo settings → Pages → **Source: GitHub Actions** (one-time).
2. Push to `master` (or `main`). The `deploy.yml` workflow stamps `data/build.json` with the current UTC time and publishes.
3. Site goes live at `https://smmandora.github.io` in ~30 seconds.

## Editing "currently"

`data/currently.json` is read on page load and renders the three "currently" lines in the about section. Edit it and push — no rebuild needed beyond the standard deploy.

## Design spec

See [docs/superpowers/specs/2026-06-02-portfolio-website-design.md](docs/superpowers/specs/2026-06-02-portfolio-website-design.md).
