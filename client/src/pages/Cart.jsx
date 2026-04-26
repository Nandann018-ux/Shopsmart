import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Layout from '../layouts/Layout';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <Layout>
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <p className="label-xs" style={{ marginBottom: '12px' }}>YOUR SELECTION</p>
            <h1 className="section-heading">Your Bag</h1>
          </div>
          <button
            onClick={() => navigate('/shop')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}
          >
            <ArrowLeft size={13} />
            Continue Shopping
          </button>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <ShoppingBag size={40} strokeWidth={1} style={{ margin: '0 auto 20px', opacity: 0.15 }} />
            <p className="label-xs" style={{ marginBottom: '8px' }}>Your bag is empty</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Looks like you haven't added anything yet.
            </p>
            <Link to="/shop" className="btn-primary">Browse Store</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px', alignItems: 'start' }}>
            {/* Items */}
            <div>
              <div className="divide-base">
                {items.map(item => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '24px', padding: '28px 0' }}>
                    {/* Image */}
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3, marginBottom: '6px' }}>
                            {item.title}
                          </p>
                          <p className="label-xs">{item.category} · {item.brand}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                          <X size={15} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Qty control */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border)', padding: '8px 16px' }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ color: 'var(--text-muted)' }}>
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ color: 'var(--text-muted)' }}>
                            <Plus size={12} />
                          </button>
                        </div>

                        <span style={{ fontSize: '14px', fontWeight: 800 }}>
                          {fmt.format(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="label-xs"
                style={{ marginTop: '16px', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                Clear Bag
              </button>
            </div>

            {/* Order Summary */}
            <div style={{ border: '1px solid var(--border)', padding: '32px', position: 'sticky', top: '100px' }}>
              <p className="label-xs" style={{ marginBottom: '24px' }}>Order Summary</p>

              <div className="divide-base">
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subtotal</span>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{fmt.format(totalPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shipping</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Calculated at checkout</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total</span>
                  <span style={{ fontSize: '16px', fontWeight: 900 }}>{fmt.format(totalPrice)}</span>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', marginTop: '24px' }}>
                Proceed to Checkout
              </button>
              <Link to="/shop" className="btn-outline" style={{ display: 'block', width: '100%', marginTop: '10px', textAlign: 'center', boxSizing: 'border-box' }}>
                Keep Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
