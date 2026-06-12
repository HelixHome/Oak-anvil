// app.jsx — shell: router, cart, dealer state, tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headFont": "Bodoni Moda",
  "heroLayout": "centered"
}/*EDITMODE-END*/;

const HERO_LABELS = { centered: 'Full-bleed · centered', split: 'Split editorial', lowerleft: 'Caption lower-left' };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStateA({ name: 'home', params: {} });
  const [cart, setCart] = useStateA([]);
  const [cartOpen, setCartOpen] = useStateA(false);
  const [searchOpen, setSearchOpen] = useStateA(false);
  const [dealer, setDealer] = useStateA({ loggedIn: false, tier: 'designer' });

  const go = (name, params = {}) => { setView({ name, params }); setCartOpen(false); setSearchOpen(false); window.scrollTo(0, 0); };
  const openCart = () => setCartOpen(true);
  const openSearch = () => setSearchOpen(true);

  const addToCart = (item) => {
    setCart(prev => {
      const key = item.id + '|' + item.wood + '|' + item.uph;
      const ex = prev.find(l => l.key === key);
      if (ex) return prev.map(l => l.key === key ? { ...l, qty: l.qty + item.qty } : l);
      return [...prev, { ...item, key }];
    });
    setCartOpen(true);
  };
  const setLineQty = (key, q) => setCart(prev => q <= 0 ? prev.filter(l => l.key !== key) : prev.map(l => l.key === key ? { ...l, qty: q } : l));

  const login = (tier) => setDealer({ loggedIn: true, tier });
  const logout = () => setDealer({ loggedIn: false, tier: 'designer' });

  const cartCount = cart.reduce((a, l) => a + l.qty, 0);
  // dark full-bleed hero at top → transparent light nav; otherwise solid dark nav.
  const homeDarkHero = view.name === 'home' && (t.heroLayout === 'centered' || t.heroLayout === 'lowerleft');
  const darkHero = view.name === 'category' || view.name === 'about' || homeDarkHero;
  const solidAlways = !darkHero;
  const hideFooter = view.name === 'trade-dashboard';

  const page = (() => {
    switch (view.name) {
      case 'home': return <HomePage go={go} dealer={dealer} t={t} />;
      case 'category': return <CategoryPage go={go} dealer={dealer} params={view.params} />;
      case 'product': return <ProductPage go={go} dealer={dealer} params={view.params} addToCart={addToCart} />;
      case 'about': return <AboutPage go={go} />;
      case 'contact': return <ContactPage />;
      case 'trade-login': return <DealerLogin go={go} login={login} />;
      case 'trade-apply': return <DealerApply go={go} />;
      case 'trade-dashboard': return dealer.loggedIn
        ? <DealerDashboard go={go} dealer={dealer} logout={logout} addToCart={addToCart} openCart={openCart} />
        : <DealerLogin go={go} login={login} />;
      default: return <HomePage go={go} dealer={dealer} t={t} />;
    }
  })();

  return (
    <div data-head={t.headFont} style={{ '--font-head': fontStack(t.headFont) }}>
      <Nav go={go} view={view.name} cartCount={cartCount} openCart={openCart} openSearch={openSearch} dealer={dealer} solidAlways={solidAlways} />
      <main>{page}</main>
      {!hideFooter && <Footer go={go} />}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setLineQty={setLineQty} dealer={dealer} go={go} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} go={go} dealer={dealer} />

      <TweaksPanel>
        <TweakSection label="Typography" />
        <TweakRadio label="Headings" value={t.headFont}
          options={['Bodoni Moda', 'Libre Baskerville', 'Jost']}
          onChange={(v) => setTweak('headFont', v)} />
        <div style={{ padding: '2px 2px 10px', fontSize: 10.5, color: '#8A8276', lineHeight: 1.5 }}>
          Didone · Baskerville · Geometric caps
        </div>
        <TweakSection label="Home Hero" />
        <TweakRadio label="Layout" value={t.heroLayout}
          options={['centered', 'split', 'lowerleft']}
          onChange={(v) => setTweak('heroLayout', v)} />
        <div style={{ padding: '2px 2px 4px', fontSize: 10.5, color: '#8A8276', lineHeight: 1.5 }}>
          {HERO_LABELS[t.heroLayout]} — visit Home to preview
        </div>
      </TweaksPanel>
    </div>
  );
}

function fontStack(f) {
  if (f === 'Libre Baskerville') return "'Libre Baskerville', serif";
  if (f === 'Jost') return "'Jost', sans-serif";
  return "'Bodoni Moda', serif";
}

/* ---------- cart drawer ---------- */
function CartDrawer({ open, onClose, cart, setLineQty, dealer, go }) {
  const { WOOD, UPH, priceFor, fmt, TIERS } = window.OA;
  const eff = (l) => priceFor(l, dealer.tier);
  const subtotal = cart.reduce((a, l) => a + eff(l) * l.qty, 0);
  const retailSub = cart.reduce((a, l) => a + l.price * l.qty, 0);

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(20,19,17,0.42)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity .45s ease',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: 'min(440px, 92vw)', zIndex: 91,
        background: 'var(--ivory)', boxShadow: '-1px 0 0 var(--hair)',
        transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .5s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 30px', borderBottom: '1px solid var(--hair)' }}>
          <span className="t-micro">Your Cart ({cart.reduce((a,l)=>a+l.qty,0)})</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--charcoal)' }}>✕</button>
        </div>

        {cart.length === 0
          ? <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: 40 }}>
              <p className="t-body" style={{ color: 'var(--greige)' }}>Your cart is empty.</p>
              <button className="btn" onClick={() => { onClose(); go('category', { id: 'dining-chairs' }); }}>Shop the Collection</button>
            </div>
          : <>
            <div className="no-bar" style={{ flex: 1, overflowY: 'auto', padding: '8px 30px' }}>
              {cart.map(l => (
                <div key={l.key} style={{ display: 'grid', gridTemplateColumns: '74px 1fr', gap: 18, padding: '24px 0', borderBottom: '1px solid var(--hair-soft)' }}>
                  <Placeholder label="" tone="bone" style={{ width: 74, height: 92 }} />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                      <span style={{ fontSize: 13.5, letterSpacing: '0.04em' }}>{l.name}</span>
                      <span style={{ fontSize: 13 }}>{fmt(eff(l) * l.qty)}</span>
                    </div>
                    <div className="t-small" style={{ color: 'var(--greige)', marginTop: 5 }}>
                      {WOOD[l.wood].label}{l.uph ? ' · ' + UPH[l.uph].label : ''}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--hair)' }}>
                        <button onClick={() => setLineQty(l.key, l.qty - 1)} style={cd}>–</button>
                        <span style={{ width: 30, textAlign: 'center', fontSize: 12.5 }}>{l.qty}</span>
                        <button onClick={() => setLineQty(l.key, l.qty + 1)} style={cd}>+</button>
                      </div>
                      <button onClick={() => setLineQty(l.key, 0)} className="link-reveal reveal" style={{ fontSize: 10 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--hair)', padding: '26px 30px 30px' }}>
              {dealer.loggedIn &&
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="t-small" style={{ color: 'var(--greige)' }}>Retail</span>
                  <span className="t-small" style={{ color: 'var(--greige)', textDecoration: 'line-through' }}>{fmt(retailSub)}</span>
                </div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span className="t-micro">{dealer.loggedIn ? TIERS[dealer.tier].label + ' Subtotal' : 'Subtotal'}</span>
                <span style={{ fontSize: 18, fontFamily: 'var(--font-head)' }}>{fmt(subtotal)}</span>
              </div>
              <p className="t-small" style={{ color: 'var(--greige)', marginBottom: 20 }}>Shipping &amp; taxes calculated at checkout.</p>
              <button className="btn btn-solid btn-block">Checkout</button>
              <p className="mono" style={{ color: 'var(--greige)', textAlign: 'center', marginTop: 16, fontSize: 9 }}>Secure checkout via Shopify</p>
            </div>
          </>}
      </aside>
    </>
  );
}
const cd = { width: 28, height: 34, border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--charcoal)' };

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
