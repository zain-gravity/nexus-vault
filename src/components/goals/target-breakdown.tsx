'use client'

import * as React from 'react'
import { calculateDebtTargets } from '@/services/finance-math'
import { formatCurrency } from '@/lib/utils'
import { Calendar, Clock, CalendarDays } from 'lucide-react'

export interface TargetBreakdownProps {
  totalDebt: number
  timeframeDays: number
}

export const TargetBreakdown: React.FC<TargetBreakdownProps> = ({ totalDebt, timeframeDays }) => {
  const targets = calculateDebtTargets(totalDebt, timeframeDays)

  const items = [
    { label: 'Daily Target', value: targets.daily, icon: Clock },
    { label: 'Weekly Target', value: targets.weekly, icon: CalendarDays },
    { label: 'Monthly Target', value: targets.monthly, icon: Calendar },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <item.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-slate-400 text-sm font-medium">{item.label}</div>
            <div className="text-xl font-bold text-slate-100">{formatCurrency(item.value)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
