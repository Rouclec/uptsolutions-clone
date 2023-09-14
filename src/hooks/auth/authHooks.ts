import { User } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const login = (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
}) => {
  return axios.post("/api/auth/signup", data);
};

const updateUser = (data: User) => {
  return axios.patch(`/api/user/update-me?id=${data?._id}`, data);
};

const getUser = (id: string) => {
  return axios.get(`/api/user/get?id=${id}`);
};

export const useLogin = (onSuccess: any, onError: any) => {
  return useMutation(login, {
    onSuccess,
    onError,
  });
};

export const useUpdateUser = (onSuccess: any, onError: any) => {
  return useMutation(updateUser, {
    onSuccess,
    onError,
  });
};

export const useGetUser = (id: string, onSuccess: any, onError: any) => {
  return useQuery(["user", id], () => getUser(id), {
    onSuccess,
    onError,
  });
};
