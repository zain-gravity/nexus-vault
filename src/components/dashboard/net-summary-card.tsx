'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { formatCurrency, cn } from '@/lib/utils'
import { motion, useMotionValue, animate, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export interface NetSummaryCardProps {
  totalIncome: number
  totalExpenses: number
  netProfitLoss: number
}

export const NetSummaryCard: React.FC<NetSummaryCardProps> = ({ totalIncome, totalExpenses, netProfitLoss }) => {
  const isPositive = netProfitLoss >= 0
  
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const formattedCount = useTransform(rounded, (latest) => formatCurrency(latest))

  React.useEffect(() => {
    const controls = animate(count, netProfitLoss, { duration: 1.5, ease: 'easeOut' })
    return controls.stop
  }, [netProfitLoss, count])

  return (
    <Card glowColor={isPositive ? 'emerald' : 'rose'} className="w-full overflow-hidden relative">
      <div className="relative z-10">
        <h3 className="text-slate-400 font-medium text-sm mb-1">
          {isPositive ? 'Net Profit' : 'Net Loss'}
        </h3>
        <div className="flex items-center gap-3">
          <motion.div className={cn('text-4xl md:text-5xl font-bold tracking-tight', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
            {formattedCount}
          </motion.div>
          <div className={cn('p-2 rounded-full', isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400')}>
            {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
          <div>
            <div className="text-slate-500 text-xs mb-1">Total Income</div>
            <div className="text-slate-200 font-semibold">{formatCurrency(totalIncome)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">Total Expenses</div>
            <div className="text-slate-200 font-semibold">{formatCurrency(totalExpenses)}</div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className={cn(
        'absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none',
        isPositive ? 'bg-emerald-500' : 'bg-rose-500'
      )} />
    </Card>
  )
}
