'use client'
import { useState } from 'react'
import { Placeholder } from './Placeholder'
import { ProductCard } from './ProductCard'
import { WOOD, UPH } from '@/data/products'
import type { Product, Category, Tone } from '@/types'

interface CategoryViewProps {
  category: Category
  products: Product[]
}

export function CategoryView({ category, products }: CategoryViewProps) {
  const [wood, setWood] = useState('all')
  const [uph, setUph] = useState('all')
  const [cols, setCols] = useState(3)

  let list = products
  if (wood !== 'all') list = list.filter(p => p.woods.includes(wood as never))
  if (uph !== 'all') list = list.filter(p => p.uph.includes(uph as never))

  const CARD_TONES: Tone[] = ['sand', 'bone', 'stone']

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: '62vh', minHeight: 420, marginTop: -78 }}>
        <Placeholder
          anchor="bottom"
          label={category.name.toUpperCase() + ' — CATEGORY HERO'}
          sub="supplied photography"
          tone="deep"
          src={category.image}
          alt={category.name}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'rgba(247,245,241,0.7)', marginBottom: 20 }}>
            {category.id === 'dining-chairs' ? 'Eight Chairs' : 'Seven Stools'}
          </div>
          <h1 className="t-display" style={{ color: 'var(--ivory)' }}>{category.name}</h1>
          <p className="t-body" style={{ color: 'rgba(247,245,241,0.85)', maxWidth: 420, marginTop: 18 }}>
            {category.tagline}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{ position: 'sticky', top: 78, zIndex: 20, background: 'var(--ivory)', borderBottom: '1px solid var(--hair)' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 var(--gutter)', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
            <FilterSelect label="Wood Finish" value={wood} onChange={setWood} options={WOOD} allLabel="All Finishes" />
            <FilterSelect label="Upholstery" value={uph} onChange={setUph} options={UPH} allLabel="All Upholstery" />
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span className="mono" style={{ color: 'var(--greige)' }}>{list.length} pieces</span>
            <div style={{ display: 'flex', gap: 10 }}>
              {[2, 3].map(n => (
                <button key={n} onClick={() => setCols(n)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.12em', color: cols === n ? 'var(--charcoal)' : 'var(--greige)', fontFamily: 'var(--font-body)', textDecoration: cols === n ? 'underline' : 'none', textUnderlineOffset: 4 }}>
                  {n} COL
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section style={{ padding: 'var(--sp-7) var(--gutter) var(--sp-10)' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          {list.length === 0 ? (
            <p className="t-body" style={{ textAlign: 'center', color: 'var(--greige)', padding: '80px 0' }}>
              No pieces match those finishes.{' '}
              <button className="link-reveal reveal" style={{ fontFamily: 'var(--font-body)' }} onClick={() => { setWood('all'); setUph('all') }}>
                Clear filters
              </button>
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: cols === 2 ? 40 : 30, rowGap: 64 }}>
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} tone={CARD_TONES[i % 3]} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function FilterSelect({ label, value, onChange, options, allLabel }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: Record<string, { label: string; hex: string }>
  allLabel: string
}) {
  const selectStyle: React.CSSProperties = {
    border: 'none',
    borderBottom: '1px solid var(--charcoal)',
    background: 'none',
    padding: '4px 18px 4px 0',
    fontSize: 11.5,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--charcoal)',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: 'linear-gradient(45deg,transparent 50%,var(--charcoal) 50%),linear-gradient(135deg,var(--charcoal) 50%,transparent 50%)',
    backgroundPosition: 'right 6px center,right 2px center',
    backgroundSize: '4px 4px,4px 4px',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span className="t-micro" style={{ color: 'var(--greige)' }}>{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle}>
        <option value="all">{allLabel}</option>
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>{v.label}</option>
        ))}
      </select>
    </label>
  )
}
