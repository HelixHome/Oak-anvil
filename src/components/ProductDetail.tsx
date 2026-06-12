'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Placeholder } from './Placeholder'
import { Accordion } from './Accordion'
import { ProductCard } from './ProductCard'
import { useCart } from '@/context/CartContext'
import { WOOD, UPH } from '@/data/products'
import { fmt } from '@/config/tiers'
import type { Product, Tone } from '@/types'

const GALLERY = ['FRONT THREE-QUARTER', 'PROFILE', 'SEAT & JOINERY DETAIL', 'IN SITU — DINING ROOM']
const RELATED_TONES: Tone[] = ['sand', 'bone', 'stone']

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addItem, openCart } = useCart()
  const [activeThumb, setActiveThumb] = useState(0)
  const [wood, setWood] = useState(product.woods[0])
  const [uph, setUph] = useState(product.uph[0] ?? null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      wood: WOOD[wood]?.label ?? null,
      uph: uph ? (UPH[uph]?.label ?? null) : null,
      qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const categoryLabel = product.category === 'dining-chairs' ? 'Dining Chair' : 'Counter Stool'
  const categoryHref = `/${product.category}`
  const categoryName = product.category === 'dining-chairs' ? 'Dining Chairs' : 'Counter Stools'

  const accordionItems = [
    {
      title: 'Dimensions',
      body: (
        <div style={{ maxWidth: 320 }}>
          {([['Overall width', `${product.dims.width}"`], ['Overall depth', `${product.dims.depth}"`], ['Overall height', `${product.dims.height}"`], ['Seat height', `${product.seat}"`], ['Weight', `${product.weight} lb`]] as [string, string][]).map(([k, v], i, arr) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--hair-soft)' : 'none' }}>
              <span>{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
      ),
    },
    { title: 'Materials & Construction', body: product.materials },
    { title: 'Shipping & Returns', body: product.shipping },
    { title: 'Care', body: product.care },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '40px var(--gutter) 0' }}>
        <div className="mono" style={{ color: 'var(--greige)', marginBottom: 36 }}>
          <Link href="/">Home</Link>
          {' / '}
          <Link href={categoryHref}>{categoryName.toUpperCase()}</Link>
          {' / '}
          {product.name.toUpperCase()}
        </div>
      </div>

      {/* 3-col layout */}
      <section style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 var(--gutter)', display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 40, alignItems: 'start' }}>

        {/* Thumbnail rail */}
        <div style={{ position: 'sticky', top: 110, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {GALLERY.map((label, i) => (
            <button key={i} onClick={() => setActiveThumb(i)}
              style={{ padding: 0, border: activeThumb === i ? '1px solid var(--charcoal)' : '1px solid var(--hair)', background: 'none', cursor: 'pointer', aspectRatio: '4/5' }}>
              <Placeholder label={String(i + 1)} tone={activeThumb === i ? 'stone' : 'bone'} src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%' }} />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div style={{ position: 'sticky', top: 110 }}>
          <Placeholder label={product.name.toUpperCase()} sub={GALLERY[activeThumb]} tone="sand" src={product.images[0]} alt={product.name} style={{ aspectRatio: '4/5', width: '100%' }} />
        </div>

        {/* Info column */}
        <div style={{ paddingTop: 10, maxWidth: 460 }}>
          <div className="eyebrow">{categoryLabel}</div>
          <h1 className="t-h1" style={{ margin: '16px 0 18px' }}>{product.name}</h1>
          <div style={{ marginBottom: 22 }}>
            <span style={{ fontSize: 15, letterSpacing: '0.04em', color: 'var(--charcoal)' }}>{fmt(product.price)}</span>
          </div>
          <p className="t-body" style={{ color: 'var(--charcoal-soft)', marginBottom: 38 }}>{product.blurb}</p>

          {/* Wood finish swatches */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="t-micro" style={{ color: 'var(--greige)' }}>Wood Finish</span>
              <span className="t-micro">{WOOD[wood]?.label}</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {product.woods.map(w => (
                <button key={w} title={WOOD[w]?.label} onClick={() => setWood(w)}
                  style={{ width: 34, height: 34, padding: 0, cursor: 'pointer', background: WOOD[w]?.hex, border: '1px solid var(--hair)', outline: w === wood ? '1px solid var(--charcoal)' : 'none', outlineOffset: 3, transition: 'outline .2s' }} />
              ))}
            </div>
          </div>

          {/* Upholstery swatches */}
          {product.uph.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span className="t-micro" style={{ color: 'var(--greige)' }}>Upholstery</span>
                <span className="t-micro">{uph ? UPH[uph]?.label : '—'}</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.uph.map(u => (
                  <button key={u} title={UPH[u]?.label} onClick={() => setUph(u)}
                    style={{ width: 34, height: 34, padding: 0, cursor: 'pointer', background: UPH[u]?.hex, border: '1px solid var(--hair)', outline: u === uph ? '1px solid var(--charcoal)' : 'none', outlineOffset: 3, transition: 'outline .2s' }} />
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to Cart */}
          <div style={{ display: 'flex', gap: 14, margin: '34px 0 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--charcoal)' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 42, height: 46, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--charcoal)' }}>–</button>
              <span style={{ width: 46, textAlign: 'center', fontSize: 13 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 42, height: 46, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--charcoal)' }}>+</button>
            </div>
            <button className="btn btn-solid btn-block" onClick={handleAddToCart} style={{ flex: 1 }}>
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>

          <p className="t-small" style={{ color: 'var(--greige)', marginBottom: 36 }}>
            Made to order · Ships in 6–8 weeks · {product.sku}
          </p>

          <Accordion items={accordionItems} />
        </div>
      </section>

      {/* Complete the Set */}
      {related.length > 0 && (
        <section style={{ padding: 'var(--sp-10) var(--gutter) var(--sp-9)' }}>
          <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
              <div className="eyebrow">Complete the Set</div>
              <h2 className="t-h2" style={{ marginTop: 14 }}>Pairs Well With</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 30 }}>
              {related.map((r, i) => (
                <ProductCard key={r.id} product={r} tone={RELATED_TONES[i]} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
