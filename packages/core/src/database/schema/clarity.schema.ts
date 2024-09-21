import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { clarityMerchants } from "../model/clarity/merchants.model";
import { clarityOrders } from "../model/clarity/orders.model";

export const ClaritySchema = {
  insertMerchants: createInsertSchema(clarityMerchants),
  selectMerchants: createSelectSchema(clarityMerchants),

  insertOrders: createInsertSchema(clarityOrders),
  selectOrders: createSelectSchema(clarityOrders),
};
