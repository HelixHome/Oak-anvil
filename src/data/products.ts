import type { Product, Category, WoodOption, UphOption, WoodId, UphId } from '@/types'

export const WOOD: Record<WoodId, WoodOption> = {
  'smoked-oak':     { label: 'Smoked Oak',      hex: '#6E5A45' },
  'natural-oak':    { label: 'Natural Oak',      hex: '#C2A578' },
  'blackened-ash':  { label: 'Blackened Ash',    hex: '#3A352F' },
  'walnut':         { label: 'Walnut',            hex: '#5A4231' },
  'weathered-grey': { label: 'Weathered Grey',   hex: '#9A958B' },
}

export const UPH: Record<UphId, UphOption> = {
  'belgian-linen':  { label: 'Belgian Linen',    hex: '#D8CFBE' },
  'charcoal-wool':  { label: 'Charcoal Wool',    hex: '#4B4A47' },
  'saddle-leather': { label: 'Saddle Leather',   hex: '#8A5A3B' },
  'putty-boucle':   { label: 'Putty Bouclé',     hex: '#C8BEB0' },
  'fog-linen':      { label: 'Fog Linen',        hex: '#B7B3A8' },
}

const MATERIALS = 'Kiln-dried solid hardwood frame with traditional mortise-and-tenon joinery. Hand-finished in a low-sheen penetrating oil. Webbed seat suspension; high-resilience foam where upholstered.'
const CARE = 'Dust with a soft, dry cloth. Wipe spills promptly. Avoid direct sunlight and forced-air vents. Re-oil wood surfaces annually with a clear furniture oil. Vacuum upholstery on low suction.'
const SHIPPING = 'Made to order. Ships in 6–8 weeks via in-home delivery on orders over $1,500; otherwise threshold freight. Returns accepted within 30 days of delivery in original condition; return freight is the customer’s responsibility on non-defective items.'

const CDN = 'https://images.unsplash.com/photo'
const img = (id: string) => [`${CDN}-${id}?w=800&h=1000&fit=crop&q=80`]

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
  mk('hawthorne', 'Hawthorne Dining Chair', 'dining-chairs', 495, 'OA-DC-HAW',
    ['smoked-oak', 'natural-oak', 'walnut'], ['belgian-linen', 'charcoal-wool', 'putty-boucle'],
    { width: 21, depth: 23, height: 33 }, 18.5, 19,
    'A low, generous back and a softly scooped seat. The Hawthorne is the quiet anchor of a long table.',
    img('1555041469-a586c61ea9bc')),

  mk('ashford', 'Ashford Dining Chair', 'dining-chairs', 545, 'OA-DC-ASH',
    ['smoked-oak', 'blackened-ash', 'walnut'], ['belgian-linen', 'saddle-leather', 'charcoal-wool'],
    { width: 20, depth: 22, height: 34 }, 18, 18,
    'Spindle back, turned legs. A literal heirloom shape, drawn tight and modern.',
    img('1567538096630-e0c55bd6374c')),

  mk('wren', 'Wren Dining Chair', 'dining-chairs', 425, 'OA-DC-WRN',
    ['natural-oak', 'weathered-grey', 'smoked-oak'], [],
    { width: 19, depth: 21, height: 32 }, 18, 15,
    'All wood, no upholstery. A bentwood back that flexes just enough to disappear behind you.',
    img('1503602642458-232111445657')),

  mk('cooper', 'Cooper Dining Chair', 'dining-chairs', 595, 'OA-DC-COP',
    ['walnut', 'blackened-ash', 'smoked-oak'], ['saddle-leather', 'charcoal-wool', 'fog-linen'],
    { width: 22, depth: 24, height: 34 }, 18.5, 21,
    'Broad shoulders, leather sling back. Built for the chair you linger in after dinner.',
    img('1592078615290-033ee584e267')),

  mk('marlowe', 'Marlowe Dining Chair', 'dining-chairs', 675, 'OA-DC-MAR',
    ['smoked-oak', 'walnut'], ['belgian-linen', 'putty-boucle', 'fog-linen'],
    { width: 23, depth: 24, height: 35 }, 19, 22,
    'A fully upholstered host chair. Tailored seams, a tall comforting back.',
    img('1586023492125-27b2c045efd7')),

  mk('bramley', 'Bramley Dining Chair', 'dining-chairs', 455, 'OA-DC-BRM',
    ['natural-oak', 'smoked-oak', 'weathered-grey'], ['belgian-linen', 'charcoal-wool'],
    { width: 20, depth: 22, height: 33 }, 18, 17,
    'A clean ladderback with a woven rush seat option. Country house, edited down.',
    img('1519947486511-46149fa0a254')),

  mk('ellison', 'Ellison Dining Chair', 'dining-chairs', 525, 'OA-DC-ELL',
    ['blackened-ash', 'walnut', 'smoked-oak'], ['charcoal-wool', 'saddle-leather', 'fog-linen'],
    { width: 21, depth: 23, height: 33 }, 18.5, 19,
    'Architectural and upright. A single sweep of timber from back leg to crest.',
    img('1598300042247-d088f8ab3a91')),

  mk('thatcher', 'Thatcher Dining Chair', 'dining-chairs', 795, 'OA-DC-THA',
    ['walnut', 'smoked-oak'], ['saddle-leather', 'belgian-linen', 'putty-boucle'],
    { width: 24, depth: 25, height: 35 }, 19, 24,
    'Our most generous chair. A deep curved back and full upholstery. The end of the table.',
    img('1506439773649-6e0eb8cfb237')),

  // ── Counter Stools ─────────────────────────────────────────────────────────
  mk('foundry', 'Foundry Counter Stool', 'counter-stools', 445, 'OA-CS-FND',
    ['smoked-oak', 'blackened-ash', 'natural-oak'], ['saddle-leather', 'charcoal-wool'],
    { width: 17, depth: 18, height: 39 }, 26, 16,
    'A backless stool with a saddle-cut seat and a single brass foot rail. Tucks fully away.',
    img('1541123437800-1bb1317badc2')),

  mk('anvil', 'Anvil Counter Stool', 'counter-stools', 525, 'OA-CS-ANV',
    ['blackened-ash', 'walnut', 'smoked-oak'], ['charcoal-wool', 'saddle-leather', 'fog-linen'],
    { width: 19, depth: 20, height: 41 }, 26, 19,
    'Low curved back, heavy foot. Named for what it feels like to sit on — immovable.',
    img('1558769132-cb1aea458c5e')),

  mk('ironside', 'Ironside Counter Stool', 'counter-stools', 495, 'OA-CS-IRN',
    ['smoked-oak', 'walnut', 'weathered-grey'], ['belgian-linen', 'putty-boucle'],
    { width: 18, depth: 19, height: 40 }, 26, 17,
    'A spindle back scaled up for the kitchen island. Upholstered seat, exposed joinery.',
    img('1580480055273-228ff5388ef8')),

  mk('bellows', 'Bellows Counter Stool', 'counter-stools', 395, 'OA-CS-BEL',
    ['natural-oak', 'smoked-oak'], [],
    { width: 16, depth: 17, height: 38 }, 25, 13,
    'The lightest thing we make. Solid oak, no upholstery, one continuous bent rail.',
    img('1550254478-ead40cc54513')),

  mk('forge', 'Forge Counter Stool', 'counter-stools', 565, 'OA-CS-FRG',
    ['blackened-ash', 'walnut', 'smoked-oak'], ['saddle-leather', 'charcoal-wool', 'fog-linen'],
    { width: 19, depth: 20, height: 41 }, 27, 20,
    'A swivel return on a fixed base. Leather seat, blackened frame. Industrial, softened.',
    img('1524758631624-e2822e304c36')),

  mk('quarry', 'Quarry Counter Stool', 'counter-stools', 615, 'OA-CS-QRY',
    ['walnut', 'smoked-oak'], ['putty-boucle', 'belgian-linen', 'fog-linen'],
    { width: 20, depth: 21, height: 41 }, 27, 21,
    'A fully upholstered counter stool with a low, enveloping back. The soft one.',
    img('1634712282287-14ed57b9cc89')),

  mk('mason', 'Mason Counter Stool', 'counter-stools', 475, 'OA-CS-MSN',
    ['smoked-oak', 'natural-oak', 'blackened-ash'], ['charcoal-wool', 'saddle-leather'],
    { width: 18, depth: 19, height: 40 }, 26, 18,
    'A clean four-leg stool with a subtle taper. The one you buy three of and forget about.',
    img('1581539250439-c96689b516dd')),
]

const EDITORIAL = 'https://images.unsplash.com/photo'
export const CATEGORIES: Record<string, Category> = {
  'dining-chairs': {
    id: 'dining-chairs',
    name: 'Dining Chairs',
    tagline: 'Seating built for the long table — and the long evening.',
    desc: 'Eight chairs in solid oak, ash, and walnut. Each made to order, each finished by hand.',
    image: `${EDITORIAL}-1615529328331-f8917597711f?w=1920&h=900&fit=crop&q=80`,
  },
  'counter-stools': {
    id: 'counter-stools',
    name: 'Counter Stools',
    tagline: 'For the island, the bar, the edge of the kitchen.',
    desc: 'Seven stools at counter and bar height. The same joinery, scaled for the kitchen.',
    image: `${EDITORIAL}-1556910103-1c02745aae4d?w=1920&h=900&fit=crop&q=80`,
  },
}
