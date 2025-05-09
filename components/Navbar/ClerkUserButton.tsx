"use client";
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { MdOutlineStorage, MdDashboard } from "react-icons/md";

const ClerkUserButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="My Borrowed Items"
              labelIcon={<MdOutlineStorage className="w-4 h-4" />}
              href="/me/borrow"
            />
            <UserButton.Link
              label="Dashboard"
              labelIcon={<MdDashboard className="w-4 h-4" />}
              href="/dashboard/borrowed_items"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <div className=" border-2 border-white rounded-2xl px-3 py-1 whitespace-nowrap">
          <SignInButton />
        </div>
      </SignedOut>
    </>
  );
};

export default ClerkUserButton;
