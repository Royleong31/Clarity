import { db } from "@clarity/core/database/client";
import { merchantOrders } from "@clarity/core/database/model/merchant/orders.model";
import handler from "@clarity/core/handler";
import { eq } from "drizzle-orm";

import { contract } from "src/contract";

export const main = handler(
  async (request) => {
    const order = await db.query.clarityOrders.findFirst({
      where: eq(merchantOrders.id, request.pathParams.orderId),
    });

    if (!order) {
      return {
        statusCode: 404 as const,
        body: "Order not found",
      };
    }

    return {
      statusCode: 200 as const,
      body: order,
    };
  },
  { schema: contract.orderStatus }
);
