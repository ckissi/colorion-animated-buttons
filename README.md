CSS BUTTON LIBRARY
==================

A static Astro reference site with 99 pure-CSS button effects, six
collections, 12 implementation pages, three guides, and a button generator.
Use Code to view and copy a complete export. Each effect includes keyboard
focus and reduced-motion styles. The CSS effects need no JavaScript.


PROJECT STRUCTURE
-----------------
src/
  pages/
    index.astro           Complete button gallery
    collections/          Technique collections
    effects/              Selected implementations and code
    guides/               Practical guides
    tools/                Interactive button generator
    404.astro             Missing-page response
    sitemap*.xml.ts       Static XML discovery files
  layouts/                Shared metadata and page layout
  components/             Cards, code exports, dialogs, and navigation
  styles/                 Shared site styles
  scripts/                Clipboard, analytics, and lazy data loading
  data/                   Stable effects, collections, guides, and routes
  utils/                  Generator exports and settings
public/robots.txt         Crawler discovery
public/_redirects         Actual 404 rule for Sevalla
public/_headers           Cache rules for Sevalla
scripts/check-seo.mjs     Generated-site checks
tests/                   Desktop and mobile browser tests
docs/seo-implementation.md Deployment and measurement notes
astro.config.mjs         Astro configuration
package.json             Scripts and dependencies

GETTING STARTED
---------------
Install dependencies:
    npm install

Start the dev server (http://localhost:4321):
    npm run dev

Build for production (outputs to dist/):
    npm run build

Preview the production build:
    npm run preview


LICENSE
-------
MIT


HOSTING
-------
This project is hosted on [Sevalla](https://sevalla.com).


VERIFICATION
------------
Check Astro and TypeScript:
    npm run check

Build and run the static SEO and browser checks:
    npm test

Browser tests use installed Google Chrome. They block analytics requests.
See docs/seo-implementation.md for deployment and Search Console steps.
