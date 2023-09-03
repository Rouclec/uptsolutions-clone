import { Header, OrderAlert, SideBar, Stats } from "@/components";
import { roboto, roboto_slab } from "./_app";
import { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { HiOutlineCloudDownload } from "react-icons/hi";
import Image from "next/image";

export default function Home() {
  const [newOrder, setNewOrder] = useState(1);
  const [showAlert, setShowAlert] = useState(true);
  return (
    <SideBar>
      <div className="">
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
          >
            Dashboard
          </p>
          <div className="flex w-full items-center justify-end mb-2">
            <button className={`btn-primary flex gap-2 text-lg`}>
              <HiOutlinePlus />
              <p className={`${roboto.className} font-normal`}>Order Print</p>
            </button>
          </div>
          {showAlert && newOrder > 0 && (
            <OrderAlert
              number={newOrder}
              onClose={() => setShowAlert(false)}
              onView={() => setNewOrder(0)}
            />
          )}
        </Header>

        <div className={`${showAlert ? "mt-36" : "mt-16"}`}>
          <Stats />
          <div className="my-10 grid gap-2">
            <div className="grid gap-1">
              <p
                className={`text-[var(--gray-800)] ${roboto_slab.className} text-xl font-bold`}
              >
                Printing Summary
              </p>
              <p
                className={`text-[var(--gray-800)] ${roboto.className} text-sm`}
              >
                An overview of all print orders and tdeir details
              </p>
            </div>
            <div className="flex items-center justify-end md:justify-between">
              <div className="md:flex gap-2 items-center hidden">
                <button className="flex gap-2 btn-secondary">
                  <p className={`${roboto.className} font-normal`}>
                    Bulk actions
                  </p>
                  <HiOutlineChevronDown />
                </button>
                <button className={`btn-secondary`}>
                  <p className={`${roboto.className} font-normal`}>Apply</p>
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2 w-[10vw] md:w-[30vw] card">
                  <HiOutlineMagnifyingGlass />
                  <p
                    className={`${roboto.className} font-normal hidden md:block`}
                  >
                    Search
                  </p>
                </div>
                <button className="flex items-center gap-2 btn-secondary">
                  <HiOutlineCloudDownload />
                  <p
                    className={`${roboto.className} font-normal hidden md:block`}
                  >
                    Export to CSV
                  </p>
                </button>
              </div>
            </div>
            <div className="bg-[var(--neutral-10)] w-full rounded-md p-2">
              <table className="w-full">
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
                      <tr
                        className="border-b-[1px] hover:cursor-pointer bg-[var(--neutral-10)]"
                        key={index}
                      >
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
                          <p
                            className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}
                          >
                            06/07/2023
                          </p>
                        </td>
                        <td className="px-4 text-[var(--primary-100)] p-3">
                          {index % 2 === 0 ? (
                            <div className="p-[2px] rounded-full card-primary items-center justify-center flex">
                              Printed
                            </div>
                          ) : (
                            <div className="p-[2px] rounded-full card-secondary items-center justify-center flex">
                              In Progress
                            </div>
                          )}
                        </td>
                        <td className="px-4 p-3  rounded-r-lg">
                          <div className="flex gap-20 items-center">
                            <p className={`text-[var(--primary-500)] text-lg`}>Edit</p>
                            <HiOutlineTrash size={24} className="text-[var(--warning-600)]"/>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
