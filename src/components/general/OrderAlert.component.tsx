import { roboto } from "@/pages/_app";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";

type Props = {
  onClose: any;
  onView: any;
  number: number;
};
const OrderAlert: React.FC<Props> = ({ onClose, onView, number }) => {
  return (
    <div className="w-full p-2 rounded-md flex items-center justify-between bg-[var(--primary-600)]">
      <div className="flex items-center gap-4">
        <div className="hover:cursor-pointer card bg-[var(--primary-500)]">
          <HiOutlineSpeakerphone
            size={24}
            className="text-[var(--neutral-10)]"
          />
        </div>
        <p
          className={`${roboto.className} text-[var(--neutral-10)] font[500] text-lg`}
        >
          {`You have ${number} new order${number > 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn-secondary py-1" onClick={onView}>
          {`View order${number > 1 ? "s" : ""}`}
        </button>
        <div className="hover:cursor-pointer" onClick={onClose}>
          <AiOutlineClose size={24} className="text-[var(--neutral-10)]" />
        </div>
      </div>
    </div>
  );
};

export default OrderAlert;
