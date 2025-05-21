"use server";
import prisma from "@/config/PrismaClient";
import { createBorrowRequest } from "@/lib/BorrowRequest";
import {
  BorrowLimitError,
  ItemUnavailableError,
  UnAuthorized,
  UserFriendlyError,
  UserNotSignedIn,
} from "@/lib/error";
import { auth } from "@clerk/nextjs/server";
import { Item } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createBorrowRequestAction(item: Item) {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata.role;

  if (!userId) {
    throw new UserNotSignedIn();
  }

  if (role !== "student") {
    throw new UnAuthorized();
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { student: true },
  });

  if (!user) {
    throw new UserFriendlyError("User Not Found");
  }

  if (user.student === null) {
    return redirect("/complete_profile");
  }
  if (!item.isAvailable) {
    throw new ItemUnavailableError();
  }

  const data = await prisma.borrow.count({
    where: {
      userId,
      active: true,
    },
  });
  if (data >= 3) {
    throw new BorrowLimitError();
  }

  await createBorrowRequest(item, userId);
}
