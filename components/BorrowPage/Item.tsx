import Image from "next/image";
import React from "react";

const Item = () => {
  return (
    <div className="flex flex-col w-full h-105 bg-white rounded-2xl drop-shadow-xl">
      <div className="relative w-full max-h-[60%] flex-grow shadow">
        <Image
          src={
            "https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww"
          }
          fill
          className="object-cover rounded-t-2xl"
          alt=""
        />
      </div>
      <div className="p-2 px-5 flex flex-col justify-between h-[40%]">
        <div className="">
          <h1 className="text-2xl font-bold">Laptop Sekolah - 01</h1>
          <p className="font-light">Laptop Lenovo IdeaPad</p>
        </div>
        <button className="self-end my-3 px-5 py-2 bg-primary font-semibold rounded-full">
          Borrow
        </button>
      </div>
    </div>
  );
};

export default Item;
