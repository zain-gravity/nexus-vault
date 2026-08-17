'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
  id?: string
  className?: string
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label, id, className }) => {
  const toggleId = id || React.useId()

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]',
          enabled ? 'bg-emerald-500' : 'bg-white/[0.1]'
        )}
      >
        <span className="sr-only">Toggle {label}</span>
        <motion.span
          layout
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          animate={{ x: enabled ? 26 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      {label && (
        <label htmlFor={toggleId} className="text-sm font-medium text-slate-300 cursor-pointer" onClick={() => onChange(!enabled)}>
          {label}
        </label>
      )}
    </div>
  )
}
