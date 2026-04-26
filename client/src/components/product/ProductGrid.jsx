import React from 'react';
import ProductCard from './ProductCard';

/* Skeleton for grid view */
const GridSkel = () => (
  <div>
    <div className="skel" style={{ aspectRatio: '3/4' }} />
    <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div className="skel" style={{ height: '11px', width: '72%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="skel" style={{ height: '9px', width: '42%' }} />
        <div className="skel" style={{ height: '9px', width: '22%' }} />
      </div>
    </div>
  </div>
);

/* Empty state */
const Empty = () => (
  <div style={{ gridColumn: '1/-1', padding: '80px 0', textAlign: 'center' }}>
    <p className="t-label" style={{ marginBottom: '10px' }}>No products match your filters</p>
    <p className="t-body">Try adjusting your search or filter criteria.</p>
  </div>
);

/* Error state */
const ErrorState = ({ onRetry }) => (
  <div style={{ gridColumn: '1/-1', padding: '80px 0', textAlign: 'center' }}>
    <p className="t-label" style={{ marginBottom: '10px' }}>Failed to load products</p>
    <p className="t-body" style={{ marginBottom: '24px' }}>Check your connection and try again.</p>
    <button className="btn btn-outline" onClick={onRetry}>Retry</button>
  </div>
);

const ProductGrid = ({ products, loading, error, onRetry, onQuickView }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '2px',
  };

  if (error) return <div style={gridStyle}><ErrorState onRetry={onRetry} /></div>;

  if (loading) return (
    <div style={gridStyle}>
      {Array.from({ length: 16 }).map((_, i) => <GridSkel key={i} />)}
    </div>
  );

  if (!products.length) return <div style={gridStyle}><Empty /></div>;

  return (
    <div style={gridStyle}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
};

export default ProductGrid;
