'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useDealer } from '@/context/DealerContext'
import { TIERS } from '@/config/tiers'

const HERO_PATHS = ['/', '/dining-chairs', '/counter-stools']

export function Nav() {
  const pathname = usePathname()
  const hasHero = HERO_PATHS.includes(pathname)
  const [solid, setSolid] = useState(!hasHero)
  const { totalItems, openCart } = useCart()
  const { dealer } = useDealer()

  useEffect(() => {
    if (!hasHero) { setSolid(true); return }
    const onScroll = () => setSolid(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasHero, pathname])

  const ink = solid ? 'var(--charcoal)' : 'rgba(247,245,241,0.92)'

  const linkStyle = {
    fontSize: 11,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.22em',
    color: ink,
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none',
    transition: 'color .3s',
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 60 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 40px',
        height: 78,
        background: solid ? 'var(--ivory)' : 'transparent',
        borderBottom: solid ? '1px solid var(--hair)' : '1px solid transparent',
        transition: 'background .5s ease, border-color .5s ease',
      }}>
        {/* Left nav */}
        <nav style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          <Link href="/dining-chairs" style={linkStyle}>Dining Chairs</Link>
          <Link href="/counter-stools" style={linkStyle}>Counter Stools</Link>
          <Link href="/about" style={linkStyle}>Craftsmanship</Link>
        </nav>

        {/* Center wordmark */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 400, fontSize: 21, letterSpacing: '0.2em', color: ink, paddingLeft: '0.2em', whiteSpace: 'nowrap', transition: 'color .4s' }}>
            OAK &amp; ANVIL
          </div>
        </Link>

        {/* Right nav */}
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Link href="/contact" style={linkStyle}>Contact</Link>
          {dealer ? (
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--taupe)', whiteSpace: 'nowrap' }}>
              Trade · {Math.round(TIERS[dealer.tier].off * 100)}% off
            </span>
          ) : (
            <Link href="/trade" style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', border: '1px solid currentColor', display: 'inline-block', flexShrink: 0 }} />
              Trade
            </Link>
          )}
          <button
            onClick={openCart}
            style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: 0 }}
            aria-label={`Cart, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
          >
            Cart ({totalItems})
          </button>
        </nav>
      </div>
    </header>
  )
}
