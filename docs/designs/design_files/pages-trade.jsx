// pages-trade.jsx — About, Contact, Dealer login/apply/dashboard
const { useState: useStateT, useEffect: useEffectT } = React;

/* ============================ ABOUT / CRAFT ============================ */
function AboutPage({ go }) {
  const ref = useReveal();
  const blocks = [
    { mark:'01 — Sourcing', title:'Wood We Can Stand Behind', body:'We buy kiln-dried solid hardwood from mills that replant what they take. Oak, ash, walnut — no veneer over fiberboard, no shortcuts hidden inside the frame. The wood you see is the wood that holds you up.', img:'TIMBER YARD — STACKED HARDWOOD', tone:'stone' },
    { mark:'02 — Joinery', title:'Mortise, Tenon, Time', body:'Each frame is joined the slow way: a tenon cut to fit a mortise, glued, pinned, and clamped overnight. It is the joint that has held chairs together for four hundred years, and it is the reason ours will outlast their first owners.', img:'WORKSHOP — HAND-CUT JOINERY', tone:'sand' },
    { mark:'03 — Finishing', title:'Oil, Not Lacquer', body:'We finish in a low-sheen penetrating oil rubbed in by hand. It sinks into the grain rather than sitting on top of it, so the wood keeps its depth and can be renewed at home with a cloth and an afternoon.', img:'FINISHING — HAND-RUBBED OIL', tone:'bone' },
    { mark:'04 — Direct', title:'No Room Full of Middlemen', body:'We sell straight from the workshop to your table. The markup that usually stacks up across importers, showrooms, and floor staff simply is not in the price. That is the whole model: make a few things well, sell them honestly.', img:'DELIVERY — CRATED & READY', tone:'stone' },
  ];
  return (
    <div ref={ref}>
      <section style={{ position:'relative', height:'78vh', minHeight:520, marginTop:-78 }}>
        <Placeholder anchor="bottom" label="FULL-BLEED — WORKSHOP FLOOR" sub="about hero" tone="deep" style={{ position:'absolute', inset:0 }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
          <div className="eyebrow" style={{ color:'rgba(247,245,241,0.7)', marginBottom:22 }}>Craftsmanship</div>
          <h1 className="t-display" style={{ color:'var(--ivory)', maxWidth:840 }}>How a Chair Earns Its Keep</h1>
        </div>
      </section>

      <section style={{ padding:'var(--sp-10) 40px', textAlign:'center' }}>
        <p className="reveal-up t-h2" style={{ maxWidth:760, margin:'0 auto', lineHeight:1.5, color:'var(--charcoal-soft)' }}>We started in 2002 with a single bench and a stubborn idea: that good seating should be solid wood, joined properly, and priced like the workshop sold it to you directly. It does, because we do.</p>
      </section>

      {blocks.map((b,i) =>
        <section key={i} style={{ background: i%2 ? 'var(--bone)':'var(--ivory)', padding:'var(--sp-9) 40px' }}>
          <div style={{ maxWidth:'var(--maxw)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--sp-8)', alignItems:'center', direction: i%2?'rtl':'ltr' }}>
            <Placeholder className="reveal-up" label={b.img} sub="materials · 4:5" tone={b.tone} style={{ aspectRatio:'4/5', direction:'ltr' }} />
            <div className="reveal-up" style={{ maxWidth:440, direction:'ltr', justifySelf: i%2?'end':'start' }}>
              <SectionMark>{b.mark}</SectionMark>
              <h2 className="t-h1" style={{ margin:'18px 0 22px' }}>{b.title}</h2>
              <p className="t-body" style={{ color:'var(--charcoal-soft)' }}>{b.body}</p>
            </div>
          </div>
        </section>)}

      <section style={{ background:'var(--charcoal)', padding:'var(--sp-10) 40px', textAlign:'center' }}>
        <div className="reveal-up" style={{ maxWidth:560, margin:'0 auto' }}>
          <h2 className="t-h1" style={{ color:'var(--ivory)', marginBottom:34 }}>See the Collection</h2>
          <button className="btn btn-light" onClick={()=>go('category',{id:'dining-chairs'})}>Shop Dining Chairs</button>
        </div>
      </section>
    </div>
  );
}

/* ============================ CONTACT ============================ */
function ContactPage() {
  const [sent, setSent] = useStateT(false);
  const field = { display:'flex', flexDirection:'column', gap:9, marginBottom:26 };
  const input = { border:'none', borderBottom:'1px solid var(--hair)', background:'none', padding:'10px 0', fontSize:14, color:'var(--charcoal)', outline:'none' };
  const lbl = { fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.24em', color:'var(--greige)' };
  return (
    <section style={{ minHeight:'calc(100vh - 78px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'120px 40px' }}>
      <div style={{ width:'100%', maxWidth:520, textAlign:'center' }}>
        <SectionMark>We're Listening</SectionMark>
        <h1 className="t-h1" style={{ margin:'16px 0 16px' }}>Contact</h1>
        <p className="t-body" style={{ color:'var(--charcoal-soft)', maxWidth:400, margin:'0 auto 52px' }}>Questions on finishes, lead times, or a larger order? Write to us. We answer within two business days.</p>
        {sent
          ? <p className="t-body" style={{ color:'var(--taupe)', padding:'40px 0' }}>Thank you. Your note is on its way — we'll reply shortly.</p>
          : <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} style={{ textAlign:'left' }}>
              <div style={field}><span style={lbl}>Name</span><input style={input} required /></div>
              <div style={field}><span style={lbl}>Email</span><input type="email" style={input} required /></div>
              <div style={field}><span style={lbl}>Subject</span><input style={input} /></div>
              <div style={field}><span style={lbl}>Message</span><textarea rows={4} style={{...input, resize:'vertical'}} required /></div>
              <button className="btn btn-solid btn-block" type="submit" style={{ marginTop:14 }}>Send Message</button>
            </form>}
      </div>
    </section>
  );
}

/* ============================ DEALER LOGIN ============================ */
function DealerLogin({ go, login }) {
  const [tier, setTier] = useStateT('designer');
  const input = { width:'100%', border:'1px solid var(--hair)', background:'var(--ivory)', padding:'14px 16px', fontSize:13.5, color:'var(--charcoal)', outline:'none', marginBottom:14 };
  return (
    <section style={{ minHeight:'calc(100vh - 78px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 40px', background:'var(--bone)' }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:44 }}><Logo size={1.05} /></div>
        <div style={{ background:'var(--ivory)', border:'1px solid var(--hair)', padding:'48px 44px' }}>
          <div style={{ textAlign:'center', marginBottom:34 }}>
            <SectionMark>Trade Portal</SectionMark>
            <h1 className="t-h2" style={{ marginTop:14 }}>Dealer Sign In</h1>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); login(tier); go('trade-dashboard');}}>
            <input style={input} type="email" placeholder="Email address" defaultValue="studio@designhouse.com" required />
            <input style={input} type="password" placeholder="Password" defaultValue="••••••••" required />
            <div style={{ margin:'22px 0 26px' }}>
              <div className="t-micro" style={{ color:'var(--greige)', marginBottom:12 }}>Demo · sign in as</div>
              <div style={{ display:'flex', gap:8 }}>
                {Object.values(window.OA.TIERS).filter(t=>t.id!=='retail').map(t =>
                  <button type="button" key={t.id} onClick={()=>setTier(t.id)}
                    style={{ flex:1, padding:'10px 6px', cursor:'pointer', fontSize:9.5, letterSpacing:'0.12em', textTransform:'uppercase', border:'1px solid', borderColor: tier===t.id?'var(--charcoal)':'var(--hair)', background: tier===t.id?'var(--charcoal)':'transparent', color: tier===t.id?'var(--ivory)':'var(--greige)', transition:'all .25s' }}>
                    {t.label.split(' ')[0]}<br/><span style={{opacity:0.7}}>{Math.round(t.off*100)}%</span>
                  </button>)}
              </div>
            </div>
            <button className="btn btn-solid btn-block" type="submit">Sign In</button>
          </form>
          <div style={{ textAlign:'center', marginTop:26, display:'flex', flexDirection:'column', gap:14 }}>
            <span className="link-reveal reveal" style={{ alignSelf:'center' }}>Forgot password</span>
            <div style={{ borderTop:'1px solid var(--hair-soft)', paddingTop:20 }}>
              <span className="t-small" style={{ color:'var(--greige)' }}>Not a dealer yet? </span>
              <button className="link-reveal reveal" onClick={()=>go('trade-apply')}>Apply for a Trade Account</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ DEALER APPLICATION ============================ */
function DealerApply({ go }) {
  const [sent, setSent] = useStateT(false);
  const [vol, setVol] = useStateT('');
  const [showroom, setShowroom] = useStateT('yes');
  const field = { display:'flex', flexDirection:'column', gap:8 };
  const lbl = { fontSize:10, textTransform:'uppercase', letterSpacing:'0.22em', color:'var(--greige)' };
  const input = { border:'1px solid var(--hair)', background:'var(--ivory)', padding:'12px 14px', fontSize:13.5, color:'var(--charcoal)', outline:'none' };
  return (
    <section style={{ minHeight:'calc(100vh - 78px)', padding:'90px 40px var(--sp-9)', background:'var(--bone)' }}>
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <SectionMark>Trade Program</SectionMark>
          <h1 className="t-h1" style={{ margin:'16px 0 16px' }}>Apply for a Trade Account</h1>
          <p className="t-body" style={{ color:'var(--charcoal-soft)', maxWidth:460, margin:'0 auto' }}>For designers, decorators, and stocking dealers. Tell us about your business — approval takes two to three business days.</p>
        </div>
        {sent
          ? <div style={{ background:'var(--ivory)', border:'1px solid var(--hair)', padding:'56px 44px', textAlign:'center' }}>
              <h2 className="t-h2" style={{ marginBottom:16 }}>Application Received</h2>
              <p className="t-body" style={{ color:'var(--charcoal-soft)', maxWidth:380, margin:'0 auto 32px' }}>We'll review your details and email your account credentials and tier assignment shortly.</p>
              <button className="btn" onClick={()=>go('trade-login')}>Back to Sign In</button>
            </div>
          : <form onSubmit={(e)=>{e.preventDefault(); setSent(true); window.scrollTo(0,0);}} style={{ background:'var(--ivory)', border:'1px solid var(--hair)', padding:'44px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              <div style={{...field, gridColumn:'1 / -1'}}><span style={lbl}>Business Name</span><input style={input} required /></div>
              <div style={field}><span style={lbl}>Contact Name</span><input style={input} required /></div>
              <div style={field}><span style={lbl}>Email</span><input type="email" style={input} required /></div>
              <div style={field}><span style={lbl}>Resale Certificate #</span><input style={input} required /></div>
              <div style={field}><span style={lbl}>Phone</span><input style={input} /></div>
              <div style={{...field, gridColumn:'1 / -1'}}><span style={lbl}>Business Address</span><input style={input} required /></div>
              <div style={field}>
                <span style={lbl}>Expected Annual Volume</span>
                <select value={vol} onChange={e=>setVol(e.target.value)} style={{...input, cursor:'pointer'}} required>
                  <option value="" disabled>Select…</option>
                  <option>Under $10,000</option><option>$10,000 – $50,000</option>
                  <option>$50,000 – $150,000</option><option>$150,000+</option>
                </select>
              </div>
              <div style={field}>
                <span style={lbl}>Do you operate a showroom?</span>
                <div style={{ display:'flex', gap:10, marginTop:2 }}>
                  {['yes','no'].map(o =>
                    <button type="button" key={o} onClick={()=>setShowroom(o)} style={{ flex:1, padding:'12px', cursor:'pointer', fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', border:'1px solid', borderColor: showroom===o?'var(--charcoal)':'var(--hair)', background: showroom===o?'var(--charcoal)':'transparent', color: showroom===o?'var(--ivory)':'var(--greige)' }}>{o}</button>)}
                </div>
              </div>
              <button className="btn btn-solid" type="submit" style={{ gridColumn:'1 / -1', marginTop:8 }}>Submit Application</button>
            </form>}
      </div>
    </section>
  );
}

Object.assign(window, { AboutPage, ContactPage, DealerLogin, DealerApply });
