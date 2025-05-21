"use server";
import prisma from "@/config/PrismaClient";
import { NotFound, UserFriendlyError } from "@/lib/error";
import { handleBorrowRequest } from "@/lib/BorrowRequest";
import { BorrowRequestStatus } from "@prisma/client";

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
