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
  const institution: string = currentPath.split("/")[1];
  const interestId: string = currentPath.split("/")[3];

  const [itemList, setItemList] = useState<Record<string, any>[]>([]);

  useQuery({
    queryKey: [`interest-channels-${interestId}`],
    queryFn: async () => {
      return axiosAuth.get(
        `/api/v1/channels/?context_id=${interestId}&context_type=Interest`
      );
    },
    onSuccess: (resp: any) => {
      console.log(resp)
      const channelsData = resp.data.map((channel) => {
        return {
          name: channel.title,
          icon: ChatBubbleLeftRightIcon,
          href: `${institution}/interest/${interestId}/channel/${channel.id}`,
          canCreate: true,
        };
      });
      setItemList(channelsData);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useQuery(
    ["interest", interestId],
    async () => {
      const resp = await axiosAuth.get(`/api/v1/interests/${interestId}`);
      setInterestTitle(resp.data.title);
    },
  );

  return (
    <div className="flex h-screen">
      {/* Desktop */}
      <div className="flex h-screen py-2 bg-zinc-800">
        <div className="hidden overflow-y-auto bg-zinc-800 outline-1 md:block md:w-64 border-l border-zinc-700 px-2">
          <SecondaryColumn title={interestTitle} itemList={itemList} />
        </div>
      </div>

      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
