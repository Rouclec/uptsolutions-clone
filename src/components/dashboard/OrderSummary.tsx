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
import { useGetOrderStats, useGetOrders } from "@/hooks/order/useOrder";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Command, User } from "@/types";
import {
  useGetDocuments,
  useGetUserDocuments,
  useGetUserPendingDocuments,
} from "@/hooks/document/useDocument";
import { Sentry } from "react-activity";
import { useWithdraw } from "@/hooks/payment/usePayment";

function OrderSummary() {
  const [showAlert, setShowAlert] = useState(true);
  const [newOrder, setNewOrder] = useState(1);
  const [items, setItems] = useState(1);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState() as any;
  const [pendingOrders, setPendingOrders] = useState() as any;
  const [selected, setSelected] = useState([]) as any;

  const router = useRouter();

  const session = useSession();

  const queryClient = useQueryClient();

  const user = session.data?.user as User;

  const onSuccess = (data: any) => {
    setItems(data?.data?.results);
    setOrders(data?.data?.data);
    const pendingOrders = data?.data?.data?.filter(
      (data: any) => data?.status === "pending"
    );
    setPendingOrders(pendingOrders);
  };
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

  const { isLoading: isStatsLoading, data: stats } = useGetOrderStats(() => {},
  onError);

  const { isLoading } = useGetOrders(onSuccess, onError);

  const handleMultiSelect = () => {
    selected?.length !== orders.length ? setSelected(orders) : setSelected([]);
  };

  const handleSelect = (document: Command) => {
    const isSelected = selected.find(
      (item: Command) => item?._id === document?._id
    );

    if (!!isSelected) {
      setSelected(
        selected.filter((item: Command) => item?._id !== isSelected?._id)
      );
    } else {
      setSelected([...selected, document]);
    }
  };

  /****************TEST WITHDRAWAL */
  const { mutate } = useWithdraw(
    (data: any) => console.log("withdrawal :", data),
    onError
  );
  /*************ENDS HERE */

  if (isLoading || isStatsLoading) {
    return (
      <div
        className={`flex h-[calc(100vh-10rem)] items-center justify-center overflow-y-hidden`}
      >
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
          >
            Dashboard
          </p>
          <div className="flex w-full items-center justify-end mb-2">
            <button
              className={`btn-primary flex gap-2 text-lg opacity-20`}
              disabled
            ></button>
          </div>
        </Header>
        <div className="self-center">
          <Sentry size={120} speed={0.2} color="var(--primary-600)" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${showAlert ? "mt-44" : "mt-28"}`}>
      <Header>
        <p
          className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
        >
          Dashboard
        </p>

        {showAlert && pendingOrders?.length > 0 && (
          <OrderAlert
            message={`You have ${pendingOrders?.length} pending order`}
            onClose={() => setShowAlert(false)}
          />
        )}
      </Header>
      <Stats stats={stats?.data?.data} />
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
              <p
                className={`${roboto.className} font-normal`}
                onClick={() => mutate(69)}
              >
                Apply
              </p>
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
                  <input
                    type="checkbox"
                    onChange={handleMultiSelect}
                    checked={selected?.length === orders?.length}
                  />
                </th>
                <th className="text-left border-[var(--gray-100)] px-4">
                  Client Name
                </th>
                <th className=" px-4 text-left">Description</th>
                <th className=" px-4 text-left">Order date</th>
                <th className=" px-4 text-left">Status</th>
                <th className=" border-[var(--gray-100)] px-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any, index: number) => (
                <OrderItem
                  key={index}
                  document={order}
                  handleSelect={() => handleSelect(order)}
                  isChecked={
                    !!selected.find((item: any) => item?._id == order?._id)
                  }
                />
              ))}
              <tr
                className={`bg-[var(--gray-100)]  text-[var(--gray-500)] font-[500] h-12 ${roboto.className} border-b-2 uppercase`}
              >
                <th className=" border-[var(--gray-100)] px-4"></th>
                <th className="text-left border-[var(--gray-100)] px-4">
                  {`Showing ${page} of ${
                    items > 0 ? Math.ceil(items / 10) : 1
                  }`}
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
