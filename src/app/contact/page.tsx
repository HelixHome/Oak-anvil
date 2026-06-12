import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Oak & Anvil',
  description: 'Questions on finishes, lead times, or a larger order? Write to us. We answer within two business days.',
}

export default function ContactPage() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 78px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 40px',
    }}>
      <div style={{ width: '100%', maxWidth: 520, textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: 'var(--taupe)' }}>We&rsquo;re Listening</div>
        <h1 className="t-h1" style={{ margin: '16px 0 16px' }}>Contact</h1>
        <p className="t-body" style={{ color: 'var(--charcoal-soft)', maxWidth: 400, margin: '0 auto 52px' }}>
          Questions on finishes, lead times, or a larger order? Write to us. We answer within two business days.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
