import axios from 'axios';


const BASE = import.meta.env.VITE_API_BASE_URL || 'https://mileapp-backend.vercel.app/';


const api = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json' } });


api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;