import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";
import { clarityMerchants } from "@clarity/core/database/model/clarity/merchants.model";
import { merchantCarts } from "@clarity/core/database/model/merchant/carts.model";
import { merchantOrders } from "@clarity/core/database/model/merchant/orders.model";
import got, { Delays } from "got";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { contract as clarityContract } from "@clarity/clarity-backend/contract";
const clarityCreateOrderResponse = clarityContract.createOrder.responses["200"];
type ClarityCreateOrderResponse = z.infer<typeof clarityCreateOrderResponse>;

const clarityCreateOrderBody = clarityContract.createOrder.body;
type ClarityCreateOrderBody = z.infer<typeof clarityCreateOrderBody>;

const CART_AMOUNT = "0.10"; // TODO: Derive this from sum of cart_items.quantity * item.price

// This is called when the user clicks Pay on the merchant website, it creates and stores the order with the amount. And calls createOrder in clarityBackend with the orderId as idempotency key and also stores the status as pending.
// takes in cart id. But cart id isn't created beforehand(but should be in real case). Store cart id with order ID with order status pending
export const main = handler(
  async (request) => {
    // TODO: Authentication cookie/token from user's browser to create an order
    const cartId = request.body.cartId;

    const createdOrder = await db.transaction(async (db) => {
      const insertedCarts = await db.insert(merchantCarts).values({ id: cartId }).returning();
      const insertedOrders = await db
        .insert(merchantOrders)
        .values({ cartId: insertedCarts[0].id, status: "CREATED", amount: CART_AMOUNT })
        .returning();

      return insertedOrders[0];
    });

    console.log("createdOrder", createdOrder);

    let clarityResponseStatus: ClarityCreateOrderResponse["status"];

    try {
      console.log({
        orderId: createdOrder.id,
        amount: createdOrder.amount,
      });

      const clarityResponse = await got
        .post(`${Resource.ClarityApi.url}/create-order`, {
          body: JSON.stringify({
            orderId: createdOrder.id,
            amount: createdOrder.amount,
          } as ClarityCreateOrderBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Resource.ClarityApiKey.value}`,
          },
          throwHttpErrors: false,
        })
        .json<ClarityCreateOrderResponse>();

      console.log("clarity response", clarityResponse);

      clarityResponseStatus = clarityResponse.status;
    } catch (error) {
      console.log("error", error);
      await db
        .update(merchantOrders)
        .set({ status: "FAILED" })
        .where(eq(merchantOrders.id, createdOrder.id));

      throw error;
    }

    if (clarityResponseStatus === "PENDING") {
      const updateResult = await db
        .update(merchantOrders)
        .set({ status: "PENDING" })
        .where(eq(merchantOrders.id, createdOrder.id))
        .returning();

      const updatedOrder = updateResult[0];

      console.log("updated order", updatedOrder);

      if (updatedOrder) {
        return {
          statusCode: 200 as const,
          body: updatedOrder,
        };
      }
    } else if (clarityResponseStatus === "PAID") {
      await db
        .update(merchantOrders)
        .set({ status: "PAID" })
        .where(eq(merchantOrders.id, createdOrder.id));

      throw new Error("Order has already been paid");
    } else if (clarityResponseStatus === "FAILED") {
      await db
        .update(merchantOrders)
        .set({ status: "FAILED" })
        .where(eq(merchantOrders.id, createdOrder.id));

      throw new Error("Order creation failed");
    }

    throw new Error("Unknown error");
  },
  { schema: contract.createOrder }
);
