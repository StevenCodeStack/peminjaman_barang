"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMenu, IoMdHome, IoMdClose } from "react-icons/io";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import ClerkUserButton from "./ClerkUserButton";
import { Roles } from "@/types/globals";

const MobileMenu = ({ role }: { role: Roles | undefined }) => {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  return (
    <div className="md:hidden">
      <IoMdMenu className="text-3xl" onClick={() => setOpen(true)} />
      <nav
        className={`${
          open ? "right-0" : "right-[-100%]"
        } absolute h-screen w-[60vw] bg-black top-0 transition-all`}
      >
        <IoMdClose
          className="absolute top-5 right-5 text-4xl text-white font-bold z-10"
          onClick={handleClose}
        />
        <ul className="relative flex flex-col gap-8 font-bold text-2xl py-50 px-15 sm:px-25">
          <ClerkUserButton />
          <Link
            href={"/#home"}
            onClick={handleClose}
            className="flex items-center gap-2"
          >
            <IoMdHome className="text-primary text-3xl" /> Home
          </Link>
          <Link
            href={"/#about"}
            onClick={handleClose}
            className="flex items-center gap-2"
          >
            <RiTeamFill className="text-primary text-3xl" /> About
          </Link>
          {role !== "admin" && (
            <Link
              href={"/borrow"}
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <MdOutlineSystemUpdateAlt className="text-primary text-3xl" />{" "}
              Borrow
            </Link>
          )}

          <Link
            href={"/#contact"}
            onClick={handleClose}
            className="px-3 w-fit py-1 rounded-2xl bg-primary text-black text-base"
          >
            Contact Us
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
