'use client';

import React, { useState } from 'react';

export default function AdminReviewsTab() {
  const [autoModOn, setAutoModOn] = useState(true);
  const [spamDismissed, setSpamDismissed] = useState(false);

  const reviews = [
    {
      id: 1,
      author: 'Anjali Mohandas',
      city: 'Thrissur Town',
      product: 'Kerala Brass Puttu Maker',
      rating: 5,
      date: 'Today, 2:15 PM',
      reviewMl:
        'വളരെ നല്ല ക്വാളിറ്റി! പിച്ചള പുട്ടുകുറ്റിയിൽ ഉണ്ടാക്കിയ പുട്ടിന് നല്ല മണവും രുചിയും. പാക്കേജിംഗ് സൂപ്പറായിരുന്നു, ഒരു കേടുപാടും ഇല്ലാതെ കൃത്യസമയത്ത് എത്തി.',
      verified: true,
    },
    {
      id: 2,
      author: 'Rahul Krishnan',
      city: 'Kozhikode Beach Road',
      product: 'Handcrafted Banana Chips Slicer',
      rating: 5,
      date: 'Yesterday',
      reviewMl:
        'നേന്ത്രക്കായ വളരെ നൈസ് ആയി സ്ലൈസ് ചെയ്യാൻ പറ്റുന്നുണ്ട്. പണ്ടത്തെപ്പോലെ കൈ മുറിയുമെന്ന പേടി വേണ്ട. വിഷുവിന് ചിപ്സ് ഉണ്ടാക്കാൻ ഇനി ഇതാണ് ബെസ്റ്റ്.',
      verified: true,
    },
    {
      id: 3,
      author: 'Deepa Varghese',
      city: 'Kadavanthra, Kochi',
      product: 'Smart Rechargeable Mos-Racket',
      rating: 5,
      date: '2 days ago',
      reviewMl:
        'ബാറ്ററി ലൈഫ് ഗംഭീരം! കൊച്ചിയിലെ കൊതുക് ശല്യത്തിന് ഒരു ശാശ്വത പരിഹാരം. ബിൽഡ് ക്വാളിറ്റി വളരെ മികച്ചതാണ്. ധൈര്യമായി വാങ്ങാം.',
      verified: true,
    },
    {
      id: 4,
      author: 'Sreehari Nair',
      city: 'Vattiyoorkavu, Trivandrum',
      product: 'Retro Coconut Scraper Pro',
      rating: 4,
      date: '3 days ago',
      reviewMl:
        'നല്ല സാധനം. തേങ്ങ ചിരകാൻ വളരെ എളുപ്പമാണ്. വാക്വം ബേസ് കിച്ചൺ ടോപ്പിൽ നല്ലപോലെ ഉറച്ചുനിൽക്കുന്നുണ്ട്. ഡെലിവറി കുറച്ചുകൂടി വേഗത്തിലാക്കാമായിരുന്നു.',
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Sentiment & Overall Rating Summary */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Rating big score (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#ede0d9] pb-4 lg:pb-0 lg:pr-6">
            <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#835400] uppercase tracking-wider mb-1">
              STOREWIDE REPUTATION SCORE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-['Bricolage_Grotesque'] font-extrabold text-[#211a16]">
                4.9
              </span>
              <span className="text-lg text-[#707971] font-bold">/ 5.0</span>
            </div>

            <div className="flex items-center gap-1 my-2 text-[#feae32]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px] fill-current">
                  star
                </span>
              ))}
            </div>

            <p className="text-xs text-[#707971] font-['DM_Sans']">
              Based on <strong className="text-[#211a16]">4,820</strong> verified Kerala buyer reviews
            </p>
          </div>

          {/* Star Rating Breakdown Bar (4 cols) */}
          <div className="lg:col-span-4 space-y-1.5 text-xs font-['DM_Sans']">
            {[
              { star: '5★', pct: 91, count: '4,386' },
              { star: '4★', pct: 7, count: '337' },
              { star: '3★', pct: 1, count: '48' },
              { star: '2★', pct: 0.5, count: '24' },
              { star: '1★', pct: 0.5, count: '25' },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-6 font-bold text-[#211a16] text-right">{row.star}</span>
                <div className="flex-1 h-2 bg-[#f9ebe4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#feae32] rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-10 text-[10px] text-[#707971] text-right">{row.pct}%</span>
              </div>
            ))}
          </div>

          {/* Sentiment Telemetry & AI Auto-Moderator (4 cols) */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#211a16] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sentiment
              </span>
              <span className="text-[10px] font-['Bricolage_Grotesque'] font-bold bg-[#b1f1c4] text-[#00210f] px-2 py-0.5 rounded-full">
                94% POSITIVE
              </span>
            </div>

            <p className="text-xs text-[#707971] font-['DM_Sans'] mb-3">
              Response SLA: <strong className="text-[#1f5c3a]">98.4%</strong> • Malayalam sentiment model active
            </p>

            <button
              onClick={() => setAutoModOn(!autoModOn)}
              className={`w-full py-2 rounded-xl text-xs font-['DM_Sans'] font-bold transition-all flex items-center justify-center gap-1.5 ${
                autoModOn
                  ? 'bg-[#1f5c3a] text-white shadow-xs'
                  : 'bg-white border border-[#c0c9bf] text-[#211a16]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>{autoModOn ? 'AI Auto-Moderator: ON' : 'AI Auto-Moderator: OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flagged Spam Review Warning Box */}
      {!spamDismissed && (
        <div className="p-4 rounded-2xl bg-[#ffdad6] border border-[#ba1a1a]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#ba1a1a] uppercase">
                  Flagged Suspicious Activity
                </span>
                <span className="text-[10px] bg-white text-[#ba1a1a] px-2 py-0.2 rounded font-bold">
                  Security Score: 0.02
                </span>
              </div>
              <p className="text-xs text-[#404942] font-['DM_Sans'] mt-0.5">
                Suspected competitor spambot detected attempting automated 1-star attack from proxy IP 185.220.101.4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSpamDismissed(true)}
              className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-[#404942] hover:bg-[#ede0d9]"
            >
              Ignore
            </button>
            <button
              onClick={() => {
                alert('Spambot review removed and IP blocked on firewall.');
                setSpamDismissed(true);
              }}
              className="px-4 py-1.5 rounded-full bg-[#ba1a1a] text-white text-xs font-['Bricolage_Grotesque'] font-bold shadow-xs hover:bg-[#93000a] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">delete_forever</span>
              <span>Confirm Delete & Block IP</span>
            </button>
          </div>
        </div>
      )}

      {/* Verified Kerala Customer Reviews Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
            Recent Customer Feedback
          </h3>
          <span className="text-xs text-[#707971] font-['DM_Sans']">
            Showing 4 of 4,820 Verified Reviews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-['DM_Sans'] font-bold text-sm text-[#211a16] flex items-center gap-1.5">
                      {r.author}
                      <span className="material-symbols-outlined text-[16px] text-[#1f5c3a]" title="Verified Buyer">
                        verified
                      </span>
                    </h4>
                    <p className="text-xs text-[#707971]">{r.city} • {r.date}</p>
                  </div>

                  <div className="flex items-center text-[#feae32]">
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px] fill-current">
                        star
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#fff8f5] border border-[#ede0d9] text-xs text-[#1f5c3a] font-bold mb-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>{r.product}</span>
                </div>

                <p className="font-['Baloo_Chettan_2'] text-sm text-[#211a16] leading-relaxed">
                  "{r.reviewMl}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ede0d9] flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Verified Purchase
                </span>
                <button
                  onClick={() => alert(`Opening WhatsApp / Email reply modal for ${r.author}`)}
                  className="text-xs font-bold text-[#1f5c3a] hover:underline flex items-center gap-0.5"
                >
                  <span>Reply as Merchant</span>
                  <span className="material-symbols-outlined text-[14px]">reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
