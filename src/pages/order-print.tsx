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
import { Header, SideBar } from "@/components";
import { HiOutlinePlus } from "react-icons/hi2";
import { roboto, roboto_slab } from "./_app";
// import FileUpload from "@/components/file/FileUpload";

export default function Create() {
  const [docName, setDocName] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState("");
  const [paperType, setPaperType] = useState("Normal");
  const [paperSize, setPaperSize] = useState("A4");
  const [orientation, setOrientation] = useState("Potrait");
  const [printSides, setprintSides] = useState("Recto");
  const [printColor, setPrintColor] = useState("");
  const [paperColor, setPaperColor] = useState("");
  const [pagesToPrint, setPagesToPrint] = useState("");
  const commandList = useSelector((state: RootState) => state.file).commands;
  // Layout properties
  const [pagesPerSheet, setPagesPerSheet] = useState("");
  const [layoutDirection, setLayoutDirection] = useState("");
  const [printType, setPrintType] = useState("Plain");
  const [biding, setBiding] = useState("No binding");
  const [bidingType, setBidingType] = useState("No binding");
  const [extraDetails, setExtraDetails] = useState("");
  const [filePath, setFilePath] = useState("");
  const [cost, setCost] = useState();
  // const [file, setFile] = useState("");
  const [saveState, setSaveState] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [numberOfPages, setNumberOfPages] = useState<number>();
  // Show file

  const [url, setUrl] = React.useState("");

  const session = useSession();

  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const [progress, setProgress] = useState(0);
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
    // console.log(`Total pages in the PDF: ${await totalPages.length}`);
    setNumberOfPages(totalPages);
  };

  const handleUpload: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!file) return;
    const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET as string;
    const params = {
      Bucket: BUCKET,
      Key: file?.name,
      Body: file,
    };
    console.log(params);
    try {
      const upload = s3.upload(params);
      setUpload(upload);
      upload.on("httpUploadProgress", (p) => {
        console.log(p.loaded / p.total);
        setProgress(p.loaded / p.total);
      });
      const result = await upload.promise();
      setFilePath(result?.Location);
      const doc = {
        name: docName,
        paperType,
        paperSize,
        orientation,
        printSides,
        color: printColor,
        pagesPerSheet,
        printingType: printType,
        bindingType: bidingType,
        description: extraDetails,
        file: filePath,
        createdBy: session?.data?.user?.name,
      };

      const res = await fetch("/api/document/upload", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(doc),
      });

      if (!res.ok) {
        throw new Error("Error placing command, try again");
      }
      const docResult = await res.json();

      console.log("doc result: ", docResult);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!upload) return;
    upload.abort();
    // progress.set(0);
    setProgress(0);
    setUpload(null);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const fileObj: Command = {
    docName,
    numberOfCopies,
    paperType,
    paperSize,
    orientation,
    printSides,
    printColor,
    paperColor,
    pagesPerSheet,
    printType,
    biding,
    bidingType,
    extraDetails,
    cost,
  };
  const addFile = () => {
    dispatch(addfile(fileObj));
    setSaveState(true);
  };
  const handlePrint = () => {
    router.push("/checkout");
    console.log("print commant: ", {
      name: docName,
      paperType,
      paperSize,
      orientation,
      printSides,
      paperColor,
      pagesPerSheet,
      printingType: printType,
      bindingType: bidingType,
      description: extraDetails,
      file: filePath,
      createdBy: session?.data?.user?.name,
    });
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
          <div className="container w-full py-5 flex justify-end">
            <button
              onClick={addFile}
              className={`btn-primary flex gap-2 text-lg`}
            >
              <HiOutlinePlus />
              <p className={`${roboto.className} font-normal`}>Add document</p>
            </button>
          </div>
        </Header>
        <div className="container mx-auto mt-32 gap-1  md:p-2">
          <div className="flex">
            <div className="w-full">
              <div className=" py-5 lg:rounded md:flex gap-4 ">
                <div className="mb-4 md:w-2/3 rounded-lg pt-6 pb-8">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="md:flex mb-4 md:mb-0 w-full gap-2">
                      <div className="w-full">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                          File Name
                        </label>
                        <input
                          className="border  w-full p-2 rounded-md"
                          type="text"
                          placeholder="Enter Document name"
                          onChange={(e) => setDocName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md">
                    <div className="md:flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Number of Copies
                      </label>
                      <input
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                        type="number"
                        onChange={(e: any) => setNumberOfCopies(e.target.value)}
                      />
                    </div>
                    <div className="md:flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Pages{" "}
                      </label>
                      <select className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2">
                        <option value="All">All</option>
                        <option value="Some Pages">Some Pages</option>
                      </select>
                    </div>
                    <div className="md:flex justify-between my-3 py-2">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Paper Type
                      </label>
                      <select
                        onChange={(e: any) => setPaperType(e.target.value)}
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Hard page">Hard Page</option>
                      </select>
                    </div>
                    <div className="md:flex justify-between border-b-2 border-gray-300 my-3 py-2">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Paper color
                      </label>
                      <select
                        onChange={(e: any) => setPaperColor(e.target.value)}
                        className="my-auto bg-gray-50 border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="white">white</option>
                        <option value="Green">Green</option>
                        <option value="Red">Red</option>
                        <option value="Pink">Pink</option>
                      </select>
                    </div>

                    <div className="md:flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
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

                    <div className="md:flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Orientation
                      </label>
                      <div className="md:flex flex-row justify-between">
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
                          <span className="ml-2 pr-3">Landscape</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Potrait"
                            onChange={(e: any) =>
                              setOrientation(e.target.value)
                            }
                            name="orientation"
                          />
                          <span className="ml-2">Potrait</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
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
                          />
                          <span className="ml-2 pr-3">Recto</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            name="printSides"
                            value="Recto Veso"
                            onChange={(e) => setprintSides(e.target.value)}
                          />
                          <span className="ml-2">Recto Veso</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
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
                          <span className="ml-2 pr-3">Color</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="black-and-white"
                            name="printColor"
                            onChange={(e) => setPrintColor("false")}
                          />
                          <span className="ml-2">Black & White</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <h3>Layout</h3>
                  <div className="bg-white rounded-md p-4 my-2">
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
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
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Layout Direction
                      </label>
                      <select className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2">
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A5">A5</option>
                      </select>
                    </div>
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Margin
                      </label>
                      <select className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2">
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A5">A5</option>
                      </select>
                    </div>
                  </div>

                  <h3>Paper Handling</h3>
                  <div className="bg-white rounded-md p-4 my-2">
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
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
                          <span className="ml-2 pr-3">Booklet</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Plain"
                            name="printColor"
                            // checked={value === 'false'}
                            onChange={(e) => setPrintType(e.target.value)}
                          />
                          <span className="ml-2">Plain</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Binding
                      </label>
                      <div className="flex flex-row justify-between">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="Yes"
                            name="binding"
                            // checked={value === 'true'}
                            onChange={(e) => setBiding(e.target.value)}
                          />
                          <span className="ml-2 pr-3">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            value="false"
                            name="binding"
                            onChange={(e) => setBiding(e.target.value)}
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between my-3 border-b-2 py-2 border-gray-300">
                      <label className="text-gray-700 text-lg font-medium leading-normal">
                        Binding Type
                      </label>
                      <select
                        onClick={(e: any) => setBidingType(e.target.value)}
                        className="my-auto bg-gray-50 border border-gray-300 px-2 rounded-md py-2"
                      >
                        <option value="No binding">No binding</option>
                        <option value="Spiral">Spiral</option>
                        <option value="Pin">Pin</option>
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
                    ></textarea>
                  </div>
                </div>
                <div className="mb-4 md:w-1/3 rounded-lg pt-6 pb-8">
                  <br />
                  <div className="bg-white overflow-y-scroll  w-full h-[300px] rounded-md">
                    <div>
                      {url ? (
                        <div>{/* <FileUpload url={url} /> */}</div>
                      ) : (
                        <div className="">
                          <div className="flex items-center justify-center w-full">
                            <label
                              // for="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between px-3">
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
                            Bio Paper2{" "}
                          </div>
                        </div>
                        <div className="self-stretch justify-between items-center  inline-flex md:block lg:inline-flex">
                          <div className="text-gray-700 text-base font-medium leading-normal">
                            Uploaded date
                          </div>
                          <div className="text-gray-700 text-base font-normal leading-normal">
                            13/06/2023
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
                            2500frs
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-between items-start gap-6 inline-flex">
                        <button className="btn-tetiary">Move to Trash</button>
                        <button onClick={handlePrint} className="btn-primary">
                          <div className="text-white text-sm font-medium leading-tight">
                            Proceed To Pay
                          </div>
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
