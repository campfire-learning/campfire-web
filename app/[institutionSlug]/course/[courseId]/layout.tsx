"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "api/axios";
import { SecondaryColumnCourse } from "components/column/secondary-column/SecondaryColumnCourse";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CourseIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [courseTitle, setCourseTitle] = useState('');
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];

  useQuery(["course", courseId], async () => {
    const resp = await axiosAuth.get(`/api/v1/courses/${courseId}`);
    setCourseTitle(resp.data.title);    
  });

  return (
    <div className="flex h-screen">
      {/* Desktop */}
      <div className="flex h-screen py-2 bg-zinc-800">
        <div className="hidden overflow-y-auto bg-zinc-800 outline-1 md:block md:w-64 border-l border-zinc-700 px-2">
          <SecondaryColumnCourse courseTitle={courseTitle}  />
        </div>
      </div>

      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
