"use client";
import ClerkUserButton from "@/components/Navbar/ClerkUserButton";
import React, { useState } from "react";
import Links from "./(LeftMenu)/Links";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const LeftMenu = ({ section }: { section: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="absolute top-5 left-5 text-2xl"
        onClick={() => setOpen(true)}
      >
        <BiMenu />
      </div>
      <div
        className={`${
          open ? "left-0" : "left-[-100%]"
        } z-1 min-w-68 p-5 min-h-screen fixed top-0 lg:static bg-white transition-all`}
      >
        <div className="relative">
          <button
            className="absolute top-1 right-0 text-2xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <CgClose />
          </button>
          <div className="flex gap-2 justify-center items-center">
            <h1 className="font-rubik text-black text-3xl">
              SHARE<span className="text-primary">IT</span>
            </h1>
          </div>

          <div className="flex gap-3 mt-5">
            <ClerkUserButton />
            <p>Steven</p>
          </div>

          <Links section={section} />
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
