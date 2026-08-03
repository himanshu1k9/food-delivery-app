import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
    const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalAmount } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">

                    {/* Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="h-5 w-5 text-red-600" />
                            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">Your cart is empty</p>
                                <p className="text-gray-400 text-sm mt-1">Add items from the menu to start ordering</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="py-4 flex items-center justify-between space-x-4">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                                        <span className="text-gray-500 text-xs">${parseFloat(item.price).toFixed(2)} each</span>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-100 text-gray-600"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-100 text-gray-600"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-600 transition"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer Checkout */}
                    {cartItems.length > 0 && (
                        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 space-y-4">
                            <div className="flex justify-between text-base font-bold text-gray-900">
                                <span>Total Amount:</span>
                                <span className="text-red-600">${totalAmount}</span>
                            </div>
                            <button
                                onClick={onProceedToCheckout}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition shadow-sm"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};