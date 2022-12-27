"use client";

import {
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ColumnNavSection } from "./SecondaryColumnNavSection";
import { axiosAuth } from "api/axios";

export const SecondaryColumnCourse = () => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];
  const courseId: string = currentPath.split("/")[3];

  const [items, setItems] = useState<Record<string, any>>({
    channels: {
      icon: ChatBubbleLeftRightIcon,
      href: `${institution}/course/${courseId}/channels`,
      apiUrl: `/api/v1/channels/?courseId=${courseId}`,
      canCreate: true,
    },
    syllabus: {
      icon: DocumentTextIcon,
      href: `${institution}/course/${courseId}/syllabus`,
      apiUrl: `/api/v1/courses/${courseId}`,
      canCreate: true,
    },
    members: {
      icon: UserGroupIcon,
      href: `${institution}/course/${courseId}/members`,
      apiUrl: `/api/v1/users/?courseId=${courseId}`,
      canCreate: true,
    },
    assignments: {
      icon: DocumentChartBarIcon,
      href: `${institution}/course/${courseId}/assignments`,
      apiUrl: `/api/v1/assignments/?courseId=${courseId}`,
      canCreate: true,
    },
    exams: {
      icon: DocumentCheckIcon,
      href: `${institution}/course/${courseId}/exams`,
      apiUrl: `/api/v1/exams/?courseId=${courseId}`,
      canCreate: true,
    },
    grades: {
      icon: ChartBarSquareIcon,
      href: `${institution}/course/${courseId}/grades`,
      apiUrl: `/api/v1/grades/?courseId=${courseId}&userId=${cachedUser.id}`,
      canCreate: true,
    },
  });

  // We use "itemList" to do loop through the content of "items" because it'd
  // be a bad idea to iterate through "items" and also modify it in each loop
  const itemList = Array<Record<string, any>>();
  Object.entries(items).forEach(([key, value]) => {
    itemList.push({ ...value, name: key });
  });

  itemList.forEach((item) => {
    useQuery({
      queryKey: [item.name],
      queryFn: async () => {
        return axiosAuth.get(item.apiUrl);
      },
      onSuccess: (resp: any) => {
        let tmpItems = { ...items };
        tmpItems[item.name] = { ...tmpItems[item.name], data: resp };
        setItems(tmpItems);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-0 pb-4">
        <div className="flex flex-shrink-0 items-center px-3"></div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-300 group w-full flex items-center px-2 pt-6 pb-7 text-left text-xl font-bold rounded-xl truncate">
            Course Name Here
          </p>
          <ColumnNavSection content={content} />
        </div>
      </div>
    </div>
  );
};
