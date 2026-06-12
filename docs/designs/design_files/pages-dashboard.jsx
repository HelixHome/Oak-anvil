// pages-dashboard.jsx — Dealer dashboard + order pad
const { useState: useStateD, useMemo: useMemoD } = React;

function DealerDashboard({ go, dealer, logout, addToCart, openCart }) {
  const { PRODUCTS, TIERS, priceFor, fmt } = window.OA;
  const tier = TIERS[dealer.tier];
  const [qty, setQty] = useStateD({});
  const [tab, setTab] = useStateD('orderpad');
  const [search, setSearch] = useStateD('');

  const lineTotal = useMemoD(() => {
    return PRODUCTS.reduce((sum, p) => sum + (qty[p.id]||0) * priceFor(p, dealer.tier), 0);
  }, [qty, dealer.tier]);
  const unitCount = Object.values(qty).reduce((a,b)=>a+(b||0),0);

  const setQ = (id, v) => setQty(s => ({ ...s, [id]: Math.max(0, v) }));
  const addAll = () => {
    PRODUCTS.forEach(p => { if (qty[p.id]>0) addToCart({ id:p.id, name:p.name, sku:p.sku, price:p.price, wood:p.woods[0], uph:p.uph[0]||null, qty:qty[p.id] }); });
    setQty({}); openCart();
  };

  const stock = (i) => i % 7 === 0 ? { t:'Backorder', c:'var(--taupe)' } : i % 5 === 0 ? { t:'Low Stock', c:'var(--charcoal-soft)' } : { t:'In Stock', c:'var(--greige)' };

  const history = [
    { no:'SO-4821', date:'May 28, 2026', items:24, total:8640, status:'Delivered', track:'1Z·994·8821' },
    { no:'SO-4760', date:'Apr 14, 2026', items:12, total:4260, status:'In Transit', track:'1Z·994·7710' },
    { no:'SO-4699', date:'Mar 02, 2026', items:36, total:12180, status:'Delivered', track:'1Z·994·6655' },
  ];
  const resources = [
    { t:'Full Catalog (PDF)', s:'2026 · 18 MB' },
    { t:'Dimension Drawings', s:'All 15 SKUs · DWG/PDF' },
    { t:'High-Res Image Library', s:'Silhouette + lifestyle · ZIP' },
    { t:'Spec Sheets', s:'Materials & finish specs' },
    { t:'Finish & Fabric Samples', s:'Order physical swatches' },
    { t:'Marketing Assets', s:'Logos, copy, social kit' },
  ];

  return (
    <div style={{ background:'var(--bone)', minHeight:'calc(100vh - 78px)' }}>
      {/* welcome header */}
      <section style={{ background:'var(--charcoal)', color:'var(--ivory)', padding:'56px 40px 50px' }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24 }}>
          <div>
            <div className="eyebrow" style={{ color:'rgba(247,245,241,0.6)', marginBottom:18 }}>Trade Dashboard</div>
            <h1 className="t-h1" style={{ color:'var(--ivory)' }}>Welcome, Design House Studio</h1>
            <p className="t-body" style={{ color:'rgba(247,245,241,0.7)', marginTop:12 }}>Account #DH-2026-114 · Net-30 terms</p>
          </div>
          <div style={{ textAlign:'right', border:'1px solid rgba(247,245,241,0.2)', padding:'18px 26px' }}>
            <div className="t-micro" style={{ color:'rgba(247,245,241,0.6)', marginBottom:8 }}>Your Tier</div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:24, letterSpacing:'0.06em' }}>{tier.label}</div>
            <div className="mono" style={{ color:'var(--taupe)', marginTop:6 }}>{Math.round(tier.off*100)}% OFF RETAIL</div>
          </div>
        </div>
      </section>

      {/* tabs */}
      <div style={{ background:'var(--ivory)', borderBottom:'1px solid var(--hair)', position:'sticky', top:78, zIndex:20 }}>
        <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'0 40px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:0 }}>
            {[['orderpad','Order Pad'],['history','Order History'],['resources','Resources']].map(([id,label]) =>
              <button key={id} onClick={()=>setTab(id)} style={{ background:'none', border:'none', borderBottom: tab===id?'2px solid var(--charcoal)':'2px solid transparent', padding:'22px 24px', cursor:'pointer', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color: tab===id?'var(--charcoal)':'var(--greige)', marginBottom:-1 }}>{label}</button>)}
          </div>
          <button className="link-reveal reveal" onClick={()=>{logout(); go('home');}}>Sign Out</button>
        </div>
      </div>

      <section style={{ maxWidth:'var(--maxw)', margin:'0 auto', padding:'48px 40px 120px' }}>
        {tab === 'orderpad' && <>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:26, gap:24, flexWrap:'wrap' }}>
            <div>
              <h2 className="t-h2">Order Pad</h2>
              <p className="t-small" style={{ color:'var(--greige)', marginTop:6 }}>All 15 pieces at your {tier.label} pricing. Enter quantities and add the lot to your order.</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid var(--charcoal)', padding:'8px 2px', minWidth:280 }}>
              <SearchIcon stroke="var(--charcoal)" size={15} />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or SKU"
                style={{ flex:1, border:'none', background:'none', outline:'none', fontSize:13, letterSpacing:'0.02em', color:'var(--charcoal)' }} />
              {search && <button onClick={()=>setSearch('')} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--greige)', fontSize:13 }}>✕</button>}
            </div>
          </div>

          <div style={{ background:'var(--ivory)', border:'1px solid var(--hair)' }}>
            {/* head row */}
            <div style={padRow(true)}>
              <span></span>
              <span className="t-micro" style={{ color:'var(--greige)' }}>Piece</span>
              <span className="t-micro" style={{ color:'var(--greige)' }}>SKU</span>
              <span className="t-micro" style={{ color:'var(--greige)', textAlign:'right' }}>Retail</span>
              <span className="t-micro" style={{ color:'var(--greige)', textAlign:'right' }}>Your Price</span>
              <span className="t-micro" style={{ color:'var(--greige)' }}>Stock</span>
              <span className="t-micro" style={{ color:'var(--greige)', textAlign:'center' }}>Qty</span>
              <span className="t-micro" style={{ color:'var(--greige)', textAlign:'right' }}>Line</span>
            </div>
            {PRODUCTS.filter(p => (p.name + ' ' + p.sku).toLowerCase().includes(search.trim().toLowerCase())).map((p) => {
              const i = PRODUCTS.indexOf(p);
              const yp = priceFor(p, dealer.tier);
              const st = stock(i);
              const q = qty[p.id]||0;
              return (
                <div key={p.id} style={padRow(false)}>
                  <button onClick={()=>go('product',{id:p.id})} style={{ padding:0, border:'none', background:'none', cursor:'pointer' }}>
                    <Placeholder label="" tone="bone" style={{ width:46, height:54 }} />
                  </button>
                  <span style={{ fontSize:13, letterSpacing:'0.04em', cursor:'pointer' }} onClick={()=>go('product',{id:p.id})}>{p.name}</span>
                  <span className="mono" style={{ color:'var(--greige)' }}>{p.sku}</span>
                  <span style={{ textAlign:'right', fontSize:12.5, color:'var(--greige)', textDecoration:'line-through' }}>{fmt(p.price)}</span>
                  <span style={{ textAlign:'right', fontSize:13.5, color:'var(--charcoal)' }}>{fmt(yp)}</span>
                  <span style={{ fontSize:10.5, letterSpacing:'0.14em', textTransform:'uppercase', color: st.c }}>{st.t}</span>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid var(--hair)' }}>
                    <button onClick={()=>setQ(p.id,q-1)} style={padQ}>–</button>
                    <input value={q} onChange={e=>setQ(p.id, parseInt(e.target.value)||0)} style={{ width:30, textAlign:'center', border:'none', background:'none', fontSize:13, outline:'none', color:'var(--charcoal)' }} />
                    <button onClick={()=>setQ(p.id,q+1)} style={padQ}>+</button>
                  </div>
                  <span style={{ textAlign:'right', fontSize:13, color: q>0?'var(--charcoal)':'var(--stone)' }}>{q>0?fmt(q*yp):'—'}</span>
                </div>
              );
            })}
            {PRODUCTS.filter(p => (p.name + ' ' + p.sku).toLowerCase().includes(search.trim().toLowerCase())).length === 0 &&
              <div style={{ padding:'44px 32px', textAlign:'center' }}>
                <span className="t-small" style={{ color:'var(--greige)' }}>No pieces match “{search}”. </span>
                <button className="link-reveal reveal" onClick={()=>setSearch('')} style={{ marginLeft:8 }}>Clear</button>
              </div>}
          </div>

          {/* order pad footer */}
          <div style={{ position:'sticky', bottom:0, marginTop:0, background:'var(--charcoal)', color:'var(--ivory)', padding:'22px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
            <div style={{ display:'flex', gap:40, alignItems:'baseline' }}>
              <span className="t-micro" style={{ color:'rgba(247,245,241,0.6)' }}>{unitCount} units selected</span>
              <span style={{ fontFamily:'var(--font-head)', fontSize:22 }}>{fmt(lineTotal)}</span>
              <span className="mono" style={{ color:'var(--taupe)' }}>Saves {fmt(PRODUCTS.reduce((s,p)=>s+(qty[p.id]||0)*(p.price-priceFor(p,dealer.tier)),0))} vs retail</span>
            </div>
            <button className="btn btn-light" disabled={unitCount===0} onClick={addAll} style={{ opacity: unitCount===0?0.4:1 }}>Add All to Order</button>
          </div>
        </>}

        {tab === 'history' && <>
          <h2 className="t-h2" style={{ marginBottom:10 }}>Order History</h2>
          <p className="t-small" style={{ color:'var(--greige)', marginBottom:30 }}>Reorder any past order in one tap.</p>
          <div style={{ background:'var(--ivory)', border:'1px solid var(--hair)' }}>
            {history.map((o,i) =>
              <div key={o.no} style={{ display:'grid', gridTemplateColumns:'1.2fr 1.2fr 1fr 1fr 1.2fr auto', alignItems:'center', gap:20, padding:'22px 28px', borderBottom: i<history.length-1?'1px solid var(--hair)':'none' }}>
                <div><span className="mono" style={{ color:'var(--charcoal)' }}>{o.no}</span><div className="t-small" style={{ color:'var(--greige)', marginTop:4 }}>{o.date}</div></div>
                <span className="t-small">{o.items} units</span>
                <span style={{ fontSize:14 }}>{fmt(o.total)}</span>
                <span style={{ fontSize:10.5, letterSpacing:'0.16em', textTransform:'uppercase', color: o.status==='Delivered'?'var(--greige)':'var(--taupe)' }}>{o.status}</span>
                <span className="mono" style={{ color:'var(--greige)' }}>{o.track}</span>
                <button className="link-reveal reveal">Reorder</button>
              </div>)}
          </div>
        </>}

        {tab === 'resources' && <>
          <h2 className="t-h2" style={{ marginBottom:10 }}>Resources</h2>
          <p className="t-small" style={{ color:'var(--greige)', marginBottom:30 }}>Spec sheets, drawings, and assets for specifying Oak &amp; Anvil.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {resources.map(r =>
              <button key={r.t} style={{ textAlign:'left', background:'var(--ivory)', border:'1px solid var(--hair)', padding:'30px 28px', cursor:'pointer', display:'flex', flexDirection:'column', gap:10, minHeight:150, justifyContent:'space-between' }}>
                <div>
                  <h3 style={{ fontSize:15, letterSpacing:'0.04em', marginBottom:8 }}>{r.t}</h3>
                  <span className="mono" style={{ color:'var(--greige)' }}>{r.s}</span>
                </div>
                <span className="link-reveal reveal">Download ↓</span>
              </button>)}
          </div>
        </>}
      </section>
    </div>
  );
}
function padRow(head) {
  return { display:'grid', gridTemplateColumns:'46px 1.6fr 1fr 0.8fr 0.9fr 0.9fr 110px 0.9fr', alignItems:'center', gap:18, padding: head?'16px 32px':'14px 32px', borderBottom:'1px solid var(--hair)', background: head?'var(--bone)':'transparent' };
}
const padQ = { width:26, height:34, border:'none', background:'none', cursor:'pointer', fontSize:15, color:'var(--charcoal)' };

Object.assign(window, { DealerDashboard });
