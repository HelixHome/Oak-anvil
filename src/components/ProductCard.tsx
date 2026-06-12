import Link from 'next/link'
import { Placeholder } from './Placeholder'
import type { Product, Tone } from '@/types'
import { fmt } from '@/config/tiers'

interface ProductCardProps {
  product: Product
  tone?: Tone
}

export function ProductCard({ product, tone = 'sand' }: ProductCardProps) {
  return (
    <Link href={`/products/${product.handle}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div style={{ overflow: 'hidden' }}>
        <Placeholder
          zoom
          label={product.name.toUpperCase()}
          sub={product.sku}
          tone={tone}
          style={{ aspectRatio: '4 / 5', width: '100%' }}
        />
      </div>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--charcoal)' }}>
          {product.name}
        </span>
        <span style={{ fontSize: 12, letterSpacing: '0.04em', color: 'var(--charcoal)' }}>
          {fmt(product.price)}
        </span>
      </div>
    </Link>
  )
}
