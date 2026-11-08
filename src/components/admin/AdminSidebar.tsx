'use client';

import React from 'react';
import Link from 'next/link';

export type AdminNavTab =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'marketing'
  | 'festival'
  | 'reviews'
  | 'finance';

interface AdminSidebarProps {
  activeTab: AdminNavTab;
  onSelectTab: (tab: AdminNavTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  pendingOrdersCount?: number;
  lowStockCount?: number;
}

export default function AdminSidebar({
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
  pendingOrdersCount = 18,
  lowStockCount = 7,
}: AdminSidebarProps) {
  const navItems: {
    id: AdminNavTab;
    label: string;
    labelMl: string;
    icon: string;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Overview',
      labelMl: 'കൺസോൾ',
      icon: 'dashboard',
    },
    {
      id: 'products',
      label: 'Products & Catalog',
      labelMl: 'ചരക്കുകൾ',
      icon: 'inventory_2',
      badge: lowStockCount > 0 ? `${lowStockCount} Alert` : undefined,
      badgeColor: 'bg-[#feae32] text-[#211a16]',
    },
    {
      id: 'orders',
      label: 'Orders & Dispatch',
      labelMl: 'ഓർഡറുകൾ',
      icon: 'local_shipping',
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} Rush` : undefined,
      badgeColor: 'bg-[#a2004e] text-white',
    },
    {
      id: 'marketing',
      label: 'Marketing & Growth',
      labelMl: 'പരസ്യം',
      icon: 'campaign',
    },
    {
      id: 'festival',
      label: 'Festival & Themes',
      labelMl: 'ഉത്സവ തീമുകൾ',
      icon: 'celebration',
      badge: 'Live',
      badgeColor: 'bg-[#94d2a7] text-[#00210f]',
    },
    {
      id: 'reviews',
      label: 'Customer Reviews',
      labelMl: 'റിവ്യൂകൾ',
      icon: 'reviews',
      badge: '4.9★',
      badgeColor: 'bg-[#feae32] text-[#211a16]',
    },
    {
      id: 'finance',
      label: 'Financials & P&L',
      labelMl: 'പണം & ലാഭം',
      icon: 'payments',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#1f5c3a] text-[#fff8f5] z-50 flex flex-col justify-between p-5 border-r border-[#94d2a7]/20 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex flex-col group cursor-pointer"
              title="Return to Hatke Storefront"
            >
              <div className="flex items-center gap-2">
                <span className="font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-[#fff8f5]">
                  Hat
                  <span className="inline-block transform rotate-[9deg] text-[#feae32] transition-transform group-hover:rotate-[18deg]">
                    k
                  </span>
                  e
                </span>
                <span className="bg-[#feae32] text-[#211a16] text-[10px] font-['Bricolage_Grotesque'] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[1px_1px_0px_#211a16]">
                  Admin Hub
                </span>
              </div>
              <p className="font-['Baloo_Chettan_2'] text-xs text-[#94d2a7] mt-0.5 leading-snug">
                Thoda sale, poora hatke! • കേരള ബസാർ
              </p>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl hover:bg-[#94d2a7]/20 text-[#fff8f5]"
              aria-label="Close Navigation"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all group ${
                    isActive
                      ? 'bg-[#004425] text-[#feae32] font-bold shadow-[2px_2px_0px_#111827] translate-x-1'
                      : 'text-[#fff8f5]/85 hover:bg-[#94d2a7]/15 hover:text-[#fff8f5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#feae32]' : 'text-[#94d2a7]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <span className="font-['DM_Sans'] text-sm tracking-wide block leading-tight">
                        {item.label}
                      </span>
                      <span className="font-['Baloo_Chettan_2'] text-[11px] text-[#94d2a7]/80 block leading-tight">
                        {item.labelMl}
                      </span>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-['Bricolage_Grotesque'] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                        item.badgeColor || 'bg-[#feae32] text-[#211a16]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Campaign Card & Quick Actions */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#94d2a7]/20">
          <div className="bg-[#004425] p-3.5 rounded-2xl border border-[#94d2a7]/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-['Bricolage_Grotesque'] font-bold text-[#feae32] uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#feae32] animate-pulse" />
                Vishu Kaineettam Sale
              </span>
              <span className="text-[10px] font-bold bg-[#94d2a7]/20 text-[#94d2a7] px-1.5 py-0.5 rounded">
                87% Target
              </span>
            </div>
            <p className="text-[11px] text-[#fff8f5]/80 font-['DM_Sans'] mb-2.5">
              Live Kerala campaign active. WhatsApp order pings at 94.6% deliverability.
            </p>
            <div className="w-full h-1.5 bg-[#1f5c3a] rounded-full overflow-hidden mb-2.5">
              <div className="h-full bg-[#feae32] rounded-full" style={{ width: '87%' }} />
            </div>
            <button
              onClick={() => {
                onSelectTab('festival');
                onCloseMobile();
              }}
              className="w-full py-1.5 text-xs font-['DM_Sans'] font-bold bg-[#feae32] text-[#211a16] rounded-xl hover:bg-[#e59d28] transition-colors flex items-center justify-center gap-1.5 shadow-[1px_1px_0px_#211a16]"
            >
              <span className="material-symbols-outlined text-[16px]">celebration</span>
              Manage Campaign
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#94d2a7]/80 px-1 font-['DM_Sans']">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Storefront Online
            </span>
            <Link
              href="/"
              target="_blank"
              className="hover:text-[#feae32] flex items-center gap-0.5 underline text-[11px]"
            >
              Live Site
              <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
