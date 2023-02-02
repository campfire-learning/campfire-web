'use client'

import { useRouter } from "next/navigation"

export const HomeRoute = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()

  const localStorageExists = (typeof window !== 'undefined')
  const institution = localStorageExists && JSON.parse(localStorage.getItem('user') || 'null')?.institution_slug
  console.log(`institution is - ${institution}`);

  if (institution) {
    router.push(`/${institution}`)
  }

  return (
    <>
      {children}
    </>
  )
}
