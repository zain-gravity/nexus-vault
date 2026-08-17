'use client'

import * as React from 'react'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp, TrendingDown, Activity, ShieldCheck } from 'lucide-react'

export type HealthScore = number

export interface QuickStatsGridProps {
  totalIncome: number
  totalExpenses: number
  activeStreams: number
  healthScore: HealthScore
}

export const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({ totalIncome, totalExpenses, activeStreams, healthScore }) => {
  const stats = [
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'emerald',
      bgClass: 'bg-emerald-500/10',
      textClass: 'text-emerald-400',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'rose',
      bgClass: 'bg-rose-500/10',
      textClass: 'text-rose-400',
    },
    {
      label: 'Active Streams',
      value: activeStreams.toString(),
      icon: Activity,
      color: 'blue',
      bgClass: 'bg-blue-500/10',
      textClass: 'text-blue-400',
    },
    {
      label: 'Health Score',
      value: healthScore.toString() + '/100',
      icon: ShieldCheck,
      color: 'amber',
      bgClass: 'bg-amber-500/10',
      textClass: 'text-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.05] transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2.5 rounded-lg ${stat.bgClass} ${stat.textClass}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-slate-400 text-sm font-medium">{stat.label}</h4>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
