import { SideBar } from "@/components";
import React, { useState } from "react";

export default function Billing() {
  const [isPaidHistory, setIsPaidHistory] = useState(true);

  return (
    <SideBar>
      <div className="w-full px-10 pt-4 pb-10 bg-white rounded-lg shadow border border-zinc-300 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch h-20 flex-col justify-start items-start flex">
          <div className="self-stretch text-gray-700 text-[28px] font-bold font-['Roboto'] leading-[48px]">
            Payment History
          </div>
          <div className="self-stretch h-10 p-2 flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
              Find information of your payment transactions.
            </div>
          </div>
        </div>
        <div className="self-stretch h-36 flex-col justify-between items-start flex">
          <div className="flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch pl-4 border-b border-zinc-100 justify-start items-center gap-8 inline-flex">
              <div
                className={`h-12 px-4 pb-4 ${
                  !isPaidHistory || "border-b border-violet-700"
                } justify-center items-center gap-2.5 flex`}
              >
                <button
                  onClick={() => setIsPaidHistory(true)}
                  className={` ${
                    !isPaidHistory || "text-violet-700"
                  } text-gray-700 text-xl font-medium font-['Roboto'] leading-loose`}
                >
                  Paid History
                </button>
              </div>
              <div
                className={`h-12 px-4 pb-4 ${
                  isPaidHistory || "border-b border-violet-700"
                } justify-center items-center gap-2.5 flex`}
              >
                {" "}
                <button
                  onClick={() => setIsPaidHistory(false)}
                  className={` ${
                    isPaidHistory || "text-violet-700"
                  } text-gray-700 text-xl font-medium font-['Roboto'] leading-loose`}
                >
                  Refunded History
                </button>
              </div>
            </div>
            {isPaidHistory ? <PaidHistory /> : <RefundHistory />}
          </div>
        </div>
      </div>
    </SideBar>
  );
}

const PaidHistory = () => {
  return (
    <div className="justify-start items-start gap-8 inline-flex">
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Payment ID
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          P_3550779
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Invoice ID
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          HCY_3550779
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Service
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          Order No: 2453635 payment
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Payment method
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          HCY_3550779
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Paid at
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          June 23, 2023 . 12:30PM
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Amount
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          4000 XAF{" "}
        </div>
      </div>
    </div>
  );
};

const RefundHistory = () => {
  return (
    <div className="justify-start items-start gap-8 inline-flex">
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Refund ID
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          H_3550779
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Invoice ID
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          HCY_3550779
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Service
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          Order No: 2453635 payment
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Payment method
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          HCY_3550779
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Paid at
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          June 23, 2023 . 12:30PM
        </div>
      </div>
      <div className="p-2 flex-col justify-start items-start inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
          Amount
        </div>
        <div className="text-gray-700 text-xl font-normal font-['Roboto'] leading-loose">
          4000 XAF{" "}
        </div>
      </div>
    </div>
  );
};
