import { useQuery } from "@tanstack/react-query";
import { GetClubs, GetCourses, GetInterests } from "api/primary-content";
import { Dispatch, SetStateAction, useState } from "react";
import { CalendarIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
const _ = require('lodash');

const PrimaryContentModalContentListStyle = ({
  list,
  href_start,
  setModalState,
}:{
  list?: Record<string, any>[],
  href_start: string
  setModalState: Dispatch<SetStateAction<boolean>>,
}) => {



  return(
  <div className="py-5">
    <div className="overflow-hidden bg-gray-800 outline outline-gray-400 shadow rounded-md">
      <ul role="list" className="divide-y divide-gray-400">
        {list && list.map((listItem) => (
          <li key={listItem.id} onClick={() => setModalState(false)}>
            <Link href={`${href_start}/${listItem.id}`} className="block hover:bg-gray-700">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-gray-300">{listItem.title}</p>
                  <p className="flex items-center text-sm text-gray-400">{listItem.department ?? '-'} {listItem.code ?? '-'}</p>
                </div>
                <div className="mt-2 flex justify-between">
                  <>
                    <p className="flex items-center text-sm text-gray-400">
                      <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      {_.capitalize(listItem.term ?? '-')} {listItem.year ?? '-'}
                    </p>
                  </>
                  <>
                    <p className="flex items-center text-sm text-gray-400">
                      <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <p># of members</p>
                    </p>
                  </>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export const PrimaryContentModalCourseList = ({setModalState}:{setModalState: Dispatch<SetStateAction<boolean>>}) => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution = currentPath.split("/")[1];

  const [courseList, setCourseList] = useState<Record<string, any>[]>()

  useQuery({
      queryKey: ["courses"],
      queryFn: () => GetCourses({ userId: cachedUser.id }),
      onSuccess: (data) => {
        setCourseList(data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return (
    <PrimaryContentModalContentListStyle
    list={courseList} 
    href_start={`${institution}/course`}
    setModalState={setModalState}/>
  );
};

export const PrimaryContentModalClubList = ({setModalState}:{setModalState: Dispatch<SetStateAction<boolean>>}) => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution = currentPath.split("/")[1];

  const [clubList, setClubList] = useState<Record<string, any>[]>()
  
    useQuery({
      queryKey: ["clubs"],
      queryFn: () => GetClubs({ userId: cachedUser.id }),
      onSuccess: (data) => {
        setClubList(data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  
  return (
    <PrimaryContentModalContentListStyle 
    list={clubList}
    href_start={`${institution}/club`}
    setModalState={setModalState}/>
  );
};

export const PrimaryContentModalInterestList = ({setModalState}:{setModalState: Dispatch<SetStateAction<boolean>>}) => {
  const cachedUser = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "null"
  );

  const currentPath = usePathname();
  const institution = currentPath.split("/")[1];

  const [interestList, setInterestList] = useState<Record<string, any>[]>()
  
    useQuery({
      queryKey: ["interests"],
      queryFn: () => GetInterests({ userId: cachedUser.id }),
      onSuccess: (data) => {
        setInterestList(data.data)
      },
      onError: (error) => {
        console.log(error);
      },
    });
  return (
    <PrimaryContentModalContentListStyle 
    list={interestList}
    href_start={`${institution}/interest`}
    setModalState={setModalState}/>
  );
};
