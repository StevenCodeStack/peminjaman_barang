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
import { dateFormat } from "@/lib/utils";
import prisma from "@/config/PrismaClient";
import { BorrowWithItem } from "@/types/types";
import { BorrowReturn } from "@prisma/client";

const page = async () => {
  const data = (await prisma.borrowReturn.findMany({
    where: { borrow: { user: { student: { isNot: null } } } },
    include: {
      borrow: {
        include: {
          user: { include: { student: true } },
          item: true,
        },
      },
    },
  })) as (BorrowReturn & { borrow: BorrowWithItem })[];

  return (
    <div className="px-5 md:px-20 lg:px-5 xl:px-20 flex flex-col">
      <h1 className="text-center font-bold text-2xl py-8">Borrow History</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of Borrow History</TableCaption>
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="">NIK</TableHead>
              <TableHead className="">Student</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead className="text-right">Borrow At</TableHead>
              <TableHead className="text-right">Returned At</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="">
                  {data.borrow.user.student.nik}
                </TableCell>
                <TableCell className="">{data.borrow.user.fullName}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {data.borrow.user.email}
                </TableCell>
                <TableCell>{data.borrow.item.name}</TableCell>
                <TableCell className="text-right">
                  {dateFormat(data.borrow.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  {dateFormat(data.borrow.returnDate)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <p
                    className={`${
                      data.status === "GOOD"
                        ? "bg-blue-300"
                        : data.status === "DAMAGED"
                        ? "bg-yellow-300"
                        : "bg-red-300"
                    } px-3 py-1 font-semibold rounded w-fit`}
                  >
                    {data.status}
                  </p>
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
