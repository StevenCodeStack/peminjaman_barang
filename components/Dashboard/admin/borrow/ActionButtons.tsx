"use client";
import { createBorrowReturn } from "@/lib/BorrowReturn";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ActionButtons = ({ borrowId }: { borrowId: string }) => {
  const router = useRouter();
  async function handleClick() {
    try {
      await createBorrowReturn(borrowId, "GOOD");
      toast("Success");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast("Failed : " + error.message);
    }
  }
  return (
    <div className="flex justify-center gap-5 px-3">
      <button
        onClick={() => handleClick()}
        className="bg-green-400 rounded font-semibold px-2 p-1"
      >
        Return
      </button>
    </div>
  );
};

export default ActionButtons;
