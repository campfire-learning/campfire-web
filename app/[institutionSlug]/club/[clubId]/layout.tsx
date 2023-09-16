"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";
import { axiosAuth } from "api/axios";
import { SecondaryColumn, SecondaryItem } from "components/column/secondary-column/SecondaryColumn";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CurrentClubContext } from "components/context/ClubContext";

export default function ClubIdLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const institution: string = currentPath.split("/")[1];
  const clubId: string = currentPath.split("/")[3];
  const [itemList, setItemList] = useState<SecondaryItem[]>([]);

  useQuery({
    queryKey: [`club-channels-${clubId}`],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/channels/?context_id=${clubId}&context_type=Club`);
    },
    onSuccess: (resp: any) => {
      const channelsData = resp.data.map((channel: { title: any; id: any }) => {
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

  const { currentClub, setCurrentClub } = useContext(CurrentClubContext);

  useQuery({
    queryKey: ["club", clubId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/clubs/${clubId}`);
    },
    onSuccess: (resp: any) => {
      setCurrentClub?.(resp.data);
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
            title={typeof currentClub.title === "string" ? currentClub.title : ""}
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
