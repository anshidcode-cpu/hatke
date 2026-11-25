'use client';

import React, { useState, useMemo } from 'react';
import { Product, Order } from '@/lib/types';
import { AdminNavTab } from './AdminSidebar';
import {
  TIMEFRAME_DATA,
  TimeframeKey,
  AdminAIProfitModal,
  AdminProductAnalyticsModal,
} from './AdminAnalyticsModals';
import {
  Truck,
  PartyPopper,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Package,
  AlertTriangle,
  Percent,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Smile,
  CheckCheck,
  PiggyBank,
  Flame,
  BarChart3,
  Eye,
  Plus,
} from 'lucide-react';

interface AdminDashboardTabProps {
  products: Product[];
  orders: Order[];
  onSelectTab: (tab: AdminNavTab) => void;
  onStockDelta: (id: string, delta: number) => void;
}

type ChartMetric = 'profit' | 'revenue' | 'loss' | 'marketingPct';

export default function AdminDashboardTab({
  products,
  orders,
  onSelectTab,
  onStockDelta,
}: AdminDashboardTabProps) {
  // Interactive Pop-up States
  const [profitModalOpen, setProfitModalOpen] = useState(false);
  const [profitModalFocus, setProfitModalFocus] = useState<'profit' | 'loss'>('profit');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [focusedProduct, setFocusedProduct] = useState<Product | null>(null);

  // Main Graph Analytics State
  const [timeframe, setTimeframe] = useState<TimeframeKey>('weekly');
  const [chartMetric, setChartMetric] = useState<ChartMetric>('profit');
  const [productIntelTab, setProductIntelTab] = useState<'bestsellers' | 'benchmark' | 'unsold'>('bestsellers');

  const pendingOrders = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Processing'
  );

  // Graph data for selected timeframe
  const chartSeries = TIMEFRAME_DATA[timeframe];
  const maxChartValue = useMemo(() => {
    return Math.max(
      ...chartSeries.map((d) =>
        chartMetric === 'marketingPct' ? d.marketingPct : d[chartMetric]
      ),
      1
    );
  }, [chartSeries, chartMetric]);

  // Product performance analytics computed from live catalog
  const productAnalytics = useMemo(() => {
    return products.map((p, idx) => {
      const soldToday =
        idx === 0 ? 48 : idx === 1 ? 39 : idx === 2 ? 31 : idx >= products.length - 2 ? 0 : Math.max(2, 26 - idx * 3);
      const soldMonth = soldToday === 0 ? 0 : soldToday * 14 + (idx % 3) * 11;
      const benchmarkGrowth =
        idx === 0 ? 48 : idx === 1 ? 36 : idx === 2 ? 29 : idx >= products.length - 2 ? -24 : 18 - idx * 4;
      return {
        product: p,
        soldToday,
        soldMonth,
        benchmarkGrowth,
        isUnsold: soldToday === 0 || soldMonth <= 15,
        isBenchmarkRising: benchmarkGrowth >= 20,
      };
    });
  }, [products]);

  const totalSoldToday = productAnalytics.reduce((a, b) => a + b.soldToday, 0);
  const totalSoldMonth = productAnalytics.reduce((a, b) => a + b.soldMonth, 0);

  const displayedIntelProducts = useMemo(() => {
    if (productIntelTab === 'bestsellers') {
      return [...productAnalytics].sort((a, b) => b.soldMonth - a.soldMonth).slice(0, 4);
    }
    if (productIntelTab === 'benchmark') {
      return [...productAnalytics]
        .sort((a, b) => b.benchmarkGrowth - a.benchmarkGrowth)
        .slice(0, 4);
    }
    return productAnalytics.filter((p) => p.isUnsold).slice(0, 4);
  }, [productAnalytics, productIntelTab]);

  // Daily Marketing % data (last 7 days showing exact drop day)
  const dailyMarketingDays = TIMEFRAME_DATA.weekly;

  const openProductDeepDive = (p: Product | null) => {
    setFocusedProduct(p);
    setProductModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Command Center Banner */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-5 rounded-3xl bg-[#fff1ea] border border-[#ede0d9]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#1f5c3a] text-white text-[11px] font-['Bricolage_Grotesque'] font-bold tracking-wider uppercase">
              LIVE BAZAAR METRICS
            </span>
            <span className="text-xs text-[#835400] font-['Baloo_Chettan_2'] font-semibold">
              വിഷു ഉത്സവം സ്പെഷ്യൽ ലൈവ് • Advanced Analytics
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] tracking-tight">
            Kerala Hub Daily Command Center
          </h2>
          <p className="text-xs sm:text-sm text-[#404942] font-['DM_Sans'] mt-0.5">
            Click <strong>Today&apos;s Profit</strong> for AI Filtering or click <strong>Products</strong> for Benchmark &amp; Unsold insights.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            onClick={() => {
              setProfitModalFocus('profit');
              setProfitModalOpen(true);
            }}
            className="px-4 py-2 rounded-full bg-[#211a16] text-[#feae32] text-xs font-['DM_Sans'] font-bold hover:bg-[#1f5c3a] hover:text-white transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#feae32] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Profit Filter</span>
          </button>

          <button
            onClick={() => onSelectTab('orders')}
            className="px-4 py-2 rounded-full bg-[#1f5c3a] text-white text-xs font-['DM_Sans'] font-bold hover:bg-[#14462b] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#211a16] cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Rush Orders ({pendingOrders.length})</span>
          </button>

          <button
            onClick={() => onSelectTab('festival')}
            className="px-4 py-2 rounded-full bg-[#feae32] text-[#211a16] text-xs font-['DM_Sans'] font-bold hover:bg-[#e59d28] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#211a16] cursor-pointer"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Festival Themes</span>
          </button>
        </div>
      </div>

      {/* 2. 5 Executive Interactive KPI Cards (Sales, Profit -> AI Popup, Loss, Products -> Deep Dive, Marketing %) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Card 1: Daily Gross Sales */}
        <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-['DM_Sans'] text-[#707971] uppercase tracking-wider font-bold">
                Today&apos;s Sales
              </span>
              <h3 className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] mt-1">
                ₹1,84,320
              </h3>
              <p className="text-[11px] text-[#707971] font-['DM_Sans']">
                Goal: ₹2,20,000
              </p>
            </div>
            <div className="relative w-12 h-12 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f9ebe4" strokeWidth="3.5" />
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
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.4%
            </span>
            <span className="text-[#707971] font-semibold">342 Orders</span>
          </div>
        </div>

        {/* Card 2: TODAY'S NET PROFIT (CLICKABLE -> AI FILTER POPUP) */}
        <button
          type="button"
          onClick={() => {
            setProfitModalFocus('profit');
            setProfitModalOpen(true);
          }}
          className="text-left p-5 rounded-3xl bg-[#004425] text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer group border-2 border-[#004425] hover:border-[#feae32]"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-['DM_Sans'] text-[#94d2a7] uppercase tracking-wider font-bold">
                Today&apos;s Net Profit
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#feae32] text-[#211a16] text-[9px] font-['Bricolage_Grotesque'] font-black flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                AI Filter
              </span>
            </div>
            <h3 className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-white mt-1">
              ₹64,143
            </h3>
            <p className="text-[11px] text-[#94d2a7] font-['DM_Sans'] mt-0.5">
              34.8% Net Margin • Tap for AI popup
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1f5c3a] flex items-center justify-between text-xs text-[#94d2a7]">
            <span className="flex items-center gap-1 text-[#feae32] font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +₹7,420 vs y&apos;day
            </span>
            <span className="underline text-[11px] group-hover:text-[#feae32]">Open AI →</span>
          </div>
        </button>

        {/* Card 3: TODAY'S & ACCUMULATED LOSS (CLICKABLE -> LOSS BREAKDOWN) */}
        <button
          type="button"
          onClick={() => {
            setProfitModalFocus('loss');
            setProfitModalOpen(true);
          }}
          className="text-left p-5 rounded-3xl bg-white border-2 border-[#ffdad6] hover:border-[#ba1a1a] shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-['DM_Sans'] text-[#ba1a1a] uppercase tracking-wider font-bold">
                Today&apos;s Loss (നഷ്ടം)
              </span>
              <span className="w-7 h-7 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <h3 className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#ba1a1a] mt-1">
              ₹4,820
            </h3>
            <p className="text-[11px] text-[#707971] font-['DM_Sans'] mt-0.5">
              Month Total Loss: <strong className="text-[#211a16]">₹28,450</strong>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#f9ebe4] flex items-center justify-between text-xs">
            <span className="text-[#ba1a1a] font-bold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              2.6% of rev
            </span>
            <span className="text-[#707971] group-hover:text-[#ba1a1a] font-semibold">
              Inspect →
            </span>
          </div>
        </button>

        {/* Card 4: PRODUCTS & SOLD COUNT (CLICKABLE -> PRODUCT BENCHMARK MODAL) */}
        <button
          type="button"
          onClick={() => openProductDeepDive(null)}
          className="text-left p-5 rounded-3xl bg-[#feae32] text-[#211a16] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-['DM_Sans'] text-[#211a16]/80 uppercase tracking-wider font-bold">
                Catalog &amp; Units Sold
              </span>
              <span className="w-7 h-7 rounded-full bg-[#211a16] text-[#feae32] flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16]">
                {products.length} SKUs
              </h3>
              <span className="text-xs font-bold bg-[#211a16] text-[#feae32] px-2 py-0.5 rounded-full">
                {totalSoldToday} Sold Today
              </span>
            </div>
            <p className="text-[11px] text-[#211a16]/85 font-['DM_Sans'] mt-0.5 font-medium">
              {totalSoldMonth.toLocaleString('en-IN')} sold this month
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#211a16]/20 flex items-center justify-between text-xs font-bold">
            <span>Benchmark &amp; Unsold</span>
            <span className="underline">Deep Dive →</span>
          </div>
        </button>

        {/* Card 5: DAILY MARKETING % & DROP TRACKER */}
        <div className="p-5 rounded-3xl bg-[#a2004e] text-white shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-['DM_Sans'] text-[#ffadc2] uppercase tracking-wider font-bold">
                Today Marketing %
              </span>
              <span className="w-7 h-7 rounded-full bg-[#780038] text-[#ffadc2] flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-white">
                11.4%
              </h3>
              <span className="text-[10px] font-bold bg-[#feae32] text-[#211a16] px-2 py-0.5 rounded-full">
                ROAS 4.1x
              </span>
            </div>
            <p className="text-[11px] text-[#ffadc2] font-['DM_Sans'] mt-0.5">
              Dropped to <strong>8.2%</strong> on Nov 23 (-3.8%)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#780038] flex items-center justify-between text-xs text-[#ffadc2]">
            <span className="font-bold text-[#feae32] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +1.6% today
            </span>
            <span>Meta + Google</span>
          </div>
        </div>
      </div>

      {/* 3. MASSIVE MULTI-TIMEFRAME GRAPH ANALYTICS (Today / Weekly / Last Month / Last Year) */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-5 h-5 text-[#1f5c3a]" />
              <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#211a16]">
                Multi-Timeframe Business Graph Analytics
              </h3>
            </div>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              ഇന്നത്തെ ഗ്രാഫ് • ആഴ്ച • കഴിഞ്ഞ മാസം • കഴിഞ്ഞ വർഷം — Interactive Revenue, Profit, Loss &amp; Marketing %
            </p>
          </div>

          {/* Timeframe Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#fff8f5] p-1 rounded-2xl border border-[#ede0d9]">
              {(
                [
                  { id: 'today', label: 'Today (ഇന്ന്)' },
                  { id: 'weekly', label: 'Weekly (ആഴ്ച)' },
                  { id: 'month', label: 'Last Month (മാസം)' },
                  { id: 'year', label: 'Last Year (വർഷം)' },
                ] as { id: TimeframeKey; label: string }[]
              ).map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-['DM_Sans'] transition-all cursor-pointer ${
                    timeframe === tf.id
                      ? 'bg-[#1f5c3a] text-white shadow-xs'
                      : 'text-[#404942] hover:bg-[#ede0d9]/60'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metric Toggle Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#f9ebe4]">
          <div className="flex items-center gap-2 flex-wrap">
            {(
              [
                { id: 'profit', label: 'Net Profit (ലാഭം)', color: 'bg-[#1f5c3a] text-white' },
                { id: 'revenue', label: 'Gross Revenue (വരുമാനം)', color: 'bg-[#feae32] text-[#211a16]' },
                { id: 'loss', label: 'Loss / RTO (നഷ്ടം)', color: 'bg-[#ba1a1a] text-white' },
                { id: 'marketingPct', label: 'Marketing % (മാർക്കറ്റിംഗ് %)', color: 'bg-[#a2004e] text-white' },
              ] as { id: ChartMetric; label: string; color: string }[]
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setChartMetric(m.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  chartMetric === m.id
                    ? `${m.color} border-[#211a16] shadow-[1.5px_1.5px_0px_#211a16]`
                    : 'bg-[#fff8f5] text-[#404942] border-[#ede0d9] hover:border-[#211a16]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setProfitModalFocus('profit');
              setProfitModalOpen(true);
            }}
            className="text-xs font-bold text-[#1f5c3a] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open AI Filter on This Graph →</span>
          </button>
        </div>

        {/* Interactive Bar + Value Graph */}
        <div className="pt-4">
          <div className="h-60 flex items-end gap-2 sm:gap-4 border-b border-[#ede0d9] pb-2 px-1">
            {chartSeries.map((pt, idx) => {
              const rawVal =
                chartMetric === 'marketingPct' ? pt.marketingPct : pt[chartMetric];
              const heightPct = Math.max(8, Math.round((rawVal / maxChartValue) * 100));
              const isDropDay = pt.label === 'Nov 23' || pt.marketingPct < 9.5;

              const barColor =
                chartMetric === 'profit'
                  ? 'bg-[#1f5c3a] hover:bg-[#feae32]'
                  : chartMetric === 'revenue'
                  ? 'bg-[#feae32] hover:bg-[#1f5c3a]'
                  : chartMetric === 'loss'
                  ? 'bg-[#ba1a1a] hover:bg-[#93000a]'
                  : isDropDay
                  ? 'bg-[#ba1a1a] hover:bg-[#93000a]'
                  : 'bg-[#a2004e] hover:bg-[#feae32]';

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative"
                >
                  {/* Floating Hover Tooltip */}
                  <div className="hidden group-hover:flex flex-col absolute -top-24 left-1/2 -translate-x-1/2 bg-[#211a16] text-white text-[10px] px-3 py-2 rounded-xl z-20 whitespace-nowrap shadow-xl border border-[#feae32]">
                    <span className="font-bold text-[#feae32] text-xs mb-0.5">{pt.label}</span>
                    <span>Revenue: ₹{pt.revenue.toLocaleString('en-IN')}</span>
                    <span className="text-emerald-300">
                      Profit: ₹{pt.profit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-red-300">
                      Loss: ₹{pt.loss.toLocaleString('en-IN')}
                    </span>
                    <span className="text-pink-300">
                      Marketing: {pt.marketingPct}% • {pt.orders} orders
                    </span>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-bold text-[#404942] mb-1 opacity-80 group-hover:opacity-100">
                    {chartMetric === 'marketingPct'
                      ? `${rawVal}%`
                      : rawVal >= 100000
                      ? `₹${(rawVal / 100000).toFixed(1)}L`
                      : `₹${(rawVal / 1000).toFixed(1)}k`}
                  </span>

                  <div
                    className={`w-full max-w-[44px] rounded-t-xl transition-all duration-300 cursor-pointer ${barColor}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 sm:gap-4 pt-2 px-1">
            {chartSeries.map((pt, idx) => (
              <div
                key={idx}
                className="flex-1 text-center text-[10px] sm:text-xs font-bold text-[#404942] truncate"
              >
                {pt.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. PRODUCT INTELLIGENCE (Most Sold / Benchmark Growing / Unsold) */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
              Product Performance &amp; Benchmark Intelligence
            </h3>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              ഏത് പ്രോഡക്റ്റാണ് കൂടുതൽ വിറ്റത്, ബെഞ്ച് മാർക്ക് കൂടുന്നത്, വിറ്റു പോകാത്തത് — Click any product for full breakdown
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(
              [
                { id: 'bestsellers', label: '🔥 Most Sold' },
                { id: 'benchmark', label: '📈 Benchmark Rising' },
                { id: 'unsold', label: '⚠️ Unsold / Slow' },
              ] as { id: typeof productIntelTab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setProductIntelTab(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  productIntelTab === t.id
                    ? 'bg-[#1f5c3a] text-white shadow-xs'
                    : 'bg-[#fff8f5] text-[#404942] hover:bg-[#ede0d9]'
                }`}
              >
                {t.label}
              </button>
            ))}

            <button
              onClick={() => openProductDeepDive(null)}
              className="px-3 py-1.5 rounded-full bg-[#feae32] text-[#211a16] text-xs font-bold hover:bg-[#e59d28] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View All ({products.length})</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {displayedIntelProducts.map((item, idx) => (
            <div
              key={item.product.id}
              onClick={() => openProductDeepDive(item.product)}
              className="flex items-center justify-between p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] hover:border-[#1f5c3a] hover:bg-[#fff1ea] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-full bg-[#1f5c3a] text-white text-xs font-['Bricolage_Grotesque'] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-11 h-11 rounded-xl object-contain bg-white border border-[#ede0d9] p-1 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-['DM_Sans'] font-bold text-[#211a16] truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-['Baloo_Chettan_2'] text-xs text-[#1f5c3a] font-semibold truncate">
                      {item.product.nameMl || 'കേരള സ്പെഷ്യൽ'}
                    </span>
                    <span className="text-[11px] text-[#707971]">
                      ₹{item.product.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-2">
                <div className="text-right">
                  <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#211a16] block">
                    {item.soldToday} Today / {item.soldMonth} Mo
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 ${
                      item.benchmarkGrowth >= 20
                        ? 'bg-[#b1f1c4] text-[#00210f]'
                        : item.benchmarkGrowth >= 0
                        ? 'bg-[#ffddb5] text-[#835400]'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}
                  >
                    {item.benchmarkGrowth >= 0 ? '+' : ''}
                    {item.benchmarkGrowth}% Benchmark
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStockDelta(item.product.id, 5);
                  }}
                  className="px-2 py-1 text-xs font-bold rounded-lg bg-white border border-[#c0c9bf] hover:bg-[#1f5c3a] hover:text-white text-[#1f5c3a] transition-colors flex items-center gap-0.5 cursor-pointer"
                  title="Quick Restock +5"
                >
                  <Plus className="w-3 h-3" />5
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. LOSS TRACKER ("എത്ര ലോസ് വന്നു vs വരുന്നു") + DAILY MARKETING % DROP STRIP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Loss Tracker (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
                <span>Loss Telemetry (വന്ന &amp; വരുന്ന നഷ്ടം)</span>
              </h3>
              <button
                onClick={() => {
                  setProfitModalFocus('loss');
                  setProfitModalOpen(true);
                }}
                className="text-xs font-bold text-[#ba1a1a] hover:underline cursor-pointer"
              >
                AI Filter →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="p-3.5 rounded-2xl bg-[#ffdad6]/40 border border-[#ba1a1a]/20">
                <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">
                  Past Loss (ഇതുവരെ വന്നത്)
                </span>
                <span className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#ba1a1a]">
                  ₹28,450
                </span>
                <span className="text-[10px] text-[#707971] block">Last 30 days total</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fff8f5] border border-[#ede0d9]">
                <span className="text-[10px] font-bold text-[#835400] uppercase block">
                  Ongoing Today (ഇന്ന് വരുന്നത്)
                </span>
                <span className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16]">
                  ₹4,820
                </span>
                <span className="text-[10px] text-emerald-700 font-bold block">
                  -11% vs Nov 23 peak
                </span>
              </div>
            </div>

            {/* Loss Breakdown Bars */}
            <div className="space-y-2.5 pt-2 text-xs">
              {[
                { label: 'RTO Returns (കസ്റ്റമർ എടുക്കാത്തവ)', pct: 44, amt: '₹12,518', color: 'bg-[#ba1a1a]' },
                { label: 'Cancelled COD Orders', pct: 26, amt: '₹7,397', color: 'bg-[#e65100]' },
                { label: 'Ad Burn on Low-ROAS Sets', pct: 16, amt: '₹4,552', color: 'bg-[#a2004e]' },
                { label: 'Transit Damage / Fragile', pct: 14, amt: '₹3,983', color: 'bg-[#835400]' },
              ].map((l, idx) => (
                <div key={idx}>
                  <div className="flex justify-between font-semibold text-[#211a16] mb-1">
                    <span>{l.label}</span>
                    <span>
                      {l.amt} ({l.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#f9ebe4] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${l.color}`} style={{ width: `${l.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Marketing % & Drop Detector (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16] flex items-center gap-2">
                  <Percent className="w-5 h-5 text-[#a2004e]" />
                  <span>Daily Marketing % &amp; Drop Alert</span>
                </h3>
                <p className="text-xs text-[#707971] font-['DM_Sans']">
                  ഓരോ ദിവസവും എത്ര % മാർക്കറ്റിംഗ് നടന്നു, ഏത് ദിവസമാണ് കുറഞ്ഞത്
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold">
                ⚠️ Drop Day: Nov 23 (8.2%)
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2">
              {dailyMarketingDays.map((day, idx) => {
                const isDrop = day.marketingPct < 9.5;
                const prev = idx > 0 ? dailyMarketingDays[idx - 1].marketingPct : day.marketingPct;
                const delta = (day.marketingPct - prev).toFixed(1);
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                      isDrop
                        ? 'bg-[#ffdad6]/50 border-[#ba1a1a]'
                        : day.label === 'Today'
                        ? 'bg-[#b1f1c4]/40 border-[#1f5c3a]'
                        : 'bg-[#fff8f5] border-[#ede0d9]'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-[#707971] block">
                      {day.label}
                    </span>
                    <div className="my-2">
                      <span
                        className={`text-sm sm:text-base font-['Bricolage_Grotesque'] font-extrabold block ${
                          isDrop ? 'text-[#ba1a1a]' : 'text-[#211a16]'
                        }`}
                      >
                        {day.marketingPct}%
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                        Number(delta) < 0
                          ? 'text-[#ba1a1a] bg-white'
                          : 'text-emerald-700 bg-white'
                      }`}
                    >
                      {Number(delta) > 0 ? `+${delta}%` : `${delta}%`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] flex items-start gap-3">
              <Flame className="w-5 h-5 text-[#835400] shrink-0 mt-0.5" />
              <div className="text-xs text-[#404942] leading-relaxed">
                <strong className="text-[#211a16]">Marketing Insight:</strong> On{' '}
                <strong className="text-[#ba1a1a]">Nov 23</strong>, marketing share dropped{' '}
                <strong>-3.8%</strong> (down to 8.2%) due to Meta ad fatigue &amp; weekend CPC rise. Today recovered to <strong>11.4%</strong> (+1.6%) after launching Vishu Reels creatives.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Live Kerala Orders Dispatch Map & Stream */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1f5c3a]" />
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
                Live Kerala Orders Dispatch Map &amp; Telemetry
              </h3>
            </div>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Express hub delivery SLAs across Malabar, Central Kochi, and Travancore
            </p>
          </div>
          <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-emerald-800 bg-[#b1f1c4] px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            98.1% Kerala Delivery SLA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                    Icon: Smile,
                    iconColor: 'bg-[#ffddb5] text-[#835400]',
                  },
                  {
                    order: 'Order #HK-8839 - Kozhikode',
                    desc: 'Fragile seal applied. Out for delivery rider dispatch.',
                    time: '4m ago',
                    Icon: CheckCheck,
                    iconColor: 'bg-[#b1f1c4] text-[#004425]',
                  },
                  {
                    order: 'Order #HK-8831 - Bengaluru',
                    desc: 'Prepaid Vishu hamper package verified with gift slip.',
                    time: '11m ago',
                    Icon: PartyPopper,
                    iconColor: 'bg-[#ffd9e1] text-[#a2004e]',
                  },
                ].map((item, idx) => {
                  const FeedIcon = item.Icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-[#ede0d9]/60"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.iconColor}`}
                      >
                        <FeedIcon className="w-4 h-4" />
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
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onSelectTab('orders')}
              className="w-full mt-3 py-2 rounded-xl bg-white border border-[#c0c9bf] hover:bg-[#fff1ea] text-[#211a16] text-xs font-['DM_Sans'] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>Open Pan-Kerala Dispatch Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Festive Operational Banner */}
      <div className="p-5 rounded-3xl bg-[#f3e6de] border border-[#ede0d9] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#feae32] text-[#211a16] flex items-center justify-center shadow-[2px_2px_0px_#211a16] -rotate-6 shrink-0">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-['Bricolage_Grotesque'] text-base font-bold text-[#211a16]">
              Vishu Kaineettam Bulk Discount Campaign Active
            </h4>
            <p className="font-['DM_Sans'] text-xs text-[#404942]">
              Automated WhatsApp payment alerts running at 94.6% deliverability across Malabar &amp; Travancore clusters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('festival')}
            className="px-4 py-2 rounded-full bg-white text-[#211a16] text-xs font-['DM_Sans'] font-bold hover:bg-[#f9ebe4] transition-colors shadow-xs cursor-pointer"
          >
            Campaign Rules
          </button>
          <button
            onClick={() => onSelectTab('festival')}
            className="px-4 py-2 rounded-full bg-[#1f5c3a] text-white text-xs font-['DM_Sans'] font-bold hover:bg-[#14462b] transition-transform hover:scale-[1.02] shadow-[2px_2px_0px_#211a16] cursor-pointer"
          >
            Boost Volume (+25%)
          </button>
        </div>
      </div>

      {/* Pop-up Modals */}
      <AdminAIProfitModal
        isOpen={profitModalOpen}
        onClose={() => setProfitModalOpen(false)}
        initialFocus={profitModalFocus}
      />

      <AdminProductAnalyticsModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        products={products}
        focusedProduct={focusedProduct}
      />
    </div>
  );
}
