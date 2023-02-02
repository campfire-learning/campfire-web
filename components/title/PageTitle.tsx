import { SelectedGroupLevel } from "components/context/PageContext";
import { SVGProps, useContext } from "react";

export interface TitleArgs {
  icon?: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
  titles: string[];
}

export const PageTitle = ({ titleArgs }: { titleArgs: TitleArgs }) => {
  return (
    <>
      <h2 className="flex px-3 text-2xl font-light text-gray-200 sm:truncate sm:px-6 sm:text-xl md:px-6 md:pt-5 ">
        <>
          {titleArgs.icon && (
            <titleArgs.icon
              className="mr-[0.25rem] h-[1.65rem] w-[1.65rem] flex-shrink-0 text-gray-200"
              aria-hidden="true"
            />
          )}
          {titleArgs.titles.filter(Boolean).join(" : ")}
        </>
      </h2>
    </>
  );
};
