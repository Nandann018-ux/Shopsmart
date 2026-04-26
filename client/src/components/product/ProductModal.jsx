import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      >
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Image */}
          <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-card)' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 36px' }}>
            <div>
              {/* Close */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button onClick={onClose} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Meta */}
              <p className="label-xs" style={{ marginBottom: '12px' }}>{product.category} · {product.brand}</p>

              {/* Title */}
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '20px' }}>
                {product.title}
              </h2>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                <Star size={11} fill="currentColor" />
                <span className="label-xs" style={{ color: 'var(--text)' }}>{product.rating?.toFixed(1)}</span>
              </div>

              {/* Price */}
              <p style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '28px' }}>
                {fmt.format(product.price)}
              </p>

              {/* Description */}
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '36px' }}>
                {product.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn-primary"
                onClick={handleAdd}
                style={{ width: '100%' }}
              >
                <ShoppingBag size={14} style={{ marginRight: '8px' }} />
                {added ? 'Added to Bag ✓' : 'Add to Bag'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
