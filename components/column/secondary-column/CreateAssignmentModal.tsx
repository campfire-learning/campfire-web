import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";

import { ModalBaseAnimation } from "components/modal/ModalBaseAnimation";
import { AssignmentEdit } from "./AssignmentEdit";

export const CreateAssignmentModal = ({
  courseId,
  assignmentType,
}: {
  assignmentType: string;
  courseId: string;
}) => {
  const [open, setOpen] = useState(false);

  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  return (
    <>
      <PlusIcon
        className="ml-3 hidden h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-100 group-hover:block"
        onClick={() => setOpen(true)}
      />
      <ModalBaseAnimation
        modalContent={
          <Dialog.Panel className="relative max-h-[90vh] min-w-[25rem] max-w-[75%] transform overflow-y-auto rounded-lg bg-gray-900 p-6 text-left transition-all sm:min-w-[60%]">
            <div className="absolute top-0 right-0 block pt-4 pr-4">
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
              className="display:inline text-lg font-medium leading-6 text-gray-300"
            >
              <span className="flex space-x-1">
                <div>Create a new {assignmentType}</div>
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
