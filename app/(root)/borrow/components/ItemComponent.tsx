import Button from "@/components/ReuseableComponents/Button";
import { Item } from "@prisma/client";
import Image from "next/image";
import React from "react";

const ItemComponent = ({ data, click }: { data: Item; click: () => void }) => {
  return (
    <div className="flex flex-col w-full h-105 bg-white rounded-2xl drop-shadow-xl">
      <div className="relative w-full max-h-[60%] flex-grow shadow">
        <Image
          src={data.picture}
          fill
          className="object-cover rounded-t-2xl"
          alt=""
          priority={false}
          quality={75}
        />
      </div>
      <div className="p-2 px-5 flex flex-col justify-between h-[40%]">
        <div className="">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="font-light text-sm">{data.category}</p>
          </div>
          <p className="font-light">{data.type} </p>
        </div>
        <Button
          className="w-fit self-end"
          click={click}
          text="Borrow"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default ItemComponent;
