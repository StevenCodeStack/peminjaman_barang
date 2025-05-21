"use client";
import { handleBorrowRequestAction } from "@/app/actions/BorrowRequest";
import { BorrowRequestStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const ActionButtons = ({ borrowRequestId }: { borrowRequestId: string }) => {
  const router = useRouter();
  async function handleClick(status: BorrowRequestStatus) {
    try {
      await handleBorrowRequestAction(borrowRequestId, status);
      toast("Success");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast("Failed : " + error.message);
    }
  }
  return (
    <div className="flex justify-center gap-5 px-3">
      <button
        onClick={() => handleClick("APPROVED")}
        className="bg-green-400 rounded-full p-1"
      >
        <FaCheck className="font-bold" />
      </button>
      <button
        onClick={() => handleClick("REJECTED")}
        className="bg-red-400 rounded-full p-1"
      >
        <IoClose className="font-black" />
      </button>
    </div>
  );
};

export default ActionButtons;
