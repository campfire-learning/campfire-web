'use client'

import { NewspaperIcon, UsersIcon, BookmarkSquareIcon } from "@heroicons/react/24/outline"
import { TabBar } from "components/tabBar/TabBar"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const clubTabs = [
    { name: 'Course Details', href: '#', icon: NewspaperIcon, current: false },
    { name: 'Course Syllabus', href: '#', icon: BookmarkSquareIcon, current: false },
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