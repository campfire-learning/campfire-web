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

export const SecondaryColumn = ({
  title,
  itemList,
}: {
  title: string;
  itemList: Record<string, any>[];
}) => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-0 pb-4">
        <div className="flex flex-shrink-0 items-center px-3"></div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-300 group w-full flex items-center px-2 pt-6 pb-7 text-left text-xl font-bold rounded-xl truncate">
            {title}
          </p>
          <SecondaryColumnSection itemList={itemList} />
        </div>
      </div>
    </div>
  );
};
