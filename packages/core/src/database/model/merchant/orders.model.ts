import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAndUpdatedAt, uuidGen } from "../../utils";
import { relations } from "drizzle-orm";
import { merchantCarts } from "./carts.model";

// created once we receive createOrder API from merchant website
// pending once we receive confirmation from clarity backend that the orderId has been added to contract
// paid once we receive orderStatusUpdate from clarity backend once the order has been paid

// failed and revoked just in case
export const merchantOrderStatus = ["CREATED", "PENDING", "PAID", "FAILED", "REVOKED"] as const;

export const merchantOrders = pgTable("merchant_orders", {
  id: uuid("id").primaryKey().default(uuidGen()),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => merchantCarts.id),
  amount: numeric("amount").notNull(), // amount to be calculated dynamically based on the items in the cart
  status: text("status", { enum: merchantOrderStatus }).notNull(),

  ...createdAndUpdatedAt,
});
// TODO: Unique constraint on cartId and status = SUCCESS. If multiple, then we need to handle refunds

export const usersRelationships = relations(merchantOrders, ({ many, one }) => ({
  cart: one(merchantCarts, {
    fields: [merchantOrders.cartId],
    references: [merchantCarts.id],
  }),
}));
