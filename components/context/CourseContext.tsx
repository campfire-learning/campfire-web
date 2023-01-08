import { createContext, useState } from "react";

interface ICourseContext {
  currentCourse: Record<string, any>;
  setCurrentCourse?: (selected: Record<string, any>) => void;
}

const defaultCurrentCourse = {
  currentCourse: {},
};

export const CurrentCourseContext =
  createContext<ICourseContext>(defaultCurrentCourse);

export const CourseContextContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentCourse, setCurrentCourse] = useState<Record<string, any>>({});

  return (
    <CurrentCourseContext.Provider
      value={{ currentCourse, setCurrentCourse }}
    >
      {children}
    </CurrentCourseContext.Provider>
  );
};
