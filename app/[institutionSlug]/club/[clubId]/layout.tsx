"use client";

import {
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { axiosAuth } from "api/axios";
import { SecondaryColumn } from "components/column/secondary-column/SecondaryColumn";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ClubIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clubTitle, setClubTitle] = useState("");
  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];
  const clubId: string = currentPath.split("/")[3];

  const [itemList, setItemList] = useState<Record<string, any>[]>([]);

  // get "channels" data, which we show directly
  useQuery({
    queryKey: [`club-channels-${clubId}`],
    queryFn: async () => {
      return axiosAuth.get(
        `/api/v1/channels/?context_id=${clubId}&context_type=Club`
      );
    },
    onSuccess: (resp: any) => {
      const channelsData = resp.data.map((channel) => {
        return {
          name: channel.title,
          icon: ChatBubbleLeftRightIcon,
          href: `${institution}/club/${clubId}/channel/${channel.id}`,
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
    ["club", clubId],
    async () => {
      const resp = await axiosAuth.get(`/api/v1/clubs/${clubId}`);
      setClubTitle(resp.data.title);
    },
  );

  return (
    <div className="flex h-screen">
      {/* Desktop */}
      <div className="flex h-screen py-2 bg-zinc-800">
        <div className="hidden overflow-y-auto bg-zinc-800 outline-1 md:block md:w-64 border-l border-zinc-700 px-2">
          <SecondaryColumn title={clubTitle} itemList={itemList} />
        </div>
      </div>

      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
