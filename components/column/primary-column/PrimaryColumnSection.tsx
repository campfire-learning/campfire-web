import Link from "next/link";
import { PrimaryItemType } from "./PrimaryColumn";

export const PrimaryColumnSection = ({ content }: { content: PrimaryItemType[] }) => {
  return (
    <>
      {content.map((item) => (
        <div key={item.name}>
          {item.href && (
            <Link
              href={item.href}
              className="group flex w-full flex-col items-center rounded-md p-3 hover:bg-zinc-700"
            >
              <item.icon
                className="w-8 text-gray-400 group-hover:text-gray-100"
                aria-hidden="true"
              />
              <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
                {item.name}
              </span>
            </Link>
          )}
          {item.modal && (
            <item.modal key={item.name} itemInfo={{ name: item.name, icon: item.icon }} />
          )}
        </div>
      ))}
    </>
  );
};
