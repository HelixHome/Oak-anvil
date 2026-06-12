export type CategoryId = 'dining-chairs' | 'counter-stools'
export type WoodId = 'drift-oak' | 'burnt-oak'
export type UphId = 'natural-linen' | 'charcoal-linen' | 'oatmeal-boucle' | 'ivory-boucle' | 'stone-velvet'
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
  images: string[]
}

export interface Category {
  id: CategoryId
  name: string
  tagline: string
  desc: string
  image: string
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
