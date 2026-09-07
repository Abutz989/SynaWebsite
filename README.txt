SYNA website
============

Static, bilingual website for SYNA's human-guided robotics concept.

Preview from this directory:
  python3 -m http.server 8080 --bind 127.0.0.1

Content workflow:
  1. Finalize assets/i18n/en.js.
  2. Translate the final English into assets/i18n/he.js.
  3. Run: node scripts/render-content.mjs
  4. Run: node scripts/check-site.mjs
  5. Test the page in English and Hebrew, including mobile navigation.

The render script updates the English no-JavaScript baseline in index.html
and versions the active CSS and scripts to prevent stale browser caches.
The page has no framework or package-install requirement. Node is used only
for these maintenance scripts.

Design concept, component rules, bilingual workflow, and image provenance:
  DESIGN_PRINCIPLES.md
Validation results and remaining external-service limits:
  QA_REPORT.md

The existing GitHub Pages workflow deploys main. Local work on a different
branch is not published until integrated into the deployment branch.

LICENSE.txt and unused historical source assets are retained for provenance;
they are not referenced by the redesigned homepage. The old generic and
component-demo HTML pages have been removed.
