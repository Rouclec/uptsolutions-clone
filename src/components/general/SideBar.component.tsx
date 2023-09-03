import { roboto } from "@/pages/_app";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import {
  HiMagnifyingGlass,
  HiOutlineBell,
  HiOutlineCreditCard,
  HiOutlineUser,
} from "react-icons/hi2";
import { HiOutlineRefresh } from "react-icons/hi";
import { RiMessage2Line, RiDashboardLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { MdHelpOutline } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { navItems, adminNavItems } from "@/utils";
import { useRouter } from "next/router";

type Props = {
  children?: any;
};
const SideBar: FC<Props> = ({ children }) => {
  const router = useRouter();

  console.log("path: ", router.pathname);
  return (
    <div>
      <div className="w-screen fixed left-0 top-0 right-0 h-20 bg-[var(--neutral-10)] z-10 border-2 flex p-4 items-center gap-16">
        <div className="flex gap-2 items-center w-24 md:w-[300px]">
          <Image src={"/assets/logo.png"} alt="logo" width={28} height={28} />
          <p className="font-[dm-sans] text-[var(--primary-600)] font-semibold text-xl hidden md:block">
            Universal Print Tech
          </p>
        </div>
        <div className="flex w-[calc(100vw-6rem)] md:w-[calc(100vw-16rem)] justify-between items-center">
          <div className="flex gap-2 items-center w-[80%] ">
            <HiMagnifyingGlass
              className="text-[var(--gray-700)] hover:cursor-pointer"
              size={18}
            />
            <p className={`text-[var(--gray-500)] ${roboto.className}`}>
              Search
            </p>
          </div>
          <div className="w-[20%] flex items-center gap-2 justify-evenly">
            <HiOutlineRefresh
              className="text-[var(--gray-700)] font-extralight hover:cursor-pointer"
              size={32}
            />
            <RiMessage2Line
              className="text-[var(--gray-700)] hover:cursor-pointer"
              size={32}
            />
            <HiOutlineBell
              className="text-[var(--gray-700)] hover:cursor-pointer"
              size={32}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen bg-[var(--neutral-10)] fixed left-0 top-20 bottom-0 w-24 md:w-[300px] p-4 items-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 md:w-24 h-12 md:h-24 bg-[var(--gray-400)] rounded-full flex items-center justify-center">
            <Image
              src={"/assets/avatar.png"}
              alt="avatar"
              width={96}
              height={96}
            />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 items-center justify-center w-20 md:w-full">
            <p
              className={`${roboto.className} text-center text-[var(--gray-800)] text-[12px] md:text-[16px] font-[500]`}
            >
              Asonganyi Rouclec Forsamp Anyah
            </p>
            <p
              className={`${roboto.className} text-center text-[var(--gray-700)]  text-[6px] md:text-sm font-[500]`}
            >
              (+237) 650 184 172
            </p>
            <p
              className={`${roboto.className} text-center text-[var(--gray-700)] text-[6px] md:text-sm font-[500]`}
            >
              senatorasonganyi97@gmail.com
            </p>
          </div>
        </div>
        <div className="card flex flex-col items-center w-full gap-1">
          {navItems.map((item: any, index) => (
            <div
              key={index}
              className={`w-full flex md:gap-2 text-xl items-center card ${
                router.pathname === item.path
                  ? "card-primary"
                  : "text-[var(--gray-700)]"
              }  justify-center md:justify-start text-[16px] hover:cursor-pointer hover:card-primary`}
            >
              {item.icon}
              <p className="text-center hidden md:block">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <main className="ml-20 md:ml-[300px] mt-20 p-10">{children}</main>
    </div>
  );
};

export default SideBar;
