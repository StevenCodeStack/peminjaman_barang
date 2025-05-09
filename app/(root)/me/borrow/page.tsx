import React from "react";
import GridItems from "./components/GridItems";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <>
      <h1 className="text-center text-3xl text-black font-bold mt-5">
        Borrowed Item
      </h1>
      <GridItems />
      <Footer />
    </>
  );
};

export default Page;
