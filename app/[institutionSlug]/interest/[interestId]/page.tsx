"use client";

import { ChatPage } from "components/chat/ChatPage";
import { CurrentInterestContext } from "components/context/InterestContext";
import { PageTitle } from "components/title/PageTitle";
import { Underline } from "components/title/Underline";
import { useContext } from "react";

export default function InterestePage() {
  const { currentInterest, setCurrentInterest } = useContext(CurrentInterestContext);

  return (
    <>
      <PageTitle
        titleArgs={{
          titles: [typeof currentInterest.title === "string" ? currentInterest.title : ""],
        }}
      />
      <Underline />
      <ChatPage title={typeof currentInterest.title === "string" ? currentInterest.title : ""} />
    </>
  );
}
