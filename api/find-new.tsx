import { axiosAuth } from "./axios";

export const GetAllCourses = () => {
  return axiosAuth.get(`/api/v1/courses`);
};

export const GetAllClubs = () => {
  return axiosAuth.get(`/api/v1/clubs`);
};

export const GetAllInterests = () => {
  return axiosAuth.get(`/api/v1/interests`);
};
