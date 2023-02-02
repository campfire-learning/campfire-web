import { useQuery } from "@tanstack/react-query";
import { GetAllCourses } from "api/find-new";

export default function MultiColumnList({}: {}) {
  [];
  useQuery({
    queryKey: ["courses"],
    queryFn: () => GetAllCourses(),
    onSuccess: (data) => {
      setCourseList(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <>
      <div className="flex items-center px-4 py-2">
        <input
          type="text"
          name="find-course"
          id="find-course"
          placeholder="Search"
          className="block w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
        />
      </div>
    </>
  );
}
