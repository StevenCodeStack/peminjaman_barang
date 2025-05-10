"use client";
import BorrowDetailComponent from "@/components/ReuseableComponents/BorrowDetailComponent";
import Button from "@/components/ReuseableComponents/Button";
import Popup from "@/components/ReuseableComponents/Popup";
import { Borrow } from "@/model/Models";
import Image from "next/image";
import React, { useState } from "react";

const GridItems = ({ data }: { data: Borrow[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Borrow | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
        {data.map((element) => (
          <div
            key={element.id}
            className="h-90 flex flex-col rounded-2xl overflow-hidden bg-white"
          >
            <div className="w-full h-full max-h-[60%] relative">
              <Image src={element.item.picture} fill alt="" />
            </div>
            <div className="p-3 px-5 flex flex-col justify-between flex-grow">
              <div className="">
                <header className="flex justify-between">
                  <h1 className="text-lg font-semibold">{element.item.name}</h1>
                  <p className="font-light text-sm">{element.item.category}</p>
                </header>
                <p className="font-light text-sm">{element.item.type}</p>
                <p>{element.status}</p>
              </div>
              <Button
                text="Detail"
                click={() => {
                  setSelectedItem(element);
                  setOpen(true);
                }}
                variant="primary"
                className="w-fit self-end"
              />
            </div>
          </div>
        ))}
      </div>
      <Popup open={open}>
        <BorrowDetailComponent
          borrow={selectedItem}
          onClose={() => setOpen(false)}
        />
      </Popup>
    </>
  );
};

export default GridItems;
