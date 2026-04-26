import { useState, useCallback } from 'react';

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', price: 0 },
  { id: 'express',  label: 'Express Delivery',  sub: '2–3 business days', price: 29900 },
  { id: 'overnight',label: 'Overnight Delivery', sub: '1 business day',   price: 59900 },
];

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Credit / Debit Card' },
  { id: 'upi',    label: 'UPI' },
  { id: 'cod',    label: 'Cash on Delivery' },
];

const INITIAL_FORM = {
  // Contact
  email: '', phone: '',
  // Shipping
  firstName: '', lastName: '',
  address: '', city: '', state: '', pincode: '', country: 'India',
  // Payment
  cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '',
  upiId: '',
};

export const useCheckout = (cartItems, totalPrice) => {
  const [step,          setStep]          = useState(1); // 1 contact, 2 shipping, 3 payment
  const [form,          setForm]          = useState(INITIAL_FORM);
  const [errors,        setErrors]        = useState({});
  const [shipping,      setShipping]      = useState('standard');
  const [payment,       setPayment]       = useState('card');
  const [promo,         setPromo]         = useState('');
  const [promoApplied,  setPromoApplied]  = useState(false);
  const [promoError,    setPromoError]    = useState('');
  const [placing,       setPlacing]       = useState(false);
  const [orderDone,     setOrderDone]     = useState(false);
  const [orderNumber,   setOrderNumber]   = useState('');

  const shippingMethod = SHIPPING_METHODS.find(m => m.id === shipping);
  const shippingCost   = shippingMethod?.price ?? 0;
  const discount       = promoApplied ? Math.round(totalPrice * 0.1) : 0;
  const grandTotal     = totalPrice + shippingCost - discount;

  const updateField = useCallback((key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  }, []);

  const applyPromo = () => {
    if (promo.toUpperCase() === 'URBAN10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const validate = (s) => {
    const errs = {};
    if (s === 1) {
      if (!form.email.includes('@')) errs.email = 'Enter a valid email';
      if (form.phone.length < 10)    errs.phone = 'Enter a valid phone';
    }
    if (s === 2) {
      ['firstName','lastName','address','city','state','pincode'].forEach(k => {
        if (!form[k].trim()) errs[k] = 'Required';
      });
    }
    if (s === 3 && payment === 'card') {
      if (form.cardNumber.replace(/\s/g,'').length < 16) errs.cardNumber = 'Enter valid card number';
      if (!form.cardExpiry) errs.cardExpiry = 'Required';
      if (form.cardCvv.length < 3) errs.cardCvv = 'Required';
      if (!form.cardName.trim())   errs.cardName = 'Required';
    }
    if (s === 3 && payment === 'upi') {
      if (!form.upiId.includes('@')) errs.upiId = 'Enter valid UPI ID';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep(s => Math.min(s + 1, 3));
  };

  const placeOrder = async () => {
    if (!validate(3)) return;
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1600)); // Simulate API call
    const num = `UG-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(num);
    setOrderDone(true);
    setPlacing(false);
  };

  return {
    step, setStep, next,
    form, updateField,
    errors,
    shipping, setShipping,
    payment, setPayment,
    promo, setPromo,
    promoApplied, promoError,
    applyPromo,
    shippingCost, discount, grandTotal,
    placing, placeOrder,
    orderDone, orderNumber,
    SHIPPING_METHODS, PAYMENT_METHODS,
  };
};
