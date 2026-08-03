import { useState, useEffect } from 'react';
import { getOrderDetails } from '../api/orderApi';

export const useOrderTracking = (orderId) => {
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial Order Fetch
    useEffect(() => {
        if (!orderId) return;

        let isMounted = true;
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await getOrderDetails(orderId);
                if (isMounted) {
                    setOrder(res.data);
                    setStatus(res.data.status);
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchOrder();
        return () => { isMounted = false; };
    }, [orderId]);

    // Real-Time SSE Listener
    useEffect(() => {
        if (!orderId) return;

        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const eventSource = new EventSource(`${baseURL}/orders/${orderId}/track`);

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.status) {
                    setStatus(data.status);
                    setOrder((prev) => (prev ? { ...prev, status: data.status } : prev));
                }
            } catch (err) {
                console.error('Error parsing SSE event:', err);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE Connection error:', err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [orderId]);

    return { order, status, loading, error, setStatus };
};