import React, { useEffect, useState } from "react";
import { roboto, roboto_slab } from "@/pages/_app";
import Image from "next/image";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import {
  useGetUserDocuments,
  useGetUserPendingDocuments,
} from "@/hooks/document/useDocument";
import { toaster } from "../general/Toaster.component";
import { User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function PrintItem() {
  const [showAlert, setShowAlert] = useState(true);
  const [newOrder, setNewOrder] = useState(1);
  const [documents, setDocuments] = useState();
  const [pendingDocuments, setPendingDocuments] = useState();

  const router = useRouter();

  const session = useSession();

  const queryClient = useQueryClient();

  const user = session.data?.user as User;

  useEffect(() => {
    const originalData = queryClient.getQueryData([
      "documents",
      user?._id,
    ]) as any;
    console.log({ originalData });
    if (originalData?.data?.data) {
      const pending = originalData?.data?.data?.filter(
        (data: any) => data?.status === "pending"
      );

      console.log({ pending });
      setPendingDocuments(pending);
      setDocuments(originalData?.data?.data);
    }
  }, [queryClient, user?._id]);

  const onError = (error: any) => {
    console.log("error creating: ", error);
    toaster(
      error?.response
        ? error.response.data.message
        : error?.message
        ? error.message
        : "An unknown error occured",
      "error"
    );
  };

  const onSuccess = (data: any) => {
    console.log("successfully fetched: ", data);
    const pending = data?.data?.data?.filter(
      (data: any) => data?.status === "pending"
    );

    console.log({ pending });
    setPendingDocuments(pending);
    setDocuments(data?.data?.data);
  };

  const { isLoading, isError } = useGetUserDocuments(
    user?._id as string,
    onSuccess,
    onError
  );

  useEffect(() => {
    const originalData = queryClient.getQueryData([
      "documents",
      user?._id,
      "pending",
    ]) as any;
    console.log({ originalData });
    originalData?.data?.data && setPendingDocuments(originalData?.data?.data);
  }, [queryClient, user?._id]);

  const { isLoading: isPendingDocumentsLoading } = useGetUserPendingDocuments(
    user?._id as string,
    onSuccess,
    onError,
    !!pendingDocuments
  );
  return (
    <tr className="border-b-[1px] hover:cursor-pointer bg-[var(--neutral-10)]">
      <td className="px-4 text-[var(--gray-700)] font-semibold p-3  rounded-l-lg text-center">
        <input type="checkbox" />
      </td>
      <td className="px-4 font-semibold p-3 text-left ">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 rounded-full items-center justify-center">
            <Image
              src={"/assets/books.png"}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div className="grid gap-1">
            <p
              className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}
            >
              Jane Cooper
            </p>
            <p
              className={`text-[var(--gray-500)] font-normal ${roboto.className}`}
            >
              janecooper@example.com
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 text p-3 ">
        <div className="grid gap-1">
          <p
            className={`text-[var(--gray-800)] font-normal ${roboto.className}`}
          >
            Regional Paradigm Technician
          </p>
          <p
            className={`text-[var(--gray-400)] font-normal ${roboto.className}`}
          >
            Optimization
          </p>
        </div>
      </td>
      <td className="px-4 text-[var(--gray-700)] font-light p-3 ">
        <p className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}>
          06/07/2023
        </p>
      </td>
      <td className="px-4 text-[var(--primary-100)] p-3">
        {true ? (
          <div className="p-[2px] rounded-full card-primary items-center justify-center flex truncate">
            Printed
          </div>
        ) : (
          <div className="p-[2px] rounded-full card-secondary items-center justify-center flex truncate">
            In Progress
          </div>
        )}
      </td>
      <td className="px-4 p-3  rounded-r-lg">
        <div className="flex gap-20 items-center">
          <p className={`text-[var(--primary-500)] text-lg`}>Edit</p>
          <HiOutlineTrash size={24} className="text-[var(--warning-600)]" />
        </div>
      </td>
    </tr>
  );
}
