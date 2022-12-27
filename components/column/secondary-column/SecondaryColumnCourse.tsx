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

import { SecondaryColumnSection } from "./SecondaryColumnSection";
import { axiosAuth } from "api/axios";

export const SecondaryColumnCourse = ({
  courseTitle,
}: {
  courseTitle: string;
}) => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];
  const courseId: string = currentPath.split("/")[3];

  const [itemList, setItemList] = useState<Record<string, any>>([
    {
      name: "channels",
      icon: ChatBubbleLeftRightIcon,
      href: `${institution}/course/${courseId}/channels`,
      // apiUrl: `/api/v1/channels/?courseId=${courseId}`,
      canCreate: true,
    },
    {
      name: "syllabus",
      icon: DocumentTextIcon,
      href: `${institution}/course/${courseId}/syllabus`,
      // apiUrl: `/api/v1/courses/${courseId}`,
      canCreate: true,
    },
    {
      name: "members",
      icon: UserGroupIcon,
      href: `${institution}/course/${courseId}/members`,
      // apiUrl: `/api/v1/users/?courseId=${courseId}`,
      canCreate: true,
    },
    {
      name: "assignments",
      icon: DocumentChartBarIcon,
      href: `${institution}/course/${courseId}/assignments`,
      // apiUrl: `/api/v1/assignments/?courseId=${courseId}`,
      canCreate: true,
    },
    {
      name: "exams",
      icon: DocumentCheckIcon,
      href: `${institution}/course/${courseId}/exams`,
      // apiUrl: `/api/v1/exams/?courseId=${courseId}`,
      canCreate: true,
    },
    {
      name: "grades",
      icon: ChartBarSquareIcon,
      href: `${institution}/course/${courseId}/grades`,
      // apiUrl: `/api/v1/grades/?courseId=${courseId}&userId=${cachedUser.id}`,
      canCreate: true,
    },
  ]);

  // get "channels" data, which we show directly
  useQuery({
    queryKey: ["channels", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/channels/?courseId=${courseId}`);
    },
    onSuccess: (resp: any) => {
      let tmpItemList = { ...itemList };
      tmpItemList[0] = { ...tmpItemList[0], children: resp };
      setItemList(tmpItemList);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // We use "itemList" to do loop through the content of "items" because it'd
  // be a bad idea to iterate through "items" and also modify it in each loop
  // const itemList = Array<Record<string, any>>();
  // Object.entries(items).forEach(([key, value]) => {
  //   itemList.push({ ...value, name: key });
  // });

  // itemList.forEach((item) => {
  //   useQuery({
  //     queryKey: [item.name, courseId],
  //     queryFn: async () => {
  //       return axiosAuth.get(item.apiUrl);
  //     },
  //     onSuccess: (resp: any) => {
  //       let tmpItems = { ...items };
  //       tmpItems[item.name] = { ...tmpItems[item.name], data: resp };
  //       setItems(tmpItems);
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //     },
  //   });
  // });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-0 pb-4">
        <div className="flex flex-shrink-0 items-center px-3"></div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-300 group w-full flex items-center px-2 pt-6 pb-7 text-left text-xl font-bold rounded-xl truncate">
            {courseTitle}
          </p>
          <SecondaryColumnSection itemList={itemList} />
        </div>
      </div>
    </div>
  );
};
