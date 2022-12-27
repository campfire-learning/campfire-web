import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { SecondaryItem, SecondaryItemList } from "./SecondaryColumn";

export const SecondayContentQueryOnSuccess = ({
  parentName,
  href_start,
  content,
  setContent,
  resp,
  noChildren,
}: {
  parentName: string;
  href_start: string;
  content: SecondaryItemList;
  setContent: Dispatch<SetStateAction<SecondaryItemList>>;
  resp: AxiosResponse<any, any>;
  noChildren?: boolean;
}) => {
  const contentCopy = [...content];
  const courseIndex = contentCopy.findIndex((x) => x.name === parentName);
  const course = resp.data
  const courseMap = {
        name: course.title,
        href: `${href_start}/${course.id}`,
        level: 2,
        children: noChildren
          ? undefined
          : course.channels.map((channel: any) => ({
              name: channel.title,
              level: 3,
              href: `${href_start}/${course.id}/channel/${channel.id}`,
            })),
      } as SecondaryItem;

  setContent(contentCopy);
};
