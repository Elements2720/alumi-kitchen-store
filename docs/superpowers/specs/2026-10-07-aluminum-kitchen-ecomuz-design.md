# Aluminum Kitchen Store — Ecomuz-Based V1 Design

**Date:** 2026-10-07  
**Status:** Specification, measured design contract and board approved for handoff on 2026-10-07; implementation not started  
**Reference:** https://ecomuz.framer.ai/

**Visual source of truth:** [Reference audit](../../design/reference-audit.md) and [design contract](../../design/design-contract.md), together with captured evidence and `design-preview/`. The audit corrects assumptions from the initial text-only specification. The visual contract governs section order, geometry, responsive behavior, motion, and explicit adaptations.

**Execution:** [Implementation plan](../plans/2026-10-07-aluminum-kitchen-v1-implementation.md) and [coding prompt](../../design/implementation-prompt.md). The user selected implementation in a separate session.

## 1. Purpose

Build a bilingual Arabic/English frontend prototype for an aluminum-kitchen store. The site will use Ecomuz as the primary visual and structural template: the same page hierarchy, section rhythm, navigation pattern, product-grid treatment, product-detail composition, footer treatment, and interaction style should be recreated as closely as practical.

The content and imagery will be replaced with aluminum-kitchen content. The product category is specifically the kitchen cabinet/unit system commonly sold in Egypt: wall-mounted upper cabinets, lower cabinets, sink units, packages, complete standard kitchens, and custom kitchen designs.

V1 is a polished frontend experience using mock data. It does not process real orders or payments.

## 2. Design direction

The approved direction is a close Ecomuz recreation, not a new dashboard-style kitchen design.

### Preserve from Ecomuz

- Header and navigation pattern
- Hero composition and editorial image treatment
- Section order and visual rhythm
- Typography scale and whitespace density
- Rounded cards, buttons, labels, and product-grid behavior
- Shop page structure
- Product-detail page structure
- Supporting pages and footer structure
- Scroll and hover behavior where practical

### Replace for the kitchen business

- Brand name, logo, and brand copy
- Furniture photography
- Furniture categories and product names
- Furniture specifications and pricing
- Furniture benefits and support content
- Store-location content when real locations are not available

The previously explored Warm Craft palette can guide the mood of kitchen imagery and content, but it must not change the Ecomuz-based layout or make the product feel like a different website.

## 3. Product model

V1 displays four product modes:

1. **Complete standard kitchen** — a defined configuration with dimensions, included units, and a fixed displayed price.
2. **Kitchen package** — a fixed-price group of upper/lower units or a specific configuration.
3. **Individual unit** — a standard wall cabinet, lower cabinet, sink unit, drawer unit, corner unit, or similar component with a fixed displayed price.
4. **Custom design** — a design reference with a “starting from” price or no exact price and a request-a-quote CTA.

Every product detail view should communicate which mode it uses. Fixed-price products expose the prototype “Add to cart” interaction. Custom designs expose the “Request a quote” interaction.

### Product information

Product cards and detail pages may show:

- Arabic and English product names
- Product images or renders
- Product type and badges
- Dimensions
- Aluminum material/finish
- Color
- Included units or package contents
- Installation/delivery notes as informational content
- Fixed price or starting price label
- Related designs/products

Final imagery must focus on actual aluminum kitchen cabinets and units, particularly upper cabinets above the countertop, lower cabinets, sink units, cabinet doors, handles, finishes, and installed examples. Generic kitchen-interior photography may be used only as contextual supporting imagery.

## 4. Pages and content mapping

The route set follows the Ecomuz structure, with kitchen-specific content.

### Home

Use the Ecomuz-style editorial homepage sequence:

1. Header/navigation
2. Two-slide, full-height photographic hero for aluminum kitchen systems
3. Hand-picked kitchen products row
4. Three sticky, full-bleed kitchen collection scenes
5. “Why choose us?” benefits
6. Tabbed collection with a large editorial image and product grid
7. Asymmetric kitchen lookbook/story collage, including the custom-design promotion
8. Shoppable installation image with three unit hotspots
9. Contact/location section
10. Static social/gallery treatment
11. Footer

Suggested content substitutions:

- Collections: Modern Kitchens, Classic Kitchens, L-Shaped Kitchens, U-Shaped Kitchens, Upper Cabinets, Kitchen Packages.
- Benefits: sample cabinet/material descriptions, measurement/design roles, and installation information. Concrete material properties, guarantees and warranty terms require supplied business/product evidence.
- Lookbook: completed kitchens, upper-cabinet details, handles/finishes, and before/after projects.
- Custom CTA: “Design your kitchen according to your space” / “صمم مطبخك حسب مساحتك”.

### Shop

Keep the Ecomuz shop grid and filtering feel. Categories are:

- All products
- Complete kitchens
- Packages and units
- Custom designs

V1 filtering works over server-provided mock data. Preserve the observed desktop search/filter side rail and three-column grid. At the inspected 768/390 widths, search/filter groups move above a single-column grid. Use product type and collection tags in the reference control style; avoid adding unrelated advanced filters.

### Product detail

Keep the Ecomuz breadcrumb, image gallery, product information block, pricing treatment, quantity control, and related-products structure.

- Fixed-price products show a fixed price and prototype cart action.
- Custom products show a starting price when available and a prototype quote-form action.
- Fixed-price designs also support “Customize this design”; this neutral secondary CTA replaces the reference payment-branded CTA.
- The quote form carries the selected product/design and ends in an explicitly simulated success state. No data is sent or saved.
- Desktop: information, central large image, vertical thumbnail rail. Compact: image and horizontal thumbnails before information.

### About

Keep the reference page's story, mission/vision, timeline, locations, and FAQ composition. Use a design-to-installation process timeline while real company history is unavailable. Contacts, locations, and guarantees are visibly sample content, not invented business facts.

### Support

Keep the reference contact-page structure and form presentation. The form is a frontend-only prototype in V1 and does not send or persist data.

### Blog

Keep the reference journal/listing structure. Use kitchen topics such as cabinet material care, choosing upper-unit dimensions, kitchen layout planning, color/finish selection, and small-space storage.

Include lightweight article-detail pages and policy-page shells so reference navigation/card/footer links resolve. Use a few bilingual sample articles and explicitly demo/draft policy content; do not copy another business's promises.

## 5. V1 behavior and boundaries

### Included

- Bilingual Arabic/English presentation
- Arabic RTL and English LTR layouts
- Language switcher
- Ecomuz-style responsive pages
- Mock catalog and mock editorial content
- Client-side shop filters
- Product detail routes
- Client-side cart state for demonstration
- Add/remove/update quantity interactions
- Demo checkout/customer-details form with explicitly simulated confirmation
- Quote and support form validation states
- Two-slide hero controls, mobile navigation, tabs, FAQs, product gallery, and shoppable-image hotspots
- True scroll-linked collection composition, with a static reduced-motion alternative
- Article detail, policy shells, and localized not-found views
- Loading, empty, error, and success UI states
- Responsive behavior for mobile, tablet, and desktop

### Deferred

- Real order submission
- Payment processing
- Backend or database
- Admin dashboard
- WhatsApp order notifications
- Email order notifications
- Inventory management
- Customer accounts and order tracking
- Coupons and advanced promotions
- CMS integration

The frontend should keep clear seams for those future capabilities without implementing them in V1.

## 6. Approved technical approach

### Stack

- Next.js
- React
- TypeScript
- Node.js runtime
- Native CSS/CSS Modules for styling and precise visual control
- React built-ins for local interactive state
- Mock TypeScript data for V1

### SEO and performance rules

- Use the Next.js App Router and server-rendered route content.
- Keep page content and product metadata available to the server; do not make complete pages client-only.
- Use Server Components by default and add `use client` only to interactive islands such as cart controls, filters, language switching, and forms.
- Use semantic HTML, real links, headings, landmarks, and accessible form labels.
- Use `next/image` for local/approved remote imagery and explicit image dimensions.
- Use `next/font` or a deliberately selected local/web font strategy with minimal loading cost.
- Use native CSS transitions and keyframes for V1; do not add a heavy animation library solely to imitate simple reference motion.
- Use a minimal scroll-progress controller for the observed sticky editorial scenes; do not replace scroll-linked composition with generic reveal effects. Disable transforms, autoplay, marquees, and smooth root scrolling under reduced motion.
- Avoid unnecessary UI frameworks, state-management packages, CMS packages, and client-side data-fetching packages.
- Generate locale-aware metadata and `hreflang` relationships for Arabic and English routes.
- Add structured metadata matching visible content; omit real Offer/stock/review claims for mock products. Demo previews use noindex while retaining server-rendered, SEO-ready architecture.
- Preserve crawlable links between Home, Shop, product pages, About, Support, and Blog.
- Add localized canonical/alternate/Open Graph metadata, sitemap and robots configuration. Production URL and deployment target remain user-supplied configuration.
- Select current stable compatible Next.js/React/TypeScript releases and an actively supported Node.js LTS during implementation; record exact versions. No separate Express server or Edge-only runtime is required.

## 7. Clean architecture

The project will be scaffolded into `data`, `domain`, and `presentation` layers. Next.js route files remain framework adapters that compose those layers.

### Dependency direction

```text
app routes / composition → presentation → domain
app routes / composition → data → domain
domain → no framework, data, or presentation dependencies
```

- **Domain** contains business concepts and contracts and must not import React or Next.js.
- **Data** contains mock catalog/content implementations and satisfies domain repository contracts.
- **Presentation** contains UI components, sections, view models, and interaction state.
- **App routes** contain route composition, metadata, locale parameters, and server-side page assembly.
- Presentation receives serializable data from route composition and does not import concrete data repositories. Construct the mock adapter directly at the composition boundary; do not add a DI container or generic repository factory.

### SOLID application

- **Single Responsibility:** separate catalog lookup, translation selection, cart state, form validation, and visual rendering.
- **Open/Closed:** add a real repository or CMS adapter by implementing the existing repository interface rather than rewriting presentation components.
- **Liskov Substitution:** mock repositories and future API repositories return the same domain-level catalog contracts.
- **Interface Segregation:** use focused interfaces such as catalog lookup and content lookup instead of one broad store interface.
- **Dependency Inversion:** presentation and domain services depend on repository contracts; data provides the implementation.

### Proposed scaffold

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
│   ├── catalog/
│   │   ├── entities/
│   │   │   └── product.ts
│   │   ├── value-objects/
│   │   │   ├── locale.ts
│   │   │   └── product-kind.ts
│   │   ├── repositories/
│   │   │   └── catalog-repository.ts
│   │   └── catalog-rules.ts
│   ├── cart/
│   │   ├── cart-item.ts
│   │   └── cart-rules.ts
│   ├── content/
│   │   └── content-repository.ts
│   └── quote/
│       ├── quote-request.ts
│       └── quote-rules.ts
├── data/
│   ├── catalog/
│   │   ├── mock-products.ts
│   │   └── mock-catalog-repository.ts
│   ├── content/
│   │   ├── ar.ts
│   │   └── en.ts
│   └── assets/
│       └── asset-manifest.ts
├── presentation/
│   ├── components/
│   │   ├── site-header/
│   │   ├── site-footer/
│   │   ├── product-card/
│   │   ├── product-gallery/
│   │   ├── cart-drawer/
│   │   ├── language-switcher/
│   │   ├── shoppable-image/
│   │   └── forms/
│   ├── sections/
│   │   ├── home/
│   │   ├── shop/
│   │   ├── about/
│   │   ├── support/
│   │   └── blog/
│   ├── state/
│   │   └── cart-provider.tsx
│   └── view-models/
│       └── product-view-model.ts
└── shared/
    ├── config/
    ├── i18n/
    ├── formatters/
    └── types/
```

The exact file count may be reduced during implementation when a boundary would otherwise create empty ceremony. The layer boundaries and dependency direction are required; speculative abstractions are not.

Do not create one class or use-case file for trivial getters. Introduce an abstraction only for a real responsibility or replacement seam. Domain locale/product types must not depend on UI configuration.

## 8. Localization

- Supported locales: `ar` and `en`.
- Use locale-prefixed routes such as `/ar/shop` and `/en/shop`.
- Arabic is the default entry experience for the Egypt-focused audience; the root route may redirect to `/ar`.
- Set `dir="rtl"` for Arabic and `dir="ltr"` for English at the locale layout boundary.
- Keep product names, descriptions, navigation labels, CTA text, validation messages, and metadata localized.
- Do not concatenate translated sentence fragments in components.
- Keep layout components direction-agnostic using logical CSS properties where possible.
- Switching language preserves equivalent product/article routes and local cart state. Arabic is the proposed default, not an explicitly selected user preference.

## 9. Quality and acceptance criteria

The V1 implementation is accepted when:

1. Home, Shop, Product Details, About, Support, Blog, article details, and policy shells are available in both locales.
2. The pages follow the corrected, evidence-based Ecomuz section order and geometry while using kitchen-specific content and imagery. Compare at 1440×1000, 768×1024, and 390×844.
3. The catalog represents complete kitchens, packages/units, and custom designs with the correct CTA behavior.
4. Arabic and English switch correctly, including direction, navigation, forms, and metadata.
5. Shop filters, product navigation, cart interactions, and prototype forms work without a backend.
6. Product and editorial content is rendered in crawlable server output where possible.
7. Mobile, tablet, and desktop layouts are usable and preserve the reference hierarchy.
8. TypeScript, linting, and production build checks pass.
9. No unnecessary runtime dependency or client-only page is introduced.
10. The implementation keeps repository/data interfaces replaceable for the later API, dashboard, WhatsApp, and order features.

The detailed checks and their evidence/status format are defined in `docs/design/acceptance-gates.md`. The design-preview board validates representative compositions, not the finished production site.

## 10. Decisions deliberately deferred

- Final brand name and logo
- Final production imagery and image licensing/source workflow
- Final font selection, subject to the reference look and Arabic legibility
- Exact product inventory and final prices
- Real order, payment, dashboard, and WhatsApp integrations

Temporary brand tokens and mock assets may be used during V1 implementation and must be isolated from the domain model so they can be replaced without changing the page architecture.
