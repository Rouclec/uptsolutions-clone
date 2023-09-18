import React from "react";

export default function OrderInfo({ user }: any) {
  const date = new Date(user?.createdAt);
  const createdDate = date?.toLocaleDateString();
  const time = date?.toLocaleTimeString();
  return (
    <div>
      <div className=" p-5 rounded-md">
        <div className=" h-[53px] pb-2 border-b border-neutral-200 justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-[45px] justify-end items-start gap-2 flex">
            <div className="grow shrink basis-0">
              <span className="text-gray-700 text-xl font-medium leading-normal">
                {user?.fullName}
                <br />
              </span>
              <span className="text-gray-700 text-sm font-normal leading-tight">
                {user?.address} | {user?.email}
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
                  {createdDate}
                </div>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Time{" "}
                </div>
                <div className="self-stretch text-gray-700 text-sm font-normal leading-none">
                  {time}
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
                      {user?.email}
                    </div>
                  </div>
                  <div className="self-stretch h-10 flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch text-gray-700 text-sm font-medium leading-none">
                      Phone number
                    </div>
                    <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                      {user?.phoneNumber ? user?.phoneNumber : "No Number"}
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
                    {user?.address ? user?.address : "No delivery address set"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
