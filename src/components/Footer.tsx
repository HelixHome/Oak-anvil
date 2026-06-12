import Link from 'next/link'
import { Logo } from './Logo'
import { SignupForm } from './SignupForm'

const colStyle = { display: 'flex', flexDirection: 'column' as const, gap: 14 }
const headStyle = { fontSize: 10.5, textTransform: 'uppercase' as const, letterSpacing: '0.28em', color: 'var(--greige)', marginBottom: 6 }
const linkStyle = { fontSize: 12.5, color: 'var(--charcoal-soft)', letterSpacing: '0.02em', textDecoration: 'none', display: 'block' }

export function Footer() {
  return (
    <footer style={{ background: 'var(--ivory)', borderTop: '1px solid var(--hair)', padding: '80px 40px 48px' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.4fr', gap: 48 }}>

        {/* Brand */}
        <div>
          <Logo size={0.92} />
          <p className="t-small" style={{ color: 'var(--greige)', marginTop: 24, maxWidth: 260 }}>
            Heirloom-quality seating in solid wood. Made to order, sold direct.
          </p>
        </div>

        {/* Customer Care */}
        <div style={colStyle}>
          <div style={headStyle}>Customer Care</div>
          <Link href="/contact" style={linkStyle}>Contact</Link>
          <span style={linkStyle}>Shipping &amp; Delivery</span>
          <span style={linkStyle}>Returns</span>
          <span style={linkStyle}>Care &amp; Warranty</span>
          <span style={linkStyle}>Order Status</span>
        </div>

        {/* Trade */}
        <div style={colStyle}>
          <div style={headStyle}>Trade</div>
          <Link href="/trade" style={linkStyle}>Dealer Login</Link>
          <Link href="/trade/apply" style={linkStyle}>Apply for Trade</Link>
          <Link href="/about" style={linkStyle}>Our Craft</Link>
          <span style={linkStyle}>Catalog &amp; Spec Sheets</span>
        </div>

        {/* Join the List */}
        <div style={colStyle}>
          <div style={headStyle}>Join the List</div>
          <p className="t-small" style={{ color: 'var(--greige)' }}>New work and quiet news. No noise.</p>
          <SignupForm />
          <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
            {['Instagram', 'Pinterest', 'Journal'].map(s => (
              <span key={s} style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--charcoal-soft)', cursor: 'pointer' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 'var(--maxw)', margin: '56px auto 0', paddingTop: 24, borderTop: '1px solid var(--hair-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span className="mono" style={{ color: 'var(--greige)', fontSize: 10 }}>© 2026 Oak &amp; Anvil · The Considered Home</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Visa', 'MC', 'Amex', 'PayPal'].map(p => (
            <span key={p} style={{ fontSize: 9.5, letterSpacing: '0.14em', color: 'var(--greige)', border: '1px solid var(--hair)', padding: '4px 9px' }}>{p.toUpperCase()}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
