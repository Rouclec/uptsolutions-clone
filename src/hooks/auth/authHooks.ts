import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const login = (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
}) => {
  return axios.post("/api/auth/signup", data);
};

export const useLogin = (onSuccess: any, onError: any) => {
  return useMutation(login, {
    onSuccess,
    onError,
  });
};
