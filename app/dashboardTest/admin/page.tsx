import React from "react";

const page = async ({ params }: { params: { section: string } }) => {
  const { section } = await params;
  return <div className="flex-grow pt-15 px-10 "></div>;
};

export default page;
