import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SidebarFilters = ({
  search,    setSearch,
  category,  setCategory,
  sort,      setSort,
  maxPrice,  setMaxPrice,
  globalMaxPrice,
  categories,
  sortOptions,
  totalCount,
}) => {
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <SlidersHorizontal size={13} strokeWidth={2} />
          <span className="label-xs">Filters</span>
        </div>
        <span className="label-xs">{totalCount} items</span>
      </div>

      {/* Search */}
      <div>
        <p className="sidebar-label">Search</p>
        <div style={{ position: 'relative' }}>
          <Search
            size={12}
            strokeWidth={2}
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search gear…"
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid var(--border-med)',
              color: 'var(--text)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 0 6px 20px',
              width: '100%',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="sidebar-label">Category</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`sidebar-item ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="sidebar-label">Sort By</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`sidebar-item ${sort === opt.value ? 'active' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="sidebar-label">Max Price</p>
        <input
          type="range"
          min={0}
          max={globalMaxPrice}
          step={500}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
        />
        <p className="label-xs" style={{ marginTop: '10px', color: 'var(--text)' }}>
          Up to {fmt.format(maxPrice)}
        </p>
      </div>

      {/* MEN ONLY badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '6px 10px',
        border: '1px solid var(--border-med)',
        alignSelf: 'flex-start',
      }}>
        <span className="label-xs" style={{ color: 'var(--text)' }}>MEN ONLY</span>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text)' }} />
      </div>
    </aside>
  );
};

export default SidebarFilters;
