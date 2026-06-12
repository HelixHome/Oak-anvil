export type CategoryId = 'dining-chairs' | 'counter-stools'
export type WoodId = 'smoked-oak' | 'natural-oak' | 'blackened-ash' | 'walnut' | 'weathered-grey'
export type UphId = 'belgian-linen' | 'charcoal-wool' | 'saddle-leather' | 'putty-boucle' | 'fog-linen'
export type TierId = 'retail' | 'stocking' | 'trade' | 'designer'
export type Tone = 'sand' | 'bone' | 'stone' | 'deep' | 'char'

export interface Product {
  id: string
  handle: string
  name: string
  category: CategoryId
  price: number
  sku: string
  woods: WoodId[]
  uph: UphId[]
  dims: { width: number; depth: number; height: number }
  seat: number
  weight: number
  blurb: string
  materials: string
  care: string
  shipping: string
}

export interface Category {
  id: CategoryId
  name: string
  tagline: string
  desc: string
}

export interface Tier {
  id: TierId
  label: string
  off: number
}

export interface WoodOption {
  label: string
  hex: string
}

export interface UphOption {
  label: string
  hex: string
}
