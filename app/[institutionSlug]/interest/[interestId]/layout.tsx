"use client";

import {
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/20/solid";
import { axiosAuth } from "api/axios";
import { SecondaryColumn } from "components/column/secondary-column/SecondaryColumn";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function InteretIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interestTitle, setInterestTitle] = useState("");
  const currentPath = usePathname();
  const interestId: string = currentPath.split("/")[3];

  useQuery(
    ["interest", interestId],
    async () => {
      const resp = await axiosAuth.get(`/api/v1/interests/${interestId}`);
      setInterestTitle(resp.data.title);
    },
  );

  return (
    <div className="flex h-screen">
      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
