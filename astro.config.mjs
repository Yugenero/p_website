// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static build: every route in src/pages becomes its own HTML file in dist/, so deep links like
// /work load directly on GitHub Pages (no SPA 404). The React app runs inside each page as an island.
export default defineConfig({
  site: 'https://nelsonrodriguez.me',
  output: 'static',
  integrations: [react()],
  build: {
    format: 'directory', // /work -> dist/work/index.html
  },
});
