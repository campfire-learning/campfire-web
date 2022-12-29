'use client'

import { PageTitle } from "components/title/PageTitle"
import { Underline } from "components/title/Underline"

export const Settings = () => {
  return (
    <>
      <PageTitle titleArgs={{
        titles: ["Settings"]
      }}/>
      <Underline/>
    </>
  )
}