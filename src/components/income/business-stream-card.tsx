'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import { formatCurrency, formatPercent, cn } from '@/lib/utils'
import { calculateROI } from '@/services/finance-math'
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'

export interface BusinessStream {
  id: string
  name: string
  type: string
  emoji: string
  isActive: boolean
  revenue: number
  profit: number
  investment: number
}

export interface BusinessStreamCardProps {
  stream: BusinessStream
  onToggle: (id: string, active: boolean) => void
  onDelete: (id: string) => void
}

export const BusinessStreamCard: React.FC<BusinessStreamCardProps> = ({ stream, onToggle, onDelete }) => {
  const roi = calculateROI(stream.profit, stream.investment)
  const isPositive = stream.profit >= 0

  return (
    <Card className={cn('relative transition-opacity', !stream.isActive && 'opacity-60')}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-xl">
            {stream.emoji}
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold">{stream.name}</h3>
            <Badge variant="blue" className="mt-1">{stream.type}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Toggle enabled={stream.isActive} onChange={(val) => onToggle(stream.id, val)} />
          <button onClick={() => onDelete(stream.id)} className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="text-slate-500 text-xs mb-1">Revenue</div>
          <div className="text-slate-200 font-medium">{formatCurrency(stream.revenue)}</div>
        </div>
        <div>
          <div className="text-slate-500 text-xs mb-1">Profit/Loss</div>
          <div className={cn('font-medium flex items-center gap-1', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {formatCurrency(Math.abs(stream.profit))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-slate-400 text-sm">ROI</span>
        <span className={cn('font-semibold', roi >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
          {formatPercent(roi)}
        </span>
      </div>
    </Card>
  )
}
