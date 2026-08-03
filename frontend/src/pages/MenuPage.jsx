import React from 'react';
import { useMenu } from '../hooks/useMenu';
import { MenuItemCard } from '../components/MenuItemCard';
import { Loader2 } from 'lucide-react';

export const MenuPage = () => {
    const { menu, loading, error } = useMenu();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto my-12 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
                Failed to load menu: {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Explore Delicious Menu</h1>
                <p className="text-gray-500 mt-1">Select your favorite dishes and order online.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menu.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};