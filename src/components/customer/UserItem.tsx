import React from "react";
import { roboto } from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi2";
export default function UserItem() {
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
              Suh Denis
            </p>
            <p
              className={`text-[var(--gray-500)] font-normal ${roboto.className}`}
            >
              suhdennis@gmail.com
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 text p-3 ">
        <div className="grid gap-1">
          <p
            className={`text-[var(--gray-800)] font-normal ${roboto.className}`}
          >
            06/07/2023
          </p>
        </div>
      </td>
      <td className="px-4 text-[var(--gray-700)] font-light p-3 ">
        <p className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}>
          40{" "}
        </p>
      </td>
      <td className="px-4 text-[var(--primary-100)] p-3">
        <p className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}>
          Molyko
        </p>
      </td>
      <td className="px-4 text-[var(--gray-700)] font-light p-3 ">
        <p className={`text-[var(--gray-900)] font-[500] ${roboto.className}`}>
          676814364
        </p>
      </td>
      <td className="px-4 p-3  rounded-r-lg">
        <div className="flex gap-20 items-center">
          <Link
            href="/order/xxId"
            className={`text-[var(--primary-500)] text-lg`}
          >
            Message
          </Link>
          <HiOutlineTrash size={24} className="text-[var(--warning-600)]" />
        </div>
      </td>
    </tr>
  );
}
