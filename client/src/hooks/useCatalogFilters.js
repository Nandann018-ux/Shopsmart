import { useState, useEffect, useMemo, useCallback } from 'react';
import productService from '../services/productService';

const CATEGORIES = ['All', 'Shirts', 'Shoes', 'Watches', 'Tops', 'Sunglasses'];
const SORT_OPTS  = [
  { label: 'Default',      value: 'default' },
  { label: 'Price: Low',   value: 'price-asc' },
  { label: 'Price: High',  value: 'price-desc' },
  { label: 'Name A–Z',     value: 'name-asc' },
  { label: 'Rating',       value: 'rating' },
];

const PAGE_SIZE = 48;

export const useCatalogFilters = () => {
  const [all,     setAll]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Filters
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [sort,     setSort]     = useState('default');
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [inStock,  setInStock]  = useState(false);
  const [page,     setPage]     = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAll();
      setAll(data);
      setMaxPrice(Math.max(...data.map(p => p.price)));
    } catch {
      setError('Failed to load products. Check your connection and retry.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, category, sort, maxPrice, inStock]);

  const globalMax = useMemo(() =>
    all.length ? Math.max(...all.map(p => p.price)) : 200000,
  [all]);

  const filtered = useMemo(() => {
    let list = [...all];

    if (category !== 'All') {
      list = list.filter(p => p.category === category.toUpperCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (maxPrice < Infinity) {
      list = list.filter(p => p.price <= maxPrice);
    }
    if (inStock) {
      list = list.filter(p => p.stock > 0);
    }

    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price  - b.price);  break;
      case 'price-desc': list.sort((a, b) => b.price  - a.price);  break;
      case 'name-asc':   list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [all, category, search, maxPrice, inStock, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = useMemo(() =>
    filtered.slice(0, page * PAGE_SIZE),
  [filtered, page]);

  const loadMore = () => { if (page < totalPages) setPage(p => p + 1); };

  return {
    products: paginated,
    allFiltered: filtered,
    loading, error, retry: load,
    search, setSearch,
    category, setCategory,
    sort, setSort,
    maxPrice, setMaxPrice,
    inStock, setInStock,
    page, totalPages, loadMore,
    hasMore: page < totalPages,
    globalMax,
    totalCount: filtered.length,
    CATEGORIES,
    SORT_OPTS,
  };
};
