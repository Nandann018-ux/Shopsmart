import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Zap, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = ({ open, onClose }) => {
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const goCheckout = () => { onClose(); navigate('/checkout'); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} onClick={onClose} />
          <motion.div className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>

            {/* Header */}
            <div className="drawer__head">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={15} strokeWidth={1.5} />
                <span className="t-label-bright" style={{ fontSize: '11px' }}>YOUR BAG</span>
                {totalItems > 0 && <span className="t-label">({totalItems} items)</span>}
              </div>
              <button onClick={onClose} className="btn-ghost" style={{ padding: '4px', color: 'var(--text-muted)' }}>
                <X size={17} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <ShoppingBag size={36} strokeWidth={1} style={{ margin: '0 auto 16px', opacity: 0.12 }} />
                  <p className="t-label" style={{ marginBottom: '20px' }}>Your bag is empty</p>
                  <button onClick={onClose} className="btn btn-outline">Browse Store</button>
                </div>
              ) : (
                <div className="divide-y">
                  {items.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`}
                         style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '14px', padding: '16px 0' }}>
                      {/* Thumbnail */}
                      <Link to={`/product/${item.id}`} onClick={onClose}
                            style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-raised)', border: '1px solid var(--border)', display: 'block' }}>
                        <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Link>

                      {/* Info */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                              {item.title.slice(0, 40)}{item.title.length > 40 ? '…' : ''}
                            </p>
                            <p className="t-label" style={{ marginTop: '4px' }}>
                              {item.category}{item.selectedSize ? ` · ${item.selectedSize}` : ''}
                            </p>
                          </div>
                          <button onClick={() => removeItem(item.id)} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                            <X size={13} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div className="qty-stepper" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                            <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>
                              <Minus size={10} />
                            </button>
                            <div className="qty-val">{item.qty}</div>
                            <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>
                              <Plus size={10} />
                            </button>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 800 }}>{fmt.format(item.price * item.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
                {/* Subtotal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="t-label">Subtotal</span>
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>{fmt.format(totalPrice)}</span>
                </div>
                <p className="t-label" style={{ marginBottom: '16px' }}>Shipping calculated at checkout</p>

                {/* CTAs */}
                <button className="btn btn-fill btn-full" onClick={goCheckout}>
                  Checkout <ArrowRight size={13} />
                </button>
                <button className="btn btn-ghost btn-full" onClick={onClose} style={{ marginTop: '8px', fontSize: '11px' }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
