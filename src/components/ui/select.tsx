import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const selectId = id || React.useId()
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-slate-400">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200 h-10 px-3 appearance-none',
              error && 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#12121a] text-slate-200">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <span className="text-xs text-rose-400">{error}</span>}
      </div>
    )
  }
)
Select.displayName = 'Select'
