import React from "react";

const SearchBar = () => {
  return (
    <form action="" className="flex justify-end w-full gap-5 mb-5">
      <input
        type="text"
        className="px-3 py-1 bg-white rounded-full shadow shadow-slate-500 w-80"
      />
      <button className="bg-white px-3 py-1 text-primary-hover shadow shadow-slate-500 rounded-full font-black ">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
