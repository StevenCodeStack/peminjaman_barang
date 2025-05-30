"use server";
import prisma from "@/config/PrismaClient";
import { UserFriendlyError } from "./error";

export async function createItem({
  name,
  type,
  category,
  status = false,
  pictureUrl,
}: {
  name: string;
  type: string;
  category: string;
  status: boolean;
  pictureUrl: string;
}) {
  await prisma.item.create({
    data: {
      name,
      type,
      category,
      isAvailable: status,
      picture: pictureUrl,
    },
  });
}
export async function updateItem({
  id,
  name,
  type,
  category,
  status,
  pictureUrl,
}: {
  id: string;
  name: string;
  type: string;
  category: string;
  status: string;
  pictureUrl: string;
}) {
  await prisma.item.update({
    where: { id },
    data: {
      name,
      type,
      category,
      isAvailable: status === "active",
      isDamaged: status === "damaged",
      picture: pictureUrl,
    },
  });
}

export async function deleteItem(itemId: string) {
  const item = await prisma.item.findFirst({
    where: { id: itemId },
  });
  if (!item) throw new UserFriendlyError("Item is not found!");

  const isBorrowed = await prisma.borrow.findFirst({
    where: { active: true, itemId },
  });
  if (isBorrowed) throw new UserFriendlyError("Item is borrowed currently!");

  await prisma.item.delete({
    where: { id: itemId },
  });
}
