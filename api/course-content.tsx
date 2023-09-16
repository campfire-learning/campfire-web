import { axiosAuth } from "./axios";

export const GetCourseDetail = ({ courseId }: { courseId: number }) => {
  return axiosAuth.get(`/api/v1/courses/${courseId}`);
};
