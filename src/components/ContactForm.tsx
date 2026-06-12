'use client'
import { useState } from 'react'

const field = { display: 'flex', flexDirection: 'column' as const, gap: 9, marginBottom: 26 }
const lbl = { fontSize: 10.5, textTransform: 'uppercase' as const, letterSpacing: '0.24em', color: 'var(--greige)' }
const inp = { border: 'none', borderBottom: '1px solid var(--hair)', background: 'none', padding: '10px 0', fontSize: 14, color: 'var(--charcoal)', outline: 'none', width: '100%' }

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <p className="t-body" style={{ color: 'var(--taupe)', padding: '40px 0' }}>
        Thank you. Your note is on its way — we&rsquo;ll reply shortly.
      </p>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ textAlign: 'left' }}>
      <div style={field}>
        <label style={lbl}>Name</label>
        <input style={inp} required />
      </div>
      <div style={field}>
        <label style={lbl}>Email</label>
        <input type="email" style={inp} required />
      </div>
      <div style={field}>
        <label style={lbl}>Subject</label>
        <input style={inp} />
      </div>
      <div style={field}>
        <label style={lbl}>Message</label>
        <textarea rows={4} style={{ ...inp, resize: 'vertical' }} required />
      </div>
      <button className="btn btn-solid btn-block" type="submit" style={{ marginTop: 14 }}>
        Send Message
      </button>
    </form>
  )
}
