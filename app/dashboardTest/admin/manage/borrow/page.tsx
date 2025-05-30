import React from "react";
import prisma from "@/config/PrismaClient";
import { UserStudent } from "@/types/types";
import { Borrow, Item } from "@prisma/client";
import TableData from "@/components/Dashboard/admin/borrow/TableData";

const page = async () => {
  const data = (await prisma.borrow.findMany({
    where: { active: true, returnDate: null },
    orderBy: { createdAt: "desc" },
    include: { user: { include: { student: true } }, item: true },
  })) as (Borrow & { user: UserStudent; item: Item })[];

  return (
    <div className="px-5 md:px-20 lg:px-5 xl:px-20 flex flex-col">
      <h1 className="text-2xl font-bold text-center py-8">
        Manage Borrow Items
      </h1>
      <div className="w-[90dvw] md:w-full overflow-x-auto">
        <TableData data={data} />
      </div>
    </div>
  );
};

export default page;
