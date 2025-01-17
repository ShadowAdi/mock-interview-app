"use client";
import React from "react";
import SvgIcon from "./LogoComponent";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const path = usePathname();

  return (
    <header className="w-full flex justify-between p-4 py-5 items-center  shadow-sm bg-secondary">
      <Link href={"/"}>
        <SvgIcon />
      </Link>
      <ul className="hidden md:flex gap-6 items-center ">
        <Link href={"/dashboard"}>
          <li
            className={`cursor-pointer hover:text-[#f1774e] hover:font-bold transition-all ${
              path === "/dashboard" ? "text-[#f1774e] font-bold" : ""
            }`}
          >
            Dashboard
          </li>
        </Link>
        <li
          className={`cursor-pointer hover:text-[#f1774e] hover:font-bold transition-all ${
            path === "/questions" ? "text-[#f1774e] font-bold" : ""
          }`}
        >
          Questions
        </li>
        <li
          className={`cursor-pointer hover:text-[#f1774e] hover:font-bold transition-all ${
            path === "/upgrade" ? "text-[#f1774e] font-bold" : ""
          }`}
        >
          Upgrade
        </li>
        <li
          className={`cursor-pointer hover:text-[#f1774e] hover:font-bold transition-all ${
            path === "/how" ? "text-[#f1774e] font-bold" : ""
          }`}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </header>
  );
};
