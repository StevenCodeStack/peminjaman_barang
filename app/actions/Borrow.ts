"use server";

import prisma from "@/config/PrismaClient";
import { createBorrow } from "@/lib/Borrow";

export async function createBorrowAction(itemId: string, userId: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      const existingBorrow = await prisma.borrow.findFirst({
        where: { itemId, active: true, returnDate: null },
      });
      if (existingBorrow)
        return { success: false, messasge: "Item is already borrowed!" };

      await createBorrow(itemId, userId);
      return { success: true };
    });
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
  }
  return { success: false, message: "Unexpected Error!" };
}
