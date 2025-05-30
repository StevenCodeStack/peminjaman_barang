"use server";

import prisma from "@/config/PrismaClient";
import { createBorrow } from "@/lib/Borrow";
import { UserFriendlyError } from "@/lib/error";

export async function createBorrowAction(itemId: string, userId: string) {
  await prisma.$transaction(async (prisma) => {
    const existingBorrow = await prisma.borrow.findFirst({
      where: { itemId, active: true, returnDate: null },
    });
    if (existingBorrow)
      throw new UserFriendlyError("The item is already borrowed!");

    await createBorrow(itemId, userId);
  });
}
