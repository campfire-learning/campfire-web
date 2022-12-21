import { usePathname } from "next/navigation";

import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { CampfireLogo } from "components/assets/CampfireLogo";
import { BottomBar } from "../bottom-bar/BottomBar";
import { SVGProps } from "react";
import { SkinnyColumnSection } from "./PrimaryColumnSection";
import { PrimaryContentModal } from "./PrimaryContentModal";

export interface SkinnyColumnContentBase {
  name: string;
  icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
}

interface SkinnyColumnContentHref extends SkinnyColumnContentBase {
  href: string;
  modal?: ({
    buttonInfo,
  }: {
    buttonInfo: SkinnyColumnContentBase;
  }) => JSX.Element;
}

interface SkinnyColumnContentModal extends SkinnyColumnContentBase {
  href?: never;
  modal: ({
    buttonInfo,
  }: {
    buttonInfo: SkinnyColumnContentBase;
  }) => JSX.Element;
}

export type SkinnyColumnContentType =
  | SkinnyColumnContentHref
  | SkinnyColumnContentModal;

export const SkinnyColumnContent = () => {
  const currentPath = usePathname();
  const institution = currentPath.split("/")[1];

  const contentMain: SkinnyColumnContentType[] = [
    {
      name: "Courses",
      icon: AcademicCapIcon,
      modal: () => (
        <PrimaryContentModal
          buttonInfo={{ name: "Courses", icon: AcademicCapIcon }}
        />
      ),
    },
    {
      name: "Clubs",
      icon: TrophyIcon,
      modal: () => (
        <PrimaryContentModal buttonInfo={{ name: "Clubs", icon: TrophyIcon }} />
      ),
    },
    {
      name: "Interests",
      icon: UserGroupIcon,
      modal: () => (
        <PrimaryContentModal
          buttonInfo={{ name: "Interests", icon: UserGroupIcon }}
        />
      ),
    },
  ];

  const contentBottom: SkinnyColumnContentType[] = [
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
    <div className="flex w-full flex-col items-center pt-4 min-h-full">
      <div className="flex flex-shrink-0">
        <CampfireLogo
          className="h-10 w-auto fill-amber-700 hover:cursor-pointer hover:fill-amber-600"
          redirect={institution}
        />
      </div>
      <div className="w-full px-2 flex flex-1 flex-col justify-between ">
        <div className="mt-4">
          <SkinnyColumnSection content={contentMain} />
        </div>
        <div className="mb-0">
          <SkinnyColumnSection content={contentBottom} />
          <BottomBar isMini={true} />
        </div>
      </div>
    </div>
  );
};
