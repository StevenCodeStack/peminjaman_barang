import React from "react";
import LeftMenu from "./components/LeftMenu";

export default async function layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { section: string } }>) {
  const { section } = await params;
  return (
    <div className="flex">
      <LeftMenu section={section} />
      {children}
    </div>
  );
}
