'use client'

import { Transition } from "@headlessui/react";
import { SecondaryColumnCourse } from "components/column/secondary-column/SecondaryColumnCourse";
import { useState } from "react";

export default function CourseIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Desktop */}
      <div className="flex h-screen py-2 bg-zinc-800">
        <div className="hidden overflow-y-auto bg-zinc-800 outline-1 md:block md:w-64 border-l border-zinc-700 px-2">
          <SecondaryColumnCourse />
        </div>
      </div>

      <div className="relative grow flex flex-col h-screen">
        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
}
