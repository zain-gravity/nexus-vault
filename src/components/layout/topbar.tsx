'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'

export const Topbar = () => {
  const pathname = usePathname()
  
  // Basic title extraction from pathname
  const title = pathname === '/' ? 'Dashboard' : pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-slate-100">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
          {process.env.NEXT_PUBLIC_CURRENCY || '$'}
        </div>
        <button className="relative p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium shadow-lg border border-white/10 cursor-pointer">
          U
        </div>
      </div>
    </header>
  )
}
