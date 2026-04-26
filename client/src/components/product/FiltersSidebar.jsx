import React from 'react';
import { Search } from 'lucide-react';

const FiltersSidebar = ({
  search, setSearch,
  category, setCategory,
  sort, setSort,
  maxPrice, setMaxPrice,
  inStock, setInStock,
  globalMax,
  totalCount,
  CATEGORIES, SORT_OPTS,
}) => {
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div className="sidebar-section" style={{ paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="t-label-bright" style={{ fontSize: '11px' }}>Filters</p>
          <span className="t-label">{totalCount} items</span>
        </div>
      </div>

      {/* Search */}
      <div className="sidebar-section">
        <p className="sidebar-group-label">Search</p>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={11} style={{ position: 'absolute', left: 0, color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search gear…"
            style={{
              background: 'none', border: 'none', outline: 'none',
              borderBottom: '1px solid var(--border-mid)',
              padding: '6px 0 6px 18px',
              width: '100%',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          />
        </div>
      </div>

      {/* Category */}
      <div className="sidebar-section">
        <p className="sidebar-group-label">Category</p>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`sidebar-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="sidebar-section">
        <p className="sidebar-group-label">Sort By</p>
        {SORT_OPTS.map(opt => (
          <button
            key={opt.value}
            className={`sidebar-btn ${sort === opt.value ? 'active' : ''}`}
            onClick={() => setSort(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Price Cap */}
      <div className="sidebar-section">
        <p className="sidebar-group-label">Max Price</p>
        <input
          type="range"
          min={0}
          max={globalMax}
          step={500}
          value={maxPrice === Infinity ? globalMax : maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          style={{ marginBottom: '10px' }}
        />
        <p className="t-label" style={{ color: 'var(--text)' }}>
          {maxPrice === Infinity
            ? `Up to ${fmt.format(globalMax)}`
            : `Up to ${fmt.format(maxPrice)}`}
        </p>
        {maxPrice !== Infinity && (
          <button onClick={() => setMaxPrice(Infinity)} className="btn-ghost" style={{ padding: '6px 0', fontSize: '10px' }}>
            Clear
          </button>
        )}
      </div>

      {/* Stock */}
      <div className="sidebar-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <p className="sidebar-group-label">Availability</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div
            onClick={() => setInStock(v => !v)}
            style={{
              width: '28px', height: '14px', borderRadius: '7px',
              background: inStock ? 'var(--text)' : 'var(--border-mid)',
              position: 'relative', transition: 'background 0.25s', flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute', top: '2px', left: inStock ? '15px' : '2px',
              width: '10px', height: '10px', borderRadius: '50%',
              background: inStock ? 'var(--bg)' : 'var(--text-muted)',
              transition: 'left 0.25s',
            }} />
          </div>
          <span className="t-label" style={{ color: 'var(--text)' }}>In Stock Only</span>
        </label>

        {/* Men Only badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', padding: '5px 10px', border: '1px solid var(--border-mid)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text)' }} />
          <span className="t-label" style={{ color: 'var(--text)' }}>Men Only</span>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
