import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;