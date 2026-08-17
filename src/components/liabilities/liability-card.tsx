'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { Trash2, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export interface Liability {
  id: string
  name: string
  type: string
  totalAmount: number
  remainingAmount: number
  monthlyPayment: number
  interestRate: number
  isPaid: boolean
}

export interface LiabilityCardProps {
  liability: Liability
  onMarkPaid: (id: string) => void
  onDelete: (id: string) => void
}

export const LiabilityCard: React.FC<LiabilityCardProps> = ({ liability, onMarkPaid, onDelete }) => {
  const progress = Math.max(0, Math.min(100, ((liability.totalAmount - liability.remainingAmount) / liability.totalAmount) * 100))

  return (
    <Card glowColor={liability.isPaid ? 'emerald' : 'rose'} className="relative">
      {liability.isPaid && (
        <div className="absolute top-4 right-4 text-emerald-500">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-200 font-semibold">{liability.name}</h3>
          <Badge variant={liability.isPaid ? 'emerald' : 'rose'} className="mt-1">{liability.type}</Badge>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Paid: {formatCurrency(liability.totalAmount - liability.remainingAmount)}</span>
          <span className="text-slate-200 font-medium">{formatCurrency(liability.remainingAmount)} remaining</span>
        </div>
        <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/[0.06]">
        <div>
          <div className="text-slate-500 text-xs mb-1">Monthly Payment</div>
          <div className="text-slate-200 font-medium">{formatCurrency(liability.monthlyPayment)}</div>
        </div>
        <div>
          <div className="text-slate-500 text-xs mb-1">Interest Rate</div>
          <div className="text-rose-400 font-medium">{formatPercent(liability.interestRate)}</div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {!liability.isPaid && (
          <button onClick={() => onMarkPaid(liability.id)} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 py-2 rounded-lg text-sm font-medium transition-colors">
            Mark as Paid
          </button>
        )}
        <button onClick={() => onDelete(liability.id)} className="p-2 bg-white/[0.06] hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </Card>
  )
}
