'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { MobileNav } from '@/components/layout/mobile-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'md:pl-[72px]' : 'md:pl-[280px]'}`}>
        <Topbar />
        
        <main className="flex-1 pt-16 pb-20 md:pb-0 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
