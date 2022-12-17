'use client'

import { useState  } from 'react'
import { SidebarAnimation } from 'components/sidebar/SidebarAnimation'
import { OpenSidebar } from 'components/sidebar/OpenSidebar'
import { SidebarContent } from 'components/sidebar/SidebarContent'
import { ProtectedRoute } from 'components/routing/ProtectedRoute'
import { SidebarContext } from 'components/context/SidebarContext'
import { SidebarContentMock } from 'components/sidebar/SidebarContentMock'

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <SidebarContext>
      <div className="flex flex-row">
        {/* Desktop */}
        <div className='hidden bg-zinc-800 md:fixed md:inset-y-0 md:flex md:w-48 md:flex-col px-1'>
            <SidebarContent />
        </div>

        <div className='hidden bg-zinc-700 md:fixed md:left-48 md:inset-y-0 md:flex md:w-64 md:flex-col px-1'>
        <SidebarContentMock />
        </div>

        {/* Mobile */}
        <SidebarAnimation
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        >
        <SidebarContent/>
        </SidebarAnimation>

        <div className="grow flex flex-col md:pl-[28rem] h-screen">
          <OpenSidebar
          setSidebarOpen={setSidebarOpen}
          />
          <div className="flex-auto bg-zinc-900">
          {children}
          </div>
        </div>
      </div>
      </SidebarContext>
    </ProtectedRoute>
  )
}