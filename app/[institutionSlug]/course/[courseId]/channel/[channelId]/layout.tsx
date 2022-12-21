'use client'

import { NewspaperIcon, UsersIcon } from "@heroicons/react/24/outline"
import { TabBar } from 'components/tabBar/TabBar'

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const clubTabs = [
    { name: 'Club Details', href: '#', icon: NewspaperIcon, current: false },
    { name: 'Club Members', href: '#', icon: UsersIcon, current: true },
  ]

  return (
      <>
        <TabBar
        tabs={clubTabs}/>
        {children}
      </>
  )
}