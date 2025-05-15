"use client";
import React, { useState } from "react";
import Item from "./Item";
import Popup from "@/components/ReuseableComponents/Popup";
import BorrowDetailComponent from "@/components/ReuseableComponents/BorrowDetailComponent";
import { BorrowWithItem } from "@/types/types";

const GridItems = ({ data }: { data: BorrowWithItem[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BorrowWithItem | null>(null);

  return (
    <>
      <div className="flex flex-col py-10 w-full h-fit gap-10 afterTimeline relative">
        {data.map((borrow, i) => (
          <Item
            key={borrow.id}
            right={i % 2 !== 0}
            borrow={borrow}
            onClick={() => {
              setSelectedItem(borrow);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Popup open={open}>
        <BorrowDetailComponent
          onClose={() => setOpen(false)}
          borrow={selectedItem}
        />
      </Popup>
    </>
  );
};

export default GridItems;
