# Oak & Anvil — Website Design Prompt

> Paste everything below the line into Claude when designing. Attach your logo file to the same message.

---

Design a complete, premium e-commerce website for **Oak & Anvil**, a direct-to-consumer furniture brand selling imported solid-wood seating. The design language must closely follow **Restoration Hardware (rh.com)**: editorial, gallery-like, architectural, and quiet luxury. This is a design-first exercise — produce high-fidelity page mockups I will later build as a headless Shopify storefront (Next.js on Vercel, Shopify Storefront API backend).

## Brand

- **Name:** Oak & Anvil (logo provided — build the identity around it)
- **Positioning:** Heirloom-quality dining chairs and counter stools, sold direct at honest prices
- **Voice:** Confident, spare, materials-focused. Short sentences. No exclamation points, no sales-speak.

## Aesthetic Direction (RH-inspired — follow strictly)

- **Typography:** Wide-tracked, all-caps serif or refined sans for headings (think Baskerville/Didot tracking at 0.2–0.3em). Small, restrained body text. Generous letterspacing on nav and buttons.
- **Palette:** Warm neutrals only — ivory/bone background (#F7F5F1 range), charcoal text (#2B2B2B), taupe/greige accents, no bright colors anywhere. Buttons are ghost/outline style or solid charcoal, never colored.
- **Imagery:** Massive full-bleed lifestyle photography is the hero of every page. Images do the selling; text overlays are minimal — a centered all-caps headline and a quiet "SHOP NOW" text link. (Use elegant placeholder blocks; I will supply photography.)
- **Whitespace:** Extreme. Large vertical padding between sections. Nothing feels cramped or "e-commercey."
- **Chrome:** Minimal UI. Thin hairline borders, no drop shadows, no rounded corners, no badges/sale stickers. Hover states are subtle (slight image zoom, underline reveals).
- **Motion:** Slow, subtle fades and image zooms on scroll. Nothing bouncy.

## Site Structure

Only 15 products in 2 categories at launch: **Dining Chairs** and **Counter Stools**.

1. **Home** — Full-screen hero image with brand statement; two large editorial category tiles (Dining Chairs / Counter Stools); a craftsmanship/materials story section; a featured-products row (4 items); quiet footer.
2. **Category page (×2)** — Large category hero, then a spacious 2–3 column product grid. Each card: large image, product name in small caps, price beneath. No "add to cart" on cards. Minimal filters (wood finish, upholstery) as a thin top bar.
3. **Product detail page** — Left: large image gallery (vertical thumbnails or scroll). Right: product name, price, finish/upholstery swatch selectors, quantity, "ADD TO CART" (charcoal solid), then accordion sections: Dimensions, Materials & Construction, Shipping & Returns, Care. Below: "Complete the Set" cross-sell row.
4. **Cart / slide-out drawer** — Minimal drawer from right; line items, subtotal, "CHECKOUT" button (hands off to Shopify checkout).
5. **About / Craftsmanship** — Editorial long-scroll page: full-bleed images alternating with short text blocks about sourcing, joinery, materials.
6. **Contact** — Simple, centered form.
7. **Footer** — Ivory, hairline top border: customer care links, trade/dealer program link, email signup ("Join the list"), social icons, payment marks.

## Dealer Portal (separate B2B area — design these screens too)

A distinct "TRADE" link in the top nav (small, right-aligned, next to account/cart icons) leads to:

1. **Dealer login page** — Centered, minimal: logo, email/password, "Apply for a trade account" link.
2. **Dealer application page** — Form: business name, resale certificate #, address, expected volume, showroom y/n.
3. **Dealer dashboard** — Same brand language but denser and more utilitarian than the consumer site:
   - Welcome header showing **dealer tier** (three tiers: **Stocking Dealer / Trade / Designer** — each tier sees different discounted pricing, e.g., 50% / 40% / 30% off retail)
   - **Order pad**: compact table of all 15 products — thumbnail, SKU, retail price struck through, *their* tier price, stock status, quantity input, add-all-to-order
   - **Quick reorder** from order history
   - **Resources section**: downloadable spec sheets, dimension drawings, high-res image library, marketing assets
   - Order history with status/tracking
4. **Dealer-logged-in storefront state** — When a dealer browses the regular site logged in, product pages show retail price struck through with tier price beside it and a small "TRADE PRICING" label.

## Deliverables

Design these screens at desktop width, plus mobile versions of Home, Category, and Product pages:

1. Home
2. Category (Dining Chairs)
3. Product detail
4. Cart drawer (overlaid on product page)
5. About/Craftsmanship
6. Dealer login
7. Dealer dashboard with order pad
8. Product page in dealer-logged-in state

Use realistic placeholder product names (e.g., "Hawthorne Dining Chair," "Foundry Counter Stool") and realistic price points ($395–$795 retail). Keep every screen consistent: same nav, same type scale, same spacing system (define an 8px-based spacing scale and a type ramp I can reuse in code).

---

## Notes for the VSCode build phase (not part of the design prompt)

- **Stack:** Next.js (App Router) on Vercel, GitHub repo, Shopify Storefront API for products/cart/checkout, Shopify customer accounts + metafields (or a small auth layer) for dealer tiers.
- **Dealer tiers:** Tag dealer customers in Shopify (`tier:stocking`, `tier:trade`, `tier:designer`); store tier discounts in app config or Shopify metaobjects; compute displayed price client/server-side. Checkout discount applied via Shopify automatic discounts scoped to customer tags or draft orders for the order pad.
- **Why headless:** Native Shopify B2B pricing requires Shopify Plus (~$2,300/mo). Headless gets tiered pricing on a basic Shopify plan (~$39/mo).
- When you bring the approved design into VSCode, give Claude this file plus the exported design screens and ask it to scaffold the Next.js project to match.
