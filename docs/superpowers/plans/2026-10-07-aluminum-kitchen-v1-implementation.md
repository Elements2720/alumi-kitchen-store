# Aluminum Kitchen Store V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Use the approved reference board and contract before editing. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual Next.js frontend prototype that recreates Ecomuz's composition and interactions for Egyptian aluminum kitchen cabinets, complete kitchens, packages, units, and custom-design quote flows.

**Architecture:** Use the Next.js App Router as the framework boundary. Keep business types/rules in `src/domain`, mock fixtures/adapters in `src/data`, and server-compatible UI plus narrow client interaction islands in `src/presentation`. Routes compose serializable data into presentation sections; domain has no framework dependencies.

**Tech Stack:** Next.js App Router, React, TypeScript, Node.js LTS runtime, CSS Modules/native CSS, `next/image`, `next/font`, React context/state only where needed, and Vitest for focused domain behavior tests. Do not add Tailwind, a component kit, Framer runtime, a global state package, a CMS, a database, an API server, payment SDK, or an animation library.

**Spec:** `docs/superpowers/specs/2026-10-07-aluminum-kitchen-ecomuz-design.md`  
**Visual audit:** `docs/design/reference-audit.md`  
**Visual contract:** `docs/design/design-contract.md`  
**Approved board:** `design-preview/`  
**Gates:** `docs/design/acceptance-gates.md`  
**Coding prompt:** `docs/design/implementation-prompt.md`

## Global Constraints

- Preserve Ecomuz's recognizable composition and behavior; do not replace it with a generic ecommerce template.
- Authoritative Home order: hero → hand-picked products → three sticky collection scenes → benefits → tabbed image/product collection → story/lookbook collage → shoppable installation image → contact → static gallery → charcoal footer.
- Use actual aluminum-cabinet images when supplied; until then, keep placeholders visibly labeled and never present furniture images as aluminum products.
- Support `/ar` and `/en`; Arabic is RTL and proposed default; English is LTR and the direct reference-comparison layout.
- Render content in server output; use client components only for filters, cart, language switching, galleries, hotspots, tabs, and forms.
- No real order submission, payment, backend, database, dashboard, WhatsApp, email, inventory, account, CMS, live feed, geolocation, or authentication in V1.
- All forms must say that the demo sends/saves nothing. Never log, persist, or put customer input in URLs.
- Use CSS logical properties and avoid unnecessary client-only page trees.
- Compare at 1440×1000, 768×1024, and 390×844; also probe 360 and 1024 for overflow.
- Preserve unrelated working-tree changes in the target repository.
- Do not claim pixel-perfect fidelity; report concrete differences and unverified reference behavior.

## Review Focus

1. **Reference section order and scroll composition:** a generic landing page or reveal-only animation is the most likely fidelity failure. Test the Home section order and capture early/mid/late sticky collection states.
2. **Arabic RTL geometry:** mirrored controls, image focal points, heading wraps, and footer wordmark must remain usable. Test both locales at 390 and 1440.
3. **Product-mode behavior:** fixed-price items must cart; custom items must quote; “Customize this design” must carry the selected design. Test every product kind.
4. **Server/client boundary and SEO:** Home/Shop/Product text must be present without hydration, and interactive islands must not make the route client-only. Inspect production HTML/metadata.
5. **Truthful placeholder/demo behavior:** missing imagery and business facts must stay labeled, and forms must never imply a real order. Test form success/error copy and inspect metadata/alt text.

---

## File map

Create the implementation app in the repository selected by the next session. If that repository already contains an app, preserve its conventions and modify only the relevant files.

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── shop/page.tsx
│   │   ├── shop/[slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── support/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── policies/[slug]/page.tsx
│   │   └── not-found.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── domain/
│   ├── catalog/entities/product.ts
│   ├── catalog/value-objects/locale.ts
│   ├── catalog/value-objects/product-kind.ts
│   ├── catalog/repositories/catalog-repository.ts
│   ├── catalog/catalog-rules.ts
│   ├── cart/cart-item.ts
│   ├── cart/cart-rules.ts
│   ├── content/content-repository.ts
│   └── quote/quote-request.ts
├── data/
│   ├── catalog/mock-products.ts
│   ├── catalog/mock-catalog-repository.ts
│   ├── content/ar.ts
│   ├── content/en.ts
│   └── assets/asset-manifest.ts
├── presentation/
│   ├── components/{site-header,site-footer,product-card,product-gallery,cart-drawer,language-switcher,shoppable-image,forms}/
│   ├── sections/{home,shop,about,support,blog}/
│   ├── state/cart-provider.tsx
│   └── view-models/product-view-model.ts
└── shared/{config,i18n,formatters,types}/
```

Keep files focused. The tree is a boundary guide, not a demand to create empty folders or one class per trivial getter.

## Task 1: Scaffold and verify the Next.js foundation

**Files:**
- Create or modify: `package.json`, `tsconfig.json`, `next.config.*`, `eslint.config.*`, `.gitignore`, `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/shared/config/site.ts`, `src/shared/i18n/locales.ts`
- Test/verification: package scripts and a minimal route build

**Interfaces:**
- Produces `supportedLocales = ['ar', 'en'] as const`, `Locale`, site URL configuration, and scripts for `dev`, `build`, `start`, `lint`, `typecheck`, and focused tests.

- [ ] **Step 1: Inspect the target repository before scaffolding.** Confirm the package manager, existing scripts, Node version files, and unrelated changes. Reuse an existing app if present; do not overwrite project work.
- [ ] **Step 2: Create the smallest App Router TypeScript app.** Use the current stable Next.js/React versions compatible with an actively supported Node.js LTS at execution time, then lock exact versions in the package manifest/lockfile and record them in the build report.
- [ ] **Step 3: Add only justified dependencies.** Production dependencies should be Next.js/React. Add Vitest only as a dev dependency if the repository has no focused test runner. Do not add UI, animation, CMS, state, or payment packages.
- [ ] **Step 4: Add base CSS tokens.** Define white/charcoal/pale-gray roles, 30px desktop and 20px compact rails, 120px/40px section rhythm, 12px media/editorial radius, 6px control radius, logical properties, focus styles, and reduced-motion defaults.
- [ ] **Step 5: Run the foundation checks.** Run the actual scripts created in the repository: typecheck, lint, and production build. Expected: all exit 0 and the minimal route renders.

## Task 2: Implement domain types, rules, and mock repositories

**Files:**
- Create: `src/domain/catalog/entities/product.ts`, `src/domain/catalog/value-objects/locale.ts`, `src/domain/catalog/value-objects/product-kind.ts`
- Create: `src/domain/catalog/repositories/catalog-repository.ts`, `src/domain/catalog/catalog-rules.ts`
- Create: `src/domain/cart/cart-item.ts`, `src/domain/cart/cart-rules.ts`, `src/domain/quote/quote-request.ts`
- Create: `src/domain/content/content-repository.ts`
- Create: `src/data/catalog/mock-products.ts`, `src/data/catalog/mock-catalog-repository.ts`, `src/data/content/ar.ts`, `src/data/content/en.ts`, `src/data/assets/asset-manifest.ts`
- Test: `src/domain/**/*.test.ts` or repository-standard test location

**Interfaces:**
- `type Locale = 'ar' | 'en'`.
- `type ProductKind = 'complete-kitchen' | 'package' | 'unit' | 'custom'`.
- `type LocalizedText = { ar: string; en: string }`.
- `type ProductImage = { id: string; src: string; alt: LocalizedText; width: number; height: number; role: 'hero' | 'gallery' | 'thumbnail' }`.
- `type ProductFilters = { kind?: ProductKind; tag?: string; query?: string }`.
- `type Product = { id: string; slug: string; kind: ProductKind; title: LocalizedText; description: LocalizedText; category: LocalizedText; shape?: LocalizedText; price?: number; startingPrice?: number; currency: 'EGP'; images: ProductImage[]; dimensions: LocalizedText; finish: LocalizedText; includedUnits: LocalizedText[]; tags: string[]; featured: boolean }`.
- `interface CatalogRepository { listProducts(filters?: ProductFilters): Product[]; getProductBySlug(slug: string): Product | undefined; getFeaturedProducts(): Product[] }`.
- Cart operations are pure functions: `addItem`, `removeItem`, `setQuantity`, `getCartTotal`, `clearCart`; quantities never fall below 1 and same product IDs merge.
- Quote validation accepts `{ name: string; phone: string; area: string; dimensions?: string; preferences?: string; notes?: string; productId?: string }` and returns field errors without network calls or persistence.

- [ ] **Step 1: Write domain tests first.** Cover all four product kinds, fixed price vs starting price, cart merge/minimum quantity/total/clear, filters/no-results, localized text selection, and quote required fields.
- [ ] **Step 2: Run the focused tests and confirm the new tests fail for missing rules.** Use the repository's test command, expected failure before implementation.
- [ ] **Step 3: Implement pure domain types and rules.** Keep them framework-free and independent from data/presentation.
- [ ] **Step 4: Create bilingual mock fixtures.** Include at least one complete kitchen, one package, two individual units including an upper cabinet and sink unit, and one custom design. Mark prices/specifications as demo content in presentation copy; do not invent stock/warranty/review claims.
- [ ] **Step 5: Implement the mock repository against the domain interface.** Filters must support product kind and tags; no concrete repository may be imported by presentation components.
- [ ] **Step 6: Run focused tests and typecheck.** Expected: all domain tests pass and no layer/import errors occur.

## Task 3: Add locale routing, server layouts, metadata, and shared shell

**Files:**
- Create: `src/app/[locale]/layout.tsx`, `src/app/[locale]/not-found.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Create: `src/shared/i18n/locale-utils.ts`, `src/shared/formatters/currency.ts`, `src/shared/config/metadata.ts`
- Create: `src/presentation/components/site-header/*`, `src/presentation/components/site-footer/*`, `src/presentation/components/language-switcher/*`
- Test: locale utility tests and browser checks

**Interfaces:**
- `isLocale(value: string): value is Locale`, `getDirection(locale): 'rtl' | 'ltr'`, `getAlternateLocale(locale): Locale`, and locale-preserving route helpers.
- Locale layout sets `<html lang>` and `dir`, loads Public Sans and the selected Arabic font with bounded weights, and renders header/footer around route content.

- [ ] **Step 1: Test locale utilities.** Assert `ar → rtl`, `en → ltr`, valid/invalid locale handling, and equivalent route switching.
- [ ] **Step 2: Implement root redirect and locale layout.** Redirect `/` to `/ar`; invalid locale gets localized not-found behavior; route content stays server-rendered.
- [ ] **Step 3: Implement metadata helpers.** Generate locale-aware title/description, canonical, Open Graph, and `alternates.languages` from configured site URL. Use `noindex` for the demo deployment configuration and do not include fake Offer/stock/review data.
- [ ] **Step 4: Implement semantic header/footer shell.** Match Ecomuz's inset translucent header, desktop nav, compact menu, cart count role, dark footer, large fitted wordmark, page/policy links, and demo-data labels.
- [ ] **Step 5: Run tests, typecheck, lint, and inspect server HTML.** Confirm heading/link content is present before hydration and both locale directions render.

## Task 4: Build the first visual vertical slice — Home hero and product row

**Files:**
- Create: `src/app/[locale]/page.tsx`
- Create: `src/presentation/sections/home/home-page.tsx`, `src/presentation/sections/home/hero/*`, `src/presentation/sections/home/featured-products/*`
- Create: `src/presentation/components/product-card/*`, `public/assets/*` or the repository-approved asset location, `src/data/assets/asset-manifest.ts` updates
- Test/evidence: browser screenshots at 1440×1000, 768×1024, 390×844 for English and Arabic

**Interfaces:**
- Server `HomePage` receives locale, translated content, featured products, and asset manifest.
- Client `HeroCarousel` exposes keyboard/focusable slide buttons, manual selection, and reduced-motion behavior.
- Product card exposes links and the fixed-price/custom CTA based on `ProductKind`.

- [ ] **Step 1: Inspect `design-preview/` and the captured Ecomuz hero/product evidence before writing JSX.** Use it as the visual source; do not recreate from memory.
- [ ] **Step 2: Implement the hero composition.** Full-height two-slide media, inset translucent header, short two-line heading, CTA, bottom-left thumbnail rail, deliberate object position, and visible placeholder labels if final cabinet assets are unavailable.
- [ ] **Step 3: Implement the hand-picked product section.** Four square product cards on desktop, reference density on compact widths, demo price labels, and crawlable links.
- [ ] **Step 4: Add hero manual controls and reduced-motion handling.** Do not make content depend on autoplay; pause/disable automatic motion with reduced motion.
- [ ] **Step 5: Capture the vertical-slice matrix and compare against `home-top-*` evidence.** Record concrete differences and correct geometry before continuing.
- [ ] **Step 6: Run typecheck/lint/build and focused UI checks.** Expected: no horizontal overflow at 360/390/768/1024/1440; Arabic heading and header remain usable.

## Task 5: Implement sticky collections, benefits, tabs, and lookbook composition

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/presentation/sections/home/collections/*`, `benefits/*`, `tabs/*`, `lookbook/*`
- Create: focused interaction tests for tab selection and reduced motion

**Interfaces:**
- `StickyCollectionScene` receives a collection image, caption, progress, and static fallback.
- `CollectionTabs` accepts `activeTab`, `onTabChange`, and localized tab/product data.

- [ ] **Step 1: Add tests for tab selection, selected accessibility state, and reduced-motion static rendering.** Assert all collection content stays reachable when motion is reduced.
- [ ] **Step 2: Implement three true sticky, scroll-linked full-bleed scenes.** Use CSS sticky plus a small requestAnimationFrame progress controller; preserve inset light caption cards and image scale from the reference.
- [ ] **Step 3: Implement the four outlined benefits cards.** Use truthful demo capability copy; no unsupported warranties/guarantees.
- [ ] **Step 4: Implement the centered three-tab collection.** Keep large editorial image + compact product grid; tabs are semantic buttons with visible selection.
- [ ] **Step 5: Implement the asymmetric story/lookbook collage.** Map mobile-app promotional role to a custom-design/quote CTA; use labeled placeholders for missing cabinet/workshop media.
- [ ] **Step 6: Verify normal and reduced-motion scroll states at desktop and compact widths.** Capture early/mid/late scene states and ensure no content disappears in reduced motion.

## Task 6: Implement hotspots, contact, gallery, and footer completion

**Files:**
- Create: `src/presentation/components/shoppable-image/*`, `src/presentation/sections/home/contact/*`, `gallery/*`
- Modify: `src/app/[locale]/page.tsx`, footer components, asset manifest
- Test: hotspot keyboard/focus tests and browser evidence

**Interfaces:**
- `ShoppableImage` takes mapped hotspot records `{ id, x, y, productSlug, label }`, clamps popovers to image bounds, and emits a product link.

- [ ] **Step 1: Test hotspot open/close, Escape, focus return, and mapped product link.** Test compact viewport placement.
- [ ] **Step 2: Implement the shoppable installation image.** Three upper/lower/sink unit hotspots; no fixed viewport coordinates; placeholder mapping stays visible until real image supplied.
- [ ] **Step 3: Implement contact section and static gallery.** Preserve Ecomuz asymmetric layout; use demo contact/location roles without fake factual claims.
- [ ] **Step 4: Implement the large charcoal footer.** Include demo subscription-shaped UI, wordmark fitting in both locales, page/policy links, and social roles without live integrations.
- [ ] **Step 5: Verify complete Home order and build checks.** Confirm no extra Projects/Configurator nav items.

## Task 7: Implement Shop route, search/filter state, empty/error/loading states

**Files:**
- Create: `src/app/[locale]/shop/page.tsx`, `src/presentation/sections/shop/*`, `src/presentation/components/forms/catalog-filters/*`
- Create: client filter/search island and its test

**Interfaces:**
- `ShopPage` receives server catalog data; `CatalogFilters` receives products and returns filtered IDs/search state through client state.
- Query params may hold non-sensitive search/filter values; never put customer input into the URL.

- [ ] **Step 1: Test kind/tag/search filtering, clear-all, and zero-result behavior.** Assert custom designs show quote CTA and fixed items show cart CTA.
- [ ] **Step 2: Implement desktop side rail + three-column square grid.** Match reference search/filter hierarchy and labels.
- [ ] **Step 3: Implement compact search and two filter groups above a one-column grid.** Verify at 390 and 768; no horizontal chip toolbar substitution.
- [ ] **Step 4: Add localized metadata, empty state, invalid filter normalization, and route links.** Keep catalog/product content server-rendered.
- [ ] **Step 5: Verify at 1440/768/390 and run checks.** Capture a search/no-result case and a cleared state.

## Task 8: Implement Product detail, cart, demo checkout, and quote flow

**Files:**
- Create: `src/app/[locale]/shop/[slug]/page.tsx`, `src/presentation/sections/shop/product-detail/*`, `product-gallery/*`
- Create: `src/presentation/components/cart-drawer/*`, `src/presentation/components/forms/order-form/*`, `quote-form/*`, `src/presentation/state/cart-provider.tsx`
- Modify: domain cart/quote tests and product metadata helpers
- Test: cart and quote integration tests plus browser checks

**Interfaces:**
- Cart provider exposes `items`, `add`, `remove`, `setQuantity`, `clear`, `total`; all operations delegate to pure domain rules.
- `ProductDetail` receives one `Product` and related products; CTA behavior is selected by kind.
- `QuoteForm` receives optional `product` and returns only local validation/success state.

- [ ] **Step 1: Extend tests for merge quantity, min quantity, remove/clear/total, fixed vs custom CTA, and quote validation/simulated success.** Assert no network/persistence calls.
- [ ] **Step 2: Implement desktop detail geometry.** Start-side info, central large square image, end-side vertical thumbnails, breadcrumb, quantity, demo price, and related products.
- [ ] **Step 3: Implement compact detail ordering.** Main image and horizontal thumbnails precede information; reserve image dimensions.
- [ ] **Step 4: Implement in-memory cart drawer/empty state.** Use a neutral design matching reference tokens; do not claim the reference drawer was reproduced exactly.
- [ ] **Step 5: Implement demo order form.** Name, phone, area/address, notes; validation and explicit “not sent/saved” success identifier.
- [ ] **Step 6: Implement custom quote form.** Preselect design, optional dimensions/preferences/notes, local image preview with object URL cleanup, validation and simulated success.
- [ ] **Step 7: Verify fixed-price, package, unit, and custom products at both locales.** Test keyboard dialogs/focus and language switching with cart state intact.

## Task 9: Implement About, Support, Blog/article, policy, and not-found routes

**Files:**
- Create route files under `src/app/[locale]/about`, `support`, `blog`, `blog/[slug]`, `policies/[slug]`
- Create: `src/presentation/sections/about/*`, `support/*`, `blog/*`, `policies/*`
- Create/modify: bilingual content fixtures and content repository
- Test: route resolution and metadata checks

- [ ] **Step 1: Add route/content tests.** Every linked slug resolves in `ar` and `en`; unsupported slugs produce localized not-found; article/policy content is not empty.
- [ ] **Step 2: Implement About.** Use title, three-image strip, mission/vision, design-to-installation timeline, sample location roles, and FAQ; avoid invented history/guarantees.
- [ ] **Step 3: Implement Support.** Desktop contacts/form split; compact form-first ordering; local validation and demo success.
- [ ] **Step 4: Implement Blog and article detail.** Media-first three-column desktop journal, compact single column, narrow article rail, bilingual kitchen topics.
- [ ] **Step 5: Implement policies and not-found.** Match reading-panel composition; mark policy content as demo/draft and avoid copied business claims.
- [ ] **Step 6: Verify links, locale metadata, responsive layouts, and production build.** Check page headings and canonical/alternate output.

## Task 10: Final verification and handoff report

**Files:**
- Modify: `docs/design/review-status.md` or a build report in the implementation repository
- No production feature files unless a verification fix is required

- [ ] **Step 1: Run exact repository checks.** `npm run typecheck`, `npm run lint`, focused test command, `npm run build`, and production `npm run start` browser checks. Record exact outputs.
- [ ] **Step 2: Run browser matrix.** Test Home/Shop/Product/About/Support/Blog/article/policy across `ar`/`en`, 1440×1000, 768×1024, 390×844; probe 360/1024 overflow; test reduced motion.
- [ ] **Step 3: Run accessibility checks.** Use axe plus manual keyboard/focus/reading order/contrast review with final assets or record the final asset blocker.
- [ ] **Step 4: Inspect SEO output.** Confirm server HTML, headings, canonical, alternates, Open Graph, sitemap, robots, noindex demo setting, and no fake offer/review/stock claims.
- [ ] **Step 5: Review architecture imports and dependency diff.** Confirm domain/framework separation, narrow client islands, no unnecessary production dependencies, and no unrelated changes.
- [ ] **Step 6: Write the final report using the required statuses.** Include changed files, commands, browser matrix, asset status, known concrete differences, blockers, and intentionally omitted future integrations.

## Execution stop condition

Stop after the V1 public frontend, labeled mock content, local interactions, responsive/motion/SEO/accessibility checks, and final report are complete. Do not continue into backend, payment, WhatsApp, dashboard, real order persistence, CMS, authentication, or production content operations.

## Next-phase TODO: real purchase flow

This work is deliberately outside the current plan. After V1 review, create a separate plan for:

1. Backend/API order contracts and database persistence.
2. Real order creation from the current cart/order-form contracts.
3. Payment or cash-on-delivery handling.
4. WhatsApp/email notifications.
5. Admin dashboard and order status management.
6. Inventory and order-tracking rules.

The V1 build should leave replacement seams for these capabilities, not partial integrations.
