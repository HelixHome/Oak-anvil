@AGENTS.md

# Oak & Anvil — Headless Shopify Storefront

## What this is

Premium DTC furniture e-commerce site for Oak & Anvil. Restoration Hardware-inspired aesthetic. 15 products in 2 categories (Dining Chairs, Counter Stools) at launch, plus a separate B2B dealer portal with tiered pricing.

Full design spec: `docs/design-spec.md`. Approved design screens: `docs/designs/` (not yet populated — using the written spec for now).

## Stack

- Next.js (App Router, TypeScript, Tailwind), deployed on Vercel
- Shopify Storefront API for products, cart, checkout (NOT yet connected — use mock data in `src/data/products.ts` until env vars exist; keep all Shopify calls behind a thin adapter in `src/lib/shopify/` so swapping mock → live is one change)
- Shopify customer accounts + tags for dealer auth/tiers

## Design system (non-negotiable)

- Background ivory `#F7F5F1`, text charcoal `#2B2B2B`, taupe accents. NO bright colors, NO rounded corners, NO drop shadows, NO sale badges.
- Headings: wide-tracked all-caps serif (0.2–0.3em letterspacing). Restrained body text.
- Extreme whitespace; large vertical section padding; hairline borders only.
- Buttons: ghost/outline or solid charcoal. Hover: subtle image zoom, underline reveals. Motion: slow fades only.
- Define tokens in Tailwind theme config — never hardcode colors/spacing in components.

## Site map

Consumer: Home, /dining-chairs, /counter-stools, /products/[handle], cart drawer (slide-out, hands off to Shopify checkout), /about, /contact.

Dealer (under /trade): login, application form, dashboard (tier display, order pad table of all 15 SKUs with tier pricing, quick reorder, resources/downloads, order history). When a dealer is logged in and browsing the consumer site, show retail struck through + tier price + "TRADE PRICING" label.

## Dealer tiers

Three tiers stored as Shopify customer tags: `tier:stocking` (50% off retail), `tier:trade` (40%), `tier:designer` (30%). Discount percentages live in one config file (`src/config/tiers.ts`) — never scattered. Checkout pricing via Shopify automatic discounts scoped to customer tags (or draft orders from the order pad) — display logic is ours, money logic is Shopify's.

## Conventions

- Server Components by default; client components only where interactive (cart drawer, swatch selectors, order pad).
- Mock data shape must mirror Shopify Storefront API types (products with handles, variants, selectedOptions, price as { amount, currencyCode }).
- Product images supplied by owner later — use neutral placeholder blocks at correct aspect ratios (4:5 product, 16:9 editorial).
- Mobile responsive required for Home, Category, Product pages minimum.
- Never expose dealer pricing data to anonymous/retail sessions (server-side gate, not CSS hiding).

## Owner context

Brian has 20+ years furniture sourcing experience (China/Vietnam) but is not a developer — explain technical decisions in plain language, propose before doing anything destructive, and keep commits small with clear messages.
