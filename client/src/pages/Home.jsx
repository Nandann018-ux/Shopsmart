import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Zap, Shield } from 'lucide-react';
import Layout from '../layouts/Layout';
import productService from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import ProductQuickView from '../components/product/ProductQuickView';
import heroImg from '../assets/hero-editorial.png';

const Home = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qv, setQv] = useState(null);

  useEffect(() => {
    productService.getTrending(8).then(res => {
      setTrending(res);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="t-label" style={{ marginBottom: '16px' }}>Deployment // SS26 Field Collection</p>
              <h1 className="t-display" style={{ marginBottom: '24px' }}>Urban<br />Gear</h1>
              <p className="t-body" style={{ maxWidth: '400px', fontSize: '14px', marginBottom: '48px' }}>
                Engineered necessities for the modern explorer. A study in utilitarian aesthetics and high-performance textile engineering.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link to="/shop" className="btn btn-fill">Shop All Units</Link>
                <Link to="/shop?cat=New" className="btn btn-outline">Explore Field Notes</Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
            >
              <img 
                src={heroImg} 
                alt="Editorial" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '24px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: 'var(--bg)', 
                border: '1px solid var(--border)', 
                padding: '24px', 
                width: 'calc(100% - 48px)',
                maxWidth: '320px',
                textAlign: 'center'
              }} className="hidden lg:block">
                <p className="t-label" style={{ marginBottom: '12px' }}>Tech Spec 04</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)' }}>
                  Waterproof ripstop construction with heat-sealed seams. Tactical modularity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL GRID ────────────────────────────────── */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2px', background: 'var(--border)' }}>
            <div style={{ background: 'var(--bg)', padding: '40px' }}>
              <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80" alt="" style={{ width: '100%', height: '400px', objectFit: 'cover', marginBottom: '24px' }} />
              <p className="t-label">Selection 01</p>
              <h2 className="t-heading" style={{ fontSize: '1.8rem', margin: '12px 0' }}>The Field Shirt</h2>
              <Link to="/shop?cat=Shirts" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: 0 }}>
                Explore Collection <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ background: 'var(--bg)', padding: '40px', flex: 1 }}>
                <img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80" alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '20px' }} />
                <h3 className="t-label-bright">Unit 02 // Ground Force</h3>
                <Link to="/shop?cat=Shoes" className="btn-ghost" style={{ padding: 0, marginTop: '8px' }}>Shop Shoes</Link>
              </div>
              <div style={{ background: 'var(--bg)', padding: '40px', flex: 1 }}>
                <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '20px' }} />
                <h3 className="t-label-bright">Unit 03 // Time Pieces</h3>
                <Link to="/shop?cat=Watches" className="btn-ghost" style={{ padding: 0, marginTop: '8px' }}>Shop Watches</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING PRODUCTS ────────────────────────────── */}
      <section style={{ padding: '100px 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <p className="t-label" style={{ marginBottom: '12px' }}>Curated Deployment</p>
              <h2 className="t-heading">Trending Units</h2>
            </div>
            <Link to="/shop" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
            {loading ? (
               Array.from({ length: 8 }).map((_, i) => (
                 <div key={i}><div className="skel" style={{ aspectRatio: '3/4' }} /><div className="skel" style={{ height: '12px', width: '60%', marginTop: '12px' }} /></div>
               ))
            ) : (
              trending.map(p => (
                <ProductCard key={p.id} product={p} onQuickView={setQv} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── BRAND MISSION ────────────────────────────────── */}
      <section style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border)', padding: '100px 0' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <Shield size={40} style={{ margin: '0 auto 32px', color: 'var(--text-muted)' }} strokeWidth={1} />
          <h2 className="t-heading" style={{ fontSize: '2rem', marginBottom: '24px' }}>Designed for the city.<br />Built for the mission.</h2>
          <p className="t-body" style={{ fontSize: '14px', lineHeight: 2 }}>
            Urban Gear was founded on the belief that clothing is equipment. Our pieces are designed with a technical focus, utilizing advanced materials to protect you from the urban elements while maintaining a sharp, architectural silhouette.
          </p>
        </div>
      </section>

      {qv && (
        <ProductQuickView product={qv} onClose={() => setQv(null)} onBuyNow={(p) => navigate('/checkout', { state: { buyNow: p } })} />
      )}
    </Layout>
  );
};

export default Home;
