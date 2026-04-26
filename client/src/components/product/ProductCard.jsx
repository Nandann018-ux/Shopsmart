import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FALLBACK = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';

const ProductCard = ({ product, onQuickView }) => {
  const [imgErr, setImgErr] = useState(false);
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <article className="pcard">
      {/* Image */}
      <div className="pcard__img-wrap">
        <img
          src={imgErr ? FALLBACK : product.thumbnail}
          alt={product.title}
          className="pcard__img"
          loading="lazy"
          onError={() => setImgErr(true)}
        />
        <span className="pcard__badge">{product.category}</span>

        {/* Quick View overlay */}
        <div className="pcard__quick" onClick={() => onQuickView && onQuickView(product)}>
          Quick View →
        </div>

        {/* Stock chip */}
        {product.stock > 0 && product.stock <= 5 && (
          <div style={{
            position: 'absolute', bottom: 10, right: 10,
            background: 'rgba(0,0,0,0.75)', color: '#fff',
            fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
            padding: '3px 6px', textTransform: 'uppercase',
          }}>
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pcard__info">
        <Link to={`/product/${product.id}`}>
          <p className="pcard__title">{product.title}</p>
        </Link>
        <div className="pcard__row">
          <span className="pcard__cat">{product.brand}</span>
          <span className="pcard__price">{fmt.format(product.price)}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
