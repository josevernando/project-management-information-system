import React from 'react'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import { Outlet } from "react-router-dom"

export default function Shell() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
