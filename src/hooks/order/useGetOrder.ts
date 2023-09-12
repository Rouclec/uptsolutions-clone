import axios from "axios";
import { isError, useQuery } from "@tanstack/react-query";

const fetchOrder = () => {
  return axios.get("/api/order/get");
};
export const useGetOrder = ( ) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: fetchOrder,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval:3000
  });
};
