"use client";
import React, { useState } from "react";
import Confirmation from "../../../../components/ReuseableComponents/Confirmation";
import { Item } from "@/model/Models";
import ItemComponent from "./ItemComponent";
import Popup from "@/components/ReuseableComponents/Popup";

const GridItem = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const items: Item[] = [
    {
      id: 1,
      name: "Laptop - 01",
      type: "Laptop Lenovo IdeaPad",
      category: "Laptop",
      isAvailable: true,
      picture:
        "https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Speaker - 01",
      type: "Speaker Gila Keras Wirrrr",
      category: "Speaker",
      isAvailable: true,
      picture:
        "https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Laptop - 01",
      type: "Laptop Lenovo IdeaPad",
      category: "Laptop",
      isAvailable: true,
      picture:
        "https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    },
  ];

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
