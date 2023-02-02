"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export const MobileColumnAnimation = ({
  children,
  columnOpen,
  setColumnOpen,
}: {
  children: React.ReactNode;
  columnOpen: boolean;
  setColumnOpen: (value: boolean) => void;
}) => {
  return (
    <Transition.Root show={columnOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 md:hidden" onClose={setColumnOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-zinc-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center"
                    onClick={() => setColumnOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-gray-300 hover:text-gray-100"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {children}
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" />
        </div>
      </Dialog>
    </Transition.Root>
  );
};
