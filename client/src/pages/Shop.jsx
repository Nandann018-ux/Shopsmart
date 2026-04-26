import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import FiltersSidebar from '../components/product/FiltersSidebar';
import ProductGrid from '../components/product/ProductGrid';
import ProductQuickView from '../components/product/ProductQuickView';
import CatalogHero from '../components/product/CatalogHero';
import CatalogToolbar from '../components/product/CatalogToolbar';
import { useCatalogFilters } from '../hooks/useCatalogFilters';

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [qv, setQv] = useState(null);
  const [listMode, setListMode] = useState(false);

  const filters = useCatalogFilters();
  const { products, loading, error, retry, hasMore, loadMore,
          search, setSearch, category, setCategory,
          sort, setSort, maxPrice, setMaxPrice, globalMax,
          inStock, setInStock, totalCount, CATEGORIES, SORT_OPTS } = filters;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const cat = params.get('cat');
    if (q) setSearch(q);
    if (cat) setCategory(cat);
  }, [location.search, setSearch, setCategory]);

  const handleBuyNow = (product) => {
    navigate('/checkout', { state: { buyNow: product } });
  };

  return (
    <Layout>
      <CatalogHero category={category} />

      <div className="wrap pb-20">
        <div className="grid grid-cols-[var(--sidebar-w)_1fr] gap-0">
          
          {/* Sidebar */}
          <div className="border-r border-[var(--border)] pr-7 pt-9 sticky top-[var(--nav-h)] h-[calc(100vh-var(--nav-h))] overflow-y-auto self-start">
            <FiltersSidebar
              search={search} setSearch={setSearch}
              category={category} setCategory={setCategory}
              sort={sort} setSort={setSort}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              inStock={inStock} setInStock={setInStock}
              globalMax={globalMax}
              totalCount={totalCount}
              CATEGORIES={CATEGORIES}
              SORT_OPTS={SORT_OPTS}
            />
          </div>

          {/* Main */}
          <main className="pl-[var(--gap-sidebar)] pt-9">
            <CatalogToolbar 
              totalCount={totalCount} 
              loading={loading} 
              listMode={listMode} 
              setListMode={setListMode} 
            />

            {listMode ? (
              <ListMode products={products} loading={loading} error={error} onRetry={retry} onQV={setQv} />
            ) : (
              <ProductGrid products={products} loading={loading} error={error} onRetry={retry} onQuickView={setQv} />
            )}

            {!loading && !error && hasMore && (
              <div className="mt-12 text-center">
                <button className="btn btn-outline" onClick={loadMore}>Load More</button>
              </div>
            )}

            {!loading && !error && !hasMore && products.length > 0 && (
              <p className="t-label text-center mt-10 pt-5 border-t border-[var(--border)]">
                All {totalCount.toLocaleString()} items shown
              </p>
            )}
          </main>
        </div>
      </div>

      {qv && (
        <ProductQuickView product={qv} onClose={() => setQv(null)} onBuyNow={handleBuyNow} />
      )}
    </Layout>
  );
};

const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const ListMode = ({ products, loading, error, onRetry, onQV }) => {
  if (loading) return (
    <div className="divide-y divide-[var(--border)]">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex gap-4 py-4 items-center">
          <div className="skel w-14 h-[72px] flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="skel h-3 w-[55%]" />
            <div className="skel h-2 w-[30%]" />
          </div>
          <div className="skel h-3 w-16" />
        </div>
      ))}
    </div>
  );
  if (error) return <p className="t-label py-10 text-center">Error. <button onClick={onRetry} className="underline text-[var(--text)]">Retry</button></p>;
  if (!products.length) return <p className="t-label py-10 text-center">No products match your filters.</p>;

  return (
    <div className="divide-y divide-[var(--border)]">
      {products.map(p => (
        <div key={p.id} className="grid grid-cols-[56px_1fr_auto_auto] gap-4 py-3.5 items-center cursor-pointer hover:bg-[var(--bg-raised)] transition-colors" onClick={() => onQV(p)}>
          <div className="aspect-[3/4] overflow-hidden bg-[var(--bg-raised)] border border-[var(--border)]">
            <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide">{p.title}</p>
            <p className="t-label mt-1">{p.category} · {p.brand}</p>
          </div>
          <span className="t-label text-[var(--text-dim)]">{p.stock > 0 ? `${p.stock} left` : 'Out of stock'}</span>
          <span className="text-[12px] font-black whitespace-nowrap">{fmt.format(p.price)}</span>
        </div>
      ))}
    </div>
  );
};

export default Shop;
