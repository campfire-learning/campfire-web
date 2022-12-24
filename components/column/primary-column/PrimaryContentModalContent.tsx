import { Dispatch, SVGProps, SetStateAction } from "react";
import { PrimaryContentModalClubList, PrimaryContentModalCourseList, PrimaryContentModalInterestList } from "./PrimaryContentModalContentList";

export const PrimaryContentModalContent = ({
  setModalState,
  modalType,
}:{
  setModalState: Dispatch<SetStateAction<boolean>>
  modalType: string
}) => {
  return (
    <>
    {modalType === 'Courses' && <PrimaryContentModalCourseList setModalState={setModalState}/>}
    {modalType === 'Clubs' && <PrimaryContentModalClubList setModalState={setModalState}/>}
    {modalType === 'Interests' && <PrimaryContentModalInterestList setModalState={setModalState}/>}
    </>
  );
};
