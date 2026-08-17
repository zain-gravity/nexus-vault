'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface CardProps extends HTMLMotionProps<'div'> {
  glowColor?: 'emerald' | 'rose' | 'blue' | 'amber' | 'none'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glowColor = 'none', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl p-6 transition-all duration-300',
          {
            'hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/20 hover:-translate-y-[2px]': glowColor === 'emerald',
            'hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)] hover:border-rose-500/20 hover:-translate-y-[2px]': glowColor === 'rose',
            'hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-blue-500/20 hover:-translate-y-[2px]': glowColor === 'blue',
            'hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:border-amber-500/20 hover:-translate-y-[2px]': glowColor === 'amber',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = 'Card'
