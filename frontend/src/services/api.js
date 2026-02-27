import axios from 'axios';

const getBaseURL = () => {
    // For production builds, use the environment variable or construct from current domain
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    
    // Fallback to current domain with /api path
    if (typeof window !== 'undefined') {
        return `${window.location.origin}/api`;
    }
    
    // Development fallback
    return 'http://localhost:8080/api';
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token later if you implement JWT
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export const register = (data) => api.post('/users/register', data);
export const login = (data) => api.post('/users/login', data);
export const getBalance = (upiId) => api.get(`/wallet/${upiId}`);
export const addMoney = (data) => api.post('/wallet/add', data);
export const sendMoney = (data) => api.post('/transaction/send', data);
export const getHistory = (upiId) => api.get(`/transaction/history/${upiId}`);