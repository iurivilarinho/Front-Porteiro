import { useMutation } from "@tanstack/react-query";
import httpRequest from "../axios/httpRequests";
import { Login } from "../../../types/login";

const postLogin = async (Login: Login) => {
  const { data } = await httpRequest.post("/login", Login);
  return data;
};

export const usePostLogin = () => {
  return useMutation({ mutationFn: postLogin });
};
