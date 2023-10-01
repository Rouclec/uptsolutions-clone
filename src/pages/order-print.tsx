import { User } from "@/types";
import { PDFDocument } from "pdf-lib";
import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";
import { S3 } from "aws-sdk";
import { Header, OrderAlert, SideBar, toaster } from "@/components";
import { HiOutlinePlus } from "react-icons/hi2";
import { roboto, roboto_slab } from "./_app";
import FileUpload from "@/components/orderprint/FileUpload";
import {
  useGetUserPendingDocuments,
  useUploadDocument,
} from "@/hooks/document/useDocument";
import { useQueryClient } from "@tanstack/react-query";
import { Squares } from "react-activity";
import Link from "next/link";
import moment from "moment";
import { addCommas } from "@/utils/addCommas";

export default function Create() {
  const [docName, setDocName] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [coverPage, setCoverPage] = useState("Normal");
  const [paperType, setPaperType] = useState("Normal");
  const [paperSize, setPaperSize] = useState("A4");
  const [orientation, setOrientation] = useState("Potrait");
  const [printSides, setprintSides] = useState("Recto");
  const [printColor, setPrintColor] = useState("false");
  const [paperColor, setPaperColor] = useState("");
  const [pagesToPrint, setPagesToPrint] = useState("All");
  const [showPagesInput, setShowPagesInput] = useState(false);
  // Layout properties
  const [pagesPerSheet, setPagesPerSheet] = useState("1");
  const [printType, setPrintType] = useState("Plain");
  const [bidingType, setBidingType] = useState("No binding");
  const [extraDetails, setExtraDetails] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const [showAlert, setShowAlert] = useState(true);
  const [progress, setProgress] = useState(0);
  const [pageExceeded, setPageExceeded] = useState(false);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  // Show file

  const [url, setUrl] = React.useState("");

  const session = useSession();

  const queryClient = useQueryClient();

  const user = session.data?.user as User;

  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_TOKEN,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  });

  useEffect(() => {
    setProgress(0);
    setUpload(null);
  }, [file]);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    setFile(e?.target?.files![0]);
    const files: any = e?.target?.files;
    files?.length > 0 && setUrl(URL.createObjectURL(files[0]));

    // Get Number of pages in uploaded file
    const arrayBuffer = await e.target.files![0].arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPages().length;
    setMaxPage(totalPages);
    if (pagesToPrint == "All") {
      setNumberOfPages(totalPages);
    }
  };

  const handlePages = (e: any) => {
    if (e.target.value == "Some Pages") {
      setShowPagesInput(true);
    } else {
      setPagesToPrint(e.target.value);
      setShowPagesInput(false);
    }
  };

  function calculateIndividualPages() {
    const pageRanges = pagesToPrint.split(",");
    // setPageExceeded(false);

    let individualPages = [];
    for (let i = 0; i < pageRanges.length; i++) {
      const range = pageRanges[i].split("-");
      const start = parseInt(range[0]);
      const end = range[1] ? parseInt(range[1]) : start;
      for (let j = start; j <= end; j++) {
        individualPages.push(j);
        if (j > maxPage) {
          setPageExceeded(true);
        } else {
          setNumberOfPages(individualPages.length);
          setPageExceeded(false);
        }
      }
    }
  }

  useEffect(() => {
    if (pagesToPrint !== "All") {
      calculateIndividualPages();
    }
  }, [pagesToPrint]);

  const handleUpload: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET as string;
    const params = {
      Bucket: BUCKET,
      Key: file?.name,
      Body: file,
    };
    try {
      const upload = s3.upload(params);
      setUpload(upload);
      upload.on("httpUploadProgress", (p) => {
        console.log(p.loaded / p.total);
        setProgress(p.loaded / p.total);
      });
      const result = await upload.promise();
      const doc = {
        name: docName,
        pages: pagesToPrint,
        coverPage,
        paperType,
        paperSize,
        orientation,
        printSides,
        color: printColor,
        pagesPerSheet,
        amount: cost,
        printingType: printType,
        bindingType: bidingType,
        description: extraDetails,
        file: result.Location,
        createdBy: user?._id,
      };
      mutate(doc);

      setDocName("");
      setUrl("");
      setNumberOfCopies(1);
      setExtraDetails("");
    } catch (err) {
      console.error(err);
    }
  };

  const onError = (error: any) => {
    setLoading(false);
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

  const calculateAmount = useMemo(() => {
    let unitPrice = 0;
    let bindingCost = 0;
    let numberOfSheets =
      printSides === "Recto"
        ? Math.ceil(numberOfPages / parseInt(pagesPerSheet))
        : Math.ceil(Math.ceil(numberOfPages / 2) / parseInt(pagesPerSheet));
    if (numberOfSheets < 5) {
      unitPrice = printColor === "true" ? 100 : 50;
      bindingCost =
        bidingType === "Spiral"
          ? 500
          : bidingType === "Slide binding"
          ? 450
          : bidingType === "Normal gum"
          ? 2000
          : bidingType === "Hard gum"
          ? 5000
          : 0;
    } else if (numberOfSheets < 25) {
      unitPrice = printColor === "true" ? 100 : 25;
      bindingCost =
        bidingType === "Spiral"
          ? 500
          : bidingType === "Slide binding"
          ? 500
          : bidingType === "Normal gum"
          ? 2000
          : bidingType === "Hard gum"
          ? 5000
          : 0;
    } else if (numberOfSheets < 70) {
      unitPrice = printColor === "true" ? 100 : 20;
      bindingCost =
        bidingType === "Spiral"
          ? 600
          : bidingType === "Slide binding"
          ? 550
          : bidingType === "Normal gum"
          ? 2000
          : bidingType === "Hard gum"
          ? 5000
          : 0;
    } else if (numberOfSheets < 100) {
      unitPrice = printColor === "true" ? 100 : 20;
      bindingCost =
        bidingType === "Spiral"
          ? 700
          : bidingType === "Slide binding"
          ? 650
          : bidingType === "Normal gum"
          ? 2000
          : bidingType === "Hard gum"
          ? 5000
          : 0;
    } else {
      unitPrice = printColor === "true" ? 100 : 20;
      bindingCost =
        bidingType === "Spiral"
          ? 750
          : bidingType === "Slide binding"
          ? 650
          : bidingType === "Normal gum"
          ? 2000
          : bidingType === "Hard gum"
          ? 5000
          : 0;
    }

    bindingCost =
      coverPage === "Normal" && bindingCost > 0
        ? bindingCost - 150
        : bindingCost;

    return (numberOfSheets * unitPrice + bindingCost) * numberOfCopies;
  }, [
    printSides,
    numberOfPages,
    pagesPerSheet,
    numberOfCopies,
    printColor,
    bidingType,
    coverPage,
  ]);

  useEffect(() => {
    const amount = calculateAmount;
    setCost(amount);
  }, [calculateAmount]);

  const onSuccess = (data: any) => {
    setLoading(false);
    console.log("data uploaded: ", data);

    const oldQueryData = queryClient.getQueryData([
      "documents",
      user?._id,
      "pending",
    ]);

    oldQueryData
      ? queryClient.setQueryData(
          ["documents", user?._id, "pending"],
          (oldQueryData: any) => {
            return {
              ...oldQueryData,
              data: {
                ...oldQueryData?.data,
                data: [data?.data?.data, ...oldQueryData?.data?.data],
              },
            };
          }
        )
      : queryClient.setQueryData(
          ["documents", user?._id, "pending"],
          () => data
        );
    //TODO: clear input fields
  };

  const { mutate } = useUploadDocument(onSuccess, onError);
  const { isLoading: isGetLoading, data: pendingDocuments } =
    useGetUserPendingDocuments(user?._id as string, () => {}, onError);

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!upload) return;
    () => {};
    upload.abort();
    setProgress(0);
    setUpload(null);
  };
  const router = useRouter();
  const handleProceed: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (docName && file) {
      if (!file) return;
      setLoading(true);
      const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET as string;
      const params = {
        Bucket: BUCKET,
        Key: file?.name,
        Body: file,
      };
      try {
        const upload = s3.upload(params);
        setUpload(upload);
        upload.on("httpUploadProgress", (p) => {
          console.log(p.loaded / p.total);
          setProgress(p.loaded / p.total);
        });
        const result = await upload.promise();
        const doc = {
          name: docName,
          pages: pagesToPrint,
          coverPage,
          paperSize,
          orientation,
          printSides,
          color: printColor,
          pagesPerSheet,
          amount: cost,
          printingType: printType,
          bindingType: bidingType,
          description: extraDetails,
          file: result.Location,
          createdBy: user?._id,
        };
        mutate(doc);
      } catch (err) {
        console.error(err);
      }
      router.push("/checkout");
    }
  };
  return (
    <SideBar>
      <div>
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
          >
            Order Print
          </p>
          {pendingDocuments?.data?.data?.length > 0 && showAlert && (
            <OrderAlert
              onClose={() => setShowAlert(false)}
              viewTxt="Proceed to pay"
              link="/checkout"
              showBtn={true}
              message={`You have ${pendingDocuments?.data?.data?.length} file${
                pendingDocuments?.data?.data?.length > 1 ? "s" : ""
              } pending payment`}
            />
          )}
          <div className="container w-full py-5 flex justify-end">
            <button
              onClick={handleUpload}
              className={`btn-primary flex gap-2 text-lg ${
                loading && "opacity-20"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <p className="text-center">Please wait</p>
                  <Squares
                    size={16}
                    color={"var(--primary-300)"}
                    speed={0.6}
                    className="self-center"
                  />
                </>
              ) : (
                <>
                  <HiOutlinePlus />
                  <p className={`${roboto.className} font-normal`}>
                    Add document
                  </p>
                </>
              )}
            </button>
          </div>
        </Header>
        <div
          className={`container mx-auto ${
            showAlert && pendingDocuments?.data?.data?.length > 0
              ? "mt-52 md:mt-48"
              : "mt-36 md:mt-40"
          } md:mt-20 gap-1  md:p-2`}
        >
          <div className="flex">
            <div className="w-full">
              <div className=" py-5 lg:rounded md:flex gap-4 ">
                <div className="mb-4 md:w-2/3 rounded pt-6 pb-8">
                  <div className="mb-4 flex md:justify-between">
                    <div className="flex mb-4 md:mb-0 w-full gap-2">
                      <div className="w-full">
                        <label
                          className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                        >
                          File Name
                        </label>
                        <input
                          className="border  w-full p-2 rounded-md"
                          type="text"
                          value={docName}
                          placeholder="Enter Document name"
                          onChange={(e) => setDocName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md">
                    <div className=" flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Number of Copies
                      </label>
                      <input
                        className="my-auto bg-gray-50 border w-[80px] border-gray-300 px-2 rounded-md py-2"
                        type="number"
                        min={1}
                        value={numberOfCopies}
                        onChange={(e: any) => setNumberOfCopies(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Pages
                      </label>
                      <div className="my-auto">
                        <select
                          onChange={(e) => handlePages(e)}
                          className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2 w-full"
                        >
                          <option value="All">All</option>
                          <option value="Some Pages">Some Pages</option>
                        </select>
                        <br />
                        {showPagesInput ? (
                          <div>
                            {" "}
                            {file ? (
                              <div>
                                <input
                                  type="text"
                                  placeholder="Enter pages"
                                  onChange={(e: any) =>
                                    setPagesToPrint(e.target.value)
                                  }
                                  className="my-2 bg-gray-50 border w-full my-1 border-gray-300 px-2 rounded-md py-2"
                                />
                                {pageExceeded ? (
                                  <p className="text-red-400">
                                    This document ends at page {maxPage}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                            ) : (
                              <h3 className="text-red-400">Upload you document first</h3>
                            )}
                            <p>e.g. 1-3, 8, 11-13</p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between my-3 py-2 border-b-2">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Paper type
                      </label>
                      <select
                        onChange={(e: any) => setPaperType(e.target.value)}
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="Normal" selected>
                          Normal
                        </option>
                        <option value="Hard">Hard</option>
                        <option value="Glossy">Glossy</option>
                      </select>
                    </div>
                    <div className="flex justify-between my-3 py-2 border-b-2">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Cover page
                      </label>
                      <select
                        onChange={(e: any) => setCoverPage(e.target.value)}
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Hard page">Hard Page</option>
                      </select>
                    </div>
                    <div className="flex justify-between border-b-2 border-gray-300 my-3 py-2">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Paper color
                      </label>
                      <select
                        onChange={(e: any) => setPaperColor(e.target.value)}
                        className="my-auto bg-gray-50 border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="white">white</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Cream White">Cream White</option>
                      </select>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Paper Size
                      </label>
                      <select
                        onChange={(e) => setPaperSize(e.target.value)}
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A5">A5</option>
                      </select>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Orientation
                      </label>
                      <div className="flex flex-row justify-between">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Landscape"
                            name="orientation"
                            onChange={(e: any) =>
                              setOrientation(e.target.value)
                            }
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Landscape
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Potrait"
                            defaultChecked={true}
                            onChange={(e: any) =>
                              setOrientation(e.target.value)
                            }
                            name="orientation"
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Potrait
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Print Sides
                      </label>
                      <div className="flex flex-row justify-between">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Recto"
                            name="printSides"
                            onChange={(e) => setprintSides(e.target.value)}
                            defaultChecked={true}
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Recto Recto
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            name="printSides"
                            value="Recto Veso"
                            onChange={(e) => setprintSides(e.target.value)}
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Recto Veso
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Print Color
                      </label>
                      <div className="flex flex-row justify-between">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            name="printColor"
                            value="color"
                            onChange={(e) => setPrintColor("true")}
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Color
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="black-and-white"
                            name="printColor"
                            defaultChecked={true}
                            onChange={(e) => setPrintColor("false")}
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Black & White
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <h3
                    className={`text-gray-700 ${roboto_slab.className} font-semibold my-3`}
                  >
                    Layout
                  </h3>
                  <div className="bg-white rounded-md p-4 my-2">
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Pages per sheet
                      </label>
                      <select
                        onChange={(e) =>
                          // setPagesPerSheet(parseInt(e.target.value, 10))
                          setPagesPerSheet(e.target.value)
                        }
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Layout Direction
                      </label>
                      <select className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2">
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A5">A5</option>
                      </select>
                    </div>
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Margin
                      </label>
                      <select className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2">
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A5">A5</option>
                      </select>
                    </div>
                  </div>

                  <h3
                    className={`text-gray-700 ${roboto_slab.className} font-semibold my-3`}
                  >
                    Paper Handling
                  </h3>
                  <div className="bg-white rounded-md p-4 my-2">
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Printing Type
                      </label>
                      <div className="flex flex-row justify-between">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Booklet"
                            name="printColor"
                            // checked={value === 'true'}
                            onChange={(e) => setPrintType(e.target.value)}
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Booklet
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Plain"
                            name="printColor"
                            defaultChecked={true}
                            onChange={(e) => setPrintType(e.target.value)}
                          />
                          <span
                            className={`text-gray-700 ${roboto_slab.className} font-semibold px-2`}
                          >
                            Plain
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label
                        className={`text-gray-700 ${roboto_slab.className} font-semibold`}
                      >
                        Binding Type
                      </label>
                      <select
                        onClick={(e: any) => setBidingType(e.target.value)}
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="No binding">No binding</option>
                        <option value="Spiral">Spiral</option>
                        <option value="Slide binding">Slide binding</option>
                        <option value="Normal gum">Normal gum</option>
                        <option value="Hard gum">Hard gum</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Add Additional details
                    </label>
                    <p></p>
                    <textarea
                      cols={30}
                      rows={4}
                      placeholder="Explain any other additional printing information here... (please be detailed as posible)"
                      onChange={(e) => setExtraDetails(e.target.value)}
                      className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                    >
                      {extraDetails}
                    </textarea>
                  </div>
                </div>
                <div className="mb-4 md:w-1/3 rounded-lg pt-6 pb-8">
                  <br />
                  <div className="w-full h-[450px] rounded-md">
                    <div>
                      {url ? (
                        <div className="rounded-md">
                          <FileUpload url={url} />{" "}
                        </div>
                      ) : (
                        <div className="h-full">
                          <div className="flex items-center justify-center w-full">
                            <label
                              // for="dropzone-file"
                              className=" w-full  border-2 h-40 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                              <div className="flex flex-col py-40 bg-white rounded-md items-center justify-center ">
                                <svg
                                  className="w-8 h-8  mb-4 text-gray-500"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF DOCUMENTS ONLY
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex mt-20 justify-between px-3">
                    <button
                      className="my-3 hover:text-blue-500"
                      onClick={handleUpload}
                    >
                      Replace file
                    </button>
                    <button my-3>
                      <BiTrash color="red" />
                    </button>
                  </div>

                  <div className="w-full h-auto p-6 bg-white rounded-md flex-col justify-start items-start gap-4 inline-flex">
                    <div className="self-stretch pb-2 border-b border-neutral-200 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-6 justify-end items-start gap-2 flex">
                        <div className="grow shrink basis-0 text-gray-700 text-xl font-medium leading-normal">
                          Summary
                        </div>
                      </div>
                      <div className="w-5 h-5 relative" />
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                      <div className="self-stretch flex-col justify-start items-start gap-[18px] flex">
                        <div className="self-stretch justify-between items-center inline-flex md:block lg:inline-flex">
                          <div className="text-gray-700 text-base font-medium leading-normal">
                            Document name
                          </div>
                          <div className="text-gray-700 text-base font-normal leading-normal">
                            {docName || ""}
                          </div>
                        </div>
                        <div className="self-stretch justify-between items-center  inline-flex md:block lg:inline-flex">
                          <div className="text-gray-700 text-base font-medium leading-normal">
                            Uploaded date
                          </div>
                          <div className="text-gray-700 text-base font-normal leading-normal">
                            {moment().format("DD/MM/YYY")}
                          </div>
                        </div>
                        <div className="self-stretch justify-between items-center  inline-flex md:block lg:inline-flex">
                          <div className=" text-gray-700 text-base font-medium leading-normal">
                            Total pages
                          </div>
                          <div className="text-gray-700 text-base font-normal leading-normal">
                            {numberOfPages ? numberOfPages : "-"}
                          </div>
                        </div>
                        <div className="self-stretch pb-2 border-b border-neutral-200 justify-between items-center  inline-flex">
                          <div className="w-[84px] text-gray-700 text-base font-medium leading-normal">
                            Total Cost
                          </div>
                          <div className="text-gray-700 text-base font-normal leading-normal">
                            {`${addCommas(cost)}frs`}
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-between items-start gap-6 inline-flex">
                        <button className="btn-tetiary">Move to Trash</button>
                        <button
                          className={`btn-primary ${loading && "opacity-20"}`}
                          onClick={handleProceed}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <p className="text-center text-sm">Please wait</p>
                              <Squares
                                size={12}
                                color={"var(--primary-300)"}
                                speed={0.6}
                                className="self-center"
                              />
                            </>
                          ) : (
                            <div className="text-white text-sm font-medium leading-tight">
                              Proceed to pay
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
