import { useState, useEffect } from 'react';
import { fetchMenu } from '../api/orderApi';

export const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadMenu = async () => {
            try {
                setLoading(true);
                const res = await fetchMenu();
                if (isMounted) setMenu(res.data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadMenu();
        return () => { isMounted = false; };
    }, []);

    return { menu, loading, error };
};