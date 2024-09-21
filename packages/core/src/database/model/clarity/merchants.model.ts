import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { createdAndUpdatedAt, uuidGen } from "../../utils";
import { relations } from "drizzle-orm";
import { clarityOrders } from "./orders.model";

export const clarityMerchants = pgTable("clarity_merchants", {
  id: serial("id").primaryKey(),
  merchantApiKey: text("merchant_api_key").notNull().unique(), // TODO: hash this. This is the api key that the merchant uses to authenticate with the clarity api
  apiKeyForMerchant: text("api_key_for_merchant").notNull().unique(), // TODO: encrypt this. This is the API key that clarity api uses to authenticate with merchant web hooks

  webhookUrl: text("webhook_url").notNull(),
  name: text("name").notNull().unique(),
  email: text("email").notNull().unique(),
  ethereumAddress: text("ethereum_address").notNull(),

  ...createdAndUpdatedAt,
});

export const clarityMerchantsRelationships = relations(clarityMerchants, ({ many, one }) => ({
  orders: many(clarityOrders),
}));
