"use client";

import { SVGProps } from "react";

export interface SecondaryItem {
  name: string;
  icon?: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
  href: string;
  level?: number;
  canCreate?: boolean;
  children?: SecondaryItem[];
}

export type SecondaryItemList = SecondaryItem[];
