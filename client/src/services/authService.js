import axiosInstance from '../api/axiosInstance';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('urbangear_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('urbangear_token');
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },
};

export default authService;
