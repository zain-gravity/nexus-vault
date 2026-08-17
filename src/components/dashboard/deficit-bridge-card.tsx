'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export interface DeficitTargets {
  isDeficit: boolean
  daily: number
  weekly: number
  monthly: number
}

export interface DeficitBridgeCardProps {
  deficitTargets: DeficitTargets
}

export const DeficitBridgeCard: React.FC<DeficitBridgeCardProps> = ({ deficitTargets }) => {
  if (!deficitTargets.isDeficit) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card glowColor="rose" className="border-rose-500/30 bg-rose-500/5">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <h3 className="text-rose-400 font-semibold">Deficit Alert</h3>
        </div>
        <p className="text-slate-300 mb-4">You need to earn extra to cover your deficit:</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#12121a] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-slate-500 text-xs mb-1">Daily</div>
            <div className="text-rose-400 font-bold">{formatCurrency(deficitTargets.daily)}</div>
          </div>
          <div className="bg-[#12121a] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-slate-500 text-xs mb-1">Weekly</div>
            <div className="text-rose-400 font-bold">{formatCurrency(deficitTargets.weekly)}</div>
          </div>
          <div className="bg-[#12121a] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-slate-500 text-xs mb-1">Monthly</div>
            <div className="text-rose-400 font-bold">{formatCurrency(deficitTargets.monthly)}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
