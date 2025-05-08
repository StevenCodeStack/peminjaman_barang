import GridItem from "@/app/borrow/components/GridItem";
import SearchBar from "@/app/borrow/components/SearchBar";
import React from "react";

const page = () => {
  return (
    <div className="pt-10 px-10 lg:px-20 xl:px-30">
      <SearchBar />
      <GridItem />
    </div>
  );
};

export default page;
