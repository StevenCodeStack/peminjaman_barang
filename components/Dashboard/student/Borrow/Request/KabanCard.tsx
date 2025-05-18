"use client";
import Button from "@/components/ReuseableComponents/Button";
import { BorrowRequestWithItem } from "@/types/types";
import React from "react";

const KabanCard = ({
  request,
  status,
}: {
  request: BorrowRequestWithItem;
  status: string;
}) => {
  function handleCancel() {
    console.log("click");
  }
  return (
    <div key={request.id} className="border p-3 rounded bg-slate-50">
      <p className="font-medium">{request.item.name}</p>
      <p className="text-xs text-gray-400 mt-1">
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
