# Portfolio Jekyll - Mirco Planamente

## Project Overview
Jekyll-based academic/researcher portfolio for Mirco Planamente, AI Researcher at ARGO Vision / Politecnico di Torino / Italian Institute of Technology.

## Key Information
- **Owner**: Mirco Planamente (`plana93`)
- **Site**: https://plana93.github.io
- **Stack**: Jekyll, Ruby, SCSS, Vanilla JS, Three.js, GSAP
- **Deploy**: GitHub Pages (branch: master)

## Research Profile (Google Scholar: GIJ3h4AAAAAJ)
**Research areas**: Action Recognition, Egocentric Vision, Domain Adaptation, Anomaly Detection, Semantic Segmentation
**Institutions**: ARGO Vision · Politecnico di Torino · Italian Institute of Technology
**Achievements**: 26+ publications, CVPR, WACV, IEEE RA-L, ICPR; 2× winner EPIC-KITCHENS-100 UDA Challenge (CVPR 2021, 2022)

## File Structure
```
_layouts/portfolio.html    → main layout (Three.js hero, GSAP)
_pages/home_new.md         → new homepage (permalink: /new/)
_pages/about.md            → legacy homepage (permalink: /)
_sass/_portfolio.scss      → new design system (dark theme)
_sass/_custom.scss         → old design system (light/dark)
assets/js/portfolio-main.js → Three.js + GSAP + scroll logic
assets/data/scholar.json   → auto-fetched publications (GitHub Actions)
_scripts/fetch_scholar.py  → Python script to fetch Scholar data
.github/workflows/fetch_scholar.yml → weekly auto-fetch workflow
_old/                      → backup of previous design (gitignored)
```

## Design System (_sass/_portfolio.scss)
**Palette**:
- Background: `--p-bg: #07070f`
- Surface: `--p-surface: #0d0d1a`
- Accent purple: `--p-purple: #6e56ff`
- Accent teal: `--p-teal: #00d4aa`
- Text: `--p-text: #e2e2f2`

**Fonts**: Syne (headlines) + Inter (body) + JetBrains Mono (labels/code)

**Key classes**:
- `.p-container` → max-width 1160px centered
- `.p-section` → padding-block clamp(5rem, 10vw, 8rem)
- `.p-h1/.p-h2/.p-h3` → heading scale
- `.p-btn--primary/.p-btn--outline/.p-btn--teal` → buttons
- `.p-card` → surface card with hover lift
- `.p-reveal` → scroll animation (opacity+translateY, IntersectionObserver)
- `.p-overline` → mono uppercase label

## Build Commands
```bash
bundle exec jekyll build      # production build
bundle exec jekyll serve --port 4001   # local dev
```

## Scholar Auto-fetch
- Script: `_scripts/fetch_scholar.py` (requires `scholarly` pip package)
- Workflow: `.github/workflows/fetch_scholar.yml` (runs every Monday 06:00 UTC)
- Output: `assets/data/scholar.json` (served statically, loaded by JS)
- JS: `portfolio-main.js` → `initPublications()` fetches `/assets/data/scholar.json`

## Important Notes
- The old design lives in `_old/` (gitignored, not pushed)
- Scholar data is loaded client-side via `fetch()` from static JSON
- Three.js and GSAP are loaded from CDN (r128 and 3.12.5)
- `assets/css/portfolio.scss` → compiled to `assets/css/portfolio.css` by Jekyll
- `_sass/_portfolio.scss` imported by `assets/css/portfolio.scss`

## Common Tasks

### Add a new publication manually
Edit `assets/data/scholar.json` → add entry to `publications[]` array:
```json
{
  "title": "Paper Title",
  "authors": "M Planamente et al.",
  "venue": "CVPR 2025",
  "year": 2025,
  "citedBy": 0,
  "url": "https://..."
}
```

### Update stats in hero
Edit `_pages/home_new.md` → `<div class="p-hero__stats">` section.
Numbers with `data-count` attribute are animated by GSAP.

### Change accent color
Edit `_sass/_portfolio.scss` → `:root { --p-purple: #YOUR_COLOR; }`

### Trigger Scholar fetch manually
Go to GitHub → Actions → "Fetch Google Scholar Data" → "Run workflow"
