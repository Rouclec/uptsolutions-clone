import { Header, OrderAlert, SideBar, Stats, toaster } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { roboto, roboto_slab } from "@/pages/_app";
import OrderItem from "./OrderItem";
import { useGetOrders } from "@/hooks/order/useOrder";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import {
  useGetUserDocuments,
  useGetUserPendingDocuments,
} from "@/hooks/document/useDocument";
import AdminStats from "./AdminStats.component";

function OrderSummary() {
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
    if (originalData?.data?.data) {
      const pending = originalData?.data?.data?.filter(
        (data: any) => data?.status === "pending"
      );
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
    originalData?.data?.data && setPendingDocuments(originalData?.data?.data);
  }, [queryClient, user?._id]);

  const { isLoading: isPendingDocumentsLoading } = useGetUserPendingDocuments(
    user?._id as string,
    onSuccess,
    onError,
    !!pendingDocuments
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Server Error try refreshing</h2>;
  }

  return (
    <div className={`${showAlert ? "mt-44" : "mt-28"}`}>
      <Header>
        <p
          className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
        >
          Dashboard
        </p>

        {showAlert && newOrder > 0 && (
          <OrderAlert
            message={`You have ${newOrder} pending order`}
            viewTxt={"View order"}
            onClose={() => setShowAlert(false)}
            link={"/checkout"}
            showBtn= {false}
          />
        )}
      </Header>
      <AdminStats
        stats={{
          amount: 0,
          pending: 0,
          completed: 0,
          refunded: 0,
        }}
      />
      <div className="my-10 grid gap-2">
        <div className="grid gap-1">
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-xl font-bold`}
          >
            Order Summary
          </p>
          <p className={`text-[var(--gray-800)] ${roboto.className} text-sm`}>
            An overview of all print orders and their details
          </p>
        </div>
        <div className="flex items-center justify-end md:justify-between">
          <div className="md:flex gap-2 items-center hidden">
            <button className="flex gap-2 btn-secondary">
              <p className={`${roboto.className} font-normal`}>Bulk actions</p>
              <HiOutlineChevronDown />
            </button>
            <button className={`btn-secondary`}>
              <p className={`${roboto.className} font-normal`}>Apply</p>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 w-[10vw] md:w-[30vw] card">
              <HiOutlineMagnifyingGlass />
              <p className={`${roboto.className} font-normal hidden md:block`}>
                Search
              </p>
            </div>
            <button className="flex items-center gap-2 btn-secondary">
              <HiOutlineCloudDownload />
              <p className={`${roboto.className} font-normal hidden md:block`}>
                Export to CSV
              </p>
            </button>
          </div>
        </div>
        <div className="bg-[var(--neutral-10)] w-full rounded-md overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr
                className={`bg-[var(--gray-100)]  text-[var(--gray-500)] font-[500] h-12 ${roboto.className} border-b-2 uppercase`}
              >
                <th className=" border-[var(--gray-100)] px-4">
                  <input type="checkbox" />
                </th>
                <th className="text-left border-[var(--gray-100)] px-4">
                  Client Name
                </th>
                <th className=" px-4 text-left">Description</th>
                <th className=" px-4 text-left">Order date</th>
                <th className=" px-4 text-left">Status</th>
                <th className=" px-4 text-left">Order Type</th>

                <th className=" border-[var(--gray-100)] px-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(10)
                .fill("a")
                ?.map((_: any, index) => (
                  <OrderItem key={index} />
                ))}
              <tr
                className={`bg-[var(--gray-100)]  text-[var(--gray-500)] font-[500] h-12 ${roboto.className} border-b-2 uppercase`}
              >
                <th className=" border-[var(--gray-100)] px-4"></th>
                <th className="text-left border-[var(--gray-100)] px-4">
                  Showing 1 of 10
                </th>
                <th className=" px-4 text-left" />
                <th className=" px-4 text-left" />
                <th className=" px-4 text-left" />
                <th className=" border-[var(--gray-100)] px-4 text-left">
                  <div className="flex gap-20 items-center">
                    <button>Prev</button>
                    <button>Next</button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
