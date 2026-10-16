# Website refactor

Running record of the nelsonrodriguez.me refresh: goals, design language, decisions, what changed, and what's
still open. Hard rules and guardrails live in [`CLAUDE.md`](./CLAUDE.md); this file explains the thinking
behind them and keeps the history.

**Read this before making changes, and update it in the same commit** (see `CLAUDE.md`).

## Goals

- Support an active job search: a recruiter should understand who Nelson is, what he's built, and how to
  reach him within ~30 seconds on the landing page.
- Reflect the updated resume (`public/documents/NelsonRodriguez.pdf`), with the current role as
  **Forward Deployed Engineer at Fullstory** (Dec 2025 – present).
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
| Hosting | GitHub Pages, `gh-pages` branch, custom domain from `public/CNAME` | `npm run deploy` builds and publishes `dist/` |
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

### Principles

1. **Monochrome first.** Near-black on off-white (light) and off-white on black (dark), using theme tokens only.
   Color comes from content, never from UI chrome: photos regain color on hover, and the green "open to new
   roles" dot is the only accent.
2. **Hairlines for structure.** 1px rules replace boxes and shadows. A section's top rule uses
   `text.primary`; rows inside it are separated with `divider`.
3. **Square geometry.** No rounded corners on buttons, cards, panels, photos or social icon boxes. The `/projects`
   cards are the one existing exception.
4. **Type does the work.** A serif display face for names and section titles, a clean sans for everything you
   read, and a monospace face for anything "technical" (the code card, the status line).
5. **Sentence case, normal tracking.** No all-caps anywhere and no wide letter-spacing. Acronyms like SDK, iOS
   and .NET keep their real capitals.
6. **Motion with a reason.** Things draw or type in once, on load, and then settle. Looping motion is limited
   to a typing cursor, the status-dot pulse, and the slow halftone drift in the background. All of it respects `prefers-reduced-motion`.
7. **Real over illustrative.** Real numbers from the resume, a real public SDK snippet, and Nelson's own
   photographs. No placeholders, stock imagery, invented metrics or headshots (for now).

### Typography

| Role | Face | Where |
| --- | --- | --- |
| Display | Baskerville serif stack, weight 300 | Name in the hero, section titles (`SectionTitle`), footer name |
| Body | Aeonik / system sans | Paragraphs, buttons, nav, quick-fact values |
| Role titles | Geist | Job titles on `/work` |
| Technical | IBM Plex Mono | Code card, "Open to new roles" status line |
| Labels | `MetaText`: sans, `0.82rem`, weight 500, `text.secondary` | Fact labels, frame labels, dates, small headings |

### Signature elements

- **Cross rule** (`ui/crossRule.jsx`): a hairline with small "+" crop marks at both ends. On load the line
  grows out from the middle to both ends (1.1s, ease-out), and the marks fade in as it reaches them. It's the site's divider motif, used as the header's bottom edge and to close the landing
  hero, below both columns. Use it for any new divider; keep it bare (no labels or clocks).
- **Name block**: serif name (`clamp(2.4rem, 3.6vw, 3.8rem)`), then the typed tagline. No job title; the
  role shows in the pitch ("Currently at Fullstory") and on `/work`.
- **Code card** (`landing/codeCard.jsx`): a bordered card titled `nelson.ts` that types out a small "about me"
  in TypeScript: base, fuel (iced coffee), training (strength and endurance), offline (photography and cars),
  and `kaizen(365) // ≈ 37.8x`, since 1% better a day compounds to about 37.8 times in a year. It's company
  agnostic on purpose. Monochrome highlighting (italic grey comments, including trailing ones, and bold
  keywords) with line numbers; the cursor blinks once typing finishes.
- **Quick facts**: a `dl` with a dark top rule and hairline rows (Focus, Education with a Georgia Tech link,
  Based in).
- **Photography strip** (`landing/photoStrip.jsx`): four of Nelson's photos, grayscale at rest and color
  plus a slight zoom on hover. It links to `/photography` only while that page is open (it's locked now).
- **Binary section labels** (`BinaryMetaText`): "0000", "0001" and so on type in above each page's title.
- **Employer logos on `/work`**: monochrome silhouettes (an SVG mask over the text color) in place of
  employer names, so they follow light and dark mode.
- **Theme toggle**: a square button with a half-filled circle (the contrast symbol) that turns 180° when the
  theme flips. Hovering (or keyboard focus) shows "Switch to dark mode" / "Switch to light mode" in an inverted
  label. It's 44px and bordered on phones, so it's easy to find and tap.
- **Header**: Nelson's name in the serif on the left (links home), nav links in the sans at regular weight
  with hairline separators, and the theme toggle. On phones the name and toggle share the top row and the
  nav becomes a horizontally scrolling strip that keeps the current page underlined and in view. Social
  links live in the footer.

### Layout and responsiveness

- Content sits in `Container` (40px side gutters on desktop, 16px on phones).
- The landing hero sits between two cross rules with equal space above and below (72px desktop, 40px phones).
  Two columns: name, tagline, pitch, status and buttons on the left; code card and quick facts on the right.
  The buttons sit right under the status line, leaving deliberate open space in the lower left.
- Below the `md` breakpoint everything stacks into one column, the corner marks hide, and the photo strip
  becomes a 2 × 2 grid.
- No horizontal page scrolling at any width from 360px up (checked at 360, 390, 768, 1280 and 1440px, light
  and dark). The mobile header nav is the one intentional sideways-scrolling strip.

## Landing page today (`/`)

| Piece | File | Contents |
| --- | --- | --- |
| Main column | `landing/intro.jsx` | Name, typed tagline, "Currently at Fullstory" pitch, "Open to new roles" status, *View resume* and *Get in touch* buttons |
| Side column | `landing/intro.jsx`, `landing/codeCard.jsx` | Typing code card, quick facts (Focus · Education · Based in) |
| Cross rule | `ui/crossRule.jsx` | Closes the hero below both columns (same rule as under the header) |
| Background | `global/halftone.jsx` | Halftone cloud texture behind the hero (same as every other page) |
| Photography strip | `landing/photoStrip.jsx` | Four photos (not linked while `/photography` is locked); hidden if the photo service fails |

All text content comes from `src/data/profile.js`. The photo fetch lives in `global/usePhotos.js` and is
shared with the photography page, so a visit makes one request.

## Branches

| Branch | Purpose |
| --- | --- |
| `landing-page-redesign` | Everything through entry 11, without the portrait; merged into `master` on Oct 15 |
| `halftone-background` | Entries 12–24: halftone background, custom cursors, smaller text and name, no hero job title (ripples tried and removed); merged into `master` on Oct 16 |
| `react-back-up-branch` | Snapshot of `master` right before the Astro migration (`dc471b5`): the last Create React App version |
| `website-migration` | Entry 25: the Astro port |
| `landing-picture-pending` | Nelson's full version with the portrait frame, saved for later |
| `landing-picture-local` | Temporary copy used for the merge; safe to delete |
| `master` | Source branch. [Yugenero/p_website#2](https://github.com/Yugenero/p_website/pull/2) merged the early redesign; later work was merged directly |
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
  again. Deploy now publishes `dist/` instead of `build/`.
- **Checked:** `npm run build` passes (same single `projects.jsx` warning as before); every route returns 200
  from a plain static server with no SPA rewrites, `/nope` returns 404; the home page (light) and `/work`
  (dark, loaded directly) look the same as the CRA build; `npm start` serves all routes.
- **Not done yet (stage 2):** the pages are still rendered entirely in the browser, so the HTML has no
  content for search engines or link previews. Next is converting static sections (About, Experience,
  Projects, footer) to `.astro` with real HTML, keeping React only for the theme toggle, typed text,
  halftone, code card and photos.

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
git switch website-migration    # or master
git pull
npm ci
npm start                       # Astro dev server, http://localhost:4321
```

The live site only changes on `npm run deploy`, which runs the build for you (`predeploy`) and publishes
`dist/` to `gh-pages`.

## Known issues / backlog

- **Pre-rendering (Astro stage 2):** pages render in the browser only; see entry 25.
- **Writing page:** disabled in the header, and its code still references a placeholder cat image.
- **Build warnings:** one left from before this work: `landing/projects.jsx` (duplicate `minHeight`).
- **Unused code and dependencies:** legacy CSS, animations, `navigation.jsx`, `stuff.jsx`, `signature.jsx`,
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
- [ ] Review `website-migration` locally, then merge into `master`
- [ ] Astro stage 2: convert static sections to `.astro` so pages ship real HTML
- [ ] Delete `landing-picture-local`
