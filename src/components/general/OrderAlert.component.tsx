import { roboto } from "@/pages/_app";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";

type Props = {
  onClose: any;
  link?: string;
  message: string;
  viewTxt?: string;
};
const OrderAlert: React.FC<Props> = ({
  onClose,
  link,
  viewTxt,
  message,
}) => {
  return (
    <div className="w-full p-2 rounded-md flex items-center justify-between bg-[var(--primary-600)]">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hover:cursor-pointer card bg-[var(--primary-500)]">
          <HiOutlineSpeakerphone
            size={24}
            className="text-[var(--neutral-10)]"
          />
        </div>
        <p
          className={`${roboto.className} text-[var(--neutral-10)] font[500] text-xs md:text-md`}
        >
          {message}
        </p>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        {link && viewTxt && (
          <Link href={link}>
            <button className="btn-secondary">{viewTxt}</button>
          </Link>
        )}
        <div className="hover:cursor-pointer" onClick={onClose}>
          <AiOutlineClose size={24} className="text-[var(--neutral-10)]" />
        </div>
      </div>
    </div>
  );
};

export default OrderAlert;
