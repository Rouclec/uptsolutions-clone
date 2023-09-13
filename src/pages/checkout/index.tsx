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

export const validatePhoneNumber = (phoneNumber: string) => {
  const mtnRegexp = new RegExp(/^6(((7|8)[0-9]{7}$)|(5[0-4][0-9]{6}$))/);
  const orangeRegexp = new RegExp(/^6(((9)[0-9]{7}$)|(5[5-9][0-9]{6}$))/);
  if (mtnRegexp.test(phoneNumber)) return "mtn";
  else if (orangeRegexp.test(phoneNumber)) return "orange";
  return "";
};

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingDocuments, setPendingDocuments] = useState() as any;
  const [provider, setProvider] = useState("");

  const session = useSession();

  const queryClient = useQueryClient();

  const user = session.data?.user as User;

  useEffect(() => {
    const originalData = queryClient.getQueryData([
      "documents",
      user?._id,
      "pending",
    ]) as any;
    console.log({ originalData });
    originalData?.data?.data && setPendingDocuments(originalData?.data?.data);
  }, [queryClient, user?._id]);

  const payNow = async () => {
    if (phoneNumber) {
      setShowModal(true);
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
    console.log("successfully fetched: ", data);
    setPendingDocuments(data?.data?.data);
  };

  const { isLoading } = useGetUserPendingDocuments(
    user?._id as string,
    onSuccess,
    onError,
    !!pendingDocuments
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
                />
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`${roboto.className} font-bold text-lg md:text-2xl text-[var(--gray-800)] truncate`}
                >
                  10,000 XAF
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`${roboto.className} font-normal text-sm md:text-lg text-[var(--gray-700)]`}
                >
                  {`10 pages - ${moment(document?.createdAt).format(
                    "MMMM, DD, YYYY"
                  )}`}
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
              {`${pendingDocuments?.length || 0} x documents`}
            </p>
            <p
              className={`${roboto.className} font-bold text-lg md:text-2xl text-[var(--gray-800)] truncate`}
            >
              10,000 XAF
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
              10,000 XAF
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
              20,000 XAF
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
      {showModal && (
        <ActionModal
          title="Payment initiated"
          subtitle="Your payment has been initiated, please confirm to proceed"
          onConfirm={() => setShowModal(false)}
          confirmText="OK"
        />
      )}
    </SideBar>
  );
}
