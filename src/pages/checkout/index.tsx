import { Header, SideBar } from "@/components";
import React from "react";
import { roboto, roboto_slab } from "../_app";
import Image from "next/image";

export default function index() {
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
              className={`${roboto.className} font-bold text-3xl text-[var(--gray-800)]`}
            >
              Select Documents
            </p>
          </div>
          {Array(4)
            .fill("a")
            .map((_, index) => (
              <div className="grid gap-1 py-2 border-b-2" key={index}>
                <div className="flex items-center justify-between">
                  <p
                    className={`${roboto.className} font-normal text-2xl text-[var(--gray-800)]`}
                  >
                    Doc name
                  </p>
                  <input
                    type="checkbox"
                    className="text-[var(--primary-700)] rounded-full checked:bg-[var(--primary-700)]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p
                    className={`${roboto.className} font-bold text-2xl text-[var(--gray-800)]`}
                  >
                    10,000 XAF
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p
                    className={`${roboto.className} font-normal text-lg text-[var(--gray-700)]`}
                  >
                    10 pages | August 23rd, 2023
                  </p>
                </div>
              </div>
            ))}
          <div className="flex items-center justify-between py-2 border-b-2 mt-5">
            <p
              className={`${roboto.className} font-bold text-3xl text-[var(--gray-800)]`}
            >
              Order Summary
            </p>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2">
            <p
              className={`${roboto.className} font-normal text-2xl text-[var(--gray-800)]`}
            >
              2 x documents
            </p>
            <p
              className={`${roboto.className} font-bold text-2xl text-[var(--gray-800)]`}
            >
              10,000 XAF
            </p>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2">
            <p
              className={`${roboto.className} font-normal text-2xl text-[var(--gray-800)]`}
            >
              Tax & Services
            </p>
            <p
              className={`${roboto.className} font-bold text-2xl text-[var(--gray-800)]`}
            >
              10,000 XAF
            </p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p
              className={`${roboto.className} font-extrabold text-4xl text-[var(--primary-600)]`}
            >
              Total
            </p>
            <p
              className={`${roboto.className} font-bold text-2xl text-[var(--gray-800)]`}
            >
              20,000 XAF
            </p>
          </div>
        </div>
        <div className="card p-4 md:p-8 grid md:flex items-center gap-8">
          <div className="grid md:gap-8">
            <input
              className="w-80 border-2 rounded-lg p-4 text-2xl text-[var(--gray-800)]"
              placeholder="Enter your mobile money number"
              type="tel"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <Image
              src={"/assets/momo.png"}
              alt="mtn-momo"
              width={52}
              height={52}
            />
            <button className="btn-primary">Pay now</button>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
