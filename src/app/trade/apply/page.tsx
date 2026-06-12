'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TradeApplyPage() {
  const [sent, setSent] = useState(false)
  const [vol, setVol] = useState('')
  const [showroom, setShowroom] = useState<'yes' | 'no'>('yes')

  const fieldStyle = { display: 'flex', flexDirection: 'column' as const, gap: 8 }
  const lbl = { fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.22em', color: 'var(--greige)' }
  const inp = {
    border: '1px solid var(--hair)',
    background: 'var(--ivory)',
    padding: '12px 14px',
    fontSize: 13.5,
    color: 'var(--charcoal)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  return (
    <section style={{ minHeight: 'calc(100vh - 78px)', padding: '90px 40px var(--sp-9)', background: 'var(--bone)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow" style={{ color: 'var(--taupe)' }}>Trade Program</div>
          <h1 className="t-h1" style={{ margin: '16px 0 16px' }}>Apply for a Trade Account</h1>
          <p className="t-body" style={{ color: 'var(--charcoal-soft)', maxWidth: 460, margin: '0 auto' }}>
            For designers, decorators, and stocking dealers. Tell us about your business — approval takes two to three business days.
          </p>
        </div>

        {sent ? (
          <div style={{ background: 'var(--ivory)', border: '1px solid var(--hair)', padding: '56px 44px', textAlign: 'center' }}>
            <h2 className="t-h2" style={{ marginBottom: 16 }}>Application Received</h2>
            <p className="t-body" style={{ color: 'var(--charcoal-soft)', maxWidth: 380, margin: '0 auto 32px' }}>
              We&rsquo;ll review your details and email your account credentials and tier assignment shortly.
            </p>
            <Link href="/trade" className="btn">Back to Sign In</Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollTo(0, 0) }}
            style={{ background: 'var(--ivory)', border: '1px solid var(--hair)', padding: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
          >
            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={lbl}>Business Name</label>
              <input style={inp} required />
            </div>
            <div style={fieldStyle}>
              <label style={lbl}>Contact Name</label>
              <input style={inp} required />
            </div>
            <div style={fieldStyle}>
              <label style={lbl}>Email</label>
              <input type="email" style={inp} required />
            </div>
            <div style={fieldStyle}>
              <label style={lbl}>Resale Certificate #</label>
              <input style={inp} required />
            </div>
            <div style={fieldStyle}>
              <label style={lbl}>Phone</label>
              <input style={inp} />
            </div>
            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={lbl}>Business Address</label>
              <input style={inp} required />
            </div>
            <div style={fieldStyle}>
              <label style={lbl}>Expected Annual Volume</label>
              <select
                value={vol}
                onChange={e => setVol(e.target.value)}
                style={{ ...inp, cursor: 'pointer' }}
                required
              >
                <option value="" disabled>Select…</option>
                <option>Under $10,000</option>
                <option>$10,000 – $50,000</option>
                <option>$50,000 – $150,000</option>
                <option>$150,000+</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={lbl}>Do you operate a showroom?</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
                {(['yes', 'no'] as const).map(o => (
                  <button
                    type="button"
                    key={o}
                    onClick={() => setShowroom(o)}
                    style={{
                      flex: 1, padding: 12, cursor: 'pointer',
                      fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                      border: '1px solid',
                      borderColor: showroom === o ? 'var(--charcoal)' : 'var(--hair)',
                      background: showroom === o ? 'var(--charcoal)' : 'transparent',
                      color: showroom === o ? 'var(--ivory)' : 'var(--greige)',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-solid" type="submit" style={{ gridColumn: '1 / -1', marginTop: 8 }}>
              Submit Application
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
