import prisma from "@/config/PrismaClient";
import { ClerkWebhookEvent } from "@/types/types";
import { clerkClient } from "@clerk/nextjs/server";

export async function createUser(data: ClerkWebhookEvent["data"]) {
  try {
    await prisma.user.create({
      data: {
        email: data.email_addresses[0].email_address,
        fullName: data.first_name + " " + data.last_name,
        username: data.first_name,
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
