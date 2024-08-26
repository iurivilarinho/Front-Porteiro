import { useMutation, useQuery } from "@tanstack/react-query";
import httpRequest from "../axios/httpRequests";

const postPessoa = async (Pessoa: FormData) => {
  const { data } = await httpRequest.post("/pessoas", Pessoa);
  return data;
};


interface PutPessoaParams {
  pessoa: FormData;
  id: number | string
}

const putPessoa = async ({ id, pessoa }: PutPessoaParams) => {
  const { data } = await httpRequest.put(`/pessoas/${id}`, pessoa);
  return data;
};

const getPessoa = async (filter?: string) => {
  const { data } = await httpRequest.get(`/pessoas?${filter ?? ""}`);
  return data;
};


const getPessoaById = async (id: number | string) => {
  const { data } = await httpRequest.get(`/pessoas/${id}`);
  return data;
};

export const useGetPessoa = (filter?: string) => {
  return useQuery({
    queryKey: ["pessoas", filter],
    queryFn: () => getPessoa(filter),
  });
};

export const useGetPessoaById = (id: number | string) => {
  return useQuery({
    queryKey: ["pessoas", id],
    queryFn: () => getPessoaById(id),
  });
};

export const usePostPessoa = () => {
  return useMutation({ mutationFn: postPessoa });
};

export const usePutPessoa = () => {
  return useMutation({ mutationFn: putPessoa });
};
