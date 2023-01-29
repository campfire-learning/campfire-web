"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";
import { RichTextEditor } from "components/rich-text-editor/RichTextEditor";
import { UploadFiles } from "components/upload-files/UploadFiles";

export const AssignmentEdit = ({
  assignmentId,
  assignmentType,
}: {
  assignmentId?: string
  assignmentType: string
}) => {
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [assignment, setAssignment] = useState();
  const [existingFiles, setExistingFiles] = useState();
  const [error, setError] = useState();

  const saveRichText = (richText: string) => {
    if (assignmentId) {
      axiosAuth
        .patch(`/api/v1/courses/${courseId}/assignments/${assignmentId}`, {
          rich_text: richText,
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      axiosAuth
        .post(`/api/v1/courses/${courseId}/assignments`, {
          course_id: courseId,
          assignment_type: assignmentType,
          rich_text: richText,
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  };

  const upload = (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("uploads[]", file));
    if (assignmentId) {
      formData.append("assignment[id]", assignmentId);
      axiosAuth
        .patch(
          `/api/v1/courses/${courseId}/assignments/${assignmentId}`,
          formData
        )
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      axiosAuth
        .post(`/api/v1/courses/${courseId}/assignments`, formData)
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  };

  if (assignmentId) {
    const loadAssignment = useQuery({
      queryKey: ["assignment", assignmentId],
      queryFn: async () => {
        return axiosAuth.get(
          `/api/v1/courses/${courseId}/assignments/${assignmentId}`
        );
      },
      onSuccess: (resp: any) => {
        setAssignment(resp.data);
        setExistingFiles(resp.data.uploads_data);
      },
      onError: (err) => {
        console.error(err);
        setError(err);
      },
    });

    if (loadAssignment.status === "error") {
      return (
        <>
          <h1>Oh uh - an error occurred while loading assignment</h1>
          <h3 className="text-red">{JSON.stringify(loadAssignment.error)}</h3>
        </>
      );
    }
    if (assignment === undefined) {
      return <h1>Loading ...</h1>;
    }
  }

  return (
    <div className="flex flew-row gap-3">
      <div className="basis-[68%] resize">
        <RichTextEditor
          saveContent={saveRichText}
          richText={assignment?.rich_text}
        />
      </div>
      <div className="basis-[32%] grow-0">
        <UploadFiles upload={upload} currents={existingFiles} />
      </div>
    </div>
  );
};
