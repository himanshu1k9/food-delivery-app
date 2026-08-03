import React from 'react';
import { ShoppingBag, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = ({ currentTab, setCurrentTab }) => {
    const { totalItemsCount, setIsCartOpen } = useCart();

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Brand */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentTab('menu')}>
                    <div className="bg-red-600 p-2 rounded-lg text-white">
                        <Utensils className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">CityFork</span>
                </div>

                {/* Navigation Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setCurrentTab('menu')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentTab === 'menu' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Menu
                    </button>

                    {/* Cart Icon trigger */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-gray-700 hover:text-red-600 transition"
                        aria-label="Shopping Cart"
                    >
                        <ShoppingBag className="h-6 w-6" />
                        {totalItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                {totalItemsCount}
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </header>
    );
};