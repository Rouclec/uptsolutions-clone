import axios from "axios";
import { isError, useQuery } from "@tanstack/react-query";

const fetchOrderById = (orderId: string) => {
  return axios.get(`/api/order/get-one/${orderId}`);
};
export default function useGetOrderById(orderId: string) {
  return useQuery(["order", orderId], () => fetchOrderById(orderId));
}
