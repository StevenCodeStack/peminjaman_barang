"use client";
import Button from "@/components/ReuseableComponents/Button";
import { handleBorrowRequest } from "@/lib/BorrowRequest";
import { BorrowRequestWithItem } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const KabanCard = ({
  request,
  status,
}: {
  request: BorrowRequestWithItem;
  status: string;
}) => {
  const router = useRouter();

  async function handleCancel() {
    try {
      const result = await handleBorrowRequest(request.id, "REJECTED");
      if (result.success) {
        toast("Success");
        router.refresh();
      } else {
        toast.error("Unexpected Error!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("Unexpected Error");
      }
    }
  }
  return (
    <div key={request.id} className="border p-3 rounded bg-slate-50">
      <p className="font-medium">{request.item.name}</p>
      <p className="text-sm text-slate-600 mt-1">
        {request.adminNote && "Admin Note:" + request.adminNote}
      </p>
      <p className="text-xs text-gray-400 mt-3">
        {new Date(request.createdAt).toLocaleDateString()}
      </p>
      {status === "PENDING" && (
        <div className="flex gap-2 mt-2">
          <Button click={handleCancel} text="Cancel" variant="danger" />
        </div>
      )}
    </div>
  );
};

export default KabanCard;
