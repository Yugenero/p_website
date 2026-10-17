## Personal web portfolio

https://nelsonrodriguez.me

Built with [Astro](https://astro.build) and React (MUI for styling), deployed to GitHub Pages.

### Requirements

- Node.js 20.3+ or 22+ (Astro 5 also accepts 18.20.8)
- npm 9.6.5+

### Run locally

```bash
npm ci       # install exactly what package-lock.json pins (first time, or after switching branches)
npm start    # dev server at http://localhost:4321 (same as npm run dev)
```

The dev server reloads as you edit. Stop it with `Ctrl+C`.

### Build

```bash
npm run build     # static site → dist/ (one HTML file per route)
npm run preview   # serve dist/ at http://localhost:4321 to check exactly what will ship
```

`npm run build` must pass before pushing.

### Deploy

```bash
git switch master && git pull
npm run deploy
```

`npm run deploy` builds the site and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves
at nelsonrodriguez.me (the custom domain comes from `public/CNAME`). The script passes `--nojekyll` so GitHub
doesn't drop Astro's `_astro/` folder. The live site updates a minute or two after the deploy.

Only deploy from `master`. Everything in `public/` is published as-is, so never put personal documents there.

### More

- [`CLAUDE.md`](./CLAUDE.md): stack, project structure, design rules and guardrails
- [`markdowns/`](./markdowns): the rest of the project docs
  - [`website-refactor.md`](./markdowns/website-refactor.md): design language, history of changes, and next steps
  - [`TODO.md`](./markdowns/TODO.md): open tasks
- [`cloud-functions/cloud-functions.md`](./cloud-functions/cloud-functions.md): the photo service
