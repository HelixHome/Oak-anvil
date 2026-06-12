@AGENTS.md

# Oak & Anvil — Headless Shopify Storefront

## What this is

Premium DTC furniture e-commerce site for Oak & Anvil. Restoration Hardware-inspired aesthetic. 15 products in 2 categories (Dining Chairs, Counter Stools) at launch, plus a separate B2B dealer portal with tiered pricing.

Full design spec: `docs/design-spec.md` (original brief). **Primary visual reference: `docs/designs/handoff-README.md`** — a complete high-fidelity handoff with exact design tokens (colors, type ramp, spacing, motion), per-screen specs for all 11 views, and a working HTML/React prototype in `docs/designs/design_files/`. Treat the prototype as the source of truth for layout, tokens, copy, and interaction — recreate it in Next.js/Tailwind using this codebase's conventions, don't copy the JSX verbatim.

## Stack

- Next.js (App Router, TypeScript, Tailwind), deployed on Vercel
- Shopify Storefront API for products, cart, checkout (NOT yet connected — use mock data in `src/data/products.ts` until env vars exist; keep all Shopify calls behind a thin adapter in `src/lib/shopify/` so swapping mock → live is one change)
- Shopify customer accounts + tags for dealer auth/tiers

## Design system (non-negotiable)

- Background ivory `#F7F5F1`, text charcoal `#2B2B2B`, taupe `#8B7355` accent (sole accent, used sparingly). NO bright colors, NO rounded corners, NO drop shadows, NO sale badges.
- Headings: serif display font (Bodoni Moda default), wide-tracked all-caps. Restrained body text (Jost). Mono labels (Space Mono) for SKUs/technical text.
- 8px spacing scale (`--sp-1`…`--sp-11`, 4–192px); content max-width 1480px; 40px page gutter.
- Extreme whitespace; large vertical section padding (128–160px); hairline borders only (`rgba(43,43,43,0.16)`).
- Buttons: ghost/outline or solid charcoal. Hover: subtle image zoom (scale 1.045), underline reveals. Motion: slow fades (1.1s) only, respect `prefers-reduced-motion`.
- Full token table, type ramp, and component specs: `docs/designs/handoff-README.md`. Define all tokens in Tailwind theme config — never hardcode colors/spacing in components.

## Site map

Consumer: Home, /dining-chairs, /counter-stools, /products/[handle], cart drawer (slide-out, hands off to Shopify checkout), /about, /contact.

Dealer (under /trade): login, application form, dashboard (tier display, order pad table of all 15 SKUs with tier pricing, quick reorder, resources/downloads, order history). When a dealer is logged in and browsing the consumer site, show retail struck through + tier price + "TRADE PRICING" label.

## Dealer tiers

Three tiers stored as Shopify customer tags: `tier:stocking` (50% off retail), `tier:trade` (40%), `tier:designer` (20%). Discount percentages live in one config file (`src/config/tiers.ts`) — never scattered. Checkout pricing via Shopify automatic discounts scoped to customer tags (or draft orders from the order pad) — display logic is ours, money logic is Shopify's.

## Conventions

- Server Components by default; client components only where interactive (cart drawer, swatch selectors, order pad).
- Mock data shape must mirror Shopify Storefront API types (products with handles, variants, selectedOptions, price as { amount, currencyCode }).
- Product images supplied by owner later — use neutral placeholder blocks at correct aspect ratios (4:5 product, 16:9 editorial).
- Mobile responsive required for Home, Category, Product pages minimum.
- Never expose dealer pricing data to anonymous/retail sessions (server-side gate, not CSS hiding).

## Owner context

Brian has 20+ years furniture sourcing experience (China/Vietnam) but is not a developer — explain technical decisions in plain language, propose before doing anything destructive, and keep commits small with clear messages.
