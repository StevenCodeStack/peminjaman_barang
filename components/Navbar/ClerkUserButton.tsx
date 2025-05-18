"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { MdDashboard } from "react-icons/md";

const ClerkUserButton = () => {
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="flex items-center gap-2">Loading...</div>;
  }
  return (
    <>
      <SignedIn>
        <Suspense fallback={<div>Loading...</div>}>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Dashboard"
                labelIcon={<MdDashboard className="w-4 h-4" />}
                href={`/dashboardTest${
                  role === "student" ? "/student/borrow/current" : "/admin"
                }`}
              />
            </UserButton.MenuItems>
          </UserButton>
        </Suspense>
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
