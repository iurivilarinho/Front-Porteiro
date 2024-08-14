import { useQuery } from "@tanstack/react-query";
import httpRequestCep from "../axios/httpRequestsCep";

const getCEP = async (cep: string) => {
  const { data } = await httpRequestCep.get(`${cep}/json/`);
  return data;
};

export const useGetCEP = (cep: string) => {
  return useQuery({
    queryKey: ["cep", cep],
    queryFn: () => getCEP(cep),
  });
};
