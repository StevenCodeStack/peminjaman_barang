"use server";
import prisma from "@/config/PrismaClient";
import { UnAuthorized, UserFriendlyError } from "@/lib/error";
import { createItem, updateItem } from "@/lib/Item";
import { isNullOrEmpty } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export async function createItemAction(
  data: FormData,
  pictureUrl: string | null
) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata.role !== "admin") {
    throw new UnAuthorized();
  }

  if (!pictureUrl) throw new UserFriendlyError("Upload an image");

  const name = data.get("name") as string;
  const type = data.get("type") as string;
  const category = data.get("category") as string;
  const status = (data.get("status") as string) === "active";

  if (isNullOrEmpty(name) || isNullOrEmpty(type) || isNullOrEmpty(category)) {
    throw new UserFriendlyError("Fill all the fields");
  }

  await createItem({ name, type, category, status, pictureUrl });
}

export async function updateItemAction(
  data: FormData,
  pictureUrl: string | null
) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata.role !== "admin") {
    throw new UnAuthorized();
  }

  if (!pictureUrl) throw new UserFriendlyError("Upload an image");

  const id = data.get("id") as string;
  const name = data.get("name") as string;
  const type = data.get("type") as string;
  const category = data.get("category") as string;
  const status = data.get("status") as string;

  if (!id) {
    throw new UserFriendlyError("Failed to update, id is not defined");
  }

  if (isNullOrEmpty(name) || isNullOrEmpty(type) || isNullOrEmpty(category)) {
    throw new UserFriendlyError("Fill all the fields");
  }

  const haveBorrow = await prisma.borrow.findFirst({
    where: { item: { id: id }, active: true, returnDate: null },
  });
  if (haveBorrow) {
    throw new UserFriendlyError("Unable to update, Item is borrowed");
  }

  await updateItem({ id, name, type, category, status, pictureUrl });
}
