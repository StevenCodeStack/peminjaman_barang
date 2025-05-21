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
import { BorrowRequestWithItem } from "@/types/types";
import { dateFormat } from "@/lib/utils";
import ActionButtons from "@/components/Dashboard/admin/borrowRequest/ActionButtons";

const page = async () => {
  const data = (await prisma.borrowRequest.findMany({
    where: { status: "PENDING" },
    include: { user: { include: { student: true } }, item: true },
  })) as BorrowRequestWithItem[];
  return (
    <div className="px-5 md:px-20 lg:px-5 xl:px-20 flex flex-col">
      <h1 className="text-2xl font-bold text-center py-8">
        Manage Borrow Request
      </h1>
      <Table>
        <TableCaption>A list of Borrow Request</TableCaption>
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableHead className="">NIK</TableHead>
            <TableHead className="">Student</TableHead>
            <TableHead className="hidden lg:table-cell">Email</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead className="hidden lg:table-cell">Category</TableHead>
            <TableHead>Borrow At</TableHead>
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
              <TableCell className="text-right">
                {dateFormat(data.createdAt)}
              </TableCell>
              <TableCell>
                <ActionButtons borrowRequestId={data.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
