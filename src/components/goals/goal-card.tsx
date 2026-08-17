'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { calculateDebtTargets } from '@/services/finance-math'
import { Trash2, Target } from 'lucide-react'
import { motion } from 'framer-motion'

export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

export interface GoalCardProps {
  goal: Goal
  onDelete: (id: string) => void
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete }) => {
  const progress = Math.min(100, Math.max(0, (goal.currentAmount / goal.targetAmount) * 100))
  
  let colorTheme = 'rose'
  let textColor = 'text-rose-400'
  let strokeColor = 'stroke-rose-500'
  
  if (progress >= 70) {
    colorTheme = 'emerald'
    textColor = 'text-emerald-400'
    strokeColor = 'stroke-emerald-500'
  } else if (progress >= 30) {
    colorTheme = 'amber'
    textColor = 'text-amber-400'
    strokeColor = 'stroke-amber-500'
  }

  // Use a dummy timeframe for targets
  const targets = calculateDebtTargets(goal.targetAmount - goal.currentAmount, 30)

  const radius = 30
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <Card glowColor={colorTheme as any} className="relative">
      <button onClick={() => onDelete(goal.id)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle className="stroke-white/[0.06] fill-none" strokeWidth="6" cx="40" cy="40" r={radius} />
            <motion.circle
              className={`fill-none ${strokeColor}`}
              strokeWidth="6"
              strokeLinecap="round"
              cx="40"
              cy="40"
              r={radius}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1 }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <span className={`absolute text-sm font-bold ${textColor}`}>{Math.round(progress)}%</span>
        </div>
        <div>
          <h3 className="text-slate-100 font-semibold text-lg">{goal.title}</h3>
          <p className="text-slate-400 text-sm">Target: {formatCurrency(goal.targetAmount)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 bg-[#12121a] rounded-lg border border-white/[0.06]">
        <div className="text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Daily</div>
          <div className={`font-semibold text-sm ${textColor}`}>{formatCurrency(targets.daily)}</div>
        </div>
        <div className="text-center border-l border-white/[0.06]">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Weekly</div>
          <div className={`font-semibold text-sm ${textColor}`}>{formatCurrency(targets.weekly)}</div>
        </div>
        <div className="text-center border-l border-white/[0.06]">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Monthly</div>
          <div className={`font-semibold text-sm ${textColor}`}>{formatCurrency(targets.monthly)}</div>
        </div>
      </div>
    </Card>
  )
}
