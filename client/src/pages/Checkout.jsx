import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../hooks/useCheckout';
import Layout from '../layouts/Layout';
import OrderSummary from '../components/checkout/OrderSummary';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { items: cartItems, totalPrice } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const buyNowProduct = location.state?.buyNow;
  const items = buyNowProduct ? [buyNowProduct] : cartItems;
  const subtotal = buyNowProduct ? (buyNowProduct.price * buyNowProduct.qty) : totalPrice;

  const checkout = useCheckout(items, subtotal);
  const { 
    step, setStep, next, form, updateField, errors,
    shipping, setShipping, payment, setPayment,
    promo, setPromo, promoApplied, promoError, applyPromo,
    shippingCost, discount, grandTotal, placing, placeOrder,
    orderDone, orderNumber, SHIPPING_METHODS, PAYMENT_METHODS
  } = checkout;

  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  useEffect(() => {
    if (items.length === 0 && !orderDone) navigate('/shop');
  }, [items, navigate, orderDone]);

  if (orderDone) {
    return (
      <Layout>
        <div className="wrap py-32 text-center max-w-[600px] mx-auto">
          <CheckCircle2 size={64} className="text-[var(--text)] mx-auto mb-6" strokeWidth={1} />
          <h1 className="t-heading mb-4">Order Confirmed</h1>
          <p className="t-label mb-8">Order #{orderNumber}</p>
          <p className="t-body mb-12">
            Thank you for your purchase. We've sent a confirmation email to {form.email}. 
            Our field operations team is now preparing your gear for deployment.
          </p>
          <div className="divide-y divide-[var(--border)] mb-12 border-b border-[var(--border)]">
            <div className="py-6">
              <p className="t-label">Shipping To</p>
              <p className="t-body !text-[var(--text)] mt-2">
                {form.firstName} {form.lastName}<br />
                {form.address}, {form.city}<br />
                {form.state} {form.pincode}
              </p>
            </div>
          </div>
          <Link to="/shop" className="btn btn-fill btn-full">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wrap pt-14 pb-32">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className={`t-label ${step >= 1 ? '!text-[var(--text)]' : ''}`}>Information</span>
            <ChevronRight size={12} className="text-[var(--border-mid)]" />
            <span className={`t-label ${step >= 2 ? '!text-[var(--text)]' : ''}`}>Shipping</span>
            <ChevronRight size={12} className="text-[var(--border-mid)]" />
            <span className={`t-label ${step >= 3 ? '!text-[var(--text)]' : ''}`}>Payment</span>
          </div>
          <h1 className="t-heading">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start">
          <main>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <section className="mb-12">
                  <h2 className="t-label-bright mb-6">Contact Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="input-label">Email Address</label>
                      <input className="input" placeholder="you@example.com" value={form.email} onChange={e => updateField('email', e.target.value)} />
                      {errors.email && <p className="text-[#f44] text-[10px] mt-1">{errors.email}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="input-label">Phone Number</label>
                      <input className="input" placeholder="+91" value={form.phone} onChange={e => updateField('phone', e.target.value)} />
                      {errors.phone && <p className="text-[#f44] text-[10px] mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </section>
                <section>
                  <h2 className="t-label-bright mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">First Name</label>
                      <input className="input" value={form.firstName} onChange={e => updateField('firstName', e.target.value)} />
                      {errors.firstName && <p className="text-[#f44] text-[10px] mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="input-label">Last Name</label>
                      <input className="input" value={form.lastName} onChange={e => updateField('lastName', e.target.value)} />
                      {errors.lastName && <p className="text-[#f44] text-[10px] mt-1">{errors.lastName}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="input-label">Street Address</label>
                      <input className="input" value={form.address} onChange={e => updateField('address', e.target.value)} />
                      {errors.address && <p className="text-[#f44] text-[10px] mt-1">{errors.address}</p>}
                    </div>
                    <div><label className="input-label">City</label><input className="input" value={form.city} onChange={e => updateField('city', e.target.value)} /></div>
                    <div><label className="input-label">State</label><input className="input" value={form.state} onChange={e => updateField('state', e.target.value)} /></div>
                    <div><label className="input-label">Pincode</label><input className="input" value={form.pincode} onChange={e => updateField('pincode', e.target.value)} /></div>
                    <div><label className="input-label">Country</label><input className="input" value={form.country} disabled /></div>
                  </div>
                </section>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="t-label-bright mb-6">Delivery Method</h2>
                <div className="divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--bg-raised)]">
                  {SHIPPING_METHODS.map(m => (
                    <label key={m.id} className="flex items-center gap-4 p-5 cursor-pointer">
                      <input type="radio" checked={shipping === m.id} onChange={() => setShipping(m.id)} className="accent-[var(--text)]" />
                      <div className="flex-1">
                        <p className="font-bold text-[12px]">{m.label}</p>
                        <p className="t-label !text-[9px] mt-1">{m.sub}</p>
                      </div>
                      <span className="font-bold">{m.price === 0 ? 'FREE' : fmt.format(m.price)}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="t-label-bright mb-6">Payment Method</h2>
                <div className="mb-8">
                  <div className="flex gap-3 mb-6">
                    {PAYMENT_METHODS.map(m => (
                      <button key={m.id} onClick={() => setPayment(m.id)} className={`btn flex-1 h-12 !p-0 ${payment === m.id ? 'btn-fill' : 'btn-outline'}`}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                  {payment === 'card' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2"><label className="input-label">Card Number</label><input className="input" placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} /></div>
                      <div className="col-span-2"><label className="input-label">Name on Card</label><input className="input" value={form.cardName} onChange={e => updateField('cardName', e.target.value)} /></div>
                      <div><label className="input-label">Expiry Date</label><input className="input" placeholder="MM / YY" value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} /></div>
                      <div><label className="input-label">CVV</label><input className="input" placeholder="123" value={form.cardCvv} onChange={e => updateField('cardCvv', e.target.value)} /></div>
                    </div>
                  )}
                  {payment === 'upi' && <div><label className="input-label">UPI ID</label><input className="input" placeholder="username@bank" value={form.upiId} onChange={e => updateField('upiId', e.target.value)} /></div>}
                  {payment === 'cod' && <div className="p-6 bg-white/5 border border-dashed border-[var(--border-mid)]"><p className="t-body">Pay in cash or via QR code upon delivery.</p></div>}
                </div>
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Lock size={12} /><span className="t-label !text-[9px]">Your payment is secured with 256-bit SSL encryption.</span>
                </div>
              </motion.div>
            )}

            <div className="mt-16 flex justify-between items-center">
              <button className="btn-ghost !flex items-center gap-2" onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/shop')}>
                <ArrowLeft size={14} /> Back
              </button>
              <button className="btn btn-fill min-w-[180px]" onClick={step < 3 ? next : placeOrder} disabled={placing}>
                {placing ? 'Processing...' : step < 3 ? 'Continue' : `Pay ${fmt.format(grandTotal)}`}
              </button>
            </div>
          </main>

          <OrderSummary 
            items={items} 
            subtotal={subtotal} 
            shippingCost={shippingCost} 
            discount={discount} 
            promoApplied={promoApplied} 
            grandTotal={grandTotal}
            promo={promo}
            setPromo={setPromo}
            applyPromo={applyPromo}
            promoError={promoError}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
