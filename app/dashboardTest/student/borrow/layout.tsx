import React from "react";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex-grow pt-15 px-5 md:px-10">{children}</div>;
}
