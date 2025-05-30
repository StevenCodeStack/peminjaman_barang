import React from "react";
import { BorrowRequestWithItem } from "@/types/types";
import prisma from "@/config/PrismaClient";
import TableData from "@/components/Dashboard/admin/borrowRequest/TableData";

const page = async () => {
  const data = (await prisma.borrowRequest.findMany({
    where: { status: "PENDING" },
    include: { user: { include: { student: true } }, item: true },
    orderBy: { createdAt: "desc" },
  })) as BorrowRequestWithItem[];
  return (
    <div className="px-5 md:px-20 lg:px-5 xl:px-20 flex flex-col">
      <h1 className="text-2xl font-bold text-center py-8">
        Manage Borrow Request
      </h1>
      <div className="w-[90dvw] md:w-full overflow-x-auto">
        <TableData data={data} />
      </div>
    </div>
  );
};

export default page;
