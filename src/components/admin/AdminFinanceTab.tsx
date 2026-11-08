'use client';

import React, { useState } from 'react';

export default function AdminFinanceTab() {
  const [exportingType, setExportingType] = useState<'csv' | 'pdf' | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const clusters = [
    {
      name: 'Malabar Spice Gizmos & Cookware',
      units: '1,420 units',
      revenue: '₹4,82,000',
      cogs: '₹1,92,800',
      ads: '₹42,000',
      margin: '+51.2%',
      marginColor: 'bg-[#b1f1c4] text-[#00210f]',
      gst: 'Pushed to GSTR-1',
    },
    {
      name: 'Smart Tech Gadgets & Cyber Audio',
      units: '980 units',
      revenue: '₹3,42,000',
      cogs: '₹1,53,900',
      ads: '₹48,000',
      margin: '+40.9%',
      marginColor: 'bg-[#b1f1c4] text-[#00210f]',
      gst: 'Pushed to GSTR-1',
    },
    {
      name: 'Festival Brass Handicrafts & Decor',
      units: '640 units',
      revenue: '₹2,64,000',
      cogs: '₹1,05,600',
      ads: '₹28,000',
      margin: '+49.4%',
      marginColor: 'bg-[#b1f1c4] text-[#00210f]',
      gst: 'Pushed to GSTR-1',
    },
    {
      name: 'Kids Desi Toys & Clay Crafts',
      units: '490 units',
      revenue: '₹98,400',
      cogs: '₹41,328',
      ads: '₹14,000',
      margin: '+43.7%',
      marginColor: 'bg-[#b1f1c4] text-[#00210f]',
      gst: 'Pushed to GSTR-1',
    },
    {
      name: 'Home Utility & Cleaning Essentials',
      units: '380 units',
      revenue: '₹62,500',
      cogs: '₹24,672',
      ads: '₹10,000',
      margin: '+44.5%',
      marginColor: 'bg-[#b1f1c4] text-[#00210f]',
      gst: 'Pushed to GSTR-1',
    },
  ];

  const filteredClusters = clusters.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExport = (type: 'csv' | 'pdf') => {
    setExportingType(type);
    setTimeout(() => {
      setExportingType(null);
      // Trigger download
      const filename =
        type === 'csv'
          ? 'Hatke_Kerala_GST_Report_2026.csv'
          : 'Hatke_Chartered_Audit_Report_2026.pdf';
      const dummyContent =
        type === 'csv'
          ? 'Cluster,Units,Revenue,COGS,Ads,Margin,GST\nMalabar Spice,1420,482000,192800,42000,51.2%,Verified'
          : 'Hatke Store - Chartered Accountant Audit Signed by Menon & Associates, Ernakulam.';
      const blob = new Blob([dummyContent], {
        type: type === 'csv' ? 'text/csv' : 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top P&L Executive Summary */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f5c3a]" />
              <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#1f5c3a] uppercase tracking-wider">
                AUDITED FINANCIAL STATEMENT • KERALA GST
              </span>
            </div>
            <h2 className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#211a16]">
              Realized P&L & Margins Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-[#707971] font-['DM_Sans']">
              Live cost-of-goods breakdown reconciled with Cochin bank accounts & payment gateways.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleExport('csv')}
              disabled={exportingType !== null}
              className="px-4 py-2 rounded-full bg-white border border-[#c0c9bf] hover:bg-[#fff8f5] text-xs font-['DM_Sans'] font-bold text-[#211a16] transition-all flex items-center gap-1.5 shadow-xs"
            >
              {exportingType === 'csv' ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin text-[#1f5c3a]">
                    sync
                  </span>
                  <span>Preparing CSV...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px] text-[#1f5c3a]">
                    table_view
                  </span>
                  <span>Export GSTR-1 CSV</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleExport('pdf')}
              disabled={exportingType !== null}
              className="px-4 py-2 rounded-full bg-[#1f5c3a] hover:bg-[#14462b] text-white text-xs font-['Bricolage_Grotesque'] font-bold transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#211a16]"
            >
              {exportingType === 'pdf' ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>Export Tax Audit (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-part Financial Flow Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9]">
            <span className="text-[11px] font-semibold text-[#707971] block">Gross Revenue</span>
            <span className="text-xl font-['Bricolage_Grotesque'] font-bold text-[#211a16] mt-0.5 block">
              ₹12,48,900
            </span>
            <span className="text-[10px] text-emerald-700 font-bold">100% Volume</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9]">
            <span className="text-[11px] font-semibold text-[#707971] block">Total COGS</span>
            <span className="text-xl font-['Bricolage_Grotesque'] font-bold text-[#ba1a1a] mt-0.5 block">
              ₹5,18,300
            </span>
            <span className="text-[10px] text-[#707971]">41.5% of sales</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9]">
            <span className="text-[11px] font-semibold text-[#707971] block">Logistics & SLA</span>
            <span className="text-xl font-['Bricolage_Grotesque'] font-bold text-[#835400] mt-0.5 block">
              ₹98,400
            </span>
            <span className="text-[10px] text-[#707971]">7.9% Express route</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9]">
            <span className="text-[11px] font-semibold text-[#707971] block">Meta & Google Ads</span>
            <span className="text-xl font-['Bricolage_Grotesque'] font-bold text-[#a2004e] mt-0.5 block">
              ₹1,42,000
            </span>
            <span className="text-[10px] text-[#707971]">11.4% (ROAS 4.1x)</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#004425] text-white col-span-2 md:col-span-1 shadow-sm">
            <span className="text-[11px] font-semibold text-[#94d2a7] block">Net Op Margin</span>
            <span className="text-xl font-['Bricolage_Grotesque'] font-extrabold text-[#feae32] mt-0.5 block">
              ₹4,34,800
            </span>
            <span className="text-[10px] text-[#94d2a7] font-bold">34.8% Realized Net</span>
          </div>
        </div>
      </div>

      {/* P&L Cost Cluster Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
              P&L Cost Cluster Matrix
            </h3>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Departmental velocity, unit economics, and GST classification
            </p>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter cluster name..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-full px-3.5 py-1.5 text-xs text-[#211a16] focus:outline-none focus:border-[#1f5c3a]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#ede0d9]">
          <table className="w-full text-left text-xs font-['DM_Sans']">
            <thead className="bg-[#fff8f5] text-[#707971] uppercase tracking-wider font-bold text-[10px] border-b border-[#ede0d9]">
              <tr>
                <th className="py-3 px-4">Cost Cluster</th>
                <th className="py-3 px-4">Dispatched Units</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">COGS</th>
                <th className="py-3 px-4">Ad Spend</th>
                <th className="py-3 px-4">Margin %</th>
                <th className="py-3 px-4 text-right">GST Filing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede0d9] bg-white">
              {filteredClusters.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#fff8f5] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#211a16] text-sm">{row.name}</td>
                  <td className="py-3 px-4 text-[#707971]">{row.units}</td>
                  <td className="py-3 px-4 font-bold text-[#1f5c3a]">{row.revenue}</td>
                  <td className="py-3 px-4 text-[#ba1a1a]">{row.cogs}</td>
                  <td className="py-3 px-4 text-[#a2004e]">{row.ads}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-['Bricolage_Grotesque'] font-bold px-2 py-0.5 rounded-full ${row.marginColor}`}
                    >
                      {row.margin}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-end gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      {row.gst}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 3 Reconciliation & SLA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#b1f1c4] text-[#004425] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">price_check</span>
          </div>
          <div>
            <h4 className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#211a16]">
              ₹0 Unreconciled
            </h4>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Razorpay + PhonePe PG settlement accounts match books perfectly.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffddb5] text-[#835400] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div>
            <h4 className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#211a16]">
              Kerala Express SLA
            </h4>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              97.6% on-time hub dispatch across Cochin & Trivandrum.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd9e1] text-[#a2004e] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <h4 className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#211a16]">
              Chartered Audit Signed
            </h4>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Audited by Menon & Associates, Ernakulam Branch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
