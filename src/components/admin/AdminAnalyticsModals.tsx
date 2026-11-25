'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import {
  X,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Package,
  Award,
  Flame,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  BarChart3,
  Zap,
  ShieldAlert,
} from 'lucide-react';

export type TimeframeKey = 'today' | 'weekly' | 'month' | 'year';

export interface AnalyticsPoint {
  label: string;
  revenue: number;
  profit: number;
  loss: number;
  marketingPct: number;
  orders: number;
}

export const TIMEFRAME_DATA: Record<TimeframeKey, AnalyticsPoint[]> = {
  today: [
    { label: '8 AM', revenue: 12400, profit: 4100, loss: 320, marketingPct: 9.2, orders: 22 },
    { label: '10 AM', revenue: 21800, profit: 7450, loss: 540, marketingPct: 10.8, orders: 41 },
    { label: '12 PM', revenue: 29500, profit: 10200, loss: 690, marketingPct: 11.5, orders: 56 },
    { label: '2 PM', revenue: 24100, profit: 8100, loss: 610, marketingPct: 10.4, orders: 44 },
    { label: '4 PM', revenue: 31200, profit: 11050, loss: 780, marketingPct: 12.1, orders: 58 },
    { label: '6 PM', revenue: 36400, profit: 12950, loss: 940, marketingPct: 12.9, orders: 67 },
    { label: '8 PM', revenue: 28920, profit: 10293, loss: 940, marketingPct: 11.4, orders: 54 },
  ],
  weekly: [
    { label: 'Nov 19', revenue: 142000, profit: 48200, loss: 4100, marketingPct: 13.2, orders: 264 },
    { label: 'Nov 20', revenue: 158000, profit: 54900, loss: 3900, marketingPct: 14.1, orders: 295 },
    { label: 'Nov 21', revenue: 149500, profit: 51100, loss: 4450, marketingPct: 12.8, orders: 278 },
    { label: 'Nov 22', revenue: 154200, profit: 52800, loss: 4200, marketingPct: 12.0, orders: 286 },
    { label: 'Nov 23', revenue: 118400, profit: 37900, loss: 6120, marketingPct: 8.2, orders: 215 },
    { label: 'Nov 24', revenue: 162800, profit: 56720, loss: 4380, marketingPct: 9.8, orders: 304 },
    { label: 'Today', revenue: 184320, profit: 64143, loss: 4820, marketingPct: 11.4, orders: 342 },
  ],
  month: [
    { label: 'Week 1', revenue: 782000, profit: 265800, loss: 21400, marketingPct: 12.4, orders: 1420 },
    { label: 'Week 2', revenue: 894000, profit: 312900, loss: 19800, marketingPct: 13.8, orders: 1640 },
    { label: 'Week 3', revenue: 815000, profit: 277100, loss: 24900, marketingPct: 10.6, orders: 1510 },
    { label: 'Week 4', revenue: 1069220, profit: 374200, loss: 28450, marketingPct: 11.9, orders: 1980 },
  ],
  year: [
    { label: 'Jan', revenue: 1850000, profit: 592000, loss: 64000, marketingPct: 10.2, orders: 3400 },
    { label: 'Feb', revenue: 1980000, profit: 643500, loss: 59000, marketingPct: 10.8, orders: 3620 },
    { label: 'Mar', revenue: 2340000, profit: 795600, loss: 71000, marketingPct: 12.1, orders: 4280 },
    { label: 'Apr (Vishu)', revenue: 3120000, profit: 1123200, loss: 82000, marketingPct: 14.8, orders: 5690 },
    { label: 'May', revenue: 2480000, profit: 843200, loss: 69000, marketingPct: 11.5, orders: 4510 },
    { label: 'Jun', revenue: 2290000, profit: 755700, loss: 74000, marketingPct: 10.9, orders: 4120 },
    { label: 'Jul', revenue: 2410000, profit: 819400, loss: 68000, marketingPct: 11.4, orders: 4380 },
    { label: 'Aug (Onam)', revenue: 3680000, profit: 1361600, loss: 91000, marketingPct: 15.6, orders: 6740 },
    { label: 'Sep', revenue: 2840000, profit: 965600, loss: 72000, marketingPct: 12.3, orders: 5180 },
    { label: 'Oct (Diwali)', revenue: 3390000, profit: 1220400, loss: 84000, marketingPct: 14.2, orders: 6190 },
    { label: 'Nov (Live)', revenue: 3560220, profit: 1230000, loss: 94550, marketingPct: 12.2, orders: 6550 },
  ],
};

/* ============================================================================
   1. AI PROFIT & LOSS FILTER POP-UP MODAL
   ============================================================================ */
interface AIProfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocus?: 'profit' | 'loss';
}

type AIFilterType = 'all' | 'high_margin' | 'ad_driven' | 'organic' | 'loss_rto' | 'festival';

export function AdminAIProfitModal({ isOpen, onClose, initialFocus = 'profit' }: AIProfitModalProps) {
  const [timeframe, setTimeframe] = useState<TimeframeKey>('weekly');
  const [aiFilter, setAiFilter] = useState<AIFilterType>(
    initialFocus === 'loss' ? 'loss_rto' : 'all'
  );
  const [aiPrompt, setAiPrompt] = useState('');

  const filterMultiplier = useMemo(() => {
    const q = aiPrompt.toLowerCase();
    if (q.includes('loss') || q.includes('rto') || aiFilter === 'loss_rto') {
      return { profitScale: 0.4, lossScale: 1.0, label: 'Loss & RTO Leakage Focus' };
    }
    if (q.includes('high') || q.includes('margin') || aiFilter === 'high_margin') {
      return { profitScale: 1.18, lossScale: 0.55, label: 'High Margin Winners (>40%)' };
    }
    if (q.includes('ad') || q.includes('meta') || aiFilter === 'ad_driven') {
      return { profitScale: 0.68, lossScale: 0.8, label: 'Ad-Attributed Profit (ROAS 4.1x)' };
    }
    if (q.includes('organic') || aiFilter === 'organic') {
      return { profitScale: 0.52, lossScale: 0.25, label: 'Organic & Repeat Profit' };
    }
    if (q.includes('vishu') || q.includes('fest') || aiFilter === 'festival') {
      return { profitScale: 1.32, lossScale: 0.7, label: 'Festival Spike Projection' };
    }
    return { profitScale: 1.0, lossScale: 1.0, label: 'All Net Profit & Loss Streams' };
  }, [aiFilter, aiPrompt]);

  const series = useMemo(() => {
    return TIMEFRAME_DATA[timeframe].map((pt) => ({
      ...pt,
      profit: Math.round(pt.profit * filterMultiplier.profitScale),
      loss: Math.round(pt.loss * filterMultiplier.lossScale),
    }));
  }, [timeframe, filterMultiplier]);

  const totals = useMemo(() => {
    const rev = series.reduce((a, b) => a + b.revenue, 0);
    const prof = series.reduce((a, b) => a + b.profit, 0);
    const loss = series.reduce((a, b) => a + b.loss, 0);
    const avgMkt =
      series.reduce((a, b) => a + b.marketingPct, 0) / Math.max(1, series.length);
    return { rev, prof, loss, avgMkt: avgMkt.toFixed(1) };
  }, [series]);

  const maxVal = useMemo(
    () => Math.max(...series.map((s) => Math.max(s.profit, s.loss, 1))),
    [series]
  );

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#fff8f5] border-2 border-[#1f5c3a] rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#004425] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#feae32] text-[#211a16] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#111827]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg sm:text-xl font-extrabold flex items-center gap-2">
                <span>AI Profit & Loss Smart Filter</span>
                <span className="text-[10px] bg-[#feae32] text-[#211a16] px-2 py-0.5 rounded-full uppercase">
                  AI Engine
                </span>
              </h3>
              <p className="font-['Baloo_Chettan_2'] text-xs text-[#94d2a7]">
                ലാഭവും നഷ്ടവും AI ഉപയോഗിച്ച് ഫിൽട്ടർ ചെയ്ത് പരിശോധിക്കുക
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#1f5c3a] hover:bg-[#feae32] hover:text-[#211a16] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* AI Prompt Input & Timeframe Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Sparkles className="w-4 h-4 text-[#1f5c3a] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AI filter: e.g. 'high margin', 'loss rto', 'ads', 'vishu'..."
                className="w-full bg-white border-2 border-[#c0c9bf] focus:border-[#1f5c3a] rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm font-['DM_Sans'] text-[#211a16] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#ede0d9] shrink-0 overflow-x-auto">
              {(
                [
                  { id: 'today', label: 'Today (ഇന്ന്)' },
                  { id: 'weekly', label: 'Weekly' },
                  { id: 'month', label: 'Last Month' },
                  { id: 'year', label: 'Last Year' },
                ] as { id: TimeframeKey; label: string }[]
              ).map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-['DM_Sans'] transition-all cursor-pointer whitespace-nowrap ${
                    timeframe === tf.id
                      ? 'bg-[#1f5c3a] text-white shadow-xs'
                      : 'text-[#404942] hover:bg-[#f9ebe4]'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-[#707971] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              AI Presets:
            </span>
            {(
              [
                { id: 'all', label: 'All Profit & Loss' },
                { id: 'high_margin', label: '✨ High Margin (>40%)' },
                { id: 'ad_driven', label: '📣 Ad-Driven Profit' },
                { id: 'organic', label: '🌿 Organic Profit' },
                { id: 'loss_rto', label: '⚠️ Loss & RTO Drivers' },
                { id: 'festival', label: '🪔 Festival Spike' },
              ] as { id: AIFilterType; label: string }[]
            ).map((chip) => (
              <button
                key={chip.id}
                onClick={() => {
                  setAiFilter(chip.id);
                  setAiPrompt('');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  aiFilter === chip.id && !aiPrompt
                    ? 'bg-[#feae32] text-[#211a16] border-[#211a16] shadow-[1px_1px_0px_#211a16]'
                    : 'bg-white text-[#404942] border-[#ede0d9] hover:border-[#1f5c3a]'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Filtered Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-[#ede0d9]">
              <span className="text-[10px] font-bold text-[#707971] uppercase">
                Filtered Net Profit
              </span>
              <div className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#1f5c3a] mt-0.5">
                ₹{totals.prof.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">
                {filterMultiplier.label}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#ede0d9]">
              <span className="text-[10px] font-bold text-[#707971] uppercase">
                Period Loss / Leakage
              </span>
              <div className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#ba1a1a] mt-0.5">
                ₹{totals.loss.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#ba1a1a] font-semibold">
                RTO + Cancelled COD
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#ede0d9]">
              <span className="text-[10px] font-bold text-[#707971] uppercase">
                Gross Volume
              </span>
              <div className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] mt-0.5">
                ₹{totals.rev.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#707971]">Verified PG + COD</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#ede0d9]">
              <span className="text-[10px] font-bold text-[#707971] uppercase">
                Avg Marketing %
              </span>
              <div className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#a2004e] mt-0.5">
                {totals.avgMkt}%
              </div>
              <span className="text-[10px] text-[#707971]">Ad Spend Share</span>
            </div>
          </div>

          {/* Interactive Bar Comparison Chart inside Popup */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ede0d9]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#211a16]">
                  Profit vs Loss Curve ({timeframe.toUpperCase()})
                </h4>
                <p className="text-[11px] text-[#707971]">
                  Active AI Filter: <strong>{filterMultiplier.label}</strong>
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold">
                <span className="flex items-center gap-1 text-[#1f5c3a]">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1f5c3a]" /> Profit
                </span>
                <span className="flex items-center gap-1 text-[#ba1a1a]">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#ba1a1a]" /> Loss
                </span>
              </div>
            </div>

            <div className="h-44 flex items-end gap-2 sm:gap-3 pt-4 border-b border-[#ede0d9] pb-2">
              {series.map((pt, i) => {
                const profH = Math.max(8, Math.round((pt.profit / maxVal) * 100));
                const lossH = Math.max(4, Math.round((pt.loss / maxVal) * 100));
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative"
                  >
                    {/* Hover Tooltip */}
                    <div className="hidden group-hover:flex flex-col absolute -top-12 left-1/2 -translate-x-1/2 bg-[#211a16] text-white text-[10px] px-2.5 py-1.5 rounded-xl z-20 whitespace-nowrap shadow-lg">
                      <span className="font-bold text-[#feae32]">{pt.label}</span>
                      <span>Profit: ₹{pt.profit.toLocaleString('en-IN')}</span>
                      <span className="text-red-300">Loss: ₹{pt.loss.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div
                        className="w-1/2 max-w-[20px] bg-[#1f5c3a] group-hover:bg-[#feae32] rounded-t-md transition-all duration-300"
                        style={{ height: `${profH}%` }}
                      />
                      <div
                        className="w-1/3 max-w-[12px] bg-[#ba1a1a]/80 rounded-t-md transition-all duration-300"
                        style={{ height: `${lossH}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 sm:gap-3 pt-1.5">
              {series.map((pt, i) => (
                <div
                  key={i}
                  className="flex-1 text-center text-[10px] font-bold text-[#707971] truncate"
                >
                  {pt.label}
                </div>
              ))}
            </div>
          </div>

          {/* AI Strategic Recommendation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#b1f1c4]/40 border border-[#1f5c3a]/30">
              <div className="flex items-center gap-2 text-[#004425] font-bold text-xs mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>AI Profit Driver Insight (ലാഭ വർദ്ധനവ്)</span>
              </div>
              <p className="text-xs text-[#211a16] leading-relaxed">
                Kitchen Brass & Cookware generated <strong>42% of net profit</strong> with a 51.2% gross margin. Shifting ₹3,000 from slow tech ads into Kitchen Reels can boost weekly profit by <strong>+₹18,400</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#ffdad6]/50 border border-[#ba1a1a]/30">
              <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>AI Loss Reduction Alert (നഷ്ടം കുറയ്ക്കാൻ)</span>
              </div>
              <p className="text-xs text-[#211a16] leading-relaxed">
                <strong>Nov 23</strong> saw a +38% RTO spike on COD orders above ₹1,500 in North Malabar. Enabling WhatsApp OTP confirmation for COD orders cuts ongoing loss by <strong>₹2,100/day</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. PRODUCT INTELLIGENCE & BENCHMARK DEEP-DIVE MODAL
   ============================================================================ */
interface ProductAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  focusedProduct: Product | null;
}

export function AdminProductAnalyticsModal({
  isOpen,
  onClose,
  products,
  focusedProduct,
}: ProductAnalyticsModalProps) {
  const [viewMode, setViewMode] = useState<'all' | 'bestsellers' | 'benchmark' | 'unsold'>('all');
  const [search, setSearch] = useState('');

  // Enrich products with deterministic performance telemetry
  const enriched = useMemo(() => {
    return products.map((p, idx) => {
      const unitsSoldToday = idx === 0 ? 48 : idx === 1 ? 39 : idx === 2 ? 31 : idx >= products.length - 2 ? 0 : Math.max(2, 26 - idx * 3);
      const unitsSoldMonth = unitsSoldToday === 0 ? 0 : unitsSoldToday * 14 + (idx % 3) * 11;
      const benchmarkGrowth = idx === 0 ? 48 : idx === 1 ? 36 : idx === 2 ? 29 : idx >= products.length - 2 ? -24 : 18 - idx * 4;
      const lossReturned = idx >= products.length - 2 ? 0 : Math.round(unitsSoldMonth * 0.03 * p.price);
      return {
        product: p,
        unitsSoldToday,
        unitsSoldMonth,
        benchmarkGrowth,
        revenueMonth: unitsSoldMonth * p.price,
        lossReturned,
        isUnsold: unitsSoldToday === 0 || unitsSoldMonth <= 15,
        isBenchmarkRising: benchmarkGrowth >= 20,
      };
    });
  }, [products]);

  const bestSellers = useMemo(
    () => [...enriched].sort((a, b) => b.unitsSoldMonth - a.unitsSoldMonth),
    [enriched]
  );
  const benchmarkWinners = useMemo(
    () => enriched.filter((e) => e.isBenchmarkRising).sort((a, b) => b.benchmarkGrowth - a.benchmarkGrowth),
    [enriched]
  );
  const unsoldItems = useMemo(
    () => enriched.filter((e) => e.isUnsold),
    [enriched]
  );

  const displayedList = useMemo(() => {
    let list = enriched;
    if (viewMode === 'bestsellers') list = bestSellers;
    if (viewMode === 'benchmark') list = benchmarkWinners;
    if (viewMode === 'unsold') list = unsoldItems;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.product.name.toLowerCase().includes(q) ||
          (e.product.nameMl || '').toLowerCase().includes(q) ||
          e.product.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [enriched, bestSellers, benchmarkWinners, unsoldItems, viewMode, search]);

  const totalUnitsSoldMonth = enriched.reduce((s, e) => s + e.unitsSoldMonth, 0);
  const totalUnitsSoldToday = enriched.reduce((s, e) => s + e.unitsSoldToday, 0);

  if (!isOpen) return null;

  const focusedStats = focusedProduct
    ? enriched.find((e) => e.product.id === focusedProduct.id)
    : null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#fff8f5] border-2 border-[#1f5c3a] rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#1f5c3a] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#feae32] text-[#211a16] flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg sm:text-xl font-extrabold">
                Product Sales, Benchmark & Unsold Analytics
              </h3>
              <p className="font-['Baloo_Chettan_2'] text-xs text-[#94d2a7]">
                വിറ്റഴിച്ച പ്രോഡക്റ്റുകൾ, ബെഞ്ച് മാർക്ക് വളർച്ച, വിറ്റുപോകാത്തവ എന്നിവയുടെ പൂർണ്ണ വിവരങ്ങൾ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#004425] hover:bg-[#feae32] hover:text-[#211a16] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Focused Single Product Banner (if user clicked a specific product) */}
          {focusedStats && (
            <div className="p-4 rounded-2xl bg-[#feae32]/20 border-2 border-[#feae32] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={focusedStats.product.image}
                  alt={focusedStats.product.name}
                  className="w-14 h-14 rounded-xl object-contain bg-white border border-[#ede0d9] p-1"
                />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#835400]">
                    Selected Product Deep-Dive
                  </span>
                  <h4 className="font-['Bricolage_Grotesque'] font-bold text-base text-[#211a16]">
                    {focusedStats.product.name}
                  </h4>
                  <p className="font-['Baloo_Chettan_2'] text-xs text-[#1f5c3a] font-semibold">
                    {focusedStats.product.nameMl}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white px-3 py-2 rounded-xl border border-[#ede0d9]">
                  <span className="text-[10px] text-[#707971] block">Sold (Today/Mo)</span>
                  <span className="font-black text-sm text-[#1f5c3a]">
                    {focusedStats.unitsSoldToday} / {focusedStats.unitsSoldMonth}
                  </span>
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-[#ede0d9]">
                  <span className="text-[10px] text-[#707971] block">Benchmark</span>
                  <span
                    className={`font-black text-sm ${
                      focusedStats.benchmarkGrowth >= 0 ? 'text-emerald-700' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {focusedStats.benchmarkGrowth >= 0 ? '+' : ''}
                    {focusedStats.benchmarkGrowth}%
                  </span>
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-[#ede0d9]">
                  <span className="text-[10px] text-[#707971] block">Return Loss</span>
                  <span className="font-black text-sm text-[#ba1a1a]">
                    ₹{focusedStats.lossReturned.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Top 4 Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#ede0d9]">
              <span className="text-[11px] font-bold text-[#707971] block">
                Total Catalog Products
              </span>
              <div className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] mt-0.5">
                {products.length} SKUs
              </div>
              <span className="text-[11px] text-[#1f5c3a] font-bold">
                {totalUnitsSoldToday} sold today • {totalUnitsSoldMonth.toLocaleString('en-IN')} this month
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#b1f1c4]/30 border border-[#1f5c3a]/30">
              <span className="text-[11px] font-bold text-[#004425] block">
                Benchmark Rising (കൂടുന്നവ)
              </span>
              <div className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#004425] mt-0.5">
                {benchmarkWinners.length} Items
              </div>
              <span className="text-[11px] text-emerald-800 font-bold">
                Top: +{benchmarkWinners[0]?.benchmarkGrowth || 48}% velocity
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#ffddb5]/40 border border-[#feae32]">
              <span className="text-[11px] font-bold text-[#835400] block">
                #1 Best Seller (ഏറ്റവും കൂടുതൽ)
              </span>
              <div className="text-sm font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] mt-1 line-clamp-1">
                {bestSellers[0]?.product.name}
              </div>
              <span className="text-[11px] text-[#835400] font-bold">
                {bestSellers[0]?.unitsSoldMonth} units sold
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#ffdad6]/50 border border-[#ba1a1a]/30">
              <span className="text-[11px] font-bold text-[#ba1a1a] block">
                Unsold / Slow Stock (വിറ്റുപോകാത്തവ)
              </span>
              <div className="text-2xl font-['Bricolage_Grotesque'] font-extrabold text-[#ba1a1a] mt-0.5">
                {unsoldItems.length} SKUs
              </div>
              <span className="text-[11px] text-[#ba1a1a] font-semibold">
                Needs clearance / promo push
              </span>
            </div>
          </div>

          {/* Filter Tabs & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {(
                [
                  { id: 'all', label: `All Products (${products.length})` },
                  { id: 'bestsellers', label: '🔥 Most Sold (കൂടുതൽ വിറ്റവ)' },
                  { id: 'benchmark', label: '📈 Benchmark Rising (ബെഞ്ച് മാർക്ക്)' },
                  { id: 'unsold', label: `⚠️ Unsold / Low (${unsoldItems.length})` },
                ] as { id: typeof viewMode; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    viewMode === tab.id
                      ? 'bg-[#1f5c3a] text-white shadow-xs'
                      : 'bg-white border border-[#ede0d9] text-[#404942] hover:bg-[#f9ebe4]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-[#707971] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter products..."
                className="w-full bg-white border border-[#c0c9bf] rounded-full pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#1f5c3a]"
              />
            </div>
          </div>

          {/* Product Analytics Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#ede0d9] bg-white">
            <table className="w-full text-left text-xs font-['DM_Sans']">
              <thead className="bg-[#fff8f5] text-[#707971] uppercase tracking-wider font-bold text-[10px] border-b border-[#ede0d9]">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Sold Today / Month</th>
                  <th className="py-3 px-4">Benchmark Trend</th>
                  <th className="py-3 px-4">Stock Left</th>
                  <th className="py-3 px-4">RTO / Return Loss</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede0d9]">
                {displayedList.map((item) => (
                  <tr key={item.product.id} className="hover:bg-[#fff8f5] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-9 h-9 rounded-lg object-contain bg-[#fff8f5] border border-[#ede0d9] p-0.5 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-[#211a16] block line-clamp-1">
                            {item.product.name}
                          </span>
                          <span className="text-[10px] text-[#707971]">
                            ₹{item.product.price} • {item.product.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#211a16]">{item.unitsSoldToday} today</span>
                      <span className="block text-[10px] text-[#707971]">
                        {item.unitsSoldMonth} this month
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold px-2 py-0.5 rounded-full text-[10px] ${
                          item.benchmarkGrowth >= 20
                            ? 'bg-[#b1f1c4] text-[#00210f]'
                            : item.benchmarkGrowth >= 0
                            ? 'bg-[#ffddb5] text-[#835400]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}
                      >
                        {item.benchmarkGrowth >= 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {item.benchmarkGrowth >= 0 ? '+' : ''}
                        {item.benchmarkGrowth}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#211a16]">
                      {item.product.stock} pcs
                    </td>
                    <td className="py-3 px-4 text-[#ba1a1a] font-semibold">
                      ₹{item.lossReturned.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.isUnsold ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                          Slow / Unsold
                        </span>
                      ) : item.isBenchmarkRising ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#1f5c3a] text-[#feae32] text-[10px] font-bold">
                          🚀 Rising Star
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#f9ebe4] text-[#404942] text-[10px] font-bold">
                          Steady
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
