import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import CartDrawer from '../cart/CartDrawer';

const THEMES = [
  { id: 'dark',  bg: '#0a0a0a' },
  { id: 'light', bg: '#f0ede7' },
  { id: 'red',   bg: '#b80c2a' },
];

const Header = () => {
  const { totalItems }         = useCart();
  const { theme, toggleTheme } = useTheme();
  const location               = useLocation();
  const navigate               = useNavigate();

  const [scrolled,     setScrolled]     = useState(false);
  const [cartOpen,     setCartOpen]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`nav-root ${scrolled ? 'scrolled' : ''}`}>
        {/* Search bar overlay */}
        {searchOpen && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center',
            padding: '0 var(--outer-pad)',
            zIndex: 2,
          }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '16px' }}>
              <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search gear, brand, category…"
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  fontSize: '14px', fontWeight: 500, color: 'var(--text)',
                }}
              />
              <button type="button" onClick={() => setSearchOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Main bar */}
        <div className="wrap" style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '24px' }}>
          {/* LEFT nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <Link to="/shop" className={`t-label transition-colors ${location.pathname === '/shop' ? 'text-[var(--text)]' : ''}`}
              style={{ color: location.pathname === '/shop' ? 'var(--text)' : 'var(--text-muted)' }}>
              Shop
            </Link>
            <Link to="/shop?cat=New" className="t-label"
              style={{ color: 'var(--text-muted)' }}>
              Collections
            </Link>
            <Link to="/shop?cat=Shirts" className="t-label hidden md:block"
              style={{ color: 'var(--text-muted)' }}>
              New Arrivals
            </Link>
          </nav>

          {/* CENTER brand */}
          <Link to="/" style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Urban Gear
          </Link>

          {/* RIGHT actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
            {/* Theme dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {THEMES.map(t => (
                <button key={t.id} onClick={() => toggleTheme(t.id)}
                  className={`tdot ${theme === t.id ? 'on' : ''}`}
                  style={{ backgroundColor: t.bg }}
                />
              ))}
            </div>

            {/* Search */}
            <button onClick={() => setSearchOpen(true)} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              className="hidden md:flex">
              <Search size={16} strokeWidth={1.5} />
            </button>

            {/* Bag */}
            <button
              onClick={() => setCartOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', transition: 'color 0.2s' }}
              className="t-label"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              BAG
              {totalItems > 0 && (
                <span style={{
                  minWidth: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--text)', color: 'var(--bg)',
                  fontSize: '9px', fontWeight: 900,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 3px',
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(v => !v)} className="md:hidden" style={{ color: 'var(--text-muted)' }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            padding: '24px var(--outer-pad) 28px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[['Shop', '/shop'], ['Collections', '/shop'], ['New Arrivals', '/shop']].map(([l, to]) => (
                <Link key={l} to={to} className="t-label-bright">{l}</Link>
              ))}
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                <Search size={14} style={{ color: 'var(--text-muted)' }} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search…"
                  className="input"
                  style={{ border: 'none', background: 'none', padding: '0', fontSize: '13px' }}
                />
              </form>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
