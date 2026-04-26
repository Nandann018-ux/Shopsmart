import { useState, useEffect, useMemo } from 'react';
import productService from '../services/productService';

const SORT_OPTIONS = [
  { label: 'Default',    value: 'default' },
  { label: 'Price: Low', value: 'price-asc' },
  { label: 'Price: High', value: 'price-desc' },
  { label: 'A – Z',     value: 'name-asc' },
];

const CATEGORIES = ['All', 'Shirts', 'Shoes', 'Watches', 'Tops', 'Sunglasses'];

export const useProducts = () => {
  const [all,     setAll]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [sort,     setSort]     = useState('default');
  const [maxPrice, setMaxPrice] = useState(200000);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAll();
      setAll(data);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const filtered = useMemo(() => {
    let list = [...all];

    // Category
    if (category !== 'All') {
      list = list.filter(p => p.category === category.toUpperCase());
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Price cap
    list = list.filter(p => p.price <= maxPrice);

    // Sort
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name-asc')   list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [all, category, search, sort, maxPrice]);

  const globalMaxPrice = useMemo(() =>
    all.length ? Math.max(...all.map(p => p.price)) : 200000,
  [all]);

  return {
    products: filtered,
    loading,
    error,
    retry: fetchAll,
    search,   setSearch,
    category, setCategory,
    sort,     setSort,
    maxPrice, setMaxPrice,
    globalMaxPrice,
    categories: CATEGORIES,
    sortOptions: SORT_OPTIONS,
    totalCount: filtered.length,
  };
};
