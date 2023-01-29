"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosAuth } from "api/axios";

export default function MembersPage() {
  const currentPath = usePathname();
  const courseId: string = currentPath.split("/")[3];
  const [memberships, setMemberships] = useState();
  const query = useQuery({
    queryKey: ["users-in-course", courseId],
    queryFn: async () => {
      return axiosAuth.get(`/api/v1/users/?course_id=${courseId}`);
    },
    onSuccess: (resp: any) => {
      setMemberships(resp.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const saveMembership = (membership: Record<string, any>) => {
    // changing a user's role is the only editing action that
    // can be performed in this page
    if (membership.id) {
      axiosAuth.patch(`/api/v1/course_memberships`, {
        id: membership.id,
        role: membership.role,
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

  if (memberships === undefined) {
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
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-lg text-gray-100 px-6 py-4 text-left"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((membership) => {
                    return (
                      <tr key={membership.user.email} className="border-b">
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {membership.user.profile_avatar_url}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {membership.user.first_name + " " + membership.user.last_name}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {membership.user.email}
                        </td>
                        <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                          {membership.role}
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
