import Button from "@/components/ReuseableComponents/Button";
import { ItemWithBorrowAndUser } from "@/types/types";
import Image from "next/image";
import React from "react";

const Items = ({
  data,
  click,
}: {
  data: ItemWithBorrowAndUser;
  click: () => void;
}) => {
  return (
    <div className="bg-white h-100 rounded-2xl overflow-hidden flex flex-col">
      <div className="w-full h-full max-h-[60%] relative">
        <Image src={data.picture} alt="" fill className="object-cover" />
      </div>
      <div className="flex-grow flex flex-col justify-between px-5 py-2">
        <div className="">
          <header className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Laptop - 01</h1>
            <p className="text-sm text-slate-500">Laptop</p>
          </header>
          <p className="text-slate-500">Laptop Lenovo Ideapad</p>
        </div>
        <Button
          click={click}
          variant="primary"
          text="Detail"
          className="w-fit self-end"
        />
      </div>
    </div>
  );
};

export default Items;
