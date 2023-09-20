import { Command } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
interface Props {
  setShowModal: any;
  setUrl: any;
  document: Command;
}

export default function OrderDetails({
  setShowModal,
  setUrl,
  document,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    setUrl(document.file);
  }, []);

  const handlePrint = () => {
    var pdfUrl =document?.file
    var xhr:any = new XMLHttpRequest();
    xhr.open("GET", pdfUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function(e:any) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: "application/pdf"});
        var url = URL.createObjectURL(blob);
        var win = window?.open(url, "_blank");
        win?.print();
      }
    };
    xhr.send();
  };

  return (
    <div>
      <div
        onClick={() => setShowDropdown((d) => !d)}
        className="px-4 pt-2 pb-4 bg-violet-100 rounded-tl-md w-full rounded-tr-md border-b border-gray-700 justify-start items-center  inline-flex"
      >
        <div className="justify-start items-center gap-4 flex">
          <div className={`w-6 px-0.5 rounded-[100px] border  border-black justify-center items-center gap-2 flex  ${
          showDropdown ? "bg-red-500" : ""
        }`}>
            <div className="w-5 h-5 relative rounded-[100px]" />
          </div>
          <div className="justify-start items-start gap-3 flex">
            <FaFilePdf
              className="w-[50px] h-[40px] relative rounded-md"
              color="red"
            />
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-gray-700 text-sm font-medium leading-none">
                {document.name}{" "}
              </div>
              <div className="w-[81px] justify-start items-start inline-flex">
                <button
                  onClick={handlePrint}
                  className="grow shrink basis-0 h-4 justify-start items-start gap-2 flex"
                >
                  <div className="grow shrink basis-0 text-violet-700 text-sm font-normal leading-none">
                    View
                  </div>
                </button>
                <div className="grow shrink basis-0 text-violet-700 text-sm font-normal leading-none">
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 h-[17.35px] justify-between items-start gap-[26px] flex">
          <div className="w-[74.68px] origin-top-left -rotate-1 text-right text-gray-700 text-sm font-normal leading-none">
            {document.amount} xaf
          </div>
          <div className="w-[71.12px] origin-top-left -rotate-1 text-right text-gray-700 text-sm font-normal leading-none">
            x1 ({document.status})
          </div>
          <div className="w-[71.43px] origin-top-left -rotate-1 text-right text-gray-700 text-sm font-normal leading-none">
            {document.amount}xaf
          </div>
        </div>
      </div>
      {/* End of btn  */}

      {/* Start of Content */}

      <div
        className={`w-full py-5 pl-[54px] pb-4 justify-start items-center gap-[83px] inline-flex ${
          showDropdown ? "" : "hidden"
        }`}
      >
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch text-gray-700 text-base font-medium leading-[18px]">
            Specifications
          </div>
          <div className="self-stretch h-[242px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Copies
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.numberOfCopies}
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Pages
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.pages}
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Paper type
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.paperType}
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Paper Color
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.paperColor}
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Paper size
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.paperSize}
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Orientation
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.orientation}
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Print sides
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.printSides}{" "}
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Print color
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.printColor
                    ? "Print color"
                    : "Print Black and White"}
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Number of Pages
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.pages}
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Color
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {/* Blue */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-6 inline-flex">
          <div className="self-stretch h-32 flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch text-gray-700 text-base font-medium leading-[18px]">
              Layout
            </div>
            <div className="self-stretch h-[94px] flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-start gap-6 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[9px] inline-flex">
                  <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                    Pages per sheet
                  </div>
                  <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                    {document.pagesPerSheet}
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[9px] inline-flex">
                  <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                    Layout direction
                  </div>
                  <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                    {}
                  </div>
                </div>
              </div>
              {/* <div className="self-stretch h-[43px] flex-col justify-start items-start gap-[9px] flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Margin
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  1-3, 8, 11-13
                </div>
              </div> */}
            </div>
          </div>
          <div className="self-stretch h-[129px] flex-col justify-start items-start gap-[17px] flex">
            <div className="self-stretch text-gray-700 text-base font-medium leading-[18px]">
              Paper Handling
            </div>
            <div className="self-stretch h-[94px] flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-start gap-6 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[9px] inline-flex">
                  <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                    Print type
                  </div>
                  <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                    {document.printType}
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[9px] inline-flex">
                  <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                    Binding
                  </div>
                  <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                    {document.bindingType}
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[43px] flex-col justify-start items-start gap-[9px] flex">
                <div className="self-stretch text-gray-700 text-sm font-medium leading-[18px]">
                  Binding type
                </div>
                <div className="self-stretch text-zinc-500 text-sm font-normal leading-none">
                  {document.bindingType}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
