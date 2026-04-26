import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Zap, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const FALLBACK = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80';

const ProductQuickView = ({ product, onClose, onBuyNow }) => {
  const { addItem } = useCart();
  const [size,   setSize]   = useState('');
  const [qty,    setQty]    = useState(1);
  const [added,  setAdded]  = useState(false);
  const [sizeErr,setSizeErr]= useState(false);
  const [imgErr, setImgErr] = useState(false);

  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = () => {
    if (!size) { setSizeErr(true); return; }
    addItem({ ...product, selectedSize: size }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!size) { setSizeErr(true); return; }
    if (onBuyNow) onBuyNow({ ...product, selectedSize: size, qty });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{ zIndex: 95 }}
      />
      <motion.div
        className="qv-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ zIndex: 96 }}
      >
        {/* LEFT: Image */}
        <div className="qv-img">
          <img
            src={imgErr ? FALLBACK : (product.images?.[0] || product.thumbnail)}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgErr(true)}
          />
        </div>

        {/* RIGHT: Info */}
        <div className="qv-info">
          {/* Close */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button onClick={onClose} className="btn-ghost" style={{ padding: '4px' }}>
              <X size={18} />
            </button>
          </div>

          {/* Breadcrumb */}
          <p className="t-label" style={{ marginBottom: '10px' }}>
            {product.category} · {product.brand}
          </p>

          {/* Title */}
          <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '14px' }}>
            {product.title}
          </h2>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '16px' }}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'} strokeWidth={1.5} />
            ))}
            <span className="t-label" style={{ color: 'var(--text)', marginLeft: '4px' }}>{product.rating}</span>
            <span className="t-label" style={{ marginLeft: '4px' }}>· {product.stock} in stock</span>
          </div>

          {/* Price */}
          <p style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>
            {fmt.format(product.price)}
          </p>

          {/* Description */}
          <p className="t-body" style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            {product.description?.slice(0, 140)}…
          </p>

          {/* Size selector */}
          <div style={{ marginBottom: '20px' }}>
            <p className="t-label" style={{ marginBottom: '10px', color: sizeErr ? '#e55' : 'var(--text-muted)' }}>
              {sizeErr ? 'Please select a size' : 'Select Size'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SIZES.map(s => (
                <button
                  key={s}
                  className={`size-chip ${size === s ? 'selected' : ''}`}
                  onClick={() => { setSize(s); setSizeErr(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty stepper */}
          <div style={{ marginBottom: '20px' }}>
            <p className="t-label" style={{ marginBottom: '10px' }}>Quantity</p>
            <div className="qty-stepper">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <div className="qty-val">{qty}</div>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <button className="btn btn-fill btn-full" onClick={handleAdd}>
              <ShoppingBag size={13} />
              {added ? 'Added ✓' : 'Add to Bag'}
            </button>
            <button className="btn btn-outline btn-full" onClick={handleBuyNow}>
              <Zap size={13} />
              Buy Now
            </button>
          </div>

          {/* Meta notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={12} style={{ color: 'var(--text-muted)' }} />
              <span className="t-label" style={{ color: 'var(--text-dim)' }}>Free delivery on orders over ₹4,000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={12} style={{ color: 'var(--text-muted)' }} />
              <span className="t-label" style={{ color: 'var(--text-dim)' }}>30-day returns · No questions asked</span>
            </div>
          </div>

          {/* Full detail link */}
          <Link to={`/product/${product.id}`} onClick={onClose}
            className="t-label"
            style={{ display: 'block', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            View full details →
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductQuickView;
