import { Header, OrderAlert, SideBar, Stats, toaster } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
} from "react-icons/hi2";
import { HiOutlineCloudDownload } from "react-icons/hi";
import Link from "next/link";
import { roboto, roboto_slab } from "@/pages/_app";
import PrintItem from "./PrintItem";
import { Sentry } from "react-activity";
import {
  useGetUserDocuments,
  useGetUserPendingDocuments,
} from "@/hooks/document/useDocument";
import { Command, User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useGetUserOrderStats } from "@/hooks/order/useOrder";

function PrintSummary() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(true);
  const [documents, setDocuments] = useState() as any;
  const [pendingDocuments, setPendingDocuments] = useState() as any;
  const [items, setItems] = useState(1);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Command[]>([]);

  const session = useSession();

  const queryClient = useQueryClient();

  const user = session.data?.user as User;

  useEffect(() => {
    const originalData = queryClient.getQueryData([
      "documents",
      user?._id,
    ]) as any;
    setItems(originalData?.data?.results);
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
    setItems(data?.data?.results);
    setDocuments(data?.data?.data);
  };

  const { isLoading: isStatsLoading, data: stats } = useGetUserOrderStats(
    user?._id as string,
    () => {},
    onError,
    !user?._id
  );

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
    (data: any) => {
      setPendingDocuments(data?.data?.data);
    },
    onError,
    !!pendingDocuments
  );

  const handleMultiSelect = () => {
    selected?.length !== documents.length
      ? setSelected(documents)
      : setSelected([]);
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
            >
              <HiOutlinePlus />
              <p className={`${roboto.className} font-normal`}>Order Print</p>
            </button>
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
        <div className="flex w-full items-center justify-end mb-2">
          <Link href="/order-print">
            <button className={`btn-primary flex gap-2 text-lg`}>
              <HiOutlinePlus />
              <p className={`${roboto.className} font-normal`}>Order Print</p>
            </button>
          </Link>
        </div>
        {showAlert && pendingDocuments?.length > 0 && (
          <OrderAlert
            message={`You have ${pendingDocuments?.length} pending file${
              pendingDocuments?.length > 1 ? "s" : ""
            }`}
            viewTxt={"Proceed to pay"}
            onClose={() => setShowAlert(false)}
            link={"/checkout"}
            showBtn= {true}

          />
        )}
      </Header>
      <Stats stats={stats?.data?.data} />
      <div className="my-10 grid gap-2">
        <div className="grid gap-1">
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-xl font-bold`}
          >
            Printing Summary
          </p>
          <p className={`text-[var(--gray-800)] ${roboto.className} text-sm`}>
            An overview of all print orders and their details
          </p>
        </div>
        <div className="flex items-center justify-end md:justify-between">
          <div className="md:flex gap-2 items-center hidden">
            {/* <button className="flex gap-2 btn-secondary">
              <p className={`${roboto.className} font-normal`}>Bulk actions</p>
              <HiOutlineChevronDown />
            </button> */}
            <select
              // onChange={(e) => setPaperSize(e.target.value)}
              className="my-auto bg-gray-50 border border-gray-300 p-3 rounded-lg"
            >
              <option value="" disabled>
                Bulk actions
              </option>
              <option value="delete">Delete</option>
              <option value="print">Print</option>
            </select>
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
                  <input
                    type="checkbox"
                    onChange={handleMultiSelect}
                    checked={selected?.length === documents?.length}
                  />
                </th>
                <th className="text-left border-[var(--gray-100)] px-4">
                  Document Name
                </th>
                <th className=" px-4 text-left">Description</th>
                <th className=" px-4 text-left">Date uploaded</th>
                <th className=" px-4 text-left">Status</th>
                <th className=" border-[var(--gray-100)] px-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {documents?.map((document: Command, index: number) => (
                <PrintItem
                  key={index}
                  document={document}
                  handleSelect={() => handleSelect(document)}
                  isChecked={
                    !!selected.find((item) => item?._id == document?._id)
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

export default PrintSummary;
