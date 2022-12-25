"use client";

import { usePathname } from "next/navigation";

import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ColumnNavSection } from "./SecondaryColumnNavSection";
import { GetClubs, GetCourses, GetInterests } from "api/primary-content";
import { useQuery } from "@tanstack/react-query";
import { SVGProps, useState } from "react";
import { SecondayContentQueryOnSuccess } from "./SecondaryColumnQueries";

export interface Content {
  name: string;
  icon?: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
  href: string;
  level?: number;
  canCreate?: boolean;
  children?: Content[];
}

export type ContentType = Content[];

export const SecondayContent = () => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution = currentPath.split("/")[1];

  const [content, setContent] = useState<ContentType>([
    {
      name: "Find",
      icon: MagnifyingGlassIcon,
      href: `${institution}/find-courses`,
    },
    {
      name: "Courses",
      icon: AcademicCapIcon,
      href: `${institution}/find-courses `,
      canCreate: true,
    },
    {
      name: "Clubs",
      icon: TrophyIcon,
      href: `${institution}/find-clubs `,
      canCreate: true,
    },
    {
      name: "Interests",
      icon: UserGroupIcon,
      href: `${institution}/find-interests `,
      canCreate: true,
    },
  ]);

  useQuery({
    queryKey: ["courses"],
    queryFn: () => GetCourses({ userId: cachedUser.id }),
    onSuccess: (resp) => {
      SecondayContentQueryOnSuccess({
        parentName: "Courses",
        href_start: `${institution}/course`,
        content,
        setContent,
        resp,
        noChildren: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["clubs"],
    queryFn: () => GetClubs({ userId: cachedUser.id }),
    onSuccess: (resp) => {
      SecondayContentQueryOnSuccess({
        parentName: "Clubs",
        href_start: `${institution}/club`,
        content,
        setContent,
        resp,
        noChildren: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["interests"],
    queryFn: () => GetInterests({ userId: cachedUser.id }),
    onSuccess: (resp) => {
      SecondayContentQueryOnSuccess({
        parentName: "Interests",
        href_start: `${institution}/interest`,
        content,
        setContent,
        resp,
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
          <p className="text-gray-300 group w-full flex items-center px-2 pt-6 pb-7 text-left text-xl font-bold rounded-xl truncate">
            Course Name Here
          </p>
          <ColumnNavSection content={content} />
        </div>
      </div>
    </div>
  );
};
