import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import {
  HiOutlineCreditCard,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { MdHelpOutline } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

export const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <RiDashboardLine size={24} />,
  },
  {
    name: "Account",
    path: "/account",
    icon: <HiOutlineUser size={24} />,
  },
  {
    name: "Billing",
    path: "#",
    icon: <HiOutlineCreditCard size={24} />,
  },
  {
    name: "Setting",
    path: "#",
    icon: <AiOutlineSetting size={24} />,
  },
  {
    name: "Help",
    path: "#",
    icon: <MdHelpOutline size={24} />,
  },
];

export const adminNavItems = navItems.map((item: any) =>
  item.name === "Billing"
    ? {
        name: "Customers",
        path: "#",
        icon: <HiOutlineUserGroup />,
      }
    : item
);
