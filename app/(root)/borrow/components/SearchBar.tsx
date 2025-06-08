"use client";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const SearchBar = () => {
  const path = usePathname();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const search = form.get("search");
    redirect(`${path}?search=${search}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-end w-full gap-2 md:gap-5 mb-5"
    >
      <input
        type="text"
        name="search"
        className="px-3 py-1 bg-white rounded-full shadow shadow-slate-500 flex-grow max-w-80 lg:max-w-100"
      />
      <button className="bg-white px-3 py-1 text-primary-hover shadow shadow-slate-500 rounded-full font-black ">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
