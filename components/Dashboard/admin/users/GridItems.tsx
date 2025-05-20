"use client";
import React, { useState } from "react";
import Item from "./Item";
import Popup from "@/components/ReuseableComponents/Popup";
import UserDetail from "./UserDetail";
import { UserAdmin, UserStudent } from "@/types/types";

const GridItems = ({ data }: { data: UserAdmin[] | UserStudent[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    UserAdmin | UserStudent | null
  >(null);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.map((user) => (
          <Item
            key={user.id}
            user={user}
            click={() => {
              setSelectedItem(user);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Popup open={open}>
        <UserDetail close={() => setOpen(false)} user={selectedItem} />
      </Popup>
    </>
  );
};

export default GridItems;
