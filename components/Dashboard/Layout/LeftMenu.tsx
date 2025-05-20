"use client";
import ClerkUserButton from "@/components/Navbar/ClerkUserButton";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import StudentLinks from "./StudentLinks";
import AdminLinks from "./AdminLinks";
import { Roles } from "@/types/globals";

const LeftMenu = ({ role }: { role: Roles }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-5 left-5 text-2xl lg:hidden"
        onClick={() => setOpen(true)}
      >
        <BiMenu />
      </div>
      <div
        className={`${
          open ? "left-0" : "left-[-100%]"
        } z-1 min-w-68 p-5 fixed top-0 h-screen lg:sticky bg-white transition-all`}
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
          </div>

          {/* <Links studentLinks={StudentLinks} adminLinks={AdminLinks} /> */}
          {role === "student" && <StudentLinks />}
          {role === "admin" && <AdminLinks />}
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
