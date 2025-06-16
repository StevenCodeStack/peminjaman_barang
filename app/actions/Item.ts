"use server";
import prisma from "@/config/PrismaClient";
import { createItem, updateItem } from "@/lib/Item";
import { isNullOrEmpty } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export async function createItemAction(
  data: FormData,
  pictureUrl: string | null
) {
  try {
    const { sessionClaims } = await auth();
    if (sessionClaims?.metadata.role !== "admin") {
      return { success: false, message: "UnAuthorized!" };
    }

    if (!pictureUrl) return { success: false, message: "Upload an image!" };

    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const category = data.get("category") as string;
    const status = (data.get("status") as string) === "active";

    if (isNullOrEmpty(name) || isNullOrEmpty(type) || isNullOrEmpty(category)) {
      return { success: false, message: "Fill all the fields!" };
    }

    await createItem({ name, type, category, status, pictureUrl });
    return { success: true };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
  }
  return { success: false, message: "Unexpected Error!" };
}

export async function updateItemAction(
  data: FormData,
  pictureUrl: string | null
) {
  try {
    const { sessionClaims } = await auth();
    if (sessionClaims?.metadata.role !== "admin") {
      return { success: false, message: "UnAuthorized!" };
    }

    if (!pictureUrl) return { success: false, message: "Upload an image!" };

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const category = data.get("category") as string;
    const status = data.get("status") as string;

    if (!id) {
      return {
        success: false,
        message: "Failed to update, Id is not defined!",
      };
    }

    if (isNullOrEmpty(name) || isNullOrEmpty(type) || isNullOrEmpty(category)) {
      return { success: false, message: "Fill all the fields!" };
    }

    const haveBorrow = await prisma.borrow.findFirst({
      where: { item: { id: id }, active: true, returnDate: null },
    });
    if (haveBorrow) {
      return {
        success: false,
        message: "Unable to update, item is currently borrowed!",
      };
    }

    await updateItem({ id, name, type, category, status, pictureUrl });
    return { success: true };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
  }
  return { success: false, message: "Unexpected Error!" };
}
