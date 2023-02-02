import { createContext, useState } from "react";

interface ICourseContext {
  currentCourse: Record<string, unknown>;
  setCurrentCourse?: (selected: Record<string, unknown>) => void;
}

const defaultCurrentCourse = {
  currentCourse: {},
}

export const CurrentCourseContext = createContext<ICourseContext>(defaultCurrentCourse);


export const CourseContextContainer = ({ children } : {children: React.ReactNode}) => {
  const [currentCourse, setCurrentCourse] = useState<Record<string, unknown>>({});

  return (
      <CurrentCourseContext.Provider value={{currentCourse, setCurrentCourse}}>
        {children}
      </CurrentCourseContext.Provider>
  )
}
