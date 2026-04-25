import apiClient from './api';

const authService = {
  register: (username, email, password, confirmPassword) => {
    return apiClient.post('/auth/register', {
      username,
      email,
      password,
      confirmPassword,
    });
  },

  login: (username, password) => {
    return apiClient.post('/auth/login', {
      username,
      password,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
