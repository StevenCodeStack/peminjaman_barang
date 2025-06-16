"use server";
import prisma from "@/config/PrismaClient";
import { createBorrowRequest, handleBorrowRequest } from "@/lib/BorrowRequest";
import { BorrowRequestStatus, Item } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserStudent } from "@/types/types";

export async function handleBorrowRequestAction(
  borrowRequestId: string,
  status: BorrowRequestStatus
) {
  try {
    const data = await prisma.borrowRequest.findFirst({
      where: { id: borrowRequestId, status: "PENDING" },
    });
    if (!data) return { success: false, message: "Data is not found!" };
    await handleBorrowRequest(data.id, status);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unexpected Error" };
  }
}

export async function createBorrowRequestAction(item: Item) {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata.role;

  if (!userId) {
    return { success: false, message: "Login First!" };
  }

  if (role !== "student") {
    return { success: false, message: "UnAuthorized!" };
  }

  const user = (await prisma.user.findUnique({
    where: { id: userId },
    include: { student: true },
  })) as UserStudent;

  if (!user) {
    return { success: false, message: "User Not Found!" };
  }

  if (user.student?.warning >= 5) {
    return {
      success: false,
      message:
        "You have reached the maximum warning limit (5). Borrowing is temporarily disabled.",
    };
  }

  if (user.student === null) {
    return redirect("/complete_profile");
  }
  if (!item.isAvailable) {
    return { success: false, message: "Item is not available" };
  }

  try {
    const borrowRequestData = await prisma.borrowRequest.count({
      where: { userId, status: "PENDING" },
    });

    const borrowData = await prisma.borrow.count({
      where: {
        userId,
        active: true,
      },
    });
    if (
      borrowRequestData + borrowData >=
      (process.env.MAXIMUM_BORROW as unknown as number)
    ) {
      return { success: false, message: "Borrow Limit Exceeded!" };
    }

    await createBorrowRequest(item, userId);
    return { success: true };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
  }
  return { success: false, message: "Unexpected Error!" };
}
