import Item from "@/components/BorrowPage/Item";
import SearchBar from "@/components/BorrowPage/SearchBar";
import React from "react";

const page = () => {
  return (
    <div className="pt-10 px-10 lg:px-20 xl:px-30">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default page;
