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
import OrderNotes from "@/components/order/OrderNotes";
import OrderInfo from "@/components/order/OrderInfo";

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
              <div className="mb-4 md:w-2/3 rounded-lg  bg-white rounded pt-6 p-5 pb-8">
                {/* End of drop down  content */}

                <OrderInfo />
                <div>
                  <OrderDetails />
                  <OrderDetails />
                  <OrderDetails />
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

                <div className="w-full h-auto mt-5 p-6 bg-white rounded-md flex-col justify-start items-start gap-4 inline-flex">
                  <OrderNotes />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
