import type { Product, Category, WoodOption, UphOption, WoodId, UphId } from '@/types'

export const WOOD: Record<WoodId, WoodOption> = {
  'drift-oak':  { label: 'Drift Weathered Oak', hex: '#A68B5B' },
  'burnt-oak':  { label: 'Burnt Oak',           hex: '#5C3D2E' },
}

export const UPH: Record<UphId, UphOption> = {
  'natural-linen':  { label: 'Natural Linen',   hex: '#D8CFBE' },
  'charcoal-linen': { label: 'Charcoal Linen',  hex: '#4B4A47' },
  'oatmeal-boucle': { label: 'Oatmeal Bouclé',  hex: '#C8BEB0' },
  'ivory-boucle':   { label: 'Ivory Bouclé',    hex: '#EDE9E0' },
  'stone-velvet':   { label: 'Stone Velvet',     hex: '#9A9590' },
}

const MATERIALS = 'Kiln-dried solid hardwood frame with traditional mortise-and-tenon joinery. Hand-finished in a penetrating oil. Webbed seat suspension; high-resilience foam where upholstered.'
const CARE = 'Dust with a soft, dry cloth. Wipe spills promptly. Avoid direct sunlight and forced-air vents. Re-oil wood surfaces annually with a clear furniture oil. Vacuum upholstery on low suction.'
const SHIPPING = 'Made to order. Ships in 6–8 weeks via in-home delivery on orders over $1,500; otherwise threshold freight. Returns accepted within 30 days of delivery in original condition; return freight is the customer\'s responsibility on non-defective items.'

// TODO: Update prices to match actual retail pricing
const ALL_WOODS: WoodId[] = ['drift-oak', 'burnt-oak']
const ALL_UPH: UphId[] = ['natural-linen', 'charcoal-linen', 'oatmeal-boucle', 'ivory-boucle', 'stone-velvet']
const SLIPCOVER_UPH: UphId[] = ['natural-linen', 'charcoal-linen', 'oatmeal-boucle']

const IMG = '/images/products/extracted'
const imgs = (slug: string) => [1, 2, 3].map(i => `${IMG}/${slug}_${i}.jpg`)

function mk(
  id: string, name: string, category: Product['category'], price: number, sku: string,
  woods: WoodId[], uph: UphId[],
  dims: { width: number; depth: number; height: number }, seat: number, weight: number,
  blurb: string,
  images: string[] = [],
): Product {
  return { id, handle: id, name, category, price, sku, woods, uph, dims, seat, weight, blurb, materials: MATERIALS, care: CARE, shipping: SHIPPING, images }
}

export const PRODUCTS: Product[] = [
  // ── Dining Chairs ──────────────────────────────────────────────────────────
  mk('belgian-slipcover', 'Belgian Slipcover Chair', 'dining-chairs', 645, 'HH1005TX',
    ALL_WOODS, SLIPCOVER_UPH,
    { width: 23.5, depth: 26.5, height: 42.5 }, 21, 22,
    'A generous upholstered dining chair with a fully removable slipcover. The easiest chair to live with, and the hardest to leave.',
    imgs('belgian-slipcover')),

  mk('harlyn', 'Harlyn Side Chair', 'dining-chairs', 495, 'HH1018',
    ALL_WOODS, ALL_UPH,
    { width: 21.5, depth: 25, height: 38 }, 20, 18,
    'A clean, upright side chair with a padded seat and an open back. Works at the dining table and against the wall with equal composure.',
    imgs('harlyn')),

  mk('jasper-slipcover', 'Jasper Slipcover Chair', 'dining-chairs', 595, 'HH1001TX',
    ALL_WOODS, SLIPCOVER_UPH,
    { width: 21.5, depth: 25, height: 41.5 }, 20, 19,
    'A slender ladderback with a removable slipcover seat. Practical without looking it.',
    imgs('jasper-slipcover')),

  mk('jasper-roll-back', 'Jasper Roll Back Chair', 'dining-chairs', 545, 'HH1013',
    ALL_WOODS, ALL_UPH,
    { width: 20, depth: 26, height: 41.5 }, 20, 18,
    'The Jasper frame with a softly rolled top rail. A subtle curve that changes the whole character of the chair.',
    imgs('jasper-roll-back')),

  mk('louie', 'Louie Oval Chair', 'dining-chairs', 525, 'HH1009',
    ALL_WOODS, ALL_UPH,
    { width: 19.5, depth: 23.5, height: 40 }, 20, 17,
    'Oval back, upholstered seat, turned legs. A shape from another century, drawn with a steady hand.',
    imgs('louie')),

  mk('madeline', 'Madeline Chair', 'dining-chairs', 475, 'HH1012',
    ALL_WOODS, ALL_UPH,
    { width: 20, depth: 21, height: 35 }, 18.5, 16,
    'A cross-back dining chair with an upholstered seat. Compact, light, and exactly right.',
    imgs('madeline')),

  mk('sasha', 'Sasha Side Chair', 'dining-chairs', 445, 'HH1006',
    ALL_WOODS, ALL_UPH,
    { width: 20.5, depth: 24.5, height: 36 }, 20, 16,
    'An open back, a padded seat, and nothing wasted. The Sasha is the chair that disappears into a room and makes it better.',
    imgs('sasha')),

  mk('shelton', 'Shelton Chair', 'dining-chairs', 695, 'HH1008',
    ALL_WOODS, ALL_UPH,
    { width: 24, depth: 28.5, height: 35.5 }, 22, 23,
    'Our widest dining chair. A deep seat, a broad back, and arms that make it feel like something inherited. The host chair.',
    imgs('shelton')),

  // ── Counter Stools ─────────────────────────────────────────────────────────
  mk('burnett', 'Burnett Counter Stool', 'counter-stools', 525, 'HH1010-CS',
    ALL_WOODS, ALL_UPH,
    { width: 21, depth: 23.5, height: 37.5 }, 26, 18,
    'A low back, solid arms, and an upholstered seat at counter height. The stool you could sit at for three hours.',
    imgs('burnett')),

  mk('cody', 'Cody Counter Stool', 'counter-stools', 545, 'HH1017-CS',
    ALL_WOODS, ALL_UPH,
    { width: 21.5, depth: 24.5, height: 43.5 }, 26, 19,
    'A tall, ladderback counter stool with a fully upholstered seat and back. Substantial and comfortable in equal measure.',
    imgs('cody')),

  mk('dania', 'Dania Counter Stool', 'counter-stools', 595, 'HH1004-CSTX',
    ALL_WOODS, SLIPCOVER_UPH,
    { width: 23.5, depth: 24.5, height: 41.5 }, 26, 20,
    'A wide, slip-covered counter stool. The fabric comes off; the frame is built to last.',
    imgs('dania')),

  mk('dillon', 'Dillon Counter Stool', 'counter-stools', 445, 'HH1016',
    ALL_WOODS, ALL_UPH,
    { width: 20, depth: 22, height: 40 }, 26, 16,
    'A clean, lean counter stool with a padded seat. No back, no drama, easy to move.',
    imgs('dillon')),

  mk('hampton', 'Hampton Counter Stool', 'counter-stools', 495, 'HH1015',
    ALL_WOODS, ALL_UPH,
    { width: 23, depth: 24, height: 38.5 }, 26, 18,
    'A square-shouldered stool with a generously upholstered seat. Sits as solidly as it looks.',
    imgs('hampton')),

  mk('harrington', 'Harrington Counter Stool', 'counter-stools', 545, 'HH1014',
    ALL_WOODS, ALL_UPH,
    { width: 23.5, depth: 25, height: 38.5 }, 26, 19,
    'A rounded back and a wide upholstered seat. The Harrington leans toward comfort without losing the line.',
    imgs('harrington')),

  mk('mirribel', 'Mirribel Counter Stool', 'counter-stools', 475, 'HH1011-CS',
    ALL_WOODS, ALL_UPH,
    { width: 20, depth: 22.5, height: 42.5 }, 26, 17,
    'A delicate spindle back at counter height. Taller than it looks, lighter than it feels.',
    imgs('mirribel')),

  mk('sasha-cs', 'Sasha Counter Stool', 'counter-stools', 425, 'HH1006-CS',
    ALL_WOODS, ALL_UPH,
    { width: 19, depth: 21, height: 39.5 }, 26, 15,
    'The Sasha dining chair, scaled for the island. The same open back, the same quiet presence.',
    imgs('sasha-cs')),

  mk('townsend', 'Townsend Counter Stool', 'counter-stools', 495, 'HH1000-CS',
    ALL_WOODS, ALL_UPH,
    { width: 20.5, depth: 24.5, height: 41.5 }, 26, 17,
    'A high back, solid legs, upholstered seat. The Townsend holds its own at any island.',
    imgs('townsend')),
]

const EDITORIAL = 'https://images.unsplash.com/photo'
export const CATEGORIES: Record<string, Category> = {
  'dining-chairs': {
    id: 'dining-chairs',
    name: 'Dining Chairs',
    tagline: 'Seating built for the long table — and the long evening.',
    desc: 'Eight chairs in solid hardwood. Each made to order, each finished by hand.',
    image: `${EDITORIAL}-1586023492125-27b2c045efd7?w=1920&h=900&fit=crop&q=80`,
  },
  'counter-stools': {
    id: 'counter-stools',
    name: 'Counter Stools',
    tagline: 'For the island, the bar, the edge of the kitchen.',
    desc: 'Nine stools at counter height. The same joinery, scaled for the kitchen.',
    image: `${EDITORIAL}-1581539250439-c96689b516dd?w=1920&h=900&fit=crop&q=80`,
  },
}
