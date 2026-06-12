# Handoff: Oak &amp; Anvil — Storefront &amp; Dealer Portal

## Overview
Oak &amp; Anvil is a direct-to-consumer furniture brand selling imported solid-wood seating (dining chairs &amp; counter stools). This package is the **complete high-fidelity design** for the consumer storefront and the B2B dealer (TRADE) portal, intended to be built as a headless Shopify storefront (Next.js on Vercel + Shopify Storefront API).

The aesthetic is editorial / quiet-luxury: warm neutrals only, wide-tracked serif headings, full-bleed imagery, extreme whitespace, hairline borders, no shadows, no rounded corners, no color. Motion is slow and subtle (fades, image zooms). It is an **original** identity in that idiom — not a clone of any existing retailer.

## About the Design Files
The files in this bundle are **design references created in HTML/React (Babel-in-browser)** — a working prototype showing the intended look, copy, and behavior. They are **not production code to ship**. The task is to **recreate these designs in the target codebase** (Next.js App Router + Shopify Storefront API, per the brand's build plan) using its established patterns, data layer, and component conventions. Treat the HTML/JSX as the source of truth for layout, tokens, copy, and interaction — not as files to copy verbatim.

The prototype runs entirely client-side with mock data (`data.jsx`). In production, products/pricing/cart come from Shopify; dealer tiers come from Shopify customer tags + metafields/metaobjects (see "State Management" and the brand's own build notes).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are specified below and in the files. Recreate the UI pixel-accurately using the codebase's libraries. The only intentional placeholders are **imagery**: every photo is a toned "Placeholder" block with a monospace label (e.g. `FULL-BLEED LIFESTYLE — DINING ROOM`). The client supplies real photography; swap each placeholder for the corresponding asset, preserving aspect ratios.

---

## Design Tokens

### Color (warm neutrals only — no bright color anywhere)
| Token | Hex | Use |
|---|---|---|
| `--ivory` | `#F7F5F1` | Page background, light text on dark |
| `--bone` | `#F1EEE7` | Secondary section background, panels |
| `--sand` | `#E9E4DA` | Placeholder/image base (tone "sand") |
| `--stone` | `#DED8CC` | Deeper panel / placeholder (tone "stone") |
| `--charcoal` | `#2B2B2B` | Primary text, solid buttons, dark sections |
| `--charcoal-soft` | `#4A4843` | Body text on light |
| `--greige` | `#8A8276` | Muted/secondary text, labels |
| `--taupe` | `#8B7355` | **Sole accent** (from logo rule). Trade-pricing tag, logo rule, active dot. Use sparingly. |
| `--hair` | `rgba(43,43,43,0.16)` | Hairline borders |
| `--hair-soft` | `rgba(43,43,43,0.09)` | Faint dividers |

Placeholder image tones (bg / label-ink): sand `#E6E0D5`/`#9A9082`, bone `#ECE8E0`/`#A49C8E`, stone `#D7D0C3`/`#8C8475`, deep `#3A362F`/`#8E8678`, char `#2B2B2B`/`#776F62`.

### Spacing scale (8px base) — `--sp-N`
`4, 8, 16, 24, 32, 48, 64, 96, 128, 160, 192` px → tokens `--sp-1 … --sp-11`. Section vertical padding typically `--sp-9`/`--sp-10` (128–160px). Page gutter is `40px` left/right; content max-width `--maxw: 1480px`.

### Typography
Three families (Google Fonts):
- **`--font-head`** — heading serif/display. **Switchable** between three directions (a design exploration; ship one as default, ideally token-driven):
  - `Bodoni Moda` (Didone) — **default**
  - `Libre Baskerville` (transitional serif)
  - `Jost` (geometric sans; rendered **uppercase** with wider tracking)
- **`--font-body`** — `Jost`, weight 300 (body), 400 (labels/nav).
- **`--font-mono`** — `Space Mono`, for technical labels (SKUs, placeholder captions, meta).

Type ramp (class → size / line-height / letter-spacing / family):
| Class | Size | LH | Tracking | Family |
|---|---|---|---|---|
| `.t-display` | `clamp(38px,5.2vw,82px)` | 1.04 | 0.04em | head |
| `.t-h1` | `clamp(30px,3.4vw,52px)` | 1.1 | 0.05em | head |
| `.t-h2` | `clamp(24px,2.2vw,34px)` | 1.18 | 0.06em | head |
| `.t-h3` | 22px | 1.3 | 0.04em | head |
| `.eyebrow` | 11px | — | 0.34em, uppercase, `--greige` | body 400 |
| `.t-body` | 16px | 1.75 | — | body 300 |
| `.t-small` | 13.5px | 1.7 | — | body 300 |
| `.t-micro` | 11px | — | 0.24em, uppercase | body 400 |
| `.mono` | 10.5px | — | 0.16em, uppercase | mono |

Baskerville reduces display tracking to ~0.02em; Jost forces `text-transform:uppercase` + 0.12–0.16em on headings. Headings, nav, and buttons all carry `white-space:nowrap`.

### Borders / radius / shadow
Border radius: **0 everywhere**. Shadows: **none** (cart drawer uses a 1px hairline edge, not a shadow). Borders are 1px hairlines using `--hair`. Buttons and inputs are rectangular.

### Motion
- Scroll reveal: elements rise + fade in — `opacity 0→1`, `translateY(26px)→0`, `1.1s cubic-bezier(0.22,1,0.36,1)`, triggered when the element enters ~92% of viewport height. Respect `prefers-reduced-motion` (show immediately).
- Image hover zoom: `transform: scale(1.045)`, `1.4s cubic-bezier(0.22,1,0.36,1)`, inside `overflow:hidden`.
- Underline reveal link (`.link-reveal`): 1px underline wipes in/out, `0.5s`.
- Cart drawer / search overlay: `0.4–0.5s cubic-bezier(0.22,1,0.36,1)` slide/fade.
- Buttons: background/color cross-fade `0.4s`.

### Buttons
- `.btn` (ghost/outline): 1px `--charcoal` border, transparent; hover fills `--charcoal` / text `--ivory`. Padding `17px 38px`, 11px uppercase, 0.26em tracking.
- `.btn-solid`: charcoal fill, ivory text; hover → black.
- `.btn-light`: for dark backgrounds (ivory border/text; hover inverts).
- Never colored. `:disabled` → opacity 0.4.

---

## Screens / Views

All screens share: sticky **Nav** (78px tall; over dark full-bleed heroes it's transparent with ivory text, turning solid ivory w/ charcoal text on scroll >90px or on non-hero pages), and the ivory **Footer** (hairline top border; columns: Customer Care, Trade, Join the List w/ email signup, social, payment marks) — except the dealer dashboard, which hides the footer.

### 1. Home (`HomePage`)
- **Hero** (full viewport, dark): one of three layouts (exploration): **centered** (default — centered eyebrow + `.t-display` headline "Seating, Made to Outlast Us" + body + "Shop the Collection" link), **split** (light bone left text column + image right), **lowerleft** (full-bleed image, caption lower-left). Hero pulls under the nav (`margin-top:-78px`).
- **Category tiles**: 2-up grid (`gap:32`), each = image (3:2.1, hover-zoom) + `.t-h2` name + tagline + "Shop" link. Links to category.
- **Craftsmanship story**: bone section, 2-col (image 4:5 + text block, "Read Our Craft" link).
- **Featured row**: 4 product cards (`ProductCard`).
- **Quiet statement**: charcoal full-width section, centered `.t-h2` pull-quote.

### 2. Category (`CategoryPage`) ×2 (Dining Chairs, Counter Stools)
- **Hero**: 62vh dark, centered eyebrow ("Eight Chairs"/"Seven Stools") + `.t-display` name + tagline.
- **Filter bar**: sticky (top:78px), hairline, left = two `<select>` filters (**Wood Finish**, **Upholstery**) styled as underlined custom selects; right = result count (`.mono`) + **2 COL / 3 COL** grid toggle.
- **Grid**: 2 or 3 columns, `rowGap:64`. Each `ProductCard` = image (4:5, hover-zoom) + name (13px caps, 0.16em) + price beneath. **No add-to-cart on cards.** Empty state when filters exclude all.

### 3. Product detail (`ProductPage`)
- Breadcrumb (`.mono`): HOME / CATEGORY / NAME.
- 3-col layout `80px 1fr 1fr`, `gap:40`: **vertical thumbnail rail** (sticky, 4 frames, active = charcoal border) · **main image** (sticky, 4:5) · **info column** (max 460px):
  - eyebrow (category) · `.t-h1` name · **PriceTag** · blurb.
  - **Swatches**: Wood Finish (always) + Upholstery (if any) — 34px square chips, selected = 1px charcoal outline w/ 3px offset; selected label shown top-right.
  - **Qty stepper** (bordered – / value / +) + **Add to Cart** (`.btn-solid`, full-width; shows "Added ✓" for 1.8s).
  - Meta line: "Made to order · Ships in 6–8 weeks · {SKU}".
  - **Accordion**: Dimensions (spec table), Materials &amp; Construction, Shipping &amp; Returns, Care. One open at a time; `+` rotates 45° to ×; `max-height` transition.
- **Complete the Set**: 3 related products from same category.

### 4. Cart drawer (`CartDrawer`)
- Right slide-out, `min(440px,92vw)`, ivory, 1px hairline left edge, over a `rgba(20,19,17,0.42)` scrim. Header "Your Cart (n)" + ✕.
- Line items: 74px image + name + line price + finish/upholstery sub + qty stepper + "Remove". Empty state w/ "Shop the Collection".
- Footer: (if dealer) retail subtotal struck-through, then tier subtotal label + amount (`--font-head` 18px), "Shipping &amp; taxes calculated at checkout", **Checkout** (`.btn-solid`, → Shopify checkout), "Secure checkout via Shopify".

### 5. Search overlay (`SearchOverlay`) — storefront
- Triggered by magnifier + "Search" in nav (far left). Full-screen ivory overlay, fades + slides down.
- Top row (78px): magnifier + large `--font-head` input ("Search chairs, stools, finishes…") + "Close ✕". **Esc** closes.
- Empty state: "Suggested" chips (Dining Chairs, Counter Stools, Smoked Oak, Walnut, Leather).
- Results: count label + 4-up grid of cards (image, name, "Category · price"). Searches across **name, SKU, category, wood-finish labels, upholstery labels** (all tokens must match). Respects trade pricing when logged in. No-match state. Selecting → product page.

### 6. About / Craftsmanship (`AboutPage`)
- 78vh dark hero ("How a Chair Earns Its Keep") → centered intro `.t-h2` → **4 alternating image/text blocks** (Sourcing, Joinery, Finishing, Direct; image 4:5, side alternates via `direction:rtl`) → charcoal CTA section ("See the Collection").

### 7. Contact (`ContactPage`)
- Centered, max 520px. Eyebrow + `.t-h1` "Contact" + intro. Fields (underline-only inputs): Name, Email, Subject, Message → **Send Message** (`.btn-solid`). Submitted state replaces form with a thank-you line.

### 8. Dealer login (`DealerLogin`)
- Bone background, centered card (max 420px, ivory, hairline). Full **Logo** lockup above. "Dealer Sign In". Email + password inputs. **Demo tier picker** (Stocking 50% / Trade 40% / Designer 20%) — in production this is determined by the customer's Shopify tags, not chosen at login. "Forgot password", and "Apply for a Trade Account" → application.

### 9. Dealer application (`DealerApply`)
- Bone bg, max 680px. 2-col form card: Business Name (full), Contact Name, Email, Resale Certificate #, Phone, Business Address (full), Expected Annual Volume (`select`), "Do you operate a showroom?" (yes/no segmented) → **Submit Application**. Success state replaces form.

### 10. Dealer dashboard (`DealerDashboard`)
- **Welcome header** (charcoal): "Trade Dashboard" eyebrow + "Welcome, {Business}" + account # / Net-30 terms; right = bordered **tier card** (tier name + "N% OFF RETAIL" in taupe `.mono`).
- **Tabs** (sticky, top:78px): Order Pad / Order History / Resources + "Sign Out".
- **Order Pad**: header with title + live **search** ("Search by name or SKU", filters rows instantly, clear ✕, no-match state). Table columns: thumbnail · Piece · SKU (`.mono`) · Retail (struck) · **Your Price** · Stock (In Stock / Low Stock / Backorder) · **Qty** stepper+input · Line total. Grid `46px 1.6fr 1fr 0.8fr 0.9fr 0.9fr 110px 0.9fr`. **Sticky charcoal footer**: units selected · order total (`--font-head`) · "Saves $X vs retail" (taupe) · **Add All to Order** (`.btn-light`, disabled at 0 → adds all qty>0 lines to cart and opens drawer).
- **Order History**: rows of SO #, date, units, total, status (Delivered/In Transit), tracking (`.mono`), "Reorder".
- **Resources**: 3-col cards (Catalog PDF, Dimension Drawings, Image Library, Spec Sheets, Samples, Marketing Assets) each "Download ↓".

### 11. Dealer-logged-in storefront state (`PriceTag` everywhere)
When a dealer is logged in: a charcoal banner above the nav ("Trade account active · {Tier} pricing applied"); the TRADE nav item shows a taupe dot and routes to the dashboard; and **every price** renders retail struck-through + tier price + a hairline **"TRADE PRICING"** tag in taupe. Applies on home, category, product, search results, and cart.

---

## Interactions &amp; Behavior
- **Navigation**: single-page router by `view = {name, params}` in the prototype; in Next.js use real routes (`/`, `/collections/[handle]`, `/products/[handle]`, `/about`, `/contact`, `/trade`, `/trade/apply`, `/trade/dashboard`). Every navigation closes cart + search and scrolls to top.
- **Add to cart**: merges by `productId|wood|upholstery` key; increments qty if the variant line exists; opens the drawer.
- **Swatch / qty / accordion / filters / grid toggle**: all local component state (see files).
- **Search**: case-insensitive, all whitespace-tokens must match the haystack (name+SKU+category+finish+upholstery labels).
- **Reveal on scroll** + **hover zoom** + **underline reveals** per Motion tokens; honor reduced-motion.
- **Responsive**: designed desktop-first at 1480px content width. Mobile versions (Home/Category/Product) were intentionally deferred — implement responsive collapse using the same tokens.

## State Management
Prototype state (in `app.jsx`) → production mapping:
- `cart: [{ id, name, sku, price, wood, uph, qty, key }]` → **Shopify cart** (Storefront API `cart`/`checkout`). Line key = product + selected options/variant.
- `cartOpen`, `searchOpen` → UI state (drawer/overlay).
- `dealer: { loggedIn, tier }` → derived from **Shopify customer auth + tags** (`tier:stocking` / `tier:trade` / `tier:designer`). Tier discount %s live in app config or Shopify metaobjects: **Stocking 50% / Trade 40% / Designer 20%** (demo default tier = Designer).
- `priceFor(product, tier)` = `round(retail * (1 - off))`. Displayed price computed client/server-side; **actual checkout discount** applied via Shopify automatic discounts scoped to customer tags (or draft orders for the order pad). Never trust client price for charge.
- Tweak state (`headFont`, `heroLayout`) is a design-exploration toggle — pick final values and drop the panel for production.
- Order Pad qty map, dashboard tab, all form submitted-states → local component state. Order history/resources are mock data → wire to Shopify orders + a digital-asset store.

## Assets
- **Logo**: `uploads/logo-1781292091673.svg` (wordmark "OAK &amp; ANVIL", "EST. 2002" above, taupe rule, "THE CONSIDERED HOME" below). The supplied SVG references unstyled CSS classes; the prototype rebuilds the lockup in CSS (`Logo` component in `ui.jsx`) — use that as the spec. Taupe rule = `#8B7355`.
- **All photography is placeholder.** Each `Placeholder` block names the intended shot and aspect ratio (heroes 16:9/full-bleed, product 4:5, category 3:2). Client supplies finals.
- **Icons**: only a hand-built magnifier (circle + line, `SearchIcon`). No icon library needed; add one consistent with the brand if more are required.
- **Fonts**: Bodoni Moda, Libre Baskerville, Jost, Space Mono (Google Fonts).
- 15 products / 2 categories with finishes, upholstery, dimensions, SKUs, and copy are all in `data.jsx` (use as seed/spec).

## Files
Design source (in `design_files/`):
- `index.html` — design system (CSS variables, type ramp, button/link/reveal classes), font loading, script order.
- `data.jsx` — catalog (15 products), categories, tiers, wood/upholstery swatches, `priceFor`/`fmt` helpers.
- `ui.jsx` — `Logo`, `Nav`, `Footer`, `Placeholder`, `Accordion`, `Swatches`, `SearchOverlay`, `SearchIcon`, scroll-reveal hook.
- `pages-shop.jsx` — `HomePage`, `CategoryPage`, `ProductPage`, `ProductCard`, `PriceTag`.
- `pages-trade.jsx` — `AboutPage`, `ContactPage`, `DealerLogin`, `DealerApply`.
- `pages-dashboard.jsx` — `DealerDashboard` + order pad.
- `app.jsx` — router shell, cart + dealer + search state, `CartDrawer`, tweak wiring.
- `tweaks-panel.jsx` — design-exploration controls (not for production).

Open `index.html` in a browser to interact with the full prototype.
