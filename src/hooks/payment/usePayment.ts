import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const initPayment = (body: {
  phoneNumber: string;
  amount: number;
  external_ref: string;
}) => {
  return axios.post("/api/payment/init", body);
};

const processPayment = (reference: string) => {
  return axios.get(`/api/payment/process?reference=${reference}`);
};

const widthraw = (amount: string | number) => {
  return axios.get(`/api/payment/withdraw?amount=${amount}`);
};

export const useInitPayment = (onSuccess: any, onError: any) => {
  return useMutation(initPayment, {
    onSuccess,
    onError,
  });
};

export const useProcessPayment = (
  onSuccess: any,
  onError: any,
  reference: string,
  enabled: boolean
) => {
  return useQuery(["payment", reference], () => processPayment(reference), {
    onSuccess,
    onError,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    enabled,
  });
};

export const useWithdraw = (onSuccess: any, onError: any) => {
  return useMutation(widthraw, {
    onSuccess,
    onError,
  });
};
