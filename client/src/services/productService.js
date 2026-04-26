import axios from 'axios';

const BASE = 'https://dummyjson.com/products';
const INR  = 83.5;

// Normalize a DummyJSON product into our schema
const normalize = (p, overrides = {}) => ({
  id:          overrides.id          ?? p.id,
  title:       overrides.title       ?? p.title,
  category:    overrides.category    ?? p.category.replace('mens-', '').toUpperCase(),
  subcategory: overrides.subcategory ?? p.category,
  brand:       p.brand || 'Urban Gear',
  price:       Math.round((overrides.price ?? p.price) * INR),
  rating:      parseFloat((p.rating || 4.0).toFixed(1)),
  stock:       overrides.stock ?? (p.stock || 12),
  description: p.description,
  images:      (p.images && p.images.length > 0) ? p.images : [p.thumbnail],
  thumbnail:   p.thumbnail,
  image:       p.thumbnail,
});

/* ─────────────────────────────────────────────
   Seed 1000+ products from real base products
   by generating fit/season/fabric variants
───────────────────────────────────────────── */
const FITS    = ['Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Oversized', 'Tailored Fit'];
const SEASONS = ['SS26', 'AW25', 'SS25', 'AW24', 'Perennial'];
const FABRICS = ['Cotton Twill', 'Nylon Ripstop', 'Technical Mesh', 'Linen Blend', 'Merino Wool'];
const DROPS   = ['Field Edition', 'Urban Drop', 'Capsule Vol.1', 'Core Series', 'Limited Run'];

function expandCatalog(baseProducts, targetSize = 1200) {
  if (baseProducts.length >= targetSize) return baseProducts;

  const expanded = [...baseProducts];
  const baseLen  = baseProducts.length;
  let   idOffset = 10000;

  while (expanded.length < targetSize) {
    const base     = baseProducts[expanded.length % baseLen];
    const fit      = FITS[expanded.length % FITS.length];
    const season   = SEASONS[Math.floor(expanded.length / FITS.length) % SEASONS.length];
    const fabric   = FABRICS[Math.floor(expanded.length / 12) % FABRICS.length];
    const drop     = DROPS[Math.floor(expanded.length / 30) % DROPS.length];
    const priceVar = 0.75 + (((expanded.length * 37) % 80) / 100); // 0.75–1.55x

    expanded.push({
      ...base,
      id:    idOffset++,
      title: `${fit} ${base.title} — ${drop}`,
      price: Math.round(base.price * priceVar),
      stock: 3 + (expanded.length % 20),
      subcategory: `${base.subcategory}-${season.toLowerCase()}`,
      description: `${base.description} // ${fabric} construction. ${season} seasonal edition, ${drop}.`,
    });
  }

  return expanded.slice(0, targetSize);
}

/* ─────────────────────────────────────────────
   Fetch
───────────────────────────────────────────── */
const CATEGORIES = ['mens-shirts', 'mens-shoes', 'mens-watches', 'tops', 'sunglasses'];

const productService = {
  /* Fetch all + expand to 1000+ */
  getAll: async () => {
    try {
      const requests  = CATEGORIES.map(cat => axios.get(`${BASE}/category/${cat}?limit=50`));
      const responses = await Promise.all(requests);
      const base      = responses.flatMap(r => r.data.products).map(p => normalize(p));
      return expandCatalog(base, 1200);
    } catch (err) {
      console.error('productService.getAll failed:', err);
      return [];
    }
  },

  /* Single product — try real first, fall back to expanded catalog */
  getById: async (id) => {
    // IDs < 10000 are real DummyJSON products
    if (parseInt(id) < 10000) {
      try {
        const { data } = await axios.get(`${BASE}/${id}`);
        return normalize(data);
      } catch {}
    }
    // For seeded products, return from full catalog
    const all = await productService.getAll();
    return all.find(p => p.id === parseInt(id)) || null;
  },

  /* Hero trending (real, best photos) */
  getTrending: async (limit = 8) => {
    try {
      const { data } = await axios.get(`${BASE}/category/mens-shirts?limit=${limit}`);
      return data.products.map(p => normalize(p));
    } catch { return []; }
  },
};

export default productService;
