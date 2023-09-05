import { Header, OrderAlert, SideBar, Stats } from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { HiOutlineCloudDownload } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { roboto, roboto_slab } from "./_app";
import PrintSummary from "@/components/dashboard/PrintSummary";
import OrderSummary from "@/components/dashboard/OrderSummary";

export default function Home() {
  const [newOrder, setNewOrder] = useState(1);
  const [showAlert, setShowAlert] = useState(true);

  const router = useRouter();
  return (
    <SideBar>
      <div className="">
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
          >
            Dashboard
          </p>
          <div className="flex w-full items-center justify-end mb-2">
            <Link href="/order-print">
              <button className={`btn-primary flex gap-2 text-lg`}>
                <HiOutlinePlus />
                <p className={`${roboto.className} font-normal`}>Order Print</p>
              </button>
            </Link>
          </div>
          {showAlert && newOrder > 0 && (
            <OrderAlert
              message={`You have ${newOrder} pending order`}
              viewTxt={"View order"}
              onClose={() => setShowAlert(false)}
              link={"/checkout"}
            />
          )}
        </Header>
        {/* order sumary */}
        <PrintSummary />

        <OrderSummary />
      </div>
    </SideBar>
  );
}
