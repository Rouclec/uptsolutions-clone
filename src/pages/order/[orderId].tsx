import { addfile } from "@/slice/fileSlice";
import { Command } from "@/types";
import { PDFDocument } from "pdf-lib";
import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";
import { S3 } from "aws-sdk";
import OrderDetails from "@/components/order/OrderDetails";
import { Header, OrderAlert, SideBar } from "@/components";
import { roboto, roboto_slab } from "../_app";
import { HiOutlinePlus } from "react-icons/hi2";

export default function orderdetails() {
  return (
      <SideBar>
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl  font-semibold`}
          >
            Order Detail
          </p>
         
      
        </Header>
        <div className="container mx-auto mt-[75px]">
        
          <div className="flex">
            <div className="w-full">
              {/* order button  has to be a drop down */}
              <div className=" py-5 lg:rounded md:flex gap-2 ">
                <div className="mb-4 md:w-2/3 rounded-lg  rounded pt-6 pb-8">
                  <div className="bg-white p-5 rounded-md">
                    <div className=" h-[53px] pb-2 border-b border-neutral-200 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-[45px] justify-end items-start gap-2 flex">
                        <div className="grow shrink basis-0">
                          <span className="text-gray-700 text-xl font-medium leading-normal">
                            Order #95 details
                            <br />
                          </span>
                          <span className="text-gray-700 text-sm font-normal leading-tight">
                            Payment via MTN MOMO. Customer IP: 14.202.173.123
                          </span>
                        </div>
                      </div>
                      <div className="w-5 h-5 relative" />
                    </div>
                    {/* end of order drop down btn */}

                    {/* start of drop down content */}
                    <div className="my-3 flex-col justify-start items-start gap-4 inline-flex">
                      <div className="self-stretch text-gray-700 text-lg font-bold leading-tight">
                        General
                      </div>
                      <div className="self-stretch h-[366.21px] flex-col justify-start items-start gap-6 flex">
                        <div className="self-stretch justify-start items-start gap-8 inline-flex">
                          <div className="self-stretch flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                              Date created
                            </div>
                            <div className="self-stretch text-gray-700 text-sm font-normal leading-none">
                              2023-07-02
                            </div>
                          </div>
                          <div className="self-stretch flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                              Time{" "}
                            </div>
                            <div className="self-stretch text-gray-700 text-sm font-normal leading-none">
                              00:00:00
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-[58px] flex-col justify-start items-start gap-2 flex">
                          <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                            Status
                          </div>
                          <div className="px-4 py-2 bg-violet-100 rounded-md justify-start items-center gap-[296px] inline-flex">
                            <div className="text-gray-700 text-sm font-medium leading-none">
                              Pending
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-[38px] inline-flex">
                          <div className="w-[122px] self-stretch flex-col justify-start items-start gap-4 inline-flex">
                            <div className="self-stretch origin-top-left -rotate-1 text-gray-700 text-lg font-bold leading-[18px]">
                              Billing Info
                            </div>
                            <div className="self-stretch h-[182px] flex-col justify-start items-start gap-3 flex">
                              <div className="self-stretch h-[78px] flex-col justify-start items-start gap-1.5 flex">
                                <div className="self-stretch text-gray-700 text-sm font-medium leading-none">
                                  Payment method
                                </div>
                                <div className="self-stretch h-14 p-2 flex-col justify-start items-start gap-2 flex">
                                  <div className="self-stretch grow shrink basis-0 justify-start items-center gap-2 inline-flex">
                                    <div className="flex-col justify-center items-center gap-2 inline-flex">
                                      <img
                                        className="w-12 h-12 border border-stone-300 border-opacity-10"
                                        src="https://via.placeholder.com/48x48"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch h-10 flex-col justify-start items-start gap-2 flex">
                                <div className="self-stretch text-gray-700 text-sm font-medium leading-none">
                                  Email Address
                                </div>
                                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                                  info@example.com
                                </div>
                              </div>
                              <div className="self-stretch h-10 flex-col justify-start items-start gap-2 flex">
                                <div className="self-stretch text-gray-700 text-sm font-medium leading-none">
                                  Phone number
                                </div>
                                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                                  +237-672-234-654
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[155px] self-stretch flex-col justify-start items-start gap-4 inline-flex">
                            <div className="self-stretch origin-top-left -rotate-1 text-gray-700 text-lg font-bold leading-[18px]">
                              Delivery Info
                            </div>
                            <div className="self-stretch h-10 flex-col justify-start items-start gap-2 flex">
                              <div className="self-stretch text-gray-700 text-sm font-medium leading-none">
                                Address
                              </div>
                              <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                                No delivery address set.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* End of drop down  content */}

                    {/* Order detials */}
                    <OrderDetails />

                    <div className="px-4 py-2 bg-violet-100 rounded-bl-md rounded-br-md border-t border-gray-700 justify-between w-full items-center inline-flex">
                      <div className="px-4 py-2 bg-violet-100 rounded-md justify-start items-center gap-[296px] flex">
                        <div className="text-gray-700 text-sm font-medium leading-none">
                          Refund
                        </div>
                      </div>
                      <div className="flex-col justify-start items-end gap-4 inline-flex">
                        <div className="self-stretch justify-between items-start gap-[35px] inline-flex">
                          <div className="w-[114.98px] origin-top-left -rotate-1 text-gray-700 text-sm font-bold leading-[18px]">
                            Items Subtotal:
                          </div>
                          <div className="w-[70.12px] origin-top-left -rotate-1 text-right text-gray-700 text-base font-semibold leading-none">
                            4000 xaf
                          </div>
                        </div>
                        <div className="self-stretch justify-between items-start gap-[37px] inline-flex">
                          <div className="w-24 text-right text-gray-700 text-sm font-semibold leading-none">
                            Order Total:
                          </div>
                          <div className=" text-right text-gray-700 text-base font-semibold leading-none">
                            4000 xaf
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4 md:w-1/3 rounded-lg pt-6 pb-8">
                  <div className="bg-white rounded-md">
                    <div className="p-6 bg-white w-full rounded-md flex-col justify-start items-start inline-flex">
                      <div className="self-stretch pb-2 border-b border-neutral-200 justify-start items-center gap-2 inline-flex">
                        <div className="grow shrink basis-0 justify-end items-start gap-2 flex">
                          <div className="grow shrink basis-0 text-gray-700 text-xl font-medium leading-normal">
                            Order Actions
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                        <div className="self-stretch px-4 py-3 bg-violet-100 rounded-xl justify-between items-center inline-flex">
                          <div className="text-gray-700 text-lg font-medium leading-loose">
                            Change Status
                          </div>
                        </div>
                        <div className="self-stretch justify-between items-start inline-flex">
                          <div className="h-10 py-2 opacity-80 rounded-lg justify-start items-center gap-2 flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-medium underline leading-normal">
                              Move to Trash
                            </div>
                          </div>
                          <div className="py-[9px] bg-violet-700 rounded-md shadow justify-center items-center flex">
                            <div className="text-white text-base font-medium leading-tight">
                              Update
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-auto mt-5 p-6 bg-white rounded-md flex-col justify-start items-start gap-4 inline-flex"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
  );
}
