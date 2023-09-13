import { Command } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const uploadDocument = (document: Command) => {
  return axios.post("/api/document/upload", document);
};

const fetchDocuments = () => {
  return axios.get("/api/document/get");
};

const fetchDocument = (id: string) => {
  return axios.get(`/api/document/get-one?id=${id}`);
};

const fetchUserDocuments = (userId: string) => {
  return axios.get(`/api/document/get?createdBy=${userId}`);
};

const fetchPendingUserDocuments = (userId: string) => {
  return axios.get(`/api/document/get?createdBy=${userId}&status=pending`);
};

const deleteUserDocument = (doc: { name: string; id: string }) => {
  return axios.get(`/api/document/delete?name=${doc?.name}&id=${doc?.id}`);
};

export const useGetDocuments = (onSuccess: any, onError: any) => {
  return useQuery(["documents"], fetchDocuments, {
    onSuccess,
    onError,
  });
};

export const useGetUserDocuments = (
  userId: string,
  onSuccess: any,
  onError: any
) => {
  return useQuery(
    ["documents/user", userId],
    () => fetchUserDocuments(userId),
    {
      onSuccess,
      onError,
    }
  );
};

export const useGetDocument = (id: string, onSuccess: any, onError: any) => {
  return useQuery(["document", id], () => fetchDocument(id), {
    onSuccess,
    onError,
  });
};

export const useGetUserPendingDocuments = (
  userId: string,
  onSuccess: any,
  onError: any,
  disabled?: boolean
) => {
  return useQuery(
    ["documents", userId, "pending"],
    () => fetchPendingUserDocuments(userId),
    {
      onSuccess,
      onError,
      enabled: !disabled,
    }
  );
};

export const useUploadDocument = (onSuccess: any, onError: any) => {
  return useMutation(uploadDocument, {
    onSuccess,
    onError,
  });
};

export const useDeleteDocument = (onSuccess: any, onError: any) => {
  return useMutation(deleteUserDocument, {
    onSuccess,
    onError,
  });
};
