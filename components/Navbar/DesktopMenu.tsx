import React from "react";
import { IoMdHome } from "react-icons/io";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import ClerkUserButton from "./ClerkUserButton";
import Link from "next/link";

const DesktopMenu = () => {
  return (
    <div className="flex-grow hidden md:flex items-center justify-between lg:justify-end gap-12 xl:gap-25">
      <ul className="flex gap-8">
        <Link href={"/#home"} className="flex items-center gap-2">
          <IoMdHome className="text-primary text-[18px] lg:text-2xl" /> Home
        </Link>
        <Link href={"/#about"} className="flex items-center gap-2">
          <RiTeamFill className="text-primary text-[18px] lg:text-2xl" /> About
        </Link>
        <Link href={"/borrow"} className="flex items-center gap-2">
          <MdOutlineSystemUpdateAlt className="text-primary text-[18px] lg:text-2xl" />
          Borrow
        </Link>
        <Link
          href={"/#contact"}
          className="whitespace-nowrap hidden lg:block px-4 font-semibold w-fit py-1 rounded-2xl bg-primary text-black"
        >
          Contact Us
        </Link>
      </ul>

      <ClerkUserButton />
    </div>
  );
};

export default DesktopMenu;
