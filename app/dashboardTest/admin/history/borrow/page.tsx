import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = await auth();
  return <div>page</div>;
};

export default page;
