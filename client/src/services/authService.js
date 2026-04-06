import axiosInstance from '../api/axiosInstance';

const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('shopsmart_token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('shopsmart_token');
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },
};

export default authService;
