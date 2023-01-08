"use client";

import { ChatPage } from "components/chat/ChatPage";
import { CurrentChannelContext } from "components/context/ChannelContext";
import { CurrentCourseContext } from "components/context/CourseContext";
import { PageTitle } from "components/title/PageTitle";
import { Underline } from "components/title/Underline";
import { useContext } from "react";

export default function CourseChannelIdPage() {
  const { currentCourse, setCurrentCourse } = useContext(CurrentCourseContext);
  const { currentChannel, setCurrentChannel } = useContext(CurrentChannelContext);

  return (
    <>
      <PageTitle
        titleArgs={{
          titles: [
            typeof currentCourse.title === "string" ? currentCourse.title : "",
            typeof currentChannel.title === "string"
              ? currentChannel.title
              : "",
          ],
        }}
      />
      <Underline />
      <ChatPage
        title={
          typeof currentChannel.title === "string" ? currentChannel.title : ""
        }
      />
    </>
  );
}
