// ui.jsx — shared components for Oak & Anvil
const { useState, useEffect, useRef } = React;

/* ---------- scroll reveal ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = () => Array.from(el.querySelectorAll('.reveal-up'));
    if (reduce) { targets().forEach(n => n.classList.add('in')); return; }
    const check = () => {
      const h = window.innerHeight;
      targets().forEach(n => {
        if (n.classList.contains('in')) return;
        const r = n.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) n.classList.add('in');
      });
    };
    // initial pass (next frame so layout is settled)
    requestAnimationFrame(() => requestAnimationFrame(check));
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const id = setInterval(check, 400); // catch late-mounting / font reflow
    setTimeout(() => clearInterval(id), 4000);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      clearInterval(id);
    };
  }, []);
  return ref;
}

/* ---------- placeholder image block ---------- */
function Placeholder({ label, tone = 'sand', className = '', style = {}, sub, zoom = false, anchor = 'center' }) {
  const tones = {
    sand:  { bg: '#E6E0D5', ink: '#9A9082' },
    bone:  { bg: '#ECE8E0', ink: '#A49C8E' },
    stone: { bg: '#D7D0C3', ink: '#8C8475' },
    deep:  { bg: '#3A362F', ink: '#8E8678' },
    char:  { bg: '#2B2B2B', ink: '#776F62' },
  };
  const t = tones[tone] || tones.sand;
  const light = tone === 'deep' || tone === 'char';
  const labelBox = anchor === 'bottom'
    ? { position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', padding: '0 24px', pointerEvents: 'none' }
    : { textAlign: 'center', padding: '0 24px', pointerEvents: 'none' };
  return (
    <div className={'oa-ph ' + (zoom ? 'oa-ph-zoom ' : '') + className}
      style={{
        position: 'relative', overflow: 'hidden', background: t.bg,
        backgroundImage: `repeating-linear-gradient(135deg, ${light ? 'rgba(255,255,255,0.018)' : 'rgba(43,43,43,0.022)'} 0 1px, transparent 1px 26px)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
      }}>
      <div style={labelBox}>
        <div className="mono" style={{ color: t.ink, opacity: 0.92 }}>{label}</div>
        {sub && <div className="mono" style={{ color: t.ink, opacity: 0.55, marginTop: 6, fontSize: 9 }}>{sub}</div>}
      </div>
      <span style={cornerS(8,8,'tl',t.ink)} /><span style={cornerS(8,8,'tr',t.ink)} />
      <span style={cornerS(8,8,'bl',t.ink)} /><span style={cornerS(8,8,'br',t.ink)} />
    </div>
  );
}
function cornerS(w,h,pos,ink) {
  const o = 16;
  const base = { position:'absolute', width:w, height:h, borderColor: ink, opacity:0.4, pointerEvents:'none' };
  const map = {
    tl:{ top:o,left:o,borderTop:'1px solid',borderLeft:'1px solid' },
    tr:{ top:o,right:o,borderTop:'1px solid',borderRight:'1px solid' },
    bl:{ bottom:o,left:o,borderBottom:'1px solid',borderLeft:'1px solid' },
    br:{ bottom:o,right:o,borderBottom:'1px solid',borderRight:'1px solid' },
  };
  return { ...base, ...map[pos] };
}

/* ---------- logo ---------- */
function Logo({ light = false, size = 1, sub = true, est = true }) {
  const ink = light ? 'var(--ivory)' : 'var(--charcoal)';
  return (
    <div style={{ textAlign: 'center', lineHeight: 1, userSelect: 'none' }}>
      {est && <div style={{ fontFamily:'var(--font-body)', fontWeight:400, fontSize: 9*size, letterSpacing:'0.34em', color: light?'rgba(247,245,241,0.7)':'var(--greige)', marginBottom: 7*size, textTransform:'uppercase' }}>Est. 2002</div>}
      <div style={{ fontFamily:'var(--font-head)', fontWeight:400, fontSize: 27*size, letterSpacing:'0.18em', color: ink, paddingLeft:'0.18em' }}>OAK &amp; ANVIL</div>
      {sub && <>
        <div style={{ width: 70*size, height:1, background:'var(--taupe)', opacity:0.85, margin:`${8*size}px auto ${7*size}px` }} />
        <div style={{ fontFamily:'var(--font-body)', fontWeight:400, fontSize: 8.5*size, letterSpacing:'0.32em', color: light?'rgba(247,245,241,0.75)':'var(--greige)', textTransform:'uppercase' }}>The Considered Home</div>
      </>}
    </div>
  );
}

/* ---------- top nav ---------- */
function SearchIcon({ stroke = 'currentColor', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ display:'block' }}>
      <circle cx="7" cy="7" r="5" stroke={stroke} strokeWidth="1.1" />
      <line x1="10.8" y1="10.8" x2="14.5" y2="14.5" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function Nav({ go, view, cartCount, openCart, openSearch, dealer, solidAlways }) {
  const [solid, setSolid] = useState(!!solidAlways);
  useEffect(() => {
    if (solidAlways) { setSolid(true); return; }
    const onScroll = () => setSolid(window.scrollY > 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solidAlways, view]);

  const light = !solid;
  const ink = light ? 'rgba(247,245,241,0.92)' : 'var(--charcoal)';
  const linkStyle = { fontSize: 11, textTransform:'uppercase', letterSpacing:'0.22em', color: ink, cursor:'pointer', background:'none', border:'none', transition:'color .3s', whiteSpace:'nowrap' };

  return (
    <header style={{ position:'sticky', top:0, zIndex:60 }}>
      {dealer.loggedIn &&
        <div style={{ background:'var(--charcoal)', color:'var(--ivory)', textAlign:'center', padding:'7px 0', fontSize:10, letterSpacing:'0.24em', textTransform:'uppercase' }}>
          Trade account active · {window.OA.TIERS[dealer.tier].label} pricing applied
        </div>}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
        padding:'0 40px', height: 78,
        background: solid ? 'var(--ivory)' : 'transparent',
        borderBottom: solid ? '1px solid var(--hair)' : '1px solid transparent',
        transition:'background .5s ease, border-color .5s ease',
      }}>
        <nav style={{ display:'flex', gap: 30, alignItems:'center' }}>
          <button style={{ ...linkStyle, display:'flex', alignItems:'center', gap:9 }} onClick={openSearch} aria-label="Search">
            <SearchIcon stroke={ink} />Search
          </button>
          <button style={linkStyle} onClick={() => go('category', { id:'dining-chairs' })}>Dining Chairs</button>
          <button style={linkStyle} onClick={() => go('category', { id:'counter-stools' })}>Counter Stools</button>
          <button style={linkStyle} onClick={() => go('about')}>Craftsmanship</button>
        </nav>

        <button onClick={() => go('home')} style={{ background:'none', border:'none', cursor:'pointer', lineHeight:1 }}>
          <div style={{ fontFamily:'var(--font-head)', fontWeight:400, fontSize:21, letterSpacing:'0.2em', color: ink, paddingLeft:'0.2em', whiteSpace:'nowrap', transition:'color .4s' }}>OAK &amp; ANVIL</div>
        </button>

        <nav style={{ display:'flex', gap: 28, alignItems:'center', justifyContent:'flex-end' }}>
          <button style={linkStyle} onClick={() => go('contact')}>Contact</button>
          <button style={{ ...linkStyle, display:'flex', alignItems:'center', gap:8 }} onClick={() => go(dealer.loggedIn ? 'trade-dashboard' : 'trade-login')}>
            <span style={{ width:5, height:5, borderRadius:'50%', background: dealer.loggedIn ? 'var(--taupe)' : 'transparent', border: dealer.loggedIn?'none':'1px solid currentColor', display:'inline-block' }} />
            Trade
          </button>
          <button style={{ ...linkStyle, position:'relative' }} onClick={openCart}>
            Cart ({cartCount})
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ---------- footer ---------- */
function Footer({ go }) {
  const col = { display:'flex', flexDirection:'column', gap:14 };
  const lk = { fontSize:12.5, color:'var(--charcoal-soft)', cursor:'pointer', letterSpacing:'0.02em' };
  const head = { fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.28em', color:'var(--greige)', marginBottom:6 };
  return (
    <footer style={{ background:'var(--ivory)', borderTop:'1px solid var(--hair)', padding:'80px 40px 48px' }}>
      <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1.4fr', gap:48 }}>
        <div>
          <Logo size={0.92} />
          <p className="t-small" style={{ color:'var(--greige)', marginTop:24, maxWidth:260 }}>
            Heirloom-quality seating in solid wood. Made to order, sold direct.
          </p>
        </div>
        <div style={col}>
          <div style={head}>Customer Care</div>
          <span style={lk} onClick={() => go('contact')}>Contact</span>
          <span style={lk}>Shipping &amp; Delivery</span>
          <span style={lk}>Returns</span>
          <span style={lk}>Care &amp; Warranty</span>
          <span style={lk}>Order Status</span>
        </div>
        <div style={col}>
          <div style={head}>Trade</div>
          <span style={lk} onClick={() => go('trade-login')}>Dealer Login</span>
          <span style={lk} onClick={() => go('trade-apply')}>Apply for Trade</span>
          <span style={lk} onClick={() => go('about')}>Our Craft</span>
          <span style={lk}>Catalog &amp; Spec Sheets</span>
        </div>
        <div style={col}>
          <div style={head}>Join the List</div>
          <p className="t-small" style={{ color:'var(--greige)' }}>New work and quiet news. No noise.</p>
          <Signup />
          <div style={{ display:'flex', gap:18, marginTop:8 }}>
            {['Instagram','Pinterest','Journal'].map(s =>
              <span key={s} style={{ ...lk, fontSize:11, textTransform:'uppercase', letterSpacing:'0.18em' }}>{s}</span>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:'var(--maxw)', margin:'56px auto 0', paddingTop:24, borderTop:'1px solid var(--hair-soft)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <span className="mono" style={{ color:'var(--greige)', fontSize:10 }}>© 2026 Oak &amp; Anvil · The Considered Home</span>
        <div style={{ display:'flex', gap:16 }}>
          {['Visa','MC','Amex','PayPal'].map(p =>
            <span key={p} style={{ fontSize:9.5, letterSpacing:'0.14em', color:'var(--greige)', border:'1px solid var(--hair)', padding:'4px 9px' }}>{p.toUpperCase()}</span>)}
        </div>
      </div>
    </footer>
  );
}
function Signup() {
  const [v, setV] = useState(''); const [done, setDone] = useState(false);
  return (
    <form onSubmit={(e)=>{e.preventDefault(); if(v) setDone(true);}} style={{ display:'flex', borderBottom:'1px solid var(--charcoal)', maxWidth:280 }}>
      {done
        ? <span className="t-small" style={{ padding:'8px 0', color:'var(--taupe)' }}>Thank you — you're on the list.</span>
        : <>
          <input value={v} onChange={e=>setV(e.target.value)} type="email" placeholder="Email address" required
            style={{ flex:1, border:'none', background:'none', outline:'none', padding:'9px 0', fontSize:12.5, color:'var(--charcoal)' }} />
          <button type="submit" style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--charcoal)' }}>→</button>
        </>}
    </form>
  );
}

/* ---------- accordion ---------- */
function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ borderTop:'1px solid var(--hair)' }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom:'1px solid var(--hair)' }}>
            <button onClick={() => setOpen(isOpen ? null : i)}
              style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 2px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
              <span style={{ fontSize:11.5, textTransform:'uppercase', letterSpacing:'0.22em', color:'var(--charcoal)' }}>{it.title}</span>
              <span style={{ fontSize:18, fontWeight:300, color:'var(--greige)', transition:'transform .3s', transform: isOpen?'rotate(45deg)':'none' }}>+</span>
            </button>
            <div style={{ maxHeight: isOpen ? 600 : 0, overflow:'hidden', transition:'max-height .5s cubic-bezier(0.22,1,0.36,1)' }}>
              <div className="t-small" style={{ color:'var(--charcoal-soft)', padding:'0 2px 26px', maxWidth:560 }}>{it.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- swatch selector ---------- */
function Swatches({ label, options, dict, value, onChange }) {
  if (!options || !options.length) return null;
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
        <span className="t-micro" style={{ color:'var(--greige)' }}>{label}</span>
        <span className="t-micro" style={{ color:'var(--charcoal)' }}>{dict[value].label}</span>
      </div>
      <div style={{ display:'flex', gap:12 }}>
        {options.map(o => {
          const sel = o === value;
          return (
            <button key={o} title={dict[o].label} onClick={() => onChange(o)}
              style={{ width:34, height:34, padding:0, cursor:'pointer', background: dict[o].hex, border:'1px solid var(--hair)', outline: sel?'1px solid var(--charcoal)':'none', outlineOffset:3, transition:'outline .2s' }} />
          );
        })}
      </div>
    </div>
  );
}

/* ---------- section eyebrow heading ---------- */
function SectionMark({ children, light }) {
  return <div className="eyebrow" style={light?{color:'rgba(247,245,241,0.7)'}:{}}>{children}</div>;
}

/* ---------- storefront search overlay ---------- */
function SearchOverlay({ open, onClose, go, dealer }) {
  const { PRODUCTS, CATEGORIES, WOOD, UPH, fmt } = window.OA;
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setQ(''); setTimeout(() => inputRef.current && inputRef.current.focus(), 120); }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const query = q.trim().toLowerCase();
  const results = query.length === 0 ? [] : PRODUCTS.filter(p => {
    const hay = [
      p.name, p.sku, CATEGORIES[p.category].name,
      ...p.woods.map(w => WOOD[w].label),
      ...p.uph.map(u => UPH[u].label),
    ].join(' ').toLowerCase();
    return query.split(/\s+/).every(tok => hay.includes(tok));
  });
  const suggestions = ['Dining Chairs', 'Counter Stools', 'Smoked Oak', 'Walnut', 'Leather'];

  const pick = (p) => { go('product', { id: p.id }); onClose(); };

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:95, background:'var(--ivory)',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transform: open ? 'translateY(0)' : 'translateY(-12px)',
      transition:'opacity .4s ease, transform .5s cubic-bezier(0.22,1,0.36,1)',
      display:'flex', flexDirection:'column',
    }}>
      {/* search field row */}
      <div style={{ borderBottom:'1px solid var(--hair)' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'0 40px', height:78, display:'flex', alignItems:'center', gap:20 }}>
          <SearchIcon stroke="var(--charcoal)" size={20} />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search chairs, stools, finishes…"
            style={{ flex:1, border:'none', background:'none', outline:'none', fontFamily:'var(--font-head)', fontSize:'clamp(22px,2.6vw,34px)', letterSpacing:'0.02em', color:'var(--charcoal)' }} />
          <button onClick={onClose} className="t-micro" style={{ background:'none', border:'none', cursor:'pointer', color:'var(--greige)', letterSpacing:'0.22em' }}>Close ✕</button>
        </div>
      </div>

      {/* body */}
      <div className="no-bar" style={{ flex:1, overflowY:'auto' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'48px 40px 80px' }}>
          {query.length === 0 && (
            <div>
              <div className="t-micro" style={{ color:'var(--greige)', marginBottom:22 }}>Suggested</div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                {suggestions.map(s =>
                  <button key={s} onClick={() => setQ(s)} style={{ border:'1px solid var(--hair)', background:'none', cursor:'pointer', padding:'11px 20px', fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--charcoal-soft)' }}>{s}</button>)}
              </div>
            </div>
          )}

          {query.length > 0 && results.length === 0 && (
            <p className="t-body" style={{ color:'var(--greige)' }}>No pieces match “{q}”. Try a finish, a category, or a name.</p>
          )}

          {results.length > 0 && (
            <div>
              <div className="t-micro" style={{ color:'var(--greige)', marginBottom:28 }}>{results.length} {results.length === 1 ? 'result' : 'results'}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:28 }}>
                {results.map((p, i) => (
                  <button key={p.id} onClick={() => pick(p)} style={{ background:'none', border:'none', padding:0, cursor:'pointer', textAlign:'left' }}>
                    <div style={{ overflow:'hidden' }}>
                      <Placeholder zoom label={p.name.toUpperCase()} sub={p.sku} tone={['sand','bone','stone','sand'][i%4]} style={{ aspectRatio:'4 / 5', width:'100%' }} />
                    </div>
                    <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:6 }}>
                      <span style={{ fontSize:13, textTransform:'uppercase', letterSpacing:'0.16em' }}>{p.name}</span>
                      <span className="t-small" style={{ color:'var(--greige)' }}>{CATEGORIES[p.category].name} · {dealer.loggedIn ? fmt(window.OA.priceFor(p, dealer.tier)) : fmt(p.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  useReveal, Placeholder, Logo, Nav, Footer, Accordion, Swatches, SectionMark, Signup, SearchOverlay, SearchIcon,
});
