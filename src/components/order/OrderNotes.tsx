import React from 'react'

export default function OrderNotes() {
  return (
    <div>
        <div className=" h-[632px] p-6 bg-white rounded-md flex-col justify-start items-start gap-4 inline-flex">
  <div className="self-stretch pb-2 border-b border-zinc-300 justify-start items-center gap-2 inline-flex">
    <div className="grow shrink basis-0 h-6 justify-end items-start gap-2 flex">
      <div className="grow shrink basis-0 text-gray-700 text-xl font-medium font-['Roboto'] leading-normal">Order Notes</div>
    </div>
    <div className="w-5 h-5 relative" />
  </div>
  <div className="self-stretch h-[536px] flex-col justify-start items-start gap-6 flex">
    <div className="self-stretch h-[536px] flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch h-[246px] border-b border-zinc-300 flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch justify-end items-end gap-[136px] inline-flex">
          <div className="pl-4 pr-2 py-1 bg-violet-100 rounded-md justify-start items-center flex">
            <div className="text-black text-xs font-medium font-['Inter'] leading-none">From Customer</div>
            <div className="w-6 h-6 relative" />
          </div>
        </div>
        <div className="self-stretch h-[206px] pb-2 flex-col justify-start items-end gap-0.5 flex">
          <div className="self-stretch h-[172px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch h-[30px] justify-between items-end inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="w-[30px] h-[30px] p-3 bg-zinc-100 rounded-[100px] justify-center items-center gap-2 flex">
                  <div className="text-stone-800 text-xs font-bold font-['Inter']">EM</div>
                </div>
                <div className="text-stone-800 text-sm font-medium font-['Roboto Flex'] leading-7">Emmanuelle</div>
              </div>
              <div className="justify-start items-end gap-2 flex">
                <div className="w-[18px] h-[18px] px-0.5 rounded-[100px] border border-black justify-center items-center gap-2 flex">
                  <div className="w-3 h-3 relative rounded-[100px]" />
                </div>
                <div className="w-[18px] h-[18px] px-0.5 rounded-[100px] border border-black justify-center items-center gap-2 flex">
                  <div className="w-3 h-3 relative rounded-[100px]" />
                </div>
              </div>
            </div>
            <div className="self-stretch grow shrink basis-0 pl-2.5 pr-2 py-0.5 rounded-lg border border-gray-300 justify-start items-start gap-2.5 inline-flex">
              <div className="grow shrink basis-0 self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="self-stretch text-gray-500 text-sm font-normal font-['Inter'] leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</div>
              </div>
            </div>
          </div>
          <div className="text-right text-gray-500 text-xs font-normal font-['Roboto Flex'] leading-normal">Date goes here</div>
        </div>
      </div>
      <div className="self-stretch h-[266px] pb-2 flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch h-[198px] flex-col justify-start items-end gap-0.5 flex">
          <div className="self-stretch h-[172px] flex-col justify-start items-start gap-2 flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="text-stone-800 text-lg font-medium font-['Roboto'] leading-tight">Add note</div>
            </div>
            <div className="self-stretch grow shrink basis-0 pl-2.5 pr-2 py-0.5 rounded-lg border border-gray-300 justify-start items-start gap-2.5 inline-flex">
              <div className="grow shrink basis-0 self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="self-stretch text-gray-500 text-sm font-normal font-['Inter'] leading-normal">Leave a note</div>
              </div>
            </div>
          </div>
          <div className="text-right text-gray-500 text-xs font-normal font-['Roboto Flex'] leading-normal">Number of words</div>
        </div>
        <div className="self-stretch justify-start items-center gap-[11px] inline-flex">
          <div className="h-11 px-4 py-2 bg-violet-100 rounded-md justify-between items-center flex">
            <div className="text-gray-700 text-lg font-medium font-['Roboto'] leading-7">Note to customer</div>
            <div className="w-6 h-6 relative" />
          </div>
          <div className="px-4 py-2 rounded-md border border-violet-700 justify-center items-center gap-2 flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-violet-700 text-lg font-medium font-['Inter']">Add</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
