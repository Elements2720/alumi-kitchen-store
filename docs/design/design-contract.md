# Visual and interaction contract

Status: **APPROVED for the V1 build handoff.** On 2026-10-07, after reviewing the reference-based board/package, the user said: “wow this looks great, i approve and make the handoff to next session”. This approves the contract/board and preparation of the execution package. Production implementation belongs to the next session.

Sources: [reference audit](reference-audit.md), captured evidence in `evidence/`, https://ecomuz.framer.ai/. The audit distinguishes Observed, Inferred, and Proposed. This contract translates those findings into requirements.

## 1. Governing rule

Preserve Ecomuz's composition and behavior with aluminum-cabinet imagery/content. English is the direct reference-comparison layout; Arabic is its logically mirrored, carefully typeset equivalent. Match structure, scale, media dominance, whitespace, and interactions before polishing secondary copy.

The earlier Warm Craft sketches are superseded. There is no alternative color redesign. The temporary name is **Alumi / ألومِي**, replaceable through a presentation configuration object.

Public storefront only. V1 uses mock data and local interactive UI. No real order, payment, upload service, account, dashboard, or notification integration.

## 2. Visual tokens

| Role | Contract |
| --- | --- |
| Surface | White `#fff`; pale gray media/card backgrounds around `#f6f6f6` / `#efefef` |
| Text / dark sections | `#212121`; muted text near `#666` (proposed accessible counterpart) |
| Header overlay | White .65 alpha, 10px backdrop blur, thin white border, 6px radius |
| Fonts | Public Sans for English (observed). Noto Sans Arabic for Arabic (proposed mainstream counterpart); use Next font loading in the eventual application |
| Hero title | English 64/70.4px desktop, 40/44px compact widths; 600 weight; short two-line copy |
| Section heading | English 40/48px desktop, 22/26.4px compact; 600 weight |
| Other type | Card title 18/25.2px desktop; body and labels ~14–16px; choose Arabic metrics for natural wrapping, not forced English line-height |
| Rails | 30px desktop; 20px compact; header inset ~2.5% desktop and 10px compact |
| Rhythm | 120px major desktop section padding; 40px compact; retain generous reference whitespace |
| Gaps | Products 20px; editorial/benefits typically 24px; adjust compact layout from evidence |
| Shape | 12px editorial/product-media radius; ~6px control/header radius; do not replace with universally pill-shaped cards |
| Photos | Hero/editorial cover with deliberate focal point; isolated products contain within pale square media area |
| Wordmark | Large fitted footer identity; scale to available width and avoid overflow in both languages |

Observed sizes are anchors at 1440, 768, and 390, not proof of a breakpoint threshold. Proposed compact boundary: 900px, subject to evidence comparison and navigation fit. Test transitional widths rather than blindly adopting framework defaults.

## 3. Authoritative Home composition

| Order | Required composition | Kitchen adaptation |
| --- | --- | --- |
| 1 | Full-height two-slide photographic hero; inset translucent header; left English copy; bottom-left image thumbnails | Installed aluminum cabinets. Arabic text/thumb rail mirrors logically; photos keep deliberate focal points |
| 2 | Hand-picked products title + View All; four square media cards on desktop | Four demo catalog items; compact reference displays two featured items in a single-column list; all remain available in Shop |
| 3 | Three full-bleed sticky collection scenes with inset light caption cards | Cabinet collections; preserve scroll relationship and media scale |
| 4 | Ruled eyebrow/CTA + centered benefit heading + four outlined icon cards | Capability descriptions; no unsupported warranty/delivery promises |
| 5 | Three centered tabs + large editorial image + four compact products | Complete / Packages / Units. Preserve image-plus-grid proportion |
| 6 | Asymmetric story/lookbook collage with promotional and dark text panels | Quote service replaces mobile-app role; cabinet/workshop media replaces furniture stories |
| 7 | Large installation image with three product hotspots/popovers | Upper cabinet / lower cabinet / sink unit; links to catalog |
| 8 | Contact title + text/contact information beside large image | Demo showroom/contact content, no live location request |
| 9 | Static social/inspiration gallery | Real cabinet project photos when available; no live feed |
| 10 | Charcoal footer, subscription-shaped demo form, oversized wordmark, policies, page links, location/social roles | Clearly marked demo data, supplied production values later |

Do not insert independent Projects or Configurator top-level pages into the reference navigation. Home lookbook and the quote modal provide those roles in V1.

## 4. Routes and supporting pages

Approved target map for both locales:

```text
/{locale}
/{locale}/shop
/{locale}/shop/{productSlug}
/{locale}/about
/{locale}/support
/{locale}/blog
/{locale}/blog/{articleSlug}
/{locale}/policies/{policySlug}
```

Locales: `ar`, `en`. Policy slugs: `shipping-returns`, `terms-conditions`, `privacy-policy`. Article detail and policy shells close existing reference link targets; they are lightweight static mock-content pages, not new systems.

- **Shop:** centered title/subtitle, desktop search/filter side rail and 3-column grid; compact search + 2 filter groups above a one-column grid. Search/type/tag-style controls should reflect products, not arbitrary color/price sliders. Clear-all and zero-results state are required.
- **Product:** information first at English desktop start edge, large central square media, end-edge vertical thumbnails. Compact: image, horizontal thumbnails, information, related products. Fixed-price items have quantity and Add to Cart. A same-sized neutral secondary CTA replaces the reference payment-branded button with Customize This Design. Custom-only items have Request a Quote and no add-to-cart action.
- **About:** title, three-photo strip, mission/vision, story timeline, image-backed location roles, FAQs. Use “design-to-installation process” steps in the timeline if business history is missing; do not invent establishment dates. Compact layout keeps text/thumbs and omits large timeline pictures as observed.
- **Support:** centered title; gray panel; contacts start side and form end side on desktop; form first on compact. Topic includes quote inquiry; order number optional as a demo field.
- **Blog/article:** three-column media-first journal then narrow article reading rail; compact single column. Use a small set of bilingual sample articles, all linked cards resolve.
- **Policies:** reference reading-panel layout; short demo-stage behavior text only, visibly draft/demo. Do not publish invented manufacturing return/guarantee terms.

Root `/` routes to Arabic by proposed default; unsupported locales/slugs return a designed localized not-found page. Language switching preserves the equivalent page/product/article, cart state, and filter/search state where meaningful.

## 5. Prototype interactions

All forms carry a concise bilingual notice: **Demo only — nothing is sent or saved.** The eventual live purchase path is an order request followed by staff confirmation, without online payment, as selected by the user; V1 does not activate it.

- Cart: local memory across in-app navigation and language switching, add/merge same product, min quantity 1, remove, total in EGP, empty state. Reload may reset it. A proposed neutral drawer is allowed because the reference drawer was not verified. It must match reference tokens and be clearly identified as an adaptation.
- Demo checkout: name, phone, area/address, notes; validation; explicit simulated confirmation with a demo identifier. Never claim an actual order was received. No customer input in persistence, query strings, analytics, or logs.
- Quote: opens with product ID/design preselected; name, phone, area, optional dimensions, cabinet preferences, notes, optional local image selection preview. No upload/network call; object URLs revoked when closed. Simulated success says no request was sent.
- Support/newsletter: local validation and simulated success only. No real subscription or notification.
- No fabricated network-loading delays. Loading/empty/error states correspond to images, invalid routes, filters, and forms; do not invent a live API.

These states adapt the approved demo scope; their geometry is proposed where reference commerce widgets did not work.

## 6. Motion and responsiveness

- Hero: preserve two-image crossfade and thumbnail selection. Use a proposed modest transition (~500ms), not a claimed reference timing. Manual control remains available; pause autoplay on focus/hover and reduced motion. Exact autoplay cadence is a visual-tuning choice, not an observed fact.
- Header: keep fixed/inset translucency over imagery, readable white treatment over content, compact dropdown placement below header. Language switch is an added compact control; preserve navigation spacing by using the compact mode when needed.
- Sticky collections: retain true scroll-linked phases, with scroll progress derived from container bounds. Use widely supported CSS sticky and a small requestAnimationFrame transform driver. Do not rely on experimental scroll-timeline support, import Framer runtime, or make the whole page client-rendered.
- Product/image hover: subtle transform/overlay; keep keyboard equivalent, no essential information hover-only. Rolling labels, if used, have one accessible name.
- Hotspots: keyboard-operable +/close buttons, one visible labeled popover; reposition/clamp on compact screens. Coordinates are tied to the actual image crop, not fixed viewport pixels. Escape closes; focus returns to trigger.
- Tabs/FAQ: semantic accessible controls, visible selected/open state, natural height changes; avoid layout jumps from unknown media dimensions.
- Compact composition matches observed ordering; preserve readable Arabic wrapping and tap targets even when English metrics need small adjustments.
- **Reduced motion:** disable autoplay, marquees, parallax/scroll transforms, animated label rolls and smooth root scrolling. Render collection content statically in normal flow so every panel remains visible and reachable. This is an explicit proposed accessibility improvement over partially observed reference behavior.

## 7. Assets and content

The board uses clearly labeled **REFERENCE PHOTO / PLACEHOLDER** staging media. Those assets are not approved final store imagery. Production-oriented V1 must use actual aluminum cabinet pictures/renders supplied or approved for that purpose; if missing, label placeholders and report the asset gate as partial.

Keep an asset manifest with role, source, rights/approval status, dimensions, locale alt text, desktop/mobile focal points, and related product/hotspot ID. Include two hero images, at least two views per product, three collection images, editorial/detail photos, and one mapped hotspot installation image.

Demo pricing, specifications, contacts, locations, brand, and editorial copy must remain identifiable as samples. Missing factual business information is replaced with a labeled role, not invented testimonials, years, stock quantities, offers, or guarantees. Do not repeat fake facts in metadata, structured data, alt text, or social cards.

## 8. Technical boundaries and SEO

Use stable mainstream Next.js App Router/React/TypeScript versions compatible with an actively supported Node.js LTS at implementation time; record exact installed versions and engines in the new project. No Edge-only architecture or extra Express server is required.

```text
app route/composition → presentation → domain
app route/composition → data → domain
domain → no framework/data/presentation dependencies
```

- `domain`: Product discriminated unions, price/dimensions types, catalog contract, cart rules and quote validation.
- `data`: bilingual fixtures, catalog adapter, editorial/translation content, asset manifest. It does not import presentation.
- `presentation`: server-compatible UI/sections and narrow client controls/providers. It does not import concrete repositories; routes provide serializable data from the composition boundary.
- `app`: framework routes, metadata, static params, not-found/loading boundaries, server composition. Prefer direct construction of a single mock adapter over a DI container/repository factory. Use cases only for real domain operations, not a separate class/file for every getter.
- Use SOLID through clear responsibility and small contracts. No speculative abstract base classes, event buses, generic factories, or external global-state library.
- CSS Modules + logical CSS properties; React state/context for cart; Next Link/Image/font facilities. Add a maintained dependency only if a concrete feature justifies it and built-ins are insufficient.
- Server-render/static-generate mock catalog/article content; use narrow Client Components for controls. Content must remain in server HTML, never hidden until JavaScript animates it in.
- Use real locale-prefixed links, localized title/description, self canonicals, Arabic/English alternates, Open Graph, robots and sitemap. The site URL is configuration, not an invented production hostname.
- Demo previews use `noindex`; production indexing is enabled only for a real deployment/content set. SEO-friendly rendering still applies during V1.
- Product structured data can describe products; omit real Offer/stock/rating claims for mock data. No invented aggregate reviews. Breadcrumb/article data must correspond to visible content.
- Prioritize only the initial hero/LCP image, reserve dimensions, lazy-load below-fold images, limit font weights, and keep one global cart provider from turning all pages into client-only trees.

## 9. Review and fidelity rules

Reference screenshots and audit govern exact geometry; the board communicates representative composition and new adaptations, not a finished full-site reconstruction. Known differences must be reported: changed media/copy/brand, added language control, neutral quote CTA, proposed cart/form states, static reduced-motion flow, omitted commerce badges/payment integrations/discount popup.

Reject generic UI substitutions listed in the audit. Review Home first viewport + first product row + a sticky editorial scene before implementing every route in the next session. Compare at 1440×1000, 768×1024, 390×844; also test 360 and 1024 to find transitional overflow.

**Approval recorded:** contract and `design-preview/` approved on 2026-10-07. The next session uses [the implementation prompt](implementation-prompt.md) and [the execution plan](../superpowers/plans/2026-10-07-aluminum-kitchen-v1-implementation.md), then verifies the first visual slice against this contract before expanding the build. Material departures from the approved scope require clarification; routine implementation choices are delegated to the build session.
