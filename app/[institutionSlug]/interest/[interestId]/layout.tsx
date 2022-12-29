"use client";

import { axiosAuth } from "api/axios";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CurrentInterestContext } from "components/context/InterestContext";

export default function InteretIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interestTitle, setInterestTitle] = useState("");
  const currentPath = usePathname();
  const interestId: string = currentPath.split("/")[3];

  const { currentInterest, setCurrentInterest } =
  useContext(CurrentInterestContext);

  useQuery({
    queryKey: ["interest", interestId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/interests/${interestId}`);
    },
    onSuccess: (resp: any) => {
      setCurrentInterest?.(resp.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex h-screen">
      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
