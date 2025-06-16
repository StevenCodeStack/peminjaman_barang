"use server";
import prisma from "@/config/PrismaClient";
import { ClerkWebhookEvent } from "@/types/types";
import { isNullOrEmpty } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

export async function createUser(data: ClerkWebhookEvent["data"]) {
  const firstName = data.first_name || "";
  const lastName = data.last_name || "";

  await prisma.user.create({
    data: {
      id: data.id,
      email: data.email_addresses[0].email_address,
      fullName: firstName + " " + lastName,
      username: data.username,
      picture: data.image_url,
      role: "STUDENT",
    },
  });
  const client = await clerkClient();
  client.users.updateUserMetadata(data.id, {
    publicMetadata: {
      role: "student",
    },
  });
}

export async function updateUser(data: ClerkWebhookEvent["data"]) {
  const firstName = data.first_name || "";
  const lastName = data.last_name || "";
  await prisma.user.update({
    where: { id: data.id },
    data: {
      fullName: firstName + " " + lastName,
      picture: data.image_url,
      username: data.username,
    },
  });
}

export async function updateUserName(data: FormData, userId: string) {
  const nik = data.get("nik") as string;
  const classUser = data.get("class") as string;
  const major = data.get("major") as string;

  if (isNullOrEmpty(nik) || isNullOrEmpty(classUser) || isNullOrEmpty(major))
    return { success: false, message: "Fill all the fields!" };

  if (nik.length !== 4 || classUser.length > 30 || major.length > 50) {
    return { success: false, message: "Enter a valid data!" };
  }

  await prisma.student.create({
    data: {
      class: classUser,
      major,
      nik,
      user: { connect: { id: userId } },
    },
  });
  return { success: true };
}
