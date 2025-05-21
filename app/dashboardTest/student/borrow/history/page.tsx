import GridItems from "@/components/Dashboard/student/Borrow/History/GridItems";
import prisma from "@/config/PrismaClient";
import { BorrowReturnWithBorrow } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const MyReturnedItems = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const data = (await prisma.borrowReturn.findMany({
    where: {
      borrow: { user: { id: userId } },
    },
    include: {
      borrow: {
        include: {
          item: true,
          user: true,
        },
      },
    },
  })) as BorrowReturnWithBorrow[];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">My Returned Items</h1>
      <GridItems data={data} />
    </div>
  );
};

export default MyReturnedItems;
