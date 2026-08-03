import React, { useState } from 'react';
import { updateOrderStatus } from '../api/orderApi';
import { Loader2, RefreshCw } from 'lucide-react';

const statuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

export const StatusSimulator = ({ orderId, currentStatus }) => {
    const [updating, setUpdating] = useState(false);

    const handleStatusChange = async (newStatus) => {
        try {
            setUpdating(true);
            await updateOrderStatus(orderId, newStatus);
        } catch (err) {
            alert('Simulation failed: ' + err.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 mt-6">
            <div className="flex items-center space-x-2 mb-2 text-amber-900 font-semibold text-sm">
                <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} />
                <span>Live Backend Simulator (Assessment Feature)</span>
            </div>
            <p className="text-xs text-amber-700 mb-3">
                Click a status button below to trigger real-time Server-Sent Events (SSE) updates:
            </p>

            <div className="flex flex-wrap gap-2">
                {statuses.map((st) => (
                    <button
                        key={st}
                        disabled={updating || currentStatus === st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${currentStatus === st
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
                            }`}
                    >
                        {st}
                    </button>
                ))}
            </div>
        </div>
    );
};