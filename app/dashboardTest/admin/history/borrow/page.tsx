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

const page = async () => {
  const data = (await prisma.borrow.findMany({
    where: {
      active: false,
    },
    select: {
      item: {
        select: {
          name: true,
          category: true,
        },
      },
      user: {
        select: {
          fullName: true,
          email: true,
          student: {
            select: {
              nik: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })) as BorrowWithItem[];
  console.log(data);
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
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead className="text-right">Borrow At</TableHead>
              <TableHead className="text-right">Returned At</TableHead>
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
                <TableCell className="text-right">
                  {dateFormat(data.returnDate)}
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
