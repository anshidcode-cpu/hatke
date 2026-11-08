'use client';

import React, { useState } from 'react';

export default function AdminMarketingTab() {
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('vishu');

  const templates = [
    {
      id: 'vishu',
      name: 'Vishu Kaineettam 20% Flash Perk',
      nameMl: 'വിഷുക്കൈനീട്ടം സ്പെഷ്യൽ ഓഫർ',
      sentCount: '4,820 Kerala numbers',
      deliveryRate: '94.6%',
      openRate: '68.2%',
      preview:
        'നമസ്കാരം! ഹാത്കെ വിഷുക്കൈനീട്ടം ആരംഭിച്ചു. പരമ്പരാഗത പിച്ചള പാത്രങ്ങൾക്കും അടുക്കള ഗാഡ്‌ജെറ്റുകൾക്കും 20% കിഴിവ്! കോഡ്: VISHU20.',
    },
    {
      id: 'abandoned',
      name: 'Abandoned Potli Gentle Nudge',
      nameMl: 'കാർട്ടിലെ ഉൽപ്പന്നങ്ങൾ കാത്തിരിക്കുന്നു',
      sentCount: '342 abandoned carts',
      deliveryRate: '98.1%',
      openRate: '74.5%',
      preview:
        'നിങ്ങളുടെ കാർട്ടിലെ അടിപൊളി ചോപ്പറും വിളക്കും നിങ്ങൾക്കായി കരുതിവെച്ചിട്ടുണ്ട്! ഇപ്പോൾ ഓർഡർ ചെയ്താൽ നാളെ വൈകുന്നേരത്തിനകം വീട്ടിലെത്തും.',
    },
    {
      id: 'delivery',
      name: 'Live Bluedart Rider Dispatch Alert',
      nameMl: 'പാഴ്സൽ കൊച്ചി ഹബ്ബിൽ നിന്ന് പുറപ്പെട്ടു',
      sentCount: '1,280 dispatches',
      deliveryRate: '99.2%',
      openRate: '88.4%',
      preview:
        'ഹാത്കെ ഓർഡർ #HK-8842 ഇപ്പോൾ ഡെലിവറി റൈഡറുടെ കൈവശം എത്തിയിരിക്കുന്നു. സുരക്ഷിതമായി നിങ്ങളുടെ കൈകളിൽ ഉടൻ എത്തും!',
    },
  ];

  const buyers = [
    {
      name: 'Anjali Menon',
      phone: '+91 98471 •••••',
      city: 'Kochi, Ernakulam',
      orders: 8,
      ltv: '₹14,820',
      badge: 'Loyal Patron',
      badgeColor: 'bg-[#b1f1c4] text-[#00210f]',
    },
    {
      name: 'Fahad Rasheed',
      phone: '+91 94473 •••••',
      city: 'Manjeri, Malappuram',
      orders: 6,
      ltv: '₹9,450',
      badge: 'VIP Buyer',
      badgeColor: 'bg-[#ffddb5] text-[#835400]',
    },
    {
      name: 'Kavitha S.',
      phone: '+91 97455 •••••',
      city: 'Kowdiar, Trivandrum',
      orders: 5,
      ltv: '₹8,200',
      badge: 'Festive Shopper',
      badgeColor: 'bg-[#ffd9e1] text-[#a2004e]',
    },
    {
      name: 'Deepak Nambiar',
      phone: '+91 94960 •••••',
      city: 'Payyambalam, Kannur',
      orders: 4,
      ltv: '₹6,140',
      badge: 'Loyal Patron',
      badgeColor: 'bg-[#b1f1c4] text-[#00210f]',
    },
  ];

  const handleSendBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Marketing KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
          <span className="text-xs font-['DM_Sans'] text-[#707971] uppercase tracking-wider font-semibold block">
            Blended ROAS
          </span>
          <div className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-[#1f5c3a] mt-1">
            4.1x
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            Meta 4.3x • Google 3.8x
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
          <span className="text-xs font-['DM_Sans'] text-[#707971] uppercase tracking-wider font-semibold block">
            Acquisition CAC
          </span>
          <div className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16] mt-1">
            ₹84
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            -14% vs Kerala benchmark
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
          <span className="text-xs font-['DM_Sans'] text-[#707971] uppercase tracking-wider font-semibold block">
            Repeat Purchase Rate
          </span>
          <div className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-[#feae32] mt-1">
            36.4%
          </div>
          <span className="text-[11px] text-[#707971] block mt-1">
            Vishu festive loyalty loop
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
          <span className="text-xs font-['DM_Sans'] text-[#707971] uppercase tracking-wider font-semibold block">
            WhatsApp Deliverability
          </span>
          <div className="text-3xl font-['Bricolage_Grotesque'] font-extrabold text-[#1f5c3a] mt-1">
            94.6%
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            68.2% open rate
          </span>
        </div>
      </div>

      {/* WhatsApp Broadcast Campaign Manager */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-emerald-800 uppercase tracking-wider">
                WHATSAPP AUTOMATED BROADCAST ENGINE
              </span>
            </div>
            <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#211a16]">
              Kerala Regional Customer Outreach
            </h3>
            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Official WhatsApp Business API integration with localized Malayalam copy
            </p>
          </div>

          <button
            onClick={handleSendBroadcast}
            disabled={broadcastSent}
            className="px-5 py-2.5 rounded-full bg-[#1f5c3a] hover:bg-[#14462b] text-white text-xs font-['Bricolage_Grotesque'] font-bold shadow-[2px_2px_0px_#211a16] transition-all flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>
              {broadcastSent ? 'Broadcast Dispatched!' : 'Send WhatsApp Campaign Blast'}
            </span>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#fff8f5] border-[#1f5c3a] shadow-md'
                    : 'bg-white border-[#ede0d9] hover:border-[#c0c9bf]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-['DM_Sans'] font-bold text-xs text-[#211a16]">
                      {tpl.name}
                    </h4>
                    {isSelected && (
                      <span className="text-[9px] font-bold bg-[#1f5c3a] text-white px-2 py-0.5 rounded-full uppercase">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="font-['Baloo_Chettan_2'] text-xs text-[#835400] font-semibold mb-2">
                    {tpl.nameMl}
                  </p>
                  <p className="text-[11px] text-[#404942] bg-[#fff8f5] p-2.5 rounded-xl border border-[#ede0d9] font-['DM_Sans'] line-clamp-3">
                    "{tpl.preview}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#ede0d9] flex items-center justify-between text-[10px] text-[#707971]">
                  <span>{tpl.sentCount}</span>
                  <span className="font-bold text-emerald-700">{tpl.openRate} open rate</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Clusters & Top Kerala Buyers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Regional Acquisition Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16] mb-1">
              Kerala Regional Acquisition
            </h3>
            <p className="text-xs text-[#707971] font-['DM_Sans'] mb-4">
              Geographic split of today's customer conversion
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#211a16] mb-1">
                  <span>Malabar Cluster (കോഴിക്കോട്, കണ്ണൂർ, മലപ്പുറം)</span>
                  <span>46%</span>
                </div>
                <div className="w-full h-2.5 bg-[#f9ebe4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1f5c3a] rounded-full" style={{ width: '46%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#211a16] mb-1">
                  <span>Central Cochin (എറണാകുളം, തൃശ്ശൂർ)</span>
                  <span>34%</span>
                </div>
                <div className="w-full h-2.5 bg-[#f9ebe4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#feae32] rounded-full" style={{ width: '34%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#211a16] mb-1">
                  <span>Travancore & South (തിരുവനന്തപുരം, കൊല്ലം)</span>
                  <span>20%</span>
                </div>
                <div className="w-full h-2.5 bg-[#f9ebe4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#a2004e] rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] mt-4 flex items-center justify-between text-xs">
            <span className="text-[#707971]">Peak buying hour:</span>
            <span className="font-bold text-[#1f5c3a]">7:30 PM - 10:00 PM IST</span>
          </div>
        </div>

        {/* High-Velocity Kerala Buyers (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
                High-Velocity Kerala Buyers
              </h3>
              <p className="text-xs text-[#707971] font-['DM_Sans']">
                Repeat customers driving highest lifetime value (LTV)
              </p>
            </div>
            <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#1f5c3a]">
              184 VIP Patrons
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#ede0d9]">
            <table className="w-full text-left text-xs font-['DM_Sans']">
              <thead className="bg-[#fff8f5] text-[#707971] uppercase tracking-wider font-bold text-[10px] border-b border-[#ede0d9]">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">District / City</th>
                  <th className="py-3 px-4">Orders</th>
                  <th className="py-3 px-4">Total LTV</th>
                  <th className="py-3 px-4 text-right">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede0d9] bg-white">
                {buyers.map((b, i) => (
                  <tr key={i} className="hover:bg-[#fff8f5] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#211a16]">{b.name}</div>
                      <div className="text-[10px] text-[#707971] font-mono">{b.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-[#404942]">{b.city}</td>
                    <td className="py-3 px-4 font-bold text-[#211a16]">{b.orders} orders</td>
                    <td className="py-3 px-4 font-bold text-[#1f5c3a]">{b.ltv}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-[10px] font-['Bricolage_Grotesque'] font-bold px-2 py-0.5 rounded-full ${b.badgeColor}`}
                      >
                        {b.badge}
                      </span>
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
