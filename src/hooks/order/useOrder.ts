import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order } from "@/types";

const fetchOrder = () => {
  return axios.get("/api/order/get");
};

const fetchOrderById = (orderId: string) => {
  return axios.get(`/api/order/get-one/${orderId}`);
};


const createOrder = (order: Order) => {
  return axios.post(`/api/order/create`, order);
};

const getStats = () => {
  return axios.get(`/api/order/stats`);
};

export const useGetOrders = (onSuccess: any, onError: any) => {
  return useQuery(["orders"], fetchOrder, {
    onSuccess,
    onError,
  });
};



export const useGetOrder = (orderId: string, onSuccess: any, onError: any) => {
  return useQuery(["order", orderId], () => fetchOrderById(orderId), {
    onSuccess,
    onError,
  });
};

export const useCreateOrder = (onSuccess: any, onError: any) => {
  return useMutation(createOrder, {
    onSuccess,
    onError,
  });
};

export const useGetOrderStats = (onSuccess: any, onError: any) => {
  return useQuery([
    "orders/stats",
    getStats,
    {
      onSuccess,
      onError,
    },
  ]);
};
