# SYNA Website Design Principles

## Design intent

The redesign presents SYNA as a precise, credible industrial-robotics company through a focused one-page narrative. It takes inspiration from the editorial confidence and dark, high-contrast staging of Square One Labs, and from the concise hierarchy, readable content blocks, and clear next steps highlighted by Storydoc's one-pager examples. It does not copy either reference.

The site must feel engineered rather than decorated: every line, image, transition, and control should help the visitor understand the existing story or reach an existing contact action.

## Non-negotiable content rule

- Preserve the information already present in the original site.
- Do not introduce new capabilities, statistics, customer claims, partnerships, team members, or contact details.
- Keep Hebrew and English versions semantically equivalent to the supplied translations.
- Visual labels such as section numbers may organize the page, but must not imply new facts.

## Narrative structure

1. **Positioning:** Lead with the existing manufacturing-flexibility promise and supporting statement.
2. **Who SYNA is:** Explain the company and its human–robot collaboration vision.
3. **The industry challenge:** Establish why high-precision, low-volume manufacturing remains dependent on scarce expertise.
4. **The mission:** Show how SYNA's existing system description addresses that challenge.
5. **Company and founder:** Ground the vision in the existing founder background and company location.
6. **Contact:** End with the existing partner invitation, meeting link, and founder contact details.

Each section should answer one question. Long copy remains intact, but line length, spacing, and emphasis make it easy to scan.

## Visual system

### Color

- **Ink:** `#07111F` for the main canvas and high-confidence sections.
- **Deep navy:** `#0B1B2D` for layered surfaces.
- **Electric cyan:** `#28C7E9` as the primary interactive and technical accent, derived from the existing logo.
- **Signal blue:** `#5B8CFF` as a restrained secondary accent.
- **Cloud:** `#F2F5F7` for light editorial sections.
- **White:** `#FFFFFF` for primary text on dark surfaces.
- **Muted text:** cool gray-blue values for supporting copy; never below accessible contrast.

Accent colors identify interaction and structure. They do not become decorative gradients across every surface.

### Typography

- Use **Assistant** first, with **Heebo** and system sans-serif fallbacks, so Hebrew and English share a coherent voice.
- Hero type is large, compact, and editorial; supporting copy remains calm and readable.
- Body copy is limited to roughly 65–72 characters per line on wide screens.
- Use weight and spacing for hierarchy. Avoid all-caps for Hebrew and use small uppercase labels only for language-neutral elements such as the brand wordmark or numeric section markers.

### Layout

- Use a centered maximum-width grid with generous outer gutters.
- The hero occupies most of the opening viewport and pairs the promise with one existing product image.
- Content sections alternate light and dark treatments, but share the same grid and rhythm.
- Images are large rectangular editorial panels rather than small circles. Cropping should preserve the subject and look intentional.
- Fine rules, corner marks, and a subtle technical grid reference precision without inventing product diagrams.

### Components

- **Navigation:** A compact sticky header with the logo, existing anchor links, and language controls. It must remain usable in both directions and collapse cleanly on mobile.
- **Buttons:** Rounded rectangles with clear primary and secondary hierarchy. Hover and focus states should be visible without moving layout.
- **Section marker:** A small two-digit number and rule provide orientation without adding content.
- **Image frame:** A bounded media panel with a subtle accent edge and optional existing section title as its accessible text.
- **Contact panel:** A strong closing surface that keeps the existing invitation and contact routes together.

## Interaction and motion

- Use restrained entrance transitions for major blocks and a short word-stagger for the hero statement.
- Keep smooth anchor navigation, but respect `prefers-reduced-motion`.
- Use no autoplay video, replacement cursor, heavy parallax, or motion that competes with the technical story.
- Keep pointer-reactive light confined to imagery and contact surfaces so it never obscures text or changes layout.
- Navigation, language switching, email, meeting, and LinkedIn actions must remain keyboard accessible.

### Motion references

- The hero word reveal and surface spotlights adapt interaction ideas from [React Bits](https://reactbits.dev/) Split Text, Animated Content, and Spotlight Card patterns.
- The button sheen and slow technical-grid drift adapt the lightweight CSS micro-interaction approach found in [Uiverse](https://uiverse.io/)'s open-source button and pattern library.
- All motion is reimplemented in plain CSS and JavaScript for this site; no external animation dependency is introduced.

## Bilingual behavior

- English is the default and uses left-to-right direction; Hebrew uses right-to-left direction.
- Layout order, alignment, icon direction, and spacing follow the document direction automatically.
- The language switch must remain visible and clearly indicate the active language.
- Contact labels that were previously hard-coded are included in the translation system so the page does not mix languages unintentionally.

## Responsive behavior

- Desktop uses a 12-column editorial grid and side-by-side copy/media compositions.
- Tablet reduces type scale and gutter size while preserving section hierarchy.
- Mobile becomes a single-column story: copy first, image second, with touch-friendly controls and no horizontal overflow.
- Dense contact information stacks vertically on narrow screens.

## Accessibility and quality bar

- Use semantic landmarks, meaningful heading order, descriptive alternatives for informative images, empty alternatives for decorative images, and a skip link.
- Maintain visible keyboard focus and WCAG AA color contrast for normal text.
- Provide a readable no-JavaScript baseline; JavaScript enables language switching and the compact mobile menu.
- Avoid layout shifts by specifying image dimensions or aspect ratios.
- Before completion, verify JSON and JavaScript syntax, local links and assets, bilingual content keys, responsive rendering, overflow, console errors, and the final text presentation.
