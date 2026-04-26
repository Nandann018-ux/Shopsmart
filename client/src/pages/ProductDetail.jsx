import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Zap, Star, Truck, RotateCcw, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import Layout from '../layouts/Layout';
import ProductCard from '../components/product/ProductCard';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeErr, setSizeErr] = useState(false);
  const [accordion, setAccordion] = useState({ details: true, shipping: false });

  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productService.getById(id).then(data => {
      setProduct(data);
      setLoading(false);
      // Fetch related
      productService.getTrending(4).then(res => setRelated(res.filter(p => p.id !== parseInt(id))));
    });
  }, [id]);

  const handleAdd = () => {
    if (!size) { setSizeErr(true); return; }
    addItem({ ...product, selectedSize: size }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!size) { setSizeErr(true); return; }
    navigate('/checkout', { state: { buyNow: { ...product, selectedSize: size, qty } } });
  };

  if (loading) return (
    <Layout>
      <div className="wrap" style={{ paddingTop: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px' }}>
          <div className="skel" style={{ aspectRatio: '4/5', width: '100%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="skel" style={{ height: '12px', width: '30%' }} />
            <div className="skel" style={{ height: '48px', width: '100%' }} />
            <div className="skel" style={{ height: '24px', width: '40%' }} />
            <div className="skel" style={{ height: '100px', width: '100%' }} />
          </div>
        </div>
      </div>
    </Layout>
  );

  if (!product) return (
    <Layout>
      <div className="wrap" style={{ padding: '100px 0', textAlign: 'center' }}>
        <p className="t-label">Product not found</p>
        <Link to="/shop" className="btn btn-outline" style={{ marginTop: '20px' }}>Back to Shop</Link>
      </div>
    </Layout>
  );

  const images = product.images || [product.thumbnail];

  return (
    <Layout>
      <div className="wrap" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <button onClick={() => navigate(-1)} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}>
            <ArrowLeft size={14} />
            <span className="t-label" style={{ color: 'inherit' }}>Back</span>
          </button>
          <span style={{ color: 'var(--border-mid)' }}>/</span>
          <span className="t-label">{product.category}</span>
          <span style={{ color: 'var(--border-mid)' }}>/</span>
          <span className="t-label" style={{ color: 'var(--text)' }}>{product.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '60px', alignItems: 'start' }}>
          
          {/* LEFT: GALLERY */}
          <div>
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--bg-raised)', border: '1px solid var(--border)', marginBottom: '16px' }}>
                <motion.img 
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={images[activeImg]} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImg(i)}
                    style={{ 
                      flex: '0 0 80px', aspectRatio: '1/1', border: `1px solid ${activeImg === i ? 'var(--text)' : 'var(--border)'}`,
                      overflow: 'hidden', opacity: activeImg === i ? 1 : 0.6, transition: 'opacity 0.2s'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PURCHASE PANEL */}
          <aside>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '24px' }}>
              <p className="t-label" style={{ marginBottom: '12px' }}>{product.brand} · {product.category}</p>
              <h1 className="t-heading" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{product.title}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'} />)}
                </div>
                <span className="t-label" style={{ color: 'var(--text)' }}>{product.rating}</span>
                <span style={{ color: 'var(--border-mid)' }}>|</span>
                <span className="t-label" style={{ color: product.stock > 0 ? '#4caf50' : '#f44336' }}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <p style={{ fontSize: '1.8rem', fontWeight: 900 }}>{fmt.format(product.price)}</p>
            </div>

            {/* Select Size */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p className="t-label-bright" style={{ color: sizeErr ? '#f44' : 'inherit' }}>
                  {sizeErr ? 'Required: Select Size' : 'Select Size'}
                </p>
                <button className="btn-ghost" style={{ fontSize: '10px', padding: 0 }}>Size Guide</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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

            {/* Quantity */}
            <div style={{ marginBottom: '32px' }}>
              <p className="t-label-bright" style={{ marginBottom: '12px' }}>Quantity</p>
              <div className="qty-stepper">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <div className="qty-val">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
              <button className="btn btn-fill btn-full" onClick={handleAdd}>
                <ShoppingBag size={14} />
                {added ? 'Added to Bag ✓' : 'Add to Bag'}
              </button>
              <button className="btn btn-outline btn-full" onClick={handleBuyNow}>
                <Zap size={14} />
                Buy It Now
              </button>
            </div>

            {/* Info Accordions */}
            <div className="divide-y" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="accordion-head" onClick={() => setAccordion(a => ({ ...a, details: !a.details }))}>
                Details & Description
                {accordion.details ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {accordion.details && (
                <div className="accordion-body">
                  <p className="t-body">{product.description}</p>
                </div>
              )}

              <div className="accordion-head" onClick={() => setAccordion(a => ({ ...a, shipping: !a.shipping }))}>
                Shipping & Returns
                {accordion.shipping ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {accordion.shipping && (
                <div className="accordion-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Truck size={14} />
                      <p className="t-body">Free shipping on orders above ₹4,000. Express available.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <RotateCcw size={14} />
                      <p className="t-body">30-day easy returns policy. Items must be unworn.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <ShieldCheck size={14} />
                      <p className="t-body">100% authentic gear guaranteed.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: '100px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
            <h2 className="t-label-bright" style={{ fontSize: '12px', marginBottom: '32px' }}>Recommended Units</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
