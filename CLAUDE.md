# CLAUDE.md

Personal portfolio for Nelson Rodriguez, live at https://nelsonrodriguez.me.
Its job right now is to support a job search: a recruiter or hiring manager should be
able to understand who Nelson is, what he has built, and how to reach him within
~30 seconds on the landing page, then go deeper on the dedicated pages.

This is a living document. Update it when the stack, design rules, or guardrails change.

## Before making any changes: read `website-refactor.md`

[`website-refactor.md`](./website-refactor.md) is the project log and the reference for the design language.
Read it **before** editing anything. It explains why things look and work the way they do, which branch
holds what, what's already been tried or rejected, and what's still open.

- **Before:** read its *Design language*, *Landing page today*, *Branches*, and *Next steps* sections. Build on
  what's there; don't reintroduce something the history says was removed (e.g. impact metrics, a logo row,
  the portrait) unless Nelson asks.
- **After:** update it in the same commit as the change. Add a numbered entry under *History*, refresh
  *Landing page today* / *Design language* if the UI changed, and tick or add items in *Next steps*.
- If this file and `website-refactor.md` disagree, this file's rules win. Fix the log so they match.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Astro 5 (static output) hosting the React 18 app as a `client:only` island (`@astrojs/react`); built with Vite |
| Pages | `src/pages/*.astro`: one HTML file per route, each with its own `<title>`, all wrapped in `src/layouts/Base.astro` |
| Routing | `react-router-dom` v6, `BrowserRouter` inside the island (see `src/App.jsx`), so in-app navigation stays client-side |
| Styling | MUI v5 (`@mui/material`) with `styled()` + theme tokens; Emotion under the hood |
| Theme | `src/theme.js`, light/dark built by `buildTheme(mode)`, persisted in `localStorage.themeMode` |
| Animation | CSS keyframes, `react-typed` (typewriter text), custom `Halftone` canvas background |
| Icons | `@mui/icons-material` |
| Photos | Fetched at runtime from a Google Cloud Function (`cloud-functions/`) backed by GCS |
| Hosting | GitHub Pages via `npm run deploy` (`gh-pages -d dist`) to the `gh-pages` branch; custom domain via `public/CNAME` |
| Language | JavaScript; **any file containing JSX must be `.jsx`** (Vite won't parse JSX in `.js`). TypeScript is installed but unused |

Installed but **not reachable from any route** (only imported by legacy files, if at all): Tailwind helpers (`tailwind-merge`, `clsx`, `src/utils/cn.js`),
`framer-motion` / `motion`, `animejs`, `@tsparticles/*`, `react-animated-cursor`, `react-pdf`, `devicon`,
`hamburger-react`. Don't build on them without a reason; prefer removing them in a dedicated cleanup.

### Commands

```bash
npm ci                          # install exactly what package-lock.json pins
npm start                       # Astro dev server on :4321 (same as npm run dev)
npm run build                   # static build to /dist (must pass before pushing)
npm run preview                 # serve /dist locally
npm run deploy                  # build + publish dist/ to gh-pages (production!)
```

## Project structure

```
astro.config.mjs         Astro config: static output, React integration, site URL
src/
  layouts/Base.astro     HTML shell: meta/OG tags, fonts, index.css, pre-paint theme background script
  pages/                 one .astro file per route (index, about, work, projects, photography, blog, blog/[slug], 404);
                         each renders <App client:only="react" />
  App.jsx                routes + app shell (Header, Main, Footer)
  theme.js               palette, typography, MUI component overrides
  data/profile.js        SINGLE SOURCE OF TRUTH for resume content (see below)
  components/
    ui/primitives.js     layout + type primitives (Container, Section, CompactSection, MetaText, SectionTitle, ArrowLink, …)
    ui/binaryMetaText.jsx typed binary section label ("0001|")
    global/              header, footer, halftone background
    landing/             landing hero (intro.jsx) + the full Experience/Projects/About sections reused by pages
    pages/               thin route wrappers (about, work, projects, photography, blog)
    styles/, pages/pageStyles/, animations/   legacy CSS + effects, mostly unused by current routes
public/                           copied verbatim into dist/ (and so deployed)
  CNAME                           custom domain (nelsonrodriguez.me)
  documents/NelsonRodriguez.pdf   resume linked from the header and hero
  blog/*.md                       markdown posts for the (hidden) Writing page
```

### Routes

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `landing/home.jsx` | Hero (name, typed tagline, pitch, resume/contact buttons, code card, quick facts) closed by a cross rule, then the photography strip. No metrics |
| `/about` | `landing/about.jsx` | Bio + core stack |
| `/work` | `landing/work.jsx` | Full experience timeline with all bullets |
| `/projects` | `landing/projects.jsx` | Project cards |
| `/photography` | `pages/photography.jsx` | Masonry grid from the GCS cloud function. **Locked** while `profile.photographyOpen` is `false`: redirects to `/`, header link disabled ("coming soon") |
| `/blog`, `/blog/:slug` | `pages/blog.jsx` | Under construction; header link is disabled. Post pages come from `blogData.js` (`getStaticPaths` in `src/pages/blog/[slug].astro`) |

**Adding a route:** add the `<Route>` in `App.jsx` *and* a matching `src/pages/<name>.astro` (copy an existing one),
or a direct visit to that URL will 404.

## Content: `src/data/profile.js`

All resume-derived content (role, experience, skills, projects, quick facts)
lives in `src/data/profile.js`. The landing page, `/work`, `/projects`, and `/about` read from it.

- When the resume changes, update **both** `public/documents/NelsonRodriguez.pdf` and `profile.js`.
- Every number or claim on the site must be traceable to the resume. Don't invent metrics,
  titles, or availability promises.
- `profile.photographyOpen` locks or opens `/photography` everywhere (route, header link, landing strip links).
- `profile.openToWork` toggles the "Open to new roles" status line in the hero.
- Keep the landing page uncluttered: roughly one desktop screen, no metrics/impact numbers.
  Experience, projects, and skills belong on their own pages; order those arrays by importance.
- Landing visuals (each in its own file under `components/landing/`):
  - Cross rule (`ui/crossRule.jsx`): a hairline with small "+" marks at both ends. On load the line grows out
    from the middle to both ends, then the marks fade in as it arrives.
    It's the site's divider motif: the header's bottom edge, and the line that closes the hero (below both columns,
    above the photo strip). Reuse it for new dividers
    rather than inventing another. No labels or clocks on it (location/local-time labels were removed as bloat).
  - `codeCard.jsx`: a monochrome card (`nelson.ts`) that types out a short, **company-agnostic** snippet about
    Nelson: base, iced coffee, hybrid training, photography and cars, and a `kaizen()` that compounds 1% a day.
    Keep it personal, truthful (only interests stated elsewhere on the site), and under ~38 characters a line so
    nothing wraps on phones. No employer code or branding.
  - `photoStrip.jsx`: four of Nelson's photos (grayscale, color on hover), linking to `/photography` only while it's open. It shares
    `global/usePhotos.js` with the photography page and renders nothing if the photo service fails.
- Hero layout: two columns (pitch on the left; code card and quick facts on the right). The buttons sit directly
  under the status line, not pinned to the column bottom, so the leftover space collects in the lower-left
  corner as deliberate negative space. Don't fill it.
- The hero has equal space above and below its content, between the two cross rules (`HERO_GAP` in
  `intro.jsx`: 72px desktop, 40px phones). Change both sides together. The hero doesn't stretch to the screen
  height, so the spacing is the same on every screen.
- No headshot/portrait on the landing page for now. The picture version is saved on the `landing-picture-pending` branch.

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
- Body: Aeonik / system sans (`theme.typography.fontFamily`). Role titles on `/work` use Geist.
- Technical: IBM Plex Mono for anything "code": the code card and the "Open to new roles" status line.
- Hero name: the serif at weight 300, `clamp(2.4rem, 3.6vw, 3.8rem)`. No job title under it.
- Header: Nelson's name in the serif (weight 400) on the left, linking home; social links live only in the footer.
  Nav links in the sans at weight 400 (not bold), with 1px `divider` hairlines between items and before the theme
  toggle, on desktop and in the mobile strip. On phones the name and theme toggle share the top row and the nav
  becomes a swipeable strip underneath (current page underlined).
- Locked pages (Writing, and Photography while `photographyOpen` is false) use `LockedNavItem` in `header.jsx`:
  the link does nothing and a small square note (inverted colors, normal tracking) shows on hover or focus.
  Locked items are hidden in the mobile strip.
- **No all-caps text, anywhere.** Never use `textTransform: 'uppercase'` (or CSS `text-transform: uppercase`),
  and never type words in capitals for styling. Use sentence case for labels, buttons, links, and tags.
  Real acronyms (SDK, SQL, iOS, .NET) are fine. MUI's `button` and `overline` variants are set to
  `textTransform: 'none'` in `theme.js`; keep it that way.
- Base size: `html { font-size: 93.75% }` (15px; 110% from 2560px) in `src/index.css`. Text sizes are in `rem`, so
  change the base to scale all text at once, rather than editing sizes one by one.
- Keep letter-spacing near normal (`0`–`0.02em`); the wide tracking that went with caps is gone too.
- Labels: `MetaText`, sentence case, `0.82rem`, weight 500, `text.secondary`.
- Tech tags: `InlineItem` inside `InlineList` (sentence case, small, no pills/badges).

### Layout & components
- Square corners (`borderRadius: 0`) for buttons, panels, cards. Existing exception: the `/projects` cards.
  Footer social icon hover boxes are square too.
- Theme toggle (`animations/themeToggle.jsx`): a square button with a half-filled circle that turns 180° when the
  theme flips, and a "Switch to dark/light mode" label on hover (hover-capable devices) or keyboard focus.
  It's 44px on phones. Any new header popup must stay above the header's cross rule (the toolbar is `zIndex: 2`).
- Structure with **1px hairlines**: `text.primary` for a section's top rule, `divider` between rows.
  No drop shadows except on hover lift.
- Each section starts with a `BinaryMetaText` label + `SectionTitle`. Pages use fixed codes
  (About `0000`, Experience `0001`, Projects `0010`, Photography `0011`, Writing `0100`); the landing page
  numbers its own sections sequentially.
- Buttons: MUI `Button` `contained` (filled) for the primary action, `outlined` for secondary.
- Reading width: long text on wide pages stops at half the window. On `/work`, each role's summary and bullets
  are capped at `50vw` from `md` up (full width on phones).
- Wrap content in `Container` (handles gutters); use `Section` for full pages. (`CompactSection` and
  `SectionHeaderRow` in `primitives.js` are currently unused; they served the old overview sections.)
- Background texture: every page section uses `<Halftone />` (`global/halftone.jsx`), a canvas grid of small
  squares whose opacity follows slowly drifting cloud noise. It reads `text.primary` and the peak opacity
  (0.17 light, 0.25 dark) from the theme. Its parent needs `position: relative` and `overflow: hidden`, with
  content above it at `zIndex: 1`. The header and footer stay plain. No mouse ripples (tried in entry 15 of the
  log and removed). The old `Starfield` was removed.
- Cursors: chunky Figma-style arrow and hand (SVG data URIs in `theme.js`, `CURSOR_ARROW` / `CURSOR_HAND`),
  applied only on `pointer: fine` devices; the hand covers links, buttons and `role="button"`.

### Responsiveness & accessibility
- Must work from 360px phones to wide desktops with **no horizontal page scroll** (the mobile header nav
  strip is the one intentional sideways scroller). Grids collapse to one
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
- `npm run build` must pass before pushing. Don't add new build warnings.
- Keep new dependencies to a minimum; MUI + `styled()` covers almost everything.

## Known issues / backlog

- Astro migration, stage 1 only: the whole React app still runs as one client-side island on every page, so
  pages ship no pre-rendered content (search engines and link previews see an empty body). Stage 2 is to
  convert sections to `.astro` progressively, keeping React only for interactive pieces.
- Writing/blog page is disabled in the header; `blogData.js` / `blog.js` still reference a cat placeholder image.
- Pre-existing build warning: `landing/projects.jsx` (duplicate `minHeight`). There's no ESLint step since
  leaving CRA; treat new Vite/esbuild warnings in `npm run build` as the bar instead.
- Legacy unused files: `components/styles/*.css`, `components/animations/*`, `landing/navigation.jsx`,
  `pages/stuff.jsx`, `global/signature.jsx`, `public/documents/Notes.txt`, and the stray `p_website.git/` directory.
