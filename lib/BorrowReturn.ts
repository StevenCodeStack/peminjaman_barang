"use server";

import prisma from "@/config/PrismaClient";
import { NotFound } from "./error";
import { BorrowReturnStatus } from "@prisma/client";

export async function createBorrowReturn(
  borrowId: string,
  status: BorrowReturnStatus
) {
  const borrow = await prisma.borrow.findFirst({
    where: { id: borrowId, active: true },
    include: { user: { include: { student: true } }, item: true },
  });
  if (!borrow) throw new NotFound();

  await prisma.$transaction(async (prisma) => {
    await prisma.borrowReturn.create({
      data: {
        status,
        borrow: { connect: { id: borrowId } },
      },
    });
    await prisma.borrow.update({
      where: { id: borrowId },
      data: {
        active: false,
        returnDate: new Date(),
        item: { update: { isAvailable: true } },
      },
    });
  });
}
