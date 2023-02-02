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
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-white">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className="font-lg px-6 py-4 text-left text-sm text-gray-100">
                      Avatar
                    </th>
                    <th scope="col" className="font-lg px-6 py-4 text-left text-sm text-gray-100">
                      Name
                    </th>
                    <th scope="col" className="font-lg px-6 py-4 text-left text-sm text-gray-100">
                      Email
                    </th>
                    <th scope="col" className="font-lg px-6 py-4 text-left text-sm text-gray-100">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((membership) => {
                    return (
                      <tr key={membership.user.email} className="border-b">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-100">
                          {membership.user.profile_avatar_url}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-100">
                          {membership.user.first_name + " " + membership.user.last_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-100">
                          {membership.user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-100">
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
