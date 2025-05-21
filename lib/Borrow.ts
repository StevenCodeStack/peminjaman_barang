"use server";
import prisma from "@/config/PrismaClient";
import { generateCode } from "./tools";

export async function createBorrow(itemid: string, userId: string) {
  await prisma.borrow.create({
    data: {
      item: { connect: { id: itemid } },
      user: { connect: { id: userId } },
      borrowCode: generateCode(6),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });
}

export async function setBorrowInActive(itemId: string) {
  await prisma.borrow.update({
    where: { id: itemId },
    data: { active: false },
  });
}
