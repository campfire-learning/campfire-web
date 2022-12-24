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
import { PrimaryItemModal } from "./PrimaryItemModal";

export interface PrimaryItemBase {
  name: string;
  icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
}

interface PrimaryItemHref extends PrimaryItemBase {
  href: string;
  modal?: ({ buttonInfo }: { buttonInfo: PrimaryItemBase }) => JSX.Element;
}

interface PrimaryItemModal extends PrimaryItemBase {
  href?: never;
  modal: ({ buttonInfo }: { buttonInfo: PrimaryItemBase }) => JSX.Element;
}

export type PrimaryItemType = PrimaryItemHref | PrimaryItemModal;

export const PrimaryColumn = () => {
  const currentPath = usePathname();
  const institution = currentPath?.split("/")[1];

  const sectionMain: PrimaryItemType[] = [
    {
      name: "Courses",
      icon: AcademicCapIcon,
      modal: () => (
        <PrimaryItemModal
          buttonInfo={{ name: "Courses", icon: AcademicCapIcon }}
        />
      ),
    },
    {
      name: "Clubs",
      icon: TrophyIcon,
      modal: () => (
        <PrimaryItemModal buttonInfo={{ name: "Clubs", icon: TrophyIcon }} />
      ),
    },
    {
      name: "Interests",
      icon: UserGroupIcon,
      modal: () => (
        <PrimaryItemModal
          buttonInfo={{ name: "Interests", icon: UserGroupIcon }}
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
