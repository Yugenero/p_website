# Website refactor

Running record of the nelsonrodriguez.me refresh: goals, decisions, what changed, and what's still open.
Design rules and guardrails live in [`CLAUDE.md`](./CLAUDE.md); this file is the project log.

## Goals

- Support an active job search: a recruiter should understand who Nelson is, what he's built, and how to
  reach him within ~30 seconds on the landing page.
- Reflect the updated resume (`public/documents/NelsonRodriguez.pdf`), with the current role as
  **Forward Deployed Engineer at Fullstory** (Dec 2025 – present).
- Make the content easy to scan and make the technical depth obvious.
- Make the landing page denser, building on the existing design rather than replacing it.
- Keep the existing pages: About, Experience (`/work`), Projects, Photography.
- Do the work on a separate branch, and add a `CLAUDE.md` documenting the stack, UI style and guardrails.

## Branch

| | |
| --- | --- |
| Working branch | `landing-page-redesign` |
| Based on | `master` at `0607c2e` ("home page visual changes") |
| Deployed site | `gh-pages` branch (built output), custom domain via `CNAME` |
| Status | Pushed to GitHub. Not merged and not deployed. No pull request opened yet. |

The branch was first created as `claude/confident-johnson-s9lfcl`, then renamed to `landing-page-redesign`.
The old name has been deleted from GitHub. Future branches get descriptive names.

### Commits

1. `42134431a` Remove personal tax documents from `public/`
2. `8826ba5f6` Densify landing page and centralize resume content; add CLAUDE.md
3. `20a7f0451` Remove all-caps text site-wide and document the rule
4. This document

## What changed

### Landing page (`/`)

The old landing page was a full-screen hero ("hi, i'm nelson" + typed tagline) and nothing else.
It is now a single scrollable overview, top to bottom:

| Section | File | Contents |
| --- | --- | --- |
| Hero | `landing/intro.js` | Green "Open to new roles · Atlanta, GA" status, name, typed tagline (kept), role + pitch, *View resume* and *Get in touch* buttons, and a quick-facts panel (Currently, Focus, Education, Based in) |
| Impact strip | `landing/impact.js` | 4 resume metrics: 6 mobile stacks supported, 40% faster dataset filtering, 20K+ contractors on platform, <5ms recommendation retrieval |
| Experience | `landing/experienceSummary.js` | Condensed timeline (Fullstory, Civic DX, eKlozet): date, role · employer, one-line summary, top result, stack tags, plus a "Full experience →" link to `/work` |
| Toolkit | `landing/toolkit.js` | Skills grouped into Languages / Mobile / Web & backend / Data & infra, plus education and coursework |
| Selected projects | `landing/featuredProjects.js` | Zenith, Running Sonification Engine, Nexus, linking to GitHub, plus "All projects →" |
| Contact | `landing/contact.js` | "Let's build something useful.", email / LinkedIn / GitHub buttons, and links to About, Experience, Projects, Photography |

The footer now shows on the home page too; it used to be hidden there.

### Update: landing page trimmed to the hero

- `5966aea` (Nelson): removed the impact strip, experience summary, toolkit, selected projects and contact
  sections. The landing page is now a single-screen hero; deeper content lives on its own pages.
  The "Currently" quick fact and the impact metrics were removed as well.
- Hero heading changed from "hi, i'm nelson" to **"Nelson Rodriguez, Forward Deployed Engineer"**
  (the title comes from `profile.role`, shown in the secondary color). The typed tagline underneath
  keeps all of its original lines. The summary now opens with "Currently at Fullstory."

### Update: richer landing page (frame, code card, photography strip)

Goal: more visual fidelity without adding filler. Logos were considered and deliberately left out for now.

- **Framed hero** (`landing/heroFrame.js`): top and bottom hairlines that draw in on load, corner "+" marks,
  a location label (Atlanta, GA · 33.75° N, 84.39° W) and live Atlanta local time.
- **Code card** (`landing/codeCard.js`): types out a short snippet of the public Fullstory React Native SDK
  (`FullStory.identify`, `FullStory.event`). Monochrome highlighting; screen readers get the full text;
  respects reduced motion.
- **Photography strip** (`landing/photoStrip.js`): four photos from the existing photo service, grayscale at
  rest and color on hover, linking to `/photography`. Hidden entirely if the service is unavailable.
  The fetch moved into `global/usePhotos.js` and is shared with the photography page (one request per visit).
- The job title in the heading is muted with opacity, so it reads as secondary in dark mode too.
- **Picture:** Nelson's full local version (portrait frame, `me-ny.jpg`, logos and other edits) is saved on
  `landing-picture-pending`. Everything except the portrait was merged into this branch: the title on its
  own line, the new pitch and Fullstory bullets, "Open to relocation", the Georgia Tech link, work-page
  logos, and the header/footer tweaks. The portrait frame, `profile.photo`/`photoRatio`, and `me-ny.jpg`
  were left out here; the code card now sits where the portrait was.

### One source of truth for resume content

- New file: `src/data/profile.js`. It holds the profile, quick facts, impact stats, work experience,
  education, skill groups, and projects.
- The landing page, `/work`, `/projects`, and `/about` all read from it, so the content can't drift between pages.
- **When the resume changes, update both the PDF and `profile.js`.**

### Content corrections

- The title was "Solutions Engineer" in two places; it now reads **Forward Deployed Engineer**, matching the resume.
- The Fullstory bullets were empty; they now hold the four resume bullets.
- The project stacks now match the resume (Zenith: React Native / Firebase / LangChain / OpenAI;
  Running Sonification: Java / Processing).
- Removed the lorem-ipsum "Empty Card" project and the placeholder cat images on the projects page.
- The About page bio was rewritten around the current role.
- `public/index.html` now has a real meta description and Open Graph tags; the description was still the
  create-react-app default.

### Shared building blocks (`src/components/ui/primitives.js`)

- `ArrowLink`: small "go deeper" link with an arrow that slides on hover.
- `SectionHeaderRow`: section title on the left, optional action link on the right.
- `CompactSection`: tighter vertical spacing plus a top hairline, for landing sections.

### No all-caps text

All uppercase styling was removed site-wide: section labels, meta text, tech tags, buttons, links,
project tags, and MUI's `button` and `overline` theme variants. Letter-spacing went back to near normal
and small labels got slightly larger (0.72rem → 0.82rem). This is now a rule in `CLAUDE.md`.

### CLAUDE.md

Added at the repo root. It covers the tech stack, commands, project structure, routes, the content model,
design rules (color, typography, layout, no all-caps, responsiveness, accessibility), guardrails, and known issues.

### Verification

- `npm run build` passes. The only warnings are the two that existed before this work.
- Checked with screenshots at 1440px (light and dark) and 390px (mobile): no horizontal scroll and no console errors.
  The `/work` and `/projects` pages were checked too.

## Security incident: personal documents on the live site

**Found:** `public/documents/` contained three personal tax documents next to the resume: an IRS tax return
transcript, a 2025 income summary statement, and a tax-software consent form. Everything in `public/` is
deployed as-is, and the same files are on the `gh-pages` branch, so they were very likely downloadable
from the live site.

**Done:**
- Deleted the files on `landing-page-redesign`.
- Added a guardrail to `CLAUDE.md`: only the resume belongs in `public/documents/`.

**Still to do (Nelson):**
1. **Remove them from the live site.** On GitHub, switch to the `gh-pages` branch, open `documents/`,
   and delete every PDF except `NelsonRodriguez.pdf`. Or run:
   ```bash
   git fetch origin gh-pages
   git switch gh-pages
   git rm documents/2025_*.pdf documents/34320025-*.pdf
   git commit -m "Remove personal documents from deployed site"
   git push origin gh-pages
   ```
   Claude was blocked from pushing to `gh-pages` because it counts as a production deploy.
2. **Optional:** purge them from git history on every branch. This rewrites history and needs a
   force-push, so it waits for an explicit decision.
3. **Optional:** request an IRS Identity Protection PIN as a precaution.

## Working locally

```bash
git fetch origin
git switch landing-page-redesign
git pull
npm install --no-package-lock   # the lockfile is out of sync, so npm ci fails
npm start                       # http://localhost:3000
```

If `git switch` complains about local changes, run `git stash` first and `git stash pop` afterwards.

## Known issues / backlog

- **Lockfile:** `package-lock.json` is out of sync with `package.json` (`npm ci` fails: missing `yaml@2.9.1`).
  Regenerate it in its own commit.
- **Deep links:** GitHub Pages has no SPA fallback, so refreshing or opening a direct link like
  `/work` probably returns a 404. Fix with a `public/404.html` redirect or by switching to `HashRouter`.
- **Writing page:** disabled in the header, and its code still references a placeholder cat image.
- **Lint warnings:** two existed before this work: `starfield.jsx` (missing `forceWhite` dependency)
  and `landing/projects.js` (duplicate `minHeight`).
- **Unused code and dependencies:** legacy CSS, animations, `navigation.js`, `stuff.js`, `signature.js`,
  `Notes.txt`, the stray `p_website.git/` directory, and several installed but unused packages (see `CLAUDE.md`).
- **Content to review:** the impact numbers, the quick facts, and the "Let's build something useful."
  headline are derived from the resume. Adjust them in `src/data/profile.js` and `landing/contact.js`.

## Next steps

- [ ] Remove the tax PDFs from `gh-pages` (see above)
- [ ] Review the new landing page locally and note changes
- [ ] Open a pull request from `landing-page-redesign` into `master`
- [ ] Fix deep-link 404s on GitHub Pages
- [ ] Regenerate `package-lock.json`
- [ ] Deploy (`npm run deploy`) once approved
