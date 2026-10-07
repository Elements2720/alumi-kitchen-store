# Next-session implementation prompt — Aluminum Kitchen Store V1

You are the implementation agent for the approved Aluminum Kitchen Store V1. Build the public frontend in the target repository using the supplied plan and visual contract. This is a handoff after design approval; do not reopen the design direction unless a concrete contradiction is found.

## 1. Goal and audience

Create a bilingual Arabic/English storefront prototype for Egyptian customers exploring aluminum kitchen cabinets and units. The website must closely recreate the supplied Ecomuz reference's visual composition and behavior while replacing furniture content with:

- complete standard kitchens with fixed demo prices;
- packages of upper/lower units;
- individual units such as wall cabinets, base cabinets and sink units;
- custom kitchen designs with request-a-quote behavior.

V1 is a polished frontend demo. Customers must understand the product modes and the eventual order/quote intent, but no request is sent or saved.

**Phase boundary:** build the frontend now. Real purchase flow is an explicit next-phase TODO and must not be implemented in this session.

## 2. Approved source of truth

Read these files before editing:

1. `docs/design/reference-audit.md` — observed/inferred/proposed reference evidence.
2. `docs/design/design-contract.md` — approved visual/interaction contract.
3. `design-preview/index.html`, `styles.css`, `preview.js` — representative board; inspect it in a browser.
4. `docs/design/acceptance-gates.md` — required evidence and final statuses.
5. `docs/superpowers/specs/2026-10-07-aluminum-kitchen-ecomuz-design.md` — product/scope/architecture requirements.
6. `docs/superpowers/plans/2026-10-07-aluminum-kitchen-v1-implementation.md` — task sequence and interfaces.

Reference URL: https://ecomuz.framer.ai/

The user approved the board and contract on 2026-10-07: “wow this looks great, i approve and make the handoff to next session”. The user requested the implementation in a separate session.

Compare the build at 1440×1000, 768×1024, and 390×844, then probe 360 and 1024. Do not recreate the reference from memory or from a generic ecommerce template.

## 3. Scope and non-goals

### Required

- App Router pages for `/ar` and `/en`:
  - `/{locale}`
  - `/{locale}/shop`
  - `/{locale}/shop/{slug}`
  - `/{locale}/about`
  - `/{locale}/support`
  - `/{locale}/blog`
  - `/{locale}/blog/{slug}`
  - `/{locale}/policies/{slug}`
- Home sequence exactly as approved: hero → products → sticky collections → benefits → tabs/products → lookbook → hotspots → contact → gallery → footer.
- Arabic RTL and English LTR with locale-preserving navigation.
- Fixed-price demo cart and custom quote demo.
- Search/filter, product gallery, tabs, FAQ, mobile nav, hero controls, hotspots, forms, loading/empty/error/success states.
- Server-rendered product/editorial content, localized metadata, canonical/alternate/Open Graph, sitemap, robots, and demo noindex configuration.
- Clean `data`, `domain`, `presentation` boundaries and SOLID-focused contracts.

### Explicit non-goals

Do not add real order submission, payment, backend, database, dashboard, WhatsApp/email notifications, inventory, accounts, order tracking, coupons, CMS, live social feeds, geolocation, authentication, tenancy, or upload services.

Do not import Framer runtime, Tailwind, a component library, an animation package, or an external global-state package just to approximate the reference.

### Next-phase TODO: real purchase flow

After V1 review, plan and implement separately:

```text
Backend/API → database → real order creation
→ payment or cash-on-delivery handling
→ WhatsApp/email notification
→ admin dashboard → order status tracking
```

Do not partially implement these integrations now. Keep the cart and demo-form contracts replaceable so a later order repository can connect without changing the visual components.

## 4. Route and section map

Use the exact route and Home section map in the approved contract. Each route must have a localized primary heading and crawlable links. Keep `app` route files thin: fetch/compose data, set metadata, render presentation sections.

## 5. Stack and dependency rules

- Next.js App Router, React, TypeScript, Node.js LTS runtime.
- Select the current stable compatible Next.js/React versions at execution time and record exact versions in the manifest/lockfile/build report.
- Native CSS/CSS Modules, logical CSS properties, `next/image`, `next/font`.
- Use React context/state only for narrow local client interaction, especially cart state.
- Use Vitest only if a focused test runner is not already present; tests must cover domain behavior, not mirror JSX.
- Server Components by default. Client components only for filters, cart, locale switch, galleries, hotspots, tabs, and forms.
- Use no custom Express server and no Edge-only architecture.

## 6. Design tokens and component contracts

Use the token roles in `design-contract.md`: white/charcoal/pale-gray surfaces, Public Sans English, proposed Noto Sans Arabic, 64/40 hero type anchors, 40/22 section headings, 30/20 rails, 120/40 section rhythm, 20/24 gaps, 12px editorial media radius, and 6px header/control radius.

Required component responsibilities:

- `SiteHeader`: reference inset translucent header, desktop nav, mobile menu, cart count, locale control.
- `HeroCarousel`: two slides, manual thumbnail buttons, keyboard/focus state, reduced-motion behavior.
- `ProductCard`: square media, kind badge, demo price/starting-price treatment, correct fixed/custom CTA.
- `StickyCollectionScene`: full-bleed image, inset caption card, scroll progress and static reduced-motion path.
- `CollectionTabs`: semantic tabs and selected state.
- `ShoppableImage`: mapped hotspots, clamped popover, Escape/focus return, product link.
- `ProductGallery`: desktop vertical thumbnails and compact horizontal thumbnails.
- `CartProvider/CartDrawer`: in-memory cart only; delegate quantity/total rules to domain.
- `QuoteForm/OrderForm/SupportForm`: local validation, explicit demo copy, no persistence/network.
- `SiteFooter`: dark reference footer, fitted localized wordmark, demo contact/policy/social roles.

## 7. Content and assets

Use fixtures that include all four product kinds. Keep all prices/specifications/contacts/brand values visibly demo/sample until supplied. Do not invent business history, warranty, guarantees, testimonials, stock, reviews, delivery claims, or real locations.

The board's furniture files are reference-only staging assets. Use labeled placeholders until approved aluminum-cabinet photos/renders arrive. Final asset manifest entries must include source, rights/approval status, dimensions, locale alt text, mobile/desktop focal points, and product/hotspot mapping.

Hero and editorial media should show upper and lower aluminum cabinets when final assets are available; isolated product media should show actual units on consistent square backgrounds. Do not let generic interior furniture imagery imply aluminum construction.

## 8. Rendering/data boundaries

Dependency direction:

```text
app composition → presentation → domain
app composition → data → domain
domain → no framework/data/presentation dependencies
```

Domain owns product/cart/quote types and pure rules. Data owns mock fixtures and repository implementation. Presentation receives serializable data and does not import concrete repositories. Do not add a DI container or abstract factories for trivial operations.

Keep text/product content in server HTML. Do not hide complete pages behind client hydration or animation. Reserve image dimensions; prioritize only the initial hero/LCP image; lazy-load below-fold media.

Implement loading boundaries only where a real route/media boundary exists; do not fabricate delays. Include empty/zero-results, invalid slug, form validation, image failure, and simulated-success states.

## 9. Responsive and motion implementation

Match source evidence at 1440, 768, 390. Preserve observed desktop side rails and compact one-column Shop behavior. Product detail switches from info/image/thumb columns to media/thumbs before info. Support switches from contacts/form split to form-first. Arabic wraps naturally and remains readable.

Implement sticky collections as actual scroll-linked composition using CSS sticky and a small requestAnimationFrame controller. Do not replace it with one-time fade reveals. Hero autoplay timing is inferred; keep it modest, manually controllable, pausable, and disabled under reduced motion.

Under `prefers-reduced-motion: reduce`, or the implementation's equivalent explicit preference, disable root smooth scrolling, autoplay, marquee/label rolls, parallax and transform choreography; render collection content in normal static flow.

## 10. Accessibility, SEO, privacy, security

- Use semantic headings/landmarks, localized alt text, real links, labels, visible focus, keyboard-operable menus/galleries/tabs/FAQs/hotspots/dialogs, and Escape/focus-return behavior.
- Check contrast against final media; if assets remain placeholders, record the gate as partial rather than claiming it passed.
- Generate locale metadata, canonical, Arabic/English alternates, Open Graph, sitemap and robots from configured site URL.
- Mark demo deployment noindex. Do not include fake Offer, stock, review, customer/contact, or business-history claims in JSON-LD, metadata or alt text.
- Keep customer fields in memory only. No analytics, localStorage, query strings, logs, or network requests for form data. Local object URLs must be revoked.

## 11. Implementation order

Follow `docs/superpowers/plans/2026-10-07-aluminum-kitchen-v1-implementation.md`:

1. Inspect repository and scaffold foundation.
2. Build domain rules and data fixtures with focused tests.
3. Build locale/layout/metadata shell.
4. Build Home hero + product row as the first visual vertical slice.
5. Stop and compare at all required widths before continuing.
6. Add sticky collections, benefits, tabs, lookbook, hotspots, contact, gallery, footer.
7. Add Shop and Product detail/cart/quote flows.
8. Add About/Support/Blog/article/policy routes.
9. Run the full acceptance/verification matrix and final difference report.

## 12. Verification commands and evidence

Use the repository's actual package manager/scripts. Expected scripts are:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run start
```

If script names differ, record the exact replacement. Browser evidence must list route × locale × viewport × motion mode. Run axe plus manual keyboard/focus/reading-order checks. Inspect production HTML/metadata and layer imports. Do not claim a gate passed without command/browser evidence.

## 13. Final report

Finish with:

```text
Result: PASS | PARTIAL | BLOCKED
Implemented: routes, sections, motion, responsive and asset behavior
Files changed: every added/modified/deleted file
Commands: PASS/FAIL/BLOCKED with exact commands
Browser evidence: route × locale × viewport × motion mode × observed result
Metadata/privacy/security evidence:
Known issues or blockers: verified issues only
Asset status: final vs placeholder
Scope check: unrelated files/dependencies/features changed?
Observable differences from Ecomuz: concrete differences and reasons
```

Before editing, inspect the approved board and preserve unrelated working-tree changes. At the end, update the build report without altering the approved contract unless a specific, documented discrepancy is discovered.

## 14. Phase boundary reminder

The success condition for this session is a complete, tested frontend prototype with simulated cart/order/quote behavior. A success message is local UI state only. Real buying, payment, order persistence, notifications, dashboard, inventory, and tracking are next-phase TODOs, not missing V1 work.
