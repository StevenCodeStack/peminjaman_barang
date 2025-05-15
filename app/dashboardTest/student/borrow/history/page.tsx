import GridItems from "@/components/Dashboard/student/Borrow/History/GridItems";
import prisma from "@/config/PrismaClient";
import { BorrowReturnWithBorrow } from "@/types/types";
import React from "react";

const MyReturnedItems = async () => {
  const data: BorrowReturnWithBorrow[] = await prisma.borrowReturn.findMany({
    where: {
      borrow: { student: { id: "cmaow1i7h0000uly0t7cl8ofz" } },
    },
    include: {
      borrow: {
        include: {
          item: true,
          student: true,
        },
      },
    },
  });
  console.log(data);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">My Returned Items</h1>
      <GridItems data={data} />
    </div>
  );
};

export default MyReturnedItems;
