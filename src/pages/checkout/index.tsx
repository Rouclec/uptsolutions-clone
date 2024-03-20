import { ActionModal, Header, SideBar, toaster } from "@/components";
import React, { useEffect, useState } from "react";
import { roboto, roboto_slab } from "../_app";
import Image from "next/image";
import { useGetUserPendingDocuments } from "@/hooks/document/useDocument";
import { Command, User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import moment from "moment";
import { data } from "autoprefixer";
import { addCommas } from "@/utils/addCommas";
import { useInitPayment, useProcessPayment } from "@/hooks/payment/usePayment";
import { ModalType } from "@/components/general/ActionModal.component";
import { useCreateOrder } from "@/hooks/order/useOrder";

export const validatePhoneNumber = (phoneNumber: string) => {
  const mtnRegexp = new RegExp(/^6(((7|8)[0-9]{7}$)|(5[0-4][0-9]{6}$))/);
  const orangeRegexp = new RegExp(/^6(((9)[0-9]{7}$)|(5[5-9][0-9]{6}$))/);
  if (mtnRegexp.test(phoneNumber)) return "mtn";
  else if (orangeRegexp.test(phoneNumber)) return "orange";
  return "";
};

export default function Index() {
  const [showModal, setShowModal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingDocuments, setPendingDocuments] = useState() as any;
  const [selected, setSelected] = useState<Command[]>([]);
  const [provider, setProvider] = useState("");
  const [paid, setPaid] = useState(false);

  const session = useSession();

  const queryClient = useQueryClient();

  const user = session.data?.user as User;

  useEffect(() => {
    const originalData = queryClient.getQueryData([
      "documents",
      user?._id,
      "pending",
    ]) as any;
    originalData?.data?.data && setPendingDocuments(originalData?.data?.data);
  }, [queryClient, user?._id]);

  const handleSelect = (document: Command) => {
    const isSelected = selected.find(
      (item: Command) => item?._id === document?._id
    );
    if (!!isSelected) {
      setSelected(
        selected.filter((item: Command) => item?._id !== isSelected?._id)
      );
    } else {
      setSelected([...selected, document]);
    }
  };

  const payNow = async () => {
    if (phoneNumber) {
      const data = {
        external_ref: `Payment for print`,
        amount: Math.round(
          selected.reduce(function (prev: any, curr: any) {
            return prev * 1 + curr.amount * 1;
          }, 0) * 1
        ),
        phoneNumber: phoneNumber.startsWith("+237")
          ? phoneNumber
          : `+237${phoneNumber}`,
      };

      console.log({ data });
      mutate(data);
      setShowModal("init");
    }
  };

  const onError = (error: any) => {
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

  const onSuccess = (data: any) => {
    setPendingDocuments(data?.data?.data);
  };

  const onProcessPaymentSucess = (data: any) => {
    const { status } = data?.data?.data;
    console.log("payment data", { data });
    if (status === "FAILED") {
      setShowModal("canceled");
      setPaid(true);
    }
    if (status === "SUCCESSFUL") {
      setShowModal("success");
      setPaid(true);
      const order = {
        documents: selected.map((item: Command) => item?._id),
        user: user?._id as string,
        amount:
          selected.reduce(function (prev: any, curr: any) {
            return prev * 1 + curr.amount * 1;
          }, 0) * 1,
        method: provider === "orange" ? "orange-money" : "mtn-momo",
      };
      createOrder(order);
    }
  };

  const { isLoading } = useGetUserPendingDocuments(
    user?._id as string,
    onSuccess,
    onError
  );

  const { isLoading: isCreateOrderLoading, mutate: createOrder } =
    useCreateOrder(
      (data: any) => console.log("order created: ", data),
      onError
    );

  const {
    isLoading: isPaymentLoading,
    mutate,
    data: paymentInitData,
  } = useInitPayment(
    (data: any) => console.log("payment initiation data: ", data),
    onError
  );

  const { isLoading: isPaymentProcessing } = useProcessPayment(
    onProcessPaymentSucess,
    onError,
    paymentInitData?.data?.data?.reference,
    !!paymentInitData?.data?.data?.reference && !paid
  );
  return (
    <SideBar>
      <div>
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
          >
            Checkout
          </p>
        </Header>
        <div className="card p-8 mt-20 mb-10 grid">
          <div className="flex items-center justify-between py-2 border-b-2">
            <p
              className={`${roboto.className} font-bold text-xl md:text-3xl text-[var(--gray-800)]`}
            >
              Select Documents
            </p>
          </div>
          {pendingDocuments?.map((document: Command, index: number) => (
            <div className="grid gap-1 py-2 border-b-2" key={index}>
              <div className="flex items-center justify-between">
                <p
                  className={`${roboto.className} font-normal text-lg md:text-2xl text-[var(--gray-800)]`}
                >
                  {document?.name}
                </p>
                <input
                  type="checkbox"
                  className="text-[var(--primary-700)] rounded-full checked:bg-[var(--primary-700)]"
                  onChange={() => handleSelect(document)}
                />
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`${roboto.className} font-bold text-lg md:text-2xl text-[var(--gray-800)] truncate`}
                >
                  {`${addCommas(document?.amount)}XAF`}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`${roboto.className} font-normal text-sm md:text-lg text-[var(--gray-700)]`}
                >
                  {`${moment(document?.createdAt).format("MMMM, DD, YYYY")}`}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between py-2 border-b-2 mt-5">
            <p
              className={`${roboto.className} font-bold text-xl md:text-3xl text-[var(--gray-800)]`}
            >
              Order Summary
            </p>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2">
            <p
              className={`${roboto.className} font-normal text-ld md:text-2xl text-[var(--gray-800)]`}
            >
              {`${selected?.length || 0} x document${
                selected?.length > 1 ? "s" : ""
              }`}
            </p>
            <p
              className={`${roboto.className} font-bold text-lg md:text-2xl text-[var(--gray-800)] truncate`}
            >
              {`${addCommas(
                selected.reduce(function (prev: any, curr: any) {
                  return prev * 1 + curr.amount * 1;
                }, 0)
              )}XAF`}
            </p>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2">
            <p
              className={`${roboto.className} font-normal text-lg md:text-2xl text-[var(--gray-800)]`}
            >
              Tax & Services
            </p>
            <p
              className={`${roboto.className} font-bold text-lg md:text-2xl text-[var(--gray-800)] truncate`}
            >
              0 XAF
            </p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p
              className={`${roboto.className} font-extrabold text-2xl md:text-4xl text-[var(--primary-600)]`}
            >
              Total
            </p>
            <p
              className={`${roboto.className} font-bold text-lg md:text-2xl text-[var(--gray-800)] truncate`}
            >
              {`${addCommas(
                selected.reduce(function (prev: any, curr: any) {
                  return prev * 1 + curr.amount * 1;
                }, 0)
              )}XAF`}
            </p>
          </div>
        </div>
        <div className="card p-4 md:p-8 grid md:flex items-center gap-8">
          <div className="grid md:gap-8">
            <input
              className="w-80 border-2 rounded-lg p-4 text-lg md:text-2xl text-[var(--gray-800)]"
              placeholder="Enter your mobile money number"
              type="tel"
              onChange={(e) => {
                setPhoneNumber(e.target?.value);
                setProvider(validatePhoneNumber(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <Image
              src={
                provider === "orange"
                  ? "/assets/orange-money.png"
                  : "/assets/momo.png"
              }
              alt="mobile money"
              width={52}
              height={52}
            />

            <button
              className={`btn-primary ${
                !phoneNumber && "opacity-20 hover:cursor-not-allowed"
              }`}
              onClick={payNow}
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
      {showModal === "init" && (
        <ActionModal
          title="Payment initiated"
          subtitle="Your payment has been initiated, please confirm to proceed"
          // onConfirm={() => setShowModal(false)}
          // confirmText="OK"
        />
      )}
      {showModal === "success" && (
        <ActionModal
          title="Successfull!"
          subtitle="Your payment has been successfully confirmed"
          onConfirm={() => setShowModal("")}
          confirmText="OK"
          type={ModalType.SUCCESS}
        />
      )}
      {showModal === "canceled" && (
        <ActionModal
          title="Failed!"
          subtitle="The payment was unsuccessfull, please try again later"
          onConfirm={() => setShowModal("")}
          confirmText="OK"
          type={ModalType.ERROR}
        />
      )}
    </SideBar>
  );
}
