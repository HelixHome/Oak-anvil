'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { useDealer } from '@/context/DealerContext'
import { TIERS } from '@/config/tiers'
import type { TierId } from '@/types'

export default function TradePage() {
  const { login } = useDealer()
  const router = useRouter()
  const [tier, setTier] = useState<TierId>('designer')

  const inp = {
    display: 'block',
    width: '100%',
    border: '1px solid var(--hair)',
    background: 'var(--ivory)',
    padding: '14px 16px',
    fontSize: 13.5,
    color: 'var(--charcoal)',
    outline: 'none',
    marginBottom: 14,
    boxSizing: 'border-box' as const,
  }

  const dealerTiers = Object.values(TIERS).filter(t => t.id !== 'retail')

  return (
    <section style={{
      minHeight: 'calc(100vh - 78px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 40px', background: 'var(--bone)',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
          <Logo />
        </div>

        <div style={{ background: 'var(--ivory)', border: '1px solid var(--hair)', padding: '48px 44px' }}>
          <div style={{ textAlign: 'center', marginBottom: 34 }}>
            <div className="eyebrow" style={{ color: 'var(--taupe)' }}>Trade Portal</div>
            <h1 className="t-h2" style={{ marginTop: 14 }}>Dealer Sign In</h1>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); login(tier); router.push('/trade/dashboard') }}>
            <input style={inp} type="email" placeholder="Email address" defaultValue="studio@designhouse.com" required />
            <input style={inp} type="password" placeholder="Password" defaultValue="••••••••" required />

            <div style={{ margin: '22px 0 26px' }}>
              <div className="t-micro" style={{ color: 'var(--greige)', marginBottom: 12 }}>
                Demo · sign in as
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {dealerTiers.map(t => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    style={{
                      flex: 1, padding: '10px 6px', cursor: 'pointer',
                      fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                      lineHeight: 1.5, border: '1px solid', transition: 'all .25s',
                      borderColor: tier === t.id ? 'var(--charcoal)' : 'var(--hair)',
                      background: tier === t.id ? 'var(--charcoal)' : 'transparent',
                      color: tier === t.id ? 'var(--ivory)' : 'var(--greige)',
                    }}
                  >
                    {t.label.split(' ')[0]}<br />
                    <span style={{ opacity: 0.7 }}>{Math.round(t.off * 100)}%</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-solid btn-block" type="submit">Sign In</button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--greige)', textDecoration: 'underline', textUnderlineOffset: 3, alignSelf: 'center' }}>
              Forgot password
            </button>
            <div style={{ borderTop: '1px solid var(--hair-soft)', paddingTop: 20 }}>
              <span className="t-small" style={{ color: 'var(--greige)' }}>Not a dealer yet? </span>
              <Link href="/trade/apply" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--charcoal)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Apply for a Trade Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
