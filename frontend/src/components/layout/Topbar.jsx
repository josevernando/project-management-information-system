import React from 'react'
import { Search } from 'lucide-react'

export default function Topbar(){
  return (
    <header className="h-14 bg-transparent flex items-center justify-between px-6 border-b border-gray-800">
      <div className="flex items-center gap-4">
        <div className="text-muted text-sm">Dark Minimal • PMIS</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input className="bg-[#071017] border border-gray-800 rounded-md px-3 py-2 text-sm w-64 placeholder:text-muted" placeholder="Search tasks, projects..." />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted"><Search size={16} /></div>
        </div>
      </div>
    </header>
  )
}
