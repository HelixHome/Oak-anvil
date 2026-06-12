import Link from 'next/link'
import { Placeholder } from '@/components/Placeholder'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PRODUCTS, CATEGORIES } from '@/data/products'
import type { Tone } from '@/types'

const FEATURED_IDS = ['madeline', 'shelton', 'sasha', 'burnett']
const FEATURED_TONES: Tone[] = ['sand', 'bone', 'stone', 'sand']

export default function HomePage() {
  const featured = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)!)
  const categories = Object.values(CATEGORIES)

  return (
    <ScrollReveal>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, marginTop: -78 }}>
        <Placeholder
          anchor="bottom"
          label="FULL-BLEED LIFESTYLE — DINING ROOM"
          sub="hero · supplied photography"
          tone="deep"
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1920&h=1080&fit=crop&q=80"
          alt="Luxury dining room interior"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '13vh', textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'rgba(247,245,241,0.7)', marginBottom: 24 }}>The Considered Home</div>
          <h1 className="t-display" style={{ color: 'var(--ivory)', maxWidth: 900 }}>Furniture That Knows What It Is</h1>
          <p className="t-body" style={{ color: 'rgba(247,245,241,0.85)', maxWidth: 460, margin: '24px 0 34px' }}>
            Dining chairs and counter stools designed with a clear point of view. Warm, organic, considered — and priced the way they should be.
          </p>
          <Link href="/dining-chairs" className="link-reveal reveal" style={{ color: 'var(--ivory)' }}>
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* ── CATEGORY TILES ────────────────────────────────────────── */}
      <section style={{ padding: 'var(--sp-9) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'var(--sp-7)' }}>
            <div className="eyebrow">Two Collections</div>
            <h2 className="t-h1" style={{ marginTop: 18 }}>Where You Sit, Considered</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className="reveal-up"
                style={{ display: 'block', textDecoration: 'none', transitionDelay: `${i * 0.08}s` }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <Placeholder
                    zoom
                    label={cat.name.toUpperCase()}
                    sub="category lifestyle · 3:2"
                    tone={i === 0 ? 'sand' : 'stone'}
                    src={cat.image}
                    alt={cat.name}
                    style={{ aspectRatio: '3 / 2.1' }}
                  />
                </div>
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <h3 className="t-h2">{cat.name}</h3>
                    <p className="t-small" style={{ color: 'var(--greige)', marginTop: 8, maxWidth: 340 }}>{cat.tagline}</p>
                  </div>
                  <span className="link-reveal reveal">Shop</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP STORY ───────────────────────────────────── */}
      <section style={{ background: 'var(--bone)', padding: 'var(--sp-10) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-8)', alignItems: 'center' }}>
          <Placeholder
            className="reveal-up"
            label="JOINERY DETAIL — MORTISE & TENON"
            sub="materials · 4:5"
            tone="stone"
            src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=1000&fit=crop&q=80"
            alt="Wood joinery detail"
            style={{ aspectRatio: '4 / 5' }}
          />
          <div className="reveal-up" style={{ maxWidth: 440 }}>
            <div className="eyebrow">The Making</div>
            <h2 className="t-h1" style={{ margin: '20px 0 24px' }}>One Joint, Cut a Thousand Times</h2>
            <p className="t-body" style={{ color: 'var(--charcoal-soft)' }}>
              The right piece doesn't announce itself. It simply belongs — and looks better in five years than it did the day it arrived. Every chair begins as solid hardwood, joined properly, finished by hand.
            </p>
            <p className="t-body" style={{ color: 'var(--charcoal-soft)', marginTop: 18 }}>
              We source directly from the same factories we've worked with for over 20 years — which means you get quality that would cost far more anywhere else, without the layers of margin in between.
            </p>
            <div style={{ marginTop: 34 }}>
              <Link href="/about" className="link-reveal reveal">Read Our Craft</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ROW ──────────────────────────────────────────── */}
      <section style={{ padding: 'var(--sp-9) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--sp-6)' }}>
            <div>
              <div className="eyebrow">Made to Order</div>
              <h2 className="t-h1" style={{ marginTop: 16 }}>The Quiet Favorites</h2>
            </div>
            <Link href="/dining-chairs" className="link-reveal reveal">View All</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
            {featured.map((product, i) => (
              <div key={product.id} className="reveal-up" style={{ transitionDelay: `${i * 0.06}s` }}>
                <ProductCard product={product} tone={FEATURED_TONES[i]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIET STATEMENT ───────────────────────────────────────── */}
      <section style={{ background: 'var(--charcoal)', padding: 'var(--sp-10) var(--gutter)', textAlign: 'center' }}>
        <div className="reveal-up" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow" style={{ color: 'rgba(247,245,241,0.55)', marginBottom: 28 }}>Sold Direct</div>
          <p className="t-h2" style={{ color: 'var(--ivory)', lineHeight: 1.5 }}>
            &ldquo;There&rsquo;s a certain kind of home you feel the moment you walk through the door. Warm without trying. Pulled together without being precious. Every piece exactly where it belongs. Oak &amp; Anvil is designed for that home.&rdquo;
          </p>
        </div>
      </section>
    </ScrollReveal>
  )
}
