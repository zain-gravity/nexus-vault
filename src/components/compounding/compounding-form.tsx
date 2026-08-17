'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'

export interface CompoundingValues {
  initialCapital: number
  profitPercent: number
  numberOfTrades: number
}

export interface CompoundingFormProps {
  values: CompoundingValues
  onChange: (values: CompoundingValues) => void
}

export const CompoundingForm: React.FC<CompoundingFormProps> = ({ values, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...values, [name]: Number(value) })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl p-6">
      <Input 
        label="Initial Capital" 
        name="initialCapital" 
        type="number" 
        value={values.initialCapital || ''} 
        onChange={handleChange} 
      />
      <Input 
        label="Profit per Trade (%)" 
        name="profitPercent" 
        type="number" 
        step="0.1" 
        value={values.profitPercent || ''} 
        onChange={handleChange} 
      />
      <Input 
        label="Number of Trades" 
        name="numberOfTrades" 
        type="number" 
        value={values.numberOfTrades || ''} 
        onChange={handleChange} 
      />
    </div>
  )
}
