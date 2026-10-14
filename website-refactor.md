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
3. **Square geometry.** No rounded corners on buttons, cards, panels or social icon boxes. The `/projects`
   cards are the one existing exception.
4. **Type does the work.** A serif display face for names and section titles, a clean sans for everything you
   read, and a monospace face for anything "technical" (the code card, the status line).
5. **Sentence case, normal tracking.** No all-caps anywhere and no wide letter-spacing. Acronyms like SDK, iOS
   and .NET keep their real capitals.
6. **Motion with a reason.** Things draw or type in once, on load, and then settle. Looping motion is limited
   to a typing cursor, the status-dot pulse and the faint starfield. All of it respects `prefers-reduced-motion`.
7. **Real over illustrative.** Real numbers from the resume, a real public SDK snippet, and Nelson's own
   photographs. No placeholders, stock imagery, invented metrics or headshots (for now).

### Typography

| Role | Face | Where |
| --- | --- | --- |
| Display | Baskerville serif stack, weight 300 | Name in the hero, section titles (`SectionTitle`), footer name |
| Body | Aeonik / system sans | Paragraphs, buttons, nav, quick-fact values; the job title under the name |
| Role titles | Geist | Job titles on `/work` |
| Technical | IBM Plex Mono | Code card, "Open to new roles" status line |
| Labels | `MetaText`: sans, `0.82rem`, weight 500, `text.secondary` | Fact labels, frame labels, dates, small headings |

### Signature elements

- **Hero frame** (`landing/heroFrame.js`): top and bottom hairlines that draw across on load, small "+" crop
  marks at the corners, and two labels on the top rule, "Atlanta, GA · 33.75° N, 84.39° W" and a live
  Atlanta local time. It makes the landing page feel composed rather than empty.
- **Name block**: serif name, with the job title on its own line underneath in a smaller sans and secondary
  color, then the typed tagline.
- **Code card** (`landing/codeCard.js`): a bordered card titled `App.tsx` that types out a short snippet of
  the public Fullstory React Native SDK. It uses monochrome highlighting (italic grey comments, bold
  keywords) and line numbers, and the cursor blinks once typing finishes.
- **Quick facts**: a `dl` with a dark top rule and hairline rows (Focus, Education with a Georgia Tech link,
  Based in).
- **Photography strip** (`landing/photoStrip.js`): four of Nelson's photos, grayscale at rest and color
  plus a slight zoom on hover, linking to `/photography`.
- **Binary section labels** (`BinaryMetaText`): "0000", "0001" and so on type in above each page's title.
- **Employer logos on `/work`**: monochrome silhouettes (an SVG mask over the text color) in place of
  employer names, so they follow light and dark mode.
- **Header**: square social icon boxes, 44px tap targets on phones, and a horizontally scrolling nav strip
  on mobile that keeps the current page underlined and in view.

### Layout and responsiveness

- Content sits in `Container` (40px side gutters on desktop, 16px on phones).
- The landing hero fills the screen below the header on desktop (the header publishes `--header-height`),
  with the footer below the fold. Two columns: name, tagline, pitch, status and buttons on the left; code
  card and quick facts on the right. The buttons line up with the last quick-fact row.
- Below the `md` breakpoint everything stacks into one column, the corner marks hide, and the photo strip
  becomes a 2 × 2 grid.
- No horizontal page scrolling at any width from 360px up (checked at 360, 390, 768, 1280 and 1440px, light
  and dark). The mobile header nav is the one intentional sideways-scrolling strip.

## Landing page today (`/`)

| Piece | File | Contents |
| --- | --- | --- |
| Frame | `landing/heroFrame.js` | Drawn-in hairlines, corner marks, location and local-time labels |
| Main column | `landing/intro.js` | Name, job title, typed tagline, "Currently at Fullstory" pitch, "Open to new roles" status, *View resume* and *Get in touch* buttons |
| Side column | `landing/intro.js`, `landing/codeCard.js` | Typing code card, quick facts (Focus · Education · Based in) |
| Photography strip | `landing/photoStrip.js` | Four photos linking to `/photography`; hidden if the photo service fails |

All text content comes from `src/data/profile.js`. The photo fetch lives in `global/usePhotos.js` and is
shared with the photography page, so a visit makes one request.

## Branches

| Branch | Purpose |
| --- | --- |
| `landing-page-redesign` | The working branch: everything below, without the portrait |
| `landing-picture-pending` | Nelson's full version with the portrait frame, saved for later |
| `landing-picture-local` | Temporary copy used for the merge; safe to delete |
| `master` | Source branch. [Yugenero/p_website#2](https://github.com/Yugenero/p_website/pull/2) merged the early redesign; later work needs a new PR |
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

### Content corrections along the way

- "Solutions Engineer" became **Forward Deployed Engineer** everywhere, matching the resume.
- Empty Fullstory bullets were filled in, and project stacks were matched to the resume.
- Removed the lorem-ipsum "Empty Card" project and the placeholder cat images on `/projects`.
- Replaced the create-react-app default page description, and added Open Graph tags.

### 7. Docs: design language and "read this first" rule (`e4c3419`, this commit)

Added the *Design language* section here, and a `CLAUDE.md` rule to read this log before any change and
update it alongside every change.

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
git switch landing-page-redesign
git pull
npm install --no-package-lock   # the lockfile is out of sync, so npm ci fails
npm start                       # http://localhost:3000
```

The live site only changes on `npm run deploy`, which runs the build for you (`predeploy`) and publishes
`build/` to `gh-pages`.

## Known issues / backlog

- **Lockfile:** `package-lock.json` is out of sync with `package.json` (`npm ci` fails: missing `yaml@2.9.1`).
  Regenerate it in its own commit.
- **Deep links:** GitHub Pages has no SPA fallback, so refreshing or opening a direct link like
  `/work` probably returns a 404. Fix with a `public/404.html` redirect or by switching to `HashRouter`.
- **Photography strip:** only tested with stand-in images, because the build environment can't reach the photo
  service. Check it with real photos before deploying.
- **Writing page:** disabled in the header, and its code still references a placeholder cat image.
- **Lint warnings:** two existed before this work: `starfield.jsx` (missing `forceWhite` dependency)
  and `landing/projects.js` (duplicate `minHeight`).
- **Unused code and dependencies:** legacy CSS, animations, `navigation.js`, `stuff.js`, `signature.js`,
  `Notes.txt`, the stray `p_website.git/` directory, the `SectionHeaderRow` and `CompactSection` primitives
  (unused since the landing page was trimmed), and several installed but unused packages (see `CLAUDE.md`).

## Next steps

- [x] Remove the tax PDFs from the live site
- [x] Save the portrait version on `landing-picture-pending`
- [ ] Review the landing page locally with real photos
- [ ] Open a new pull request from `landing-page-redesign` into `master`
- [ ] Deploy (`npm run deploy`)
- [ ] Fix deep-link 404s on GitHub Pages
- [ ] Regenerate `package-lock.json`
- [ ] Delete `landing-picture-local`
