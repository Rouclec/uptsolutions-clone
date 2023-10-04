import { Header, OrderAlert, SideBar, Stats, toaster } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { roboto, roboto_slab } from "@/pages/_app";
import OrderItem from "./UserItem";
import { useGetOrders } from "@/hooks/order/useOrder";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import {
  useGetUserDocuments,
  useGetUserPendingDocuments,
} from "@/hooks/document/useDocument";
import UserItem from "./UserItem";
import { useGetUsers } from "@/hooks/user/useUser";

function UserList() {
  const [showAlert, setShowAlert] = useState(false);

  const { data } = useGetUsers(
    () => {},
    () => {}
  );

  return (
    <div className={`${showAlert ? "mt-44" : "mt-28"}`}>
      <Header>
        <p
          className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
        >
          Customers
        </p>
      </Header>

      <div className="my-10 grid gap-2">
        <div className="grid gap-1">
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-xl font-bold`}
          >
            List of all customers
          </p>
          <p className={`text-[var(--gray-800)] ${roboto.className} text-sm`}>
            An overview of all our customers
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
                <th className=" px-4 text-left">Role</th>
                <th className=" px-4 text-left">Total Orders</th>
                <th className=" px-4 text-left">Address</th>
                <th className=" px-4 text-left">Phone Number</th>

                <th className=" border-[var(--gray-100)] px-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data?.map((user: User, index: any) => (
                <UserItem key={index} user={user} />
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

export default UserList;
