import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";
import { eq } from "drizzle-orm";
import { clarityOrders } from "@clarity/core/database/model/clarity/orders.model";
import { createOrderInContract, verifyOrderPayment } from "src/ethers/contract";
import got from "got";

import { contract as merchantContract } from "@clarity/merchant-backend/contract";
import { z } from "zod";
const merchantOrderUpdateResponse = merchantContract.createOrder.responses["200"];
type MerchantOrderUpdateResponse = z.infer<typeof merchantOrderUpdateResponse>;

const merchantOrderUpdateBody = merchantContract.orderStatusUpdate.body;
type MerchantOrderUpdateBody = z.infer<typeof merchantOrderUpdateBody>;

// This is called by Clarity SDK once the transaction has gone through in the browser. This confirms with contract that the order has been paid
// takes in order ID
export const main = handler(
  async (request) => {
    const orderId = request.body.orderId;
    const order = await db.query.clarityOrders.findFirst({
      where: eq(clarityOrders.id, orderId),
      with: { merchant: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const orderPayment = await verifyOrderPayment(orderId);
    console.log("orderPayment", orderPayment);

    if (orderPayment.merchantId !== order.merchantId) {
      throw new Error("Invalid order");
    }

    if (!orderPayment.isPaid) {
      throw new Error("Payment not completed");
    }

    const updatedOrders = await db
      .update(clarityOrders)
      .set({ status: "PAID", payeeAddress: orderPayment.payee })
      .where(eq(clarityOrders.id, orderId))
      .returning();

    const updatedOrder = updatedOrders[0];

    const webhookResponse = await got
      .post(`${order.merchant.webhookUrl}/order-status-update`, {
        body: JSON.stringify({
          orderId: updatedOrder.id,
          status: updatedOrder.status,
        } as MerchantOrderUpdateBody),
        throwHttpErrors: false,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${order.merchant.apiKeyForMerchant}`,
        },
      })
      .json<MerchantOrderUpdateResponse>();

    console.log("webhook response", webhookResponse);

    return {
      statusCode: 200 as const,
      body: updatedOrder,
    };
  },
  { schema: contract.confirmOrderPayment }
);
