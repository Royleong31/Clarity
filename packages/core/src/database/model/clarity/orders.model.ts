import {
  boolean,
  inet,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAndUpdatedAt, uuidGen } from "../../utils";
import { relations } from "drizzle-orm";
import { clarityMerchants } from "./merchants.model";

export const clarityOrderStatus = ["CREATED", "PENDING", "PAID", "FAILED"] as const;

export const clarityOrders = pgTable("clarity_orders", {
  id: uuid("id").primaryKey().default(uuidGen()), // received from merchant API. Used as idempotency key
  amount: numeric("amount").notNull(),
  merchantId: integer("merchant_id")
    .notNull()
    .references(() => clarityMerchants.id),

  status: text("status", { enum: clarityOrderStatus }).notNull(),
  payeeAddress: text('payee_address'),

  ...createdAndUpdatedAt,
});

export const clarityOrdersRelationships = relations(clarityOrders, ({ one }) => ({
  merchant: one(clarityMerchants, {
    fields: [clarityOrders.merchantId],
    references: [clarityMerchants.id],
  }),
}));
