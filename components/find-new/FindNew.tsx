"use client";

import MultiColumnList from "components/list/MultiColumnList";
import { PageTitle } from "components/title/PageTitle";
import { Underline } from "components/title/Underline";

export const FindNew = ({ title }: { title: string }) => {
  return (
    <>
      <PageTitle
        titleArgs={{
          titles: [title],
        }}
      />
      <Underline />
      <MultiColumnList />
    </>
  );
};
