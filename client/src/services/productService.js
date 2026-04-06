import axiosInstance from '../api/axiosInstance';

const productService = {
  getAllProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/products/categories');
    return response.data;
  },

  getTrendingProducts: async () => {
    const response = await axiosInstance.get('/products/trending');
    return response.data;
  },
};

export default productService;
