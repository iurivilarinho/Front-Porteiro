import { useMutation, useQuery } from "@tanstack/react-query";
import httpRequest from "../axios/httpRequests";

const postRifa = async (Rifa: FormData) => {
    const { data } = await httpRequest.post("/rifas", Rifa);
    return data;
};


interface PutRifaParams {
    rifa: FormData;
    id: number | string
}

const putRifa = async ({ id, rifa }: PutRifaParams) => {
    const { data } = await httpRequest.put(`/rifas/${id}`, rifa);
    return data;
};

const getRifa = async (filter?: string) => {
    const { data } = await httpRequest.get(`/rifas?${filter ?? ""}`);
    return data;
};


const getRifaById = async (id: number | string) => {
    const { data } = await httpRequest.get(`/rifas/${id}`);
    return data;
};

export const useGetRifa = (filter?: string) => {
    return useQuery({
        queryKey: ["rifas", filter],
        queryFn: () => getRifa(filter),
    });
};

export const useGetRifaById = (id: number | string) => {
    return useQuery({
        queryKey: ["rifas", id],
        queryFn: () => getRifaById(id),
    });
};

export const usePostRifa = () => {
    return useMutation({ mutationFn: postRifa });
};

export const usePutRifa = () => {
    return useMutation({ mutationFn: putRifa });
};
