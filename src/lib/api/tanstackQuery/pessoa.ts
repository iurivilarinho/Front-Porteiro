import { useMutation, useQuery } from "@tanstack/react-query";
import httpRequest from "../axios/httpRequests";

const postPessoa = async (Pessoa: FormData) => {
  const { data } = await httpRequest.post("/pessoas", Pessoa);
  return data;
};

const getPessoa = async (filter?: string) => {
  const { data } = await httpRequest.get(`/pessoas?${filter ?? ""}`);
  return data;
};

export const useGetPessoa = (filter?: string) => {
  return useQuery({
    queryKey: ["pessoas", filter],
    queryFn: () => getPessoa(filter),
  });
};
export const usePostPessoa = () => {
  return useMutation({ mutationFn: postPessoa });
};
