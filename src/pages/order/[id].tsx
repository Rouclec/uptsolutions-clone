import { addfile } from "@/slice/fileSlice";
import { Command } from "@/types";
import { PDFDocument } from "pdf-lib";
import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  SetStateAction,
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
import { Header, OrderAlert, SideBar, toaster } from "@/components";
import { roboto, roboto_slab } from "../_app";
import { HiOutlinePlus } from "react-icons/hi2";
import OrderNotes from "@/components/order/OrderNotes";
import OrderInfo from "@/components/order/OrderInfo";
import { useConfirmOrder, useGetOrder } from "@/hooks/order/useOrder";

interface Props {
  url: string;
  setShowModal: any;
  showModal: boolean;
}

export default function Orderdetails() {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [url, setUrl] = useState("");
  const router = useRouter();
  const id = router?.query?.docId as string;

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

  const { isLoading, data } = useGetOrder(id, () => {}, onError);

  const { mutate } = useConfirmOrder(id, () => {}, onError);

  const updateStatus = () => {
    console.log("Data Id ==>", data?.data?.data?._id);
    mutate(data?.data?.data?._id);

    console.log("New data order ==> ", data?.data?.data);
  };

  return (
    <div className="">
      <div className="absolute z-0">
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

                    <OrderInfo data={data?.data?.data} />
                    <div>
                      {data?.data?.data?.documents.map(
                        (doc: any, index: any) => (
                          <OrderDetails
                            key={index}
                            setShowModal={setShowModal}
                            setUrl={setUrl}
                            document={{
                              _id: doc?.id,
                              name: doc?.name,
                              amount: doc?.amount,
                              bindingType: doc?.bindingType,
                              paperType: doc?.paperType,
                              // coverPage: doc?.coverPage,
                              numberOfCopies: doc?.numberOfCopies,
                              orientation: doc?.orientation,
                              extraDetails: doc?.description,
                              file: doc?.file,
                              pages: doc?.pages,
                              pagesPerSheet: doc?.pagesPersheet,
                              paperSize: doc?.paperSize,
                              printColor: doc?.printColor,
                              printSides: doc?.printSides,
                              printType: doc?.printType,
                              status: doc?.status,
                              updatedAt: doc?.updatedAt,
                            }}
                          />
                        )
                      )}
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
                              {data?.data?.data?.amount} xaf
                            </div>
                          </div>
                          <div className="self-stretch justify-between items-start gap-[37px] inline-flex">
                            <div className="w-24 text-right text-gray-700 text-sm font-semibold leading-none">
                              Order Total:
                            </div>
                            <div className=" text-right text-gray-700 text-base font-semibold leading-none">
                              {data?.data?.data?.amount} xaf
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
                          <div className="self-stretch justify-between items-center inline-flex">
                            <select
                              className="  px-4 py-3 bg-violet-100 rounded-xl w-full text-lg font-medium leading-loose"
                              onChange={(e: any) => setStatus(e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                          <div className="self-stretch justify-between items-start inline-flex">
                            <div className="h-10 py-2 opacity-80 rounded-lg justify-start items-center gap-2 flex">
                              {/* <div className="grow shrink basis-0 text-gray-700 text-base font-medium underline leading-normal">
                                Move to Trash
                              </div> */}
                            </div>
                            <button
                              onClick={updateStatus}
                              className="py-1 px-4 text-white text-base font-medium leading-tight bg-violet-700 rounded-md shadow justify-center items-center flex"
                            >
                              Update
                            </button>
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
      </div>
      {showModal && (
        <div className="bg-[rgba(0,0,0,0.65)] z-[10]  fixed h-full w-full">
          <PdfModal
            setShowModal={setShowModal}
            url={url}
            showModal={showModal}
          />
        </div>
      )}
    </div>
  );
}

const PdfModal = ({ setShowModal, url, showModal }: Props) => {
  return (
    <div className="flex justify-center py-10 w-full min-h-screen">
      <div id="extralarge-modal" tabIndex={-1} className="">
        <div className="w-full max-w-7xl h-screen">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                File Preview
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="extralarge-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className=" space-y-6 w-full">
              <embed
                type="application/pdf"
                src={url}
                className="h-screen w-[800px] "
              />
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="extralarge-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="extralarge-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
