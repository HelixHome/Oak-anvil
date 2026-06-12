import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Placeholder } from '@/components/Placeholder'
import type { Tone } from '@/types'

export const metadata: Metadata = {
  title: 'Craftsmanship — Oak & Anvil',
  description: 'How a chair earns its keep. Our approach to wood sourcing, joinery, finishing, and selling direct.',
}

const CDN = 'https://images.unsplash.com/photo'
type Block = { mark: string; title: string; body: string; img: string; tone: Tone; src: string }

const BLOCKS: Block[] = [
  {
    mark: '01 — Sourcing',
    title: 'Wood We Can Stand Behind',
    body: 'We buy kiln-dried solid hardwood from mills that replant what they take. Oak, ash, walnut — no veneer over fiberboard, no shortcuts hidden inside the frame. The wood you see is the wood that holds you up.',
    img: 'TIMBER YARD — STACKED HARDWOOD',
    tone: 'stone',
    src: `${CDN}-1519947486511-46149fa0a254?w=800&h=1000&fit=crop&q=80`,
  },
  {
    mark: '02 — Joinery',
    title: 'Mortise, Tenon, Time',
    body: 'Each frame is joined the slow way: a tenon cut to fit a mortise, glued, pinned, and clamped overnight. It is the joint that has held chairs together for four hundred years, and it is the reason ours will outlast their first owners.',
    img: 'WORKSHOP — HAND-CUT JOINERY',
    tone: 'sand',
    src: `${CDN}-1550254478-ead40cc54513?w=800&h=1000&fit=crop&q=80`,
  },
  {
    mark: '03 — Finishing',
    title: 'Oil, Not Lacquer',
    body: 'We finish in a low-sheen penetrating oil rubbed in by hand. It sinks into the grain rather than sitting on top of it, so the wood keeps its depth and can be renewed at home with a cloth and an afternoon.',
    img: 'FINISHING — HAND-RUBBED OIL',
    tone: 'bone',
    src: `${CDN}-1556910103-1c02745aae4d?w=800&h=1000&fit=crop&q=80`,
  },
  {
    mark: '04 — Direct',
    title: 'No Room Full of Middlemen',
    body: 'We sell straight from the workshop to your table. The markup that usually stacks up across importers, showrooms, and floor staff simply is not in the price. That is the whole model: make a few things well, sell them honestly.',
    img: 'DELIVERY — CRATED & READY',
    tone: 'stone',
    src: `${CDN}-1615529328331-f8917597711f?w=800&h=1000&fit=crop&q=80`,
  },
]

export default function AboutPage() {
  return (
    <ScrollReveal>
      {/* Hero — bleeds under sticky nav */}
      <section style={{ position: 'relative', height: '78vh', minHeight: 520, marginTop: -78 }}>
        <Placeholder
          tone="deep"
          label="FULL-BLEED — WORKSHOP FLOOR"
          sub="about hero"
          anchor="bottom"
          src={`${CDN}-1598928506311-c55ded91a20c?w=1920&h=900&fit=crop&q=80`}
          alt="Artisan woodworking workshop"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 40px',
        }}>
          <div className="eyebrow" style={{ color: 'rgba(247,245,241,0.7)', marginBottom: 22 }}>
            Craftsmanship
          </div>
          <h1 className="t-display" style={{ color: 'var(--ivory)', maxWidth: 840 }}>
            How a Chair Earns Its Keep
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: 'var(--sp-10) 40px', textAlign: 'center' }}>
        <p className="reveal-up t-h2" style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.5, color: 'var(--charcoal-soft)' }}>
          We started in 2002 with a single bench and a stubborn idea: that good seating should be solid wood, joined properly, and priced like the workshop sold it to you directly. It does, because we do.
        </p>
      </section>

      {/* Alternating craft blocks */}
      {BLOCKS.map((block, i) => {
        const odd = i % 2 === 1
        const gridStyle: CSSProperties = {
          maxWidth: 'var(--maxw)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'var(--sp-8)', alignItems: 'center',
          direction: odd ? 'rtl' : 'ltr',
        }
        const textStyle: CSSProperties = {
          maxWidth: 440, direction: 'ltr',
          justifySelf: odd ? 'end' : 'start',
        }
        const imgStyle: CSSProperties = { aspectRatio: '4/5', direction: 'ltr' }

        return (
          <section key={i} style={{ background: odd ? 'var(--bone)' : 'var(--ivory)', padding: 'var(--sp-9) 40px' }}>
            <div style={gridStyle}>
              <Placeholder
                className="reveal-up"
                tone={block.tone}
                label={block.img}
                sub="materials · 4:5"
                src={block.src}
                alt={block.mark}
                style={imgStyle}
              />
              <div className="reveal-up" style={textStyle}>
                <div className="eyebrow" style={{ color: 'var(--taupe)' }}>{block.mark}</div>
                <h2 className="t-h1" style={{ margin: '18px 0 22px' }}>{block.title}</h2>
                <p className="t-body" style={{ color: 'var(--charcoal-soft)' }}>{block.body}</p>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section style={{ background: 'var(--charcoal)', padding: 'var(--sp-10) 40px', textAlign: 'center' }}>
        <div className="reveal-up" style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 className="t-h1" style={{ color: 'var(--ivory)', marginBottom: 34 }}>See the Collection</h2>
          <Link href="/dining-chairs" className="btn btn-light">Shop Dining Chairs</Link>
        </div>
      </section>
    </ScrollReveal>
  )
}
