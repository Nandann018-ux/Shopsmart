import React from 'react';

const OrderSummary = ({ items, subtotal, shippingCost, discount, promoApplied, grandTotal, promo, setPromo, applyPromo, promoError }) => {
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <div className="bg-[var(--bg-raised)] border border-[var(--border)] p-8 sticky top-[120px]">
      <h2 className="t-label-bright mb-6">Order Summary</h2>
      
      {/* Item list */}
      <div className="divide-y divide-[var(--border)] mb-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 py-3">
            <div className="w-14 aspect-[3/4] bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
              <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[11px] uppercase">{item.title}</p>
              <p className="t-label text-[9px] mt-0.5">QTY: {item.qty} · {item.selectedSize}</p>
            </div>
            <span className="font-bold text-[11px]">{fmt.format(item.price * item.qty)}</span>
          </div>
        ))}
      </div>

      {/* Promo */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input 
            className="input !p-2" 
            placeholder="Promo code" 
            value={promo} 
            onChange={e => setPromo(e.target.value)} 
          />
          <button className="btn btn-outline !px-4" onClick={applyPromo}>Apply</button>
        </div>
        {promoError && <p className="text-[#f44] text-[9px] mt-1.5">{promoError}</p>}
        {promoApplied && <p className="text-[#4caf50] text-[9px] mt-1.5 font-bold">Code URBAN10 applied ✓</p>}
      </div>

      {/* Calculations */}
      <div className="divide-y divide-[var(--border)] mb-6">
        <div className="flex justify-between py-2">
          <span className="t-label">Subtotal</span>
          <span className="font-bold">{fmt.format(subtotal)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="t-label">Shipping</span>
          <span className="font-bold">{shippingCost === 0 ? 'FREE' : fmt.format(shippingCost)}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between py-2 text-[#4caf50]">
            <span className="t-label !text-inherit">Discount (10%)</span>
            <span className="font-bold">−{fmt.format(discount)}</span>
          </div>
        )}
        <div className="flex justify-between pt-4 mt-2">
          <span className="t-label-bright text-xs">Total</span>
          <span className="font-black text-lg">{fmt.format(grandTotal)}</span>
        </div>
      </div>

      <p className="t-body text-[10px] text-center">
        Taxes and customs included in total price.
      </p>
    </div>
  );
};

export default OrderSummary;
