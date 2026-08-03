import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orderApi';

export const CheckoutModal = ({ isOpen, onClose, onOrderPlaced }) => {
    const { cartItems, totalAmount, clearCart, setIsCartOpen } = useCart();

    const [formData, setFormData] = useState({
        customerName: '',
        deliveryAddress: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic frontend validation matching Joi schema rules
        if (!formData.customerName.trim() || !formData.deliveryAddress.trim()) {
            setError('Please fill in all delivery details');
            return;
        }
        if (!/^[0-9]{10}$/.test(formData.phone)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...formData,
                items: cartItems.map((item) => ({
                    menuId: item.id,
                    quantity: item.quantity,
                })),
            };

            const response = await placeOrder(payload);

            clearCart();
            setIsCartOpen(false);
            onClose();
            onOrderPlaced(response.data.id); // Triggers navigation to Order Track view
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-1">Checkout Details</h2>
                <p className="text-sm text-gray-500 mb-6">Enter your information to complete the order.</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Himanshu Kumar"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Delivery Address</label>
                        <textarea
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            placeholder="Flat 402, Building A, Pune, Maharashtra"
                            rows="2"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-xs text-gray-500 block">Total Payable</span>
                            <span className="text-xl font-bold text-red-600">${totalAmount}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition flex items-center space-x-2"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>{loading ? 'Placing Order...' : 'Confirm Order'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};