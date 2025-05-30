import { BorrowRequestWithItem } from "@/types/types";
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
import ActionButtons from "@/components/Dashboard/admin/borrowRequest/ActionButtons";

const TableData = ({ data }: { data: BorrowRequestWithItem[] }) => {
  return (
    <Table className="">
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
  );
};

export default TableData;
