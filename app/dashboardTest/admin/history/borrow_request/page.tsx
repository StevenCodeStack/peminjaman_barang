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
import { BorrowRequestWithItem } from "@/types/types";

const page = async () => {
  const data = (await prisma.borrowRequest.findMany({
    where: { NOT: { status: "PENDING" } },
    select: {
      user: {
        select: {
          email: true,
          fullName: true,
          student: {
            select: {
              nik: true,
            },
          },
        },
      },
      item: true,
      status: true,
      createdAt: true,
      id: true,
    },
    orderBy: { createdAt: "desc" },
  })) as BorrowRequestWithItem[];

  return (
    <div className="px-5 md:px-20 lg:px-5 xl:px-20 flex flex-col">
      <h1 className="text-center font-bold text-2xl py-8">
        Borrow Request History
      </h1>
      <div className="w-[90dvw] md:w-full overflow-x-auto">
        <Table>
          <TableCaption>A list of Borrow Request History</TableCaption>
          <TableHeader className="bg-slate-200 ">
            <TableRow>
              <TableHead className="">NIK</TableHead>
              <TableHead className="">Student</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-right">Borrow At</TableHead>
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
                  <p
                    className={`${
                      data.status === "APPROVED" ? "bg-green-300" : "bg-red-300"
                    } px-2 rounded h-fit font-semibold w-fit py-1`}
                  >
                    {data.status}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  {dateFormat(data.createdAt)}
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
