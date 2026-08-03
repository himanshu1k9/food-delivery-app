import React from 'react';
import { CheckCircle2, Clock, Truck, Package, XCircle } from 'lucide-react';

const statusConfig = {
    'Order Received': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    'Preparing': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Package },
    'Out for Delivery': { color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Truck },
    'Delivered': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    'Cancelled': { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
};

export const OrderStatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig['Order Received'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
            <Icon className="h-3.5 w-3.5" />
            <span>{status}</span>
        </span>
    );
};