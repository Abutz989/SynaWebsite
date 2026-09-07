# SYNA website — design concept and working principles

Updated: 7 September 2026

## Concept: the automation gap

The website is a startup one-pager built around a business problem: advanced manufacturers need more production capacity, but many precise, variable processes remain difficult to automate and dependent on scarce skilled labor. Its primary audience is an industrial leader or validation partner; early-stage investors and technical experts are secondary audiences. The primary action is a conversation about an actual manufacturing constraint.

The opening uses typography and three pressure points—precision, variation, and limited skilled capacity—to establish the need before any product image appears. The full-system image is reserved for the solution section. Deep navy carries the problem, solution, and vision; pale sections separate evidence and market context. Cyan marks the narrative path rather than product features. Fine rules organize content. There are no decorative effects or invented performance and market figures.

## Narrative and copy

1. **Opening need:** Advanced manufacturing still depends on scarce skilled hands. Three supporting pressures make the problem scannable in the first viewport.
2. **Problem:** Explain the conflict between variable manual work and rigid automation, using finishing and deburring as the concrete entry problem.
3. **High-level solution:** Keep the operator’s judgment while moving the physical work to a robotic system. Describe value before mentioning the haptic interface in one supporting note.
4. **Market opportunity:** Present aerospace, defense, and medical manufacturing as examples of the same high-mix, low-volume environment. Distinguish the focused entry application from a broader future path without publishing unsupported market-size figures.
5. **Vision:** Show a staged path from human-guided execution to intelligent assistance and gradual automation. Label roadmap stages clearly.
6. **Company:** Present the supplied founder background, current development stage, and partner need without implying customers, pilots, or commercial validation.
7. **Contact:** Ask whether skilled work is limiting capacity, then offer the existing email, meeting, telephone, and location routes.

Keep paragraphs short and concrete. Lead with the manufacturing problem and business consequence. Explain the product at the level needed to understand the approach; introduce the haptic interface only after the value is clear. Do not turn intended outcomes into measured results, market categories into market-size claims, or renderings into evidence of an operating prototype. The copyright line identifies SYNA; the displayed HTML5 UP credit and unused demo HTML pages remain removed. Historical license files remain intact.

## Visual system

| Role | Value / rule |
| --- | --- |
| Main canvas | Ink `#0b1720` |
| Development surface | Navy `#11232e` |
| Primary accent | Cyan `#79d9e8` |
| Light reading surface | Paper `#f3f6f6` |
| Text on light | `#162d37`; supporting text `#50636c` |
| Supporting text on dark | `#b0c1c9` |
| Dividers | `#cbd5d9` on light; `#344852` on dark |
| Typeface | Assistant, weights 400–800; Arial/sans-serif fallback |
| Main copy | 18px desktop / 17px mobile at the default browser font size |
| Secondary labels | 14px minimum at the default browser font size |
| Content width | Maximum 79rem; 48px desktop, 32px tablet, 20px mobile side gutters |
| Section spacing | 104px desktop, 72px tablet, 60px mobile |
| Shape | Fine straight rules and small 3–4px corner radii |
| Controls | At least 44px high; primary buttons at least 52px |

Headlines scale fluidly and use deliberate phrase breaks. Text and buttons remain separate from imagery. Body copy stays at comfortable line lengths. The alternating surfaces follow narrative roles rather than repeating a card layout in every section.

## Asset policy and provenance

One existing concept image is integrated into the solution section, with no new generated hardware:

- `assets/images/system-1680.webp` and `system-800.webp`: responsive exports of `../Visual_Asset/assets/website/hero/SYNA_Website_Hero_Full_System_v1.png`, the approved-for-now website baseline identified in the existing production notes.
- `assets/images/logo-light.png`: tightly bounded, resized export of the supplied `LOGO_LIGHT.png`.
- `assets/images/favicon.png`: small export of the supplied `LOGO_SIMBOL.png`.

Retain original artwork in its source location. These are compressed delivery derivatives; they do not change the mechanical design. The full-system image keeps its original ratio, complete workcell-left/operator-right composition, and physical orientation in both languages. Never mirror product imagery for RTL. The image has translated descriptions and explicit concept captions and loads lazily with a responsive source set. The large system export is approximately 104KB. The retained haptic-interface export is currently unused and may support a future technical page.

## Bilingual working process

1. Edit and finalize English in `assets/i18n/en.js`.
2. Translate the finalized English into `assets/i18n/he.js`, retaining identical keys and semantic scope.
3. Run `node scripts/render-content.mjs` to refresh the full English HTML baseline and content-based CSS/script version strings.
4. Run `node scripts/check-site.mjs`.
5. Review both languages at narrow, tablet, and desktop widths, including contact links and image descriptions.

Do not edit old `*.before-messaging-v1.js` snapshots as active copy. They are historical files and are not loaded by the page. Keep markup in translation values only for fields bound with `data-i18n-html`; ordinary strings use `textContent`. Do not nest another bound element inside a bound text element. The fallback renderer intentionally supports this simple markup convention.

English is the initial language. The selected language is saved locally when storage is available. Hebrew sets both `lang="he"` and `dir="rtl"`; layout uses logical spacing, text follows reading direction, and directional link arrows mirror. Phone numbers and email addresses retain LTR direction. No-JavaScript visitors receive complete English text and working standard links; inactive language controls are hidden.

## Interaction and accessibility

- Use semantic navigation, header, main, sections, articles, figures, and footer; maintain one H1 and an orderly H2/H3 hierarchy.
- Keep visible focus rings, an actionable skip link, and meaningful labels for image-only brand links.
- On small screens, expose the navigation through a button with `aria-expanded` and `aria-controls`. Escape closes it and returns focus. Selecting a navigation link, clicking outside, or moving keyboard focus outside closes it.
- Preserve native anchors, email, telephone, calendar, and LinkedIn links. External web destinations use `noopener noreferrer`.
- Indicate the current section while scrolling and the selected language with `aria-pressed`.
- Never hide content pending an animation. Motion is limited to a short vertical entrance and control color transitions, disabled for reduced-motion preferences; smooth scrolling also respects that preference.
- Without JavaScript the navigation stays in normal document flow, preventing the expanded link list from covering the content.

## Maintenance and delivery

The site remains plain HTML/CSS/JavaScript with no framework or runtime package dependency. Existing GitHub Pages deployment is retained; this redesign does not migrate hosting. Use the included render/check scripts after any content, CSS, or JavaScript update so returning visitors receive a consistent version. Test production behavior using a local static server before publishing. See `QA_REPORT.md` for the checks and their limits.
