"use client";
import React, { useState } from "react";
import Confirmation from "@/components/ReuseableComponents/Confirmation";
import ItemComponent from "./ItemComponent";
import Popup from "@/components/ReuseableComponents/Popup";
import { Item } from "@prisma/client";

const GridItem = ({ items }: { items: Item[] }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {items.map((item) => (
          <ItemComponent
            key={item.id}
            data={item}
            click={() => {
              setSelectedItem(item);
              setShowDialog(true);
            }}
          />
        ))}
      </div>
      <Popup open={showDialog}>
        <Confirmation
          item={selectedItem}
          message={`Are you sure you want to borrow ${selectedItem?.name}`}
          onConfirm={() => console.log(selectedItem?.id)}
          onClose={() => setShowDialog(false)}
        />
      </Popup>
    </>
  );
};

export default GridItem;
