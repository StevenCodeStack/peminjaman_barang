import React from "react";
import LeftMenu from "../../components/Dashboard/Layout/LeftMenu";
export const dynamic = "force-static";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <LeftMenu />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
