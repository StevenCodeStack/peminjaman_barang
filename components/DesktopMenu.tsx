import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { IoMdHome } from "react-icons/io";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const DesktopMenu = () => {
  return (
    <div className="flex-grow hidden md:flex items-center justify-between lg:justify-end gap-10 xl:gap-20">
      <ul className="flex gap-15 xl:gap-20">
        <li className="flex items-center gap-2">
          <IoMdHome className="text-primary text-[18px] lg:text-2xl" /> Home
        </li>
        <li className="flex items-center gap-2">
          <RiTeamFill className="text-primary text-[18px] lg:text-2xl" /> About
        </li>
        <li className="flex items-center gap-2">
          <MdOutlineSystemUpdateAlt className="text-primary text-[18px] lg:text-2xl" />
          Borrow
        </li>
        <li className="whitespace-nowrap hidden lg:block px-4 font-semibold w-fit py-1 rounded-2xl bg-primary text-black">
          Contact Us
        </li>
      </ul>
      <div className=" border-2 border-white rounded-2xl px-3 py-1 whitespace-nowrap">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default DesktopMenu;
