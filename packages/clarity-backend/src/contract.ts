import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ClaritySchema } from "../../core/src/database/schema/clarity.schema";

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

  verifyWorldIdProof: {
    method: "GET",
    path: "/verify-world-id-proof",
    query: z.object({ proof: z.string(), merkleRoot: z.string(), nullifierHash: z.string() }),
    responses: {
      200: z.boolean(),
    },
  },

  createOrder: {
    method: "POST",
    path: "/create-order",
    body: z.object({ orderId: z.string().uuid(), amount: z.string() }),
    responses: {
      200: ClaritySchema.selectOrders,
    },
    description:
      "This is called by merchants backend with API key to authenticate and identify the merchant. It will create a new order in the clarity contract. orderId acts as an idempotency key so that repeated requests with the same orderId will not create a new order.",
  },

  orderStatus: {
    method: "GET",
    path: "/order/{orderId}",
    pathParams: z.object({
      orderId: z.string().uuid(),
    }),
    responses: {
      200: ClaritySchema.selectOrders,
      404: z.string(),
    },
  },

  getProxy: {
    method: "GET",
    path: "/proxy",
    query: z.any(), // requires url query parameter.
    responses: {
      200: z.any(),
      400: z.any(),
      404: z.any(),
      500: z.any(),
      501: z.any(),
    },
    headers: z.any(),
  },

  confirmOrderPayment: {
    method: "POST",
    path: "/confirm-order-payment",
    body: z.object({ orderId: z.string().uuid() }),
    responses: {
      200: ClaritySchema.selectOrders,
    },
    description: "",
  },

  openApi: {
    method: "GET",
    path: "/openapi",
    responses: {
      200: z.any(),
    },
  },
});
