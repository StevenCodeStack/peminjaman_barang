"use server";
import prisma from "@/config/PrismaClient";
import { NotFound } from "./error";
import { BorrowReturnStatus } from "@prisma/client";

export async function createBorrowReturn(
  borrowId: string,
  status: BorrowReturnStatus,
  adminNote?: string
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
        note: adminNote || null,
        borrow: { connect: { id: borrowId } },
      },
    });

    let incrementValue = 0;

    if (status === "DAMAGED") incrementValue++;
    if (borrow.dueDate < new Date()) incrementValue++;

    if (incrementValue > 0) {
      await prisma.user.update({
        where: { id: borrow.user.id },
        data: {
          student: {
            update: {
              warning: { increment: incrementValue },
            },
          },
        },
      });
    }

    await prisma.borrow.update({
      where: { id: borrowId },
      data: {
        active: false,
        returnDate: new Date(),
        item: {
          update: {
            isAvailable: status === "GOOD",
            isDamaged: status === "DAMAGED",
          },
        },
        borrowCode: null,
      },
    });
  });
}
