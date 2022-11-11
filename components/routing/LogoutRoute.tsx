'use client'

import { useRouter } from "next/navigation"

export const LogoutRoute = ({
  children,
}: {
  children?: React.ReactNode
}) => {

  localStorage.clear();

  const router = useRouter()
  router.push('/login')

  return (
    <>
      {children}
    </>
  )
}