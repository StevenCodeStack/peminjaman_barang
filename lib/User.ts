"use server";
import prisma from "@/config/PrismaClient";
import { ClerkWebhookEvent } from "@/types/types";
import { isNullOrEmpty } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { UserFriendlyError } from "./error";

export async function createUser(data: ClerkWebhookEvent["data"]) {
  const firstName = data.first_name || "";
  const lastName = data.last_name || "";
  try {
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        fullName: firstName + lastName,
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
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(data: ClerkWebhookEvent["data"]) {
  try {
    await prisma.user.update({
      where: { id: data.id },
      data: {
        fullName: data.first_name + " " + data.last_name,
        picture: data.image_url,
        username: data.username,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserName(data: FormData, userId: string) {
  try {
    const nik = data.get("nik") as string;
    const classUser = data.get("class") as string;
    const major = data.get("major") as string;

    if (isNullOrEmpty(nik) || isNullOrEmpty(classUser) || isNullOrEmpty(major))
      throw new UserFriendlyError("Please fill all of the fields");

    if (nik.length !== 4 || classUser.length > 30 || major.length > 50) {
      throw new UserFriendlyError("Enter a valid value!");
    }

    await prisma.student.create({
      data: {
        class: classUser,
        major,
        nik,
        user: { connect: { id: userId } },
      },
    });
  } catch (e) {
    console.log(e);
    throw new UserFriendlyError("Unexpected Error");
  }
}
