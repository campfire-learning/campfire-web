"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";
import { RichTextEditor } from "components/rich-text-editor/RichTextEditor";
import { UploadFiles } from "components/upload-files/UploadFiles";

export default function SyllabusPage() {
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [currentCourse, setCurrentCourse] = useState();
  const [existingFiles, setExistingFiles] = useState();
  const [error, setError] = useState();

  const courseLoad = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}`);
    },
    onSuccess: (resp: any) => {
      setCurrentCourse(resp.data);
      setExistingFiles(resp.data.uploads_data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const saveSyllabus = (richText: string) => {
    if (currentCourse?.syllabus?.id) {
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

  const upload = (files) => {
    const formData = new FormData();
    formData.append("syllabus[id]", currentCourse.syllabus?.id);
    files.forEach((file) => formData.append("uploads[]", file));
    axiosAuth
      .patch(`/api/v1/syllabuses/${currentCourse.syllabus?.id}`, formData)
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  if (courseLoad.status === "error") {
    return (
      <>
        <h1>Oh uh - there is an error</h1>
        <h3 className="text-red">{JSON.stringify(courseLoad.error)}</h3>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Oh uh - there is an error from API call</h1>
        <h3 className="text-red">{JSON.stringify(error)}</h3>
      </>
    );
  }

  if (currentCourse === undefined) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="flex flew-row gap-3">
      <div className="basis-[68%] resize">
        <RichTextEditor
          saveContent={saveSyllabus}
          richText={currentCourse.syllabus?.rich_text}
        />
      </div>
      <div className="basis-[32%] grow-0">
        <UploadFiles upload={upload} currents={ existingFiles } />
      </div>
    </div>
  );
}
