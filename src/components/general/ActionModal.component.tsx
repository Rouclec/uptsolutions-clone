import { roboto, roboto_slab } from "@/pages/_app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Digital, Sentry, Squares } from "react-activity";
import "react-activity/dist/library.css";

type Props = {
  title: string;
  subtitle: string;
  onCancel?: () => void;
  onConfirm?: any;
  cancelText?: string;
  confirmText?: string;
  type?: ModalType;
};

export enum ModalType {
  ACTION = "action",
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
}
const ActionModal: React.FC<Props> = ({
  title,
  subtitle,
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Yes",
  type = ModalType.LOADING,
}) => {
  const router = useRouter();
  return (
    <div className="modal">
      <div className="bg-[var(--neutral-10)] rounded-lg p-4 grid w-[80vw] max-w-[500px] max-h-fit">
        <div className="p-4 items-center justify-center border-b-2">
          <p
            className={`text-center text-[var(--gray-800)] text-xl md:text-2xl font-bold ${roboto_slab.className}`}
          >
            {title}
          </p>
        </div>
        <div className="grid gap-2 md:gap-4 items-center justify-center border-b-2 p-4">
          {type === ModalType.LOADING ? (
            <Squares
              size={56}
              color={"var(--primary-600)"}
              speed={0.6}
              className="self-center mx-auto"
            />
          ) : type === ModalType.ERROR ? (
            <Image
              src={"/assets/cancel.png"}
              alt="canceled"
              width={64}
              height={64}
              className="mx-auto"
            />
          ) : (
            <Image
              src={"/assets/success.png"}
              alt="success"
              width={64}
              height={64}
              className="mx-auto"
            />
          )}
          <p
            className={`${roboto.className} text-[var(--gray-700)] font-normal text-lg md:text-xl text-center`}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex gap-2 md:gap-4 items-center justify-center p-4">
          {confirmText && onConfirm && (
            <button className="btn-primary" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
          {cancelText && onCancel && (
            <button className="btn-secondary" onClick={onCancel}>
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
