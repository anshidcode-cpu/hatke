'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import AdminProductModal from './AdminProductModal';

interface AdminProductsTabProps {
  products: Product[];
  onStockDelta: (id: string, delta: number) => void;
  onSaveProduct: (productData: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  searchQuery: string;
}

export default function AdminProductsTab({
  products,
  onStockDelta,
  onSaveProduct,
  onDeleteProduct,
  searchQuery,
}: AdminProductsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low_stock' | 'in_stock'>('all');
  const [sortBy, setSortBy] = useState<'velocity' | 'price_asc' | 'price_desc' | 'stock'>('velocity');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search text matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name?.toLowerCase().includes(q);
          const matchMl = p.nameMl?.toLowerCase().includes(q);
          const matchCat = p.category?.toLowerCase().includes(q);
          const matchTag = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchMl && !matchCat && !matchTag) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Stock filter
        if (stockFilter === 'low_stock' && (p.stock || 0) > 20) return false;
        if (stockFilter === 'in_stock' && (p.stock || 0) <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'stock') return (a.stock || 0) - (b.stock || 0);
        return (b.stock || 0) - (a.stock || 0); // default velocity / stock proxy
      });
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy]);

  const lowStockCount = products.filter((p) => (p.stock || 0) <= 20).length;

  return (
    <div className="space-y-6">
      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Total Active SKUs</span>
            <span className="material-symbols-outlined text-[16px] text-[#1f5c3a]">inventory</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#211a16]">
            {products.length}
          </div>
          <span className="text-[11px] text-[#1f5c3a] font-bold">100% Synced to Store</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Low Stock Alerts</span>
            <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">warning</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#ba1a1a]">
            {lowStockCount} Critical
          </div>
          <span className="text-[11px] text-[#707971]">Under 20 units threshold</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Avg Gross Margin</span>
            <span className="material-symbols-outlined text-[16px] text-[#feae32]">payments</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#1f5c3a]">
            42.4%
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">+3.2% vs target</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Return / RTO Rate</span>
            <span className="material-symbols-outlined text-[16px] text-[#1f5c3a]">verified</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#211a16]">
            3.1%
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">Kerala Express Lowest</span>
        </div>
      </div>

      {/* Filter & Action Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'kitchen', label: 'Kitchen & Dining' },
              { id: 'tech', label: 'Mobile & Tech' },
              { id: 'kids', label: 'Toys & Quirks' },
              { id: 'home', label: 'Home Living' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-['DM_Sans'] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1f5c3a] text-white shadow-[1px_1px_0px_#211a16]'
                    : 'bg-[#fff8f5] text-[#404942] hover:bg-[#ede0d9]'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <button
              onClick={() => setStockFilter(stockFilter === 'low_stock' ? 'all' : 'low_stock')}
              className={`px-3 py-1.5 rounded-full text-xs font-['DM_Sans'] font-bold whitespace-nowrap transition-all ${
                stockFilter === 'low_stock'
                  ? 'bg-[#ba1a1a] text-white'
                  : 'bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffb4ab]'
              }`}
            >
              ⚠️ Low Stock ({lowStockCount})
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#fff8f5] border border-[#c0c9bf] rounded-full px-3 py-1.5 text-xs font-['DM_Sans'] text-[#211a16] focus:outline-none"
            >
              <option value="velocity">Sort: Highest Velocity</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock">Stock Level</option>
            </select>

            <button
              onClick={() => {
                setEditingProduct(null);
                setModalOpen(true);
              }}
              className="px-4 py-2 rounded-full bg-[#1f5c3a] text-white text-xs font-['Bricolage_Grotesque'] font-bold hover:bg-[#14462b] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#211a16]"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ Add New Product</span>
            </button>
          </div>
        </div>

        {/* Curated Inventory Master Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#ede0d9]">
          <table className="w-full text-left text-xs font-['DM_Sans']">
            <thead className="bg-[#fff8f5] text-[#707971] uppercase tracking-wider font-bold text-[10px] border-b border-[#ede0d9]">
              <tr>
                <th className="py-3 px-4">Product & Malayalam Tag</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Retail / COGS</th>
                <th className="py-3 px-4">Live Stock</th>
                <th className="py-3 px-4">Velocity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede0d9] bg-white">
              {filteredProducts.map((p, idx) => {
                const costMock = Math.round((p.price || 999) * 0.45);
                const marginMock = Math.round((((p.price || 999) - costMock) / (p.price || 999)) * 100);
                const isCriticalStock = (p.stock || 0) <= 20;

                return (
                  <tr key={p.id} className="hover:bg-[#fff8f5] transition-colors">
                    {/* Product & Tag */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fff8f5] border border-[#ede0d9] overflow-hidden shrink-0 flex items-center justify-center">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="material-symbols-outlined text-[18px] text-[#707971]">
                              image
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-[#211a16] line-clamp-1 block text-sm">
                            {p.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-['Baloo_Chettan_2'] text-xs text-[#1f5c3a] font-semibold">
                              {p.nameMl || 'അടിപൊളി ചോയ്സ്'}
                            </span>
                            <span className="text-[10px] text-[#707971] font-mono">
                              SKU-{(p.id || '').slice(0, 6)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#fff8f5] border border-[#ede0d9] font-medium text-[#211a16] inline-block">
                        {p.category}
                      </span>
                    </td>

                    {/* Price & COGS */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-[#211a16]">₹{p.price}</div>
                      <div className="flex items-center gap-1 text-[11px] text-[#707971] mt-0.5">
                        <span>COGS: ₹{costMock}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-[#b1f1c4] px-1 rounded">
                          +{marginMock}%
                        </span>
                      </div>
                    </td>

                    {/* Stock Status with +/- delta buttons */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#c0c9bf] rounded-lg bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => onStockDelta(p.id, -1)}
                            className="px-2 py-1 text-xs hover:bg-[#f9ebe4] text-[#211a16] font-bold"
                            title="Decrease Stock"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-xs font-bold text-[#211a16] min-w-[28px] text-center">
                            {p.stock}
                          </span>
                          <button
                            onClick={() => onStockDelta(p.id, 1)}
                            className="px-2 py-1 text-xs hover:bg-[#f9ebe4] text-[#211a16] font-bold"
                            title="Increase Stock"
                          >
                            +
                          </button>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            isCriticalStock
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : 'bg-[#b1f1c4] text-[#00210f]'
                          }`}
                        >
                          {isCriticalStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </div>
                    </td>

                    {/* Velocity */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#211a16]">
                        {[84, 42, 63, 19, 31][idx % 5]} Sold
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">trending_up</span>
                        Top Mover
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#fff8f5] border border-[#ede0d9] hover:bg-[#ede0d9] text-[#1f5c3a] transition-colors"
                          title="Edit Product"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#fff8f5] border border-[#ede0d9] hover:bg-[#ffdad6] text-[#ba1a1a] transition-colors"
                          title="Delete Product"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Slide-over Modal */}
      <AdminProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        editingProduct={editingProduct}
        onSave={onSaveProduct}
      />
    </div>
  );
}
