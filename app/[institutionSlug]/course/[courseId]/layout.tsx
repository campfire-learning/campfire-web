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
import { useContext, useState } from "react";

import { axiosAuth } from "api/axios";
import {
  SecondaryColumn,
  SecondaryItem,
} from "components/column/secondary-column/SecondaryColumn";
import { CurrentCourseContext } from "components/context/CourseContext";

export default function CourseIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];
  const courseId: string = currentPath.split("/")[3];

  const [itemList, setItemList] = useState<SecondaryItem[]>([
    {
      name: "Channels",
      icon: ChatBubbleLeftRightIcon,
      href: "#",
      canCreate: true,
    },
    {
      name: "Syllabus",
      icon: DocumentTextIcon,
      href: `${institution}/course/${courseId}/syllabus`,
      canCreate: true,
    },
    {
      name: "Members",
      icon: UserGroupIcon,
      href: `${institution}/course/${courseId}/members`,
      canCreate: true,
    },
    {
      name: "Assignments",
      icon: DocumentChartBarIcon,
      href: `${institution}/course/${courseId}/assignments`,
      canCreate: true,
    },
    {
      name: "Exams",
      icon: DocumentCheckIcon,
      href: `${institution}/course/${courseId}/exams`,
      canCreate: true,
    },
    {
      name: "Grades",
      icon: ChartBarSquareIcon,
      href: `${institution}/course/${courseId}/grades`,
      canCreate: true,
    },
  ]);

  // get "channels" data, which we show by default
  useQuery({
    queryKey: [`course-channels-${courseId}`],
    queryFn: async () => {
      return axiosAuth.get(
        `/api/v1/channels/?context_id=${courseId}&context_type=Course`
      );
    },
    onSuccess: (resp: any) => {
      let tmpItemList = [...itemList];
      const channelsData = resp.data.map((channel: { title: any; id: any }) => {
        return {
          ...channel,
          name: channel.title,
          // icon: HashtagIcon,
          href: `${institution}/course/${courseId}/channel/${channel.id}`,
        };
      });
      tmpItemList[0] = { ...tmpItemList[0], children: channelsData };
      setItemList(tmpItemList);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { currentCourse, setCurrentCourse } = useContext(CurrentCourseContext);

  useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}`);
    },
    onSuccess: (resp: any) => {
      setCurrentCourse?.(resp.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex h-screen">
      {/* Desktop */}
      <div className="flex h-screen py-2 bg-zinc-800">
        <div className="hidden overflow-y-auto bg-zinc-800 outline-1 md:block md:w-64 border-x border-zinc-700 px-2">
          <SecondaryColumn
            title={
              typeof currentCourse.title === "string" ? currentCourse.title : ""
            }
            itemList={itemList}
          />
        </div>
      </div>

      <div className="relative grow flex flex-col h-screen px-10">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
