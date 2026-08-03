import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MenuItemCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                    loading="lazy"
                />
                {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm bg-gray-900/80 px-3 py-1 rounded-full">
                            Sold Out
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <span className="font-bold text-red-600">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{item.description}</p>
                </div>

                <button
                    onClick={() => addToCart(item)}
                    disabled={!item.isAvailable}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white py-2 rounded-lg font-medium text-sm transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};