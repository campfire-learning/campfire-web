'use client'

import { ChatPage } from "components/chat/ChatPage";
import { GroupLevelTitle } from "components/title/GroupLevelTitle";
import { Underline } from "components/title/Underline";

export default function InterestePage() {
  return (
    <>
      <GroupLevelTitle/>
      <Underline/>
      <ChatPage/>
    </>
  )
}