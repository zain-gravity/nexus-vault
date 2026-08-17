'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'
import { ChevronLeft, ChevronRight, LayoutDashboard, TrendingUp, Receipt, Calculator, Target, BarChart3, Settings } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  Calculator,
  Target,
  BarChart3,
  Settings
}

export interface SidebarProps {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 280 }}
      className="hidden md:flex flex-col h-screen bg-white/[0.02] backdrop-blur-xl border-r border-white/[0.06] sticky top-0"
    >
      <div className="p-4 flex items-center h-16 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">NV</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 font-semibold text-lg text-slate-100 whitespace-nowrap"
          >
            Nexus Vault
          </motion.span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = ICON_MAP[item.icon]
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center rounded-lg px-3 py-2.5 transition-all duration-200 group relative',
                  isActive ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full"
                  />
                )}
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <span className="ml-3 font-medium whitespace-nowrap">{item.label}</span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.06] flex items-center justify-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  )
}
