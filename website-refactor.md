# Website refactor

Running record of the nelsonrodriguez.me refresh: goals, design language, decisions, what changed, and what's
still open. Hard rules and guardrails live in [`CLAUDE.md`](./CLAUDE.md); this file explains the thinking
behind them and keeps the history.

**Read this before making changes, and update it in the same commit** (see `CLAUDE.md`).

## Goals

- Support an active job search: a recruiter should understand who Nelson is, what he's built, and how to
  reach him within ~30 seconds on the landing page.
- Reflect the updated resume (`public/documents/NelsonRodriguez.pdf`), with the current role as
  **Solutions Engineer at Fullstory** (Dec 2025 – present; shown as Forward Deployed Engineer until entry 32).
- Make the content easy to scan and make the technical depth obvious.
- Give the landing page visual richness without filler; keep detail on the dedicated pages.
- Keep the existing pages: About, Experience (`/work`), Projects, Photography.
- Document the stack, design language and guardrails in `CLAUDE.md`.
- Move off Create React App (deprecated) to a framework that ships real pages: Astro (entry 25).

## Tech stack

The site is a **static Astro site that runs a React app inside each page**. Astro builds one HTML file per
route; React (with MUI for styling) draws everything on the page in the browser. This is stage 1 of the
migration (entry 25): Astro owns the build, routing files and HTML shell, React still owns the UI.

| Layer | What we use | Notes |
| --- | --- | --- |
| Framework / build | **Astro 5** (5.18), static output, Vite 6 under the hood | `astro.config.mjs`. Replaced Create React App (`react-scripts`) in entry 25 |
| Pages | `src/pages/*.astro`, wrapped in `src/layouts/Base.astro` | One file per route: index, about, work, projects, photography, blog, `blog/[slug]`, 404. Each sets its own `<title>` |
| UI | **React 18** (18.3), mounted with `client:only="react"` via `@astrojs/react` 4 | The whole app is one island on every page; nothing is pre-rendered yet |
| In-app routing | `react-router-dom` 6, `BrowserRouter` in `src/App.jsx` | Clicking a link swaps pages inside React, no reload. A new route needs both a `<Route>` and a `.astro` page |
| Styling | **MUI 5** (`@mui/material`) with `styled()` and theme tokens; Emotion under the hood | Square corners, hairlines, sentence case; see *Design language* |
| Theme | `src/theme.js`: `buildTheme(mode)` for light and dark, saved in `localStorage.themeMode` | `Base.astro` paints the saved background before React loads, so dark mode doesn't flash white |
| Fonts | Serif: Baskerville system stack. Sans: Aeonik if installed, else the system sans. Mono: IBM Plex Mono (Google Fonts). Geist (self-hosted in `public/fonts/`) for role titles | Baskerville and Aeonik aren't shipped with the site, so devices without them show Times/Garamond and the system sans |
| Motion and texture | `Halftone` canvas background (`global/halftone.jsx`), CSS keyframes, `react-typed` for the typed tagline, a custom typing effect in the code card | Everything respects `prefers-reduced-motion` |
| Cursors | SVG data-URI arrow and hand in `theme.js` | Mouse/trackpad only (`pointer: fine`) |
| Content | `src/data/profile.js` | Single source of truth for resume content and site flags (`openToWork`, `photographyOpen`) |
| Photos | Google Cloud Function (`cloud-functions/`, Node) listing a Cloud Storage bucket; fetched by `global/usePhotos.js` | Shared by the landing strip and the (locked) photography page |
| Hosting | GitHub Pages, `gh-pages` branch, custom domain from `public/CNAME` | `npm run deploy` builds and publishes `dist/` with a `.nojekyll` file, so GitHub's Jekyll step doesn't drop the `_astro/` folder |
| Language | JavaScript; files with JSX are `.jsx` | TypeScript is installed but unused |

### How a page loads

1. GitHub Pages serves the route's own file, e.g. `dist/work/index.html` for `/work`. This is why deep links
   and refreshes work now; under CRA there was only one `index.html`, so `/work` returned GitHub's 404.
2. The HTML has the page title, meta and Open Graph tags, fonts, and a tiny script that sets the
   background color for the saved theme. The body is otherwise empty.
3. The React bundle (about 112 kB gzipped) loads and renders the header, the page and the footer.
4. From there, clicking a nav link changes pages inside React without loading new HTML.

### Commands

```bash
npm ci            # install exactly what package-lock.json pins (works again since entry 25)
npm start         # dev server on http://localhost:4321 (same as npm run dev)
npm run build     # static build to dist/; must pass before pushing
npm run preview   # serve dist/ locally
npm run deploy    # build + publish dist/ to gh-pages (production)
```

### What changed from Create React App

| | Before (CRA, on `react-back-up-branch`) | Now (Astro) |
| --- | --- | --- |
| Build tool | `react-scripts` 5 (webpack), deprecated | Astro 5 + Vite |
| HTML | One `public/index.html` for every URL | One generated HTML file per route |
| Deep links on GitHub Pages | Refreshing `/work` returned a 404 | Every route loads directly |
| Page titles | "Nelson Rodriguez" everywhere | Per page, e.g. "Experience · Nelson Rodriguez" |
| Entry point | `src/index.js` | `src/pages/*.astro` mounting `App.jsx` |
| Output folder | `build/` | `dist/` |
| Dev server | `:3000` | `:4321` |
| Lint | CRA's built-in ESLint | None yet; new build warnings are the bar |
| Tests | CRA's default test (failing) | Removed |

### Where it's heading (stage 2)

Convert the static parts (About, Experience, Projects, footer, most of the hero) into `.astro` components
that Astro renders to real HTML at build time, and keep React only as small islands for the interactive
pieces: the theme toggle, typed tagline, halftone, code card and photos. That's what makes pages readable by
search engines and link previews and faster to show. MUI would be replaced by plain CSS with the same tokens
as it goes.

## Design language

The site reads like a **printed editorial layout with an engineer's precision**: monochrome, generous type,
thin rules, and a few quiet, purposeful motions. Every element should either say something true about Nelson
or give the page structure. Nothing is decoration for its own sake.

Since entry 26 the frame is a **sidebar + feed** (inspired by Sidharth Sabu's portfolio): a calm, fixed left
column says who Nelson is, and the right side shows the work as big textured tiles. The sidebar is quiet; the
tiles carry the energy.

### Principles

1. **Monochrome first.** Near-black on off-white (light) and off-white on black (dark), using theme tokens only.
   Color comes from content, never from UI chrome: photos regain color on hover, and the green "open to new
   roles" dot is the only accent.
2. **Hairlines for structure.** 1px rules replace boxes and shadows. A section's top rule uses
   `text.primary`; rows inside it are separated with `divider`.
3. **Square geometry.** No rounded corners on buttons, cards, panels, photos or social icon boxes. The `/projects`
   cards are the one existing exception.
4. **Type does the work.** The serif only for Nelson's name and page section titles, a clean sans for
   everything else, and a monospace face for small "data" (the clock, tile details).
   **Two-tone text** carries the hierarchy: grey for connecting words, full-strength for what matters.
5. **Sentence case, normal tracking.** No all-caps anywhere and no wide letter-spacing. Acronyms like SDK, iOS
   and .NET keep their real capitals.
6. **Motion with a reason.** Things draw or type in once, on load, and then settle. Looping motion is limited
   to a typing cursor, the status-dot pulse, and the slow halftone drift in the background. All of it respects `prefers-reduced-motion`.
7. **Real over illustrative.** Real numbers from the resume, a real public SDK snippet, and Nelson's own
   photographs. No placeholders, stock imagery, invented metrics or headshots (for now).

### Typography

| Role | Face | Where |
| --- | --- | --- |
| Display | Baskerville serif stack | Nelson's name in the sidebar (weight 400), section titles (`SectionTitle`, weight 300) |
| Body | Aeonik / system sans | Sidebar text, nav, paragraphs, buttons; feed tile titles (large, weight 400, tight tracking) |
| Role titles | Geist | Job titles on `/work` |
| Technical | IBM Plex Mono | Sidebar clock time, feed tile meta / description / stack, "soon" tags, code card |
| Labels | `MetaText`: sans, `0.82rem`, weight 500, `text.secondary` | Fact labels, frame labels, dates, small headings |

### Signature elements

- **Sidebar** (`global/sidebar.jsx`): fixed left column with a hairline on its right edge. Name (serif; chrome
  sheen and a "that's me :)" note on hover),
  tagline ("Computer Enjoyer · Engineer", then "Georgia Tech CS" below, gold on hover), a two-line bio, a *now* block (`→ Solutions Engineer at Fullstory`, green-dot "Open to new
  roles"), "Previously at …", "Reach out via email, or read my resume", plain-text social links, and a live
  clock ("Currently Atlanta, GA · 17:03:30", Eastern time, mono figures). Socials stacked, brand-colored on hover.
  Nav pinned to the bottom with the theme toggle at its right; a filled square marks the current page, locked pages are greyed with a mono "soon".
- **Project tiles** (`landing/projectFeed.jsx`): each project is a tile with its own halftone texture, a mono
  top row (`01 :: iOS application` · date), a big sans title, and the description and stack in small mono.
  The first tile is a full-width cover; the rest pair up. The border darkens and the ↗ nudges on hover.
- **Halftone texture** (`global/halftone.jsx`): drifting cloud squares behind every page and tile.
- **Binary section labels** (`BinaryMetaText`): "0000", "0001" and so on type in above each page's title.
- **Employer logos on `/work`**: monochrome silhouettes (an SVG mask over the text color) in place of
  employer names, so they follow light and dark mode.
- **Theme toggle**: a square button with a half-filled circle (the contrast symbol) that turns 180° when the
  theme flips, with a "Switch to … mode" label on hover or keyboard focus. 44px on phones.

Kept in the codebase but not shown since entry 26: the **code card** (`landing/codeCard.jsx`, a typing
`nelson.ts` "about me" with a `kaizen()` that compounds 1% a day), the **cross rule** (`ui/crossRule.jsx`),
the **photo strip** (`landing/photoStrip.jsx`) and the old hero (`landing/intro.jsx`) with its quick facts.

### Layout and responsiveness

- Desktop: `Page` is a row; the sidebar (`clamp(300px, 26vw, 400px)`) is sticky at full height and the content
  column scrolls beside it. Page content sits in `Container` (40px side gutters on desktop, 16px on phones).
- Home feed: 24px padding, 12px gaps, lead tile `clamp(380px, 64vh, 680px)` tall, the rest
  `clamp(300px, 44vh, 460px)`.
- Below the `md` breakpoint a sticky bar (name, toggle, menu) replaces the sidebar, with a full-screen menu and a
  typed intro above the feed on `/`; the feed and other grids become one column (entry 36).
- No horizontal page scrolling at any width from 360px up (measured at 360px on `/`, `/work`, `/about` and
  `/projects` after entry 26).

## Home page today (`/`)

| Piece | File | Contents |
| --- | --- | --- |
| Sidebar | `global/sidebar.jsx` | Name, tagline, bio, now, previously, contact, socials, Atlanta clock, theme toggle, nav (on every page) |
| Feed | `landing/projectFeed.jsx` | One tile per project from `profile.projects`: Zenith (lead), Running Sonification Engine, Nexus |
| Texture | `global/halftone.jsx` | One halftone per tile |

All text content comes from `src/data/profile.js` (sidebar copy: `tagline`, `bio`, `previously`, `timeZone`).

## Branches

| Branch | Purpose |
| --- | --- |
| `landing-page-redesign` | Everything through entry 11, without the portrait; merged into `master` on Oct 15 |
| `halftone-background` | Entries 12–24: halftone background, custom cursors, smaller text and name, no hero job title (ripples tried and removed); merged into `master` on Oct 16 |
| `react-back-up-branch` | Snapshot of `master` right before the Astro migration (`dc471b5`): the last Create React App version |
| `website-migration` | Entry 25: the Astro port; merged into `master` on Oct 16 (via `sidebar-redesign`) |
| `sidebar-redesign` | Entry 26: sidebar + project feed layout; merged into `master` on Oct 16 |
| `landing-picture-pending` | Nelson's full version with the portrait frame, saved for later |
| `landing-picture-local` | Temporary copy used for the merge; safe to delete |
| `master` | Source branch, now on Astro with the sidebar layout. [Yugenero/p_website#2](https://github.com/Yugenero/p_website/pull/2) merged the early redesign; later work was merged directly |
| `gh-pages` | The deployed build. Last deployed Oct 12, before the frame, code card and photo strip |

The working branch was first created as `claude/confident-johnson-s9lfcl`, then renamed to
`landing-page-redesign`. Branch names describe the work.

## History

### 1. Densified landing page (`8826ba5`)

The original landing page was a full-screen "hi, i'm nelson" hero and nothing else. It became a long
overview: hero, impact metrics, experience summary, toolkit, selected projects and a contact band. This
commit also added `CLAUDE.md`, `src/data/profile.js` and the shared primitives (`ArrowLink`,
`SectionHeaderRow`, `CompactSection`).

### 2. No all-caps text (`20a7f04`)

Uppercase styling was removed site-wide (labels, tags, buttons, links, MUI `button` and `overline`),
letter-spacing went back to near normal, and small labels grew from 0.72rem to 0.82rem. This became a
`CLAUDE.md` rule.

### 3. Trimmed to the hero (`5966aea`, Nelson)

The overview sections and impact metrics were removed; the landing page became a single-screen hero, with
detail on the dedicated pages.

### 4. Name and title heading (`8c1eeb3`)

"hi, i'm nelson" became **Nelson Rodriguez / Forward Deployed Engineer**, with the typed tagline kept in
full underneath.

### 5. Visual fidelity (`7c637db`)

The hero frame, the code card and the photography strip were added. A logo row was considered and left out.

### 6. Nelson's UI pass, merged without the portrait (`143ddf2`, `91907d0`, merged in `b7b5944`)

- Job title on its own line in a smaller sans; status line moved under the pitch in monospace.
- New pitch and Fullstory bullets (solutions engineering, proofs of concept, AI and automation workflows).
- Quick facts: new Focus, a Georgia Tech link, "Open to relocation".
- Employer logos on `/work`; square social icons; mobile header nav strip; bigger tap targets.
- The portrait frame, `profile.photo` / `photoRatio` and `me-ny.jpg` were left out of this branch and kept on
  `landing-picture-pending`. The code card took the portrait's place.

### 7. Docs: design language and "read this first" rule (`e4c3419`, `4ce49d4`)

Added the *Design language* section here, and a `CLAUDE.md` rule to read this log before any change and
update it alongside every change.

### 8. Cross rule replaces the hero frame

The top hairline and the location / local-time labels were removed as bloat. The bottom line with "+"
marks became a reusable `CrossRule` and now also forms the header's bottom edge, so the header and the hero
share one divider motif. `heroFrame.js` was deleted, and the hero got a little more top padding to make up
for the removed labels row.

### 9. Cross rule draws from the center

The line now grows out from its middle to both ends, and the "+" marks fade in as it reaches them
(about 0.8s in), on both the header and the hero.

### 10. Personal code card, square photos, bigger header icons

- The code card no longer shows Fullstory's SDK. It's now `nelson.ts`, a company-agnostic snippet built
  from the interests in the hero tagline, with a working `kaizen()` (1.01^365 ≈ 37.78).
- Photos on `/photography` lost their rounded corners (square, like the rest of the site).
- Header social icons scale up on desktop: 1.45rem from the `md` breakpoint and 1.65rem from `lg`
  (previously 1.1rem, which read as tiny on 1440px and Retina screens), with a slightly wider gap.

### 11. Simpler theme toggle

The old toggle (rounded box, nested rings and a dot) was replaced with a square button and a half-filled
circle that turns 180° on switch, plus a "Switch to … mode" hover label. The label shows only on
hover-capable devices or keyboard focus, never stuck after a click. The button sizes are 2.35rem, 2.6rem
from `lg`, and 44px on phones. The header toolbar was raised above the cross rule so the label isn't
cut by the line.

### 12. Halftone background in the hero

Inspired by the square "cloud halftone" background on nahiyan.codes (a hand-written 2D canvas, no library).
`global/halftone.jsx` redraws the idea from scratch: 4px squares on a 7px grid, with opacity taken from
domain-warped value noise and stepped into six levels, so it reads as banded clouds with empty gaps. It
drifts slowly at about 10fps, uses `text.primary` so it flips with the theme (alpha 0.11 light, 0.16 dark),
caps the canvas at about 1.8M pixels, and stops redrawing when off screen, in a hidden tab, or with reduced
motion on (it then shows one still frame). The original's RGB-split glitch was left out to stay monochrome.
It replaces the starfield in the landing hero only; other pages keep the starfield for now.

### 13. Halftone on every page; starfield removed

The halftone replaced the starfield everywhere: About, Experience, Projects, Photography, the footer, and
the header (which now has it in light mode too, where the starfield was dark-only). `Halftone` now reads its
color and opacity from the theme, so each use is just `<Halftone />`, or `<Halftone subtle />` (70% opacity)
in the header and footer. `starfield.jsx` was deleted, which also cleared its old lint warning.

### 14. Plain header and footer

The halftone was taken back out of the header and footer at Nelson's request, so it only sits behind page
content. The `subtle` prop went with it.

### 15. Water ripples and chunky cursors

- Moving the mouse over the halftone spawns ripples (every 60px of travel or 220ms). Each is a short train of
  waves that spreads 220px over 1.6s and fades: crests push squares outward, grow them and light them
  (white in dark mode, black in light), troughs shrink and dim them. A first version used blue/orange
  colored rings; Nelson preferred colorless water, so color was dropped. While ripples are live the canvas
  redraws every frame, then drops back to the 10fps cloud tick. Mouse only; off with reduced motion.
- New cursors in `theme.js`: a thick near-black arrow with a white outline (like Figma's) and a matching hand
  (Material's PanToolAlt shape) on links and buttons. Only on fine pointers, so touch devices are unaffected.

### 16. Smaller text, narrower experience bullets

- All text is about 12% smaller: the root font size went from 106.25% (17px) to 93.75% (15px), and from
  125% to 110% on 2560px+ screens. Sizes are in `rem`, so titles, body, labels, nav and the code card all
  scaled together. The hero name and job title also scale with screen width, so their `vw` values were cut by
  the same ratio (5.2vw → 4.6vw, 1.9vw → 1.7vw).
- On `/work`, each role's summary and bullets stop at half the window width (`50vw`) from the `md`
  breakpoint up, so lines stay a readable length on wide screens. Phones keep the full width.

### 17. Ripples removed

The mouse ripples from entry 15 were taken out at Nelson's request; `halftone.jsx` is back to the plain
drifting clouds. The chunky cursors stay.

### 18. No job title in the hero, smaller name

The "Forward Deployed Engineer" line under the name was removed from the landing hero (it's still on
`/work` and in `profile.role`). The name shrinks on wide screens: `clamp(2.4rem, 3.6vw, 3.8rem)`, down
from `4.6vw` capped at `5.4rem`, so about 52px instead of 66px at 1440px. Phones are unchanged (the
2.4rem floor).

### 19. Even spacing between the hero's rules

The hero content now has the same gap above and below it, measured from the header's cross rule and the
hero's closing cross rule: 72px on desktop, 40px on phones (`HERO_GAP` / `HERO_GAP_MOBILE` in `intro.js`).
Before it was about 64px above and 40px below, and the hero also filled the screen height with its content
centered vertically, so taller screens added extra space above. That vertical centering was removed, so the gaps stay equal
at every screen height.

### 20. Buttons under the status line

The *View resume* / *Get in touch* buttons used to be pinned to the bottom of the left column (level with the
last quick-fact row), which left a gap of about 200px under "Open to new roles" that read as leftover space.
They now sit 36px under the status line, so the left column reads as one block and the open space collects
in the lower-left corner as deliberate negative space.

### 21. Serif header nav with hairline separators

To make the header read more formal, the nav links now use the Baskerville serif (same as the name and section titles)
at weight 400 instead of the bold sans, with no letter-spacing. Short 1px `divider` hairlines (1.1em tall)
separate the items and the theme toggle, using a `::before` on each nav child after the first. The same
treatment applies to the mobile swipe strip. Link padding grew to 14px a side to give the lines room, and
the hover underline was re-aligned to match.

### 22. Name in the header; nav back to the sans

- The social icons in the top left were replaced with Nelson's name in the serif (1.45rem, 1.35rem on
  phones), linking to `/`. Email, LinkedIn, GitHub and Instagram are still in the footer.
- The nav links went back to the sans (0.95rem, 1rem on phones) but stay at regular weight with the hairline
  separators from entry 21. Serif for the name, sans for navigation.
- On `/` the name now appears twice (header and hero).

### 23. Photography page locked

`/photography` is locked behind one flag, `profile.photographyOpen` (now `false`). While it's locked, the route
redirects to `/`, and the header link is disabled with a "coming soon" note on hover, using the same pattern as
Writing (now a shared `LockedNavItem`; both are hidden in the mobile strip). The landing photo strip
still shows the four photos but drops "View all" and isn't a link. The locked-item note was made square
with normal tracking to match the design rules. Set the flag to `true` to reopen everything.

### 24. Stronger halftone

The halftone's peak opacity went up about 55%: 0.11 → 0.17 in light mode (darker squares) and 0.16 → 0.25 in
dark mode (brighter squares), so the texture reads clearly without competing with the text.

### 25. Astro migration, stage 1 (`website-migration`)

Moved the build from Create React App (deprecated, unmaintained) to **Astro 5** without changing how the site
looks. Before starting, `halftone-background` was merged into `master`, and `react-back-up-branch` saves that
exact CRA state.

- **How it works:** every route has its own `src/pages/*.astro` file that renders the existing React app as a
  `client:only="react"` island inside `src/layouts/Base.astro`. The build writes a real HTML file per route
  (`dist/work/index.html`, …), so **opening or refreshing a deep link no longer 404s** on GitHub Pages.
  Inside the island, `react-router` still handles navigation, so moving between pages stays instant.
- **Per-page titles and canonical URLs**, e.g. "Experience · Nelson Rodriguez". Blog post pages come from
  `blogData.js` via `getStaticPaths`; unknown URLs get a real `404.html`.
- **No dark-mode flash:** a tiny inline script in `Base.astro` paints the saved theme's background before
  React loads.
- **Cleanup that came with it:** files containing JSX were renamed `.js` → `.jsx` (Vite only parses JSX
  in `.jsx`); CRA's `index.js`, `reportWebVitals.js`, `setupTests.js`, the default failing `App.test.js`,
  `public/index.html`, `react-scripts`, the testing libraries and `web-vitals` were removed; `CNAME` moved into
  `public/` so every deploy carries the custom domain; `package-lock.json` was regenerated and `npm ci` works
  again. Deploy now publishes `dist/` instead of `build/`, with `--nojekyll` (added before the first Astro
  deploy: GitHub Pages' Jekyll step ignores `_` folders, which would have dropped `_astro/` and all the JS).
- **Checked:** `npm run build` passes (same single `projects.jsx` warning as before); every route returns 200
  from a plain static server with no SPA rewrites, `/nope` returns 404; the home page (light) and `/work`
  (dark, loaded directly) look the same as the CRA build; `npm start` serves all routes.
- **Not done yet (stage 2):** the pages are still rendered entirely in the browser, so the HTML has no
  content for search engines or link previews. Next is converting static sections (About, Experience,
  Projects, footer) to `.astro` with real HTML, keeping React only for the theme toggle, typed text,
  halftone, code card and photos.

### 26. Sidebar + project feed (`sidebar-redesign`)

Reworked the frame after a reference Nelson liked (Sidharth Sabu's portfolio): a fixed left sidebar with
identity and nav, and a feed of big tiles on the right.

- **Sidebar replaces the header and footer** (`global/sidebar.jsx`; `header.jsx` and `footer.jsx` deleted).
  It holds everything the hero and footer used to: name (still the serif), a new tagline and two-line bio
  (written only from claims already on the site), the *now* block with the green open-to-work dot,
  "Previously at Civic Digital Experience, eKlozet, GT WebDev", email and resume links, LinkedIn / GitHub /
  Instagram as text, and the theme toggle. Nav moved to the bottom of the sidebar with a filled-square marker.
- **Live clock is back**, by request: "Atlanta, GA · HH:MM:SS" in Eastern time (`profile.timeZone`). A static
  site can't know where Nelson physically is, so it uses his base. (A location/time label was removed in
  entry 8 as bloat; this one is part of the sidebar's design rather than decoration on a divider.)
- **Home is now a project feed** (`landing/projectFeed.jsx`), projects only: Zenith as a full-width cover
  tile, then two side by side. Each tile has its own halftone, mono details and a big sans title, and links to
  the repo.
- **Code card kept but not shown**, per Nelson; same for the old hero, cross rule and photo strip.
- **Dark mode's secondary text** changed from `#E0E0E0` to `#A3A3A3`. The old value was nearly white, so
  the grey/white two-tone hierarchy (and labels and dates everywhere in dark mode) barely read.
- Nelson then changed the clock's label to "Currently Atlanta, GA" (`profile.location`, `16a7534`).
- **Checked:** build passes (same old `projects.jsx` warning); screenshots of home (light and dark),
  `/work` (dark) and the phone layouts; no horizontal overflow at 360px on four pages.

### 27. Fix: blank page in the dev server

`npm start` showed only the background color (black in dark mode) on every page. The browser console had
`[astro-island] Error hydrating /src/App.jsx TypeError: createTheme_default is not a function`. Production builds
were fine, which is why `npm run build` and the static-server checks in entries 25 and 26 didn't catch it; the
dev server was only checked for HTTP 200, never rendered.

- **Cause:** the dev server scans every file in `src/` for dependencies, including dead ones. The unused legacy
  `landing/navigation.jsx` imported four `@mui/icons-material/<Icon>` files, which are CommonJS and `require()`
  MUI's CommonJS build of `@mui/system`. Mixed with the ES-module MUI the site uses, esbuild wrapped the shared
  modules in lazy initializers, and other chunks called `createTheme` before it was initialized.
- **Fix:** deleted `landing/navigation.jsx` (nothing imported it). An `optimizeDeps.include` list was tried
  first and didn't help, so it wasn't kept.
- **Checked:** dev server renders `/`, `/work` and `/about` with no hydration errors (headless Chrome, console
  captured), and a screenshot of `/` in dev.
- **Rule added to `CLAUDE.md`:** load the dev server in a browser before pushing, and delete dead files rather
  than leaving them in `src/`.

### 28. Chrome name hover

Hovering Nelson's name in the sidebar turns it brushed chrome and sweeps a bright streak across it once, and a
small "that's me :)" note appears beside it (styled like the theme toggle's label). The metal is grey-scale
only: banded light/dark reflections with a narrow specular streak, as a gradient clipped to the text, with
separate stops for light and dark mode (light mode tops out at mid-grey so letters don't vanish into the
page). A first, softer gradient read as a plain fade, so the bands and streak were strengthened. Mouse and
keyboard focus only; reduced motion shows the chrome without the sweep. Checked with real mouse hovers via
Chrome DevTools in both themes, plus the dev server.

### 29. Darker light-mode tiles, brand-colored socials, toggle moved

- Halftone peak opacity in light mode 0.17 → 0.22 (squares a bit darker); dark mode unchanged at 0.25.
- LinkedIn, GitHub and Instagram are stacked vertically. On hover each takes its brand color with a thin
  underline drawing in from the left: LinkedIn blue (`#0A66C2`, or `#70B5F9` in dark mode, since the standard
  blue is dim on black), GitHub full black/white (its brand has no color), Instagram its orange-pink-purple
  gradient on both text and underline. A deliberate, hover-only exception to the no-accent rule.
- The theme toggle moved from beside the clock to the bottom-right of the sidebar, level with the nav, like a
  settings control. The top-right corner would have collided with the name's "that's me :)" note. Its label
  now opens upward there (`ThemeToggle tipPlacement="top"`). On phones it stays beside the name.
- Checked with real mouse hovers via Chrome DevTools in both themes, plus the dev server.

### 30. GitHub hover in green

At Nelson's request, GitHub's hover color changed from plain black/white to GitHub's greens: `#7EE787` (light
green) in dark mode and `#2DA44E` in light mode, where a paler green wouldn't read on the off-white page.

### 31. New tagline, animated email/resume links

- Tagline is now "Computer Enjoyer · Engineer · Georgia Tech CS" (Nelson's wording and capitals), with
  "Georgia Tech CS" linking to the College of Computing. `profile.tagline` became a list plus `profile.school`.
- Email and resume (and the school link) use the same thin underline that draws in from the left as the
  socials, replacing the static grey border. Email also turns light red on hover (`#D9473F` light,
  `#FF8A80` dark).
- These links don't wrap mid-link: the underline is positioned against the link's box, which breaks across
  lines (it didn't show on "Georgia Tech CS" when it split), so at sidebar width the school moves to its own line.

### 32. Title: Solutions Engineer at Fullstory

At Nelson's request the Fullstory title changed from Forward Deployed Engineer to **Solutions Engineer**
everywhere it appears: the sidebar's *now* line (`profile.role`), the `/work` entry (`workExperience[0].title`),
the About paragraph, and the page meta description in `Base.astro`. Checked in the dev server: `/`, `/work`
and `/about` show "Solutions Engineer" and no "Forward Deployed". **The resume PDF still says Forward Deployed
Engineer**; Nelson will update it, then it should replace `public/documents/NelsonRodriguez.pdf`.

### 33. Georgia Tech CS on its own line, in Tech Gold

"Georgia Tech CS" moved to its own line under "Computer Enjoyer · Engineer" (always, not only when it wraps), and
turns Georgia Tech's Tech Gold on hover, underline included: `#B3A369` in dark mode and GT's Tech Dark Gold
`#857437` in light mode, where the standard gold is too pale on the off-white page.

### 34. Fullstory and Civic links

- **Fullstory** in the *now* line uses the animated underline, drawn in Fullstory's brand green (`#07C799`
  in dark mode, their darker `#059573` in light mode, both taken from fullstory.com). Only the underline is
  green; the word keeps its normal color.
- **Civic Digital Experience** in "Previously at" now links to its LinkedIn company page and turns light blue
  on hover (`#8CCBFF` dark, `#2B8FD6` light). `profile.previously` became a list of `{ name, href?, tone? }`.
- Checked both with real mouse hovers in light and dark mode, plus the dev server.

### 35. Fullstory hover: darker green text and underline

Fullstory now turns green on hover, text and underline together, in a darker green than entry 34's underline:
`#11AB85` in dark mode (from fullstory.com's palette) and `#047A5E` in light mode (a deeper shade of their
`#059573`, so it reads on off-white). The underline follows the text color.

### 36. Phone layout: sticky bar, full-screen menu, typed intro

On phones the sidebar used to stack on top and fill the first screen before any work showed. Phones now get
their own layout, following content-first mobile patterns; desktop is unchanged.

- **Sticky bar** (`global/mobileHeader.jsx`): name, theme toggle and a menu button (two bars → X), 56px tall.
- **Full-screen menu**: large nav rows with hairlines and the square marker (locked pages greyed with "soon"),
  then role / open to work, previously at, Georgia Tech CS, Email · Resume, LinkedIn · GitHub · Instagram,
  and the clock. Closes on navigation, Escape or the button; locks page scroll; moves focus in and back out.
- **Home intro** (`landing/mobileIntro.jsx`): brings back the typed tagline from the old hero, now cycling
  "Solutions Engineer at Fullstory." (built from `profile.role`/`company`) and the five old lines
  (`profile.typedLines`), so one line carries what the sidebar spreads over several blocks. Then the green-dot
  status and two buttons, "Email me" and "Resume". Reduced motion shows the first line without typing.
- **Shared pieces** moved to `global/profileParts.jsx` (nav list, socials, inline links with hover colors,
  clock, status dot), used by both the sidebar and the phone menu. `sidebar.jsx` is now desktop-only.
- **No sidebar flash:** `App.jsx` picks the layout on the first render (`useMediaQuery` with `noSsr`).
- **Feed polish on phones:** tiles size to content instead of a tall min height; the meta row drops the date to
  its own line instead of splitting "Research simulator"; the ↗ stays with the last stack item.
- **Checked** with real phone emulation over Chrome DevTools (390×844 and 360px, 3× density, touch), light and
  dark: no sidebar, typed line running, menu opens / locks scroll / focuses "Home", tapping Experience
  navigates and closes it, no horizontal overflow, no console errors (the dev server only shows React Router's
  existing v7 "future flag" notices). Desktop screenshot unchanged.

### 37. Phone menu: link tiles and a chevron button

- In the phone menu, email, resume and the socials became real tap targets: a grid of 48px square tiles with
  hairline borders. Row one: **Email →** (filled, the primary action) and **Resume ↗**; row two: LinkedIn,
  GitHub, Instagram. On press or hover the label and border take the brand color (email red, LinkedIn blue,
  GitHub green, Instagram's gradient with a pink border). The color maps are now exported from
  `profileParts.jsx` and shared with the desktop links.
- The menu button's two-bar icon became a chevron: down when closed, flipping up when open (the button also
  gets a full-strength border while open).
- Checked with phone emulation at 390 and 360px in both themes (no overflow, menu behavior unchanged, no
  errors) and captured pressed states for Email, LinkedIn and Instagram.

### 38. Experience timeline: ticks and a jog

- The timeline's job markers changed from circles to thin horizontal ticks across the rail (grey until passed,
  then full strength and 35% longer), and the glowing progress dot became a longer horizontal line with the
  same soft pulse.
- The rail now has one abrupt S-bend: it runs straight down, makes a tight sideways jog (4px corner radius,
  10px to the right) halfway between the first two jobs, then continues. Nelson picked the mid-rail jog over
  hooks at the top or bottom.
- To make the fill and the progress line follow the bend, the rail became an SVG path (track + fill sharing one
  `d`), rebuilt on resize. The fill draws with `stroke-dashoffset`; the progress line is placed with
  `getPointAtLength`, mapping scroll progress to path length (the path only moves down, so length = height plus
  the bend's extra once past it). No `viewBox`, so SVG units are CSS pixels and line up with the ticks.
- Checked by scrolling `/work` via Chrome DevTools on desktop and an emulated phone (top, mid, end): fill and
  progress follow the jog, ticks shift with it, no errors.

### 39. Timeline: line only, dates light up, flush ends

- Removed the moving progress line; the rail's fill is the only thing that moves.
- When the fill reaches a job's tick, that job's date turns full strength and weight 600 (`data-reached` on the
  job item, set by the same check that darkens the tick).
- The rail path now starts at the first tick and ends at the last, so the top tick caps the line like a "T"
  instead of having a short stub of rail sticking out above it (and the same at the bottom). The fill math maps
  reading position to path length from the first tick.
- Checked on desktop and an emulated phone, scrolled top/mid/end, plus the dev server.

### Content corrections along the way

- "Solutions Engineer" became **Forward Deployed Engineer** everywhere, matching the resume.
- Empty Fullstory bullets were filled in, and project stacks were matched to the resume.
- Removed the lorem-ipsum "Empty Card" project and the placeholder cat images on `/projects`.
- Replaced the create-react-app default page description, and added Open Graph tags.

## Security incident: personal documents on the live site

**Found:** `public/documents/` held three personal tax documents next to the resume: an IRS tax return
transcript, a 2025 income summary and a tax-software consent form. Everything in `public/` is deployed
as-is, so they were downloadable from the live site.

**Resolved:**
- Removed from the source branches, with a `CLAUDE.md` guardrail: only the resume belongs in `public/documents/`.
- Removed from the live site by Nelson's Oct 12 deploy; `gh-pages` now holds only the resume and `Notes.txt`.

**Optional, still open:**
- Purge them from git history on every branch. This rewrites history and needs a force-push, so it waits
  for an explicit decision.
- Request an IRS Identity Protection PIN as a precaution.

## Working locally

```bash
git fetch origin
git switch master
git pull
npm ci
npm start                       # Astro dev server, http://localhost:4321
```

The live site only changes on `npm run deploy`, which runs the build for you (`predeploy`) and publishes
`dist/` to `gh-pages`.

## Known issues / backlog

- **Pre-rendering (Astro stage 2):** pages render in the browser only; see entry 25.
- **Writing page:** disabled in the header, and its code still references a placeholder cat image.
- **Resume out of sync:** the site says Solutions Engineer (entry 32) but `NelsonRodriguez.pdf` still says
  Forward Deployed Engineer. Replace the PDF when Nelson updates it.
- **Build warnings:** one left from before this work: `landing/projects.jsx` (duplicate `minHeight`).
- **Unused code and dependencies:** legacy CSS, animations, `stuff.jsx`, `signature.jsx`,
  `Notes.txt`, the stray `p_website.git/` directory, the `SectionHeaderRow` and `CompactSection` primitives
  (unused since the landing page was trimmed), and several installed but unused packages (see `CLAUDE.md`).

## Next steps

- [x] Remove the tax PDFs from the live site
- [x] Save the portrait version on `landing-picture-pending`
- [x] Review the landing page locally with real photos (they load in local builds; seen in screenshots)
- [x] Merge `landing-page-redesign` into `master` (Oct 15)
- [x] Use the halftone on every page instead of the starfield
- [ ] Deploy (`npm run deploy`)
- [x] Fix deep-link 404s on GitHub Pages (Astro static pages, entry 25)
- [x] Regenerate `package-lock.json` (entry 25)
- [x] Save the CRA version on `react-back-up-branch`
- [ ] Astro stage 2: convert static sections to `.astro` so pages ship real HTML (the sidebar is a good first
      candidate: static text plus a small clock/toggle island)
- [x] Merge `website-migration` and `sidebar-redesign` into `master` (Oct 16)
- [ ] Decide whether the code card comes back (e.g. as a feed tile)
- [ ] Give project tiles real visuals (screenshots or covers) when available
- [ ] Delete `landing-picture-local`
