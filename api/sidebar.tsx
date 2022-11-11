import { axiosAuth } from './axios';

export const GetCourses = ({userId} : {userId: number}) => {
  return axiosAuth
  .get(`/api/v1/courses?user_id=${userId}`)
}

export const GetClubs = ({userId} : {userId: number}) => {
  return axiosAuth
  .get(`/api/v1/clubs?user_id=${userId}`)
}

export const GetInterests = ({userId} : {userId: number}) => {
  return axiosAuth
  .get(`/api/v1/interests?user_id=${userId}`)
}