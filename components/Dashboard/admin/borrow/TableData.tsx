"use client";
import React, { useState } from "react";
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
import ActionButtons from "@/components/Dashboard/admin/borrow/ActionButtons";
import Popup from "@/components/ReuseableComponents/Popup";
import Button from "@/components/ReuseableComponents/Button";
import { Borrow, Item } from "@prisma/client";
import { UserStudent } from "@/types/types";
import { createBorrowReturn } from "@/lib/BorrowReturn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const TableData = ({
  data,
}: {
  data: (Borrow & { user: UserStudent; item: Item })[];
}) => {
  const [open, setOpen] = useState(false);
  const [borrowId, setBorrowId] = useState<string | null>(null);
  const router = useRouter();

  async function handleReturn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!borrowId) return;
    try {
      setOpen(false);
      const form = new FormData(e.currentTarget);
      const status = form.get("status") as "GOOD" | "DAMAGED";
      const adminNote = form.get("adminNote") as string;
      await createBorrowReturn(borrowId, status, adminNote);
      toast("Success");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast("Failed : " + error.message);
    } finally {
    }
  }

  return (
    <>
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
                <ActionButtons
                  approve={() => {
                    setOpen(true);
                    setBorrowId(data.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popup open={open}>
        <form
          onSubmit={handleReturn}
          className="p-10 py-8 bg-slate-900 text-white rounded-2xl h-120 w-120"
        >
          <h1 className="text-4xl font-bold">Detail</h1>
          <div className="w-full h-1 bg-white rounded-2xl my-4"></div>
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="">Status</label>
            <select
              name="status"
              className="bg-white rounded-2xl text-black font-semibold px-2 py-1 w-50"
            >
              <option value="GOOD">Good</option>
              <option value="DAMAGED">Damaged</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">Admin Note</label>
            <textarea
              name="adminNote"
              rows={5}
              className="bg-white rounded-2xl text-black px-3 py-1 font-semibold"
            ></textarea>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <button
              type="submit"
              className="w-fit px-6 py-1 font-semibold bg-white text-black rounded"
            >
              Submit
            </button>
            <Button
              variant="danger"
              click={() => setOpen(false)}
              text="Cancel"
            />
          </div>
        </form>
      </Popup>
    </>
  );
};

export default TableData;
