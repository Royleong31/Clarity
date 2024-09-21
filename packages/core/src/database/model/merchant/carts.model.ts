import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAndUpdatedAt, uuidGen } from "../../utils";
import { relations } from "drizzle-orm";
import { merchantOrders } from "./orders.model";

export const merchantCarts = pgTable("merchant_carts", {
  id: uuid("id").primaryKey().default(uuidGen()),

  ...createdAndUpdatedAt,
});

export const merchantCartsRelationships = relations(merchantCarts, ({ many, one }) => ({
  orders: many(merchantOrders),
}));
