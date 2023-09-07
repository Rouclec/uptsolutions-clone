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
import { getSession, useSession } from "next-auth/react";
import { User } from "@/types";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const session = useSession();
  const [newOrder, setNewOrder] = useState(1);
  const [showAlert, setShowAlert] = useState(true); 
  const user = session?.data?.user as User;
  const router = useRouter();


  return (
    <SideBar>
      <div className="">
        {(user?.role?.code != "admin" ? <PrintSummary /> : <OrderSummary />)}
      </div>
    </SideBar>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
