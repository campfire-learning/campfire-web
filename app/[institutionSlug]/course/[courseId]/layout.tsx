'use client'

import { Transition } from "@headlessui/react";
import { SecondayContent } from "components/column/secondary-column/SecondayContentWIP";
import { useState } from "react";

export default function CourseIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen">
      {/* Desktop */}
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-[100ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex h-screen py-2 bg-zinc-800">
        <div className="hidden overflow-y-auto bg-zinc-800 outline-1 md:block md:w-64 border-l border-zinc-700 px-2">
          <SecondayContent />
        </div>
      </div>
    </Transition>

      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
