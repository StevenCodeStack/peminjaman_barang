"use server";
import prisma from "@/config/PrismaClient";

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
  if (!item) return { success: false, message: "Item is not found!" };

  const isBorrowed = await prisma.borrow.findFirst({
    where: { active: true, itemId },
  });
  if (isBorrowed)
    return { success: false, message: "Item is currently borrowed!" };

  await prisma.item.delete({
    where: { id: itemId },
  });

  return { success: true };
}
