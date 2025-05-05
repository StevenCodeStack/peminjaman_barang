"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { IoMdMenu, IoMdHome } from "react-icons/io";
import { MdClose, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <IoMdMenu className="text-3xl" onClick={() => setOpen(true)} />
      <nav
        className={`${
          open ? "right-0" : "right-[-100%]"
        } absolute h-screen w-[60vw] bg-black top-0 transition-all`}
      >
        <ul className="relative flex flex-col gap-8 font-bold text-2xl py-50 px-15 sm:px-25">
          <div className="absolute top-5 px-5 right-0 flex justify-between w-full">
            <div className="border-2 border-white px-4 py-1 font-mono text-white rounded-full text-xl">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
            <MdClose className="text-3xl" onClick={() => setOpen(false)} />
          </div>
          <li className="flex items-center gap-2">
            <IoMdHome className="text-primary text-3xl" /> Home
          </li>
          <li className="flex items-center gap-2">
            <RiTeamFill className="text-primary text-3xl" /> About
          </li>
          <li className="flex items-center gap-2">
            <MdOutlineSystemUpdateAlt className="text-primary text-3xl" />{" "}
            Borrow
          </li>
          <li className="px-3 w-fit py-1 rounded-2xl bg-primary text-black">
            Contact Us
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
