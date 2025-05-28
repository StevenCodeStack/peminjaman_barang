"use client";
import { handleBorrowRequestAction } from "@/app/actions/BorrowRequest";
import { BorrowRequestStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const ActionButtons = ({ borrowRequestId }: { borrowRequestId: string }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  async function handleClick(status: BorrowRequestStatus) {
    setSubmitting(true);
    try {
      await handleBorrowRequestAction(borrowRequestId, status);
      toast("Success");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast("Failed : " + error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="flex justify-center gap-5 px-3">
      <button
        onClick={() => handleClick("APPROVED")}
        disabled={submitting}
        className="bg-green-400 rounded-full p-1 disabled:bg-green-200"
      >
        <FaCheck className="font-bold" />
      </button>
      <button
        disabled={submitting}
        onClick={() => handleClick("REJECTED")}
        className="bg-red-400 rounded-full p-1 disabled:bg-red-200"
      >
        <IoClose className="font-black" />
      </button>
    </div>
  );
};

export default ActionButtons;
