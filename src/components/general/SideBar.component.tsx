import { roboto } from "@/pages/_app";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import { HiOutlineMenu, HiOutlineRefresh } from "react-icons/hi";
import { RiMessage2Line } from "react-icons/ri";
import { navItems, adminNavItems } from "@/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  children?: any;
};
const SideBar: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [showSideBar, setShowSideBar] = useState(false);
  const [active, setActive] = useState();
  const session = useSession() as any;

  console.log("session user: ", session?.data?.user);

  const ref = useRef(null) as any;

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target) && event.target.id !== "menu") {
        setShowSideBar(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handleClick = (item: { name: String; path: String; icon: any }) => {
    item.name === "Logout" && signOut();
  };
  return (
    <div>
      <div className="fixed left-0 top-0 right-0 h-20 bg-[var(--neutral-10)] z-10 border-2 flex p-4 items-center gap-2 md:gap-16">
        <div className="flex gap-2 items-center w-24 md:w-[300px]">
          <HiOutlineMenu
            className="text-[var(--gray-700)] mr-4 hover:cursor-pointer md:hidden"
            onClick={() => setShowSideBar(!showSideBar)}
            id={"menu"}
          />
          <Image src={"/assets/logo.png"} alt="logo" width={28} height={28} />
          <p className="font-[dm-sans] text-[var(--primary-600)] font-semibold text-xl hidden md:block">
            Universal Print Tech
          </p>
        </div>
        <div className="flex w-[100vw] md:w-[calc(100vw-16rem)] justify-between items-center">
          <div className="flex gap-2 items-center md:w-[80%] ">
            <HiMagnifyingGlass
              className="text-[var(--gray-700)] hover:cursor-pointer"
              size={18}
            />
            <p className={`text-[var(--gray-500)] ${roboto.className}`}>
              Search
            </p>
          </div>
          <div className="md:w-[20%] flex items-center gap-2 justify-evenly">
            <HiOutlineRefresh className="text-[var(--gray-700)] font-extralight hover:cursor-pointer text-lg md:text-3xl" />
            <RiMessage2Line className="text-[var(--gray-700)] hover:cursor-pointer text-lg md:text-3xl" />
            <HiOutlineBell className="text-[var(--gray-700)] hover:cursor-pointer text-lg md:text-3xl" />
          </div>
        </div>
      </div>
      <div
        className={`flex-col bg-[var(--neutral-10)] fixed left-0 top-20 bottom-0 z-50 w-[300px] p-4 items-center md:flex ${
          showSideBar ? "flex" : "hidden"
        }`}
        ref={ref}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-24 h-24 bg-[var(--gray-400)] rounded-full flex items-center justify-center">
            <Image
              src={
                session?.data?.user?.image
                  ? session?.data?.user?.image
                  : session?.data?.user?.picture
                  ? session?.data?.user?.picture
                  : "/assets/default-avatar.png"
              }
              alt="avatar"
              width={96}
              height={96}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <p
              className={`${roboto.className} text-center text-[var(--gray-800)] text-[16px] font-[500]`}
            >
              {session?.data?.user?.name}
            </p>
            <p
              className={`${roboto.className} text-center text-[var(--gray-700)] text-sm font-[500]`}
            >
              {session?.data?.user?.phoneNumber || "No phone number"}
            </p>
            <p
              className={`${roboto.className} text-center text-[var(--gray-700)] text-sm font-[500]`}
            >
              {session?.data?.user?.email}
            </p>
          </div>
        </div>
        <div className="card flex flex-col items-center w-full gap-1">
          {navItems.map((item: any, index) => (
            <Link
              href={item.path}
              key={index}
              className={`w-full ${
                item.path !== "/" && "hover:cursor-not-allowed"
              }`}
            >
              <div
                className={`flex gap-2 text-xl items-center card ${
                  item.path === "/" ||
                  item.path === "/checkout" ||
                  item.path === "/order"
                    ? "card-primary"
                    : "text-[var(--gray-700)]"
                } justify-start text-[16px] hover:cursor-pointer hover:card-primary`}
                onClick={() => handleClick(item)}
              >
                {item.icon}
                <p className="text-center">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <main className="md:ml-[300px] mt-20 p-4 md:p-10">{children}</main>
    </div>
  );
};

export default SideBar;
