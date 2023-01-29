import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";

import { ModalBaseAnimation } from "components/modal/ModalBaseAnimation";
import { AssignmentEdit } from "./AssignmentEdit";

export const CreateAssignmentModal = ({
  courseId,
  assignmentType,
}: {
  assignmentType: string,
  courseId: string,
}) => {
  const [open, setOpen] = useState(false);

  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  return (
    <>
      <PlusIcon
        className="hidden text-gray-400 ml-3 h-5 w-5 flex-shrink-0 group-hover:block hover:text-gray-100"
        onClick={() => setOpen(true)}
      />
      <ModalBaseAnimation
        modalContent={
          <Dialog.Panel className="relative transform overflow-y-auto rounded-lg bg-gray-900 text-left transition-all max-w-[75%] min-w-[25rem] sm:min-w-[60%] p-6 max-h-[90vh]">
            <div className="absolute top-0 right-0 pt-4 pr-4 block">
              <button
                type="button"
                className="rounded-md bg-gray-900 text-gray-400 hover:text-gray-300 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="ml-4 text-left"></div>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-300 display:inline"
            >
              <span className="flex space-x-1">
                <div>Create a new { assignmentType }</div>
              </span>
            </Dialog.Title>
            <AssignmentEdit assignmentType={assignmentType} />
          </Dialog.Panel>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
