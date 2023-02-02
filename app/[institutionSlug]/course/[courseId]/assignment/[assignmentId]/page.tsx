"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";
import { AssignmentEdit } from "components/column/secondary-column/AssignmentEdit";

export default function AssignmentIdPage() {
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const assignmentId: string = currentPath.split("/")[5];
  const [assignment, setAssignment] = useState();

  const loadAssignment = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}/assignments/${assignmentId}`);
    },
    onSuccess: (resp: any) => {
      setAssignment(resp.data);
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

  return <AssignmentEdit assignmentType="assignment" assignment={assignment} />;
}
