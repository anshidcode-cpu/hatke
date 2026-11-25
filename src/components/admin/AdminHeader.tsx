'use client';

import React from 'react';
import { AdminNavTab } from './AdminSidebar';
import {
  Menu,
  Search,
  Flame,
  RefreshCw,
  Bell,
  LogOut,
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobile: () => void;
  activeTab: AdminNavTab;
  onSelectTab: (tab: AdminNavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  onLogout?: () => void;
}

export default function AdminHeader({
  onOpenMobile,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onRefresh,
  isLoading,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#ede0d9] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      {/* Left: Mobile Drawer Trigger & Current Tab Name */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#ede0d9] text-[#211a16] hover:bg-[#f9ebe4] transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:block">
          <h1 className="font-['Bricolage_Grotesque'] text-base lg:text-lg font-bold text-[#211a16] leading-tight">
            {activeTab === 'dashboard'
              ? 'Analytics Command Center'
              : activeTab === 'products'
              ? 'Curated Inventory Master'
              : activeTab === 'orders'
              ? 'Orders & Kerala Dispatch Hub'
              : activeTab === 'marketing'
              ? 'Marketing & Performance'
              : activeTab === 'festival'
              ? 'Festival & Theme Settings'
              : activeTab === 'reviews'
              ? 'Customer Reviews & Sentiments'
              : 'Financial Reports & True P&L'}
          </h1>
          <p className="font-['Baloo_Chettan_2'] text-[11px] text-[#835400] font-medium leading-tight">
            ഹാത്കെ അഡ്മിൻ കൺസോൾ • Cochin Hub Live
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-sm lg:max-w-md min-w-[140px]">
        <div className="relative">
          <Search className="w-4 h-4 text-[#707971] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search SKU, order #, pin-code..."
            className="w-full bg-white border border-[#c0c9bf] rounded-full pl-9 pr-12 py-1.5 text-xs sm:text-sm text-[#211a16] placeholder:text-[#707971] focus:outline-none focus:border-[#1f5c3a] focus:ring-2 focus:ring-[#1f5c3a]/20 transition-all font-['DM_Sans']"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#f9ebe4] text-[#707971] px-1.5 py-0.5 rounded border border-[#ede0d9] font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Header Action Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Festival Mode Trigger Pill */}
        <button
          onClick={() => onSelectTab('festival')}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffddb5] text-[#2a1800] border border-[#feae32] hover:bg-[#feae32]/30 transition-colors shadow-xs cursor-pointer"
          title="Festival Theme Controls"
        >
          <Flame className="w-4 h-4 text-[#835400]" />
          <span className="text-xs font-['Bricolage_Grotesque'] font-bold whitespace-nowrap">
            Vishu Active
          </span>
        </button>

        {/* Refresh Data Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 rounded-full bg-white border border-[#c0c9bf] text-[#211a16] hover:bg-[#f9ebe4] transition-colors cursor-pointer"
          title="Refresh store data"
        >
          <RefreshCw
            className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#1f5c3a]' : ''}`}
          />
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => onSelectTab('orders')}
            className="p-2 rounded-full bg-white border border-[#c0c9bf] text-[#211a16] hover:bg-[#f9ebe4] transition-colors relative cursor-pointer"
            title="4 Pending Order Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#a2004e] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-['Bricolage_Grotesque']">
              4
            </span>
          </button>
        </div>

        {/* User / Super Admin Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#ede0d9]">
          <div className="w-8 h-8 rounded-full bg-[#1f5c3a] text-[#fff8f5] flex items-center justify-center font-['Bricolage_Grotesque'] font-bold text-xs shadow-xs shrink-0">
            SK
          </div>
          <div className="hidden 2xl:block text-left">
            <span className="text-xs font-['DM_Sans'] font-bold text-[#211a16] block leading-tight whitespace-nowrap">
              Shafeeq K.
            </span>
            <span className="text-[10px] text-[#707971] font-['DM_Sans'] block leading-tight whitespace-nowrap">
              Super Admin • HQ
            </span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 text-[#707971] hover:text-[#ba1a1a] transition-colors cursor-pointer"
              title="Lock Console / Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
