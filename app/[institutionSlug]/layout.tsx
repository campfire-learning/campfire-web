'use client'

import { useState  } from 'react'
import { SidebarAnimation } from 'components/sidebar/SidebarAnimation'
import { OpenSidebar } from 'components/sidebar/OpenSidebar'
import { SidebarContent } from 'components/sidebar/SidebarContent'
import { ProtectedRoute } from 'components/routing/ProtectedRoute'
import { SidebarContext } from 'components/context/SidebarContext'

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <SidebarContext>
        {/* Desktop */}
        <div className='bg-zinc-800 md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col px-1">
            <SidebarContent />
        </div>
        </div>

        {/* Mobile */}
        <SidebarAnimation
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        >
        <SidebarContent/>
        </SidebarAnimation>

        <div className="flex flex-col md:pl-64 h-screen">
          <OpenSidebar
          setSidebarOpen={setSidebarOpen}
          />
          <div className="flex-auto bg-zinc-900">
          {children}
          </div>
        </div>
      </SidebarContext>
    </ProtectedRoute>
  )
}