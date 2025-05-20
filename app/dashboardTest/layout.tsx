import React from "react";
import LeftMenu from "../../components/Dashboard/Layout/LeftMenu";
import { auth } from "@clerk/nextjs/server";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata.role;
  if (!role) return null;
  return (
    <div className="flex relative">
      <LeftMenu role={role} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
