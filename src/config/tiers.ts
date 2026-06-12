import type { Tier, TierId } from '@/types'

export const TIERS: Record<TierId, Tier> = {
  retail:   { id: 'retail',   label: 'Retail',                off: 0    },
  stocking: { id: 'stocking', label: 'Stocking Dealer',        off: 0.50 },
  trade:    { id: 'trade',    label: 'Trade',                  off: 0.40 },
  designer: { id: 'designer', label: 'Designer / Decorator',   off: 0.20 },
}

export function priceFor(retailPrice: number, tierId: TierId): number {
  return Math.round(retailPrice * (1 - TIERS[tierId].off))
}

export function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US')
}
