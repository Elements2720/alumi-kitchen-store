# Acceptance gates — design and future V1 build

These are executable review conditions, not claims that the storefront has been built. Status must be one of Verified / Partial / Unverified / Intentionally omitted / Blocked, with command or browser evidence.

## A. Planning package

| Gate | Required evidence |
| --- | --- |
| Reference grounding | Audit labels Observed/Inferred/Proposed, route/viewport matrix, screenshots and open uncertainties |
| Contract completeness | Tokens, section order, content mapping, routes, assets, responsiveness, interaction, motion, keyboard/reduced-motion and scope rules |
| Board files | `design-preview/index.html`, `styles.css`, `preview.js` exist and are served/rendered |
| Board composition | Hero, product row, scroll-linked editorial sample, media/hotspot sample and compact layout visible |
| Honest staging | Reference photos, sample identity/prices and proposed states visibly labeled; final asset gaps recorded |
| Board interactions | Language/direction, two slides, mobile menu, hotspot open/close, sample cart, FAQ, document-level reduced motion |
| Review approval | Explicit user approval of contract and board recorded before writing `implementation-prompt.md` |

## B. Future build: visual fidelity

Compare English against source evidence, then Arabic against the approved mirrored composition. Main matrix: **1440×1000, 768×1024, 390×844**. Also probe 360 and 1024 widths for overflow.

- Header: observed inset/height/translucency, readable over media and white sections, complete nav + compact language control, mobile dropdown opens/closes and returns focus.
- Hero: full-viewport visual dominance, two image slides and bottom thumbnail rail, short title at reference scale, correct media crop and readable overlay text.
- Home order: Hero → Hand-picked products → three sticky collection scenes → Benefits → Tabbed image/product collection → Story collage → Shoppable installation → Contact → Static gallery → Charcoal footer.
- Four desktop featured products; compact reference density and one-column arrangement. No generic alternate cards or reordered content.
- Collections remain true scroll-linked scenes in normal motion. Capture early/mid/late scroll phases; no substitution with reveal-only animation.
- Shop: desktop side rail + 3-column grid; compact search/filter groups above 1-column grid. Type/tag/search no-result state and clear-all tested.
- Detail: start-side information/large main image/end thumbnail rail desktop; media before information compact. Square contain treatment for isolated units; correct view switching.
- About/support/blog/article/policy layouts follow recorded structures, including Support form-first compact ordering.
- Typography, text wraps, media ratios, rails and radii compared with evidence. Arabic text remains readable without arbitrary shrinking.
- No horizontal overflow, clipped wordmarks, overlapping language controls, broken thumbnails or image-induced layout shifts.
- Capture concrete differences with reasons; do not label the site “pixel perfect” without full comparative evidence.

## C. Future build: prototype behavior

- Fixed-price product: add to cart, merge quantity, min 1, increment/decrement, remove, empty state, totals in EGP.
- Custom-only product: no fixed-price cart action; quote opens with correct design/product reference.
- Standard product: customization CTA carries the same design into the quote form.
- Demo checkout/quote/support/newsletter: labels, required-field errors, keyboard navigation, explicit simulated success; no real requests or misleading receipt/confirmation copy.
- Optional quote image selection remains local; preview closes and object URL is cleaned up. No upload endpoint.
- Locale switch preserves equivalent route and cart; filters/search preserved where meaningful. Arabic `lang/dir` and localized titles/copy/validation verified.
- All navigation, product cards, blog cards and policy links resolve; unsupported locale/slug renders not-found.
- Only in-memory demo state; no customer inputs in URL/localStorage/logging.
- No real payment, dashboard, WhatsApp, auth, inventory, CMS, live feed or geolocation code/dependency is present.

## D. Future build: accessibility and motion

- Semantic main/header/nav/footer, one primary page heading, sensible hierarchy; images with appropriate localized alt.
- Menu, gallery, tabs, FAQ, cart and hotspots operable by keyboard; visible focus and reasonable tap targets.
- Drawer/dialog focus managed, Escape supported, focus returned to opener; no hidden interactive content remains focusable.
- Hotspots keep essential text available by keyboard and clamp to mobile image bounds.
- Normal contrast meets WCAG AA for readable controls/copy. Test both locales; imagery crop does not undermine hero text contrast.
- Reduced-motion OS preference and explicit board switch disable root smooth scrolling, autoplay, marquees, transform animation and sticky scene choreography; all collection content remains readable in static flow.
- Run an automated browser accessibility check, then manually inspect keyboard focus and reading order. Automated output alone is insufficient.

## E. Future build: SEO/performance

- Server HTML includes product names/descriptions, primary headings and links without waiting for hydration or animated reveals.
- Canonical, title/description, Arabic/English alternates, Open Graph, robots and sitemap derive from locale and configured site URL.
- Demo deployment marked noindex; no fake offers/stock/reviews/contacts in metadata or structured data.
- Initial hero image prioritized, images reserve dimensions, below-fold content lazy-loaded. Check main LCP source and CLS in the production build.
- Fonts use bounded weights/subsets and sensible fallback; Arabic glyphs load correctly. No duplicate heavy font families.
- Only justified client islands; no whole-site `use client`, Framer runtime, or unnecessary animation/state/framework package.
- Performance targets, measured on a defined production-like test setup: LCP ≤2.5s, CLS ≤0.1, interaction latency target ≤200ms. Lab measurements are tuning evidence, not proof of real-user INP. Record tool/network/device context and any missing final-media impact.

## F. Future build: architecture and verification

- `domain` has no React/Next/data/presentation imports; `data` has no presentation imports; presentation has no concrete repository imports.
- App routes compose repositories and server-compatible UI. Client props are serializable, and providers do not force server content into client rendering.
- Small focused repository contracts, functional domain rules, no speculative DI/factories or one-file-per-trivial-operation ceremony.
- Exact stable dependency/runtime versions recorded; actively supported Node LTS; plain Node runtime, no extra custom server.
- Preserve existing project/user changes if the next session runs in an existing repository.

The repository is currently a planning folder, so these build scripts are **proposed**, not verified commands:

```text
npm run typecheck     # expected tsc --noEmit
npm run lint          # expected ESLint CLI, not an assumed Next-specific command
npm run build         # Next production build
npm run start         # browser verification against production output
```

Use the actual scripts/package manager established by the implementation session. Focused tests should prove meaningful cart/catalog/locale behavior; browser checks should cover interaction integration. Do not add implementation-mirroring tests or a large testing framework merely for the plan.

## G. Final handoff/build report

```text
Result: PASS | PARTIAL | BLOCKED
Artifacts / changed files:
Approval record:
Commands with exact output/status:
Browser matrix: route × locale × viewport × motion mode
Reference differences:
Asset status:
Verified / Partial / Unverified / Intentionally omitted / Blocked:
Remaining blockers and next action:
```

Design-contract/board approval was recorded on 2026-10-07. The next build session must inspect the implementation prompt, execution plan and board before editing, then implement one visual vertical slice and compare before expanding to the remaining routes. Completion of this planning package does not mark future build gates as passed.
