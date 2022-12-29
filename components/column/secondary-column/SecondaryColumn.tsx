import { SecondaryColumnSection } from "./SecondaryColumnSection";

export const SecondaryColumn = ({
  title,
  itemList,
}: {
  title: string;
  itemList: Record<string, any>[];
}) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-0 pb-4">
        <div className="flex flex-shrink-0 items-center px-3"></div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-300 group w-full flex items-center px-2 pt-6 pb-7 text-left text-xl font-bold rounded-xl truncate">
            {title}
          </p>
          <SecondaryColumnSection itemList={itemList} />
        </div>
      </div>
    </div>
  );
};
