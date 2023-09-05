import { Header, OrderAlert, SideBar, Stats } from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { HiOutlineCloudDownload } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { roboto, roboto_slab } from "@/pages/_app";
import PrintItem from "./PrintItem";
function PrintSummary() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className={`${showAlert ? "mt-44" : "mt-28"}`}>
      <Stats />
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
              {Array(10)
                .fill("a")
                ?.map((_: any, index) => (
                  <PrintItem key={index} />
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

export default PrintSummary;
