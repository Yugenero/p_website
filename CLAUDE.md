# CLAUDE.md

Personal portfolio for Nelson Rodriguez, live at https://nelsonrodriguez.me.
Its job right now is to support a job search: a recruiter or hiring manager should be
able to understand who Nelson is, what he has built, and how to reach him within
~30 seconds on the landing page, then go deeper on the dedicated pages.

This is a living document. Update it when the stack, design rules, or guardrails change.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18, Create React App (`react-scripts` 5) |
| Routing | `react-router-dom` v6, `BrowserRouter` (see `src/App.js`) |
| Styling | MUI v5 (`@mui/material`) with `styled()` + theme tokens; Emotion under the hood |
| Theme | `src/theme.js`, light/dark built by `buildTheme(mode)`, persisted in `localStorage.themeMode` |
| Animation | CSS keyframes, `react-typed` (typewriter text), custom `Starfield` component |
| Icons | `@mui/icons-material` |
| Photos | Fetched at runtime from a Google Cloud Function (`cloud-functions/`) backed by GCS |
| Hosting | GitHub Pages via `npm run deploy` (`gh-pages -d build`) to the `gh-pages` branch, custom domain via `CNAME` |
| Language | JavaScript (`.js` / `.jsx`); TypeScript is installed but unused |

Installed but **not reachable from any route** (only imported by legacy files, if at all): Tailwind helpers (`tailwind-merge`, `clsx`, `src/utils/cn.js`),
`framer-motion` / `motion`, `animejs`, `@tsparticles/*`, `react-animated-cursor`, `react-pdf`, `devicon`,
`hamburger-react`. Don't build on them without a reason; prefer removing them in a dedicated cleanup.

### Commands

```bash
npm install --no-package-lock   # package-lock.json is currently out of sync (npm ci fails); see Known issues
npm start                       # dev server on :3000
npm run build                   # production build to /build (must pass before pushing)
npm run deploy                  # build + publish to gh-pages (production!)
```

## Project structure

```
src/
  App.js                 routes + app shell (Header, Main, Footer)
  theme.js               palette, typography, MUI component overrides
  data/profile.js        SINGLE SOURCE OF TRUTH for resume content (see below)
  components/
    ui/primitives.js     layout + type primitives (Container, Section, CompactSection, MetaText, SectionTitle, ArrowLink, …)
    ui/binaryMetaText.js typed binary section label ("0001|")
    global/              header, footer, starfield
    landing/             landing-page sections + the full Experience/Projects/About sections reused by pages
    pages/               thin route wrappers (about, work, projects, photography, blog)
    styles/, pages/pageStyles/, animations/   legacy CSS + effects, mostly unused by current routes
public/
  documents/NelsonRodriguez.pdf   resume linked from the header and hero
  blog/*.md                       markdown posts for the (hidden) Writing page
```

### Routes

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `landing/home.js` | Dense overview: hero, impact strip, experience summary, toolkit, selected projects, contact |
| `/about` | `landing/about.js` | Bio + core stack |
| `/work` | `landing/work.js` | Full experience timeline with all bullets |
| `/projects` | `landing/projects.js` | Project cards |
| `/photography` | `pages/photography.js` | Masonry grid from the GCS cloud function |
| `/blog`, `/blog/:slug` | `pages/blog.js` | Under construction; header link is disabled |

## Content: `src/data/profile.js`

All resume-derived content (role, experience, skills, projects, impact numbers, quick facts)
lives in `src/data/profile.js`. The landing page, `/work`, `/projects`, and `/about` read from it.

- When the resume changes, update **both** `public/documents/NelsonRodriguez.pdf` and `profile.js`.
- Every number or claim on the site must be traceable to the resume. Don't invent metrics,
  titles, or availability promises.
- `profile.openToWork` toggles the "Open to new roles" status line in the hero.
- The landing page shows the first 3 jobs and first 3 projects (`limit` props); order the arrays by importance.

## Design system & UI guardrails

The look is **editorial-minimal**: monochrome, generous type, hairline rules, very little decoration.
Build on it; don't introduce a new visual language.

### Color
- Use theme tokens only: `theme.palette.text.primary`, `text.secondary`, `background.default`, `divider`.
  Light = near-black `#111` on off-white `#F1F0EC`; dark = off-white on black `#000`.
- No new accent colors. The only exception is the green status dot (`#2EA043`) in the hero.
  `accentColors` (crimson) in `theme.js` exists but is intentionally unused.
- Every change must look right in **both** light and dark mode.

### Typography
- Headings / display: Baskerville serif stack (`theme.typography.h1.fontFamily`), weight 300.
- Body: Aeonik / system sans (`theme.typography.fontFamily`). Role titles use Geist.
- Labels: `MetaText`, uppercase, `0.72rem`, `letter-spacing: 0.16–0.2em`, `text.secondary`.
- Tech tags: `InlineItem` inside `InlineList` (uppercase, small, no pills/badges).

### Layout & components
- Square corners (`borderRadius: 0`) for buttons, panels, cards. Existing exceptions: the 5px header icon
  hover boxes and the `/projects` cards.
- Structure with **1px hairlines**: `text.primary` for a section's top rule, `divider` between rows.
  No drop shadows except on hover lift.
- Each section starts with a `BinaryMetaText` label + `SectionTitle`. Pages use fixed codes
  (About `0000`, Experience `0001`, Projects `0010`, Photography `0011`, Writing `0100`); the landing page
  numbers its own sections sequentially.
- Buttons: MUI `Button` `contained` (filled) for the primary action, `outlined` for secondary.
- Wrap content in `Container` (handles gutters); use `Section` for full pages and `CompactSection`
  (tighter spacing + top divider) for landing sections.
- The `Starfield` background is optional texture; keep it `ultraSubtle` with low opacity.

### Responsiveness & accessibility
- Must work from 390px phones to wide desktops with **no horizontal scroll**. Grids collapse to one
  column below the `md` breakpoint.
- Use semantic elements (`section`, `nav`, `dl`, `h1`–`h3` in order) and `aria-label` on icon-only links.
- Respect `prefers-reduced-motion` for any new looping animation.
- External links get `target="_blank" rel="noopener noreferrer"`.

## Guardrails

- **Never commit personal documents.** `public/` is deployed verbatim to the live site, so anything in it is
  public. Only the resume PDF belongs in `public/documents/`. Tax forms, IDs, transcripts, and offer letters
  must never be added (three tax PDFs were removed from this folder for this reason).
- No placeholder content on production pages (lorem ipsum, cat images, "Empty Card").
- Do work on a feature branch; `master` is the source branch and `gh-pages` is the deployed build. Don't run
  `npm run deploy` unless Nelson asks to ship.
- `npm run build` must pass before pushing. Don't add new ESLint warnings.
- Keep new dependencies to a minimum; MUI + `styled()` covers almost everything.

## Known issues / backlog

- `package-lock.json` is out of sync with `package.json` (`npm ci` fails: missing `yaml@2.9.1`).
  Regenerate it with `npm install` in a dedicated commit.
- GitHub Pages has no SPA fallback, so a hard refresh on `/work`, `/projects`, etc. likely 404s.
  Fix with a `public/404.html` redirect or move to `HashRouter`.
- Writing/blog page is disabled in the header; `blogData.js` / `blog.js` still reference a cat placeholder image.
- Pre-existing lint warnings: `starfield.jsx` (missing `forceWhite` dep), `landing/projects.js` (duplicate `minHeight`).
- Legacy unused files: `components/styles/*.css`, `components/animations/*`, `landing/navigation.js`,
  `pages/stuff.js`, `global/signature.js`, `public/documents/Notes.txt`, and the stray `p_website.git/` directory.
