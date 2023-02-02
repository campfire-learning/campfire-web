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
import { PrimaryColumnSection } from "./PrimaryColumnSection";
import { PrimaryItemModal } from "./PrimaryColumnItemModal";

export interface PrimaryItemBase {
  name: string;
  icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
}

interface IPrimryItemHref extends PrimaryItemBase {
  href: string;
  modal?: never;
}

interface IPrimaryItemModal extends PrimaryItemBase {
  href?: never;
  modal: ({ itemInfo }: { itemInfo: PrimaryItemBase }) => JSX.Element;
}

export type PrimaryItemType = IPrimryItemHref | IPrimaryItemModal;

export const PrimaryColumn = () => {

  const currentPath = usePathname();
  const institution = currentPath.split("/")[1];

  const sectionMain: PrimaryItemType[] = [
    {
      name: "Courses",
      icon: AcademicCapIcon,
      modal: () => (
        <PrimaryItemModal
        itemInfo={{ name: "Courses", icon: AcademicCapIcon }}
        itemSingular="Course"
        findNewHref={`${institution}/find-courses`}
        canCreateNew={true}
        />
      ),
    },
    {
      name: "Clubs",
      icon: TrophyIcon,
      modal: () => (
        <PrimaryItemModal itemInfo={{ name: "Clubs", icon: TrophyIcon }}
        itemSingular="Club" 
        findNewHref={`${institution}/find-clubs`}
        canCreateNew={true}
        />
      ),
    },
    {
      name: "Interests",
      icon: UserGroupIcon,
      modal: () => (
        <PrimaryItemModal itemInfo={{ name: "Interests", icon: UserGroupIcon }}
        itemSingular="Interest"
        findNewHref={`${institution}/find-interests`}
        canCreateNew={true}
        />
      ),
    },
  ];

  const sectionBottom: PrimaryItemType[] = [
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
          <PrimaryColumnSection content={sectionMain} />
        </div>
        <div className="mb-0">
          <PrimaryColumnSection content={sectionBottom} />
          <BottomBar isMini={true} />
        </div>
      </div>
    </div>
  );
};
