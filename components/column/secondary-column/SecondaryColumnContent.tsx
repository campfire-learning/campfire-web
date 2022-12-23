"use client";

import { usePathname } from "next/navigation";

import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { CampfireLogo } from "components/assets/CampfireLogo";
import { ColumnNavSection } from "./SecondaryColumnNavSection";
import { BottomBar } from "../bottom-bar/BottomBar";
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

export const ColumnContent = () => {
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
      name: "Find New Clubs",
      icon: MagnifyingGlassIcon,
      href: `${institution}/find-clubs`,
    },
    {
      name: "Clubs",
      icon: TrophyIcon,
      href: `${institution}/find-clubs `,
      canCreate: true,
    },
    {
      name: "Find New Interests",
      icon: MagnifyingGlassIcon,
      href: `${institution}/find-interests`,
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
    queryFn: () => GetClubs({ userId: cachedUser.id }),
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
    queryFn: () => GetInterests({ userId: cachedUser.id }),
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

  const contentTwo = [
    {
      name: "Settings",
      icon: Cog8ToothIcon,
      href: `${institution}/settings`,
    },
    {
      name: "Sign Out",
      icon: ArrowLeftOnRectangleIcon,
      href: `${institution}/logout`,
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-zinc-800">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-3">
          <CampfireLogo
            className="h-9 w-auto fill-amber-700 hover:cursor-pointer hover:fill-amber-600"
            redirect={institution}
          />
        </div>
        <div className="flex flex-col flex-1">
          <ColumnNavSection content={content} spaceTop={true} />
          <ColumnNavSection content={contentTwo} atBottom={true} />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};