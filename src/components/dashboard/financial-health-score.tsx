'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FinancialHealthScoreProps {
  score: number // 0-100
}

export const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ score }) => {
  let colorClass = 'text-rose-500'
  let strokeClass = 'stroke-rose-500'
  let grade = 'Critical'

  if (score >= 80) {
    colorClass = 'text-emerald-500'
    strokeClass = 'stroke-emerald-500'
    grade = 'Excellent'
  } else if (score >= 60) {
    colorClass = 'text-blue-500'
    strokeClass = 'stroke-blue-500'
    grade = 'Good'
  } else if (score >= 40) {
    colorClass = 'text-amber-500'
    strokeClass = 'stroke-amber-500'
    grade = 'Fair'
  }

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="stroke-white/[0.06] fill-none"
            strokeWidth="8"
            cx="50"
            cy="50"
            r={radius}
          />
          {/* Progress circle */}
          <motion.circle
            className={cn('fill-none', strokeClass)}
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={cn('text-3xl font-bold', colorClass)}>{score}</span>
        </div>
      </div>
      <div className={cn('mt-4 font-medium text-lg', colorClass)}>{grade}</div>
    </div>
  )
}
