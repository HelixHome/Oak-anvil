'use client'
import { useEffect, useRef, type ReactNode } from 'react'

export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = () => Array.from(el.querySelectorAll<HTMLElement>('.reveal-up'))
    if (reduce) { targets().forEach(n => n.classList.add('in')); return }
    const check = () => {
      const h = window.innerHeight
      targets().forEach(n => {
        if (n.classList.contains('in')) return
        const r = n.getBoundingClientRect()
        if (r.top < h * 0.92 && r.bottom > 0) n.classList.add('in')
      })
    }
    requestAnimationFrame(() => requestAnimationFrame(check))
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
