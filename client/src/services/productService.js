import axiosInstance from '../api/axiosInstance';

const dummyProducts = [
    { id: 1, name: 'Tech-Shell CoreV2', price: 289, category: 'Outerwear', image: '/assets/tech-jacket.png' },
    { id: 2, name: 'Neon Matrix Joggers', price: 149, category: 'Bottoms', image: '/assets/neon-joggers.png' },
    { id: 3, name: 'Tactical Utility Chest', price: 89, category: 'Accessories', image: '/assets/chest-bag.png' },
    { id: 4, name: 'Stealth Knit Hoodie', price: 120, category: 'Tops', image: '/assets/stealth-hoodie.png' },
    { id: 5, name: 'Thermal Base Layer', price: 65, category: 'Tops', image: '/assets/thermal-base.png' },
    { id: 6, name: 'Grid-Lock Sneakers', price: 195, category: 'Accessories', image: '/assets/cargo-pants.png' }, 
    { id: 7, name: 'Urban Cargo V3', price: 160, category: 'Bottoms', image: '/assets/cargo-pants.png' },
    { id: 8, name: 'Elite Tactical Vest', price: 210, category: 'Outerwear', image: '/assets/tactical-vest.png' }
];

const productService = {
  getAllProducts: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/products', { params });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, falling back to dummy data');
      return dummyProducts;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, falling back to dummy data');
      return dummyProducts.find(p => p.id === parseInt(id)) || dummyProducts[0];
    }
  },

  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/products/categories');
      return response.data;
    } catch (error) {
      return ['All Units', 'Outerwear', 'Tops', 'Bottoms', 'Accessories'];
    }
  },

  getTrendingProducts: async () => {
    const response = await axiosInstance.get('/products/trending');
    return response.data;
  },
};

export default productService;
