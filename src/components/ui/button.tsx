'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]',
          {
            'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500': variant === 'primary',
            'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/[0.08] focus:ring-slate-400': variant === 'secondary',
            'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 focus:ring-rose-500': variant === 'danger',
            'bg-transparent hover:bg-white/[0.06] text-slate-400 focus:ring-slate-400': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
            'opacity-50 cursor-not-allowed': disabled || isLoading,
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
