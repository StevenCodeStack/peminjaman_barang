import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/config/PrismaClient";
import { UserStudent } from "@/types/types";
import { dateFormat } from "@/lib/utils";
import ActionButtons from "@/components/Dashboard/admin/borrow/ActionButtons";
import { Borrow, Item } from "@prisma/client";

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
        <Table>
          <TableCaption>A list of Borrow Items</TableCaption>
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="">NIK</TableHead>
              <TableHead className="">Student</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead>Borrow At</TableHead>
              <TableHead>Borrow Code</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="">{data.user.student.nik}</TableCell>
                <TableCell className="">{data.user.fullName}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {data.user.email}
                </TableCell>
                <TableCell>{data.item.name}</TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  {data.item.category}
                </TableCell>
                <TableCell className="">{dateFormat(data.createdAt)}</TableCell>
                <TableCell className="">{data.borrowCode}</TableCell>
                <TableCell>
                  <ActionButtons borrowId={data.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
