'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'
import { LayoutDashboard, TrendingUp, Receipt, Calculator, Target, BarChart3, Settings } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  Calculator,
  Target,
  BarChart3,
  Settings
}

export const MobileNav = () => {
  const pathname = usePathname()

  // Only take first 5 items for mobile bottom nav
  const items = NAV_ITEMS.slice(0, 5)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#12121a]/90 backdrop-blur-xl border-t border-white/[0.06] pb-safe">
      <nav className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          const Icon = ICON_MAP[item.icon]
          return (
            <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center justify-center gap-1">
              <div className={cn('p-1 rounded-full transition-colors', isActive ? 'text-emerald-400' : 'text-slate-400')}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn('text-[10px] font-medium', isActive ? 'text-emerald-400' : 'text-slate-500')}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
