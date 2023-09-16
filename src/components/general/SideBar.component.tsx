import { roboto } from "@/pages/_app";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import { HiOutlineMenu, HiOutlineRefresh } from "react-icons/hi";
import { RiMessage2Line } from "react-icons/ri";
import { navItems as userNavitems, adminNavItems } from "@/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types";
import { TbLogout } from "react-icons/tb";

type Props = {
  children?: any;
};
const SideBar: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [showSideBar, setShowSideBar] = useState(false);
  const [navItems, setNavItems] = useState(userNavitems);
  const session = useSession();
  const user = session?.data?.user as User;
  const [notificationDropDown, setNotificationDropdown] = useState(false);
  const [messageDropDown, setMessageDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const ref = useRef(null) as any;

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target) && event.target.id !== "menu") {
        setShowSideBar(false);
        setNotificationDropdown(false);
        setMessageDropdown(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handleClick = (item: { name: String; path: String; icon: any }) => {
    if (item.name === "Logout") {
      signOut({ redirect: false }).then(() => {
        router.push("/signin");
      });
    }
  };

  useEffect(() => {
    user?.role?.code === "admin"
      ? setNavItems(adminNavItems)
      : setNavItems(userNavitems);
  }, [user]);

  useEffect(() => {
    const root = router.pathname.split("/")[1];
    root === "checkout"
      ? setActiveTab("/")
      : root === "order-print"
      ? setActiveTab("/")
      : root === "[id]"
      ? setActiveTab("/")
      : setActiveTab(`/${root}`);
  }, [router.pathname, activeTab]);
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
            {/* <RiMessage2Line className={`text-[var(--gray-700)] hover:cursor-pointer text-lg md:text-3xl ${notificationDropDown || "text-violet-800"} `}/> */}
            {/* <HiOutlineBell className="text-[var(--gray-700)] hover:cursor-pointer text-lg md:text-3xl" /> */}

            <div>
              <RiMessage2Line
                onClick={() => setMessageDropdown((p) => !p)}
                className="text-[var(--gray-700)] hover:cursor-pointer text-lg md:text-3xl"
              />
              {messageDropDown && <MessageDropdown />}
            </div>
            <div>
              <HiOutlineBell
                onClick={() => setNotificationDropdown((p) => !p)}
                className="text-[var(--gray-700)] hover:cursor-pointer text-lg md:text-3xl"
              />
              {notificationDropDown && <NotificationDropdown />}
            </div>
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
                user?.profileImage
                  ? user?.profileImage
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
              {user?.name}
            </p>
            <p
              className={`${roboto.className} text-center text-[var(--gray-700)] text-sm font-[500]`}
            >
              {user?.phoneNumber || "No phone number"}
            </p>
            <p
              className={`${roboto.className} text-center text-[var(--gray-700)] text-sm font-[500]`}
            >
              {user?.email}
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
                  item.path === activeTab
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
          <Link href={"signin"} className={`w-full`}>
            <div
              className={`flex gap-2 text-xl items-center card ${"text-[var(--gray-700)]"} justify-start text-[16px] hover:cursor-pointer hover:card-primary`}
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/signin");
                });
              }}
            >
              <TbLogout size={24} />
              <p className="text-center">Logout</p>
            </div>
          </Link>
        </div>
      </div>
      <main className="md:ml-[300px] mt-20 p-4 md:p-10">{children}</main>
    </div>
  );
};

export default SideBar;

const NotificationDropdown = () => {
  return (
    <div
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className=" h-24 p-4 bg-white rounded-lg shadow justify-start items-start gap-4 inline-flex">
        <div className="grow shrink basis-0 h-16 justify-start items-start gap-3 flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="self-stretch h-16 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch text-gray-900 text-sm font-medium font-['Roboto'] leading-tight">
                Receive notifications
              </div>
              <div className="self-stretch text-gray-500 text-sm font-normal font-['Roboto'] leading-tight">
                Notifications may include alerts, sounds, and badges.
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md justify-center items-center flex">
          <div className="w-5 h-5 relative" />
        </div>
      </div>
    </div>
  );
};

const MessageDropdown = () => {
  return (
    <div
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className=" p-4 bg-white rounded-lg shadow justify-start items-start gap-4 inline-flex">
        <div className="grow shrink basis-0 h-[94px] justify-start items-start gap-3 flex">
          <div className="pt-0.5 justify-center items-start flex">
            <img
              className="w-10 h-10 rounded-[20px]"
              src="https://via.placeholder.com/40x40"
            />
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="self-stretch h-11 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch text-gray-900 text-sm font-medium font-['Roboto'] leading-tight">
                Emilia Gates
              </div>
              <div className="text-gray-500 text-sm font-normal font-['Roboto'] leading-tight">
                Sent you a message
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-3 inline-flex">
              <div className="px-[13px] py-[9px] bg-blue-600 rounded-md shadow justify-center items-center flex">
                <div className="text-white text-sm font-medium font-['Roboto'] leading-none">
                  Reply
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md justify-center items-center flex">
          <div className="w-5 h-5 relative" />
        </div>
      </div>
    </div>
  );
};
