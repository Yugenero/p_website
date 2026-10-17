# CLAUDE.md

Personal portfolio for Nelson Rodriguez, live at https://nelsonrodriguez.me.
Its job right now is to support a job search: a recruiter or hiring manager should be
able to understand who Nelson is, what he has built, and how to reach him within
~30 seconds (the sidebar, visible on every page), then go deeper on the dedicated pages.

This is a living document. Update it when the stack, design rules, or guardrails change.

## Before making any changes: read `website-refactor.md`

[`website-refactor.md`](./website-refactor.md) is the project log and the reference for the design language.
Read it **before** editing anything. It explains why things look and work the way they do, which branch
holds what, what's already been tried or rejected, and what's still open.

- **Before:** read its *Design language*, *Home page today*, *Branches*, and *Next steps* sections. Build on
  what's there; don't reintroduce something the history says was removed (e.g. impact metrics, a logo row,
  the portrait) unless Nelson asks.
- **After:** update it in the same commit as the change. Add a numbered entry under *History*, refresh
  *Home page today* / *Design language* if the UI changed, and tick or add items in *Next steps*.
- If this file and `website-refactor.md` disagree, this file's rules win. Fix the log so they match.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Astro 5 (static output) hosting the React 18 app as a `client:only` island (`@astrojs/react`); built with Vite |
| Pages | `src/pages/*.astro`: one HTML file per route, each with its own `<title>`, all wrapped in `src/layouts/Base.astro` |
| Routing | `react-router-dom` v6, `BrowserRouter` inside the island (see `src/App.jsx`), so in-app navigation stays client-side |
| Styling | MUI v5 (`@mui/material`) with `styled()` + theme tokens; Emotion under the hood |
| Theme | `src/theme.js`, light/dark built by `buildTheme(mode)`, persisted in `localStorage.themeMode`; **dark by default** (light only when saved as light) |
| Animation | CSS keyframes, `react-typed` (typewriter text), custom `Halftone` canvas background |
| Icons | `@mui/icons-material` |
| Photos | Fetched at runtime from a Google Cloud Function (`cloud-functions/`) backed by GCS |
| Hosting | GitHub Pages via `npm run deploy` (`gh-pages -d dist --nojekyll`) to the `gh-pages` branch; custom domain via `public/CNAME`. `--nojekyll` is required: Jekyll would drop Astro's `_astro/` folder (all the JS) |
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
npm run deploy                  # build + publish dist/ to gh-pages (production!), with .nojekyll
```

## Project structure

```
astro.config.mjs         Astro config: static output, React integration, site URL
src/
  layouts/Base.astro     HTML shell: meta/OG tags, fonts, index.css, pre-paint theme background script
  pages/                 one .astro file per route (index, about, work, projects, photography, blog, blog/[slug], 404);
                         each renders <App client:only="react" />
  App.jsx                routes + app shell (Sidebar + Main)
  theme.js               palette, typography, MUI component overrides
  data/profile.js        SINGLE SOURCE OF TRUTH for resume content (see below)
  components/
    ui/primitives.js     layout + type primitives (Container, Section, CompactSection, MetaText, SectionTitle, ArrowLink, …)
    ui/binaryMetaText.jsx typed binary section label ("0001|")
    global/              sidebar.jsx (desktop frame), mobileHeader.jsx (phone bar + menu), profileParts.jsx
                         (shared nav/links/socials/clock), halftone background, usePhotos
    landing/             home feed (projectFeed.jsx), phone intro (mobileIntro.jsx) + the full Experience/Projects/About sections reused by pages;
                         intro.jsx / codeCard.jsx / photoStrip.jsx are the old hero, kept but not rendered
    pages/               thin route wrappers (about, work, projects, photography, blog)
    styles/, pages/pageStyles/, animations/   legacy CSS + effects, mostly unused by current routes
public/                           copied verbatim into dist/ (and so deployed)
  CNAME                           custom domain (nelsonrodriguez.me)
  documents/NelsonRodriguez.pdf   resume linked from the sidebar
  blog/*.md                       markdown posts for the (hidden) Writing page
```

### Routes

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `landing/home.jsx` → `landing/projectFeed.jsx` | Project feed: one full-width lead tile, the rest two to a row. No metrics |
| `/about` | `landing/about.jsx` | Bio + core stack |
| `/work` | `landing/work.jsx` | Full experience timeline with all bullets |
| `/projects` | `landing/projects.jsx` | Project cards |
| `/photography` | `pages/photography.jsx` | Masonry grid from the GCS cloud function. **Locked** while `profile.photographyOpen` is `false`: redirects to `/`, sidebar nav item greyed out with "soon" |
| `/blog`, `/blog/:slug` | `pages/blog.jsx` | Under construction; sidebar nav item greyed out. Post pages come from `blogData.js` (`getStaticPaths` in `src/pages/blog/[slug].astro`) |

**Adding a route:** add the `<Route>` in `App.jsx` *and* a matching `src/pages/<name>.astro` (copy an existing one),
or a direct visit to that URL will 404.

## Content: `src/data/profile.js`

All resume-derived content (role, experience, skills, projects, quick facts)
lives in `src/data/profile.js`. The landing page, `/work`, `/projects`, and `/about` read from it.

- When the resume changes, update **both** `public/documents/NelsonRodriguez.pdf` and `profile.js`.
- Every number or claim on the site must be traceable to the resume. Don't invent metrics,
  titles, or availability promises.
- `/about`'s "Core stack" is `profile.coreStack` (explicit list, in order).
- `profile.photographyOpen` locks or opens `/photography` everywhere (route and sidebar nav).
- `profile.openToWork` toggles the "Open to new roles" line (green dot) in the sidebar's *now* block.
- Phone intro copy: `profile.typedLines` (after the derived role line).
- Sidebar copy also lives in `profile`: `tagline` (list, joined with ` · `), `bio` (two
  lines, truthful), `previously` (entries with `name`, optional `href` and `tone`), `timeZone`, `builtWith` (the
  sidebar's "Built from scratch with …" note; keep it to what the site really uses).
- No metrics/impact numbers on the home page or sidebar. Experience, projects, and skills belong on their own
  pages; order those arrays by importance. The home feed shows `projects` in array order (first = lead tile).

### Sidebar (`global/sidebar.jsx`) — the site's frame
- Fixed left column on every page (`SIDEBAR_WIDTH = clamp(300px, 26vw, 400px)`, full height, `divider` hairline
  on its right edge). Content on the right scrolls; the sidebar doesn't.
- Its text scales with the window (`SIDEBAR_FONT_SIZE`: 1rem down to 0.75rem as the window gets narrower or
  shorter) so the column fits without scrolling; spacing inside it is in `em` (the `em()` helper) so it shrinks
  too. Size new sidebar pieces in `em`, not `rem` or px. Its scrollbar is hidden (it read as a stripe).
- Name hover (`NameLink`): the name turns brushed chrome (grey-scale banded gradient clipped to the
  text, tuned per theme) and a bright streak sweeps across it once (1.1s); a "that's me :)" tag follows the
  cursor (`CursorTip`). Hover-capable devices and keyboard focus only; with
  reduced motion the chrome shows without the sweep.
- Top to bottom: name (serif, links home) · tagline "Computer Enjoyer · Engineer" · bio · *now* block
  (`→ <role> at <company>`, green-dot "Open to new roles") · "Previously at Civic Digital Experience, eKlozet,
  GT WebDev, Georgia Tech CS" (the school links to the College of Computing, Tech Gold on hover) · "Reach out via email, or read my resume" · LinkedIn / GitHub /
  Instagram stacked as plain text (on hover: brand color and a thin underline drawing in from the left) · live clock "Currently Atlanta, GA · HH:MM:SS" (`profile.location` + Nelson's base time zone, `profile.timeZone`; the time in
  mono, tabular figures).
- Inline links (Fullstory, Civic Digital Experience, school, email, resume, Fullstory and Georgia Institute of
  Technology on `/about`) are full-strength text with a thin underline drawing in from the left on
  hover (`Underlined`, kept on one line so the underline never breaks); email also turns light red, the school
  Tech Gold, Civic light blue, Fullstory dark green (`data-tone`).
- At the very bottom, under the nav: "Built from scratch with Astro, React and MUI" in small text (`0.78em`,
  `text.secondary`, from `profile.builtWith`).
- Nav pinned to the bottom (just above that note), stacked: Home, About, Experience, Projects, Photography, Writing, with the theme toggle
  bottom-right on the same row. The current page
  gets a small filled square before it. Other links slide `0.4em` right on hover/focus; the current page doesn't
  (after a click it shows its square and settles back). Locked pages show greyed out with a small mono "soon" and aren't links.
- **Two-tone text** is the hierarchy: `text.secondary` for connecting words ("Previously at", "Reach out via"),
  `text.primary` for what matters (company names, links, the time). Almost no bold.
- Desktop only. `App.jsx` renders it from `md` up and `MobileHeader` below, chosen on the first render
  (`useMediaQuery(..., { noSsr: true })`) so phones never flash the sidebar.
- Pieces both layouts use (nav list, socials, inline links and their hover colors, clock, status dot, "soon")
  live in `global/profileParts.jsx`. Change them there, not per layout.

### Phones (below `md`): bar, menu, intro
Content first, navigation one tap away. Don't bring the full sidebar back on top of the content.
- **Sticky bar** (`global/mobileHeader.jsx`, 56px, bottom hairline): name in the serif (links home), theme toggle
  and a menu button (a chevron pointing down, flipping up when open), both 44px squares.
- **Full-screen menu** under the bar: big nav rows (56px, hairlines, square marker, locked items with "soon"),
  then role/open-to-work, "Previously at" (Georgia Tech CS included), a grid of 48px link tiles (Email filled + Resume,
  then LinkedIn · GitHub · Instagram; brand color on press/hover), and the clock.
  Closes on navigation, Escape or the button; locks page scroll while open; focus moves to the first link and
  back to the button on Escape; hidden from screen readers and tab order when closed (`aria-hidden`, `inert`).
- **Home intro** (`landing/mobileIntro.jsx`, phones only, above the feed): a typed line cycling
  `"<role> at <company>."` then `profile.typedLines` (static first line with reduced motion), the green-dot
  status, and two 44px buttons: "Email me" (contained) and "Resume" (outlined).
- Feed tiles on phones size to their content (fixed gap under the meta row) rather than a min height.

### Home feed (`landing/projectFeed.jsx`)
- One tile per project, each a link to its repo (new tab). The first tile spans the full width and is taller
  (`clamp(380px, 64vh, 680px)`); the rest pair up two to a row; a last tile without a partner spans the row.
  One column on phones. The meta row wraps the date onto its own line rather than breaking words, and the ↗
  stays attached to the last stack item.
- Tile anatomy: halftone texture behind; top row in mono (`01 :: <kind>` left, date right); bottom: big serif
  title (weight 400, `-0.01em` tracking), then the description in small mono (`text.secondary`) and the stack in
  mono with a ↗ that nudges on hover. The lead tile puts description and stack side by side from `lg` up.
- Hovering/focusing a tile turns its title brushed chrome with the one-time streak, the same effect as the sidebar
  name (`metalText` / `metalOn` in `profileParts.jsx`; the title is `fit-content` so the gradient spans the words).
- Tile surface: `text.primary` at 4–5% alpha layered over `background.default` (opaque, so the starfield doesn't
  show through) with a `divider` border that turns `text.primary` on hover.
  Square corners.

### Old hero components (kept, not rendered)
`intro.jsx`, `codeCard.jsx`, `photoStrip.jsx` and `ui/crossRule.jsx` are from the previous landing page. Nelson
may bring the code card back; keep its rules below if you do.
  - Cross rule (`ui/crossRule.jsx`): a hairline with small "+" marks at both ends that grows from the middle.
    It was the divider under the old header and hero; not used by the sidebar layout.
  - `codeCard.jsx`: a monochrome card (`nelson.ts`) that types out a short, **company-agnostic** snippet about
    Nelson: base, iced coffee, hybrid training, photography and cars, and a `kaizen()` that compounds 1% a day.
    Keep it personal, truthful (only interests stated elsewhere on the site), and under ~38 characters a line so
    nothing wraps on phones. No employer code or branding.
  - `photoStrip.jsx`: four of Nelson's photos (grayscale, color on hover). Shares `global/usePhotos.js` with
    the photography page and renders nothing if the photo service fails.
- No headshot/portrait on the site for now. The picture version is saved on the `landing-picture-pending` branch.

## Design system & UI guardrails

The look is **editorial-minimal**: monochrome, generous type, hairline rules, very little decoration.
Build on it; don't introduce a new visual language.

### Color
- Use theme tokens only: `theme.palette.text.primary`, `text.secondary`, `background.default`, `divider`.
  Light = near-black `#111` on off-white `#F1F0EC`, secondary `#555` (`colors.grayText`; was `#888`, too faint
  over the halftone); dark = off-white on black `#000`,
  secondary `#A3A3A3` (`colors.grayMid`; was `#E0E0E0`, which was too close to white for the two-tone text).
- No new accent colors. Exceptions: the green status dot (`#2EA043`) in the sidebar, and brand colors on the
  sidebar's social links **on hover only** (LinkedIn `#0A66C2` / `#70B5F9` in dark, GitHub green `#2DA44E` / `#7EE787` in dark,
  Instagram's gradient), the email link's light red on hover (`#D9473F` / `#FF8A80` in dark), Georgia Tech CS in Tech Gold on hover
  (`#857437` Tech Dark Gold / `#B3A369` Tech Gold in dark), Civic Digital Experience in light blue on hover
  (`#2B8FD6` / `#8CCBFF` in dark), eKlozet and GT WebDev in Tech Gold on `/work`
  (neither has published brand colors), and Fullstory in a darker brand green, text and underline (`#047A5E` / `#11AB85` in dark). At rest
  they're the normal text colors.
  `accentColors` (crimson) in `theme.js` exists but is intentionally unused.
- Every change must look right in **both** light and dark mode.

### Typography
- Headings / display: Baskerville serif stack (`theme.typography.h1.fontFamily`), weight 300.
- Body: Aeonik / system sans (`theme.typography.fontFamily`). Role titles on `/work` use Geist.
- The serif is reserved for Nelson's name (sidebar, `1.75rem`, weight 400), page section titles and the home feed's
  project titles. Everything
  else in the sidebar and feed is the sans.
- Feed tile titles: the serif at weight 400, slightly tight tracking (`-0.01em`), line height 1, large (`clamp(2rem, 3.4vw, 3.2rem)`,
  lead tile `clamp(2.6rem, 6.4vw, 6rem)`).
- Technical: IBM Plex Mono for small "data" text: the clock's time, feed tile meta/description/stack, "soon"
  tags, and the code card.
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
- Square corners (`borderRadius: 0`) for buttons, panels, cards and feed tiles. Existing exception: the
  `/projects` cards.
- Theme toggle (`animations/themeToggle.jsx`): a square button with a half-filled circle that turns 180° when the
  theme flips, and a "Switch to dark/light mode" label (`CursorTip`). It sits bottom-right of the sidebar, level
  with the nav (in the phone bar, beside the menu button). It's 44px on phones.
- **Hover labels** (`global/cursorTip.jsx`): every popup on the site is a `CursorTip`, a small inverted tag
  (`text.primary` background, `background.default` text, `0.8rem`, square) that follows the mouse, sitting just
  above and to the right of the cursor and flipping left/below near the window edges. Keyboard focus puts it at the
  element's top-right; touch screens don't get it. Rendered in a portal. Don't use native `title` tooltips or
  fixed-position labels; wrap the trigger in `<CursorTip label="…">`, or use `useCursorTip(label)` (spread
  `handlers`, render `tip`) when a wrapper would break layout, e.g. grid items. Current uses: the sidebar name, the
  theme toggle, the employer logos on `/work` (the employer's name) and the home feed tiles ("View on GitHub").
- Structure with **1px hairlines**: `text.primary` for a section's top rule, `divider` between rows.
  No drop shadows except on hover lift.
- Each section starts with a `BinaryMetaText` label + `SectionTitle`. Pages use fixed codes
  (About `0000`, Experience `0001`, Projects `0010`, Photography `0011`, Writing `0100`). The home feed has
  no section label.
- Buttons: MUI `Button` `contained` (filled) for the primary action, `outlined` for secondary.
- `/work` timeline (`landing/work.jsx`): a rail pinned beside the job list that maps the whole list (a mini-map).
  It's a straight SVG line from the first job marker to the last (markers sit right on its ends). The fill draws
  along it (stroke-dashoffset) with a soft aura: a blurred, wider stroke whose gradient fades from nothing
  `AURA_TAIL` (140px) back to its peak at the tip (opacity 0.45 dark / 0.32 light), plus a faint pulsing halo on
  the tip. Only the two ends get a diamond (`DIAMOND` 7px; first and last job; the middle ones were removed),
  hidden until the fill reaches them (then they scale in, and hide again if you scroll back above), and reaching
  each job's point on the line highlights that job's date (`data-timeline-date`:
  full strength, weight 600). No moving marker, no bends. The fill starts empty, its tip at the very top of the line. Once the
  fill passes a job's title, that job is `data-active`: its employer takes its `tone` color (and underline for text
  names), one job at a time.
- `/work` employer logos are one-color masks (`currentColor`); on hover they take the brand color set by
  `logo.tone` in `profile.js`: Fullstory dark green, Georgia Tech Tech Gold (same per-theme shades as the sidebar).
  Employers without a logo but with a `url` (Civic Digital Experience → LinkedIn) are `EmployerLink`s: no underline
  at rest, a background-line underline that draws in on hover (it survives line wraps on phones) and the entry's
  `tone` color (Civic light blue).
- Reading width: long text on wide pages stays short. On `/work`, each role's summary and bullets are capped at
  60% of the job column from `md` up (full width on phones). Keep bullets short: one idea, about two lines.
- Metrics on `/work` (numbers with %, +, ms or an ordinal) are bold and type themselves out on first scroll into view
  (`withMetrics` in `work.jsx`); reduced motion shows them at once.
- Wrap content in `Container` (handles gutters); use `Section` for full pages (at least a screen tall, so the
  halftone always reaches the bottom of the window). (`CompactSection` and
  `SectionHeaderRow` in `primitives.js` are currently unused; they served the old overview sections.)
- Background texture: every page section uses `<Halftone />` (`global/halftone.jsx`), a canvas grid of small
  squares whose opacity follows slowly drifting cloud noise. It reads `text.primary` and the peak opacity
  (0.22 light, 0.25 dark) from the theme. Its parent needs `position: relative` and `overflow: hidden`, with
  content above it at `zIndex: 1`. Feed tiles each have their own. No mouse ripples (tried in entry 15 of the log and removed).
- Starfield (`global/starfield.jsx`), **dark mode only**: one canvas of small twinkling stars on the surfaces without
  the halftone: the sidebar, the home feed around its tiles (and the phone intro), the phone bar and menu. Renders
  nothing in light mode; static with reduced motion; pauses off screen. Same parent rules as the halftone (mark
  siblings above it with `& > *:not([data-starfield])`). Don't put it under the halftone.
- Scrollbar: the custom 10px scrollbar (`text.primary` thumb) applies only to mouse/trackpad devices
  (`(hover: hover) and (pointer: fine)`); on touch screens (`pointer: coarse`) scrollbars are hidden entirely.
- Cursors: chunky Figma-style arrow and hand (SVG data URIs in `theme.js`, `CURSOR_ARROW` / `CURSOR_HAND`),
  applied only on `pointer: fine` devices; the hand covers links, buttons and `role="button"`.

### Responsiveness & accessibility
- Must work from 360px phones to wide desktops with **no horizontal page scroll**. Below the `md` breakpoint
  the phone bar + menu replace the sidebar and grids collapse to one column. Check phones with real device
  emulation (e.g. Chrome DevTools at 390×844 and 360px), not a narrow desktop window.
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
- `npm run build` must pass before pushing. Don't add new build warnings. **Also load the dev server in a browser**
  (`npm start`): the dev server pre-bundles dependencies differently, and a page can build fine but render blank
  in dev.
- Dead files in `src/` aren't harmless: the dev server scans every file there and pre-bundles whatever they import.
  A legacy file importing `@mui/icons-material/<Icon>` (CommonJS) mixed MUI's CJS and ESM builds and blanked every
  page with `createTheme_default is not a function` (entry 27). Delete unused files instead of leaving them, and
  import icons from `@mui/icons-material` (the barrel) or `@mui/icons-material/esm/<Icon>` if you add one.
- Keep new dependencies to a minimum; MUI + `styled()` covers almost everything.

## Known issues / backlog

- Astro migration, stage 1 only: the whole React app still runs as one client-side island on every page, so
  pages ship no pre-rendered content (search engines and link previews see an empty body). Stage 2 is to
  convert sections to `.astro` progressively, keeping React only for interactive pieces.
- The site's Fullstory title is **Solutions Engineer**, but `public/documents/NelsonRodriguez.pdf` still says Forward
  Deployed Engineer. Nelson will update the resume; replace the PDF then (the one sanctioned exception to
  "traceable to the resume" until it's done).
- Writing/blog page is locked in the sidebar nav; `blogData.js` / `blog.js` still reference a cat placeholder image.
- Pre-existing build warning: `landing/projects.jsx` (duplicate `minHeight`). There's no ESLint step since
  leaving CRA; treat new Vite/esbuild warnings in `npm run build` as the bar instead.
- Legacy unused files: `components/styles/*.css`, `components/animations/*`,
  `pages/stuff.jsx`, `global/signature.jsx`, `public/documents/Notes.txt`, and the stray `p_website.git/` directory.
