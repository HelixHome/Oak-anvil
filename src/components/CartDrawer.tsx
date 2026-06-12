'use client'
import { useCart } from '@/context/CartContext'
import { fmt } from '@/config/tiers'
import { Placeholder } from './Placeholder'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, totalItems } = useCart()
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <>
      {/* Scrim */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed', inset: 0, zIndex: 80,
          background: 'rgba(20,19,17,0.42)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity .4s ease',
        }}
      />

      {/* Drawer */}
      <aside
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(440px, 92vw)',
          background: 'var(--ivory)',
          borderLeft: '1px solid var(--hair)',
          zIndex: 81,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .5s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--hair)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em' }}>
            Your Cart ({totalItems})
          </span>
          <button onClick={closeCart} className="t-micro" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--greige)', letterSpacing: '0.22em' }}>
            Close ✕
          </button>
        </div>

        {/* Items */}
        <div className="no-bar" style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 80 }}>
              <p className="t-body" style={{ color: 'var(--greige)', marginBottom: 32 }}>Your cart is empty.</p>
              <button onClick={closeCart} className="link-reveal reveal" style={{ fontFamily: 'var(--font-body)' }}>
                Shop the Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {items.map(item => (
                <div key={item.key} style={{ display: 'grid', gridTemplateColumns: '74px 1fr', gap: 20, alignItems: 'start' }}>
                  <Placeholder label={item.sku} tone="bone" style={{ aspectRatio: '4/5', width: '100%' }} />
                  <div>
                    <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{item.name}</div>
                    {item.wood && <div className="t-small" style={{ color: 'var(--greige)' }}>{item.wood}</div>}
                    {item.uph && <div className="t-small" style={{ color: 'var(--greige)' }}>{item.uph}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--hair)' }}>
                        <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ width: 32, height: 36, border: 'none', background: 'none', cursor: 'pointer', fontSize: 14 }}>–</button>
                        <span style={{ width: 32, textAlign: 'center', fontSize: 13 }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ width: 32, height: 36, border: 'none', background: 'none', cursor: 'pointer', fontSize: 14 }}>+</button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 13 }}>{fmt(item.price * item.qty)}</span>
                        <button onClick={() => removeItem(item.key)} className="t-micro" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--greige)' }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '24px 32px', borderTop: '1px solid var(--hair)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: 18 }}>{fmt(subtotal)}</span>
            </div>
            <p className="t-small" style={{ color: 'var(--greige)', marginBottom: 20 }}>
              Shipping &amp; taxes calculated at checkout
            </p>
            <button className="btn btn-solid btn-block">Checkout</button>
            <p className="mono" style={{ textAlign: 'center', marginTop: 14, color: 'var(--greige)', fontSize: 9 }}>
              Secure checkout via Shopify
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
