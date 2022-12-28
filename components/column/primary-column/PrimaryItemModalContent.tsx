import { Dispatch, SVGProps, SetStateAction } from "react";
import {
  PrimaryItemModalClubList,
  PrimaryItemModalCourseList,
  PrimaryItemModalInterestList,
} from "./PrimaryItemModalContentList";

export const PrimaryItemModalContent = ({
  setModalState,
  modalType,
}: {
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalType: string;
}) => {
  return (
    <>
      {modalType === "Courses" && (
        <PrimaryItemModalCourseList setModalState={setModalState} />
      )}
      {modalType === "Clubs" && (
        <PrimaryItemModalClubList setModalState={setModalState} />
      )}
      {modalType === "Interests" && (
        <PrimaryItemModalInterestList setModalState={setModalState} />
      )}
    </>
  );
};
