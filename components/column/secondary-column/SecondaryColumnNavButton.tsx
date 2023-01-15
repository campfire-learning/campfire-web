"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import { styled } from "@stitches/react";
import Link from "next/link";
import { useContext } from "react";
import {
  SelectedChannelLevel,
  SelectedGroupLevel,
} from "components/context/PageContext";

export const SecondaryColumnNavButton = ({
  item,
  content,
  onClickFunction,
}: {
  item: any;
  content?: any;
  onClickFunction?: any;
}) => {
  const AccordionTrigger = styled(Accordion.Trigger);

  const AccordionChevron = styled(ChevronRightIcon, {
    transition: "transform 300ms",
    [`${AccordionTrigger}[data-state=open] &`]: { transform: "rotate(90deg)" },
  });

  const { selectedChannelLevel, setSelectedChannelLevel } = useContext(SelectedChannelLevel);
  const { selectedGroupLevel, setSelectedGroupLevel } = useContext(SelectedGroupLevel);

  const setChannelAndGroup = () => {
    setSelectedChannelLevel?.(item);
    if (content) {
      setSelectedGroupLevel?.(content);
    }
  };

  const setGroupAndChannel = () => {
    setSelectedGroupLevel?.(item);
    setSelectedChannelLevel?.({});
  };

  const selected =
    item.href === selectedChannelLevel?.href ||
    item.href === selectedGroupLevel?.href;
  const setSelect = item?.level === 3 ? setChannelAndGroup : setGroupAndChannel;

  const levelSpacing = () => {
    if (item.icon) {
      switch (item.level) {
        case 2:
          return "pl-2 md:pl-1";
        case 3:
          return "pl-4 md:pl-3";
        default:
          return "pl-0";
      }
    } else {
      switch (item.level) {
        case 2:
          return "pl-12 md:pl-11";
        case 3:
          return "pl-14 md:pl-13";
        default:
          return "pl-10 md:pl-9";
      }
    }
  };

  const navButton = (
    <Accordion.Header>
      <AccordionTrigger
        className={`${
          selected && !item.children
            ? "bg-zinc-900 text-white"
            : "text-gray-300 hover:bg-zinc-700 hover:text-white"
        }
      group w-full flex items-center px-2 py-2 text-left md:text-sm font-medium rounded-xl`}
        onClick={() => onClickFunction?.({ key: item.href })}
      >
        {item.icon && (
          <item.icon
            className={`${
              selected && !item.children
                ? "text-gray-100"
                : "text-gray-400 group-hover:text-gray-100"
            } 
      mr-4 md:mr-3 flex-shrink-0 h-6 w-6`}
            aria-hidden="true"
          />
        )}
        <span
          className={`${levelSpacing()}
      flex-1 truncate`}
        >
          {item.name}
        </span>
        {item.canCreate > 0 && (
          <PlusIcon className="text-gray-400 hover:text-gray-100 ml-3 h-5 w-5 flex-shrink-0" />
        )}
        {item.children?.length > 0 && (
          <AccordionChevron
            className={`${
              selected && !item.children ? "text-gray-100" : "text-gray-400"
            } 
      ml-1 h-5 w-5 flex-shrink-0 group-hover:text-gray-100`}
          />
        )}
      </AccordionTrigger>
    </Accordion.Header>
  );

  return (
    <>
      {item.children ? (
        navButton
      ) : (
        <Link href={item.href} onClick={() => setSelect?.()}>
          {navButton}
        </Link>
      )}
    </>
  );
};
