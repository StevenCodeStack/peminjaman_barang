"use server";
import prisma from "@/config/PrismaClient";
import { BorrowRequest, Item, Prisma } from "@prisma/client";
import { generateCode } from "./tools";

export type BorrowRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export async function getBorrow(
  where?: Prisma.BorrowWhereInput,
  include?: Prisma.BorrowInclude
) {
  return await prisma.borrow.findMany({
    where,
    include,
  });
}

export async function createBorrowRequest(item: Item, userId: string) {
  await prisma.$transaction(async (prisma) => {
    await prisma.borrowRequest.create({
      data: {
        item: { connect: { id: item.id } },
        student: { connect: { id: userId } },
      },
    });

    await prisma.item.update({
      where: { id: item.id },
      data: { isAvailable: false },
    });
  });
}

export async function handleBorrowRequest(
  borrowRequest: BorrowRequest,
  status: BorrowRequestStatus
) {
  await prisma.$transaction(async (prisma) => {
    await prisma.borrowRequest.update({
      where: { id: borrowRequest.id },
      data: { status },
    });

    if (status === "APPROVED") {
      await createBorrow(borrowRequest.itemId, borrowRequest.studentId);
    }
  });
}

export async function createBorrow(itemid: string, userId: string) {
  await prisma.borrow.create({
    data: {
      item: { connect: { id: itemid } },
      student: { connect: { id: userId } },
      borrowCode: generateCode(6),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });
}
