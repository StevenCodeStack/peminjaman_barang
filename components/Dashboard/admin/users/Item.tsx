import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

const Item = ({ user, click }: { user: User; click: () => void }) => {
  return (
    <div
      onClick={click}
      className="flex flex-col justify-center items-center gap-3"
    >
      <div className="w-50 h-50 relative">
        <Image
          src={user.picture}
          fill
          alt={user.fullName || "User Picture"}
          className="object-cover rounded-full"
        />
      </div>
      <h1 className="text-center font-semibold">
        {user.fullName || user.username}
      </h1>
    </div>
  );
};

export default Item;
