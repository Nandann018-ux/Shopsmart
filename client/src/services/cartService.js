import axiosInstance from '../api/axiosInstance';

const cartService = {
  getCart: async () => {
    const response = await axiosInstance.get('/cart');
    return response.data;
  },

  addItem: async (item) => {
    const response = await axiosInstance.post('/cart/items', item);
    return response.data;
  },

  updateItem: async (id, quantity) => {
    const response = await axiosInstance.put(`/cart/items/${id}`, { quantity });
    return response.data;
  },

  removeItem: async (id) => {
    const response = await axiosInstance.delete(`/cart/items/${id}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await axiosInstance.delete('/cart');
    return response.data;
  },
};

export default cartService;
