import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";
import { eq } from "drizzle-orm";
import { clarityOrders } from "@clarity/core/database/model/clarity/orders.model";
import { merchantOrders } from "@clarity/core/database/model/merchant/orders.model";

// Webhook from clarity backend to update order status
export const main = handler(
  async (request) => {
    console.log("inside webhook for order status update");
    const apiKey = request.headers.authorization?.split(" ")[1];
    if (!apiKey) {
      throw new Error("UNAUTHENTICATED");
    }

    if (apiKey !== Resource.WebhookApiKey.value) {
      throw new Error("Invalid API key");
    }

    const order = await db.query.merchantOrders.findFirst({
      where: eq(merchantOrders.id, request.body.orderId),
    });

    console.log("order", order);

    if (!order) {
      throw new Error("Order not found");
    }

    if (request.body.status === "PAID" || request.body.status === "FAILED") {
      await db
        .update(merchantOrders)
        .set({
          status: request.body.status,
        })
        .where(eq(merchantOrders.id, request.body.orderId))
        .returning();
    }

    return {
      statusCode: 200 as const,
      body: "OK" as const,
    };
  },
  { schema: contract.orderStatusUpdate }
);
