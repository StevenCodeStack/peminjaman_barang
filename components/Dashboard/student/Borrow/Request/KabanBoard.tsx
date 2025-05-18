import React from "react";
import prisma from "@/config/PrismaClient";
import { BorrowRequestWithItem } from "@/types/types";
import KabanCard from "./KabanCard";
import { auth } from "@clerk/nextjs/server";

const KabanBoard = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const requests: BorrowRequestWithItem[] = await prisma.borrowRequest.findMany(
    {
      where: {
        studentId: userId,
      },
      include: {
        item: true,
      },
    }
  );
  const statusGroups = {
    PENDING: requests.filter((r) => r.status === "PENDING"),
    APPROVED: requests.filter((r) => r.status === "APPROVED"),
    REJECTED: requests.filter((r) => r.status === "REJECTED"),
  };

  return (
    <>
      {Object.entries(statusGroups).map(([status, group]) => (
        <div key={status} className="border h-fit rounded-lg overflow-hidden">
          <div
            className={`p-3 border-b font-medium ${
              status === "PENDING"
                ? "bg-yellow-200"
                : status === "APPROVED"
                ? "bg-green-200"
                : "bg-red-200"
            }`}
          >
            {status} ({group.length})
          </div>
          <div className="p-3 space-y-3 bg-white h-full">
            {group.map((request) => (
              <KabanCard request={request} key={request.id} status={status} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default KabanBoard;
