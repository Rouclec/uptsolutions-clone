import React from "react";
import { roboto } from "@/pages/_app";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";

type Props = {
  document: any;
  handleSelect: any;
  isChecked: boolean;
};
export default function OrderItem({
  document,
  handleSelect,
  isChecked,
}: Props) {
  const router = useRouter();

  return (
    <tr className="border-b-[1px] hover:cursor-pointer bg-[var(--neutral-10)]">
      <td className="px-4 text-[var(--gray-700)] font-semibold p-3  rounded-l-lg text-center">
        <input type="checkbox" onChange={handleSelect} checked={!!isChecked} />
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
              {document?.user?.fullName}
            </p>
            <p
              className={`text-[var(--gray-500)] font-normal ${roboto.className}`}
            >
              {document?.user?.email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 text p-3 ">
        <div className="grid gap-1">
          <p
            className={`text-[var(--gray-800)] font-normal ${roboto.className}`}
          >
            {document?.documents[0]?.name}
          </p>
      
        </div>
      </td>
      <td className="px-4 text-[var(--gray-700)] font-light p-3 ">
        <p className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}>
          {moment(document?.createdAt).format("DD/MM/YYYY")}
        </p>
      </td>
      <td className="px-4 text-[var(--primary-100)] p-3">
        {document?.status === "completed" ? (
          <div className="p-[2px] rounded-full card-primary items-center justify-center flex truncate">
            Completed
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
                pathname: `order/${document?.id}`,
                query: {
                  id: document?.id,
                  docId: document?._id,
                },
              })
            }
          >
            View{" "}
          </p>
          {/* <HiOutlineTrash size={24} className="text-[var(--warning-600)]" /> */}
        </div>
      </td>
    </tr>
  );
}
