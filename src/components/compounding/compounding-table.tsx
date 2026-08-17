'use client'

import * as React from 'react'
import { formatCurrency } from '@/lib/utils'

export interface CompoundingResult {
  trade: number
  startBalance: number
  profit: number
  endBalance: number
}

export interface CompoundingTableProps {
  results: CompoundingResult[]
}

export const CompoundingTable: React.FC<CompoundingTableProps> = ({ results }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-400 bg-white/[0.04] border-b border-white/[0.06]">
          <tr>
            <th className="px-6 py-4 font-medium">Trade #</th>
            <th className="px-6 py-4 font-medium">Start Balance</th>
            <th className="px-6 py-4 font-medium">Profit</th>
            <th className="px-6 py-4 font-medium">End Balance</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, index) => {
            const isLast = index === results.length - 1
            return (
              <tr 
                key={row.trade} 
                className={`border-b border-white/[0.06] last:border-0 ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                } ${isLast ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300'}`}
              >
                <td className="px-6 py-4">{row.trade}</td>
                <td className="px-6 py-4">{formatCurrency(row.startBalance)}</td>
                <td className="px-6 py-4 text-emerald-400">{formatCurrency(row.profit)}</td>
                <td className="px-6 py-4">{formatCurrency(row.endBalance)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
