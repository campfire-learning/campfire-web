"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";

export default function GradesPage() {
  const inBrowser = typeof window !== "undefined";
  const user = inBrowser && JSON.parse(localStorage.getItem("user") || "null");
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [grades, setGrades] = useState();
  const [assignments, setAssignments] = useState();
  const [selectedGrades, setSelectedGrades] = useState();

  const assignmentsQuery = useQuery({
    queryKey: [`course-assignments-${courseId}`],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}/assignments`);
    },
    onSuccess: (resp: any) => {
      setAssignments(resp.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const gradesQuery = useQuery({
    queryKey: ["grades", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/courses/${courseId}/grades`);
    },
    onSuccess: (resp: any) => {
      console.log(resp.data);
      const userRecords = {};
      resp.data.forEach((grade) => {
        if (grade.user.id in userRecords) {
          userRecords[grade.user.id][grade.assignment_id] = grade.score;
          userRecords[grade.user.id][grade.assignment_id] = grade.score;
        } else {
          const fullName = grade.user.first_name + " " + grade.user.last_name;
          userRecords[grade.user.id] = { fullName: fullName };
        }
      });

      setGrades(resp.data);
      setSelectedGrades(resp.data);
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
        assignment_id: gradable_id,
      });
    }
  };

  const handleStatusSelect = (e) => {
    console.log(`status = ${e.target.value}`);
    const status = e.target.value;
    if (status === "all") {
      setSelectedGrades(grades);
      return;
    }
    setSelectedGrades(grades.filter((grade) => grade.status === status));
  };

  if (assignmentsQuery.status === "error") {
    return (
      <>
        <h1>Oh uh - there is an error</h1>
        <h3 className="text-red">{assignmentsQuery.error}</h3>
      </>
    );
  }

  if (assignments === undefined) {
    return <h1>Loading ...</h1>;
  }

  // table copied from https://tailwind-elements.com/docs/standard/components/tables/
  return (
    <>
      <h1 className="text-white">Grades</h1>
      <div className="block relative">
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current text-gray-500"
          >
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
          </svg>
        </span>
        <input
          placeholder="Search"
          className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        />
      </div>

      <div className="relative">
        <select
          onChange={handleStatusSelect}
          className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="late">Late</option>
          <option value="missing">Missing</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

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
                      Student
                    </th>
                    {assignments?.map((assignment) => (
                      <th
                        scope="col"
                        className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                      >
                        {assignment.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedGrades.map((grade) => {
                    return (
                      <tr
                        className="border-b"
                        key={`${grade.user.id}-${grade.gradable.id}`}
                      >
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {grade.user.first_name + " " + grade.user.last_name}
                        </td>
                        {assignments.map((assignment) => {
                          <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                            {grade.score || grade.status}
                          </td>;
                        })}
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
