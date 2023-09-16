import { roboto, roboto_slab } from "@/pages/_app";
import { addCommas } from "@/utils/addCommas";
import React from "react";
import { BsCart, BsCartCheck, BsCartDash } from "react-icons/bs";
import { HiOutlineCurrencyPound } from "react-icons/hi2";

type Props = {
  stats: {
    amount: number;
    completed: number;
    pending: number;
    refunded: number;
  };
};
const AdminStats: React.FC<Props> = ({ stats }) => {
  console.log({ stats });
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="card items-center">
        <div className="flex gap-4 p-3">
          <div className="flex card card-primary items-center justify-center">
            <BsCart size={24} />
          </div>
          <div className="grid gap-1 items-center">
            <p
              className={`${roboto.className} font[500] text-[var(--gray-700)] text-sm`}
            >
              Pending orders
            </p>
            <p className={`${roboto_slab.className} text-2xl font-semibold`}>
              {addCommas(stats?.pending + stats?.completed + stats?.refunded)}
            </p>
          </div>
        </div>
      </div>
      <div className="card items-center">
        <div className="flex gap-4 p-3">
          <div className="flex card card-secondary items-center justify-center">
            <BsCartCheck size={24} />
          </div>
          <div className="grid gap-1 items-center">
            <p
              className={`${roboto.className} font[500] text-[var(--gray-700)] text-sm`}
            >
              Completed orders
            </p>
            <p className={`${roboto_slab.className} text-2xl font-semibold`}>
              {addCommas(stats?.completed)}
            </p>
          </div>
        </div>
      </div>
      <div className="card items-center">
        <div className="flex gap-4 p-3">
          <div className="flex card card-gray items-center justify-center">
            <BsCartDash size={24} />
          </div>
          <div className="grid gap-1 items-center">
            <p
              className={`${roboto.className} font[500] text-[var(--gray-700)] text-sm`}
            >
              Order Refunded
            </p>
            <p className={`${roboto_slab.className} text-2xl font-semibold`}>
              {addCommas(stats?.refunded)}
            </p>
          </div>
        </div>
      </div>
      <div className="card items-center">
        <div className="flex gap-4 p-3">
          <div className="flex card card-warning items-center justify-center">
            <HiOutlineCurrencyPound size={24} />
          </div>
          <div className="grid gap-1 items-center">
            <p
              className={`${roboto.className} font[500] text-[var(--gray-700)] text-sm`}
            >
              Total Amount Received
            </p>
            <p className={`${roboto_slab.className} text-2xl font-semibold`}>
              {addCommas(stats?.amount)}{" "}
              <span className="text-sm font-light text-[var(--gray-700)]">
                XAF
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
