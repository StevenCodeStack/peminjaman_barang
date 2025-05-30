"use server";
import prisma from "@/config/PrismaClient";
import { BorrowRequestStatus, Item, Prisma } from "@prisma/client";
import { UserFriendlyError } from "./error";
import { createBorrowAction } from "@/app/actions/Borrow";

export async function createBorrowRequest(item: Item, userId: string) {
  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new UserFriendlyError("You borrowed this item already");
      }
    }
  }
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
}
