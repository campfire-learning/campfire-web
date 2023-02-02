import { GenericButtonStyle } from "components/button/GenericButtonStyle";
import { Dispatch, SVGProps, SetStateAction } from "react";
import {
  PrimaryItemModalClubList,
  PrimaryItemModalCourseList,
  PrimaryItemModalInterestList,
} from "./PrimaryItemModalContentList";

export const PrimaryItemModalContent = ({
  setModalState,
  modalType,
  itemSingular,
  findNewHref,
  canCreateNew,
}: {
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalType: string;
  itemSingular: string;
  findNewHref?: string;
  canCreateNew?: boolean;
}) => {
  return (
    <>
      {findNewHref && (
        <GenericButtonStyle
          bgColor="bg-gray-700"
          hoverColor="hover:bg-gray-600"
          textColor="text-gray-200"
          padding="pt-5"
          text={`Find ${modalType}`}
          href={findNewHref}
          onClick={() => setModalState(false)}
        />
      )}
      {modalType === "Courses" && <PrimaryItemModalCourseList setModalState={setModalState} />}
      {modalType === "Clubs" && <PrimaryItemModalClubList setModalState={setModalState} />}
      {modalType === "Interests" && <PrimaryItemModalInterestList setModalState={setModalState} />}
      {canCreateNew && (
        <GenericButtonStyle
          bgColor="bg-gray-700"
          hoverColor="hover:bg-gray-600"
          textColor="text-gray-200"
          padding="pt-5"
          text={`Create ${itemSingular}`}
          onClick={() => setModalState(false)}
        />
      )}
      {canCreateNew && <GenericButtonStyle
        bgColor='bg-gray-700'
        hoverColor='hover:bg-gray-600'
        textColor='text-gray-200'
        padding="pt-5"
        text={`Create ${itemSingular}`}
        onClick={() => setModalState(false)}
        />}
    </>
  );
};
