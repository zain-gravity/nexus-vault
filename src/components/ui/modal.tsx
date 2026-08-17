'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={cn(
                'pointer-events-auto w-full bg-[#12121a] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]',
                {
                  'max-w-md': size === 'sm',
                  'max-w-xl': size === 'md',
                  'max-w-3xl': size === 'lg',
                }
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-200 transition-colors bg-white/[0.03] hover:bg-white/[0.06] p-2 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
