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
