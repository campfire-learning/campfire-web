import { Dialog } from "@headlessui/react";
import { ModalBaseAnimation } from "components/modal/ModalBaseAnimation";
import { useState } from "react";
import { PrimaryColumnContentBase } from "./PrimaryColumnContent";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PrimaryContentModalContent } from "./PrimaryContentModalContent";

export const PrimaryContentModal = ({
  buttonInfo,
}: {
  buttonInfo: PrimaryColumnContentBase;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {buttonInfo && (
        <button
          key={buttonInfo.name}
          onClick={() => setOpen(true)}
          className="hover:bg-zinc-700 group w-full p-3 rounded-md flex flex-col items-center"
        >
          <buttonInfo.icon
            className="text-gray-400 group-hover:text-gray-100 w-8"
            aria-hidden="true"
          />
          <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
            {buttonInfo.name}
          </span>
        </button>
      )}

      <ModalBaseAnimation
        modalContent={
          <Dialog.Panel className="relative transform overflow-y-scroll rounded-lg bg-gray-900 text-left transition-all max-w-[75%] min-w-[25rem] sm:min-w-[60%] p-6 max-h-[90vh]">
            <div className="absolute top-0 right-0 pt-4 pr-4 block">
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
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-300 display:inline">
            <p className="flex space-x-1">
              <div>
              <buttonInfo.icon className="w-6"/>
              </div>
              <div>
                {buttonInfo.name}
              </div>
            </p>
            </Dialog.Title>
            <PrimaryContentModalContent
            setModalState={setOpen}
            modalType={buttonInfo.name}/>
          </Dialog.Panel>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
