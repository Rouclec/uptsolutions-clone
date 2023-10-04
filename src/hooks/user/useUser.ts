import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = () => {
  return axios.get("/api/user/getAll");
};

export const useGetUsers = (onSuccess: any, onError: any) => {
    return useQuery(["orders"], fetchUsers, {
      onSuccess,
      onError,
    });
  };