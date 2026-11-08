'use client';

import React, { useState, useMemo } from 'react';
import { Order, OrderStatus } from '@/lib/types';

interface AdminOrdersTabProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => Promise<void>;
  searchQuery: string;
}

export default function AdminOrdersTab({
  orders,
  onUpdateStatus,
  searchQuery,
}: AdminOrdersTabProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = (o.id || o.orderNumber || '').toLowerCase().includes(q);
        const matchName = o.customerName?.toLowerCase().includes(q);
        const matchPhone = o.customerPhone?.toLowerCase().includes(q);
        const matchCity = o.shippingAddress?.city?.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchPhone && !matchCity) return false;
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      {/* 4 Orders KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Pending Rush</span>
            <span className="material-symbols-outlined text-[16px] text-[#a2004e]">hourglass_top</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#a2004e]">
            {pendingCount} Orders
          </div>
          <span className="text-[11px] text-[#707971]">Needs urgent packing</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Processing / Packing</span>
            <span className="material-symbols-outlined text-[16px] text-[#feae32]">inventory</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#835400]">
            {processingCount} Orders
          </div>
          <span className="text-[11px] text-[#707971]">Ready for Bluedart dispatch</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Out for Delivery</span>
            <span className="material-symbols-outlined text-[16px] text-[#1f5c3a]">local_shipping</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#1f5c3a]">
            {shippedCount} Orders
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">Kerala Express</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between text-[#707971] text-xs font-semibold mb-1">
            <span>Delivered</span>
            <span className="material-symbols-outlined text-[16px] text-emerald-600">done_all</span>
          </div>
          <div className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#211a16]">
            {deliveredCount} Orders
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">98.2% Satisfaction</span>
        </div>
      </div>

      {/* Orders Filter & Controls */}
      <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: `All (${orders.length})` },
              { id: 'Pending', label: `Pending (${pendingCount})` },
              { id: 'Processing', label: `Processing (${processingCount})` },
              { id: 'Shipped', label: `Shipped (${shippedCount})` },
              { id: 'Delivered', label: `Delivered (${deliveredCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-['DM_Sans'] font-semibold whitespace-nowrap transition-all ${
                  statusFilter === tab.id
                    ? 'bg-[#1f5c3a] text-white shadow-[1px_1px_0px_#211a16]'
                    : 'bg-[#fff8f5] text-[#404942] hover:bg-[#ede0d9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#707971] font-['DM_Sans'] shrink-0">
            Showing {filteredOrders.length} orders
          </span>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#ede0d9]">
          <table className="w-full text-left text-xs font-['DM_Sans']">
            <thead className="bg-[#fff8f5] text-[#707971] uppercase tracking-wider font-bold text-[10px] border-b border-[#ede0d9]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede0d9] bg-white">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-[#fff8f5] transition-colors">
                  {/* Order ID & Date */}
                  <td className="py-3.5 px-4">
                    <span className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#211a16] block">
                      #{o.orderNumber || o.id}
                    </span>
                    <span className="text-[11px] text-[#707971]">
                      {new Date(o.createdAt || Date.now()).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#211a16]">
                      {o.customerName || 'Kerala Customer'}
                    </div>
                    <div className="text-[11px] text-[#707971] flex items-center gap-1">
                      <span>{o.customerPhone}</span>
                      <span>•</span>
                      <span className="font-semibold text-[#1f5c3a]">
                        {o.shippingAddress?.city || 'Kochi'}
                      </span>
                    </div>
                  </td>

                  {/* Items */}
                  <td className="py-3.5 px-4">
                    <div className="text-xs text-[#211a16] font-medium max-w-[200px] truncate">
                      {o.items?.map((it) => `${it.productName || 'Item'} (x${it.quantity})`).join(', ')}
                    </div>
                    <span className="text-[10px] text-[#707971]">
                      {o.items?.reduce((sum, i) => sum + i.quantity, 0)} items total
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4">
                    <div className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#1f5c3a]">
                      ₹{o.total}
                    </div>
                    <span className="text-[10px] bg-[#fff8f5] border border-[#ede0d9] px-1.5 py-0.5 rounded text-[#707971]">
                      {o.paymentMethod || 'UPI'}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-['Bricolage_Grotesque'] font-bold px-2 py-0.5 rounded-full capitalize ${
                        o.status === 'Delivered'
                          ? 'bg-[#b1f1c4] text-[#00210f]'
                          : o.status === 'Shipped'
                          ? 'bg-[#ffddb5] text-[#835400]'
                          : o.status === 'Processing'
                          ? 'bg-[#ede0d9] text-[#211a16]'
                          : o.status === 'Pending'
                          ? 'bg-[#ffd9e1] text-[#a2004e]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {o.status === 'Pending' && (
                        <button
                          onClick={() => onUpdateStatus(o.id, 'Processing')}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#1f5c3a] text-white hover:bg-[#14462b]"
                          title="Confirm & Pack"
                        >
                          Pack
                        </button>
                      )}
                      {o.status === 'Processing' && (
                        <button
                          onClick={() => onUpdateStatus(o.id, 'Shipped')}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#feae32] text-[#211a16] hover:bg-[#e59d28]"
                          title="Dispatch Rider"
                        >
                          Ship
                        </button>
                      )}
                      {o.status === 'Shipped' && (
                        <button
                          onClick={() => onUpdateStatus(o.id, 'Delivered')}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                          title="Mark Delivered"
                        >
                          Deliver
                        </button>
                      )}

                      {/* WhatsApp Ping */}
                      <a
                        href={`https://wa.me/91${(o.customerPhone || '').replace(/\D/g, '')}?text=${encodeURIComponent(
                          `നമസ്കാരം ${o.customerName}! ഹാത്കെയിൽ നിന്നുള്ള ഓർഡർ #${o.orderNumber || o.id} സുരക്ഷിതമായി പുറപ്പെട്ടിരിക്കുന്നു.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Ping on WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
