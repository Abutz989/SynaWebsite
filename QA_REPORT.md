# Website validation — 7 September 2026

## Scope and result

The redesigned homepage was served locally and tested in the Codex in-app browser. English copy was finalized first, followed by Hebrew translation. The existing changes were committed before design work in `26ddafd`.

The local checks below passed. No production deployment, email, telephone call, or appointment booking was performed.

## Browser checks

| Check | Result |
| --- | --- |
| English and Hebrew layout at 320px, 768px, and 1440px viewport widths | No horizontal overflow; headings and body content remain within the viewport. Additional 390px Hebrew/mobile-menu and approximately 1000px desktop reviews completed. |
| English section navigation | System, application, development, company, and contact links reached their corresponding anchors. |
| Hebrew mobile navigation | Menu expands; selecting the application/contact link closes the menu and navigates. |
| Escape and focus | Escape closes the mobile menu and restores focus to its button. |
| Keyboard skip link | Enter on the skip link moves focus to `main`. |
| Language controls | Header and footer switches update content, title, language, direction, and selected state. Both EN and HE preferences survive reload. |
| RTL | Text and layout follow RTL; phone/email remain LTR; physical product imagery is not mirrored. |
| Content and imagery | All bound content populated; all four image instances loaded; descriptive alternatives and concept captions present in both languages. |
| Text contrast | Computed foreground/background checks found no failures at the 4.5:1 normal-text / 3:1 large-text thresholds. This is a targeted check, not a full accessibility certification. |
| No JavaScript | Tested with scripts blocked by a temporary local server response policy. Complete English copy and navigation remain usable; language buttons are hidden; navigation remains in normal flow. |
| Calendar | Existing short link returned HTTP 200, resolved to Tzahi Abu’s appointment schedule, and displayed available 45-minute appointment slots in the browser. No slot was booked. |
| Email and phone | All instances have valid native `mailto:` and `tel:` destinations matching the supplied contact details. Actual delivery/calling depends on the visitor’s configured applications and was not exercised. |
| LinkedIn | Existing profile destination and secure external-link attributes retained. An automated HTTP check received LinkedIn’s 999 response, so profile availability could not be independently confirmed. |
| Browser console | No warning/error entries in the final normal website session. Expected CSP script-block messages belong only to the no-JavaScript test origin. |

## Source checks

`node scripts/check-site.mjs` verifies:

- 84 identical English/Hebrew translation keys, with no empty strings.
- Every translation binding resolves.
- Complete English fallback text, including native link destinations.
- One H1, unique element IDs, and valid local anchor targets.
- Every referenced local asset exists.
- CSS/script version strings match their file content.
- Contact URL structure and shared contact destinations.
- No HTML5 UP credit in the active homepage or translation dictionaries.

`node --check` passed for the main interaction and translation scripts. The render script is idempotent, and `git diff --check` passes.

## Issues found and corrected

1. Browser caching initially mixed the previous Hebrew dictionary with the new markup. The content renderer now gives active CSS and scripts content-based query versions.
2. The always-expanded no-JavaScript mobile navigation could cover content if sticky. It now stays in normal document flow.
3. Old template demo routes still displayed template branding. The unused `generic.html` and `elements.html` pages were removed; historical license records were preserved.

## Boundaries

Testing used one browser engine, with responsive viewport changes rather than physical devices. A dedicated 200% text-enlargement session, screen-reader session, and Safari/Firefox session were not performed. Reduced-motion behavior was checked in the CSS implementation, not through an emulated browser preference. GitHub Pages deployment has not been run; the existing deployment workflow is unchanged.
