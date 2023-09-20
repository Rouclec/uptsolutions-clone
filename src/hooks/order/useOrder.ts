import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order } from "@/types";

const fetchOrder = () => {
  return axios.get("/api/order/get");
};

const fetchOrderById = (orderId: string) => {
  return axios.get(`/api/order/get-one?id=${orderId}`);
};

const createOrder = (order: Order) => {
  return axios.post(`/api/order/create`, order);
};

const getStats = () => {
  return axios.get(`/api/order/stats`);
};

const getUserStats = (user: string) => {
  return axios.get(`/api/order/user/stats?user=${user}`);
};

const confirmOrder = (order: string) =>{
  return axios.patch(`/api/order/confirm`);
}
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
  return useQuery(["orders/stats"], getStats, {
    onSuccess,
    onError,
  });
};

export const useGetUserOrderStats = (
  user: string,
  onSuccess: any,
  onError: any,
  disabled: boolean
) => {
  return useQuery(["orders/stats", user], () => getUserStats(user), {
    onSuccess,
    onError,
    enabled: !disabled,
  });
};


export const useConfirmOrder = (orderId: string, onSuccess: any, onError: any) => {
  return useMutation(["order", orderId], () => confirmOrder(orderId), {
    onSuccess,
    onError,
  });
};