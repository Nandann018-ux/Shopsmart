import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import productService from '../../services/productService';
import ProductCard from '../product/ProductCard';
import ProductModal from '../product/ProductModal';

const Hero = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    productService.getTrending(8).then(data => {
      setTrending(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'flex-end' }}>
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="label-xs" style={{ marginBottom: '20px' }}>
                SS26 COLLECTION · MEN'S FIELD UNIFORMS
              </p>
              <h1 className="display-heading">
                Urban<br />Gear
              </h1>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '360px', lineHeight: 1.8, marginTop: '28px' }}>
                Curated necessities for the modern city explorer. Designed with purpose.
                Engineered for the street.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ paddingBottom: '8px' }}
            >
              <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                Shop Now
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Wide editorial image strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', height: '400px', overflow: 'hidden' }}>
          {[
            'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80',
            'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
            'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80',
          ].map((src, i) => (
            <div key={i} style={{ overflow: 'hidden', borderLeft: i === 0 ? 'none' : '1px solid var(--border)' }}>
              <img
                src={src}
                alt={`Editorial ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)', transition: 'filter 0.5s' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(30%)'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Now ────────────────────────────────────── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          {/* Section header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <p className="label-xs" style={{ marginBottom: '10px' }}>Curated Selection</p>
              <h2 className="section-heading">Trending Now</h2>
            </div>
            <Link to="/shop" className="label-sm" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2px' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div className="skeleton" style={{ aspectRatio: '3/4' }} />
                  <div style={{ padding: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="skeleton" style={{ height: '12px', width: '65%', borderRadius: '2px' }} />
                    <div className="skeleton" style={{ height: '10px', width: '40%', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2px' }}>
              {trending.map(p => (
                <ProductCard key={p.id} product={p} onClick={setSelected} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Manifesto strip ──────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-heading" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
            "Designed for the city. Built for the mission."
          </p>
        </div>
      </section>

      {/* Product modal */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Hero;
