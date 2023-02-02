import { Dialog } from "@headlessui/react";
import { ModalBaseAnimation } from "components/modal/ModalBaseAnimation";
import { useState } from "react";
import { PrimaryItemBase } from "./PrimaryColumn";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PrimaryItemModalContent } from "./PrimaryItemModalContent";

export const PrimaryItemModal = ({
  itemInfo,
  itemSingular,
  findNewHref,
  canCreateNew,
}: {
  itemInfo: PrimaryItemBase;
  itemSingular: string;
  findNewHref?: string;
  canCreateNew?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {itemInfo && (
        <button
          key={itemInfo.name}
          onClick={() => setOpen(true)}
          className="group flex w-full flex-col items-center rounded-md p-3 hover:bg-zinc-700"
        >
          <itemInfo.icon
            className="w-8 text-gray-400 group-hover:text-gray-100"
            aria-hidden="true"
          />
          <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
            {itemInfo.name}
          </span>
        </button>
      )}

      <ModalBaseAnimation
        modalContent={
          <Dialog.Panel className="relative max-h-[93vh] min-w-[25rem] max-w-[75%] transform overflow-y-auto rounded-lg bg-gray-900 p-6 text-left transition-all sm:min-w-[60%]">
            <div className="absolute top-0 right-0 block pt-4 pr-4">
              <button
                type="button"
                className="rounded-md bg-gray-900 text-gray-400 hover:text-gray-300 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className=" w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="ml-4 text-left"></div>
            <Dialog.Title
              as="h3"
              className="display:inline text-lg font-medium leading-6 text-gray-300"
            >
              <span className="flex space-x-1">
                <div>
                  <itemInfo.icon className="w-6" />
                </div>
                <div>{itemInfo.name}</div>
              </span>
            </Dialog.Title>
            <PrimaryItemModalContent
              setModalState={setOpen}
              modalType={itemInfo.name}
              itemSingular={itemSingular}
              findNewHref={findNewHref}
              canCreateNew={canCreateNew}
            />
          </Dialog.Panel>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
