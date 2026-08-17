'use client'

import * as React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { formatCurrency } from '@/lib/utils'
import { CURRENCY } from '@/lib/constants'

export interface CompoundingResult {
  trade: number
  endBalance: number
}

export interface CompoundingChartProps {
  results: CompoundingResult[]
}

export const CompoundingChart: React.FC<CompoundingChartProps> = ({ results }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={results} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis 
            dataKey="trade" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${CURRENCY}${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(18, 18, 26, 0.8)', 
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: '#e2e8f0'
            }}
            formatter={(value: any) => [formatCurrency(value), 'Balance']}
            labelFormatter={(label) => `Trade ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="endBalance" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorGrowth)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
