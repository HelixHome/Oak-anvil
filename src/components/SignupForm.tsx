'use client'
import { useState } from 'react'

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}
      style={{ display: 'flex', borderBottom: '1px solid var(--charcoal)', maxWidth: 280 }}
    >
      {done ? (
        <span className="t-small" style={{ padding: '8px 0', color: 'var(--taupe)' }}>
          Thank you — you're on the list.
        </span>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            required
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', padding: '9px 0', fontSize: 12.5, color: 'var(--charcoal)' }}
          />
          <button
            type="submit"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)' }}
          >
            →
          </button>
        </>
      )}
    </form>
  )
}
