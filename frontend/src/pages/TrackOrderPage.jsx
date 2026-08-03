import React from 'react';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { StatusSimulator } from '../components/StatusSimulator';
import { Loader2, MapPin, Phone, User, CheckCircle } from 'lucide-react';

export const TrackOrderPage = ({ orderId, onBackToMenu }) => {
    const { order, status, loading, error } = useOrderTracking(orderId);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200 text-center">
                <p className="text-red-600 font-semibold mb-4">{error || 'Order not found'}</p>
                <button
                    onClick={onBackToMenu}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    Back to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
                    <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Order Reference</span>
                        <h1 className="text-lg font-bold text-gray-900">{order.id}</h1>
                    </div>
                    <OrderStatusBadge status={status} />
                </div>

                {/* Content Grid */}
                <div className="p-6 space-y-6">
                    {/* Customer & Delivery Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl text-sm">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700 font-medium">{order.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{order.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700 truncate">{order.deliveryAddress}</span>
                        </div>
                    </div>

                    {/* Ordered Items List */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Ordered Items</h3>
                        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                            {order.items?.map((item) => (
                                <div key={item.id} className="p-3.5 flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-bold text-gray-500">{item.quantity}x</span>
                                        <span className="font-semibold text-gray-900">{item.menuDetails?.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-lg font-bold">
                        <span>Total Paid:</span>
                        <span className="text-red-600">${parseFloat(order.totalAmount).toFixed(2)}</span>
                    </div>

                    {/* Live Simulation Controls */}
                    <StatusSimulator orderId={order.id} currentStatus={status} />

                </div>

                {/* Footer actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                        onClick={onBackToMenu}
                        className="text-sm font-semibold text-red-600 hover:text-red-700 transition"
                    >
                        ← Back to Order Menu
                    </button>
                </div>

            </div>
        </div>
    );
};