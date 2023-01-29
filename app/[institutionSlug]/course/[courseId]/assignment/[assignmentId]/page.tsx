"use client";

import { usePathname } from "next/navigation";
import { AssignmentEdit } from "components/column/secondary-column/AssignmentEdit";

export default function AssignmentIdPage() {
  const currentPath = usePathname();
  // const courseId: string = currentPath.split("/")[3];
  const assignmentId: string = currentPath.split("/")[5];

  return (
    <AssignmentEdit assignmentId={assignmentId} assignmentType="assignment" />
  )
}