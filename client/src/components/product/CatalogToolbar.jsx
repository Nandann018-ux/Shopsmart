import React from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';

const CatalogToolbar = ({ totalCount, loading, listMode, setListMode }) => {
  return (
    <div className="flex items-center justify-between mb-7 pb-4 border-b border-[var(--border)]">
      <span className="t-label">
        {loading ? 'Loading…' : `${totalCount.toLocaleString()} items`}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setListMode(false)}
          className={`transition-colors ${!listMode ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}
          title="Grid View"
        >
          <LayoutGrid size={14} strokeWidth={2} />
        </button>
        <button
          onClick={() => setListMode(true)}
          className={`transition-colors ${listMode ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}
          title="List View"
        >
          <LayoutList size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default CatalogToolbar;
