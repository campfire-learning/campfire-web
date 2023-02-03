"use client";

/////////////////////////////////////
//
//  THIS IS A DRAFT
//
/////////////////////////////////////

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";

export default function GradesPage() {
  const inBrowser = typeof window !== "undefined";
  const user = inBrowser && JSON.parse(localStorage.getItem('user') || "null");
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [grades, setGrades] = useState();
  const query = useQuery({
    queryKey: ["grades", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}/grades`);
    },
    onSuccess: (resp: any) => {
      setGrades(resp.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const saveGrade = (grade: Record<string, any>) => {
    if (grade.id) {
      axiosAuth.patch(`/api/v1/courses/${courseId}/grades`, {
        id: grade.id,
        user_id: user.id,
        assignment_id: user.id,
      });
    }
  };

  if (query.status === "error") {
    return (
      <>
        <h1>Oh uh - there is an error</h1>
        <h3 className="text-red">{query.error}</h3>
      </>
    );
  }

  if (grades === undefined) {
    return <h1>Loading ...</h1>;
  }

  // table copied from https://tailwind-elements.com/docs/standard/components/tables/
  return (
    <>
      <h1 className="text-white">People in the class</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-white">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                    >
                      Avatar
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                    >
                      Assignment
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                    >
                      Score
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => {
                    return (
                      <tr className="border-b" key={ `${grade.user.id}-${grade.assignment.id}` }>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {grade.user.profile_avatar_url}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {grade.user.first_name + " " + grade.user.last_name}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {grade.assignment.title}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {grade.score}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {grade.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
