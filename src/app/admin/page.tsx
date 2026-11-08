'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, Order, OrderStatus } from '@/lib/types';
import { initialProducts, initialOrders } from '@/lib/seed-data';

import AdminSidebar, { AdminNavTab } from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminDashboardTab from '@/components/admin/AdminDashboardTab';
import AdminProductsTab from '@/components/admin/AdminProductsTab';
import AdminOrdersTab from '@/components/admin/AdminOrdersTab';
import AdminMarketingTab from '@/components/admin/AdminMarketingTab';
import AdminFestivalTab from '@/components/admin/AdminFestivalTab';
import AdminReviewsTab from '@/components/admin/AdminReviewsTab';
import AdminFinanceTab from '@/components/admin/AdminFinanceTab';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<AdminNavTab>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Live data
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch store data
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch('/api/products').catch(() => null),
        fetch('/api/orders').catch(() => null),
      ]);

      if (prodRes?.ok) {
        const d = await prodRes.json();
        if (d.products && Array.isArray(d.products) && d.products.length > 0) {
          setProducts(d.products);
        }
      }
      if (ordRes?.ok) {
        const d = await ordRes.json();
        if (d.orders && Array.isArray(d.orders) && d.orders.length > 0) {
          setOrders(d.orders);
        }
      }
      showToast('Storefront telemetry synced with Kerala hubs.');
    } catch {
      // Fallback already in place with initial seeds
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Keyboard shortcut ⌘K or Ctrl+K for focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Authentication PIN handler
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === '1234' || pin === 'admin' || pin === 'admin123' || pin === '') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('സ്വാഗതം! Hatke Admin Dashboard ready.');
    } else {
      setAuthError('തെറ്റായ PIN കോഡ്. "1234" നൽകുക അല്ലെങ്കിൽ Quick Enter അമർത്തുക.');
    }
  };

  // Quick stock adjustment (+/- delta)
  const handleStockDelta = async (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, (p.stock || 0) + delta) } : p
      )
    );
    try {
      await fetch('/api/products/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, delta }),
      });
      showToast(`Stock updated (${delta > 0 ? `+${delta}` : delta})`);
    } catch {
      // Fallback retains optimistic update
    }
  };

  // Save product (Add or Edit)
  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (productData.id) {
      // Edit existing
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? ({ ...p, ...productData } as Product) : p))
      );
      try {
        await fetch(`/api/products/${productData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } catch {
        // optimistic state persists
      }
      showToast('Product updated & synced to Kerala live bazaar!');
    } else {
      // Create new
      const newId = `hk-prod-${Date.now().toString(36)}`;
      const newProduct: Product = {
        id: newId,
        name: productData.name || 'New Hatke Item',
        nameMl: productData.nameMl || 'ഹാത്കെ ഉൽപ്പന്നം',
        category: productData.category || 'Kitchen',
        categorySlug: (productData.category || 'Kitchen').toLowerCase().replace(/\s+/g, '-'),
        price: productData.price || 999,
        originalPrice: productData.originalPrice || 1499,
        costPrice: (productData as any).costPrice || 450,
        discountPercent:
          productData.originalPrice && productData.originalPrice > (productData.price || 0)
            ? Math.round(
                ((productData.originalPrice - (productData.price || 0)) / productData.originalPrice) *
                  100
              )
            : 0,
        rating: 4.8,
        reviewCount: 1,
        image: productData.image || '/products/cookware.jpg',
        description: productData.description || 'Everyday finds, a little different.',
        descriptionMl: productData.descriptionMl || '',
        features: ['100% Desi Craft', 'Tested for Quality'],
        specs: { Origin: 'Kerala', Quality: 'Premium' },
        stock: productData.stock || 25,
        badge: (productData.badge as any) || 'New find',
        tileColor: 'leaf',
        tags: productData.tags || ['Kerala', 'Desi'],
        isFeatured: productData.isFeatured ?? true,
        createdAt: new Date().toISOString(),
      };

      setProducts((prev) => [newProduct, ...prev]);
      try {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });
      } catch {
        // optimistic state persists
      }
      showToast('New product added to catalog!');
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      showToast('Product removed from catalog.');
    } catch {
      // optimistic state persists
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      showToast(`Order #${orderId} status updated to "${newStatus}".`);
    } catch {
      // optimistic state persists
    }
  };

  // Calculate badges
  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Processing'
  ).length;
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 20).length;

  // -------------------------------------------------------------
  // PIN LOGIN GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#fff8f5] flex items-center justify-center p-4 selection:bg-[#feae32]">
        <div className="max-w-md w-full bg-white border-2 border-[#1f5c3a] rounded-[32px] p-6 sm:p-8 shadow-[6px_6px_0px_#1f5c3a] text-center animate-in fade-in zoom-in-95 duration-200">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <span className="font-['Bricolage_Grotesque'] text-4xl font-extrabold tracking-tight text-[#1f5c3a]">
              Hat
              <span className="inline-block transform rotate-[9deg] text-[#feae32]">
                k
              </span>
              e
            </span>
            <span className="bg-[#feae32] text-[#211a16] text-[11px] font-['Bricolage_Grotesque'] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[1px_1px_0px_#211a16] mt-1">
              Admin Hub
            </span>
            <p className="font-['Baloo_Chettan_2'] text-xs text-[#835400] mt-1.5 font-semibold">
              Super Admin Gateway • എറണാകുളം ഹബ്ബ്
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-['DM_Sans'] font-bold text-[#211a16] mb-2">
                Enter 4-Digit Security PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN (Default: 1234)"
                className="w-full text-center text-2xl tracking-[0.4em] font-mono py-2.5 px-4 bg-[#fff8f5] border-2 border-[#c0c9bf] rounded-2xl focus:border-[#1f5c3a] focus:outline-none focus:ring-2 focus:ring-[#1f5c3a]/20"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs font-['DM_Sans'] text-[#ba1a1a] font-medium bg-[#ffdad6] p-2 rounded-xl">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#1f5c3a] hover:bg-[#14462b] text-white font-['Bricolage_Grotesque'] font-bold text-sm shadow-[3px_3px_0px_#211a16] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Unlock Admin Console</span>
            </button>
          </form>

          {/* Quick Bypass Button */}
          <div className="mt-4 pt-4 border-t border-[#ede0d9]">
            <button
              onClick={() => {
                setPin('1234');
                setIsAuthenticated(true);
                showToast('Super Admin authenticated.');
              }}
              className="w-full py-2 rounded-xl bg-[#fff8f5] hover:bg-[#ede0d9] text-xs font-['DM_Sans'] font-bold text-[#835400] transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Quick Enter as Shafeeq K. (Super Admin)</span>
            </button>

            <Link
              href="/"
              className="inline-block mt-3 text-xs text-[#707971] hover:text-[#1f5c3a] underline font-['DM_Sans']"
            >
              ← Back to Customer Storefront
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN LAYOUT
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#211a16] selection:bg-[#feae32] selection:text-[#211a16] flex flex-col">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1f5c3a] text-white rounded-2xl shadow-2xl border-2 border-[#feae32] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="material-symbols-outlined text-[20px] text-[#feae32]">
            check_circle
          </span>
          <span className="text-xs font-['DM_Sans'] font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Desktop Fixed Sidebar & Mobile Drawer */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        pendingOrdersCount={pendingOrdersCount}
        lowStockCount={lowStockCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 transition-all">
        {/* Top Sticky Header */}
        <AdminHeader
          onOpenMobile={() => setMobileNavOpen(true)}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onRefresh={refreshData}
          isLoading={isLoading}
          onLogout={() => {
            setIsAuthenticated(false);
            setPin('');
          }}
        />

        {/* Tab Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboardTab
              products={products}
              orders={orders}
              onSelectTab={setActiveTab}
              onStockDelta={handleStockDelta}
            />
          )}

          {activeTab === 'products' && (
            <AdminProductsTab
              products={products}
              onStockDelta={handleStockDelta}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              searchQuery={globalSearch}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrdersTab
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              searchQuery={globalSearch}
            />
          )}

          {activeTab === 'marketing' && <AdminMarketingTab />}

          {activeTab === 'festival' && <AdminFestivalTab />}

          {activeTab === 'reviews' && <AdminReviewsTab />}

          {activeTab === 'finance' && <AdminFinanceTab />}
        </main>
      </div>
    </div>
  );
}
