import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";
import { createOrderInContract } from "src/ethers/contract";
import { clarityOrders } from "@clarity/core/database/model/clarity/orders.model";
import { eq } from "drizzle-orm";
import { clarityMerchants } from "@clarity/core/database/model/clarity/merchants.model";
import BigNumber from "bignumber.js";

//Clarity backend will update clarity smart contract with orderID, merchantID and amount. It takes in orderID and API key from merchant to identify the merchant
export const main = handler(
  async (request) => {
    const body = request.body;
    const apiKey = request.headers.authorization?.split(" ")[1];

    if (!apiKey) {
      throw new Error("UNAUTHENTICATED");
    }

    const merchant = await db.query.clarityMerchants.findFirst({
      where: eq(clarityMerchants.merchantApiKey, apiKey),
    });

    if (!merchant) {
      throw new Error("INVALID API KEY");
    }

    const existingOrder = await db.query.clarityOrders.findFirst({
      where: eq(clarityOrders.id, body.orderId),
    });

    // idempotency check
    if (existingOrder) {
      return { statusCode: 200 as const, body: existingOrder }; // DO NOT CREATE ORDER IN CONTRACT AGAIN
    }

    const insertedOrder = (
      await db
        .insert(clarityOrders)
        .values({
          merchantId: merchant.id,
          amount: body.amount,
          status: "CREATED",
          id: body.orderId,
        })
        .returning()
    )[0];

    try {
      const orderCreation = await createOrderInContract(
        insertedOrder.id,
        merchant.id,
        BigNumber(insertedOrder.amount)
      );
      console.log("order creation", orderCreation);

      if (!orderCreation.transactionHash) {
        console.log('transaction hash missing');
        throw new Error("failed to create order in contract");
      }

      const updateResult = await db
        .update(clarityOrders)
        .set({
          status: "PENDING",
        })
        .where(eq(clarityOrders.id, insertedOrder.id))
        .returning();

      const order = updateResult[0];

      if (!order) {
        console.log("failed to create order");
        throw new Error("Failed to create order");
      }

      console.log("order creation in clarity succeeded");
      return {
        statusCode: 200 as const,
        body: order,
      };
    } catch (error) {
      console.log("error", error);
      const updateResult = await db
        .update(clarityOrders)
        .set({
          status: "FAILED",
        })
        .where(eq(clarityOrders.id, insertedOrder.id))
        .returning();

      throw error;
    }
  },
  { schema: contract.createOrder }
);
