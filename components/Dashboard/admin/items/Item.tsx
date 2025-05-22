import Button from "@/components/ReuseableComponents/Button";
import { ItemWithBorrowAndUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
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
            <h1 className="text-lg font-semibold">{data.name}</h1>
            <p className="text-sm text-slate-500">{data.category}</p>
          </header>
          <p className="text-slate-500">{data.type}</p>
          <p className={data.isAvailable ? "text-green-400" : "text-red-400"}>
            {data.isAvailable ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="self-end flex gap-5">
          <Link
            href={`/dashboardTest/admin/items/edit/${data.id}`}
            className="px-6 py-1 bg-transparent border border-black rounded"
          >
            Edit
          </Link>
          <Button
            click={click}
            variant="primary"
            text="Detail"
            className="w-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default Items;
