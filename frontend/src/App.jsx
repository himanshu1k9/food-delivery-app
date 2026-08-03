import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { MenuPage } from './pages/MenuPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  // Persist current tab view
  const [currentTab, setCurrentTab] = useState(() => {
    return localStorage.getItem('currentTab') || 'menu';
  });

  // Persist active order ID across refreshes
  const [activeOrderId, setActiveOrderId] = useState(() => {
    return localStorage.getItem('activeOrderId') || null;
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync activeOrderId with localStorage
  useEffect(() => {
    if (activeOrderId) {
      localStorage.setItem('activeOrderId', activeOrderId);
    } else {
      localStorage.removeItem('activeOrderId');
    }
  }, [activeOrderId]);

  // Sync currentTab with localStorage
  useEffect(() => {
    localStorage.setItem('currentTab', currentTab);
  }, [currentTab]);

  const handleOrderPlaced = (orderId) => {
    setActiveOrderId(orderId);
    setCurrentTab('track');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <main className="flex-1">
          {currentTab === 'menu' && <MenuPage />}

          {currentTab === 'track' && activeOrderId && (
            <TrackOrderPage
              orderId={activeOrderId}
              onBackToMenu={() => setCurrentTab('menu')}
            />
          )}

          {currentTab === 'track' && !activeOrderId && (
            <div className="text-center py-16">
              <p className="text-gray-500">No active order to track.</p>
              <button
                onClick={() => setCurrentTab('menu')}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Go to Menu
              </button>
            </div>
          )}
        </main>

        <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={handleOrderPlaced}
        />
      </div>
    </CartProvider>
  );
}