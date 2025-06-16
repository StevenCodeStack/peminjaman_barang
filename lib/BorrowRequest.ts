"use server";
import prisma from "@/config/PrismaClient";
import { BorrowRequestStatus, Item } from "@prisma/client";
import { createBorrowAction } from "@/app/actions/Borrow";

export async function createBorrowRequest(item: Item, userId: string) {
  await prisma.$transaction(async (prisma) => {
    await prisma.borrowRequest.create({
      data: {
        item: { connect: { id: item.id } },
        user: { connect: { id: userId } },
      },
    });

    await prisma.item.update({
      where: { id: item.id },
      data: { isAvailable: false },
    });
  });
}

export async function handleBorrowRequest(
  borrowRequestId: string,
  status: BorrowRequestStatus
) {
  await prisma.$transaction(async (prisma) => {
    const data = await prisma.borrowRequest.update({
      where: { id: borrowRequestId, status: "PENDING" },
      data: { status },
    });

    if (status === "APPROVED") {
      await createBorrowAction(data.itemId, data.userId);
    } else if (status === "REJECTED") {
      await prisma.item.update({
        where: { id: data.itemId },
        data: {
          isAvailable: true,
        },
      });
    }
  });
  return { success: true };
}
