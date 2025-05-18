import { createUser } from "@/lib/User";
import { ClerkWebhookEvent } from "@/types/types";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = (await verifyWebhook(req)) as unknown as ClerkWebhookEvent;
    console.log(evt);
    const eventType = evt.type;

    switch (eventType) {
      case "user.created":
        console.log("createUser");
        createUser(evt.data);
        break;
      case "user.updated":
        console.log("update");
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
