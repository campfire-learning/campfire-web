import Link from "next/link";
import { PrimaryItemType } from "./PrimaryColumn";

export const PrimaryColumnSection = ({
  content,
}: {
  content: PrimaryItemType[];
}) => {
  return (
    <>
      {content.map((item) => (
        <>
          {item.href && (
            <Link
              key={item.name}
              href={item.href}
              className="hover:bg-zinc-700 group w-full p-3 rounded-md flex flex-col items-center"
            >
              <item.icon
                className="text-gray-400 group-hover:text-gray-100 w-8"
                aria-hidden="true"
              />
              <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
                {item.name}
              </span>
            </Link>
          )}
          {item.modal && <item.modal key={item.name} />}
        </>
      ))}
    </>
  );
};
