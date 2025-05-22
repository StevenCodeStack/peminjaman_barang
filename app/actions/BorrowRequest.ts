"use server";
import prisma from "@/config/PrismaClient";
import {
  BorrowLimitError,
  ItemUnavailableError,
  NotFound,
  UnAuthorized,
  UserFriendlyError,
  UserNotSignedIn,
} from "@/lib/error";
import { createBorrowRequest, handleBorrowRequest } from "@/lib/BorrowRequest";
import { BorrowRequestStatus, Item } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function handleBorrowRequestAction(
  borrowRequestId: string,
  status: BorrowRequestStatus
) {
  try {
    const data = await prisma.borrowRequest.findFirst({
      where: { id: borrowRequestId, status: "PENDING" },
    });
    if (!data) throw new NotFound();
    await handleBorrowRequest(data.id, status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new UserFriendlyError("Error : " + error.message);
    }
    throw new UserFriendlyError("Unexpected Error");
  }
}

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
  if (data >= (process.env.MAXIMUM_BORROW as unknown as number)) {
    throw new BorrowLimitError();
  }

  await createBorrowRequest(item, userId);
}
