import { createUser, updateUser } from "@/lib/User";
import { ClerkWebhookEvent } from "@/types/types";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = (await verifyWebhook(req)) as ClerkWebhookEvent;
    const eventType = evt.type;

    switch (eventType) {
      case "user.created":
        createUser(evt.data);
        break;
      case "user.updated":
        updateUser(evt.data);
        break;
      case "user.deleted":
        console.log("deleted");
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
