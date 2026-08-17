import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'rose' | 'blue' | 'amber' | 'slate'
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'slate', children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        {
          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': variant === 'emerald',
          'bg-rose-500/10 text-rose-400 border-rose-500/20': variant === 'rose',
          'bg-blue-500/10 text-blue-400 border-blue-500/20': variant === 'blue',
          'bg-amber-500/10 text-amber-400 border-amber-500/20': variant === 'amber',
          'bg-slate-500/10 text-slate-400 border-slate-500/20': variant === 'slate',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
