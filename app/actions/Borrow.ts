"use server";
import prisma from "@/config/PrismaClient";
import { createBorrowRequest } from "@/lib/Borrow";
import {
  BorrowLimitError,
  ItemUnavailableError,
  UnAuthorized,
  UserNotSignedIn,
} from "@/lib/error";
import { auth } from "@clerk/nextjs/server";
import { Item } from "@prisma/client";

export async function createBorrowRequestAction(item: Item) {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata.role;
  if (!userId) {
    throw new UserNotSignedIn();
  }

  if (role !== "student") {
    throw new UnAuthorized();
  }

  if (!item.isAvailable) {
    throw new ItemUnavailableError();
  }

  const data = await prisma.borrow.count({
    where: {
      studentId: userId,
      active: true,
    },
  });
  if (data > 3) {
    throw new BorrowLimitError();
  }

  await createBorrowRequest(item, userId);
}
