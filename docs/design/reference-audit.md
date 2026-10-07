# Ecomuz reference audit

Status: inspected; design contract and board approved by the user on 2026-10-07. This is planning evidence, not production implementation.

## Intake

- **User requirement:** recreate https://ecomuz.framer.ai/ as closely as possible (requested 1:1), changing imagery and content for Egyptian aluminum kitchen cabinets/units.
- **User requirement:** full standard kitchens and packages/individual units; fixed-price demo cart plus custom quote demo.
- **User requirement:** frontend-only V1, Arabic and English, Next.js/React/TypeScript, Node.js runtime, `data`/`domain`/`presentation`, SOLID, mainstream SEO-friendly tools.
- **User requirement:** future WhatsApp + admin dashboard; neither is part of V1.
- **Missing:** final brand, actual aluminum-cabinet photography, real product specifications/prices, business story, contacts, policy copy, production URL, deployment target.
- **Scope:** public storefront only; no private surface.

## Evidence and methodology

**Observed:** browser inspection used viewport emulation, screenshots, accessibility snapshots, computed styles, navigation, search, menu clicks, and scroll samples. Evidence is stored in `evidence/`. Sizes below are CSS pixels, device scale 1.

| Reference route | 1440 × 1000 | 390 × 844 | 768 × 1024 | Evidence / coverage |
| --- | --- | --- | --- | --- |
| `/` | Top + representative scrolled sections | Top, menu, computed layout | Top | `home-top-*`, `home-editorial-1440`, `home-benefits-1440`, `home-tabs-1440`, `home-stories-1440`, `home-hotspots-1440` |
| `/shop` | Top, search | Top | Top | `shop-*`; search `Rubber` reduced visible results to one product |
| `/shop/rubber-lounge-armchair` | Top, quantity/cart controls | Full capture | Not inspected | `product-*`, `product-cart-action-1440` |
| `/about` | Full capture + scrolled FAQ | Full capture | Not inspected | `about-*`, `about-faq-1440` |
| `/support` | Top/form | Full capture | Not inspected | `support-*`; submissions not exercised |
| `/blog` | Top/grid | Top/grid | Not inspected | `blog-*` |
| `/blog/how-to-choose-the-perfect-sofa-for-your-living-room` | Top/body start | Top/body start | Not inspected | `article-*` |
| `/policies/privacy-policy` | Top/body start | Top/body start | Not inspected | `policy-*`; other policy layouts not inspected |

**Observed:** reduced-motion emulation on Home returned `prefers-reduced-motion: reduce = true`; three collection containers still used `position: sticky`, and the browser reported 21 active animations at the sampled instant. This does not prove all reference animations ignore the preference. Exact reduced-motion behavior remains partial.

**Observed limitation:** full-page screenshots capture some scroll-reveal content before it appears. Do not implement the blank spaces in those captures as missing sections. Use scrolled evidence and DOM snapshots together.

**Observed limitation:** clicking the header cart and product Add to Cart did not produce a confirmed drawer/count change in the sampled browser state. `cart-empty-390.png` shows the page after the click, not an empty-cart UI. Cart panel layout is therefore **unverified**, not observed.

## Visual thesis

**Observed, high confidence:** Ecomuz combines warm interior photography with a predominantly white/charcoal interface. Its identity comes from the full-height photographic hero, translucent inset navigation, square product media on pale gray, very generous desktop whitespace, oversized centered headings, sticky editorial collection scenes, mixed-scale image collages, product hotspots, and a large charcoal footer wordmark.

**Proposed:** keep these composition relationships. Warm Craft is an image-mood preference only; it does not authorize beige page backgrounds, copper controls, or a different layout.

## Home section-by-section evidence

| Order | Observed reference | Measured / visible behavior | Proposed kitchen mapping | Confidence |
| --- | --- | --- | --- | --- |
| 1 | Hero + navigation | Two background slides and two thumbnail controls; hero copy at left in English; 1440-wide hero fills 1000px height | Two aluminum-cabinet installations; equivalent short copy | High |
| 2 | Hand-picked items | Four square product cards across at desktop; title at left and View All at right; 20px gaps | Fixed-price standard kitchens/packages/units | High |
| 3 | Three collection scenes | Full-bleed imagery; sticky inner containers; inset white caption panels; scroll-responsive composition | Three cabinet collections, retaining the editorial scenes | High for composition; partial for exact motion |
| 4 | Why choose us | Small ruled eyebrow/CTA row, centered heading, four bordered cards with large line icons | Four short cabinet/design benefits with demo content labeling | High |
| 5 | Trendy collection | Centered Picky/Trendy/Featured tabs; large image at left; 2×2 product block at right | Complete kitchens / packages / units tab content | High for default view; other tab transitions partial |
| 6 | Furniture stories | Asymmetric collage: lookbook/media block, mobile-app block, workshop photo, dark moving text panel, sculptural media | Cabinet lookbook, quote-service promotion, cabinet details/workshop placeholders | High for default composition |
| 7 | Shoppable room | Large 3:2-ish installation image; three round + controls; a product popover is initially open | Upper cabinet, base cabinet, sink unit hotspots | High for visible composition; all state combinations partial |
| 8 | Contact | Eyebrow and centered heading; text/contact block beside large interior image | Contact/showroom placeholders; no live location permission | High |
| 9 | Instagram feed | Label, centered @identity, large rounded image blocks | Static cabinet inspiration gallery; no feed integration | High |
| 10 | Footer | Charcoal canvas, subscription UI, very large wordmark, policy/page links, three location columns, social icons | Bilingual demo content; locations/contact values visibly placeholders | High |

**Observed:** the initial specification placed collections before the first product row and omitted the shoppable image. That was not faithful to the reference. The corrected order above is authoritative.

## Tokens and geometry

These are **observed samples**, not a complete token extraction:

| Role | Desktop sample | Small-screen sample | Confidence |
| --- | --- | --- | --- |
| English family | Public Sans | Public Sans | High, computed styles |
| Hero title | 64px, 600, 70.4px line-height | 40px, 44px line-height | High |
| Section H2 | 40px, 600, 48px line-height | 22px, 26.4px line-height | High |
| Product card title | 18px, 500, 25.2px line-height | Smaller wrapping varies by component | High desktop; partial mobile |
| Body / navigation | Mostly 14–16px | Mostly 14–16px | Medium; visible samples |
| White surface | `#ffffff` | Same | High |
| Main text / dark footer | `#212121` | Same | High |
| Pale surface | `#efefef` sampled; product media visually near `#f6f6f6` | Same role | High sampled / medium product shade |
| Hero header | x36/y16, 1368×52; 12px 20px padding; 6px radius; rgba(255,255,255,.65); blur(10px) | x10/y10, 370×56 visible at 390 | High |
| Content rail | 30px per side | 20px per side | High |
| Major section padding | Frequently 120px vertically | Frequently 40px vertically | High |
| Grid gap | 20px products; 24px editorial/benefits | Responsive gaps vary | High desktop |
| Editorial card radius | 12px sampled | Similar | High desktop |
| Mobile hero height | — | 760px at 390×844 | High |
| Tablet hero height | — | 922px at 768×1024 | Medium, screenshot boundary |

**Inferred:** tablet and mobile share a compact composition in the two sampled widths. Exact breakpoint cutoffs are not established. Do not label a chosen implementation breakpoint as a measured reference value.

## Other route compositions

- **Observed / high:** Shop desktop has a left search/filter rail (~210px), a gap, and three columns of square product media. At 768 and 390, the rail moves above the grid: full-width search, two filter groups side-by-side, then a one-column product list. It is not a mobile horizontal-chip toolbar.
- **Observed / high:** Product desktop has information on the left (~400px), a large square central image (~696px), and a vertical thumbnail column (~200px). On mobile, the large image and horizontal thumbnails come before product information. Related products and footer follow.
- **Observed / high:** About has a centered title, three-image strip, mission/vision controls, centered text, timeline, image-backed location cards, FAQs, footer. Large timeline pictures disappear in the captured mobile composition, leaving text and smaller thumbnails.
- **Observed / high:** Support has a centered title and a large gray panel; contacts on the left, white form on the right. On mobile, the form comes first, contacts second.
- **Observed / high:** Blog uses a pale grid wrapper and three white image-first cards per row; mobile stacks single cards. Article detail uses a centered header and a roughly 700px reading/media rail.
- **Observed / high:** Privacy page uses a centered heading followed by a narrow pale reading panel. Other policy content/geometry is **inferred**, not individually verified.

## Interaction and motion evidence

- **Observed:** mobile hamburger reveals a white menu below the translucent header; hamburger becomes a close icon.
- **Observed:** desktop header stays at the top while scrolling over imagery and white content.
- **Observed:** hero background changed between captures; there are two explicit slide controls. **Unverified:** exact autoplay interval and easing.
- **Observed:** editorial containers are sticky, and their caption/image composition changes with scrolling. **Unverified:** the exact transform curve and all pinned phases. Treat scroll-linking as mandatory; derive timing from implementation comparison rather than claiming an invented duration.
- **Observed:** reference CTA DOM contains two copies of the label. **Inferred:** this supports a rolling label hover effect. Duplicate visual text must not duplicate accessible names.
- **Observed:** shop search filters visible catalog results. **Partial:** combinatorial type/tag filter behavior.
- **Observed:** FAQ rows have plus controls in the scrolled capture. **Unverified:** exclusivity/animation timing of expansion.
- **Observed:** discount signup overlay appeared during first Home inspection. **Proposed:** omit this automatic offer popup from V1 because no actual discount/subscription service was supplied; retain the footer's visual subscription role as a labeled demo.
- **Unverified:** real checkout, confirmed cart drawer, actual form submission, production loading/error states, complete hover/focus behavior. Design these explicitly as proposed prototype states.

## Asset inventory

| Material | Status | Permitted planning use / production action |
| --- | --- | --- |
| Reference screenshots | Captured in `evidence/` | Visual evidence; not site content |
| Ecomuz hero/editorial images | Reference-only assets; source URLs can be inspected | Board staging only, visibly labeled; replace in final storefront |
| Aluminum cabinets/installations | Missing | Request owner-supplied photos or approved correctly identified renders |
| Isolated unit/product images | Missing | Consistent front/angled view, neutral background; preserve complete-unit silhouette |
| Brand identity | Missing | `Alumi`/`ألومِي` is a proposed temporary wordmark, not an approved business name |
| Business claims, contacts, locations | Missing | Clearly labeled demo copy; do not present invented factual history/guarantees |
| Prices/specifications | Mock only | EGP sample amounts; visible demo context; no genuine stock/offer claims |

### Production image brief — proposed

- Hero: two wide installations showing upper and lower aluminum cabinets, with uncluttered text-side negative space and separately chosen mobile focal crops.
- Product: at least two images per item, neutral square presentation, clear dimensions and included units. Material must be identified by the supplied asset metadata, not guessed from its color.
- Collections: three coordinated installations with full-bleed and inset crops.
- Hotspots: one installation with known product/unit locations and corresponding catalog IDs; desktop/mobile hotspot positions must follow the image crop.
- Details: doors, handles, aluminum profiles, finishes, upper storage and sink units.

## Fidelity risks and substitutions to reject

- Beige/redesigned Warm Craft theme replacing the white/charcoal reference.
- Split hero with a cabinet schematic, generic gradient hero, or illustration standing in for photography.
- Small generic collection cards replacing the sticky full-bleed editorial scenes.
- Reordered sections or omission of hotspots/editorial collage.
- Two-column mobile Shop when the measured reference is one column.
- New UI framework defaults changing typography, radii, controls, or spacing.
- Replacing scroll-linked scenes with one-time fade-in effects.
- Using generic wooden kitchen photos as if they prove aluminum construction.
- Treating blank offscreen reveal captures, inaccessible commerce widgets, fake dates, or copied addresses as desired functionality/content.

## Coverage status

- **Verified:** key route top compositions at desktop/mobile, Home section identity/order, sampled fonts/rails, mobile navigation, Shop search.
- **Partial:** long-page scroll states, tablet coverage, exact motion sequence, filter combinations, reduced-motion response.
- **Unverified:** reference cart drawer, backend-dependent interactions, all breakpoints, exact hover/easing/timing.
- **Intentionally omitted:** production ecommerce/backend/dashboard/WhatsApp, real payments, live Instagram/geolocation, unprovided discounts and subscription delivery.
