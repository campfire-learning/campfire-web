import { axiosAuth } from "./axios";

export const SubmitLogin = (submitProps: {
  email: string;
  password: string;
  client_id: string;
}) => {
  return axiosAuth.post("/api/v1/users/login", {
    email: submitProps.email,
    password: submitProps.password,
    client_id: submitProps.client_id,
  });
};
