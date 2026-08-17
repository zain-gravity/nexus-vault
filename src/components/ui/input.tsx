import * as React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon: Icon, id, ...props }, ref) => {
    const inputId = id || React.useId()
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-400">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200 h-10',
              Icon ? 'pl-9 pr-3' : 'px-3',
              error && 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-400">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
