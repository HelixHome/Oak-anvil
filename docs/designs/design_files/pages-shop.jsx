// pages-shop.jsx — Home, Category, Product, and shared shop bits
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ---------- price tag (handles dealer tier) ---------- */
function PriceTag({ product, dealer, size = 'md', align = 'left' }) {
  const { priceFor, fmt, TIERS } = window.OA;
  const retail = product.price;
  const sizes = { sm:{p:12,l:10}, md:{p:15,l:10.5}, lg:{p:19,l:11} };
  const s = sizes[size] || sizes.md;
  if (!dealer.loggedIn) {
    return <span style={{ fontSize:s.p, letterSpacing:'0.04em', color:'var(--charcoal)' }}>{fmt(retail)}</span>;
  }
  const tp = priceFor(product, dealer.tier);
  return (
    <span style={{ display:'inline-flex', alignItems:'baseline', gap:10, flexWrap:'wrap', justifyContent: align==='center'?'center':'flex-start' }}>
      <span style={{ fontSize:s.p-2, color:'var(--greige)', textDecoration:'line-through', textDecorationColor:'rgba(138,130,118,0.6)' }}>{fmt(retail)}</span>
      <span style={{ fontSize:s.p, color:'var(--charcoal)' }}>{fmt(tp)}</span>
      <span style={{ fontSize:s.l-2.5, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--taupe)', border:'1px solid var(--taupe)', padding:'2px 7px', whiteSpace:'nowrap' }}>Trade Pricing</span>
    </span>
  );
}

/* ---------- product card ---------- */
function ProductCard({ p, go, dealer, tone = 'sand' }) {
  return (
    <button onClick={() => go('product', { id:p.id })}
      style={{ background:'none', border:'none', padding:0, cursor:'pointer', textAlign:'left', display:'block', width:'100%' }}>
      <div style={{ overflow:'hidden' }}>
        <Placeholder zoom label={p.name.toUpperCase()} sub={p.sku} tone={tone}
          style={{ aspectRatio:'4 / 5', width:'100%' }} />
      </div>
      <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:7 }}>
        <span style={{ fontSize:13, textTransform:'uppercase', letterSpacing:'0.16em', color:'var(--charcoal)' }}>{p.name}</span>
        <PriceTag product={p} dealer={dealer} size="sm" />
      </div>
    </button>
  );
}

/* ============================ HOME ============================ */
function HomePage({ go, dealer, t }) {
  const ref = useReveal();
  const { PRODUCTS, CATEGORIES } = window.OA;
  const featured = ['thatcher','foundry','marlowe','wren'].map(id => PRODUCTS.find(p=>p.id===id));
  const layout = t.heroLayout || 'centered';

  return (
    <div ref={ref}>
      {/* HERO */}
      {layout === 'centered' &&
        <section style={{ position:'relative', height:'100vh', minHeight:640, marginTop:-78 }}>
          <Placeholder anchor="bottom" label="FULL-BLEED LIFESTYLE — DINING ROOM" sub="hero · supplied photography" tone="deep"
            style={{ position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:'13vh', textAlign:'center' }}>
            <div className="eyebrow" style={{ color:'rgba(247,245,241,0.7)', marginBottom:24 }}>The Considered Home</div>
            <h1 className="t-display" style={{ color:'var(--ivory)', maxWidth:900 }}>Seating, Made to Outlast Us</h1>
            <p className="t-body" style={{ color:'rgba(247,245,241,0.85)', maxWidth:440, margin:'24px 0 34px' }}>Solid-wood dining chairs and counter stools. Imported, finished by hand, sold direct.</p>
            <button className="link-reveal reveal" style={{ color:'var(--ivory)' }} onClick={()=>go('category',{id:'dining-chairs'})}>Shop the Collection</button>
          </div>
        </section>}

      {layout === 'split' &&
        <section style={{ display:'grid', gridTemplateColumns:'1fr 1.15fr', minHeight:'100vh', marginTop:-78 }}>
          <div style={{ background:'var(--bone)', display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 7vw 80px' }}>
            <div className="eyebrow" style={{ marginBottom:26 }}>Est. 2002 · The Considered Home</div>
            <h1 className="t-display">Seating, Made&nbsp;to Outlast Us</h1>
            <p className="t-body" style={{ color:'var(--charcoal-soft)', maxWidth:380, margin:'28px 0 38px' }}>Solid-wood dining chairs and counter stools. Imported, finished by hand, sold direct at honest prices.</p>
            <div><button className="btn" onClick={()=>go('category',{id:'dining-chairs'})}>Shop Dining Chairs</button></div>
          </div>
          <Placeholder label="EDITORIAL LIFESTYLE — VERTICAL" sub="hero · 4:5 supplied photography" tone="stone" style={{ minHeight:'100vh' }} />
        </section>}

      {layout === 'lowerleft' &&
        <section style={{ position:'relative', height:'100vh', minHeight:640, marginTop:-78 }}>
          <Placeholder anchor="bottom" label="FULL-BLEED LIFESTYLE — INTERIOR" sub="hero · supplied photography" tone="deep" style={{ position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', left:0, bottom:0, padding:'0 0 11vh 7vw', maxWidth:640 }}>
            <div className="eyebrow" style={{ color:'rgba(247,245,241,0.7)', marginBottom:22 }}>The Considered Home</div>
            <h1 className="t-display" style={{ color:'var(--ivory)' }}>Seating, Made to Outlast Us</h1>
            <div style={{ marginTop:30 }}>
              <button className="link-reveal reveal" style={{ color:'var(--ivory)' }} onClick={()=>go('category',{id:'dining-chairs'})}>Shop the Collection</button>
            </div>
          </div>
        </section>}

      {/* CATEGORY TILES */}
      <section style={{ padding:'var(--sp-9) 40px' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto' }}>
          <div className="reveal-up" style={{ textAlign:'center', marginBottom:'var(--sp-7)' }}>
            <SectionMark>Two Collections</SectionMark>
            <h2 className="t-h1" style={{ marginTop:18 }}>Where You Sit, Considered</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            {Object.values(CATEGORIES).map((c, i) =>
              <button key={c.id} className="reveal-up" onClick={()=>go('category',{id:c.id})}
                style={{ background:'none', border:'none', padding:0, cursor:'pointer', textAlign:'left', transitionDelay:`${i*0.08}s` }}>
                <div style={{ overflow:'hidden' }}>
                  <Placeholder zoom label={c.name.toUpperCase()} sub="category lifestyle · 3:2" tone={i?'stone':'sand'} style={{ aspectRatio:'3 / 2.1' }} />
                </div>
                <div style={{ marginTop:24, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                  <div>
                    <h3 className="t-h2">{c.name}</h3>
                    <p className="t-small" style={{ color:'var(--greige)', marginTop:8, maxWidth:340 }}>{c.tagline}</p>
                  </div>
                  <span className="link-reveal reveal">Shop</span>
                </div>
              </button>)}
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP STORY */}
      <section style={{ background:'var(--bone)', padding:'var(--sp-10) 40px' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--sp-8)', alignItems:'center' }}>
          <Placeholder className="reveal-up" label="JOINERY DETAIL — MORTISE & TENON" sub="materials · 4:5" tone="stone" style={{ aspectRatio:'4 / 5' }} />
          <div className="reveal-up" style={{ maxWidth:440 }}>
            <SectionMark>The Making</SectionMark>
            <h2 className="t-h1" style={{ margin:'20px 0 24px' }}>One Joint, Cut a Thousand Times</h2>
            <p className="t-body" style={{ color:'var(--charcoal-soft)' }}>Every chair begins as kiln-dried solid hardwood — no veneer, no particleboard. Frames are joined with mortise-and-tenon work, glued and pinned, then finished in a low-sheen penetrating oil that lets the grain stay honest.</p>
            <p className="t-body" style={{ color:'var(--charcoal-soft)', marginTop:18 }}>We sell direct, so the markup that usually sits between the workshop and your table simply isn't there.</p>
            <div style={{ marginTop:34 }}><button className="link-reveal reveal" onClick={()=>go('about')}>Read Our Craft</button></div>
          </div>
        </div>
      </section>

      {/* FEATURED ROW */}
      <section style={{ padding:'var(--sp-9) 40px' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto' }}>
          <div className="reveal-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--sp-6)' }}>
            <div>
              <SectionMark>Made to Order</SectionMark>
              <h2 className="t-h1" style={{ marginTop:16 }}>The Quiet Favorites</h2>
            </div>
            <button className="link-reveal reveal" onClick={()=>go('category',{id:'dining-chairs'})}>View All</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:28 }}>
            {featured.map((p,i) =>
              <div key={p.id} className="reveal-up" style={{ transitionDelay:`${i*0.06}s` }}>
                <ProductCard p={p} go={go} dealer={dealer} tone={['sand','bone','stone','sand'][i]} />
              </div>)}
          </div>
        </div>
      </section>

      {/* QUIET STATEMENT */}
      <section style={{ background:'var(--charcoal)', padding:'var(--sp-10) 40px', textAlign:'center' }}>
        <div className="reveal-up" style={{ maxWidth:720, margin:'0 auto' }}>
          <div className="eyebrow" style={{ color:'rgba(247,245,241,0.55)', marginBottom:28 }}>Sold Direct</div>
          <p className="t-h2" style={{ color:'var(--ivory)', lineHeight:1.5 }}>“We make a few things, in solid wood, and we make them properly. Then we sell them to you without the room full of middlemen.”</p>
        </div>
      </section>
    </div>
  );
}

/* ============================ CATEGORY ============================ */
function CategoryPage({ go, dealer, params }) {
  const ref = useReveal();
  const { PRODUCTS, CATEGORIES, WOOD, UPH } = window.OA;
  const cat = CATEGORIES[params.id] || CATEGORIES['dining-chairs'];
  const [wood, setWood] = useStateS('all');
  const [uph, setUph] = useStateS('all');
  const [cols, setCols] = useStateS(3);

  let list = PRODUCTS.filter(p => p.category === cat.id);
  if (wood !== 'all') list = list.filter(p => p.woods.includes(wood));
  if (uph !== 'all') list = list.filter(p => p.uph.includes(uph));

  return (
    <div ref={ref}>
      {/* hero */}
      <section style={{ position:'relative', height:'62vh', minHeight:420, marginTop:-78 }}>
        <Placeholder anchor="bottom" label={cat.name.toUpperCase() + ' — CATEGORY HERO'} sub="supplied photography" tone="deep" style={{ position:'absolute', inset:0 }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
          <div className="eyebrow" style={{ color:'rgba(247,245,241,0.7)', marginBottom:20 }}>{cat.id==='dining-chairs'?'Eight Chairs':'Seven Stools'}</div>
          <h1 className="t-display" style={{ color:'var(--ivory)' }}>{cat.name}</h1>
          <p className="t-body" style={{ color:'rgba(247,245,241,0.85)', maxWidth:420, marginTop:18 }}>{cat.tagline}</p>
        </div>
      </section>

      {/* filter bar */}
      <div style={{ position:'sticky', top:78, zIndex:20, background:'var(--ivory)', borderBottom:'1px solid var(--hair)' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'0 40px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:34, alignItems:'center' }}>
            <FilterSelect label="Wood Finish" value={wood} onChange={setWood} dict={WOOD} all="All Finishes" />
            <FilterSelect label="Upholstery" value={uph} onChange={setUph} dict={UPH} all="All Upholstery" />
          </div>
          <div style={{ display:'flex', gap:20, alignItems:'center' }}>
            <span className="mono" style={{ color:'var(--greige)' }}>{list.length} pieces</span>
            <div style={{ display:'flex', gap:10 }}>
              {[2,3].map(n =>
                <button key={n} onClick={()=>setCols(n)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, letterSpacing:'0.12em', color: cols===n?'var(--charcoal)':'var(--greige)', textDecoration: cols===n?'underline':'none', textUnderlineOffset:4 }}>{n} COL</button>)}
            </div>
          </div>
        </div>
      </div>

      {/* grid */}
      <section style={{ padding:'var(--sp-7) 40px var(--sp-10)' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto' }}>
          {list.length === 0
            ? <p className="t-body" style={{ textAlign:'center', color:'var(--greige)', padding:'80px 0' }}>No pieces match those finishes. <button className="link-reveal reveal" onClick={()=>{setWood('all');setUph('all');}}>Clear filters</button></p>
            : <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap: cols===2?40:30, rowGap:64 }}>
                {list.map((p,i) =>
                  <div key={p.id} className="reveal-up" style={{ transitionDelay:`${(i%cols)*0.05}s` }}>
                    <ProductCard p={p} go={go} dealer={dealer} tone={['sand','bone','stone'][i%3]} />
                  </div>)}
              </div>}
        </div>
      </section>
    </div>
  );
}
function FilterSelect({ label, value, onChange, dict, all }) {
  return (
    <label style={{ display:'flex', alignItems:'center', gap:12 }}>
      <span className="t-micro" style={{ color:'var(--greige)' }}>{label}</span>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{ border:'none', borderBottom:'1px solid var(--charcoal)', background:'none', padding:'4px 18px 4px 0', fontSize:11.5, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--charcoal)', cursor:'pointer', outline:'none', appearance:'none', WebkitAppearance:'none', backgroundImage:'linear-gradient(45deg,transparent 50%,var(--charcoal) 50%),linear-gradient(135deg,var(--charcoal) 50%,transparent 50%)', backgroundPosition:'right 6px center,right 2px center', backgroundSize:'4px 4px,4px 4px', backgroundRepeat:'no-repeat' }}>
        <option value="all">{all}</option>
        {Object.values(dict).map(o => <option key={o.label} value={Object.keys(dict).find(k=>dict[k]===o)}>{o.label}</option>)}
      </select>
    </label>
  );
}

/* ============================ PRODUCT ============================ */
function ProductPage({ go, dealer, params, addToCart }) {
  const ref = useReveal();
  const { PRODUCTS, WOOD, UPH, fmt, priceFor } = window.OA;
  const p = PRODUCTS.find(x => x.id === params.id) || PRODUCTS[0];
  const [wood, setWood] = useStateS(p.woods[0]);
  const [uph, setUph] = useStateS(p.uph[0] || null);
  const [qty, setQty] = useStateS(1);
  const [active, setActive] = useStateS(0);
  const [added, setAdded] = useStateS(false);
  useEffectS(() => { setWood(p.woods[0]); setUph(p.uph[0]||null); setQty(1); setActive(0); window.scrollTo(0,0); }, [p.id]);

  const gallery = ['FRONT THREE-QUARTER','PROFILE','SEAT & JOINERY DETAIL','IN SITU — DINING ROOM'];
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,3);

  const doAdd = () => {
    addToCart({ id:p.id, name:p.name, sku:p.sku, price:p.price, wood, uph, qty });
    setAdded(true); setTimeout(()=>setAdded(false), 1800);
  };

  return (
    <div ref={ref}>
      <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'40px 40px 0' }}>
        <div className="mono" style={{ color:'var(--greige)', marginBottom:36 }}>
          <span style={{cursor:'pointer'}} onClick={()=>go('home')}>HOME</span> / <span style={{cursor:'pointer'}} onClick={()=>go('category',{id:p.category})}>{p.category.replace('-',' ').toUpperCase()}</span> / {p.name.toUpperCase()}
        </div>
      </div>

      <section style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'80px 1fr 1fr', gap:40, alignItems:'start' }}>
        {/* thumbnails */}
        <div style={{ position:'sticky', top:110, display:'flex', flexDirection:'column', gap:14 }}>
          {gallery.map((g,i) =>
            <button key={i} onClick={()=>setActive(i)} style={{ padding:0, border: active===i?'1px solid var(--charcoal)':'1px solid var(--hair)', background:'none', cursor:'pointer', aspectRatio:'4/5' }}>
              <Placeholder label={String(i+1)} tone={active===i?'stone':'bone'} style={{ width:'100%', height:'100%' }} />
            </button>)}
        </div>
        {/* main image */}
        <div style={{ position:'sticky', top:110 }}>
          <Placeholder label={p.name.toUpperCase()} sub={gallery[active]} tone="sand" style={{ aspectRatio:'4/5', width:'100%' }} />
        </div>
        {/* info */}
        <div style={{ paddingTop:10, maxWidth:460 }}>
          <SectionMark>{p.category === 'dining-chairs' ? 'Dining Chair' : 'Counter Stool'}</SectionMark>
          <h1 className="t-h1" style={{ margin:'16px 0 18px' }}>{p.name}</h1>
          <div style={{ marginBottom:22 }}><PriceTag product={p} dealer={dealer} size="lg" /></div>
          <p className="t-body" style={{ color:'var(--charcoal-soft)', marginBottom:38 }}>{p.blurb}</p>

          <Swatches label="Wood Finish" options={p.woods} dict={WOOD} value={wood} onChange={setWood} />
          {p.uph.length>0 && <Swatches label="Upholstery" options={p.uph} dict={UPH} value={uph} onChange={setUph} />}

          {/* qty + add */}
          <div style={{ display:'flex', gap:14, margin:'34px 0 14px' }}>
            <div style={{ display:'flex', alignItems:'center', border:'1px solid var(--charcoal)' }}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={qtyBtn}>–</button>
              <span style={{ width:46, textAlign:'center', fontSize:13 }}>{qty}</span>
              <button onClick={()=>setQty(q=>q+1)} style={qtyBtn}>+</button>
            </div>
            <button className="btn btn-solid btn-block" onClick={doAdd} style={{ flex:1 }}>{added ? 'Added ✓' : 'Add to Cart'}</button>
          </div>
          <p className="t-small" style={{ color:'var(--greige)', marginBottom:36 }}>Made to order · Ships in 6–8 weeks · {p.sku}</p>

          <Accordion items={[
            { title:'Dimensions', body:<DimBody p={p} /> },
            { title:'Materials & Construction', body:p.materials },
            { title:'Shipping & Returns', body:p.shipping },
            { title:'Care', body:p.care },
          ]} />
        </div>
      </section>

      {/* complete the set */}
      <section style={{ padding:'var(--sp-10) 40px var(--sp-9)' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto' }}>
          <div className="reveal-up" style={{ textAlign:'center', marginBottom:'var(--sp-6)' }}>
            <SectionMark>Complete the Set</SectionMark>
            <h2 className="t-h2" style={{ marginTop:14 }}>Pairs Well With</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:30 }}>
            {related.map((r,i) =>
              <div key={r.id} className="reveal-up" style={{ transitionDelay:`${i*0.06}s` }}>
                <ProductCard p={r} go={go} dealer={dealer} tone={['sand','bone','stone'][i]} />
              </div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
const qtyBtn = { width:42, height:46, border:'none', background:'none', cursor:'pointer', fontSize:16, color:'var(--charcoal)' };
function DimBody({ p }) {
  const row = { display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid var(--hair-soft)' };
  return (
    <div style={{ maxWidth:320 }}>
      <div style={row}><span>Overall width</span><span>{p.dims.width}"</span></div>
      <div style={row}><span>Overall depth</span><span>{p.dims.depth}"</span></div>
      <div style={row}><span>Overall height</span><span>{p.dims.height}"</span></div>
      <div style={row}><span>Seat height</span><span>{p.seat}"</span></div>
      <div style={{...row, borderBottom:'none'}}><span>Weight</span><span>{p.weight} lb</span></div>
    </div>
  );
}

Object.assign(window, { HomePage, CategoryPage, ProductPage, ProductCard, PriceTag });
