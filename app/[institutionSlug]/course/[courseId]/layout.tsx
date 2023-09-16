"use client";

import {
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  HashtagIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

import { axiosAuth } from "api/axios";
import { SecondaryColumn, SecondaryItem } from "components/column/secondary-column/SecondaryColumn";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CreateAssignmentModal } from "components/column/secondary-column/CreateAssignmentModal";

import { CurrentCourseContext } from "components/context/CourseContext";

// create function that takes into two dates and return the number of days between them
const daysBetween = (date1: Date, date2: Date) => {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1.getTime() - date2.getTime());

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}


// return number of weeks between two dates, as a string of a float number rounded to 2 decimals
const weeksBetween = (date1: Date, date2: Date) => {
  // first # of milliseconds in a week
  const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  // then calculate the difference in milliseconds
  const differenceMs = Math.abs(date1.getTime() - date2.getTime());

  // convert differenceMs to weeks
  return (differenceMs / ONE_WEEK).toFixed(2);
}


export default function CourseIdLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];
  const courseId: string = currentPath.split("/")[3];

  const [itemList, setItemList] = useState<SecondaryItem[]>([
    {
      name: "Channels",
      icon: ChatBubbleLeftRightIcon,
      href: "#",
      canCreate: true,
      createModal: () => <div />,
    },
    {
      name: "Members",
      icon: UserGroupIcon,
      href: `${institution}/course/${courseId}/members`,
      canCreate: true,
      createModal: () => <div />,
    },
    {
      name: "Assignments",
      icon: DocumentChartBarIcon,
      href: "#",
      canCreate: true,
      createModal: () => <CreateAssignmentModal courseId={courseId} assignmentType="assignment" />,
    },
    {
      name: "Exams",
      icon: DocumentCheckIcon,
      href: "#",
      canCreate: true,
      createModal: () => <CreateAssignmentModal courseId={courseId} assignmentType="exam" />,
    },
    {
      name: "Grades",
      icon: ChartBarSquareIcon,
      href: `${institution}/course/${courseId}/grades`,
      canCreate: true,
      createModal: () => <div />,
    },
    {
      name: "Syllabus",
      icon: DocumentTextIcon,
      href: `${institution}/course/${courseId}/syllabus`,
      canCreate: false,
    },
  ]);

  // get "channels" data, which we show by default
  useQuery({
    queryKey: [`course-channels-${courseId}`],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/channels/?context_id=${courseId}&context_type=Course`);
    },
    onSuccess: (resp: any) => {
      let tmpItemList = [...itemList];
      const channelsData = resp.data.map((channel: { title: any; id: any; }) => {
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

  const assignmentsForType = (data: Record<string, any>, assType: string) => {
    return data
      .filter((assignment) => assignment.assignment_type == assType)
      .map((assignment) => {
        return {
          ...assignment,
          name: assignment.title,
          href: `${institution}/course/${courseId}/assignment/${assignment.id}`,
        };
      });
  };

  // get "assignments" data - it shouldn't have any negative impact on the speed
  // of the page load since this is executed asynchronously
  useQuery({
    queryKey: [`course-assignments-${courseId}`],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}/assignments`);
    },
    onSuccess: (resp: any) => {
      let tmpItemList = [...itemList];
      tmpItemList[2] = { ...tmpItemList[2], children: assignmentsForType(resp.data, "assignment") };
      tmpItemList[3] = { ...tmpItemList[3], children: assignmentsForType(resp.data, "exam") };
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
      <div className="flex h-screen bg-zinc-800 py-2">
        <div className="hidden overflow-y-auto border-x border-zinc-700 bg-zinc-800 px-2 outline-1 md:block md:w-64">
          <SecondaryColumn
            title={typeof currentCourse.title === "string" ? currentCourse.title : ""}
            itemList={itemList}
          />
        </div>
      </div>

      <div className="relative flex h-screen grow flex-col">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
