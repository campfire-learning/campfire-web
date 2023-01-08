"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";
import { RichTextEditor } from "components/rich-text-editor/RichTextEditor";

export default function SyllabusPage() {
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [currentCourse, setCurrentCourse] = useState();
  const courseLoad = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}`);
    },
    onSuccess: (resp: any) => {
      setCurrentCourse(resp.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const saveSyllabus = (richText: string) => {
    if (currentCourse.syllabus?.id) {
      axiosAuth.patch(`/api/v1/syllabuses/${currentCourse.syllabus?.id}`, {
        rich_text: richText,
      });      
    } else {
      axiosAuth.post(`/api/v1/syllabuses`, {
        rich_text: richText,
        course_id: courseId,
      });  
    }
  };

  if (courseLoad.status === "error") {
    return (
      <>
        <h1>Oh uh - there is an error</h1>
        <h3 className="text-red">courseLoad.error</h3>
      </>
    );
  }

  if (currentCourse === undefined) {
    return (
      <h1>Loading ...</h1>
    );
  }

  return (
    <>
      <RichTextEditor
        saveContent={saveSyllabus}
        richText={currentCourse.syllabus?.rich_text}
      />
    </>
  );
}
