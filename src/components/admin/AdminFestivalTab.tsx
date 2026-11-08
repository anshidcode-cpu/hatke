'use client';

import React, { useState } from 'react';

type FestivalKey = 'vishu' | 'onam' | 'diwali' | 'monsoon' | 'standard';

interface ThemeProfile {
  title: string;
  titleMl: string;
  desc: string;
  ribbonText: string;
  ribbonBg: string;
  ribbonTextCol: string;
  tag: string;
  heroTag: string;
  heroHeading: string;
  badgeRotate: string;
  primaryColor: string;
}

const THEME_PROFILES: Record<FestivalKey, ThemeProfile> = {
  vishu: {
    title: 'Vishu Kaineettam 2026',
    titleMl: 'വിഷുക്കൈനീട്ടം മഹോത്സവം',
    desc: 'Golden mango & vazhayila green palette with brass bell motifs.',
    ribbonText: '🌼 വിഷുക്കൈനീട്ടം SALE: Flat ₹150 OFF on orders above ₹999 with code VISHU',
    ribbonBg: 'bg-[#feae32]',
    ribbonTextCol: 'text-[#211a16]',
    tag: 'Vishu Kaineettam',
    heroTag: 'KERALA NEW YEAR EXCLUSIVE',
    heroHeading: 'Vishu Kaineettam Handcrafted Daily Bazaar',
    badgeRotate: 'rotate-[9deg]',
    primaryColor: '#feae32',
  },
  onam: {
    title: 'Onam Ponn Onam',
    titleMl: 'ഓണം പൊന്നോണം',
    desc: 'Athapookkalam floral palette with marigold orange accents.',
    ribbonText: '🌼 ഓണം പൊന്നോണം SALE: Flat 40% OFF with code ONAM उत्सव',
    ribbonBg: 'bg-[#e65100]',
    ribbonTextCol: 'text-white',
    tag: 'Onam Utsavam',
    heroTag: 'ATHAPOOKKALAM EXCLUSIVE',
    heroHeading: 'Grand Onam Sadya & Attire Festival',
    badgeRotate: 'rotate-[-6deg]',
    primaryColor: '#e65100',
  },
  diwali: {
    title: 'Deepavali Dhamaka',
    titleMl: 'ദീപാവലി ധമാക്ക',
    desc: 'Rani pink and brass gold lantern theme with festive sparkles.',
    ribbonText: '🪔 DIWALI BAZAAR DHAMAKA: Extra 20% Cashback on Gold Coins',
    ribbonBg: 'bg-[#a2004e]',
    ribbonTextCol: 'text-white',
    tag: 'Deepavali Dhamaka',
    heroTag: 'ROYAL BRASS & LIGHTS',
    heroHeading: 'Diwali Lanterns & Festive Gift Boxes',
    badgeRotate: 'rotate-[7deg]',
    primaryColor: '#a2004e',
  },
  monsoon: {
    title: 'Edavappathi Monsoon',
    titleMl: 'ഇടവപ്പാതി മഴക്കാലം',
    desc: 'Teal & emerald rain theme with warm masala chai herbal specials.',
    ribbonText: '🌧️ EDAVAPPATHI MONSOON CHILL: Free Tea Strainer with Spices',
    ribbonBg: 'bg-[#1f5c3a]',
    ribbonTextCol: 'text-white',
    tag: 'Monsoon Special',
    heroTag: 'HOT BREW & HERBALS',
    heroHeading: 'Monsoon Immunity & Rain Gear Bazaar',
    badgeRotate: 'rotate-[-4deg]',
    primaryColor: '#1f5c3a',
  },
  standard: {
    title: 'Hatke Standard Bazaar',
    titleMl: 'ഹാത്കെ ഡെയ്‌ലി ബസാർ',
    desc: 'Signature Vazhayila green and mango gold minimal bazaar aesthetic.',
    ribbonText: '🛍️ DAILY BAZAAR: Free express shipping above ₹499 across Kerala',
    ribbonBg: 'bg-[#211a16]',
    ribbonTextCol: 'text-white',
    tag: 'Hatke Standard',
    heroTag: 'DAILY ESSENTIALS',
    heroHeading: 'Authentic Kerala Groceries & Everyday Finds',
    badgeRotate: 'rotate-[9deg]',
    primaryColor: '#1f5c3a',
  },
};

export default function AdminFestivalTab() {
  const [selectedTheme, setSelectedTheme] = useState<FestivalKey>('vishu');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [confettiActive, setConfettiActive] = useState(true);
  const [floatingBadgeActive, setFloatingBadgeActive] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const activeProfile = THEME_PROFILES[selectedTheme];

  const handlePublishLive = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 p-4 bg-[#1f5c3a] text-white rounded-2xl shadow-2xl border-2 border-[#feae32] animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-[24px] text-[#feae32]">
            check_circle
          </span>
          <div>
            <h5 className="font-['Bricolage_Grotesque'] text-sm font-bold">
              Theme Published Live to Kerala Storefront!
            </h5>
            <p className="text-xs text-[#94d2a7] font-['DM_Sans']">
              "{activeProfile.title}" is now broadcasting across all customer devices.
            </p>
          </div>
        </div>
      )}

      {/* Top Header & Overview */}
      <div className="p-6 rounded-3xl bg-white border border-[#ede0d9] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#feae32] animate-ping" />
            <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#835400] uppercase tracking-wider">
              STOREFRONT FESTIVAL THEME ENGINE
            </span>
          </div>
          <h2 className="text-2xl font-['Bricolage_Grotesque'] font-bold text-[#211a16]">
            Festive Themes & Live Storefront Simulator
          </h2>
          <p className="text-xs sm:text-sm text-[#707971] font-['DM_Sans']">
            Select seasonal campaigns, adjust reactive confetti & stamps, and preview live before broadcasting.
          </p>
        </div>

        <button
          onClick={handlePublishLive}
          className="px-6 py-3 rounded-full bg-[#1f5c3a] hover:bg-[#14462b] text-white font-['Bricolage_Grotesque'] font-bold text-sm shadow-[3px_3px_0px_#211a16] hover:translate-y-[-1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">publish</span>
          <span>Publish Live to Storefront</span>
        </button>
      </div>

      {/* Grid: Theme Selector (Left 5 cols) + Simulator (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Themes List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-['Bricolage_Grotesque'] text-base font-bold text-[#211a16] px-1">
            Available Regional Themes
          </h3>

          {(Object.keys(THEME_PROFILES) as FestivalKey[]).map((key) => {
            const theme = THEME_PROFILES[key];
            const isSelected = selectedTheme === key;

            return (
              <div
                key={key}
                onClick={() => setSelectedTheme(key)}
                className={`p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  isSelected
                    ? 'bg-[#fff8f5] border-[#1f5c3a] shadow-[3px_3px_0px_#1f5c3a]'
                    : 'bg-white border-[#ede0d9] hover:border-[#c0c9bf]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <h4 className="font-['DM_Sans'] font-bold text-sm text-[#211a16]">
                      {theme.title}
                    </h4>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-['Bricolage_Grotesque'] font-bold bg-[#1f5c3a] text-white px-2 py-0.5 rounded-full uppercase">
                      Active
                    </span>
                  )}
                </div>

                <p className="font-['Baloo_Chettan_2'] text-xs text-[#835400] font-medium">
                  {theme.titleMl}
                </p>
                <p className="text-xs text-[#707971] font-['DM_Sans'] mt-1 line-clamp-1">
                  {theme.desc}
                </p>
              </div>
            );
          })}

          {/* Interactive Controls (Confetti & Badge) */}
          <div className="p-4 rounded-2xl bg-white border border-[#ede0d9] space-y-3 mt-4">
            <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#211a16] uppercase tracking-wider block">
              Reactive Storefront Controls
            </span>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-['DM_Sans'] font-semibold text-[#211a16] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#feae32]">
                  auto_awesome
                </span>
                Festive Confetti Particles
              </span>
              <input
                type="checkbox"
                checked={confettiActive}
                onChange={(e) => setConfettiActive(e.target.checked)}
                className="w-4 h-4 accent-[#1f5c3a] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#ede0d9]">
              <span className="text-xs font-['DM_Sans'] font-semibold text-[#211a16] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#a2004e]">
                  loyalty
                </span>
                Floating Promotional Badge
              </span>
              <input
                type="checkbox"
                checked={floatingBadgeActive}
                onChange={(e) => setFloatingBadgeActive(e.target.checked)}
                className="w-4 h-4 accent-[#1f5c3a] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Right: Live Storefront Simulator */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Simulator Header & Device Switcher */}
          <div className="p-4 bg-white rounded-t-3xl border border-[#ede0d9] border-b-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-['Bricolage_Grotesque'] text-xs font-bold text-[#211a16] uppercase tracking-wider">
                Live Store Simulator
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#fff8f5] p-1 rounded-full border border-[#ede0d9]">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1 rounded-full text-xs font-bold font-['DM_Sans'] flex items-center gap-1 transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-[#1f5c3a] text-white shadow-xs'
                    : 'text-[#707971] hover:text-[#211a16]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1 rounded-full text-xs font-bold font-['DM_Sans'] flex items-center gap-1 transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-[#1f5c3a] text-white shadow-xs'
                    : 'text-[#707971] hover:text-[#211a16]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">smartphone</span>
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Simulator Screen Surface */}
          <div className="bg-[#FAF9F6] border border-[#ede0d9] rounded-b-3xl p-4 sm:p-6 flex-1 min-h-[460px] flex items-center justify-center overflow-hidden relative">
            <div
              className={`w-full transition-all duration-300 ${
                deviceView === 'mobile'
                  ? 'max-w-[340px] bg-white rounded-[32px] border-8 border-[#211a16] shadow-2xl overflow-hidden'
                  : 'bg-white rounded-2xl border border-[#ede0d9] shadow-lg overflow-hidden'
              }`}
            >
              {/* Confetti Animation Layer if Active */}
              {confettiActive && (
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  <div className="absolute top-2 left-6 text-sm animate-bounce">✨</div>
                  <div className="absolute top-8 right-12 text-sm animate-pulse">🎊</div>
                  <div className="absolute top-16 left-28 text-xs animate-spin">🌼</div>
                  <div className="absolute top-24 right-20 text-xs animate-bounce">🎉</div>
                </div>
              )}

              {/* Floating Badge if Active */}
              {floatingBadgeActive && (
                <div
                  className={`absolute bottom-6 right-6 z-30 px-3 py-1.5 rounded-full bg-[#feae32] text-[#211a16] font-['Bricolage_Grotesque'] font-black text-xs shadow-[3px_3px_0px_#211a16] transform ${activeProfile.badgeRotate} transition-transform`}
                >
                  {activeProfile.tag}
                </div>
              )}

              {/* Top Announcement Ribbon */}
              <div
                className={`${activeProfile.ribbonBg} ${activeProfile.ribbonTextCol} px-3 py-1.5 text-center text-[11px] font-['DM_Sans'] font-bold tracking-wide flex items-center justify-center gap-1.5`}
              >
                <span>{activeProfile.ribbonText}</span>
              </div>

              {/* Mini Mock Navbar */}
              <div className="px-4 py-2.5 border-b border-[#ede0d9] flex items-center justify-between bg-white">
                <div className="flex items-center gap-1">
                  <span className="font-['Bricolage_Grotesque'] font-black text-base text-[#211a16]">
                    Hat<span className="text-[#feae32]">k</span>e
                  </span>
                  <span className="text-[9px] bg-[#1f5c3a] text-white px-1.5 py-0.2 rounded font-bold">
                    Desi Mart
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-['Baloo_Chettan_2'] text-[#1f5c3a] font-bold">മലയാളം</span>
                  <span className="bg-[#feae32] px-2 py-0.5 rounded-full font-bold text-[10px]">
                    Potli (0)
                  </span>
                </div>
              </div>

              {/* Mini Mock Hero Section */}
              <div className="p-5 text-center bg-[#fff8f5] border-b border-[#ede0d9]">
                <span className="text-[10px] font-['Bricolage_Grotesque'] font-extrabold px-2 py-0.5 rounded-full bg-[#1f5c3a] text-white uppercase tracking-wider inline-block mb-2">
                  {activeProfile.heroTag}
                </span>
                <h4 className="font-['Bricolage_Grotesque'] text-lg font-extrabold text-[#211a16] leading-tight">
                  {activeProfile.heroHeading}
                </h4>
                <p className="text-[11px] text-[#707971] mt-1 font-['DM_Sans']">
                  Thoda sale, poora hatke! Kerala's favourite everyday bazaar.
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button className="px-3.5 py-1.5 rounded-full bg-[#1f5c3a] text-white text-[11px] font-bold shadow-[2px_2px_0px_#211a16]">
                    Shop Vishu Deals
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-white border border-[#211a16] text-[#211a16] text-[11px] font-bold">
                    9 Craft Stamps
                  </button>
                </div>
              </div>

              {/* Sample Product Cards Row */}
              <div className="p-4 grid grid-cols-2 gap-2.5 bg-white">
                <div className="p-2.5 rounded-xl border border-[#ede0d9] bg-[#fff8f5]">
                  <div className="w-full h-16 bg-[#ede0d9] rounded-lg mb-2 flex items-center justify-center text-[#707971] text-xs">
                    🍳 Cookware
                  </div>
                  <span className="text-xs font-bold text-[#211a16] block line-clamp-1">
                    Brass Puttu Maker
                  </span>
                  <span className="text-xs font-extrabold text-[#1f5c3a]">₹999</span>
                </div>

                <div className="p-2.5 rounded-xl border border-[#ede0d9] bg-[#fff8f5]">
                  <div className="w-full h-16 bg-[#ede0d9] rounded-lg mb-2 flex items-center justify-center text-[#707971] text-xs">
                    ⚡ Tech Gizmo
                  </div>
                  <span className="text-xs font-bold text-[#211a16] block line-clamp-1">
                    Retro Mos-Racket
                  </span>
                  <span className="text-xs font-extrabold text-[#1f5c3a]">₹499</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
