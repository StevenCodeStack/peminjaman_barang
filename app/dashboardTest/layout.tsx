import React from "react";
import LeftMenu from "../../components/Dashboard/Layout/LeftMenu";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <LeftMenu />
      <div className="flex-grow pt-15 px-10">{children}</div>
    </div>
  );
}
