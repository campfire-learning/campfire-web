"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { ColumnNavSection } from "./SecondaryColumnNavSection";
import { GetCourseDetail } from "api/course-content";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SecondayContentQueryOnSuccess } from "./SecondaryColumnQueries";
import { SecondaryItemList } from "./SecondaryColumn";

export const SecondaryColumnCourse = () => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution = currentPath?.split("/")[1];

  const [content, setContent] = useState<SecondaryItemList>([
    {
      name: "Syllabus",
      icon: DocumentTextIcon,
      // href: `${institution}/course/${courseId}/syllabus`,
      href: `${institution}/course/1/syllabus`,
      canCreate: true,
    },
    {
      name: "Channels",
      icon: ChatBubbleLeftRightIcon,
      href: `${institution}/course/1/channels`,
      canCreate: true,
    },
    {
      name: "Members",
      icon: UserGroupIcon,
      href: `${institution}/course/1/members`,
      canCreate: true,
    },
    {
      name: "Assignments",
      icon: DocumentChartBarIcon,
      href: `${institution}/course/1/assignments`,
      canCreate: true,
    },
    {
      name: "Exams",
      icon: DocumentCheckIcon,
      href: `${institution}/course/1/exams`,
      canCreate: true,
    },
    {
      name: "Grades",
      icon: ChartBarSquareIcon,
      href: `${institution}/course/1/grades`,
      canCreate: true,
    },
  ]);

  useQuery({
    queryKey: ["syllabus"],
    queryFn: () => GetCourseDetail({ userId: cachedUser.id }),
    onSuccess: (data) => {
      SecondayContentQueryOnSuccess({
        parentName: "Courses",
        href_start: `${institution}/course`,
        content,
        setContent,
        data,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["clubs"],
    queryFn: () => GetCourseDetail({ courseId: cachedUser.id }),
    onSuccess: (data) => {
      SecondayContentQueryOnSuccess({
        parentName: "Clubs",
        href_start: `${institution}/club`,
        content,
        setContent,
        data,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["interests"],
    queryFn: () => GetCourseDetail({ userId: cachedUser.id }),
    onSuccess: (data) => {
      SecondayContentQueryOnSuccess({
        parentName: "Interests",
        href_start: `${institution}/interest`,
        content,
        setContent,
        data,
        noChildren: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-0 pb-4">
        <div className="flex flex-shrink-0 items-center px-3"></div>
        <div className="flex flex-col flex-1">
          <p className='text-gray-300 group w-full flex items-center px-2 pt-6 pb-7 text-left text-xl font-bold rounded-xl truncate'>
            Course Name Here
          </p>
          <ColumnNavSection content={content} />
        </div>
      </div>
    </div>
  );
};
