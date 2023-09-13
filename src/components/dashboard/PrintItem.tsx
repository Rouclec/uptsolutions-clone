import React from "react";
import { roboto } from "@/pages/_app";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDeleteDocument } from "@/hooks/document/useDocument";
import { toaster } from "../general/Toaster.component";
import { Command } from "@/types";
import moment from "moment";
import { Squares } from "react-activity";
import { useRouter } from "next/router";

type Props = {
  document: Command;
};

export default function PrintItem({ document }: Props) {
  const router = useRouter();
  const handleDelete = () => {
    const doc = {
      id: document?._id as string,
      name: document?.file
        ?.split("https://uptsolutions-assets.s3.amazonaws.com/")[1]
        .split("%20")
        .join(" ") as string,
    };
    mutate(doc);
  };
  const { mutate, isLoading } = useDeleteDocument(
    (data: any) => {
      console.log("delete successful: ", data);
    },
    () => {}
  );
  return (
    <tr className="border-b-[1px] hover:cursor-pointer bg-[var(--neutral-10)]">
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
              {document?.name}
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
        <p className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}>
          {moment(document?.createdAt).format("DD/MM/YYYY")}
        </p>
      </td>
      <td className="px-4 text-[var(--primary-100)] p-3">
        {document?.status === "printed" ? (
          <div className="p-[2px] rounded-full card-primary items-center justify-center flex truncate">
            Printed
          </div>
        ) : (
          <div className="p-[2px] rounded-full card-secondary items-center justify-center flex truncate">
            Pending
          </div>
        )}
      </td>
      <td className="px-4 p-3  rounded-r-lg">
        <div className="flex gap-20 items-center">
          <p
            className={`text-[var(--primary-500)] text-lg hover:cursor-pointer`}
            onClick={() =>
              router.push({
                pathname: `[id]`,
                query: {
                  id: document?.name,
                  docId: document?._id,
                },
              })
            }
          >
            Edit
          </p>

          {isLoading ? (
            <Squares size={12} speed={0.5} color="var(--primary-600)" />
          ) : (
            <HiOutlineTrash
              size={24}
              className="text-[var(--warning-600)]"
              onClick={handleDelete}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
