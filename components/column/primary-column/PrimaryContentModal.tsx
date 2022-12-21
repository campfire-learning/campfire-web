import { Dialog } from "@headlessui/react";
import { ModalBaseAnimation } from "components/modal/ModalBaseAnimation";
import { useState } from "react";
import { SkinnyColumnContentBase } from "./PrimaryColumnContent";

export const PrimaryContentModal = ({
  buttonInfo,
}: {
  buttonInfo: SkinnyColumnContentBase;
}) => {
  {
    console.log(`in-modal ${buttonInfo}`);
  }
  const [open, setOpen] = useState(false);

  return (
    <>
      {console.log(`in-modal ${buttonInfo}`)}
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
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <p className="text-sm text-gray-500">
              {`Modal listing ${buttonInfo.name}, create new ${buttonInfo.name}, find new ${buttonInfo.name} here.`}
            </p>
          </Dialog.Panel>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
