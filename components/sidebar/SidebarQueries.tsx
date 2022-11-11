import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Content, ContentType } from "./SidebarContent";

export const SidebarQueryOnSuccess = ({
  parentName,
  href_start,
  content,
  setContent,
  data,
  noChildren,
}: {
  parentName: string,
  href_start: string,
  content: ContentType,
  setContent: Dispatch<SetStateAction<ContentType>>,
  data: AxiosResponse<any, any>,
  noChildren?: boolean
}) => {
  const contentCopy = [...content];
  const courseIndex = contentCopy.findIndex((x) => x.name === parentName);
  const courseMap = data.data.map(
    (x: any) => ({
      name: x.title,
      href: `${href_start}/${x.id}`,
      level: 2,
      children: noChildren ? undefined : x.channels.map(
        (channel: any) => ({
          name: channel.title,
          level: 3,
          href: `${href_start}/${x.id}/channel/${channel.id}`,
        })
      )
    } as Content)
  );
  if (data.data.length == 0) {
    delete contentCopy[courseIndex].children;
  } else {
    contentCopy[courseIndex]['children'] = courseMap;
  }
  setContent(contentCopy);
}