"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { axiosAuth } from "api/axios";
import { RichTextEditor } from "components/rich-text-editor/RichTextEditor";
import { UploadFiles } from "components/upload-files/UploadFiles";

export const AssignmentEdit = ({
  assignmentType,
  assignment,
}: {
  assignmentType: string;
  assignment?: any;
}) => {
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [error, setError] = useState();

  const saveRichText = (richText: string) => {
    if (assignment?.id) {
      axiosAuth
        .patch(`/api/v1/courses/${courseId}/assignments/${assignment?.id}`, {
          rich_text: richText,
          title: "title - to be added in UI (edited)",
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      axiosAuth
        .post(`/api/v1/courses/${courseId}/assignments`, {
          course_id: courseId,
          title: "title - to be added in UI",
          assignment_type: assignmentType,
          rich_text: richText,
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  };

  const uploadFunc = (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("uploads[]", file));
    formData.append("assignment_type", assignmentType);
    if (assignment?.id) {
      formData.append("assignment[id]", assignment?.id);
      axiosAuth
        .patch(`/api/v1/courses/${courseId}/assignments/${assignment?.id}`, formData)
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      axiosAuth.post(`/api/v1/courses/${courseId}/assignments`, formData).catch((err) => {
        console.error(err);
        setError(err);
      });
    }
  };

  return (
    <div className="flew-row flex gap-3">
      <div className="basis-[68%] resize">
        <RichTextEditor saveContent={saveRichText} richText={assignment?.rich_text} />
      </div>
      <div className="grow-0 basis-[32%]">
        <UploadFiles upload={uploadFunc} currents={assignment?.uploads_data} />
      </div>
    </div>
  );
};
