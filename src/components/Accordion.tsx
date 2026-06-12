'use client'
import { useState, type ReactNode } from 'react'

interface AccordionItem {
  title: string
  body: ReactNode
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ borderTop: '1px solid var(--hair)' }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--hair)' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 2px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--charcoal)' }}>
                {item.title}
              </span>
              <span style={{ fontSize: 18, fontWeight: 300, color: 'var(--greige)', transition: 'transform .3s', transform: isOpen ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>
                +
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 600 : 0, overflow: 'hidden', transition: 'max-height .5s cubic-bezier(0.22,1,0.36,1)' }}>
              <div className="t-small" style={{ color: 'var(--charcoal-soft)', padding: '0 2px 26px', maxWidth: 560 }}>
                {item.body}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
