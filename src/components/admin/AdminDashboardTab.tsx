'use client';

import React from 'react';
import { Product, Order } from '@/lib/types';
import { AdminNavTab } from './AdminSidebar';

interface AdminDashboardTabProps {
  products: Product[];
  orders: Order[];
  onSelectTab: (tab: AdminNavTab) => void;
  onStockDelta: (id: string, delta: number) => void;
  onQuickRestock?: (id: string) => void;
}

export default function AdminDashboardTab({
  products,
  orders,
  onSelectTab,
  onStockDelta,
}: AdminDashboardTabProps) {
  const pendingOrders = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Processing'
  );

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Summary Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-[#fff1ea] rounded-3xl border border-[#ede0d9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1f5c3a] text-white text-[11px] font-['Bricolage_Grotesque'] font-bold tracking-wider uppercase">
              LIVE BAZAAR METRICS
            </span>
            <span className="text-xs text-[#835400] font-['Baloo_Chettan_2'] font-semibold">
              വിഷു ഉത്സവം സ്പെഷ്യൽ ലൈവ്
            </span>
          </div>
          <h2 className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] tracking-tight">
            Kerala Hub Daily Command Center
          </h2>
          <p className="text-xs sm:text-sm text-[#404942] font-['DM_Sans']">
            Real-time telemetry from Cochin central warehouse and Travancore/Malabar express routes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('orders')}
            className="px-4 py-2 rounded-full bg-[#1f5c3a] text-white text-xs font-['DM_Sans'] font-bold hover:bg-[#14462b] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#211a16]"
          >
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>View Rush Orders ({pendingOrders.length})</span>
          </button>
          <button
            onClick={() => onSelectTab('festival')}
            className="px-4 py-2 rounded-full bg-[#feae32] text-[#211a16] text-xs font-['DM_Sans'] font-bold hover:bg-[#e59d28] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#211a16]"
          >
            <span className="material-symbols-outlined text-[16px]">celebration</span>
            <span>Festival Themes</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Daily Gross Sales with Circular Progress */}
        <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-['DM_Sans'] text-[#707971] uppercase tracking-wider font-semibold">
                Daily Gross Sales
              </span>
              <h3 className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#211a16] mt-1">
                ₹1,84,320
              </h3>
              <p className="text-[11px] text-[#707971] font-['DM_Sans']">
                Target: ₹2,20,000 (83.7%)
              </p>
            </div>
            {/* SVG Ring Progress */}
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#f9ebe4"
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#1f5c3a"
                  strokeWidth="3.5"
                  strokeDasharray="88"
                  strokeDashoffset="14"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-['Bricolage_Grotesque'] font-extrabold text-[#1f5c3a]">
                84%
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#f9ebe4] flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +18.4% vs y'day
            </span>
            <span className="text-[#707971] font-medium">342 Orders</span>
          </div>
        </div>

        {/* Card 2: Net Margin (Vazhayila Green) */}
        <div className="p-5 rounded-3xl bg-[#004425] text-white shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['DM_Sans'] text-[#94d2a7] uppercase tracking-wider font-semibold">
                Net Profit Margin
              </span>
              <span className="w-8 h-8 rounded-full bg-[#1f5c3a] flex items-center justify-center text-[#94d2a7]">
                <span className="material-symbols-outlined text-[18px]">percent</span>
              </span>
            </div>
            <h3 className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-white mt-1">
              34.8%
            </h3>
            <p className="text-xs text-[#94d2a7] font-['DM_Sans'] mt-0.5">
              ₹64,143 realized net profit today
            </p>
          </div>
          <div className="relative z-10 mt-4 pt-3 border-t border-[#1f5c3a] flex items-center justify-between text-xs text-[#94d2a7]">
            <span className="flex items-center gap-0.5 text-[#feae32] font-bold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              +4.2% this week
            </span>
            <span>COGS: 41.5%</span>
          </div>
        </div>

        {/* Card 3: Ad ROAS (Rani Pink) */}
        <div className="p-5 rounded-3xl bg-[#a2004e] text-white shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['DM_Sans'] text-[#ffadc2] uppercase tracking-wider font-semibold">
                Ad Blended ROAS
              </span>
              <span className="w-8 h-8 rounded-full bg-[#780038] flex items-center justify-center text-[#ffadc2]">
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </span>
            </div>
            <h3 className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-white mt-1">
              4.1x
            </h3>
            <p className="text-xs text-[#ffadc2] font-['DM_Sans'] mt-0.5">
              Meta ₹14,200 spend → ₹58,220 sales
            </p>
          </div>
          <div className="relative z-10 mt-4 pt-3 border-t border-[#780038] flex items-center justify-between text-xs text-[#ffadc2]">
            <span>CAC: ₹84 / buyer</span>
            <span className="font-bold text-[#feae32]">Meta + Google</span>
          </div>
        </div>

        {/* Card 4: Order Fulfillment Velocity */}
        <div className="p-5 rounded-3xl bg-[#feae32] text-[#211a16] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-['DM_Sans'] text-[#211a16]/80 uppercase tracking-wider font-bold">
                Orders To Pack Rush
              </span>
              <span className="w-8 h-8 rounded-full bg-[#211a16] text-[#feae32] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </span>
            </div>
            <h3 className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] mt-1">
              18 Orders
            </h3>
            <p className="text-xs text-[#211a16]/80 font-['DM_Sans'] mt-0.5">
              Bluedart & Kerala Post Express cutoff 6 PM
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#211a16]/20 flex items-center justify-between text-xs">
            <span className="font-bold text-[#211a16]">97.6% on-time SLA</span>
            <button
              onClick={() => onSelectTab('orders')}
              className="text-xs font-bold underline hover:opacity-80"
            >
              Start Packing →
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section: Donut Breakdown + Winning Products Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Volume Donut (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
                Category Volume Mix
              </h3>
              <span className="text-xs text-[#707971] font-['DM_Sans']">Today's Dispatch</span>
            </div>

            {/* Visual SVG Donut Chart */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Segment 1: Kitchen 38% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#1f5c3a"
                    strokeWidth="14"
                    strokeDasharray="90.7 238.7"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Tech 27% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#feae32"
                    strokeWidth="14"
                    strokeDasharray="64.4 238.7"
                    strokeDashoffset="-90.7"
                  />
                  {/* Segment 3: Kids 21% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#a2004e"
                    strokeWidth="14"
                    strokeDasharray="50.1 238.7"
                    strokeDashoffset="-155.1"
                  />
                  {/* Segment 4: Home 14% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#835400"
                    strokeWidth="14"
                    strokeDasharray="33.4 238.7"
                    strokeDashoffset="-205.2"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16]">
                    342
                  </span>
                  <span className="text-[10px] uppercase font-['DM_Sans'] text-[#707971] font-semibold">
                    Units Sold
                  </span>
                </div>
              </div>
            </div>

            {/* Legend pills */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#fff8f5] border border-[#ede0d9]">
                <div className="w-3 h-3 rounded-full bg-[#1f5c3a]" />
                <div className="text-xs font-['DM_Sans']">
                  <span className="font-bold text-[#211a16]">Kitchen (38%)</span>
                  <span className="text-[#707971] block text-[10px]">130 orders</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#fff8f5] border border-[#ede0d9]">
                <div className="w-3 h-3 rounded-full bg-[#feae32]" />
                <div className="text-xs font-['DM_Sans']">
                  <span className="font-bold text-[#211a16]">Tech (27%)</span>
                  <span className="text-[#707971] block text-[10px]">92 orders</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#fff8f5] border border-[#ede0d9]">
                <div className="w-3 h-3 rounded-full bg-[#a2004e]" />
                <div className="text-xs font-['DM_Sans']">
                  <span className="font-bold text-[#211a16]">Kids & Toys (21%)</span>
                  <span className="text-[#707971] block text-[10px]">72 orders</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#fff8f5] border border-[#ede0d9]">
                <div className="w-3 h-3 rounded-full bg-[#835400]" />
                <div className="text-xs font-['DM_Sans']">
                  <span className="font-bold text-[#211a16]">Home & Living (14%)</span>
                  <span className="text-[#707971] block text-[10px]">48 orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Winning Products Velocity List (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
                Winning Products Velocity
              </h3>
              <p className="text-xs text-[#707971] font-['DM_Sans']">
                Fastest-moving items across Kerala district clusters
              </p>
            </div>
            <button
              onClick={() => onSelectTab('products')}
              className="text-xs font-['DM_Sans'] font-bold text-[#1f5c3a] hover:underline flex items-center gap-1"
            >
              All SKUs ({products.length})
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Top 4 high velocity items */}
            {products.slice(0, 4).map((p, idx) => {
              const isCriticalStock = (p.stock || 0) <= 25;
              const soldMock = [142, 98, 84, 61][idx] || 45;

              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] hover:bg-[#fff1ea] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1f5c3a] text-white text-xs font-['Bricolage_Grotesque'] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-['DM_Sans'] font-bold text-[#211a16] line-clamp-1">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-['Baloo_Chettan_2'] text-xs text-[#1f5c3a] font-semibold">
                          {p.nameMl || 'അടിപൊളി ചോയ്സ്'}
                        </span>
                        <span className="text-[11px] text-[#707971]">
                          ₹{p.price} • {p.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#211a16] block">
                        {soldMock} Sold Today
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block ${
                          isCriticalStock
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#b1f1c4] text-[#00210f]'
                        }`}
                      >
                        {isCriticalStock ? `Low Stock (${p.stock})` : `${p.stock} Ready`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onStockDelta(p.id, 5)}
                        className="px-2 py-1 text-xs font-bold rounded-lg bg-white border border-[#c0c9bf] hover:bg-[#f9ebe4] text-[#1f5c3a] transition-colors"
                        title="Quick Restock +5"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Kerala Map Dispatch & Live Orders Feed */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#1f5c3a]">
                map
              </span>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
                Live Kerala Orders Dispatch Map & Telemetry
              </h3>
            </div>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Express hub delivery SLAs across Malabar, Central Kochi, and Travancore
            </p>
          </div>
          <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-emerald-800 bg-[#b1f1c4] px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            98.1% Kerala Delivery SLA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hub Status Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                city: 'Kochi Hub (HQ)',
                cityMl: 'കൊച്ചി സെൻട്രൽ',
                orders: 142,
                sla: '4.2 hrs',
                status: 'Express Route Active',
                color: 'border-l-4 border-l-[#1f5c3a]',
              },
              {
                city: 'Kozhikode (Malabar)',
                cityMl: 'കോഴിക്കോട്',
                orders: 94,
                sla: '5.1 hrs',
                status: 'Evening Rush Transit',
                color: 'border-l-4 border-l-[#feae32]',
              },
              {
                city: 'Thiruvananthapuram',
                cityMl: 'തിരുവനന്തപുരം',
                orders: 76,
                sla: '4.8 hrs',
                status: 'Air Cargo Dispatched',
                color: 'border-l-4 border-l-[#a2004e]',
              },
              {
                city: 'Bengaluru Express',
                cityMl: 'ബെംഗളൂരു റൂട്ട്',
                orders: 52,
                sla: '8.4 hrs',
                status: 'Interstate Overnight',
                color: 'border-l-4 border-l-[#835400]',
              },
            ].map((hub, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] ${hub.color}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-['DM_Sans'] font-bold text-sm text-[#211a16]">
                    {hub.city}
                  </h4>
                  <span className="text-xs font-['Bricolage_Grotesque'] font-extrabold text-[#1f5c3a]">
                    {hub.orders} pkgs
                  </span>
                </div>
                <p className="font-['Baloo_Chettan_2'] text-xs text-[#707971] mt-0.5">
                  {hub.cityMl}
                </p>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="text-[11px] text-[#707971] font-medium">{hub.status}</span>
                  <span className="font-bold text-[#211a16] bg-white px-2 py-0.5 rounded-full border border-[#ede0d9]">
                    Avg {hub.sla}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Dispatch Stream (5 cols) */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#211a16] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Stream Feed
                </span>
                <span className="text-[10px] text-[#707971]">Automated</span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    order: 'Order #HK-8842 - Kochi',
                    desc: 'Packed with a smile! Ready for Bluedart Express.',
                    time: 'Just now',
                    icon: 'sentiment_satisfied',
                    iconColor: 'bg-[#ffddb5] text-[#835400]',
                  },
                  {
                    order: 'Order #HK-8839 - Kozhikode',
                    desc: 'Fragile seal applied. Out for delivery rider dispatch.',
                    time: '4m ago',
                    icon: 'done_all',
                    iconColor: 'bg-[#b1f1c4] text-[#004425]',
                  },
                  {
                    order: 'Order #HK-8831 - Bengaluru',
                    desc: 'Prepaid Vishu hamper package verified with gift slip.',
                    time: '11m ago',
                    icon: 'celebration',
                    iconColor: 'bg-[#ffd9e1] text-[#a2004e]',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-[#ede0d9]/60"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.iconColor}`}
                    >
                      <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-['DM_Sans'] font-bold text-[#211a16]">
                          {item.order}
                        </span>
                        <span className="text-[10px] text-[#707971]">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#404942] font-['DM_Sans'] line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectTab('orders')}
              className="w-full mt-3 py-2 rounded-xl bg-white border border-[#c0c9bf] hover:bg-[#fff1ea] text-[#211a16] text-xs font-['DM_Sans'] font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">hub</span>
              <span>Open Pan-Kerala Dispatch Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Festive Operational Banner */}
      <div className="p-5 rounded-3xl bg-[#f3e6de] border border-[#ede0d9] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#feae32] text-[#211a16] flex items-center justify-center shadow-[2px_2px_0px_#211a16] -rotate-6 shrink-0">
            <span className="material-symbols-outlined text-[24px]">savings</span>
          </div>
          <div>
            <h4 className="font-['Bricolage_Grotesque'] text-base font-bold text-[#211a16]">
              Vishu Kaineettam Bulk Discount Campaign Active
            </h4>
            <p className="font-['DM_Sans'] text-xs text-[#404942]">
              Automated WhatsApp payment alerts running at 94.6% deliverability across Malabar & Travancore clusters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('festival')}
            className="px-4 py-2 rounded-full bg-white text-[#211a16] text-xs font-['DM_Sans'] font-bold hover:bg-[#f9ebe4] transition-colors shadow-xs"
          >
            Campaign Rules
          </button>
          <button
            onClick={() => onSelectTab('festival')}
            className="px-4 py-2 rounded-full bg-[#1f5c3a] text-white text-xs font-['DM_Sans'] font-bold hover:bg-[#14462b] transition-transform hover:scale-[1.02] shadow-[2px_2px_0px_#211a16]"
          >
            Boost Volume (+25%)
          </button>
        </div>
      </div>
    </div>
  );
}
