"use client";
import React, { useState } from "react";
import Confirmation from "@/components/ReuseableComponents/Confirmation";
import ItemComponent from "./ItemComponent";
import Popup from "@/components/ReuseableComponents/Popup";
import { Item } from "@prisma/client";
import { createBorrowRequestAction } from "@/app/actions/BorrowRequest";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const GridItem = ({ items }: { items: Item[] }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();

  async function handleBorrow(item: Item) {
    try {
      await createBorrowRequestAction(item);
      toast.success(`Successfully borrowed ${item.name}!`, {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message, {
          position: "bottom-right",
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast("Unexpected Error", {
          position: "bottom-right",
          autoClose: 5000,
          pauseOnHover: true,
          theme: "dark",
          draggable: true,
          transition: Bounce,
        });
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-5">
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
          message={`Are you sure you want to borrow ${selectedItem?.name}`}
          onConfirm={() => {
            if (selectedItem === null) return;
            handleBorrow(selectedItem);
          }}
          onClose={() => setShowDialog(false)}
        />
      </Popup>
    </>
  );
};

export default GridItem;
