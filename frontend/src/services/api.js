import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
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