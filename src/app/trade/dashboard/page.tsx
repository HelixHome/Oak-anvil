'use client'
import { useState, useMemo, useEffect, type CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDealer } from '@/context/DealerContext'
import { useCart } from '@/context/CartContext'
import { PRODUCTS } from '@/data/products'
import { TIERS, priceFor, fmt } from '@/config/tiers'

const HISTORY = [
  { no: 'SO-4821', date: 'May 28, 2026', items: 24, total: 8640, status: 'Delivered', track: '1Z·994·8821' },
  { no: 'SO-4760', date: 'Apr 14, 2026', items: 12, total: 4260, status: 'In Transit', track: '1Z·994·7710' },
  { no: 'SO-4699', date: 'Mar 02, 2026', items: 36, total: 12180, status: 'Delivered', track: '1Z·994·6655' },
]

const RESOURCES = [
  { title: 'Full Catalog (PDF)', sub: '2026 · 18 MB' },
  { title: 'Dimension Drawings', sub: 'All 15 SKUs · DWG/PDF' },
  { title: 'High-Res Image Library', sub: 'Silhouette + lifestyle · ZIP' },
  { title: 'Spec Sheets', sub: 'Materials & finish specs' },
  { title: 'Finish & Fabric Samples', sub: 'Order physical swatches' },
  { title: 'Marketing Assets', sub: 'Logos, copy, social kit' },
]

function stockFor(i: number) {
  if (i % 7 === 0) return { label: 'Backorder', color: 'var(--taupe)' }
  if (i % 5 === 0) return { label: 'Low Stock', color: 'var(--charcoal-soft)' }
  return { label: 'In Stock', color: 'var(--greige)' }
}

const ROW: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '46px 1.6fr 1fr 0.8fr 0.9fr 0.9fr 110px 0.9fr',
  alignItems: 'center',
  gap: 18,
  borderBottom: '1px solid var(--hair)',
}

type Tab = 'orderpad' | 'history' | 'resources'
const TABS: { id: Tab; label: string }[] = [
  { id: 'orderpad', label: 'Order Pad' },
  { id: 'history', label: 'Order History' },
  { id: 'resources', label: 'Resources' },
]

export default function TradeDashboardPage() {
  const { dealer, logout } = useDealer()
  const { addItem, openCart } = useCart()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('orderpad')
  const [qty, setQty] = useState<Record<string, number>>({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!dealer) router.replace('/trade')
  }, [dealer, router])

  const tier = dealer ? TIERS[dealer.tier] : null

  const lineTotal = useMemo(() => {
    if (!dealer) return 0
    return PRODUCTS.reduce((sum, p) => sum + (qty[p.id] || 0) * priceFor(p.price, dealer.tier), 0)
  }, [qty, dealer])

  const retailTotal = useMemo(() => {
    if (!dealer) return 0
    return PRODUCTS.reduce((sum, p) => sum + (qty[p.id] || 0) * p.price, 0)
  }, [qty, dealer])

  const unitCount = Object.values(qty).reduce((a, b) => a + (b || 0), 0)

  const setQ = (id: string, v: number) => setQty(s => ({ ...s, [id]: Math.max(0, v) }))

  const addAll = () => {
    if (!dealer) return
    PRODUCTS.forEach(p => {
      const q = qty[p.id] || 0
      if (q > 0) {
        addItem({
          id: p.id, name: p.name, sku: p.sku,
          price: priceFor(p.price, dealer.tier),
          wood: p.woods[0] ?? null,
          uph: p.uph[0] ?? null,
          qty: q,
        })
      }
    })
    setQty({})
    openCart()
  }

  const filtered = PRODUCTS.filter(p =>
    `${p.name} ${p.sku}`.toLowerCase().includes(search.trim().toLowerCase())
  )

  if (!dealer || !tier) return null

  const tabStyle = (id: Tab): CSSProperties => ({
    background: 'none', border: 'none',
    borderBottom: tab === id ? '2px solid var(--charcoal)' : '2px solid transparent',
    padding: '22px 24px', cursor: 'pointer',
    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
    color: tab === id ? 'var(--charcoal)' : 'var(--greige)',
    marginBottom: -1,
  })

  return (
    <div style={{ background: 'var(--bone)', minHeight: 'calc(100vh - 78px)' }}>
      {/* Welcome header */}
      <section style={{ background: 'var(--charcoal)', color: 'var(--ivory)', padding: '56px 40px 50px' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(247,245,241,0.6)', marginBottom: 18 }}>Trade Dashboard</div>
            <h1 className="t-h1" style={{ color: 'var(--ivory)' }}>Welcome, {dealer.accountName}</h1>
            <p className="t-body" style={{ color: 'rgba(247,245,241,0.7)', marginTop: 12 }}>
              Account #{dealer.accountNo} · Net-30 terms
            </p>
          </div>
          <div style={{ textAlign: 'right', border: '1px solid rgba(247,245,241,0.2)', padding: '18px 26px' }}>
            <div className="t-micro" style={{ color: 'rgba(247,245,241,0.6)', marginBottom: 8 }}>Your Tier</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 24, letterSpacing: '0.06em' }}>{tier.label}</div>
            <div className="mono" style={{ color: 'var(--taupe)', marginTop: 6 }}>{Math.round(tier.off * 100)}% OFF RETAIL</div>
          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <div style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--hair)', position: 'sticky', top: 78, zIndex: 20 }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {TABS.map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)} style={tabStyle(id)}>{label}</button>
            ))}
          </div>
          <button
            onClick={() => { logout(); router.push('/trade') }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--greige)', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <section style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '48px 40px 120px' }}>
        {/* ORDER PAD */}
        {tab === 'orderpad' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26, gap: 24, flexWrap: 'wrap' }}>
              <div>
                <h2 className="t-h2">Order Pad</h2>
                <p className="t-small" style={{ color: 'var(--greige)', marginTop: 6 }}>
                  All 15 pieces at your {tier.label} pricing. Enter quantities and add the lot to your order.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--charcoal)', padding: '8px 2px', minWidth: 280 }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="var(--charcoal)" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="4.5" /><line x1="9.5" y1="9.5" x2="13.5" y2="13.5" />
                </svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or SKU"
                  style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 13, letterSpacing: '0.02em', color: 'var(--charcoal)' }}
                />
                {search && (
                  <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--greige)', fontSize: 13 }}>✕</button>
                )}
              </div>
            </div>

            <div style={{ background: 'var(--ivory)', border: '1px solid var(--hair)' }}>
              {/* Header row */}
              <div style={{ ...ROW, padding: '16px 32px', background: 'var(--bone)' }}>
                <span />
                <span className="t-micro" style={{ color: 'var(--greige)' }}>Piece</span>
                <span className="t-micro" style={{ color: 'var(--greige)' }}>SKU</span>
                <span className="t-micro" style={{ color: 'var(--greige)', textAlign: 'right' }}>Retail</span>
                <span className="t-micro" style={{ color: 'var(--greige)', textAlign: 'right' }}>Your Price</span>
                <span className="t-micro" style={{ color: 'var(--greige)' }}>Stock</span>
                <span className="t-micro" style={{ color: 'var(--greige)', textAlign: 'center' }}>Qty</span>
                <span className="t-micro" style={{ color: 'var(--greige)', textAlign: 'right' }}>Line</span>
              </div>

              {filtered.map((p) => {
                const i = PRODUCTS.indexOf(p)
                const yp = priceFor(p.price, dealer.tier)
                const st = stockFor(i)
                const q = qty[p.id] || 0
                return (
                  <div key={p.id} style={{ ...ROW, padding: '14px 32px' }}>
                    <div style={{ width: 46, height: 54, background: 'var(--bone)', border: '1px solid var(--hair-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="mono" style={{ fontSize: 7, color: 'var(--greige)' }}>IMG</span>
                    </div>
                    <Link href={`/products/${p.handle}`} style={{ fontSize: 13, letterSpacing: '0.04em', color: 'var(--charcoal)', textDecoration: 'none' }}>
                      {p.name}
                    </Link>
                    <span className="mono" style={{ color: 'var(--greige)', fontSize: 11 }}>{p.sku}</span>
                    <span style={{ textAlign: 'right', fontSize: 12.5, color: 'var(--greige)', textDecoration: 'line-through' }}>{fmt(p.price)}</span>
                    <span style={{ textAlign: 'right', fontSize: 13.5, color: 'var(--charcoal)', fontWeight: 500 }}>{fmt(yp)}</span>
                    <span style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: st.color }}>{st.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--hair)' }}>
                      <button onClick={() => setQ(p.id, q - 1)} style={{ width: 26, height: 34, border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--charcoal)' }}>–</button>
                      <input
                        value={q || ''}
                        onChange={e => setQ(p.id, parseInt(e.target.value) || 0)}
                        style={{ width: 30, textAlign: 'center', border: 'none', background: 'none', fontSize: 13, outline: 'none', color: 'var(--charcoal)' }}
                      />
                      <button onClick={() => setQ(p.id, q + 1)} style={{ width: 26, height: 34, border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--charcoal)' }}>+</button>
                    </div>
                    <span style={{ textAlign: 'right', fontSize: 13, color: q > 0 ? 'var(--charcoal)' : 'var(--stone)' }}>
                      {q > 0 ? fmt(q * yp) : '—'}
                    </span>
                  </div>
                )
              })}

              {filtered.length === 0 && (
                <div style={{ padding: '44px 32px', textAlign: 'center' }}>
                  <span className="t-small" style={{ color: 'var(--greige)' }}>No pieces match &ldquo;{search}&rdquo;. </span>
                  <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--charcoal)', textDecoration: 'underline', marginLeft: 8 }}>Clear</button>
                </div>
              )}
            </div>

            {/* Sticky order-pad footer */}
            <div style={{ position: 'sticky', bottom: 0, background: 'var(--charcoal)', color: 'var(--ivory)', padding: '22px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ display: 'flex', gap: 40, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span className="t-micro" style={{ color: 'rgba(247,245,241,0.6)' }}>{unitCount} units selected</span>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 22 }}>{fmt(lineTotal)}</span>
                {unitCount > 0 && (
                  <span className="mono" style={{ color: 'var(--taupe)' }}>
                    Saves {fmt(retailTotal - lineTotal)} vs retail
                  </span>
                )}
              </div>
              <button
                className="btn btn-light"
                disabled={unitCount === 0}
                onClick={addAll}
                style={{ opacity: unitCount === 0 ? 0.4 : 1 }}
              >
                Add All to Order
              </button>
            </div>
          </>
        )}

        {/* ORDER HISTORY */}
        {tab === 'history' && (
          <>
            <h2 className="t-h2" style={{ marginBottom: 10 }}>Order History</h2>
            <p className="t-small" style={{ color: 'var(--greige)', marginBottom: 30 }}>Reorder any past order in one tap.</p>
            <div style={{ background: 'var(--ivory)', border: '1px solid var(--hair)' }}>
              {HISTORY.map((o, i) => (
                <div key={o.no} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr 1.2fr auto', alignItems: 'center', gap: 20, padding: '22px 28px', borderBottom: i < HISTORY.length - 1 ? '1px solid var(--hair)' : 'none' }}>
                  <div>
                    <span className="mono" style={{ color: 'var(--charcoal)' }}>{o.no}</span>
                    <div className="t-small" style={{ color: 'var(--greige)', marginTop: 4 }}>{o.date}</div>
                  </div>
                  <span className="t-small">{o.items} units</span>
                  <span style={{ fontSize: 14 }}>{fmt(o.total)}</span>
                  <span style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: o.status === 'Delivered' ? 'var(--greige)' : 'var(--taupe)' }}>{o.status}</span>
                  <span className="mono" style={{ color: 'var(--greige)' }}>{o.track}</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--charcoal)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Reorder</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* RESOURCES */}
        {tab === 'resources' && (
          <>
            <h2 className="t-h2" style={{ marginBottom: 10 }}>Resources</h2>
            <p className="t-small" style={{ color: 'var(--greige)', marginBottom: 30 }}>
              Spec sheets, drawings, and assets for specifying Oak &amp; Anvil.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {RESOURCES.map(r => (
                <button key={r.title} style={{ textAlign: 'left', background: 'var(--ivory)', border: '1px solid var(--hair)', padding: '30px 28px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 150, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 15, letterSpacing: '0.04em', marginBottom: 8 }}>{r.title}</h3>
                    <span className="mono" style={{ color: 'var(--greige)' }}>{r.sub}</span>
                  </div>
                  <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--charcoal)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                    Download ↓
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
