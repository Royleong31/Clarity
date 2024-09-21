import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { MerchantSchema } from "../../core/src/database/schema/merchant.schema";
import { clarityOrderStatus } from "../../core/src/database/model/clarity/orders.model";

const c = initContract();

export const contract = c.router({
  home: {
    method: "GET",
    path: "/",
    responses: {
      200: z.object({
        body: z.string(),
      }),
      400: z.object({
        error: z.string(),
      }),
    },
    summary: "Dummy home",
  },

  createOrder: {
    method: "POST",
    path: "/create-order",
    body: z.object({ cartId: z.string().uuid() }),
    responses: {
      200: MerchantSchema.selectOrders,
    },
    description:
      "Pass in cart ID, backend will generate the amount and store orderId in contract. OrderID is idempotency key. Once stored, it will return the order object to FE. FE can use amount to get RFQ from 1Inch and use orderId to pay in contract",
  },

  orderStatus: {
    method: "GET",
    path: "/order/{orderId}",
    pathParams: z.object({
      orderId: z.string().uuid(),
    }),
    responses: {
      200: MerchantSchema.selectOrders,
      404: z.string(),
    },
  },

  orderStatusUpdate: {
    method: "POST",
    path: "/order-status-update",
    body: z.object({
      orderId: z.string().uuid(),
      status: z.enum(clarityOrderStatus),
    }),
    responses: {
      200: z.literal("OK"),
    },
    description:
      "Webhook received from clarity backend. It will update the order status in the contract. It will also store the transaction hash in the contract and the status. For example it can be failed if the order was rejected",
  },

  openApi: {
    method: "GET",
    path: "/openapi",
    responses: {
      200: z.any(),
    },
  },
});
