import api from './axios';

export const fetchMenu = () => api.get('/menu');

export const placeOrder = (orderData) => api.post('/orders', orderData);

export const getOrderDetails = (orderId) => api.get(`/orders/${orderId}`);

// Simulation endpoint to update status manually from UI
export const updateOrderStatus = (orderId, status) =>
    api.put(`/orders/${orderId}/status`, { status });